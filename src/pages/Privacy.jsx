import React from "react";
import { PageContainer } from "../components/Layout";

export default function Privacy() {
  return <PageContainer eyebrow="PRIVACY" title="Simple by design." description="The website is intentionally lightweight. GitHub developer details are fetched at build time and cached locally; the browser does not call the GitHub API.">
    <section className="content-section privacy-copy"><h2>Website data</h2><p>The website does not require an account to browse documentation, changelog or release information.</p><h2>External links</h2><p>GitHub and release links open external services when you choose to visit them. Those services have their own privacy policies.</p><h2>Desktop application</h2><p>The website and desktop application's runtime behavior are separate. This page describes the website only; application telemetry or local settings are not transmitted by the website.</p></section>
  </PageContainer>;
}
