import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Deployed on Vercel at the domain root, so the site is served from `/`.
// Assets imported from `src/assets` inherit this base and get hashed URLs.
export default defineConfig({
  base: '/',
  plugins: [react()],
})
