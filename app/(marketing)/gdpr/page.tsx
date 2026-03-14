import type { Metadata } from "next";
import Gdpr from "@/components/gdpr/Gdpr";

export const metadata: Metadata = {
  title: "GDPR Compliance & Data Privacy Policy | Business Data Labs",
  description: "Learn how Business Data Labs complies with GDPR regulations and protects user data. Our policies ensure transparency, secure data processing, and respect for privacy rights.",
};

export default function Gdprpage() {
  return <Gdpr />;
}
