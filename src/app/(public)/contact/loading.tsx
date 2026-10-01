import { Contact } from "@/components/sections/contact/contact";

import { readProfile } from "@/server/published";

export default async function Loading() {
  const profile = await readProfile();
  return <Contact profile={profile} isLoading />;
}
