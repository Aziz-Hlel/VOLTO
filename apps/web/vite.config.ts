import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";


function getPort(): number | undefined {
  const NODE_ENV = process.env.VITE_NODE_ENV;
  if(!NODE_ENV) throw new Error(`❌ Missing required environment variable: NODE_ENV`);

  const value = process.env.VITE_WEB_PORT;

  if (!value && ['development', 'test'].includes(NODE_ENV) ) throw new Error(`❌ Missing required VITE_WEB_PORT when NODE_ENV is ${NODE_ENV}`);
  if(value && isNaN(Number(value)))  throw new Error(`❌ Invalid value for VITE_WEB_PORT: "${value}" is not a number`);

  return Number(value) || undefined;
  
}

// https://vite.dev/config/
export default defineConfig({
  envPrefix: "VITE_",

  plugins: [react(), tailwindcss()],
  server: {
    port: getPort(),
    host: "0.0.0.0", // allow external access (needed in Docker)
    allowedHosts: ["rhode-flyer-zus-advisor.trycloudflare.com"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
