import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  root: 'client',
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: ["quiknotes.onrender.com"],
  },
})
