import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

const __dirname = path.resolve();

export default defineConfig({
    base: '/estate',
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    server: {
        proxy: {
            '/api/': {
                target: 'http://localhost:3000/',
                changeOrigin: true,
                secure: false,
            },
            cors: false
        },
    },
});
