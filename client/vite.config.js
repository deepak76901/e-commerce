import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
   // ... other configurations
   server: {
    proxy: {
      '/api': {
        target: 'https://e-commerce-api-12.vercel.app', // Replace with your backend API URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Optional: rewrite the path
        secure:false
      },
    },
  },
})
