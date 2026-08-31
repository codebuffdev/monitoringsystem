import { getReleaseData } from '../../server/releaseApi.mjs';

export async function onRequestGet(context) {
  const cache = caches.default;
  const cacheKey = new Request(new URL('/api/releases', context.request.url).toString(), context.request);
  const cachedResponse = await cache.match(cacheKey);

  if (cachedResponse) return cachedResponse;

  try {
    const data = await getReleaseData({ token: context.env.GITHUB_TOKEN });
    const response = new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });

    context.waitUntil(cache.put(cacheKey, response.clone()));
    return response;
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Release information is temporarily unavailable.' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
    });
  }
}
