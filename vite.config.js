import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: [
            'react', 'react-dom', 'react-redux', '@reduxjs/toolkit',
            '@mui/material', '@mui/icons-material',
            '@emotion/react', '@emotion/styled',
          ],
          recharts: ['recharts'],
        },
      },
    },
  },
})
