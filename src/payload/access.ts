import type { Access, Where } from "payload";

/** Any signed-in admin user. */
export const authenticated: Access = ({ req: { user } }) => Boolean(user);

/** Admins see everything; the public only sees published documents. */
export const publishedOrAuthenticated: Access = ({ req: { user } }) => {
  if (user) return true;
  const published: Where = { _status: { equals: "published" } };
  return published;
};

export const anyone: Access = () => true;
