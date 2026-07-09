import { z } from "zod";

// Boot-time config validation. Invalid/missing env crashes loudly with the
// offending key named (never the value). CONFIGURATION.md is the matrix.
// Phase 1: only what the skeleton needs; more keys added as features land.

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(4000),
  CORS_ORIGINS: z
    .string()
    .default("http://localhost:5173")
    .transform((s) => s.split(",").map((o) => o.trim()).filter(Boolean)),
});

const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
  const keys = parsed.error.issues.map((i) => i.path.join(".")).join(", ");
  // eslint-disable-next-line no-console
  console.error(`[config] invalid environment: ${keys}`);
  process.exit(1);
}

export const config = parsed.data;
