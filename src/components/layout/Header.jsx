import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X, Heart } from "lucide-react";
import { DeltaDemsBadge } from "../ui/DeltaDemsBadge.jsx";
import { Button } from "../ui/Button.jsx";
import { navItems } from "../../data/nav.js";
import { site } from "../../data/site.js";
import styles from "./Header.module.css";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const toggleRef = useRef(null);

  // Close the mobile menu on route change.
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu with Escape and return focus to the toggle button.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={styles.header} data-scrolled={scrolled}>
      <div className={`container ${styles.bar}`}>
        <Link to="/" className={styles.logoLink} aria-label={`${site.name} — home`}>
          <DeltaDemsBadge size={40} />
          <span className={styles.logoText}>
            <strong>Delta County</strong>
            <span>Democratic Party</span>
          </span>
        </Link>

        <nav className={styles.desktopNav} aria-label="Primary">
          <ul className={styles.navList}>
            {navItems.map((item) =>
              item.children ? (
                <li key={item.to} className={styles.hasMenu}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
                    }
                  >
                    {item.label}
                    <ChevronDown className={styles.caret} aria-hidden="true" />
                  </NavLink>
                  <ul className={styles.dropdown} aria-label={`${item.label} submenu`}>
                    {item.children.map((child) => (
                      <li key={child.to}>
                        <NavLink
                          to={child.to}
                          className={({ isActive }) =>
                            isActive
                              ? `${styles.dropLink} ${styles.active}`
                              : styles.dropLink
                          }
                        >
                          {child.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === "/"}
                    className={({ isActive }) =>
                      isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              )
            )}
          </ul>
        </nav>

        <div className={styles.actions}>
          <Button href={site.links.actblue} variant="gold" size="sm" className={styles.donate}>
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
            <span className="visually-hidden">
              {open ? "Close menu" : "Open menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        className={styles.drawer}
        data-open={open}
        hidden={!open}
      >
        <nav aria-label="Mobile" className={styles.drawerInner}>
          <ul className={styles.drawerList}>
            {navItems.map((item) => (
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
                {item.children && (
                  <ul className={styles.drawerSub}>
                    {item.children.map((child) => (
                      <li key={child.to}>
                        <NavLink to={child.to} className={styles.drawerSubLink}>
                          {child.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <Button href={site.links.actblue} variant="gold" className={styles.drawerDonate}>
            <Heart aria-hidden="true" /> Donate via ActBlue
          </Button>
        </nav>
      </div>
    </header>
  );
}
