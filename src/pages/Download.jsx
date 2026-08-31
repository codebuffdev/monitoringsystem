import React from "react";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { PageContainer } from "../components/Layout";
import { DownloadButton } from "../components/UI";
import { siteConfig } from "../data/siteConfig";
import { useRelease } from "../context/ReleaseContext";

export default function Download() {
  const release = useRelease();
  return <PageContainer eyebrow="DOWNLOAD" title={`System Monitor v${release.version}`} description="The current stable Windows release, with release information kept in one place.">
    <section className="content-section"><div className="release-download-card"><div><span className="eyebrow">STABLE RELEASE</span><h2>Windows installer</h2><p>Use the installer for a normal desktop installation. The website does not modify or participate in the application's updater flow.</p></div><DownloadButton>Download v{release.version}</DownloadButton><div className="release-meta-grid"><div><small>PLATFORM</small><strong>{release.platforms}</strong></div><div><small>ARCHITECTURE</small><strong>{release.architecture}</strong></div><div><small>RELEASE</small><strong>{release.releaseDate}</strong></div><div><small>CHANNEL</small><strong>{release.channel}</strong></div></div></div></section>
    <section className="content-section download-notes"><div><span className="eyebrow">RELEASE NOTES</span><h2>Check what changed before installing.</h2></div><div><p>Review the release history for the current stable version and previous versions.</p><Link className="text-link" to="/changelog">Open changelog →</Link></div></section>
    <section className="content-section download-notes"><div><span className="eyebrow">PROJECT</span><h2>Source and project links.</h2></div><div><p>The release information is fetched through the website's cached release endpoint. GitHub is not called directly by visitors.</p><a className="text-link" href={siteConfig.repositoryUrl} target="_blank" rel="noreferrer">Open GitHub <ExternalLink size={14} aria-hidden="true" /></a></div></section>
  </PageContainer>;
}
