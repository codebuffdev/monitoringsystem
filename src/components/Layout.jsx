import React from "react";
import { Activity, Download, Menu, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { siteConfig } from "../data/siteConfig";
import { useRelease } from "../context/ReleaseContext";

export function Brand() {
	return (
		<span className="brand">
			<span className="brand-mark" aria-hidden="true">
				<Activity size={18} />
			</span>
			<span>
				System<span>Monitor</span>
			</span>
		</span>
	);
}

export function Layout({ children }) {
	const release = useRelease();
	const [menuOpen, setMenuOpen] = React.useState(false);

	React.useEffect(() => {
		const close = () => setMenuOpen(false);
		window.addEventListener("resize", close);
		return () => window.removeEventListener("resize", close);
	}, []);

	React.useEffect(() => {
		const onKeyDown = (event) => {
			if (event.key === "Escape") setMenuOpen(false);
		};
		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, []);

	return (
		<div className="site">
			<header className="navbar">
				<Link
					className="brand-link"
					to="/"
					onClick={() => setMenuOpen(false)}
					aria-label="System Monitor home"
				>
					<Brand />
				</Link>

				<nav
					id="primary-navigation"
					className={menuOpen ? "nav-links open" : "nav-links"}
					aria-label="Primary navigation"
				>
					<NavLink to="/" end onClick={() => setMenuOpen(false)}>
						Home
					</NavLink>
					<NavLink
						to="/documentation"
						onClick={() => setMenuOpen(false)}
					>
						Documentation
					</NavLink>
					<NavLink
						to="/before-install"
						onClick={() => setMenuOpen(false)}
						className="before-install-link"
					>
						<span className="warning-icon">⚠</span>
						Before You Install
					</NavLink>
					<NavLink to="/changelog" onClick={() => setMenuOpen(false)}>
						Changelog
					</NavLink>
				</nav>

				<a
					className="nav-download"
					href={release.downloadUrl}
					download
					aria-label={`Download System Monitor v${release.version} installer`}
				>
					<Download size={16} aria-hidden="true" />
					Download
				</a>

				<button
					className="menu-button"
					type="button"
					onClick={() => setMenuOpen((value) => !value)}
					aria-label={
						menuOpen ? "Close navigation" : "Open navigation"
					}
					aria-expanded={menuOpen}
					aria-controls="primary-navigation"
				>
					{menuOpen ? (
						<X size={21} aria-hidden="true" />
					) : (
						<Menu size={21} aria-hidden="true" />
					)}
				</button>
			</header>

			{children}

			<footer className="footer">
				<Link
					className="brand-link"
					to="/"
					aria-label="System Monitor home"
				>
					<Brand />
				</Link>
				<div className="footer-links">
					<Link to="/documentation">Documentation</Link>
					<Link to="/before-install">Before You Install</Link>
					<Link to="/changelog">Changelog</Link>
					<Link to="/download">Download</Link>
					<a
						href={siteConfig.repositoryUrl}
						target="_blank"
						rel="noreferrer"
					>
						GitHub
					</a>
					<Link to="/privacy">Privacy</Link>
				</div>
				<span className="copyright">
					© 2026 System Monitor · Built by{" "}
					<a
						href={siteConfig.developer.githubUrl}
						target="_blank"
						rel="noreferrer"
					>
						@{siteConfig.developer.username}
					</a>
				</span>
			</footer>
		</div>
	);
}

export function PageContainer({ eyebrow, title, description, children }) {
	return (
		<main>
			<section className="page-hero">
				<div className="eyebrow">{eyebrow}</div>
				<h1>{title}</h1>
				<p>{description}</p>
			</section>
			{children}
		</main>
	);
}
