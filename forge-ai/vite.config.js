import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT || 4000,
    host: true,
    open: true,
    console: true,
    logger: {
      level: 'all',
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    minify: 'terser',
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        }
      }
    }
  },
  define: {
    'process.env.VITE_DEBUG': JSON.stringify(process.env.VITE_DEBUG)
  }
})
