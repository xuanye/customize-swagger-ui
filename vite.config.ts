/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  return {
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
      port: 4003,
      open: true,
      proxy: {
        '/api': {
          target: 'http://localhost:5000',
          secure: false,
          changeOrigin: true,
        },
        '/v2': {
          target: 'https://petstore.swagger.io',
          secure: false,
          changeOrigin: true,
        },
      },
    },
    build: {
      assetsDir: './',
      sourcemap: command === 'serve',
      rollupOptions: {
        output: {
          manualChunks: {
            'react-venders': ['react', 'react-dom'],
          },
        },
      },
    },
    test: {
      /* for example, use global to avoid globals imports (describe, test, expect):
      globals: true, */
      environment: 'happy-dom',
    },
  };
});
