import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // 這裡的 base 必須對應您的 GitHub 專案名稱
  base: '/TCVGH-library_Game/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
});