import { NextResponse } from 'next/server';

export const revalidate = 3600;



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
  const staticRoutes = [
    { path: '', priority: '1.0', changefreq: 'daily' },
    { path: '/b2b-database', priority: '0.9', changefreq: 'daily' },
    { path: '/blog', priority: '0.8', changefreq: 'daily' },
    { path: '/location-report', priority: '0.8', changefreq: 'weekly' },
    { path: '/contact', priority: '0.7', changefreq: 'monthly' },
    { path: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
    { path: '/gdpr', priority: '0.3', changefreq: 'yearly' },
    { path: '/faq', priority: '0.6', changefreq: 'monthly' },
    { path: '/service/ecom-scraping', priority: '0.7', changefreq: 'monthly' },
    { path: '/service/news-monitoring-data-scraping', priority: '0.7', changefreq: 'monthly' },  
    { path: '/service/real-estate-data-scraping', priority: '0.7', changefreq: 'monthly' },
    { path: '/service/recruitment-scraping', priority: '0.7', changefreq: 'monthly' },
    { path: '/service/research-data-scraping', priority: '0.7', changefreq: 'monthly' },
    { path: '/service/retail-data-scraping', priority: '0.7', changefreq: 'monthly' },
    { path: '/service/sales-leads-data', priority: '0.7', changefreq: 'monthly' },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticRoutes.map((item) => `
  <url>
    <loc>${escapeXml(`${baseUrl}${item.path}`)}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`).join('')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
