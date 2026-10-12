import { seedSelectedWork } from "../seed/seed-work";
import { type MigrateUpArgs, type MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_selected_work_fallback_image" AS ENUM('/images/analysts.jpg', '/images/data.jpg', '/images/strategy.jpg', '/images/agreement.jpg');
  CREATE TYPE "public"."enum_selected_work_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__selected_work_v_version_fallback_image" AS ENUM('/images/analysts.jpg', '/images/data.jpg', '/images/strategy.jpg', '/images/agreement.jpg');
  CREATE TYPE "public"."enum__selected_work_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "selected_work" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"sector" varchar,
  	"excerpt" varchar,
  	"cover_image_id" integer,
  	"fallback_image" "enum_selected_work_fallback_image" DEFAULT '/images/analysts.jpg',
  	"metric" varchar,
  	"metric_label" varchar,
  	"content" jsonb,
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_selected_work_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_selected_work_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_sector" varchar,
  	"version_excerpt" varchar,
  	"version_cover_image_id" integer,
  	"version_fallback_image" "enum__selected_work_v_version_fallback_image" DEFAULT '/images/analysts.jpg',
  	"version_metric" varchar,
  	"version_metric_label" varchar,
  	"version_content" jsonb,
  	"version_sort_order" numeric DEFAULT 0,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__selected_work_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "selected_work_id" integer;
  ALTER TABLE "selected_work" ADD CONSTRAINT "selected_work_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_selected_work_v" ADD CONSTRAINT "_selected_work_v_parent_id_selected_work_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."selected_work"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_selected_work_v" ADD CONSTRAINT "_selected_work_v_version_cover_image_id_media_id_fk" FOREIGN KEY ("version_cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE UNIQUE INDEX "selected_work_slug_idx" ON "selected_work" USING btree ("slug");
  CREATE INDEX "selected_work_cover_image_idx" ON "selected_work" USING btree ("cover_image_id");
  CREATE INDEX "selected_work_updated_at_idx" ON "selected_work" USING btree ("updated_at");
  CREATE INDEX "selected_work_created_at_idx" ON "selected_work" USING btree ("created_at");
  CREATE INDEX "selected_work__status_idx" ON "selected_work" USING btree ("_status");
  CREATE INDEX "_selected_work_v_parent_idx" ON "_selected_work_v" USING btree ("parent_id");
  CREATE INDEX "_selected_work_v_version_version_slug_idx" ON "_selected_work_v" USING btree ("version_slug");
  CREATE INDEX "_selected_work_v_version_version_cover_image_idx" ON "_selected_work_v" USING btree ("version_cover_image_id");
  CREATE INDEX "_selected_work_v_version_version_updated_at_idx" ON "_selected_work_v" USING btree ("version_updated_at");
  CREATE INDEX "_selected_work_v_version_version_created_at_idx" ON "_selected_work_v" USING btree ("version_created_at");
  CREATE INDEX "_selected_work_v_version_version__status_idx" ON "_selected_work_v" USING btree ("version__status");
  CREATE INDEX "_selected_work_v_created_at_idx" ON "_selected_work_v" USING btree ("created_at");
  CREATE INDEX "_selected_work_v_updated_at_idx" ON "_selected_work_v" USING btree ("updated_at");
  CREATE INDEX "_selected_work_v_latest_idx" ON "_selected_work_v" USING btree ("latest");
  CREATE INDEX "_selected_work_v_autosave_idx" ON "_selected_work_v" USING btree ("autosave");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_selected_work_fk" FOREIGN KEY ("selected_work_id") REFERENCES "public"."selected_work"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_selected_work_id_idx" ON "payload_locked_documents_rels" USING btree ("selected_work_id");`)
  await seedSelectedWork({ payload, req });
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "selected_work" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_selected_work_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "selected_work" CASCADE;
  DROP TABLE "_selected_work_v" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_selected_work_fk";
  
  DROP INDEX "payload_locked_documents_rels_selected_work_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "selected_work_id";
  DROP TYPE "public"."enum_selected_work_fallback_image";
  DROP TYPE "public"."enum_selected_work_status";
  DROP TYPE "public"."enum__selected_work_v_version_fallback_image";
  DROP TYPE "public"."enum__selected_work_v_version_status";`)
}

