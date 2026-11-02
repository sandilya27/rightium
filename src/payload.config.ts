import path from "path";
import { fileURLToPath } from "url";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { resendAdapter } from "@payloadcms/email-resend";
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from "@payloadcms/richtext-lexical";
import { cloudStoragePlugin } from "@payloadcms/plugin-cloud-storage";
import { cloudinarySettings, createCloudinaryAdapter } from "./payload/cloudinary";
import { buildConfig } from "payload";

import { Authors } from "./collections/Authors";
import { Categories } from "./collections/Categories";
import { Enquiries } from "./collections/Enquiries";
import { Media } from "./collections/Media";
import { Posts } from "./collections/Posts";
import { SelectedWork } from "./collections/SelectedWork";
import { Users } from "./collections/Users";
import { site } from "./lib/site";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

/**
 * Environment:
 *   DATABASE_URI    Neon Postgres connection string (use the *pooled* one on Vercel)
 *   PAYLOAD_SECRET  random 32+ byte string
 *   CLOUDINARY_URL  Cloudinary cloud name and server-side API credentials
 *   RESEND_API_KEY  admin emails (password resets); optional
 */
const cloudinary = cloudinarySettings();
const mediaFolder = process.env.CLOUDINARY_FOLDER || "rightium-media";

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
  collections: [Enquiries, SelectedWork, Posts, Categories, Authors, Media, Users],
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
        defaultFromAddress: "noreply@rightium.org",
        defaultFromName: site.name,
      })
    : undefined,
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
  graphQL: { disable: true },
  telemetry: false,
  // Leave room for multipart headers below Vercel's 4.5 MB request limit.
  upload: { limits: { fileSize: 4 * 1024 * 1024 }, abortOnLimit: true },
  db: postgresAdapter({
    // This Neon database is shared by development and deployment.
    // Only reviewed migrations may change its schema.
    push: false,
    migrationDir: path.resolve(dirname, "migrations"),
    pool: {
      connectionString: process.env.DATABASE_URI,
      max: 5,
      connectionTimeoutMillis: 60000,
      idleTimeoutMillis: 30000,
    },
  }),
  plugins: [
    cloudStoragePlugin({
      enabled: Boolean(cloudinary),
      // Keep the media schema consistent in configured and preview builds.
      alwaysInsertFields: true,
      collections: {
        media: {
          adapter: createCloudinaryAdapter(cloudinary),
          prefix: mediaFolder,
          disableLocalStorage: Boolean(cloudinary),
          disablePayloadAccessControl: true,
        },
      },
    }),
  ],
});
