import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dns from 'node:dns'

dns.setDefaultResultOrder('verbatim')
let base = ''
if (!process.env.DEV) {
  base = '/static'
}
// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api': 'http://localhost:80',
      '/users': 'http://localhost:80',
      '/planner': 'http://localhost:80'
    },
    watch:{
      usePolling: true
    }
  }
})
