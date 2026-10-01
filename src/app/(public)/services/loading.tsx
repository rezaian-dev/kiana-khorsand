import { Services } from "@/components/sections/services/services";

import { readProfile } from "@/server/published";

export default async function Loading() {
  const profile = await readProfile();
  return <Services profile={profile} isLoading />;
}
