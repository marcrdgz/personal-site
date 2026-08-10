import { siteConfig } from "../lib/site";
import styles from "../styles/Footer.module.css";

export const Footer = () => {
  return (
    <div className={styles.component}>
      <div className={styles.divSocialMedia}>
        <a
          className={styles.socialMedia}
          href="https://twitter.com/marcrdez"
          target="_blank"
          rel="noreferrer"
        >
          Twitter
        </a>
        <a
          className={styles.socialMedia}
          href="https://github.com/marcrdgz"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
        <a
          className={styles.socialMedia}
          href={siteConfig.devTo}
          target="_blank"
          rel="noreferrer"
        >
          Dev.to
        </a>
        <a
          className={styles.socialMedia}
          href="https://www.linkedin.com/in/marc-rodriguez-moreno/"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
        </a>
      </div>
      <span className={styles.year}>{new Date().getFullYear()}</span>
    </div>
  );
};
