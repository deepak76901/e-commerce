import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
   // ... other configurations
   server: {
    proxy: {
      '/api': {
        target: 'https://e-commerce-api-12.vercel.app',
        changeOrigin: true,
      
        secure:false
      },
    },
  },
})
