import React from "react";
import { Footer } from "../components/Footer";
import { Main } from "../components/Main";
import { NavBar } from "../components/NavBar";
import { SiteMeta } from "../components/SiteMeta";
import { siteConfig } from "../lib/site";

export default function Home() {
  return (
    <div>
      <SiteMeta title={siteConfig.name} description={siteConfig.description} />

      <main>
        <NavBar />
        <Main />
        <Footer />
      </main>
    </div>
  );
}
