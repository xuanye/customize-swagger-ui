/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    entries: ['./src/main.jsx'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    open: '/index.html',
    proxy: {
      '/api': {
        target: 'http://localhost:5000',

        secure: false,
        changeOrigin: true,
      },
      '/v2': {
        target: 'http://localhost:5000',
        secure: false,
        changeOrigin: true,
      },
    },
  },
  build: {
    assetsDir: './',
  },
  test: {
    /* for example, use global to avoid globals imports (describe, test, expect):
    globals: true, */
    environment: 'happy-dom',
  },
});
