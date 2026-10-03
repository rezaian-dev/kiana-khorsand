import { FooterContent } from "./footer-content";
import { readProfile } from "@/server/published";

export async function Footer() {
  return <FooterContent profile={await readProfile()} />;
}
