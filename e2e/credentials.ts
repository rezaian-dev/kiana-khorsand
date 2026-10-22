/** Seeded accounts live in `.env.local`; the suite is skipped without them. */
export const adminPhone = process.env.SEED_ADMIN_PHONE ?? "";
export const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? "";
export const clientPhone = process.env.SEED_CLIENT_PHONE ?? "";
export const clientPassword = process.env.SEED_CLIENT_PASSWORD ?? "";

/** One signed-in administrator, reused by every panel test. */
export const ADMIN_STATE = "e2e/.auth/admin.json";

/** A context without cookies, for flows that must start signed out. */
export const SIGNED_OUT = { cookies: [], origins: [] };
