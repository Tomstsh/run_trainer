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
  plugins: [react()],
  server: {
    watch:{
      usePolling: true
    }
  }
})
