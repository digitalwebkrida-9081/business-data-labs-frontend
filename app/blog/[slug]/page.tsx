import BlogDetail from "@/components/blog/BlogDetail";

type Props = {
  params: any;
};

export async function generateMetadata({ params }: Props) {
  const resolvedParams = await Promise.resolve(params);
  const { slug } = resolvedParams;

  try {
    const res = await fetch("https://stagservice.datasellerhub.com/api/posts", {
      next: { revalidate: 60 }
    });
    
    if (res.ok) {
      const posts = await res.json();
      const post = posts.find((p: any) => p.slug === slug);
      
      if (post) {
        return {
          title: post.metaTitle || post.title || "Blog Article | DataSellerHub",
          description: post.metaDescription || post.excerpt || "Read expert insights on web scraping, data extraction, and business intelligence from DataSellerHub.",
          keywords: post.metaKeywords || "web scraping, data extraction, business intelligence, DataSellerHub",
          alternates: {
            canonical: post.canonicalUrl,
          },
          openGraph: {
            title: post.metaTitle || post.title || "Blog Article | DataSellerHub",
            description: post.metaDescription || post.excerpt || "Read expert insights on web scraping, data extraction, and business intelligence from DataSellerHub.",
            type: "article",
            authors: [post.author || "Admin"],
            ...(post.imageUrl && {
              images: [
                {
                  url: post.imageUrl.startsWith("http") ? post.imageUrl : `https://stagservice.datasellerhub.com${post.imageUrl}`,
                  alt: post.altText || post.title || "DataSellerHub Blog Snapshot",
                }
              ]
            })
          },
        };
      }
    }
  } catch (err) {
    console.error("Error fetching blog metadata:", err);
  }

  // Fallback metadata
  return {
    title: "Blog Article | DataSellerHub",
    description: "Read expert insights on web scraping, data extraction, and business intelligence from DataSellerHub.",
  };
}

export default function BlogArticle() {
  return <BlogDetail />;
}
