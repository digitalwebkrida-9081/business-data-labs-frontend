import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone', // Optimized server build supporting dynamic SEO
  // distDir: 'dist',  // Reverted to default .next
  experimental: {
    optimizeCss: true, // Enable critical CSS inlining
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
