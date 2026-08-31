import fs from 'node:fs/promises';
import path from 'node:path';

const outputPath = path.resolve('src/data/releaseData.json');
const releasesApiUrl = 'https://api.github.com/repos/codebuffdev/system-monitor/releases?per_page=100';
const latestReleaseUrl = 'https://github.com/codebuffdev/system-monitor/releases/latest';
const githubToken = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;

function isSemver(value) {
  return /^\d+\.\d+\.\d+$/.test(value);
}

function versionFromTag(tag) {
  const match = String(tag || '').match(/^v?(\d+\.\d+\.\d+)$/i);
  return match?.[1] && isSemver(match[1]) ? match[1] : null;
}

async function readJson(file) {
  try {
    return JSON.parse(await fs.readFile(file, 'utf8'));
  } catch {
    return null;
  }
}

async function writeJson(file, value) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, `${JSON.stringify(value, null, 2)}\n`);
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
  const changes = bulletLines.length > 0
    ? bulletLines
    : paragraphs.slice(1);

  return {
    summary,
    changes: changes.length > 0 ? changes : ['See the GitHub release notes for details.'],
  };
}

function installerAsset(release) {
  const version = versionFromTag(release.tag_name);
  if (!version) return null;
  const expectedName = `SystemMonitor-v${version}-Setup.exe`;
  return release.assets?.find((asset) => asset.name === expectedName)
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

async function fetchReleases() {
  const headers = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'SystemMonitor-Website-ReleaseSync/1.2.16',
  };

  if (githubToken) {
    headers.Authorization = `Bearer ${githubToken}`;
  }

  const response = await fetch(releasesApiUrl, { headers });
  if (!response.ok) {
    throw new Error(`GitHub returned HTTP ${response.status}.`);
  }

  const releases = await response.json();
  return releases
    .filter((release) => !release.draft && !release.prerelease)
    .map(mapRelease)
    .filter((release) => release.version)
    .sort((a, b) => b.version.localeCompare(a.version, undefined, { numeric: true }));
}

async function discoverLatestReleaseFallback() {
  const response = await fetch(latestReleaseUrl, {
    headers: {
      'User-Agent': 'SystemMonitor-Website-ReleaseSync/1.2.16',
      Accept: 'text/html',
    },
    redirect: 'follow',
  });

  if (!response.ok) {
    throw new Error(`GitHub returned HTTP ${response.status}.`);
  }

  const match = response.url.match(/\/releases\/tag\/v(\d+\.\d+\.\d+)$/i);
  if (!match || !isSemver(match[1])) {
    throw new Error(`Could not determine the latest release from ${response.url}.`);
  }

  const version = match[1];
  return {
    version,
    downloadUrl: `https://github.com/codebuffdev/system-monitor/releases/download/v${version}/SystemMonitor-v${version}-Setup.exe`,
    releaseUrl: latestReleaseUrl,
    releaseDate: new Intl.DateTimeFormat('en-US', {
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC',
    }).format(new Date()),
    platforms: 'Windows 10 / 11',
    architecture: 'Windows x64',
    channel: 'Stable',
    source: 'github-latest-release',
  };
}

const existing = await readJson(outputPath);

// Always check GitHub during a website build. The website is static at runtime,
// so this does not create a GitHub API dependency for visitors. A previous
// releaseData.json is used only as an emergency fallback when GitHub is unavailable.
try {
  const releases = await fetchReleases();

  if (!releases.length) {
    throw new Error('GitHub returned no stable releases.');
  }

  const latest = releases[0];
  const releaseData = {
    version: latest.version,
    downloadUrl: latest.downloadUrl,
    releaseUrl: latest.releaseUrl || latestReleaseUrl,
    releaseDate: latest.date,
    platforms: 'Windows 10 / 11',
    architecture: 'Windows x64',
    channel: 'Stable',
    source: 'github-releases-build-time',
    releaseHistory: releases,
  };

  await writeJson(outputPath, releaseData);
  console.log(`Using latest GitHub release: v${latest.version}.`);
  console.log(`Synced ${releases.length} stable releases for the changelog.`);
} catch (error) {
  console.warn(`GitHub release history lookup failed (${error.message}).`);

  if (existing?.version) {
    console.warn(`Keeping existing release data: v${existing.version}.`);
    process.exit(0);
  }

  try {
    const fallback = await discoverLatestReleaseFallback();
    await writeJson(outputPath, {
      ...fallback,
      releaseHistory: [],
    });
    console.warn(`Using latest-release fallback: v${fallback.version}.`);
  } catch (fallbackError) {
    throw new Error(`Release sync failed: ${fallbackError.message}`);
  }
}
