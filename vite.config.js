import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import vitePluginImp from 'vite-plugin-imp';
import path from 'path';
import theme from './theme';

// https://vitejs.dev/config/
export default defineConfig({
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
    optimizeDeps: {
        entries: ['./src/Index.jsx'],
    },
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true, // 支持内联 JavaScript
                modifyVars: theme,
            },
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    server: {
        open: '/index.html',
        proxy: {
            /**/
            '/api': {
                target: 'http://localhost:5560',
                secure: false,
                changeOrigin: true,
            },
            '/v2': {
                target: 'http://localhost:5560',
                secure: false,
                changeOrigin: true,
            },
        },
    },
    build: {
        assetsDir: './',
    },
});
