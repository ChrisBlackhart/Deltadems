import { Link } from "react-router-dom";
import styles from "./Button.module.css";

// Polymorphic button: renders a router <Link> for `to`, an <a> for `href`
// (external links open safely in a new tab), or a <button> otherwise.
export function Button({
  children,
  variant = "primary",
  size = "md",
  to,
  href,
  className = "",
  ...rest
}) {
  const cls = [styles.btn, styles[variant], styles[size], className]
    .filter(Boolean)
    .join(" ");

  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>
        {children}
      </Link>
    );
  }

  if (href) {
    const external = /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        className={cls}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
