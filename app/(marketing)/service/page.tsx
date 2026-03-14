import type { Metadata } from "next";
import Service from "@/components/service/Service";

export const metadata: Metadata = {
  title: "Web Scraping Services & Data Extraction Solutions | Business Data Labs",
  description: "Explore Business Data Labs's web scraping services for e-commerce, real estate, finance, recruitment, and lead generation. Get accurate, structured data in CSV, Excel, or JSON formats.",
};

export default function ServicePage() {
  return <Service />;
}
