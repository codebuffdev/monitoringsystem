import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";
import Documentation from "./pages/Documentation";
import Changelog from "./pages/Changelog";
import Download from "./pages/Download";
import BeforeInstall from "./pages/BeforeInstall";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";
import { ReleaseProvider } from "./context/ReleaseContext";

export default function App() {
	return (
		<ReleaseProvider>
			<BrowserRouter>
				<Layout>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route
							path="/documentation"
							element={<Documentation />}
						/>
						<Route path="/changelog" element={<Changelog />} />
						<Route path="/download" element={<Download />} />
						<Route
							path="/before-install"
							element={<BeforeInstall />}
						/>
						<Route path="/privacy" element={<Privacy />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</Layout>
			</BrowserRouter>
		</ReleaseProvider>
	);
}
