import Link from "next/link";
import { siteConfig } from "../lib/site";
import styles from "../styles/NavBar.module.css";

export const NavBar = () => {
  return (
    <header className={styles.main}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.link}>
          Home
        </Link>
        <Link href="/blog" className={styles.link}>
          Blog
        </Link>
        <a
          href={siteConfig.linkedIn}
          className={styles.link}
          rel="noopener noreferrer"
          target="_blank"
        >
          Contact
        </a>
      </nav>
    </header>
  );
};
