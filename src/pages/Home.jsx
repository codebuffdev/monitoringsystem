import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
	Download,
	RefreshCw,
	Pin,
	X,
	Minus,
	Wifi,
	ArrowRight,
} from "lucide-react";
import { features, siteConfig } from "../data/siteConfig";
import { useRelease } from "../context/ReleaseContext";
import { FeatureCard, Gauge, Stat } from "../components/UI";

function PerformanceHistoryShowcase() {
	const ranges = useMemo(
		() => ({
			"1 MIN": {
				average: "31% avg",
				peak: "PEAK 58%",
				points: "0,158 30,146 60,151 90,128 120,136 150,117 180,132 210,109 240,121 270,102 300,118 330,94 360,111 390,88 420,106 450,97 480,113 510,101 540,108 570,92 600,104",
				labels: ["Now-60s", "-45s", "-30s", "-15s", "Now"],
			},
			"5 MIN": {
				average: "38% avg",
				peak: "PEAK 72%",
				points: "0,164 30,142 60,153 90,117 120,136 150,96 180,128 210,111 240,146 270,89 300,126 330,103 360,119 390,72 420,118 450,91 480,129 510,104 540,121 570,83 600,112",
				labels: ["16:55", "16:56", "16:57", "16:58", "17:00"],
			},
			"15 MIN": {
				average: "44% avg",
				peak: "PEAK 81%",
				points: "0,172 35,142 70,151 105,101 140,131 175,77 210,115 245,143 280,126 315,68 350,96 385,84 420,51 455,101 490,72 525,117 560,62 600,92",
				labels: ["16:45", "16:48", "16:51", "16:54", "17:00"],
			},
			"1 HR": {
				average: "49% avg",
				peak: "PEAK 89%",
				points: "0,169 32,121 64,137 96,76 128,116 160,91 192,132 224,62 256,111 288,80 320,119 352,48 384,96 416,68 448,127 480,84 512,58 544,103 576,66 600,89",
				labels: ["16:00", "16:15", "16:30", "16:45", "17:00"],
			},
			"6 HR": {
				average: "52% avg",
				peak: "PEAK 94%",
				points: "0,154 34,128 68,143 102,96 136,116 170,69 204,123 238,101 272,132 306,74 340,109 374,52 408,97 442,80 476,121 510,67 544,99 578,61 600,83",
				labels: ["11:00", "12:30", "14:00", "15:30", "17:00"],
			},
			"24 HR": {
				average: "53% avg",
				peak: "PEAK 97%",
				points: "0,170 35,125 70,145 105,95 140,130 175,82 210,112 245,155 280,125 315,148 350,68 385,98 420,45 455,88 490,60 525,110 560,76 600,96",
				labels: ["16:00", "16:15", "16:30", "16:45", "17:00"],
			},
		}),
		[],
	);

	const [selectedRange, setSelectedRange] = useState("24 HR");
	const current = ranges[selectedRange];

	return (
		<>
			<div className="showcase-copy">
				<span className="eyebrow">PERFORMANCE HISTORY</span>
				<h2>See how your system behaves over time.</h2>
				<p>
					Historical graphs let you move beyond a single number.
					Inspect CPU, RAM, GPU, swap, disk and network activity
					across multiple time ranges.
				</p>
				<div className="feature-access">
					Open from the System Monitor tray icon →{" "}
					<strong>Performance History</strong>
				</div>
				<div
					className="range-pills"
					role="tablist"
					aria-label="Performance history time range"
				>
					{Object.keys(ranges).map((range) => (
						<button
							key={range}
							type="button"
							role="tab"
							aria-selected={selectedRange === range}
							className={selectedRange === range ? "active" : ""}
							onClick={() => setSelectedRange(range)}
						>
							{range}
						</button>
					))}
				</div>
			</div>

			<div
				className="graph-card"
				aria-label={`CPU usage graph for ${selectedRange}`}
			>
				<div className="graph-header">
					<span>CPU USAGE</span>
					<strong>{current.average}</strong>
					<small>{current.peak}</small>
				</div>
				<div className="graph">
					<div className="grid-line one" />
					<div className="grid-line two" />
					<div className="grid-line three" />
					<svg
						viewBox="0 0 600 210"
						preserveAspectRatio="none"
						aria-hidden="true"
					>
						<polyline
							points={current.points}
							fill="none"
							stroke="currentColor"
							strokeWidth="3"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</div>
				<div className="graph-footer">
					{current.labels.map((label) => (
						<span key={label}>{label}</span>
					))}
				</div>
			</div>
		</>
	);
}

