import { PolicyPage } from "@/components/shared/policy-page";
import { privacy } from "@/content/policies";

export default function Loading() {
  return <PolicyPage policy={privacy} isLoading />;
}
