import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { loadEnv } from "vite";

function getPort(mode: string): number | undefined {
  const env = loadEnv(mode, process.cwd());

  const NODE_ENV = env.VITE_NODE_ENV;
  if (!NODE_ENV) throw new Error(`❌ Missing required environment variable: NODE_ENV`);

  const value = env.VITE_WEB_PORT;

  if (!value && ["development", "test"].includes(NODE_ENV))
    throw new Error(`❌ Missing required VITE_WEB_PORT when NODE_ENV is ${NODE_ENV}`);
  if (value && isNaN(Number(value)))
    throw new Error(`❌ Invalid value for VITE_WEB_PORT: "${value}" is not a number`);

  return Number(value) || undefined;
}

// https://vite.dev/config/
export default ({ mode }: { mode: string }) => ({
  envPrefix: "VITE_",

  plugins: [react(), tailwindcss()],
  server: {
    port: getPort(mode),
    host: "0.0.0.0", // allow external access (needed in Docker)
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
