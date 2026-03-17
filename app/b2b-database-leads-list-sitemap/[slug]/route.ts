import { NextResponse } from 'next/server';

export const revalidate = 3600;


const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://stagservice.datasellerhub.com';

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

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const host = request.headers.get('host');
  const scheme = request.headers.get('x-forwarded-proto') || 'https';
  const baseUrl = host ? `${scheme}://${host}` : 'https://businessdatalabs.com';
  const { slug } = await params;

  // Expected format: leads-list-[country-slug].xml
  if (!slug.startsWith('leads-list-') || !slug.endsWith('.xml')) {
    return new NextResponse('Invalid sitemap format', { status: 404 });
  }

  const countrySlug = slug.replace('leads-list-', '').replace('.xml', '');

  let datasetUrls: any[] = [];
  let countryCode = '';

  try {
    // 1. Fetch countries to find the matching code for the countrySlug
    const countriesRes = await fetch(`${apiUrl}/api/merged/countries`, { next: { revalidate: 3600 } });
    if (countriesRes.ok) {
      const countriesResult = await countriesRes.json();
      const countries = countriesResult.data?.countries || [];
      
      const match = countries.find((c: any) => {
        const nameSlug = c.name ? slugify(c.name) : '';
        const codeSlug = c.code ? c.code.toLowerCase() : '';
        // Special case for UK/GB
        if (countrySlug === 'united-kingdom' && (c.code === 'UK' || c.code === 'GB')) return true;
        return nameSlug === countrySlug || codeSlug === countrySlug;
      });

      if (match) {
        countryCode = match.code;
      }
    }

    if (!countryCode) {
      console.error(`Sitemap: Country not found for slug: ${countrySlug}`);
      return new NextResponse('Country not found', { status: 404 });
    }

    // 2. Fetch ALL categories for this country using the merged data API
    const res = await fetch(
      `${apiUrl}/api/merged/categories?country=${encodeURIComponent(countryCode)}&limit=10000`,
      { next: { revalidate: 3600 } }
    );

    if (res.ok) {
      const result = await res.json();
      const categories = result.data?.categories || [];

      datasetUrls = categories.map((cat: any) => {
        const categorySlug = cat.name; // Already slugified (e.g., "schools", "restaurants")

        return {
          url: `${baseUrl}/b2b-database/leads-list-of-${categorySlug}-in-${countrySlug}`,
          lastModified: cat.lastModified ? new Date(cat.lastModified).toISOString() : new Date().toISOString(),
          changeFrequency: 'weekly',
          priority: '0.6',
        };
      });
    }
  } catch (error) {
    console.error(`Sitemap: Error fetching categories for ${countrySlug}`, error);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${datasetUrls.map((item) => `
  <url>
    <loc>${escapeXml(item.url)}</loc>
    <lastmod>${item.lastModified}</lastmod>
    <changefreq>${item.changeFrequency}</changefreq>
    <priority>${item.priority}</priority>
  </url>`).join('')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
