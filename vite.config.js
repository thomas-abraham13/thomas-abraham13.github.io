import { copyFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages has no SPA rewrites: a direct visit to /projects is served
// 404.html. Shipping the app shell under that name lets React Router take over.
const githubPagesSpaFallback = () => ({
  name: 'github-pages-spa-fallback',
  apply: 'build',
  async writeBundle({ dir }) {
    await copyFile(resolve(dir, 'index.html'), resolve(dir, '404.html'));
  },
});

export default defineConfig({
  plugins: [react(), githubPagesSpaFallback()],
  build: {
    outDir: 'build',
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.js',
    css: false,
  },
});
