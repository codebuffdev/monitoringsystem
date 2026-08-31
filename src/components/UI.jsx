import React from "react";
import { Download } from "lucide-react";
import { Link } from "react-router-dom";
import { siteConfig } from "../data/siteConfig";
import { useRelease } from "../context/ReleaseContext";
import { iconMap } from "./Icons";

export function Button({ children, to, href, secondary = false, ...props }) {
  const className = `button ${secondary ? "secondary" : "primary"}`;
  if (href) return <a className={className} href={href} {...props}>{children}</a>;
  return <Link className={className} to={to} {...props}>{children}</Link>;
}

export function FeatureCard({ icon, title, text }) {
  const Icon = iconMap[icon];
  return (
    <article className="feature-card">
      <div className="feature-icon"><Icon size={20} aria-hidden="true" /></div>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

export function Gauge({ value, label }) {
  const radius = 42;
  const numericValue = Number(value);
  const statusClass = numericValue > 75 ? "red" : numericValue >= 40 ? "yellow" : "green";
  const statusLabel = numericValue > 75 ? "High" : numericValue >= 40 ? "Moderate" : "Good";
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (numericValue / 100) * circumference;

  return (
    <div className="gauge" aria-label={`${label} ${value}%`}>
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <circle className="gauge-track" cx="50" cy="50" r={radius} />
        <circle className={`gauge-value ${statusClass}`} cx="50" cy="50" r={radius} strokeDasharray={circumference} strokeDashoffset={offset} />
      </svg>
      <div className="gauge-text"><strong>{value}%</strong><small>{label}</small></div>
      <div className={`gauge-status ${statusClass}`}><i aria-hidden="true" />{statusLabel}</div>
    </div>
  );
}

export function Stat({ label, value }) {
  return <div><small>{label}</small><strong>{value}</strong></div>;
}

export function DownloadButton({ children }) {
  const release = useRelease();
  const label = children || `Download v${release.version}`;
  return (
    <a
      className="button primary download-button"
      href={release.downloadUrl}
      download
      aria-label={`Download System Monitor v${release.version} installer`}
    >
      <Download size={18} aria-hidden="true" />
      <span>{label}</span>
    </a>
  );
}
