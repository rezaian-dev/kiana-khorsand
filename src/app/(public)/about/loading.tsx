import { About } from "@/components/sections/about/about";

import { readProfile } from "@/server/published";

export default async function Loading() {
  const profile = await readProfile();
  return <About profile={profile} isLoading />;
}
