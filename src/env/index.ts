import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["dev", "test", "production"]).default("dev"),
  PORT: z.coerce.number().default(3334),
  JWT_SECRET: z.string(),
  DATABASE_URL: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error("❌ Invalid enviroment variable", _env.error.format());

  throw new Error("Invalid enviroment variables");
}

export const env = _env.data;
