import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// On GitHub Actions the site is served from https://<user>.github.io/MYLP/.
export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? '/MYLP/' : '/',
  plugins: [react()],
})
