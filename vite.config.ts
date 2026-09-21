import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      // Separate pages. index.html is the sales page. The guide is an unlisted page
      // under a long random file name (only buyers receive the link). Never link it
      // from the sales page or the legal pages.
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          guide: path.resolve(__dirname, 'acces-4622106f891abec8cef32df8.html'),
          privacy: path.resolve(__dirname, 'confidentialite.html'),
          terms: path.resolve(__dirname, 'conditions.html'),
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify: file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
