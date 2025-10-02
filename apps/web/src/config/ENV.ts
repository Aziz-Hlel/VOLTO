import { z } from "zod";

const ENV_schema = z.object({
  VITE_NODE_ENV: z.enum(["development", "stage", "production", "test"]),
  VITE_WEB_PORT: z.coerce.number(),
  VITE_API_URL: z.string(),
  VITE_API_PORT: z.coerce.number(),
});

const rawEnv = ENV_schema.parse(import.meta.env);

const BASE_URL =
  rawEnv.VITE_NODE_ENV === "production"
    ? rawEnv.VITE_API_URL
    : `http://localhost:${rawEnv.VITE_API_PORT}`;

const ENV = {
  ...rawEnv,
  BASE_URL,
};

console.log("ENV : ", ENV);

export default ENV;
