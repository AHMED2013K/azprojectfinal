import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import sitemap from 'vite-plugin-sitemap';

export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: 'https://edugrowth.tn',
      urls: [
        '/',
        '/abroad-zone',
        '/outsourcing',
        '/outsourcing-tunisia',
        '/education-outsourcing-tunisia',
        '/outsource-customer-service-tunisia',
        '/programmes/alternance-france',
        '/etudier-en-france-depuis-tunisie',
        '/etudier-en-allemagne-depuis-tunisie',
        '/etudier-au-canada-depuis-tunisie',
        '/book-consultation',
        '/blog',
      ],
    }),
  ],
  base: '/',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom', 'react-helmet-async'],
          'animation': ['three', 'vanta'],
          'ui': ['lucide-react'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  server: {
    host: true,
    port: 5176,
  },
});
