import React, { Suspense } from 'react';
import type { Metadata, ResolvingMetadata } from 'next';
import B2bCountryDetail from '@/components/b2b/B2bCountryDetail';

type Props = {
  params: Promise<{ country: string }>
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params;
  const countrySlug = resolvedParams.country;
  
  if (!countrySlug || typeof countrySlug !== 'string') {
      return {
          title: 'Business Reports | Data Scraper Hub',
          description: 'Explore global business data and leads.'
      };
  }

  // Simple decoding for instant SEO response
  const countryName = decodeURIComponent(countrySlug).replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  return {
      title: `${countryName} Business Database | B2B Leads & Company Records`,
      description: `Access comprehensive B2B leads, verified company data, and market insights for ${countryName}. Drill down by state or explore top industry categories to fuel your growth.`,
      openGraph: {
          title: `${countryName} Business Data Reports`,
          description: `Get verified B2B leads in ${countryName}.`,
      },
      alternates: {
        canonical: `/business-reports/${encodeURIComponent(countrySlug)}`
      }
  };
}

export default async function BusinessReportPage({ params }: Props) {
  const resolvedParams = await params;
  const country = resolvedParams.country;

  if (!country || typeof country !== 'string') {
      return <div>Invalid Country Parameter</div>;
  }

  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-slate-500">Loading report...</div>}>
       <B2bCountryDetail countrySlug={country} />
    </Suspense>
  );
}
