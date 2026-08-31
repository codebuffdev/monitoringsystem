import fs from 'node:fs/promises';
import path from 'node:path';

const username = 'codebuffdev';
const cachePath = path.resolve('src/data/githubProfile.json');
const maxAgeMs = 24 * 60 * 60 * 1000;

async function readCache() {
  try {
    const raw = await fs.readFile(cachePath, 'utf8');
    const data = JSON.parse(raw);
    if (data?.fetchedAt && Date.now() - new Date(data.fetchedAt).getTime() < maxAgeMs) {
      return data;
    }
  } catch {}
  return null;
}

async function fetchProfile() {
  const response = await fetch(`https://api.github.com/users/${username}`, {
    headers: {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'SystemMonitor-Website',
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub profile request failed: HTTP ${response.status}`);
  }

  const profile = await response.json();
  return {
    username: profile.login,
    name: profile.name || profile.login,
    bio: profile.bio || '',
    avatarUrl: profile.avatar_url || '',
    githubUrl: profile.html_url || `https://github.com/${username}`,
    fetchedAt: new Date().toISOString(),
  };
}

const cached = await readCache();
if (cached) {
  console.log(`Using cached GitHub profile for @${username}.`);
  process.exit(0);
}

try {
  const profile = await fetchProfile();
  await fs.writeFile(cachePath, `${JSON.stringify(profile, null, 2)}\n`);
  console.log(`Fetched GitHub profile for @${username}.`);
} catch (error) {
  try {
    const existing = JSON.parse(await fs.readFile(cachePath, 'utf8'));
    console.warn(`GitHub fetch failed (${error.message}); keeping existing cached profile.`);
    if (existing) process.exit(0);
  } catch {}

  console.error(error.message);
  process.exit(1);
}
