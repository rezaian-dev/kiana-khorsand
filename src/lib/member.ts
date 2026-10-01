import type { Viewer } from "./viewer";

export type Member = Viewer & { phone: string; isEmailVerified: boolean };
