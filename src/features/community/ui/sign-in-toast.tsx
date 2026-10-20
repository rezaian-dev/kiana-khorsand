"use client";

import { toast } from "sonner";

/** Keep browsing public pages; navigation to login is always the visitor's choice. */
export function showSignInToast(message: string) {
  toast.info(message, {
    duration: 6500,
    description: "می‌توانید پس از ورود به همین صفحه برگردید.",
    action: {
      label: "ورود به حساب",
      onClick: () => {
        window.location.assign(
          `/login?next=${encodeURIComponent(window.location.pathname)}`,
        );
      },
    },
  });
}
