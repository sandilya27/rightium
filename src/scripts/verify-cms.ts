import assert from "node:assert/strict";
import { getPayload } from "payload";
import config from "../payload.config";

// Explicit integration check: writes temporary records, then removes them.
const payload = await getPayload({ config });
const context = { disableRevalidate: true };
let enquiryId: number | undefined;
let draftId: number | undefined;
try {
  const published = await payload.find({
    collection: "posts", overrideAccess: false,
    where: { _status: { equals: "published" } }, limit: 1, depth: 0,
  });
  assert.ok(published.totalDocs > 0, "Published articles must be readable anonymously");
  const article = published.docs[0];
  const enquiry = await payload.create({
    collection: "enquiries", overrideAccess: true,
    data: { name: "CMS integration check", email: "cms-check@example.invalid",
      message: "Temporary enquiry used to verify database persistence.", status: "new" },
  });
  enquiryId = enquiry.id;
  assert.equal((await payload.findByID({ collection: "enquiries", id: enquiryId })).message, enquiry.message);
  await assert.rejects(payload.find({ collection: "enquiries", overrideAccess: false }),
    "Anonymous visitors must not be able to read enquiries");
  const draft = await payload.create({
    collection: "posts", draft: true, context,
    data: { title: "Temporary CMS draft check", slug: `cms-check-${Date.now()}`,
      excerpt: "Temporary integration check.", content: article.content,
      category: article.category, author: article.author,
      publishedAt: new Date().toISOString(), _status: "draft" },
  });
  draftId = draft.id;
  const anonymous = await payload.find({ collection: "posts", overrideAccess: false,
    where: { id: { equals: draft.id } } });
  assert.equal(anonymous.totalDocs, 0, "Anonymous visitors must not see drafts");
  const privileged = await payload.findByID({ collection: "posts", id: draft.id, draft: true });
  assert.equal(privileged.slug, draft.slug);
  console.log("CMS verified: published reads, enquiry persistence/privacy, and draft access.");
} finally {
  if (draftId !== undefined) await payload.delete({ collection: "posts", id: draftId, context });
  if (enquiryId !== undefined) await payload.delete({ collection: "enquiries", id: enquiryId });
  await payload.destroy();
}
