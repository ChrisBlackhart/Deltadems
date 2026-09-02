// ============================================================================
// Genesis / PostgREST submission provider.
//
// Posts the inquiry row straight to PostgREST through the project's declared
// public form route. There is no application server in this path and no
// function to deploy: Genesis renders an Envoy route from
//
//     SP_PUBLIC_FORMS=<api-path>:<table>
//
// in projects/deltadems/project.conf, which accepts POST only and rate-limits
// it at the edge. The database is the endpoint.
//
// THE DATABASE INSERT IS THE SUCCESSFUL SUBMISSION.
// A 201 means the row is committed and durable. Notification — whenever it
// eventually exists — reads that row out of band and can never affect whether
// the submission succeeded. This is why there is no email code anywhere in
// this file, and why there does not need to be.
//
// On the anon key: it is public by design. In the PostgREST/Supabase model the
// browser holds it, and it is worth exactly what the grants allow — here,
// INSERT on eleven named columns of one table, with no SELECT, UPDATE or
// DELETE (see db/001-inquiries.sql). It is not a secret and belongs in the
// client bundle.
// ============================================================================

import { config } from "../../config.js";
import { buildInquiryRow } from "../inquiry.js";

function anonKey() {
  return import.meta.env?.VITE_GENESIS_ANON_KEY || "";
}

export function isConfigured() {
  return Boolean(config.genesis?.formsPath && anonKey());
}

export async function submit(formName, values) {
  if (!isConfigured()) {
    // Fail loudly rather than pretending. A missing key must never look like a
    // delivered submission.
    console.error(
      "[submit/genesis] not configured — need config.genesis.formsPath and VITE_GENESIS_ANON_KEY"
    );
    return {
      status: "error",
      message: "The form isn't connected yet. Please email us directly for now.",
    };
  }

  const key = anonKey();
  const row = buildInquiryRow(formName, values);

  try {
    const res = await fetch(config.genesis.formsPath, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: key,
        Authorization: `Bearer ${key}`,
        // The anon role has INSERT but deliberately no SELECT, so asking
        // PostgREST to return the inserted row would fail on privileges.
        Prefer: "return=minimal",
      },
      body: JSON.stringify(row),
    });

    if (res.status === 201 || res.status === 200 || res.status === 204) {
      return { status: "success" };
    }

    // 429 comes from either the Envoy edge limit or the table's per-address
    // throttle (SQLSTATE 53400). Both mean the same thing to a person.
    if (res.status === 429) {
      return {
        status: "error",
        message: "That's a few messages in a short time — please wait a moment and try again.",
      };
    }

    // Anything else: log the detail for us, show the visitor something safe.
    let detail = "";
    try {
      detail = await res.text();
    } catch {
      // response body unreadable; the status alone is enough to log
    }
    console.error(`[submit/genesis] ${res.status} ${res.statusText}`, detail);

    return {
      status: "error",
      message: "We couldn't send that just now. Please try again in a moment.",
    };
  } catch (err) {
    console.error("[submit/genesis] network error", err);
    return {
      status: "error",
      message: "We couldn't reach the server. Please check your connection and try again.",
    };
  }
}
