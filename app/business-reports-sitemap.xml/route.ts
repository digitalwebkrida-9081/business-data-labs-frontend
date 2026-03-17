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

export async function GET(request: Request) {
  const host = request.headers.get('host');
  const scheme = request.headers.get('x-forwarded-proto') || 'https';
  const baseUrl = host ? `${scheme}://${host}` : 'https://businessdatalabs.com';
  let countryUrls: any[] = [];

  try {
    // Use merged countries API — only countries we actually have data for
    const res = await fetch(`${apiUrl}/api/merged/countries`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const result = await res.json();
      const countries = result.data?.countries || [];

      countryUrls = countries.map((country: any) => {
        const name = country.name;
        if (!name) return null;
        const slug = name.toLowerCase().replace(/\s+/g, '-');

        return {
          url: `${baseUrl}/business-reports/${slug}`,
          lastModified: new Date().toISOString(),
        };
      }).filter(Boolean);
    }
  } catch (error) {
    console.error('Sitemap: Error fetching merged countries', error);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${countryUrls.map((item) => `
  <url>
    <loc>${escapeXml(item.url)}</loc>
    <lastmod>${item.lastModified}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
