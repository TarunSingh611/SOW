import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
  },
  build: {
    outDir: '../server/public',
    assetsDir: 'assets',
    emptyOutDir: true
  },
  define: {
    __VUE_PROD_DEVTOOLS__: false,
  },
  optimizeDeps: {
    force: true
  }
})
