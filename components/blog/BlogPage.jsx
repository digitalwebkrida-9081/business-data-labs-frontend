"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaArrowRight, FaClock, FaUser, FaSearch } from "react-icons/fa";
import { HiOutlineBookOpen } from "react-icons/hi";

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("https://stagservice.datasellerhub.com/api/posts", {
          cache: "no-store",
        });
        const data = await res.json();
        const published = data.filter((p) => p.status === "published");
        const formattedData = published.map((p) => ({
          ...p,
          date: p.createdAt
            ? new Date(p.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : "N/A",
        }));
        setBlogPosts(formattedData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  const uniqueCategories = Array.from(
    new Set(blogPosts.map((p) => p.category).filter(Boolean)),
  );
  const categories = ["All", ...uniqueCategories];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      activeCategory === "All" || post.category === activeCategory;
    const safeTitle = post.title || "";
    const safeExcerpt = post.excerpt || "";
    const matchesSearch =
      safeTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      safeExcerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = blogPosts.filter((post) => post.featured);

  return (
    <>
      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden bg-linear-to-r from-[#020617] via-[#020617] to-[#0a1f44] py-28">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.15),transparent_40%)]" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />

        {/* Floating Dots Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          ̥
        </div>

        <div className="relative max-w-7xl mx-auto px-6 text-white grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="flex flex-col">
            {/* Breadcrumb */}
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wide text-blue-400 border border-blue-400/30 rounded-full px-4 py-1 mb-6 self-start">
              <span>Home</span>
              <span className="text-gray-400">–</span>
              <span className="text-white">Blog</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Insights & Resources from{" "}
              <span className="bg-linear-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                DataSellerHub
              </span>
            </h1>

            <p className="mt-6 text-lg text-slate-300 max-w-xl leading-relaxed">
              Expert articles on web scraping, data extraction, B2B databases,
              and industry insights to help you make data-driven decisions.
            </p>

            {/* Search Bar */}
            <div className="mt-10 max-w-md w-full">
              <div className="relative group">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-400 transition-colors" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-5 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-white placeholder-slate-400 outline-none focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20 transition-all text-sm"
                />
              </div>
            </div>

            {/* Scroll Indicator */}
            {/* <div className="mt-12">
              <div className="w-7 h-12 rounded-full border border-white/40 flex justify-center">
                <span className="w-1.5 h-3 bg-white/80 rounded-full mt-2 animate-bounce" />
              </div>
            </div> */}
          </div>

          {/* Right Image */}
          <div className="hidden lg:flex justify-center items-center">
            <img
              src="images/bg-service.png"
              alt="DataSellerHub Blog Insights"
              className="w-full h-auto max-w-lg rounded-xl"
            />
          </div>
        </div>
      </section>

      {loading && (
        <div className="flex justify-center items-center py-20 text-blue-600">
          Loading posts...
        </div>
      )}

      {/* ================= FEATURED POSTS ================= */}
      {!loading && featuredPosts.length > 0 && (
        <section className="bg-white py-14">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <HiOutlineBookOpen className="text-blue-600 text-xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Featured Articles
                </h2>
                <p className="text-sm text-slate-500">
                  Our most popular and insightful articles
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Large Featured Card */}
              <div className="lg:col-span-2 group">
                <Link href={`/blog/${featuredPosts[0]?.slug}`}>
                  <div className="relative h-full min-h-[400px] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                    {/* Gradient Background OR Image */}
                    {featuredPosts[0]?.imageUrl ? (
                      <div className="absolute inset-0">
                        <img
                          src={
                            featuredPosts[0].imageUrl.startsWith("http")
                              ? featuredPosts[0].imageUrl
                              : `https://stagservice.datasellerhub.com${featuredPosts[0].imageUrl}`
                          }
                          alt={featuredPosts[0].title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        {/* Gradient overlay for readability */}
                        <div className="absolute inset-0 bg-linear-to-t from-[#020617] via-[#020617]/50 to-transparent" />
                      </div>
                    ) : (
                      <>
                        {/* Gradient Background */}
                        <div
                          className={`absolute inset-0 bg-linear-to-br ${featuredPosts[0]?.gradient}`}
                        />

                        {/* Pattern Overlay */}
                        <div className="absolute inset-0 opacity-10">
                          <div
                            className="w-full h-full"
                            style={{
                              backgroundImage:
                                "radial-gradient(circle, white 1px, transparent 1px)",
                              backgroundSize: "30px 30px",
                            }}
                          />
                        </div>
                      </>
                    )}

                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-10">
                      <div className="mb-auto">
                        <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium text-white mb-4">
                          {featuredPosts[0]?.category}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:translate-x-1 transition-transform duration-300">
                          {featuredPosts[0]?.title}
                        </h3>
                        <p className="text-white/80 text-sm md:text-base leading-relaxed max-w-xl mb-6">
                          {featuredPosts[0]?.excerpt}
                        </p>
                        <div className="flex items-center gap-4 text-white/70 text-xs">
                          <span className="flex items-center gap-1.5">
                            <FaUser size={10} />
                            {featuredPosts[0]?.author}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <FaClock size={10} />
                            {featuredPosts[0]?.readTime}
                          </span>
                          <span>{featuredPosts[0]?.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Side Featured Cards */}
              <div className="flex flex-col gap-6">
                {featuredPosts.slice(1, 3).map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`}>
                    <div className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 h-[188px]">
                      {/* Gradient Background OR Image */}
                      {post.imageUrl ? (
                        <div className="absolute inset-0">
                          <img
                            src={
                              post.imageUrl.startsWith("http")
                                ? post.imageUrl
                                : `https://stagservice.datasellerhub.com${post.imageUrl}`
                            }
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-linear-to-t from-[#020617] via-[#020617]/50 to-transparent" />
                        </div>
                      ) : (
                        <div
                          className={`absolute inset-0 bg-linear-to-br ${post.gradient}`}
                        />
                      )}

                      {/* Content */}
                      <div className="relative z-10 h-full flex flex-col justify-end p-6">
                        <div className="mb-auto">
                          <span className="inline-block px-2.5 py-0.5 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium text-white">
                            {post.category}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-white group-hover:translate-x-1 transition-transform duration-300 leading-snug">
                          {post.title}
                        </h3>
                        <div className="flex items-center gap-3 text-white/70 text-xs mt-2">
                          <span className="flex items-center gap-1">
                            <FaClock size={9} />
                            {post.readTime}
                          </span>
                          <span>{post.date}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ================= ALL ARTICLES ================= */}
      {!loading && (
        <section className="bg-[#e6f0ff] py-14">
          <div className="max-w-7xl mx-auto px-6">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <h2 className="text-3xl font-bold text-slate-900">
                  All Articles
                </h2>
                <p className="text-slate-500 mt-2">
                  Browse our complete collection of expert insights
                </p>
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                      activeCategory === cat
                        ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                        : "bg-white text-slate-600 hover:text-blue-600 hover:bg-blue-50 border border-slate-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Blog Grid */}
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`}>
                    <article className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 h-full flex flex-col border border-slate-100 hover:border-blue-200">
                      {/* Card Header with Gradient OR Image */}
                      {post.imageUrl ? (
                        <div className="relative h-48 overflow-hidden bg-slate-100">
                          <img
                            src={
                              post.imageUrl.startsWith("http")
                                ? post.imageUrl
                                : `https://stagservice.datasellerhub.com${post.imageUrl}`
                            }
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-4 left-4 z-10">
                            <span className="inline-block px-3 py-1 bg-white/70 backdrop-blur-md rounded-full text-xs font-semibold text-slate-900 shadow-sm">
                              {post.category}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div
                          className={`relative h-48 bg-linear-to-br ${post.gradient} overflow-hidden`}
                        >
                          {/* Pattern */}
                          <div className="absolute inset-0 opacity-10">
                            <div
                              className="w-full h-full"
                              style={{
                                backgroundImage:
                                  "radial-gradient(circle, white 1px, transparent 1px)",
                                backgroundSize: "24px 24px",
                              }}
                            />
                          </div>

                          {/* Large Icon */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-7xl opacity-30 group-hover:scale-110 transition-transform duration-500">
                              {post.icon}
                            </span>
                          </div>

                          {/* Category Badge */}
                          <div className="absolute top-4 left-4">
                            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium text-white">
                              {post.category}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Card Body */}
                      <div className="p-6 flex flex-col grow">
                        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors duration-300 leading-snug">
                          {post.title}
                        </h3>

                        <p className="text-slate-500 text-sm leading-relaxed mb-6 grow">
                          {post.excerpt}
                        </p>

                        {/* Meta Info */}
                        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                          <div className="flex items-center gap-3 text-slate-400 text-xs">
                            <span className="flex items-center gap-1.5">
                              <FaClock size={10} />
                              {post.readTime}
                            </span>
                            <span>{post.date}</span>
                          </div>
                          <span className="flex items-center gap-1 text-blue-600 text-sm font-semibold group-hover:gap-2 transition-all">
                            Read
                            <FaArrowRight size={10} />
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">📭</div>
                <h3 className="text-xl font-semibold text-slate-700 mb-2">
                  No articles found
                </h3>
                <p className="text-slate-500">
                  Try adjusting your search or filter to find what you&apos;re
                  looking for.
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ================= CTA SECTION ================= */}
      <section className="bg-white py-14">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-linear-to-br from-[#020617] via-[#0a1f44] to-[#020617] rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
            {/* Decorative */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl" />

            <div className="relative z-10">
              <span className="inline-block px-4 py-1.5 bg-blue-500/20 text-blue-300 text-xs font-semibold rounded-full mb-6 tracking-wide uppercase">
                Get Started Today
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Leverage the Power of Data?
              </h2>
              <p className="text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                Whether you need web scraping services, B2B databases, or custom
                data solutions, our team is ready to help you succeed.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-3.5 rounded-xl font-semibold text-sm transition-all shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40 group"
                >
                  Contact Us
                  <FaArrowRight
                    className="group-hover:translate-x-1 transition-transform"
                    size={12}
                  />
                </Link>
                <Link
                  href="/b2b"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-3.5 rounded-xl font-semibold text-sm transition-all border border-white/10"
                >
                  Explore B2B Database
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
