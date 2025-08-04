import { defineConfig } from 'vite'
import { cloudflare } from '@cloudflare/vite-plugin'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    cloudflare(),
    react(),
  ],
  resolve: {
    alias: {
      'react-dom/server': 'react-dom/server.edge',
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
})