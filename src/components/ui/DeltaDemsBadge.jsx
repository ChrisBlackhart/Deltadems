// Circular Delta Dems logo mark (lighthouse + waves), matching the official
// badge artwork. Used only in the site header.
export function DeltaDemsBadge({ size = 40, className }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <clipPath id="ddBadgeClip">
          <circle cx="50" cy="50" r="50" />
        </clipPath>
      </defs>
      <circle cx="50" cy="50" r="50" fill="#8ad9ee" />
      <g clipPath="url(#ddBadgeClip)">
        {/* Tower */}
        <path d="M43 30 L58 30 L64 92 L37 92 Z" fill="#ffffff" />
        {/* Window band */}
        <rect x="40" y="56" width="21" height="6" rx="1" fill="#123a8f" opacity="0.9" />
        {/* Lantern room + roof */}
        <rect x="42" y="21" width="17" height="10" rx="1.5" fill="#123a8f" />
        <path d="M40 21 L61 21 L52 11 L48 11 Z" fill="#123a8f" />
        <circle cx="50" cy="8" r="2.4" fill="#123a8f" />
        {/* Waves */}
        <path
          d="M-5 80 C15 72 30 88 50 80 C70 72 85 88 105 80 L105 108 L-5 108 Z"
          fill="#3fb6d9"
        />
        <path
          d="M-5 92 C15 84 30 100 50 92 C70 84 85 100 105 92 L105 108 L-5 108 Z"
          fill="#123a8f"
        />
      </g>
    </svg>
  );
}
