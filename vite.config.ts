import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"  
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
    envPrefix: 'VITE_',

    plugins: [
      react(),
      tailwindcss(),
    ],
    resolve: {                                                // *                
      alias: {                                                // *                
        "@": path.resolve(__dirname, "./src"),                // *                                                
      },                                                      // *        
    },

    server: {
      port: 8081
    }
  })
