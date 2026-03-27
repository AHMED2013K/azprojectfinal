import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import sitemap from 'vite-plugin-sitemap';

export default defineConfig({
<<<<<<< HEAD
  plugins: [
    react(),
    sitemap({
      hostname: 'https://edugrowth.tn',
      urls: [
        '/',
        '/partners',
        '/services',
        '/contact',
        '/fr'
      ]
    })
  ],
  base: '/', // root of your custom domain
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['lucide-react'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
=======
  plugins: [react()],
  base: '/', // since your GitHub Pages is using a custom domain, or '/' if normal repo
>>>>>>> 4ef3a7e812eec063389865b86568f1f5db7963b7
});
