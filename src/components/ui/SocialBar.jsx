import { site } from "../../data/site.js";
import styles from "./SocialBar.module.css";

// Inline brand glyphs — lucide-react dropped social/brand icons, so we ship our
// own simple marks. `currentColor` lets them inherit the link color.
function FacebookIcon({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.9 3.78-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.44 2.9h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94Z" />
    </svg>
  );
}

function InstagramIcon({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" />
    </svg>
  );
}

function XIcon({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.53 3H20.5l-6.49 7.42L21.75 21h-5.97l-4.68-6.12L5.74 21H2.77l6.94-7.93L2.5 3h6.12l4.23 5.6L17.53 3Zm-1.05 16.2h1.65L7.6 4.7H5.83l10.65 14.5Z" />
    </svg>
  );
}

const iconByLabel = {
  Facebook: FacebookIcon,
  Instagram: InstagramIcon,
  Twitter: XIcon,
};

export function SocialBar({ tone = "light", size = 20 }) {
  return (
    <ul className={styles.list} data-tone={tone}>
      {site.social.map((s) => {
        const Icon = iconByLabel[s.label] || FacebookIcon;
        return (
          <li key={s.label}>
            <a
              href={s.url}
              target="_blank"
              rel="noreferrer"
              className={styles.link}
              aria-label={`${s.label} — @${s.handle}`}
            >
              <Icon size={size} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
