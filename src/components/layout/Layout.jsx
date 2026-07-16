import { useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./Header.jsx";
import { Footer } from "./Footer.jsx";
import { SiteNotice } from "./SiteNotice.jsx";
import { ScrollToTop } from "./ScrollToTop.jsx";
import styles from "./Layout.module.css";

export function Layout() {
  const mainRef = useRef(null);
  const location = useLocation();

  return (
    <div className={styles.shell}>
      <ScrollToTop focusRef={mainRef} pathname={location.pathname} />
      <a href="#main" className={styles.skip}>
        Skip to main content
      </a>
      <SiteNotice />
      <Header />
      <main id="main" ref={mainRef} tabIndex={-1} className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
