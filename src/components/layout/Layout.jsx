import { Outlet } from "react-router-dom";
import { Header } from "./Header.jsx";
import { Footer } from "./Footer.jsx";
import { ScrollToTop } from "./ScrollToTop.jsx";
import styles from "./Layout.module.css";

export function Layout() {
  return (
    <div className={styles.shell}>
      <ScrollToTop />
      <a href="#main" className={styles.skip}>
        Skip to main content
      </a>
      <Header />
      <main id="main" className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
