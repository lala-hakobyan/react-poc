import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3040',
        changeOrigin: true,
      },
    },
    port: 4210,
    strictPort: true, // Prevents Vite from switching to 4211 if 4210 is busy
    host: 'local.react-todo-app.com',
  }
})
