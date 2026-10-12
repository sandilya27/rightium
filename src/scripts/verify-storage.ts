import assert from "node:assert/strict";
import path from "node:path";
import { readFile } from "node:fs/promises";
import { v2 as cloudinary } from "cloudinary";
import { getPayload } from "payload";
import config from "../payload.config";
import { cloudinaryPublicId, cloudinarySettings } from "../payload/cloudinary";
import type { Media } from "../payload-types";

const settings = cloudinarySettings();
assert.ok(settings, "Cloudinary must be configured to verify remote media storage");
const payload = await getPayload({ config });
const bytes = await readFile("public/images/analysts.jpg");
let media: Media | undefined;
const key = (doc: Media) => cloudinaryPublicId(path.posix.join(doc.prefix || "", doc._objectKey || "", doc.filename!));
const assertDeleted = async (publicId: string) => {
  try {
    await cloudinary.api.resource(publicId, { ...settings, resource_type: "image" });
  } catch (error) {
    const code = (error as { http_code?: number; error?: { http_code?: number } }).http_code ||
      (error as { error?: { http_code?: number } }).error?.http_code;
    if (code === 404) return;
    throw new Error("Could not verify Cloudinary deletion.");
  }
  throw new Error("Deleted media still exists in Cloudinary.");
};
try {
  const name = `cms-storage-check-${Date.now()}`;
  media = await payload.create({ collection: "media", data: { alt: "Temporary storage verification" },
    file: { data: bytes, mimetype: "image/jpeg", name: `${name}.jpg`, size: bytes.length } });
  assert.ok(media.url?.startsWith(`https://res.cloudinary.com/${settings.cloud_name}/`));
  const response = await fetch(media.url!);
  assert.equal(response.status, 200);
  assert.ok(response.headers.get("content-type")?.startsWith("image/"));
  const originalId = key(media);
  media = await payload.update({ collection: "media", id: media.id, data: { alt: "Replaced storage verification" },
    file: { data: bytes, mimetype: "image/jpeg", name: `${name}-replacement.jpg`, size: bytes.length } });
  assert.notEqual(key(media), originalId);
  await assertDeleted(originalId);
  const finalId = key(media);
  await payload.delete({ collection: "media", id: media.id });
  media = undefined;
  await assertDeleted(finalId);
  console.log("Cloudinary verified: CMS upload, public image delivery, replacement cleanup, and deletion.");
} finally {
  if (media) await payload.delete({ collection: "media", id: media.id });
  await payload.destroy();
}
