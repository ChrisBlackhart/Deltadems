import styles from "./forms.module.css";

/**
 * Invisible spam trap. Renders a real, labelled <input> named "website" — a
 * field name bots commonly auto-fill — positioned off-screen so sighted users
 * never see it. It is also removed from both the tab order and the
 * accessibility tree so keyboard and screen-reader users never encounter it
 * either: only an automated script would ever fill it in.
 *
 * If this field is non-empty at submit time, the server rejects the
 * submission (see api/submit.js) — silently, from the bot's perspective.
 */
export function HoneypotField({ name, value, onChange }) {
  return (
    <div className={styles.honeypot} aria-hidden="true">
      <label htmlFor={name}>Leave this field blank</label>
      <input
        id={name}
        name={name}
        type="text"
        value={value}
        onChange={onChange}
        tabIndex={-1}
        autoComplete="off"
      />
    </div>
  );
}
