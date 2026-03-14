"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FaPhoneAlt, FaArrowRight } from "react-icons/fa";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "/service" },
    { name: "B2B Database", href: "/b2b-database" },
    { name: "Location Reports", href: "/location-report" },
    { name: "Blog", href: "/blog" },
    { name: "Contact Us", href: "/contact" },
  ];

  const isActive = (path) => pathname === path;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-md shadow-sm py-3"
            : "bg-white py-5 shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative overflow-hidden w-10 h-10 rounded-lg">
              <img
                src="/images/logo.png"
                alt="Business Data Labs"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <span className="font-bold text-xl md:text-2xl tracking-tight text-slate-900">
              Business Data Labs
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive(link.href)
                    ? "text-blue-600 bg-blue-50"
                    : "text-slate-600 hover:text-blue-600 hover:bg-slate-50"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* CTA BUTTONS */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+919081466782"
              className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition text-sm font-semibold"
            >
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                <FaPhoneAlt size={12} />
              </div>
              <span>+61 414 003 350</span>
            </a>
            <Link
              href="/b2b-database"
              className="bg-[#030e21] text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-lg shadow-blue-900/10 hover:shadow-blue-900/20 hover:bg-slate-900 transition flex items-center gap-2 group"
            >
              Get Data{" "}
              <FaArrowRight
                className="group-hover:translate-x-1 transition-transform"
                size={12}
              />
            </Link>
          </div>

          {/* MOBILE TOGGLE */}
          <button
            className="lg:hidden p-2 text-slate-900 hover:bg-slate-100 rounded-lg transition"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <HiMenuAlt3 size={28} />
          </button>
        </div>
      </header>

      {/* MOBILE MENU OVERLAY */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-slate-900/50 z-60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 right-0 w-[80%] max-w-sm bg-white z-70 shadow-2xl transform transition-transform duration-300 lg:hidden flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 flex items-center justify-between border-b border-slate-100">
          <span className="font-bold text-xl text-slate-900">Menu</span>
          <button
            onClick={() => setOpen(false)}
            className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition"
          >
            <HiX size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`block px-4 py-3 rounded-lg text-base font-medium transition ${
                isActive(link.href)
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="p-6 border-t border-slate-100 bg-slate-50 space-y-4">
          <a
            href="tel:+919081466782"
            className="flex items-center gap-3 text-slate-700 font-semibold p-3 bg-white rounded-xl border border-slate-200 shadow-sm"
          >
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
              <FaPhoneAlt size={14} />
            </div>
            <div>
              <div className="text-xs text-slate-500 font-normal">
                Call Us Support
              </div>
              <div>+61 414 003 350</div>
            </div>
          </a>
          <Link
            href="/b2b-database"
            onClick={() => setOpen(false)}
            className="block w-full text-center bg-[#030e21] text-white py-3.5 rounded-xl font-bold shadow-lg"
          >
            Access Database
          </Link>
        </div>
      </div>
    </>
  );
}
