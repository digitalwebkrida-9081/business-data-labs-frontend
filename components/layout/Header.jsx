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
    { name: "Contact Us", href: "/contact" },
  ];

  const isActive = (path) => pathname === path;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-2"
            : "py-4"
        }`}
        style={{
          background: scrolled
            ? 'rgba(10, 14, 26, 0.85)'
            : 'rgba(10, 14, 26, 0.4)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: scrolled
            ? '1px solid rgba(255,255,255,0.06)'
            : '1px solid transparent',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative overflow-hidden w-10 h-10 rounded-xl" style={{ boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)' }}>
              <img
                src="/images/logo.png"
                alt="Business Data Labs"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <span className="font-bold text-xl md:text-2xl tracking-tight text-white">
              Business Data <span className="gradient-text">Labs</span>
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isActive(link.href)
                    ? "text-white bg-white/10"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.name}
                {isActive(link.href) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500" />
                )}
              </Link>
            ))}
          </nav>

          {/* CTA BUTTONS */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+61414003350"
              className="flex items-center gap-2.5 text-slate-400 hover:text-white transition-all duration-300 text-sm font-semibold group"
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300"
                   style={{ background: 'rgba(99, 102, 241, 0.15)', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
                <FaPhoneAlt size={12} className="text-indigo-400 group-hover:text-indigo-300" />
              </div>
              <span>+61 414 003 350</span>
            </a>
            <Link
              href="/b2b-database"
              className="btn-primary text-sm flex items-center gap-2 group !py-2.5 !px-5"
            >
              Get Data
              <FaArrowRight
                className="group-hover:translate-x-1 transition-transform duration-300"
                size={11}
              />
            </Link>
          </div>

          {/* MOBILE TOGGLE */}
          <button
            className="lg:hidden p-2.5 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <HiMenuAlt3 size={26} />
          </button>
        </div>
      </header>

      {/* MOBILE BACKDROP */}
      <div
        className={`fixed inset-0 z-60 transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{ background: 'rgba(10, 14, 26, 0.7)', backdropFilter: 'blur(4px)' }}
        onClick={() => setOpen(false)}
      />

      {/* MOBILE DRAWER */}
      <div
        className={`fixed inset-y-0 right-0 w-[85%] max-w-sm z-70 shadow-2xl transform transition-transform duration-300 lg:hidden flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          background: 'var(--bg-elevated)',
          borderLeft: '1px solid var(--border-glass)',
        }}
      >
        <div className="p-6 flex items-center justify-between" style={{ borderBottom: '1px solid var(--border-glass)' }}>
          <span className="font-bold text-xl text-white">Menu</span>
          <button
            onClick={() => setOpen(false)}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-all"
          >
            <HiX size={22} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`block px-5 py-3.5 rounded-xl text-base font-medium transition-all duration-200 ${
                isActive(link.href)
                  ? "bg-indigo-500/15 text-indigo-400"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="p-6 space-y-4" style={{ borderTop: '1px solid var(--border-glass)', background: 'rgba(10, 14, 26, 0.5)' }}>
          <a
            href="tel:+61414003350"
            className="flex items-center gap-3 text-slate-300 font-semibold p-4 rounded-xl transition-all"
            style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-glass)' }}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(99, 102, 241, 0.15)' }}>
              <FaPhoneAlt size={14} className="text-indigo-400" />
            </div>
            <div>
              <div className="text-xs text-slate-500 font-normal">Call Us</div>
              <div className="text-white">+61 414 003 350</div>
            </div>
          </a>
          <Link
            href="/b2b-database"
            onClick={() => setOpen(false)}
            className="block w-full text-center btn-primary !rounded-xl font-bold text-base"
          >
            Access Database
          </Link>
        </div>
      </div>
    </>
  );
}
