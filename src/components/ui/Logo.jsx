// Original lighthouse brand mark — evokes the Delta Dems lighthouse identity
// without relying on the existing photo. Tower uses currentColor; the beam and
// lantern use the gold accent. Swap for the client's real logo at launch.

export function LighthouseMark({ size = 44, className }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-hidden="true"
      focusable="false"
    >
      {/* Light beams */}
      <g fill="var(--gold-500)" opacity="0.9">
        <path d="M27 15 L4 7 L4 13 L27 19 Z" opacity="0.55" />
        <path d="M37 15 L60 7 L60 13 L37 19 Z" opacity="0.55" />
      </g>
      {/* Lantern glow */}
      <circle cx="32" cy="16" r="7" fill="var(--gold-400)" />
      {/* Lantern room */}
      <rect x="27" y="12" width="10" height="9" rx="1.5" fill="var(--gold-500)" />
      <path d="M26 12 L38 12 L35 7 L29 7 Z" fill="currentColor" />
      <circle cx="32" cy="5" r="2" fill="var(--gold-500)" />
      {/* Tower */}
      <path
        d="M27 21 L37 21 L40 52 L24 52 Z"
        fill="currentColor"
      />
      {/* Tower stripe */}
      <path d="M25.4 36 L38.6 36 L39.2 43 L24.8 43 Z" fill="var(--white)" opacity="0.9" />
      <rect x="30" y="30" width="4" height="6" rx="1" fill="var(--gold-400)" />
      {/* Rocky base + waves */}
      <path
        d="M18 52 C22 49 26 53 32 52 C38 51 42 54 46 52 L48 58 L16 58 Z"
        fill="currentColor"
        opacity="0.85"
      />
      <path
        d="M6 60 C11 57 15 63 21 60 C27 57 31 63 37 60 C43 57 47 63 53 60 C56 58.5 58 60 60 60"
        fill="none"
        stroke="var(--blue-500)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Logo({ variant = "full", size = 44, tone = "brand" }) {
  const color = tone === "light" ? "var(--white)" : "var(--navy-900)";
  const sub = tone === "light" ? "rgba(255,255,255,0.72)" : "var(--slate-600)";

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.6rem",
        lineHeight: 1.05,
      }}
    >
      <span style={{ color, display: "inline-flex" }}>
        <LighthouseMark size={size} />
      </span>
      {variant === "full" && (
        <span style={{ display: "flex", flexDirection: "column" }}>
          <strong
            style={{
              color,
              fontSize: "1.02rem",
              fontWeight: 800,
              letterSpacing: "-0.01em",
            }}
          >
            Delta County
          </strong>
          <span
            style={{
              color: sub,
              fontSize: "0.78rem",
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            Democratic Party
          </span>
        </span>
      )}
    </span>
  );
}
