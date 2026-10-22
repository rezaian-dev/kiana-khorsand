/** A row in the administrator's user directory. No credentials are ever included. */
export type AdminUserSummary = {
  id: string;
  name: string;
  phone: string;
  role: "user" | "admin";
  createdAt: Date | null;
};

/** Result of a user-management action, surfaced to the client as a toast. */
export type UserActionResult = { ok: boolean; message: string };
