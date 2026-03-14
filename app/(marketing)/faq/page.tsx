import type { Metadata } from "next";
import FaqSection from "@/components/faq/FaqSection";

export const metadata: Metadata = {
  title: "FAQs | Business Data Labs",
  description: "Find answers to common questions about web scraping, data extraction, B2B databases, pricing, data formats, and delivery. Learn how Business Data Labs helps businesses access structured data.",
};

export default function FaqPage() {
  return <FaqSection />;
}
