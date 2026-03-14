import { NextResponse } from 'next/server';

export const revalidate = 3600;

const baseUrl = 'https://businessdatalabs.com';
const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://stagservice.datasellerhub.com';

// Map country codes to full names for URL slugs
const countryCodeToName: Record<string, string> = {
  'US': 'united-states',
  'GB': 'united-kingdom',
  'UK': 'united-kingdom',
  'CA': 'canada',
  'AU': 'australia',
  'IN': 'india',
  'DE': 'germany',
  'FR': 'france',
  'NL': 'netherlands',
  'AE': 'uae',
};

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
}

export async function GET() {
  let sitemaps: any[] = [];

  try {
    // Fetch only the countries we actually have merged data for
    const res = await fetch(`${apiUrl}/api/merged/countries`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const result = await res.json();
      const countries = result.data?.countries || [];

      sitemaps = countries.map((country: any) => {
        const code = country.code;
        const name = country.name;
        if (!code) return null;

        const countrySlug = name ? slugify(name) : (countryCodeToName[code.toUpperCase()] || code.toLowerCase());

        return {
          url: `${baseUrl}/b2b-database-leads-list-sitemap/leads-list-${countrySlug}.xml`,
          lastModified: new Date().toISOString(),
        };
      }).filter(Boolean);
    }
  } catch (error) {
    console.error('Sitemap: Error fetching merged countries', error);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${sitemaps.map((item) => `
  <sitemap>
    <loc>${escapeXml(item.url)}</loc>
    <lastmod>${item.lastModified}</lastmod>
  </sitemap>`).join('')}
</sitemapindex>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
