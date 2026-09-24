import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'mock-api',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/api/status' || req.url === '/api/status/') {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify([{
              id: '1',
              client_name: 'off-the-saddle-client',
              timestamp: new Date().toISOString(),
            }]));
            return;
          }
          if (req.url === '/api' || req.url === '/api/') {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ message: 'Hello World' }));
            return;
          }
          next();
        });
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
  },
  preview: {
    host: '0.0.0.0',
    port: 3000,
  },
});
