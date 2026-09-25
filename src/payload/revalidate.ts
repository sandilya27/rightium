import { revalidatePath } from "next/cache";
import type { PayloadRequest } from "payload";

/**
 * Purge cached pages after content changes, so an edit in the admin
 * appears on the live site within seconds rather than on the next
 * timed refresh.
 *
 * Skipped when `req.context.disableRevalidate` is set (seed scripts and
 * migrations run outside a Next.js request, where revalidatePath throws).
 */
export function revalidate(req: PayloadRequest, paths: string[], layoutPaths: string[] = []) {
  if (req.context?.disableRevalidate) return;
  try {
    for (const path of new Set(paths)) revalidatePath(path);
    for (const path of new Set(layoutPaths)) revalidatePath(path, "layout");
  } catch (err) {
    req.payload.logger.warn({ err, msg: "Page revalidation skipped" });
  }
}
