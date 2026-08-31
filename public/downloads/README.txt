System Monitor installer files belong in this directory.

Build release discovery:
- Name installers as SystemMonitor-vX.Y.Z-Setup.exe
- The website build automatically selects the highest semantic version.
- No application version is hard-coded in src/data/siteConfig.js.
- The generated release metadata is stored in src/data/releaseData.json.

Example:
SystemMonitor-v2.3.28-Setup.exe
