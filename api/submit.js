// ============================================================================
// LEGACY — Vercel Serverless Function. Retires at Genesis cutover.
//
// Reached only when config.submitMode === "vercel-legacy" (see
// src/lib/submit/vercel.js). It is NOT the target architecture and cannot run
// on Genesis: DigitalOcean blocks outbound SMTP on 25/465/587 from that
// droplet, and Gmail publishes no alternate port. The Genesis path posts
// straight to PostgREST instead — see src/lib/submit/genesis.js and
// db/001-inquiries.sql.
//
// Handles the Contact, Volunteer, and Newsletter forms.
//
// Delivery: Gmail SMTP via nodemailer, authenticated with a Gmail App
// Password. Chosen because it requires NO DNS/domain changes and NO new
// third-party account — it sends through the organization's own existing
// Gmail inbox. See README.md "Forms & email delivery" for setup.
//
// Runtime: explicitly pinned to Node.js (not Edge) — nodemailer needs raw
// TCP/TLS sockets for SMTP, which the Edge runtime does not provide.
// vercel.json needs NO change for this file to be reachable: Vercel checks
// the filesystem (which includes files under /api) before applying the SPA
// catch-all rewrite, so POST /api/submit reaches this function directly.
// ============================================================================

import nodemailer from "nodemailer";
import { site } from "../src/data/site.js";
import { config as siteConfig } from "../src/config.js";

export const config = { runtime: "nodejs" };

// ---------------------------------------------------------------------------
// Per-form field specs. Field keys match the `id` used on each <Field> in the
// corresponding React form component exactly — the client sends `values` as
// one flat object keyed by those ids.
// ---------------------------------------------------------------------------
const FORM_SPECS = {
  contact: {
    subject: "Delta Dems Website — Contact Submission",
    required: ["c-name", "c-email", "c-message"],
    fields: {
      "c-name": { label: "Name", kind: "line", maxLen: 100 },
      "c-email": { label: "Email", kind: "email", maxLen: 254 },
      "c-phone": { label: "Phone", kind: "line", maxLen: 30 },
      "c-topic": { label: "Topic", kind: "line", maxLen: 60 },
      "c-message": { label: "Message", kind: "text", maxLen: 5000 },
    },
  },
  volunteer: {
    subject: "Delta Dems Website — Volunteer Interest",
    required: ["v-name", "v-email"],
    fields: {
      "v-name": { label: "Name", kind: "line", maxLen: 100 },
      "v-email": { label: "Email", kind: "email", maxLen: 254 },
      "v-phone": { label: "Phone", kind: "line", maxLen: 30 },
      "v-availability": { label: "Availability", kind: "line", maxLen: 60 },
      "v-interests": { label: "Interested in", kind: "list", maxItems: 12, maxLen: 60 },
      "v-note": { label: "Note", kind: "text", maxLen: 2000 },
    },
  },
  newsletter: {
    subject: "Delta Dems Website — Newsletter Signup",
    required: ["nl-email"],
    fields: {
      "nl-name": { label: "First name", kind: "line", maxLen: 100 },
      "nl-email": { label: "Email", kind: "email", maxLen: 254 },
    },
  },
};

const HONEYPOT_FIELD = "website";
// Below this, a submission is flagged for human review rather than trusted
// blindly — but NEVER silently discarded (see the "suspiciouslyFast" note
// below). Only the honeypot — which a real visitor can never trigger — is
// treated as a hard "this is spam" signal.
const FAST_SUBMISSION_MS = 1000;
const MAX_BODY_BYTES = 30_000; // generous for these forms; defense in depth
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ---------------------------------------------------------------------------
// Sanitizers
// ---------------------------------------------------------------------------

// Strip all control characters (including CR/LF) and collapse whitespace —
// for single-line fields, and for ANYTHING that ends up in an email header
// (display name / Reply-To), where a stray \r\n could enable header
// injection.
function cleanLine(value, maxLen) {
  if (typeof value !== "string") return "";
  return value
    // Intentional: strip control characters (incl. CR/LF) to prevent email
    // header injection via a display name or Reply-To address.
    // eslint-disable-next-line no-control-regex
    .replace(/[\x00-\x1F\x7F]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLen);
}

// For multi-line message bodies: preserve newlines for readability, but still
// strip null bytes and other non-printing control characters, and normalize
// CRLF/CR to LF.
function cleanText(value, maxLen) {
  if (typeof value !== "string") return "";
  return value
    .replace(/\r\n?/g, "\n")
    // Intentional: strip non-printing control characters, but keep the \n
    // just normalized above so multi-line messages stay readable.
    // eslint-disable-next-line no-control-regex
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
    .trim()
    .slice(0, maxLen);
}

