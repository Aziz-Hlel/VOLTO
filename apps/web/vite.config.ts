import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path"



// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), tailwindcss(),
  ],
  server: {
    port: Number(process.env.WEB_PORT) || 3001,
    host: "0.0.0.0", // allow external access (needed in Docker)
    allowedHosts:["foreign-inch-control-notifications.trycloudflare.com"]
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})