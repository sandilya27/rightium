import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import nextEnv from "@next/env";

// Load the same production environment that next build uses.
nextEnv.loadEnvConfig(process.cwd(), false);
if (!process.env.DATABASE_URI) {
  console.log("CMS not configured; skipping database migrations for preview build.");
} else {
  if (!process.env.PAYLOAD_SECRET) {
    throw new Error("PAYLOAD_SECRET is required when DATABASE_URI is configured.");
  }
  const bin = fileURLToPath(new URL("../node_modules/payload/bin.js", import.meta.url));
  const result = spawnSync(process.execPath, [bin, "migrate"], {
    stdio: "inherit",
    env: { ...process.env, NODE_ENV: "production", NODE_OPTIONS: "--no-deprecation" },
  });
  if (result.error) throw result.error;
  process.exit(result.status ?? 1);
}
