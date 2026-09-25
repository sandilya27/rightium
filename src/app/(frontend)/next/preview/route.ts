import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { getPayload } from "payload";
import config from "@payload-config";

/**
 * Opened from the admin's "Preview" button. Signed-in editors get a
 * draft-mode cookie and see the latest unpublished version of the page.
 */
export async function GET(request: Request) {
  const path = new URL(request.url).searchParams.get("path") ?? "";
  // Only our own article URLs — never an open redirect.
  if (!/^\/blog\/[a-z0-9-]+$/.test(path)) {
    return new Response("Invalid preview path.", { status: 400 });
  }

  const payload = await getPayload({ config });
  const { user } = await payload.auth({ headers: request.headers });
  if (!user) {
    return new Response("Sign in to the admin to preview drafts.", { status: 401 });
  }

  (await draftMode()).enable();
  redirect(path);
}
