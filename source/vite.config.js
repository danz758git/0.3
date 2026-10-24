import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' makes the built site work from any folder on static hosting
export default defineConfig({
  plugins: [react()],
  base: './',
})
