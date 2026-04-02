import Link from "next/link";
import {
  FaFacebookF,
  FaXTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa6";
import { IoCall, IoMail } from "react-icons/io5";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{ background: 'linear-gradient(180deg, var(--bg-primary), #060A14)' }}>
      {/* Top accent line */}
      <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, var(--accent-primary), var(--accent-cyan), var(--accent-secondary), transparent)' }} />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />

      {/* Main Footer */}
      <div className="relative max-w-7xl mx-auto px-6 py-16 grid gap-10 md:grid-cols-4">
        {/* Brand Section */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl overflow-hidden" style={{ boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)' }}>
              <Image
                src="/images/logos/main-logo/small-logo.png"
                alt="Business Data Labs Logo"
                width={40}
                height={40}
                className="block w-full h-full object-cover"
                priority={true}
              />
            </div>
            <span className="text-xl font-bold text-white">
              Business Data <span className="gradient-text">Labs</span>
            </span>
          </div>

          <p className="text-sm text-slate-500 leading-relaxed">
            Business Data Labs is a web scraping service company that extracts any
            relevant website and helps you get data for all your business
            requirements with 100% accuracy.
          </p>

          {/* Social Icons */}
          <div className="flex gap-3 mt-6">
            <SocialIcon><FaFacebookF /></SocialIcon>
            <SocialIcon><FaXTwitter /></SocialIcon>
            <SocialIcon><FaInstagram /></SocialIcon>
            <SocialIcon><FaLinkedinIn /></SocialIcon>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-semibold mb-5 text-white text-sm uppercase tracking-wider">Navigation</h4>
          <ul className="space-y-3 text-sm">
            <FooterLink href="/">Home</FooterLink>
            <FooterLink href="/faq">FAQs</FooterLink>
            <FooterLink href="/contact">Contact Us</FooterLink>
            <FooterLink href="/gdpr">GDPR Compliance</FooterLink>
            <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
            <FooterLink href="/b2b-database">B2B Database</FooterLink>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-semibold mb-5 text-white text-sm uppercase tracking-wider">Services</h4>
          <ul className="space-y-3 text-sm">
            <FooterLink href="/service/real-estate-data-scraping">Real Estate Data Scraping</FooterLink>
            <FooterLink href="/service/sales-leads-data">Sales Lead Data</FooterLink>
            <FooterLink href="/service/ecom-scraping">E-Commerce Data Scraping</FooterLink>
            <FooterLink href="/service/recruitment-scraping">Recruitment Data Scraping</FooterLink>
            <FooterLink href="/service/news-monitoring-data-scraping">News Monitoring</FooterLink>
            <FooterLink href="/service/retail-data-scraping">Retail Store Data Scraping</FooterLink>
            <FooterLink href="/service/research-data-scraping">Research & Journalism</FooterLink>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold mb-5 text-white text-sm uppercase tracking-wider">Contact Us</h4>
          <div className="space-y-4 text-sm">
            <a href="tel:+61414003350" className="flex items-center gap-3 group text-slate-400 hover:text-white transition-all duration-300">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'rgba(99, 102, 241, 0.15)' }}>
                <IoCall className="text-indigo-400" />
              </div>
              <span>+61 414 003 350</span>
            </a>
            <a href="mailto:businessdatalabs@gmail.com" className="flex items-center gap-3 group text-slate-400 hover:text-white transition-all duration-300">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'rgba(34, 211, 238, 0.1)' }}>
                <IoMail className="text-cyan-400" />
              </div>
              <span>businessdatalabs@gmail.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative py-5 text-center text-xs text-slate-600" style={{ borderTop: '1px solid var(--border-glass)' }}>
        © Business Data Labs 2014–2026 All Rights Reserved
      </div>
    </footer>
  );
}

function SocialIcon({ children }) {
  return (
    <div
      className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-400 hover:text-white transition-all duration-300 cursor-pointer hover:scale-110"
      style={{
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid var(--border-glass)',
      }}
    >
      {children}
    </div>
  );
}

function FooterLink({ href, children }) {
  return (
    <li>
      <Link href={href} className="text-slate-500 hover:text-indigo-400 transition-colors duration-300 inline-flex items-center gap-1.5">
        <span className="w-1 h-1 rounded-full bg-indigo-500/40" />
        {children}
      </Link>
    </li>
  );
}
