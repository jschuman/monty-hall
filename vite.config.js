import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/monty-hall/', // Set base path for subdirectory deployment
  server: {
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      //'5feb7425d717.ngrok-free.app', // add your ngrok hostname here
    ],
  },
})