export default function Home() {
	const release = useRelease();
	return (
		<main>
			<section className="hero">
				<div className="hero-copy">
					<div className="eyebrow hero-eyebrow">
						<span className="status-dot" />
						Windows system monitoring
					</div>
					<h1>
						Know what your<span> system is doing.</span>
					</h1>
					<p>
						System Monitor gives you a clean, lightweight view of
						CPU, RAM, GPU, disk and network activity — with
						historical performance tracking and configurable alerts.
					</p>
					<div className="hero-actions">
						<Link className="button primary" to="/download">
							<Download size={18} aria-hidden="true" />
							Download System Monitor
						</Link>
						<a className="button secondary" href="#features">
							Explore features
						</a>
					</div>
					<div className="version-line">
						Latest release <strong>v{release.version}</strong>
						<span>•</span>
						{release.platforms}
					</div>
				</div>

				<div
					className="dashboard-preview"
					aria-label="Static System Monitor dashboard preview"
				>
					<div className="preview-top">
						<span>System Monitor</span>
						<span className="preview-badge">
							<i /> PREVIEW
						</span>
					</div>
					<div className="gauges">
						<Gauge value="42" label="CPU" />
						<Gauge value="68" label="RAM" />
						<Gauge value="17" label="GPU" />
						<Gauge value="82" label="SWAP" />
						<Gauge value="1" label="DISK" />
					</div>
					<div className="preview-divider" />
					<div className="preview-stats">
						<Stat label="SYSTEM UPTIME" value="1d 03:42:18" />
						<Stat label="RAM" value="10.8 GB / 15.9 GB" />
						<Stat label="PROCESSES" value="221" />
						<Stat label="TOP CPU" value="browser (18.4%)" />
					</div>
					<div
						className="preview-network"
						aria-label="Network status preview"
					>
						<Wifi
							className="network-wifi"
							size={14}
							aria-hidden="true"
						/>
						<span className="network-label">NETWORK:</span>
						<strong>Connected-WiFi</strong>
						<small>RX 214.4 MB</small>
						<span className="network-separator" />
						<small>TX 84.3 MB</small>
						<span className="network-separator" />
						<small>↓ 21.1 kbps</small>
						<small>↑ 90.6 kbps</small>
						<span className="network-separator" />
						<small>TOTAL 298.7 MB</small>
						<span className="signal-bars" aria-hidden="true">
							<i />
							<i />
							<i />
							<i />
						</span>
						<small>100% SIGNAL</small>
						<span className="network-action">
							<RefreshCw size={13} aria-hidden="true" /> REFRESH
						</span>
						<span className="network-action">
							<Pin size={13} aria-hidden="true" /> PIN
						</span>
						<span className="network-action network-arrow">
							<ArrowRight size={13} aria-hidden="true" />
						</span>
						<span
							className="network-action network-dash"
							aria-label="Minimize"
						>
							<Minus size={13} aria-hidden="true" />
						</span>
						<span className="network-action" aria-label="Close">
							<X size={13} aria-hidden="true" />
						</span>
					</div>
				</div>
				<div
					className="threshold-legend"
					aria-label="System usage thresholds"
				>
					<div>
						<i className="green" aria-hidden="true" />
						<span>
							<strong>0% - 40%</strong>
							<small>Good</small>
						</span>
					</div>
					<div>
						<i className="yellow" aria-hidden="true" />
						<span>
							<strong>40% - 75%</strong>
							<small>Moderate</small>
						</span>
					</div>
					<div>
						<i className="red" aria-hidden="true" />
						<span>
							<strong>75% - 100%</strong>
							<small>High</small>
						</span>
					</div>
				</div>
			</section>

			<section className="section" id="features">
				<div className="section-heading">
					<span className="eyebrow">WHAT IT DOES</span>
					<h2>Everything you need to understand your PC.</h2>
					<p>
						Built around the monitoring capabilities in the current
						System Monitor release.
					</p>
				</div>
				<div className="feature-grid">
					{features.map((feature) => (
						<FeatureCard key={feature.title} {...feature} />
					))}
				</div>
			</section>

			<section className="section feature-showcase" id="history">
				<PerformanceHistoryShowcase />
			</section>

			<section className="section alerts-section" id="alerts">
				<div className="showcase-copy">
					<span className="eyebrow">PERFORMANCE ALERTS</span>
					<h2>Know when your system needs attention.</h2>
					<p>
						Configure thresholds for CPU, RAM and GPU. When a metric
						stays above its threshold for the configured duration,
						System Monitor sends a notification and records the
						event.
					</p>
					<div className="feature-access">
						Configure from the System Monitor tray icon →{" "}
						<strong>Performance Alerts</strong>
					</div>
					<div className="threshold-list">
						<div>
							<span className="threshold-dot cpu" /> CPU ≥ 80% for
							30s
						</div>
						<div>
							<span className="threshold-dot ram" /> RAM ≥ 85% for
							30s
						</div>
						<div>
							<span className="threshold-dot gpu" /> GPU ≥ 85% for
							30s
						</div>
					</div>
				</div>
				<div className="alert-preview">
					<div className="alert-preview-header">
						<span>ALERT HISTORY</span>
						<span>newest first</span>
					</div>
					{[
						["16:42:09", "GPU", "95%", "≥ 85%", "30s"],
						["16:41:32", "RAM", "87%", "≥ 85%", "30s"],
						["16:41:10", "CPU", "92%", "≥ 80%", "30s"],
					].map((row) => (
						<div className="alert-row" key={row[0]}>
							<span>{row[0]}</span>
							<b>{row[1]}</b>
							<strong>{row[2]}</strong>
							<span>{row[3]}</span>
							<span>{row[4]}</span>
						</div>
					))}
				</div>
			</section>

			<section className="developer-section" id="developer">
				<div className="developer-heading">
					<span className="eyebrow">DEVELOPER</span>
					<h2>Built by {siteConfig.developer.name}.</h2>
					<p>{siteConfig.developer.bio}</p>
				</div>
				<div className="developer-card">
					<img
						className="developer-avatar"
						src={siteConfig.developer.avatarUrl}
						alt={`${siteConfig.developer.name} GitHub profile`}
						onError={(event) => {
							event.currentTarget.src = "/favicon.svg";
						}}
					/>
					<div className="developer-info">
						<h3>{siteConfig.developer.name}</h3>
						<span>@{siteConfig.developer.username}</span>
						<p>
							System Monitor is an independent desktop project
							focused on practical monitoring, a clean interface
							and useful system insights.
						</p>
						<a
							className="github-button"
							href={siteConfig.developer.githubUrl}
							target="_blank"
							rel="noreferrer"
						>
							View GitHub →
						</a>
					</div>
				</div>
			</section>

			<section className="download-section" id="download">
				<div className="download-card">
					<span className="eyebrow">LATEST RELEASE</span>
					<h2>Ready to monitor?</h2>
					<p>
						Download System Monitor for Windows and start monitoring
						your PC.
					</p>
					<Link className="button primary" to="/download">
						<Download size={18} aria-hidden="true" />
						Download v{release.version}
					</Link>
					<div className="download-meta">
						{release.platforms} <span>•</span> Latest stable release
					</div>
				</div>
			</section>
		</main>
	);
}
