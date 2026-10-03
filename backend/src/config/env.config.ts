import { z } from "zod";
import dotenv from "dotenv";
dotenv.config();

export const envSchema = z.object({
  NODE_ENV: z.string(),
  PORT: z.coerce.number(),
  DATABASE_URL : z.string()
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv) {
  console.error(
    "Invalid environment variables",
    z.treeifyError(parsedEnv.error),
  );

  process.exit(1);
}

export const env = parsedEnv.data;
