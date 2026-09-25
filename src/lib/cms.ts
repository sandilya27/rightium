/**
 * The CMS (Payload + Neon) is "on" once a database is configured.
 * Until then the site runs in preview mode: articles come from the
 * built-in launch set, and /admin and the Payload API are closed.
 */
export const cmsEnabled = Boolean(process.env.DATABASE_URI);
