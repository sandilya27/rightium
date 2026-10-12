import assert from "node:assert/strict";
import { getPayload } from "payload";
import config from "../payload.config";

const payload = await getPayload({ config });
const context = { disableRevalidate: true };
let temporaryId: number | undefined;
try {
  const published = await payload.find({ collection: "selected-work", overrideAccess: false, depth: 1, sort: "sortOrder" });
  assert.ok(published.totalDocs >= 4, "Existing work should be migrated into the CMS");
  const first = published.docs[0];
  assert.ok(first.content?.root.children.length, "Full detail content must be available");
  const draft = await payload.create({
    collection: "selected-work", draft: true, context,
    data: { title: "Temporary selected work check", slug: `work-check-${Date.now()}`,
      sector: "Test", excerpt: "Temporary preview check.", metric: "1", metricLabel: "Test",
      content: first.content, sortOrder: 999, _status: "draft" },
  });
  temporaryId = draft.id;
  const hidden = await payload.find({ collection: "selected-work", overrideAccess: false, where: { id: { equals: draft.id } } });
  assert.equal(hidden.totalDocs, 0, "Draft work must be hidden from visitors");
  const preview = await payload.findByID({ collection: "selected-work", id: draft.id, draft: true });
  assert.equal(preview.slug, draft.slug);
  await payload.update({ collection: "selected-work", id: draft.id, context, data: { _status: "published" } });
  const visible = await payload.find({ collection: "selected-work", overrideAccess: false, where: { id: { equals: draft.id } } });
  assert.equal(visible.totalDocs, 1, "Publishing must make the case study visible");
  await payload.update({ collection: "selected-work", id: draft.id, context, data: { _status: "draft" } });
  const unpublished = await payload.find({ collection: "selected-work", overrideAccess: false, where: { id: { equals: draft.id } } });
  assert.equal(unpublished.totalDocs, 0, "Unpublishing must hide the case study");
  console.log("Selected work verified: seeded content, draft privacy, preview, publishing and unpublishing.");
} finally {
  if (temporaryId !== undefined) await payload.delete({ collection: "selected-work", id: temporaryId, context });
  await payload.destroy();
}

