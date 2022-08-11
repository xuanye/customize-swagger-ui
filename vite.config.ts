/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import vitePluginImp from 'vite-plugin-imp';
import path from 'path';
import theme from './theme';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  return {
    base: './',
    plugins: [
      react(),
      vitePluginImp({
        optimize: true,
        libList: [
          {
            libName: 'antd',
            libDirectory: 'es',
            style: name => `antd/es/${name}/style`,
          },
        ],
      }),
    ],
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true, // 支持内联 JavaScript
          modifyVars: theme,
        },
      },
    },
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
          target: 'https://petstore.swagger.io',
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
