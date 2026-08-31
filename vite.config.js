import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { getReleaseData } from './server/releaseApi.mjs';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'system-monitor-release-api',
      configureServer(server) {
        server.middlewares.use('/api/releases', async (_req, res) => {
          try {
            const data = await getReleaseData();
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.setHeader('Cache-Control', 'no-store');
            res.end(JSON.stringify(data));
          } catch {
            res.statusCode = 503;
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.end(JSON.stringify({ error: 'Release information is temporarily unavailable.' }));
          }
        });
      },
      configurePreviewServer(server) {
        server.middlewares.use('/api/releases', async (_req, res) => {
          try {
            const data = await getReleaseData();
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.setHeader('Cache-Control', 'no-store');
            res.end(JSON.stringify(data));
          } catch {
            res.statusCode = 503;
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.end(JSON.stringify({ error: 'Release information is temporarily unavailable.' }));
          }
        });
      },
    },
  ],
});
