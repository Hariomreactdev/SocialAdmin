import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import svgr from 'vite-plugin-svgr';

// console.log("__dirname",__dirname);

export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // common convention
    },
  },
  server: {
    port: 5556,
    open: true,
  },
  optimizeDeps: {
    include: ['@mui/material/CssBaseline', '@mui/material/Box'],
  },
  build: {
    target: 'esnext',
    outDir: 'dist',
    sourcemap: true, // helpful for debugging production builds
  },
});
