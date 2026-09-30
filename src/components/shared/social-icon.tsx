type Props = { name: "instagram" | "telegram" | "whatsapp" };

export function SocialIcon({ name }: Props) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {name === "instagram" && <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" /></>}
      {name === "telegram" && <><path d="m3 10 18-7-4 18-6-5-4 3v-6z" /><path d="m7 13 10-6-6 9" /></>}
      {name === "whatsapp" && <><path d="M5.1 18.6 3 22l4.8-1.2a9 9 0 1 0-2.7-2.2Z" /><path d="M8.5 7.5 7 9c.5 4 4 7.2 7.5 7.8l2-1.9-2.5-1.4-1 1c-2-.8-3.4-2.3-4.1-4.1l1-1Z" /></>}
    </svg>
  );
}
