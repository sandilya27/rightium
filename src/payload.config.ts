import path from "path";
import { fileURLToPath } from "url";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { resendAdapter } from "@payloadcms/email-resend";
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import { buildConfig } from "payload";

import { Authors } from "./collections/Authors";
import { Categories } from "./collections/Categories";
import { Enquiries } from "./collections/Enquiries";
import { Media } from "./collections/Media";
import { Posts } from "./collections/Posts";
import { Users } from "./collections/Users";
import { site } from "./lib/site";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

/**
 * Environment:
 *   DATABASE_URI    Neon Postgres connection string (use the *pooled* one on Vercel)
 *   PAYLOAD_SECRET  random 32+ byte string
 *   R2_*            Cloudflare R2 bucket for uploaded images (S3-compatible API)
 *   RESEND_API_KEY  admin emails (password resets); optional
 */
const r2 = {
  bucket: process.env.R2_BUCKET,
  endpoint: process.env.R2_ENDPOINT, // https://<account-id>.r2.cloudflarestorage.com
  accessKeyId: process.env.R2_ACCESS_KEY_ID,
  secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  publicUrl: process.env.R2_PUBLIC_URL?.replace(/\/$/, ""), // e.g. https://media.rightium.in
};
const r2Configured = Boolean(r2.bucket && r2.endpoint && r2.accessKeyId && r2.secretAccessKey);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: {
      titleSuffix: ` | ${site.name} Admin`,
      icons: [{ rel: "icon", type: "image/svg+xml", url: "/icon.svg" }],
      robots: "noindex, nofollow",
    },
    components: {
      graphics: {
        Logo: "/payload/components/admin-graphics#AdminLogo",
        Icon: "/payload/components/admin-graphics#AdminIcon",
      },
    },
  },
  collections: [Enquiries, Posts, Categories, Authors, Media, Users],
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures.filter((feature) => feature.key !== "heading"),
      HeadingFeature({ enabledHeadingSizes: ["h2", "h3"] }),
      FixedToolbarFeature(),
    ],
  }),
  secret: process.env.PAYLOAD_SECRET || "",
  // Admin emails (password resets). Without a key they're logged instead.
  email: process.env.RESEND_API_KEY
    ? resendAdapter({
        apiKey: process.env.RESEND_API_KEY,
        defaultFromAddress: `noreply@${new URL(site.url).hostname}`,
        defaultFromName: site.name,
      })
    : undefined,
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
  graphQL: { disable: true },
  telemetry: false,
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URI },
  }),
  plugins: [
    s3Storage({
      enabled: r2Configured,
      bucket: r2.bucket ?? "",
      config: {
        endpoint: r2.endpoint,
        region: "auto",
        credentials: {
          accessKeyId: r2.accessKeyId ?? "",
          secretAccessKey: r2.secretAccessKey ?? "",
        },
      },
      // Browser uploads straight to R2, so large images don't hit Vercel's
      // 4.5 MB request limit. Needs a CORS rule on the bucket (see README).
      clientUploads: true,
      collections: {
        media: r2.publicUrl
          ? {
              // Images are served from R2's public domain, not through Vercel.
              disablePayloadAccessControl: true,
              generateFileURL: ({ filename, prefix }) =>
                `${r2.publicUrl}/${prefix ? `${prefix}/` : ""}${filename}`,
            }
          : true,
      },
    }),
  ],
});
