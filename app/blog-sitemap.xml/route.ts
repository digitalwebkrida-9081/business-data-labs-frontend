import { NextResponse } from 'next/server';

export const revalidate = 3600;

const baseUrl = 'https://businessdatalabs.com';
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

export async function GET() {
  let urls: any[] = [];
  try {
    const res = await fetch(`${apiUrl}/api/posts`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const posts = await res.json();
      
      urls = posts.map((post: any) => {
        if (!post.slug) return null;
        return {
          url: `${baseUrl}/blog/${post.slug}`,
          lastModified: post.updatedAt ? new Date(post.updatedAt).toISOString() : new Date().toISOString(),
          changeFrequency: 'weekly',
          priority: '0.7',
        };
      }).filter(Boolean);
    }
  } catch (error) {
    console.error('Sitemap: Error fetching blog posts', error);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.map((item) => `
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
