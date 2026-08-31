# SystemMonitor Website v1.2.18

## Dynamic GitHub Releases

The website no longer locks the public release information to the version that existed when the site was built.

Runtime release data is served by `/api/releases`:

- GitHub Releases is checked server-side.
- The browser never calls the GitHub API directly.
- The release response is cached for **1 hour**.
- During `npm run dev`, the cache lives in the Node process, so restarting the dev server clears it immediately.
- On Cloudflare Pages, the Pages Function uses Cloudflare's cache for the same one-hour window.
- If GitHub is unavailable, the server keeps the last in-memory result when one exists, while the frontend keeps the bundled release data as a safe fallback.

## New desktop release flow

Publish a new stable GitHub release, for example `v2.3.33`. The website will pick it up automatically after the release cache expires. **No website source change and no new website deployment are required.**

The release endpoint supplies:

- latest version
- latest installer download URL
- release date
- release notes
- stable release history

Installer discovery supports both the stable filename `SystemMonitor-Setup.exe` and the versioned filename `SystemMonitor-vX.Y.Z-Setup.exe`.

## Local development

```bash
npm install
npm run dev
```

The first release request after starting the dev server fetches GitHub and stores the result in memory. Further requests use the same cached result for one hour. Restarting `npm run dev` starts a fresh process and clears that cache.

## Production

Cloudflare Pages should deploy the project root so the `functions/` directory is detected. The `/api/releases` Pages Function handles the server-side GitHub lookup and one-hour edge caching.

## Build

```bash
npm run build
```

The build no longer needs to query GitHub Releases. Release information is a runtime concern; `src/data/releaseData.json` remains as the frontend fallback snapshot.
