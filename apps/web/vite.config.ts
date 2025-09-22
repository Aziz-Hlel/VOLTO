import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path"



// https://vite.dev/config/
export default defineConfig({

  envPrefix: 'VITE_',

  plugins: [
    react(), tailwindcss(),
  ],
  server: {
    port: Number(process.env.VITE_WEB_PORT),
    host: "0.0.0.0", // allow external access (needed in Docker)
    allowedHosts:["rhode-flyer-zus-advisor.trycloudflare.com"]
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  
})