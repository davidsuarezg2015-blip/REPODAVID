import { defineConfig } from 'vite';

const hostOptions = { host: '0.0.0.0', allowedHosts: ['.e2b.app'] };

export default defineConfig({
  base: './',
  esbuild: { jsx: 'automatic' },
  server: hostOptions,
  preview: hostOptions,
});
