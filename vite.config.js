import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'sanity-proxy-plugin',
      configureServer(server) {
        server.middlewares.use('/api/sanity-reels', async (req, res) => {
          try {
            const query = encodeURIComponent(`*[!(_id in path("drafts.**")) && _type == "instagramReel" && coalesce(publishStatus, "published") == "published"] | order(coalesce(displayOrder, 999999) asc, coalesce(_createdAt, "") asc) {
              _id,
              _type,
              _createdAt,
              title,
              reelUrl,
              url,
              publishStatus,
              displayOrder,
              thumbnail {
                ...,
                asset->
              }
            }`);
            const url = `https://tctv8pav.api.sanity.io/v2024-03-01/data/query/production?query=${query}`;
            const upstream = await fetch(url);
            const data = await upstream.text();
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.end(data);
          } catch (e) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: e.message }));
          }
        });
      },
    },
  ],
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  preview: {
    host: '0.0.0.0',
    port: 3000,
  },
});
