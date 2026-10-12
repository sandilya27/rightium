import path from "node:path";
import { createHash } from "node:crypto";
import { v2 as cloudinary, type UploadApiResponse } from "cloudinary";
import type { Adapter } from "@payloadcms/plugin-cloud-storage/types";

export function cloudinarySettings() {
  const value = process.env.CLOUDINARY_URL;
  if (!value) return undefined;
  try {
    const url = new URL(value);
    if (url.protocol !== "cloudinary:" || !url.username || !url.password ||
        !/^[a-z0-9_-]+$/i.test(url.hostname)) throw new Error();
    return { cloud_name: url.hostname, api_key: decodeURIComponent(url.username),
      api_secret: decodeURIComponent(url.password) };
  } catch {
    // Never include a credential-bearing URL in an error message.
    throw new Error("CLOUDINARY_URL must contain a valid cloud name, API key, and API secret.");
  }
}

// Payload's persisted prefix keeps existing URLs stable if the default folder changes.
export function cloudinaryPublicId(storageFilePath: string) {
  const folder = path.posix.dirname(storageFilePath);
  const name = createHash("sha256").update(path.posix.basename(storageFilePath)).digest("hex");
  return folder === "." ? name : `${folder}/${name}`;
}

export const createCloudinaryAdapter = (settings: ReturnType<typeof cloudinarySettings>): Adapter =>
  () => {
    const configured = () => {
      if (!settings) throw new Error("Cloudinary storage is not configured.");
      return settings;
    };
    const generateURL = ({ filename, prefix }: { filename: string; prefix?: string }) =>
      cloudinary.url(cloudinaryPublicId(path.posix.join(prefix || "", filename)), {
        cloud_name: configured().cloud_name, secure: true, resource_type: "image", type: "upload",
      });
    return {
      name: "cloudinary",
      generateURL,
      async handleUpload({ file, storageFilePath }) {
        await new Promise<UploadApiResponse>((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream({
            ...configured(), public_id: cloudinaryPublicId(storageFilePath),
            resource_type: "image", overwrite: true, invalidate: true, timeout: 60000,
          }, (error, result) => {
            if (error || !result) reject(new Error("Cloudinary upload failed."));
            else resolve(result);
          });
          stream.on("error", () => reject(new Error("Cloudinary upload stream failed.")));
          stream.end(file.buffer);
        });
      },
      async handleDelete({ storageFilePath }) {
        const result = await cloudinary.uploader.destroy(cloudinaryPublicId(storageFilePath), {
          ...configured(), resource_type: "image", invalidate: true,
        });
        if (result.result !== "ok" && result.result !== "not found") {
          throw new Error("Cloudinary deletion failed.");
        }
      },
      staticHandler: (_req, { params }) => Response.redirect(generateURL(params), 307),
    };
  };
