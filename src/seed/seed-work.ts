import type { Payload, PayloadRequest } from "payload";
import { seedWork } from "./work";

export async function seedSelectedWork({ payload, req }: { payload: Payload; req?: PayloadRequest }) {
  const existing = await payload.count({ collection: "selected-work", req });
  if (existing.totalDocs > 0) return;
  for (const work of seedWork) {
    await payload.create({
      collection: "selected-work",
      data: { ...work, fallbackImage: work.fallbackImage as "/images/analysts.jpg", content: work.content as never, _status: "published" },
      req,
      context: { disableRevalidate: true },
    });
  }
}
