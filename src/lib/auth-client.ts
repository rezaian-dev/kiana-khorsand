import { createAuthClient } from "better-auth/react";

// Same-origin requests: never a sandbox localhost URL in the user's browser.
// No useSession hydration gate and no unused client-plugin barrel.
export const authClient = createAuthClient();
