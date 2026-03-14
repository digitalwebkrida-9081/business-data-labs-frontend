import React, { Suspense } from 'react';
import type { Metadata, ResolvingMetadata } from 'next';
import B2bDatasetDetail from '@/components/b2b/B2bDatasetDetail';

// Define Props for Next.js Page (Server Component)
type Props = {
  params: Promise<{ slug: string }>
}

// Helper to title case strings
const toTitleCase = (str: string) => {
    if (!str) return '';
    return str.replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
};

// Generate Metadata Function
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug as string;

  if (!slug) {
    return {
      title: 'Dataset Detail | Data Scraper Hub',
      description: 'View detailed business data and lead lists.'
    };
  }

  // Expecting format: leads-list-of-{category}-in-{country}
  // New format requested by user: b2b-database/leads-list-of-Abbeys-in-united-states
  
  let categoryStr = '';
  let countryStr = '';
  
  const match = slug.match(/^leads-list-of-(.+)-in-(.+)$/);
  
  if (match) {
      categoryStr = match[1];
      countryStr = match[2];
  } else {
      // Fallback if the URL structure isn't exactly matching
      return {
          title: 'Business Data Report | Data Scraper Hub',
          description: 'View detailed business data and lead lists.'
      };
  }

  const titleCategory = toTitleCase(categoryStr.replace(/-/g, ' '));
  const titleLocation = toTitleCase(countryStr.replace(/-/g, ' '));
  
  const infoTitle = `Buy ${titleCategory} B2B Leads - ${titleLocation} Business Data | Business Data Labs`;
  const infoDesc = `Download updated ${titleCategory} B2B leads data in ${titleLocation} with verified emails, direct phone numbers, company details, and geo-targeted data for high-converting outreach.`;

  return {
    title: infoTitle,
    description: infoDesc,
    openGraph: { title: infoTitle, description: infoDesc },
    alternates: {
      canonical: `/b2b-database/${slug}`
    }
  };
}

export default async function DatasetDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug as string;

  if (!slug) {
      return <div className="min-h-screen flex items-center justify-center text-slate-500">Invalid Dataset — missing parameters</div>;
  }

  let categoryRaw = '';
  let countryRaw = '';
  
  const match = slug.match(/^leads-list-of-(.+)-in-(.+)$/);
  
  if (match) {
      categoryRaw = match[1];
      countryRaw = match[2];
  } else {
      return <div className="min-h-screen flex items-center justify-center text-slate-500">Invalid url format</div>;
  }
  
  // Reconstruct country name as expected by the component
  const countryFormatted = countryRaw.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  const categoryFormatted = categoryRaw;

  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-slate-500">Loading details...</div>}>
       {/* @ts-ignore - JSX component accepts country/category props */}
       <B2bDatasetDetail id={''} country={countryFormatted} category={categoryFormatted} />
    </Suspense>
  );
}
