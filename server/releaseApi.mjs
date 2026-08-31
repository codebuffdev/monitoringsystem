const releasesApiUrl = 'https://api.github.com/repos/codebuffdev/system-monitor/releases?per_page=100';
const latestReleaseUrl = 'https://github.com/codebuffdev/system-monitor/releases/latest';

const CACHE_TTL_MS = 60 * 60 * 1000;
let cachedData = null;
let cachedAt = 0;
let pendingRequest = null;

function isSemver(value) {
  return /^\d+\.\d+\.\d+$/.test(value);
}

function versionFromTag(tag) {
  const match = String(tag || '').match(/^v?(\d+\.\d+\.\d+)$/i);
  return match?.[1] && isSemver(match[1]) ? match[1] : null;
}

function formatReleaseDate(value) {
  if (!value) return 'Unknown date';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Unknown date';
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

function cleanReleaseText(value) {
  return String(value || '')
    .replace(/\r/g, '')
    .replace(/<[^>]*>/g, '')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/^\s*#{1,6}\s*/gm, '')
    .trim();
}

function releaseNotes(body, fallbackSummary) {
  const lines = cleanReleaseText(body)
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  const bulletLines = lines
    .filter((line) => /^[-*+]\s+/.test(line))
    .map((line) => line.replace(/^[-*+]\s+/, '').trim())
    .filter(Boolean);

  const paragraphs = lines.filter((line) => !/^[-*+]\s+/.test(line));
  const summary = paragraphs[0] || bulletLines[0] || fallbackSummary || 'Stable System Monitor release.';
  const changes = bulletLines.length > 0 ? bulletLines : paragraphs.slice(1);

  return {
    summary,
    changes: changes.length > 0 ? changes : ['See the GitHub release notes for details.'],
  };
}

function installerAsset(release) {
  const version = versionFromTag(release.tag_name);
  if (!version) return null;

  return release.assets?.find((asset) => asset.name === 'SystemMonitor-Setup.exe')
    || release.assets?.find((asset) => asset.name === `SystemMonitor-v${version}-Setup.exe`)
    || release.assets?.find((asset) => /SystemMonitor-v\d+\.\d+\.\d+-Setup\.exe$/i.test(asset.name))
    || null;
}

function mapRelease(release) {
  const version = versionFromTag(release.tag_name);
  const notes = releaseNotes(release.body, release.name || `System Monitor v${version}`);
  const asset = installerAsset(release);

  return {
    version,
    date: formatReleaseDate(release.published_at || release.created_at),
    summary: notes.summary,
    changes: notes.changes,
    releaseUrl: release.html_url,
    title: release.name || `System Monitor v${version}`,
    installerName: asset?.name || null,
    downloadUrl: asset?.browser_download_url || `https://github.com/codebuffdev/system-monitor/releases/download/v${version}/SystemMonitor-v${version}-Setup.exe`,
  };
}

async function fetchReleases(token) {
  const headers = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'SystemMonitor-Website-ReleaseAPI/1.2.18',
  };

  const envToken = typeof process !== 'undefined' ? (process.env.GITHUB_TOKEN || process.env.GH_TOKEN) : undefined;
  const authToken = token || envToken;
  if (authToken) headers.Authorization = `Bearer ${authToken}`;

  const response = await fetch(releasesApiUrl, { headers });
  if (!response.ok) throw new Error(`GitHub returned HTTP ${response.status}.`);

  const releases = await response.json();
  return releases
    .filter((release) => !release.draft && !release.prerelease)
    .map(mapRelease)
    .filter((release) => release.version)
    .sort((a, b) => b.version.localeCompare(a.version, undefined, { numeric: true }));
}

async function discoverLatestReleaseFallback() {
  const response = await fetch(latestReleaseUrl, {
    headers: { 'User-Agent': 'SystemMonitor-Website-ReleaseAPI/1.2.18' },
    redirect: 'follow',
  });

  if (!response.ok) throw new Error(`GitHub returned HTTP ${response.status}.`);

  const match = response.url.match(/\/releases\/tag\/v(\d+\.\d+\.\d+)$/i);
  if (!match || !isSemver(match[1])) throw new Error(`Could not determine latest release from ${response.url}.`);

  const version = match[1];
  return {
    version,
    downloadUrl: `https://github.com/codebuffdev/system-monitor/releases/download/v${version}/SystemMonitor-v${version}-Setup.exe`,
    releaseUrl: latestReleaseUrl,
    releaseDate: new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date()),
    platforms: 'Windows 10 / 11',
    architecture: 'Windows x64',
    channel: 'Stable',
    source: 'github-latest-release-fallback',
    releaseHistory: [],
  };
}

export async function getReleaseData(options = {}) {
  const now = Date.now();
  if (cachedData && now - cachedAt < CACHE_TTL_MS) return cachedData;
  if (pendingRequest) return pendingRequest;

  pendingRequest = (async () => {
    try {
      const releases = await fetchReleases(options.token);
      if (!releases.length) throw new Error('GitHub returned no stable releases.');

      const latest = releases[0];
      cachedData = {
        version: latest.version,
        downloadUrl: latest.downloadUrl,
        releaseUrl: latest.releaseUrl,
        releaseDate: latest.date,
        platforms: 'Windows 10 / 11',
        architecture: 'Windows x64',
        channel: 'Stable',
        source: 'github-releases-runtime-cache',
        releaseHistory: releases,
        fetchedAt: new Date().toISOString(),
      };
      cachedAt = Date.now();
      return cachedData;
    } catch (error) {
      console.warn(`Release lookup failed (${error.message}).`);
      if (cachedData) return cachedData;
      return discoverLatestReleaseFallback();
    } finally {
      pendingRequest = null;
    }
  })();

  return pendingRequest;
}
