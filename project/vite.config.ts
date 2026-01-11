import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  // Test configuration for Vitest
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setupTests.ts'],
    css: true,
    exclude: ['node_modules/**', 'e2e/**', 'playwright-report/**']
  },
});
