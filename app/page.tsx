import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Logos from "@/components/Logos"
import ServicesGrid from "@/components/ServicesGrid";
import Trusted from "@/components/Trusted";
import DataFormatting from "@/components/DataFormatting";
import DataDelivery from "@/components/DataDelivery";
import WhyChoose from "@/components/WhyChoose";

export const metadata: Metadata = {
  title: "Web Scraping & Data Extraction Services | Business Data Labs",
  description: "Business Data Labs provides professional web scraping and data extraction services. Convert website data into Excel, CSV, or JSON formats for research, business intelligence, and automation.",
};

export default function Home() {
  return (
    <>
      <Hero />
      <Logos />
      <ServicesGrid />
      <Trusted />
      <DataFormatting />
      <DataDelivery />
      <WhyChoose />
    </>
  );
}
