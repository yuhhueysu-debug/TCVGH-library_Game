import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // 如果您的專案名稱是 TCVGH-library_Game，請確保大小寫完全一致
  base: '/TCVGH-library_Game/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
});;
