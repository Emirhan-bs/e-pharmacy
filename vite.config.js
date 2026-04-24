import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth': {
        target: 'https://e-pharmacy-phi.vercel.app',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})