import { PolicyPage } from "@/components/shared/policy-page";
import { terms } from "@/content/policies";

export default function Loading() {
  return <PolicyPage policy={terms} isLoading />;
}
