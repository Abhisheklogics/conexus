import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import rollupNodePolyFill from 'rollup-plugin-node-polyfills';

dotenv.config();

export default defineConfig({
  plugins: [react()],
 
  build: {
    rollupOptions: {
      plugins: [rollupNodePolyFill()],
    },
  },
  assetsInclude: ['**/*.PNG'],
  server: {
    proxy: {
      '/api': {
        target: 'https://meetbeckend.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
