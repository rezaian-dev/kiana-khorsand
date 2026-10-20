/** Only serve locally processed portraits; never embed arbitrary profile image URLs. */
export function safeAvatarUrl(
  value: string | null | undefined,
  ownerId?: string,
) {
  if (!value) return null;
  const match = /^\/api\/avatars\/([a-f0-9]{24})(?:\?v=\d+)?$/i.exec(value);
  return match && (!ownerId || match[1].toLowerCase() === ownerId.toLowerCase())
    ? value
    : null;
}
