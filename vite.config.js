import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // since your GitHub Pages is using a custom domain, or '/' if normal repo
});
