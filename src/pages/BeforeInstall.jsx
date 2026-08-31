import React from "react";
import {
	ShieldAlert,
	Download,
	Github,
	Info,
	CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { siteConfig } from "../data/siteConfig";

export default function BeforeInstall() {
	return (
		<main>
			<section className="content-section before-install-intro">
				<div className="warning-card">
					<div className="warning-card-top">
						<ShieldAlert size={22} aria-hidden="true" />
						<span>WINDOWS SMARTSCREEN</span>
					</div>

					<div className="smart-screen">
						<div className="smart-screen-title">
							Windows protected your PC
						</div>
						<p>
							Microsoft Defender SmartScreen prevented an
							unrecognized app from starting.
						</p>
						<div className="smart-screen-meta">
							<div>
								<span>App:</span>
								<strong>SystemMonitor-Setup.exe</strong>
							</div>
							<div>
								<span>Publisher:</span>
								<strong>Unknown publisher</strong>
							</div>
						</div>
						<div className="smart-screen-actions">
							<button
								type="button"
								className="fake-button secondary"
							>
								Don&apos;t run
							</button>
							<button
								type="button"
								className="fake-button primary"
							>
								Run anyway
							</button>
						</div>
					</div>
				</div>
			</section>

			<section className="page-hero before-install-hero">
				<div className="eyebrow">BEFORE YOU INSTALL</div>
				<h1>Read this before running System Monitor.</h1>

				<p
					style={{
						color: "#fca5a5",
						fontWeight: 600,
						fontSize: "1.05rem",
						marginTop: "28px",
						marginBottom: "22px",
					}}
				>
					⚠️{" "}
					<strong>Why does Windows show a security warning?</strong>
				</p>

				<p>
					Don't worry — this warning does not mean that you have
					downloaded malicious software.
				</p>

				<p>
					You may see <strong>Windows protected your PC</strong> when
					you try to install SystemMonitor. This happens because
					SystemMonitor is developed and distributed independently by
					me, an individual developer.
				</p>

				<p>
					Windows uses Microsoft Defender SmartScreen to check the
					reputation and identity of applications downloaded from the
					Internet. Since SystemMonitor is a relatively new,
					independently developed application, Windows does not yet
					recognize its publisher.
				</p>

				<p
					style={{
						padding: "16px 20px",
						margin: "28px 0",
						borderLeft: "3px solid #f87171",
						background: "rgba(248, 113, 113, 0.06)",
						borderRadius: "0 6px 6px 0",
						color: "#fca5a5",
					}}
				>
					<strong>In simple terms:</strong> Windows is not saying{" "}
					<strong>"this application is a virus."</strong> It is saying{" "}
					<strong>
						"I don't know this publisher well enough to vouch for
						this application."
					</strong>
				</p>

				<p
					style={{
						color: "#fca5a5",
						fontWeight: 600,
						fontSize: "1.05rem",
						marginTop: "30px",
						marginBottom: "22px",
					}}
				>
					❓ Why can't I simply remove the warning?
				</p>

				<p>
					Software developers can use a{" "}
					<strong>code-signing certificate</strong> to establish a
					verified publisher identity. Think of it like a digital ID
					card — it allows Windows to verify who signed the
					application and whether it has been modified.
				</p>

				<p>
					Unfortunately, obtaining and maintaining trusted code
					signing can involve costs and eligibility requirements.
					Microsoft's own signing service also has geographic
					restrictions for individual developers. Developers outside
					the supported regions, such as the USA and Canada, need to
					use other code-signing options.
				</p>

				<p>
					Since SystemMonitor is a <strong>hobby project</strong> that
					I develop independently and I don't make any money from it,
					I currently don't consider that expense worthwhile.
				</p>

				<p
					style={{
						padding: "14px 18px",
						margin: "28px 0",
						borderLeft: "3px solid #f87171",
						background: "rgba(248, 113, 113, 0.05)",
						borderRadius: "0 6px 6px 0",
						color: "#fca5a5",
						fontWeight: 600,
					}}
				>
					So, unfortunately, you may have to deal with this warning
					for now.
				</p>

				<p>
					If you trust SystemMonitor and want to use it, you can click{" "}
					<strong>"Run anyway"</strong> to continue the installation.
				</p>

				<p
					style={{
						marginTop: "26px",
						color: "#94a3b8",
					}}
				>
					Sorry for the inconvenience, and thank you for giving
					SystemMonitor a try! ❤️
				</p>
			</section>

			<section className="content-section before-install-steps">
				<div className="section-heading">
					<span className="eyebrow">WHAT TO DO</span>
					<h2>Make an informed decision</h2>
					<p>
						Download System Monitor from the official project
						release & check that the file you downloaded is the one
						you intended to run.
					</p>
				</div>

				<div className="before-install-grid">
					<article className="before-step">
						<div className="before-step-number">01</div>
						<CheckCircle2 size={20} aria-hidden="true" />
						<h3>Download from the official release</h3>
						<p>
							Use the System Monitor GitHub release page rather
							than a random mirror or unknown download site.
						</p>
						<a
							className="text-link"
							href={siteConfig.repositoryUrl}
							target="_blank"
							rel="noreferrer"
						>
							<Github size={15} aria-hidden="true" /> Open GitHub
						</a>
					</article>

					<article className="before-step">
						<div className="before-step-number">02</div>
						<Info size={20} aria-hidden="true" />
						<h3>Read the warning</h3>
						<p>
							If Windows shows &quot;Windows protected your
							PC&quot;, it is telling you that the publisher or
							app is not yet familiar to its reputation system.
						</p>
					</article>

					<article className="before-step">
						<div className="before-step-number">03</div>
						<ShieldAlert size={20} aria-hidden="true" />
						<h3>Continue only if you trust the source</h3>
						<p>
							On the SmartScreen screen, use the option that lets
							you continue only after you have confirmed that you
							downloaded System Monitor from the official project.
						</p>
					</article>
				</div>
			</section>

			<section className="content-section before-install-reassurance">
				<div className="reassurance-card">
					<div>
						<div className="eyebrow">WHY THIS PAGE EXISTS</div>
						<h2>
							We would rather explain the warning than hide it.
						</h2>
						<p>
							System Monitor is an individual-developer project.
							This page is here so a new user knows what Windows
							may show, why it may appear, and how to make a
							decision before installing.
						</p>
					</div>
					<Link className="button primary" to="/download">
						<Download size={17} aria-hidden="true" />
						Go to Download
					</Link>
				</div>
			</section>
		</main>
	);
}
