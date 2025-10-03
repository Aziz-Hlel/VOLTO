import { z } from "zod";

const ENV_schema = z.object({
  VITE_NODE_ENV: z.enum(["development", "stage", "production", "test"]),
  VITE_WEB_PORT: z.coerce.number().optional(),
  VITE_API_URL: z.string(),
}).refine(
    (data) => {
      // If env is not dev/test, then web port must exist
      if (!["development", "test"].includes(data.VITE_NODE_ENV)) {
        return data.VITE_WEB_PORT !== undefined;
      }
      return true;
    },
    {
      path: ["VITE_WEB_PORT"], // points error to the right field
      message: "VITE_WEB_PORT is required outside of development or test environments",
    }
  );

const rawEnv = ENV_schema.parse(import.meta.env);

const BASE_URL =rawEnv.VITE_API_URL

const ENV = {
  ...rawEnv,
  BASE_URL,
};

console.log("ENV : ", ENV);

export default ENV;
