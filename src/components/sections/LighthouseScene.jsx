// Original stylized lighthouse-on-the-bay illustration for the hero.
// Purely decorative; hidden from assistive tech by the parent's aria-hidden.
export function LighthouseScene() {
  return (
    <svg
      viewBox="0 0 520 460"
      width="520"
      height="460"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "auto", display: "block" }}
    >
      <defs>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f7c866" stopOpacity="0.95" />
          <stop offset="60%" stopColor="#f4b740" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#f4b740" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1b3fa0" />
          <stop offset="100%" stopColor="#0a2472" />
        </linearGradient>
        <linearGradient id="tower" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#dbe7fd" />
        </linearGradient>
      </defs>

      {/* Moon / soft light source */}
      <circle cx="120" cy="110" r="46" fill="#eef4fe" opacity="0.22" />

      {/* Light beams from the lantern */}
      <g opacity="0.85">
        <path d="M300 118 L470 40 L512 150 Z" fill="url(#glow)" opacity="0.55" />
        <path d="M300 118 L150 26 L96 120 Z" fill="url(#glow)" opacity="0.4" />
        <path d="M300 118 L512 210 L470 270 Z" fill="url(#glow)" opacity="0.3" />
      </g>

      {/* Lantern glow */}
      <circle cx="300" cy="118" r="30" fill="url(#glow)" />

      {/* ---- Lighthouse ---- */}
      {/* Lantern room */}
      <rect x="286" y="100" width="28" height="26" rx="3" fill="#f4b740" />
      <rect x="290" y="104" width="20" height="18" rx="2" fill="#fff3d6" />
      <path d="M282 100 L318 100 L308 84 L292 84 Z" fill="#05185e" />
      <rect x="296" y="72" width="8" height="14" rx="2" fill="#05185e" />
      <circle cx="300" cy="70" r="4" fill="#f4b740" />
      {/* Gallery railing */}
      <rect x="283" y="126" width="34" height="6" rx="2" fill="#0a2472" />
      {/* Tower */}
      <path d="M288 132 L312 132 L322 300 L278 300 Z" fill="url(#tower)" />
      {/* Tower bands */}
      <path d="M285 176 L315 176 L317 206 L283 206 Z" fill="#2064e2" />
      <path d="M281 240 L319 240 L321 270 L279 270 Z" fill="#2064e2" />
      {/* Door + window */}
      <rect x="294" y="272" width="12" height="24" rx="6" fill="#05185e" />
      <circle cx="300" cy="158" r="5" fill="#0a2472" />

      {/* ---- Rocky point ---- */}
      <path
        d="M232 300 C258 288 286 302 322 300 C356 298 384 292 420 300 L460 340 L214 340 Z"
        fill="#05185e"
      />
      <path
        d="M232 300 C258 288 286 302 322 300 C356 298 384 292 420 300 L432 316 L226 316 Z"
        fill="#0a2472"
        opacity="0.7"
      />

      {/* ---- Water ---- */}
      <rect x="0" y="336" width="520" height="124" fill="url(#water)" />
      {/* Reflection of the light */}
      <rect x="292" y="336" width="16" height="120" fill="#f4b740" opacity="0.18" />
      {/* Waves */}
      <g stroke="#3b7bf0" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.6">
        <path d="M40 360 C70 350 100 372 132 360 C164 348 196 372 228 360" />
        <path d="M300 372 C332 360 364 384 398 372 C430 360 462 384 496 372" />
        <path d="M20 398 C56 386 92 410 130 398 C168 386 206 410 244 398" />
        <path d="M280 408 C316 396 352 420 390 408 C428 396 464 420 502 408" />
      </g>
      <g stroke="#dbe7fd" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.35">
        <path d="M120 384 C150 374 180 396 212 384" />
        <path d="M330 394 C360 384 392 406 424 394" />
      </g>
    </svg>
  );
}