function cleanList(value, maxItems, maxLen) {
  if (!Array.isArray(value)) return [];
  return value
    .filter((v) => typeof v === "string")
    .slice(0, maxItems)
    .map((v) => cleanLine(v, maxLen))
    .filter(Boolean);
}

// ---------------------------------------------------------------------------
// Request validation
// ---------------------------------------------------------------------------

function parseBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string" && req.body.length) {
    try {
      return JSON.parse(req.body);
    } catch {
      return null;
    }
  }
  return null;
}

// Returns { ok: true, clean, spec, isHoneypot, suspiciouslyFast } or
// { ok: false, status, error }.
function validateSubmission(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { ok: false, status: 400, error: "Invalid submission." };
  }

  const { form } = body;
  const spec = FORM_SPECS[form];
  if (!spec) {
    return { ok: false, status: 400, error: "Unknown form type." };
  }

  // Honeypot: a real visitor never sees or reaches this field (see
  // HoneypotField.jsx). Any value here means an automated submission.
  const isHoneypot = typeof body[HONEYPOT_FIELD] === "string" && body[HONEYPOT_FIELD].length > 0;

  const elapsedMs = Number(body.elapsedMs);
  const suspiciouslyFast = Number.isFinite(elapsedMs) && elapsedMs < FAST_SUBMISSION_MS;

  const clean = {};
  const missing = [];

  for (const [key, fieldSpec] of Object.entries(spec.fields)) {
    const raw = body[key];
    let value;

    if (fieldSpec.kind === "list") {
      value = cleanList(raw, fieldSpec.maxItems, fieldSpec.maxLen);
    } else if (fieldSpec.kind === "text") {
      value = cleanText(raw, fieldSpec.maxLen);
    } else {
      value = cleanLine(raw, fieldSpec.maxLen);
    }

    if (fieldSpec.kind === "email" && value && !EMAIL_RE.test(value)) {
      return { ok: false, status: 400, error: "Please provide a valid email address." };
    }

    const isEmpty = fieldSpec.kind === "list" ? value.length === 0 : !value;
    if (spec.required.includes(key) && isEmpty) {
      missing.push(fieldSpec.label);
    }

    clean[key] = value;
  }

  if (missing.length) {
    return { ok: false, status: 400, error: "Please fill in all required fields." };
  }

  return { ok: true, clean, spec, formName: form, isHoneypot, suspiciouslyFast, elapsedMs };
}

// ---------------------------------------------------------------------------
// Best-effort, per-instance rate limit.
//
// Serverless functions are stateless across cold starts and are load-balanced
// across many concurrent instances, each with its own memory — this Map does
// NOT provide a reliable, distributed rate limit. It only helps against a
// single warm instance being hammered in a short burst. A real distributed
// limit would need external state (e.g. Vercel KV / Upstash Redis), which is
// intentionally out of scope for this phase. Documented here rather than
// oversold as real protection.
// ---------------------------------------------------------------------------
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 8;
const hits = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    hits.set(ip, { windowStart: now, count: 1 });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

// Opportunistically forget old entries so the Map doesn't grow unbounded
// across a long-lived warm instance.
function pruneRateLimitMap() {
  const now = Date.now();
  for (const [ip, entry] of hits) {
    if (now - entry.windowStart > RATE_LIMIT_WINDOW_MS) hits.delete(ip);
  }
}

function getClientIp(req) {
  const fwd = req.headers["x-forwarded-for"];
  if (typeof fwd === "string" && fwd.length) return fwd.split(",")[0].trim();
  return req.socket?.remoteAddress || "unknown";
}

// Lightweight same-origin check. Soft defense-in-depth only — a missing
// Origin header is allowed through, since some legitimate clients omit it and
// the honeypot/timing checks are the primary spam defenses.
function isAllowedOrigin(req) {
  const origin = req.headers.origin;
  if (!origin) return true;
  try {
    const host = new URL(origin).host;
    const siteHost = new URL(siteConfig.siteUrl).host;
    return (
      host === siteHost ||
      host.endsWith(".vercel.app") ||
      host.startsWith("localhost:") ||
      host.startsWith("127.0.0.1:")
    );
  } catch {
    return false;
  }
}

// ---------------------------------------------------------------------------
// Mailer
// ---------------------------------------------------------------------------

