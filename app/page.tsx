import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Logos from "@/components/Logos"
import ServicesGrid from "@/components/ServicesGrid";
import Trusted from "@/components/Trusted";
import DataFormatting from "@/components/DataFormatting";
import DataDelivery from "@/components/DataDelivery";
import WhyChoose from "@/components/WhyChoose";

export const metadata: Metadata = {
  title: "AI-Powered Web and Data Scraping Services",
  description: "AI-powered web scraping solution to scrape data from any website and transfer it into Excel, CSV, JSON, and many others. Get reliable web scraping services that drive your business forward.",
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
