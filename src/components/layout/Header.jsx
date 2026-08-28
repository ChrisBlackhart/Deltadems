import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Heart } from "lucide-react";
import { DeltaDemsBadge } from "../ui/DeltaDemsBadge.jsx";
import { Button } from "../ui/Button.jsx";
import { primaryNav } from "../../data/nav.js";
import { site } from "../../data/site.js";
import styles from "./Header.module.css";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const toggleRef = useRef(null);
  const drawerRef = useRef(null);

  // Close the mobile menu on route change.
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Drawer keyboard behavior: Escape closes and returns focus to the toggle;
  // Tab is trapped inside the drawer while it is open.
  useEffect(() => {
    if (!open) return;

    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;

      const focusables = drawerRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables?.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    // Move focus into the drawer when it opens.
    drawerRef.current?.querySelector("a")?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const navLinkClass = ({ isActive }) =>
    isActive ? `${styles.navLink} ${styles.active}` : styles.navLink;

  return (
    <header className={styles.header} data-scrolled={scrolled}>
      <div className={`container ${styles.bar}`}>
        <Link to="/" className={styles.logoLink} aria-label={`${site.name} — home`}>
          <DeltaDemsBadge size={42} />
          <span className={styles.logoText}>
            <strong>Delta County</strong>
            <span>Democratic Party</span>
          </span>
        </Link>

        <nav className={styles.desktopNav} aria-label="Primary">
          <ul className={styles.navList}>
            {primaryNav.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.to === "/"} className={navLinkClass}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <Button
            href={site.ctas.donate}
            variant="gold"
            size="sm"
            className={styles.donate}
          >
            <Heart aria-hidden="true" /> Donate
          </Button>
          <button
            type="button"
            ref={toggleRef}
            className={styles.menuToggle}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        ref={drawerRef}
        className={styles.drawer}
        data-open={open}
        hidden={!open}
      >
        <nav aria-label="Mobile" className={styles.drawerInner}>
          <ul className={styles.drawerList}>
            {primaryNav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    isActive ? `${styles.drawerLink} ${styles.active}` : styles.drawerLink
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <Button href={site.ctas.donate} variant="gold" className={styles.drawerDonate}>
            <Heart aria-hidden="true" /> Donate
          </Button>
        </nav>
      </div>
    </header>
  );
}
