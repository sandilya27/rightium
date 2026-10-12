import type { MigrateUpArgs } from "@payloadcms/db-postgres";
import { seedInsights } from "../seed/seed-insights";

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await seedInsights({ payload, req });
}

export async function down(): Promise<void> {
  // Articles may have been edited since installation. Never delete them implicitly.
  throw new Error("Seeded content must be reviewed and removed manually before rolling back this migration.");
}
