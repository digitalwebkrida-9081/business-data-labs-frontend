"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  FaArrowLeft,
  FaArrowRight,
  FaClock,
  FaUser,
  FaCalendar,
  FaShareAlt,
} from "react-icons/fa";
import { FaLinkedinIn, FaXTwitter, FaFacebookF } from "react-icons/fa6";
import { HiOutlineBookOpen } from "react-icons/hi";

// Utility: Generate a slug-style id from heading text
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function BlogDetail() {
  const params = useParams();
  const slug = params?.slug;
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch(
          "https://stagservice.datasellerhub.com/api/posts",
          {
            cache: "no-store",
          },
        );
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

  const post = blogPosts.find((p) => p.slug === slug);

  const [activeId, setActiveId] = useState("");
  const [readProgress, setReadProgress] = useState(0);
  const articleRef = useRef(null);

  // Extract headings from content for TOC
  const tocHeadings = useMemo(() => {
    if (!post || !post.content) return [];

    // Split into paragraphs/lines
    const lines = post.content
      .split(/\n+/)
      .map((l) => l.trim())
      .filter(Boolean);
    const headings = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      // Check for explicit markdown headings
      if (line.startsWith("### ")) {
        const text = line.replace("### ", "").trim();
        headings.push({ text, id: slugify(text), level: 3 });
      } else if (line.startsWith("## ")) {
        const text = line.replace("## ", "").trim();
        headings.push({ text, id: slugify(text), level: 2 });
      }
      // Heuristic for plaintext implicit headings:
      // Short line (< 50 chars), no ending periods, next line is long
      else if (
        line.length > 3 &&
        line.length < 50 &&
        !line.endsWith(".") &&
        !line.endsWith(":") &&
        !line.endsWith(",") &&
        (i === lines.length - 1 ||
          lines[i + 1].length > 50 ||
          lines[i + 1].startsWith("- "))
      ) {
        // Treat as heading level 2
        headings.push({
          text: line,
          id: slugify(line),
          level: 2,
          implicit: true,
        });
      }
    }
    return headings;
  }, [post]);

  // Scroll progress + active section tracking
  useEffect(() => {
    if (!post) return;

    const handleScroll = () => {
      // Reading progress
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0;
      setReadProgress(progress);

      // Active heading detection
      let currentId = "";
      for (const heading of tocHeadings) {
        const el = document.getElementById(heading.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140) {
            currentId = heading.id;
          }
        }
      }
      setActiveId(currentId);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [post, tocHeadings]);

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-xl text-blue-600 font-semibold">
          Loading article...
        </div>
      </section>
    );
  }

  if (!post) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center px-6">
          <div className="text-7xl mb-6">📄</div>
          <h1 className="text-3xl font-bold text-slate-900 mb-3">
            Article Not Found
          </h1>
          <p className="text-slate-500 mb-8 max-w-md mx-auto">
            The article you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-blue-500 transition-all"
          >
            <FaArrowLeft size={12} />
            Back to Blog
          </Link>
        </div>
      </section>
    );
  }

  // Find related posts (same category, excluding current)
  const relatedPosts = blogPosts
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 2);

  // If not enough in same category, add others
  if (relatedPosts.length < 2) {
    const others = blogPosts
      .filter(
        (p) =>
          p.slug !== post.slug && !relatedPosts.find((r) => r.slug === p.slug),
      )
      .slice(0, 2 - relatedPosts.length);
    relatedPosts.push(...others);
  }

  // Get current index for next/prev navigation
  const currentIndex = blogPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  // Simple markdown-like rendering for blog content
  const renderContent = (content) => {
    if (!content) return [];

    // Use the exact same paragraph splitting logic
    const lines = content
      .split(/\n+/)
      .map((l) => l.trim())
      .filter(Boolean);
    const elements = [];
    let inList = false;
    let listItems = [];

    const flushList = () => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={`list-${elements.length}`} className="space-y-3 my-6 pl-1">
            {listItems.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-slate-600 leading-relaxed"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5 shrink-0" />
                <span
                  dangerouslySetInnerHTML={{ __html: formatInline(item) }}
                />
              </li>
            ))}
          </ul>,
        );
        listItems = [];
        inList = false;
      }
    };

    const formatInline = (text) => {
      let formatted = text.replace(
        /\*\*(.*?)\*\*/g,
        '<strong class="font-semibold text-slate-800">$1</strong>',
      );
      formatted = formatted.replace(
        /\[(.*?)\]\((.*?)\)/g,
        '<a href="$2" class="text-blue-600 hover:text-blue-800 underline transition-colors" target="_blank" rel="noopener noreferrer">$1</a>',
      );
      return formatted;
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (line.startsWith("### ")) {
        flushList();
        const headingText = line.replace("### ", "").trim();
        elements.push(
          <h3
            key={`h3-${i}`}
            id={slugify(headingText)}
            className="text-xl font-semibold text-slate-800 mt-8 mb-3 scroll-mt-32"
          >
            {headingText}
          </h3>,
        );
      } else if (line.startsWith("## ")) {
        flushList();
        const headingText = line.replace("## ", "").trim();
        elements.push(
          <h2
            key={`h2-${i}`}
            id={slugify(headingText)}
            className="text-2xl font-bold text-slate-900 mt-10 mb-4 scroll-mt-32"
          >
            {headingText}
          </h2>,
        );
      } else if (
        line.length > 3 &&
        line.length < 50 &&
        !line.endsWith(".") &&
        !line.endsWith(":") &&
        !line.endsWith(",") &&
        (i === lines.length - 1 ||
          lines[i + 1].length > 50 ||
          lines[i + 1].startsWith("- "))
      ) {
        // Implicit Heading logic matched from TOC
        flushList();
        elements.push(
          <h2
            key={`implicit-h2-${i}`}
            id={slugify(line)}
            className="text-2xl font-bold text-slate-900 mt-10 mb-4 scroll-mt-32"
          >
            {line}
          </h2>,
        );
      } else if (line.startsWith("- ")) {
        inList = true;
        listItems.push(line.replace("- ", ""));
      } else if (/^\d+\.\s/.test(line)) {
        flushList();
        if (!inList) {
          inList = true;
        }
        listItems.push(line.replace(/^\d+\.\s/, ""));
      } else {
        flushList();
        elements.push(
          <p
            key={`p-${i}`}
            className="text-slate-600 leading-relaxed my-4"
            dangerouslySetInnerHTML={{ __html: formatInline(line) }}
          />,
        );
      }
    }
    flushList();

    if (post.showCta && elements.length > 0) {
      const middleIndex = Math.floor(elements.length / 2);
      const ctaElement = (
        <div
          key="inline-cta"
          className="my-8 bg-linear-to-br from-blue-600 to-indigo-700 rounded-xl p-6 md:px-8 md:py-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-500/30 w-full flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="max-w-xl text-center md:text-left">
            <h3 className="text-xl md:text-2xl font-bold mb-2 mt-0 text-white">
              Enhance Your Data Strategy
            </h3>
            <p className="text-blue-100 text-sm md:text-base leading-relaxed m-0">
              {post.ctaText ||
                "Need Custom Data? Get high-quality scraped data tailored to your business needs."}
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-blue-50 hover:scale-105 transition-all shadow-md group shrink-0 whitespace-nowrap"
          >
            Get a Free Quote
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      );
      elements.splice(middleIndex, 0, ctaElement);
    }

    return elements;
  };

  const handleTocClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      {/* ================= READING PROGRESS BAR ================= */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-slate-200/50">
        <div
          className="h-full bg-linear-to-r from-blue-500 to-cyan-400 transition-all duration-150 ease-out"
          style={{ width: `${readProgress}%` }}
        />
      </div>

      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden bg-slate-900 py-28">
        {/* If Image Exists, use it as background with heavy overlay */}
        {post.imageUrl ? (
          <div className="absolute inset-0">
            <img
              src={
                post.imageUrl.startsWith("http")
                  ? post.imageUrl
                  : `https://stagservice.datasellerhub.com${post.imageUrl}`
              }
              alt={post.title}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-linear-to-r from-[#020617] via-[#020617]/90 to-[#0a1f44]/80" />
          </div>
        ) : (
          <>
            {/* Original Decorative Background */}
            <div className="absolute inset-0 bg-linear-to-r from-[#020617] via-[#020617] to-[#0a1f44]" />
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.15),transparent_40%)]" />

            {/* Pattern Overlay */}
            <div className="absolute inset-0 opacity-10">
              <div
                className="w-full h-full"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, white 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />
            </div>

            {/* Decorative Circles */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
          </>
        )}

        <div className="relative max-w-4xl mx-auto px-6 text-white">
          {/* Breadcrumb */}
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wide text-white/70 border border-white/20 rounded-full px-4 py-1 mb-6">
            <Link href="/" className="hover:text-white transition">
              Home
            </Link>
            <span className="text-white/40">–</span>
            <Link href="/blog" className="hover:text-white transition">
              Blog
            </Link>
            <span className="text-white/40">–</span>
            <span className="text-white">{post.category}</span>
          </div>

          {/* Category Badge */}
          <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium text-white mb-4">
            {post.category}
          </span>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-bold leading-tight max-w-3xl">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 mt-6 text-white/80 text-sm">
            <span className="flex items-center gap-2">
              <FaUser size={12} />
              {post.author}
            </span>
            <span className="flex items-center gap-2">
              <FaCalendar size={12} />
              {post.date}
            </span>
            <span className="flex items-center gap-2">
              <FaClock size={12} />
              {post.readTime}
            </span>
          </div>
        </div>
      </section>

      {/* ================= ARTICLE CONTENT ================= */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12">
            {/* Main Content */}
            <article ref={articleRef} className="prose-custom">
              {renderContent(post.content)}
            </article>

            {/* Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-20 space-y-6">
                {/* ===== TABLE OF CONTENTS ===== */}
                {tocHeadings.length > 0 && (
                  <div className="bg-[#F7FAFF] rounded-xl border border-blue-100 overflow-hidden">
                    {/* TOC Header */}
                    <div className="px-5 py-4 border-b border-blue-100 flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center">
                        <HiOutlineBookOpen className="text-blue-600 text-sm" />
                      </div>
                      <h4 className="text-m font-bold text-slate-800 tracking-tight">
                        Table of Contents
                      </h4>
                    </div>

                    {/* TOC Progress Track */}
                    <div className="relative px-5 py-4">
                      {/* Vertical progress line */}
                      <div className="absolute left-5 top-4 bottom-4 w-[2px] bg-slate-200 rounded-full" />
                      <div
                        className="absolute left-5 top-4 w-[2px] bg-linear-to-b from-blue-500 to-cyan-400 rounded-full transition-all duration-300 ease-out"
                        style={{
                          height: `${
                            tocHeadings.length > 0
                              ? Math.max(
                                  ((() => {
                                    const idx = tocHeadings.findIndex(
                                      (h) => h.id === activeId,
                                    );
                                    return idx >= 0 ? idx : 0;
                                  })() /
                                    Math.max(tocHeadings.length - 1, 1)) *
                                    100,
                                  activeId ? 4 : 0,
                                )
                              : 0
                          }%`,
                        }}
                      />

                      {/* TOC Items */}
                      <nav className="space-y-0.5">
                        {tocHeadings.map((heading) => {
                          const isActive = heading.id === activeId;
                          const isSubheading = heading.level === 3;

                          return (
                            <a
                              key={heading.id}
                              href={`#${heading.id}`}
                              onClick={(e) => handleTocClick(e, heading.id)}
                              className={`
                                group relative flex items-center gap-3 py-1.5 text-sm leading-snug transition-all duration-200
                                ${isSubheading ? "pl-6" : "pl-4"}
                                ${
                                  isActive
                                    ? "text-blue-600 font-semibold"
                                    : "text-slate-500 hover:text-slate-800"
                                }
                              `}
                            >
                              {/* Dot indicator */}
                              <span
                                className={`
                                  absolute shrink-0 w-2 h-2 rounded-full border-2 transition-all duration-200 z-10 bg-white
                                  ${isSubheading ? "left-[-2px]" : "left-[-2px]"}
                                  ${
                                    isActive
                                      ? "border-blue-500 scale-125 shadow-sm shadow-blue-200"
                                      : "border-slate-300 group-hover:border-slate-400"
                                  }
                                `}
                              />
                              <span className="truncate">{heading.text}</span>
                            </a>
                          );
                        })}
                      </nav>
                    </div>

                    {/* Reading Progress Footer */}
                    <div className="px-5 py-3 border-t border-blue-100 bg-blue-50/50">
                      <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1.5">
                        <span className="font-medium uppercase tracking-wider">
                          Reading Progress
                        </span>
                        <span className="font-bold text-blue-600">
                          {Math.round(readProgress)}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-linear-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-300 ease-out"
                          style={{ width: `${readProgress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Share Card */}
                <div className="bg-[#F7FAFF] rounded-xl p-6 border border-blue-50">
                  <h4 className="text-sm font-semibold text-slate-800 mb-4 flex items-center gap-2">
                    <FaShareAlt size={12} className="text-blue-600" />
                    Share Article
                  </h4>
                  <div className="flex gap-2">
                    <button className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-blue-600 hover:border-blue-200 transition cursor-pointer">
                      <FaLinkedinIn size={14} />
                    </button>
                    <button className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-blue-600 hover:border-blue-200 transition cursor-pointer">
                      <FaXTwitter size={14} />
                    </button>
                    <button className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-blue-600 hover:border-blue-200 transition cursor-pointer">
                      <FaFacebookF size={14} />
                    </button>
                  </div>
                </div>

                {/* Author Card */}
                <div className="bg-[#F7FAFF] rounded-xl p-6 border border-blue-50">
                  <h4 className="text-sm font-semibold text-slate-800 mb-3">
                    Written by
                  </h4>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                      DS
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        {post.author}
                      </p>
                      <p className="text-xs text-slate-500">
                        Data & Insights Expert
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA Card */}
                <div className="bg-linear-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white">
                  <h4 className="font-semibold mb-2">Need Custom Data?</h4>
                  <p className="text-blue-100 text-xs leading-relaxed mb-4">
                    Get high-quality scraped data tailored to your business
                    needs.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-lg text-xs font-semibold hover:bg-blue-50 transition"
                  >
                    Get a Quote
                    <FaArrowRight size={10} />
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ================= PREV/NEXT NAVIGATION ================= */}
      <section className="bg-[#e8f0ff] py-12 border-t border-blue-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {prevPost ? (
              <Link href={`/blog/${prevPost.slug}`} className="group">
                <div className="bg-white rounded-xl p-6 border border-slate-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300 h-full">
                  <span className="flex items-center gap-2 text-xs text-slate-400 mb-3 font-medium uppercase tracking-wide">
                    <FaArrowLeft size={10} />
                    Previous Article
                  </span>
                  <h4 className="text-base font-semibold text-slate-800 group-hover:text-blue-600 transition-colors leading-snug">
                    {prevPost.title}
                  </h4>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {nextPost ? (
              <Link href={`/blog/${nextPost.slug}`} className="group">
                <div className="bg-white rounded-xl p-6 border border-slate-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300 h-full text-right">
                  <span className="flex items-center justify-end gap-2 text-xs text-slate-400 mb-3 font-medium uppercase tracking-wide">
                    Next Article
                    <FaArrowRight size={10} />
                  </span>
                  <h4 className="text-base font-semibold text-slate-800 group-hover:text-blue-600 transition-colors leading-snug">
                    {nextPost.title}
                  </h4>
                </div>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </section>

      {/* ================= RELATED ARTICLES ================= */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-10">
            Related Articles
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedPosts.map((rPost) => (
              <Link key={rPost.slug} href={`/blog/${rPost.slug}`}>
                <article className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col sm:flex-row border border-slate-100 hover:border-blue-200">
                  {/* Card Image / Gradient */}
                  {rPost.imageUrl ? (
                    <div className="relative h-48 sm:h-auto sm:w-48 overflow-hidden shrink-0 bg-slate-100">
                      <img
                        src={
                          rPost.imageUrl.startsWith("http")
                            ? rPost.imageUrl
                            : `https://stagservice.datasellerhub.com${rPost.imageUrl}`
                        }
                        alt={rPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : (
                    <div
                      className={`relative h-48 sm:h-auto sm:w-48 bg-linear-to-br ${rPost.gradient} overflow-hidden shrink-0`}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-5xl opacity-30 group-hover:scale-110 transition-transform duration-500">
                          {rPost.icon}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Card Body */}
                  <div className="p-6 flex flex-col grow">
                    <span className="inline-block px-2.5 py-0.5 bg-blue-50 text-blue-600 rounded-full text-xs font-medium mb-3 w-fit">
                      {rPost.category}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors leading-snug">
                      {rPost.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-4 grow line-clamp-2">
                      {rPost.excerpt}
                    </p>
                    <div className="flex items-center gap-3 text-slate-400 text-xs">
                      <span className="flex items-center gap-1">
                        <FaClock size={10} />
                        {rPost.readTime}
                      </span>
                      <span>{rPost.date}</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* Back to Blog */}
          <div className="text-center mt-12">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-3.5 rounded-xl font-semibold text-sm hover:bg-slate-800 transition-all group"
            >
              <FaArrowLeft
                className="group-hover:-translate-x-1 transition-transform"
                size={12}
              />
              Back to All Articles
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
