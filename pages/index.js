import React from "react";
import { Footer } from "../components/Footer";
import { Main } from "../components/Main";
import { NavBar } from "../components/NavBar";
import { SiteMeta } from "../components/SiteMeta";
import { siteConfig } from "../lib/site";
import footerStyles from "../styles/Footer.module.css";
import styles from "../styles/Main.module.css";

export default function Home() {
  return (
    <div>
      <SiteMeta title={siteConfig.name} description={siteConfig.description} />

      <main className={styles.page}>
        <NavBar />
        <Main />
        <Footer className={footerStyles.home} />
      </main>
    </div>
  );
}
