import { ExternalLink } from "lucide-react";
import { partners } from "../../data/partners.js";
import styles from "./PartnerList.module.css";

// The sibling county parties Delta Dems already lists publicly. Real
// organizations with real links — see src/data/partners.js for provenance.
//
// No brand icons here: this project's lucide-react version does not ship
// Facebook/X/Instagram glyphs (see SocialBar.jsx), and a plain text link is
// clearer than a custom glyph for a secondary link anyway.
export function PartnerList() {
  return (
    <ul className={styles.list}>
      {partners.map((p) => {
        const primary = p.url || p.facebook;
        return (
          <li key={p.id} className={styles.item}>
            <a href={primary} target="_blank" rel="noreferrer" className={styles.name}>
              {p.name}
              <ExternalLink aria-hidden="true" />
            </a>
            <span className={styles.meta}>
              {p.scope}
              {p.url && p.facebook && (
                <>
                  {" · "}
                  <a href={p.facebook} target="_blank" rel="noreferrer">
                    Facebook
                  </a>
                </>
              )}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