// Created once per warm instance and reused across invocations (avoids
// repeating the TLS handshake on every request). Credentials are read lazily
// inside the handler, not at module load, so a missing env var produces a
// clean per-request error instead of crashing function initialization.
let transporter;

function getTransporter() {
  if (transporter) return transporter;
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) return null;

  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
    // A serverless function must never hang indefinitely on an external
    // service — bound every stage of the SMTP handshake well under Vercel's
    // execution limit.
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 10_000,
  });
  return transporter;
}

function formatTimestamp() {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "America/Detroit",
  }).format(new Date());
}

function buildEmail({ spec, clean, suspiciouslyFast, elapsedMs }) {
  const lines = [];
  if (suspiciouslyFast) {
    lines.push(
      `⚠ Submitted unusually fast (${elapsedMs}ms) — possible automated submission. Review before acting.`,
      ""
    );
  }

  lines.push(`Form: ${spec.subject.replace("Delta Dems Website — ", "")}`);
  lines.push(`Submitted: ${formatTimestamp()} (Eastern Time)`);
  lines.push("");

  for (const [key, fieldSpec] of Object.entries(spec.fields)) {
    const value = clean[key];
    const isEmpty = fieldSpec.kind === "list" ? !value?.length : !value;
    if (isEmpty) continue; // skip blank optional fields for a clean, readable email
    const display = fieldSpec.kind === "list" ? value.join(", ") : value;
    lines.push(`${fieldSpec.label}: ${display}`);
  }

  lines.push("", `— Sent from the ${site.name} website contact form.`);

  const replyEmailKey = Object.keys(spec.fields).find((k) => spec.fields[k].kind === "email");
  const replyNameKey = Object.keys(spec.fields).find(
    (k) => spec.fields[k].label === "Name" || spec.fields[k].label === "First name"
  );
  const replyEmail = replyEmailKey ? clean[replyEmailKey] : null;
  const replyName = replyNameKey ? clean[replyNameKey] : null;

  return {
    subject: suspiciouslyFast ? `[Review] ${spec.subject}` : spec.subject,
    text: lines.join("\n"),
    // cleanLine() already stripped CR/LF from both parts, so this is safe to
    // use as a header value — no header-injection vector here.
    replyTo: replyEmail ? (replyName ? `"${replyName}" <${replyEmail}>` : replyEmail) : undefined,
  };
}

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed." });
  }

  if (!isAllowedOrigin(req)) {
    return res.status(403).json({ ok: false, error: "Request rejected." });
  }

  const contentLength = Number(req.headers["content-length"] || 0);
  if (contentLength > MAX_BODY_BYTES) {
    return res.status(413).json({ ok: false, error: "Submission too large." });
  }

  const ip = getClientIp(req);
  pruneRateLimitMap();
  if (isRateLimited(ip)) {
    return res.status(429).json({ ok: false, error: "Too many requests. Please try again shortly." });
  }

  const body = parseBody(req);
  const result = validateSubmission(body);
  if (!result.ok) {
    return res.status(result.status).json({ ok: false, error: result.error });
  }

  const { clean, spec, formName, isHoneypot, suspiciouslyFast, elapsedMs } = result;

  // Honeypot trip: a real visitor can never trigger this (the field is
  // removed from the tab order and hidden from assistive tech — see
  // HoneypotField.jsx), so this is treated as a confirmed bot and silently
  // dropped. Responding with the same shape as a real success (rather than a
  // 4xx) avoids giving an automated script useful feedback to adapt to.
  if (isHoneypot) {
    console.warn(`[api/submit] honeypot triggered, form=${formName}, ip=${ip}`);
    return res.status(200).json({ ok: true });
  }

  const mailer = getTransporter();
  if (!mailer) {
    console.error("[api/submit] GMAIL_USER / GMAIL_APP_PASSWORD not configured");
    return res.status(500).json({
      ok: false,
      error: `Email delivery isn't configured yet. Please email us directly at ${site.email}.`,
    });
  }

  const email = buildEmail({ spec, clean, suspiciouslyFast, elapsedMs });

  try {
    // Awaited fully before responding — Vercel pauses background work the
    // instant a function returns, so a fire-and-forget send here could be
    // silently dropped mid-flight.
    await mailer.sendMail({
      from: `"${site.name} Website" <${process.env.GMAIL_USER}>`,
      to: site.email,
      replyTo: email.replyTo,
      subject: email.subject,
      text: email.text,
    });
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("[api/submit] send failed:", err);
    return res.status(500).json({
      ok: false,
      error: `We couldn't send your message right now. Please try again in a moment, or email us directly at ${site.email}.`,
    });
  }
}
