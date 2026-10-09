import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig, Plugin} from 'vite';

function imageUploadPlugin(): Plugin {
  return {
    name: 'image-upload-plugin',
    configureServer(server) {
      server.middlewares.use('/api/upload-image', (req, res) => {
        if (req.method === 'POST') {
          const chunks: Buffer[] = [];
          req.on('data', (chunk) => chunks.push(chunk));
          req.on('end', () => {
            try {
              const buffer = Buffer.concat(chunks);
              const rawFilename = req.headers['x-filename'] || 'upload.jpg';
              const safeName = path.basename(String(rawFilename));
              const publicDir = path.resolve(__dirname, 'public');
              if (!fs.existsSync(publicDir)) {
                fs.mkdirSync(publicDir, { recursive: true });
              }
              const destPath = path.join(publicDir, safeName);
              fs.writeFileSync(destPath, buffer);

              const assetsDir = path.resolve(__dirname, 'src/assets');
              if (!fs.existsSync(assetsDir)) {
                fs.mkdirSync(assetsDir, { recursive: true });
              }
              fs.writeFileSync(path.join(assetsDir, safeName), buffer);

              const distDir = path.resolve(__dirname, 'dist');
              if (fs.existsSync(distDir)) {
                fs.writeFileSync(path.join(distDir, safeName), buffer);
              }
              console.log('Saved image permanently to public, assets, and dist:', safeName);
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: true, url: '/' + safeName }));
            } catch (err: unknown) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: (err as Error).message }));
            }
          });
        } else {
          res.writeHead(405);
          res.end();
        }
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), imageUploadPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

