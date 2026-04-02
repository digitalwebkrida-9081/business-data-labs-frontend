import Link from "next/link";

const services = [
  {
    image: "images/svg/1.svg",
    title: "Real Estate Data Scraping",
    desc: "Access property listings, pricing, historical trends, agent details, and sales records from thousands of global sources.",
    href: "/service/real-estate-data-scraping",
    accent: "#6366F1",
  },
  {
    image: "images/svg/2.svg",
    title: "Sales Lead Generation Data",
    desc: "Obtain targeted company, contact, email, and phone number lists for your industry to prioritize lead nurturing.",
    href: "/service/sales-leads-data",
    accent: "#22D3EE",
  },
  {
    image: "images/svg/3.svg",
    title: "Financial Data Scraping",
    desc: "Harness datasets spanning pricing, volume, sentiment, and more for current and historical public company insights.",
    href: "#",
    accent: "#10B981",
  },
  {
    image: "images/svg/4.svg",
    title: "Financial Data Extraction",
    desc: "Extract structured financial information from reports, filings, and market feeds at scale.",
    href: "#",
    accent: "#F59E0B",
  },
  {
    image: "images/svg/5.svg",
    title: "Ecommerce",
    desc: "Gather product details, pricing, reviews, and inventory from leading e-commerce platforms for competitive analysis.",
    href: "/service/ecom-scraping",
    accent: "#EC4899",
  },
  {
    image: "images/svg/6.svg",
    title: "Recruitment",
    desc: "Track job postings, company profiles, and candidate data to stay competitive in talent acquisition.",
    href: "/service/recruitment-scraping",
    accent: "#8B5CF6",
  },
  {
    image: "images/svg/7.svg",
    title: "Brand Monitoring",
    desc: "Monitor millions of e-commerce sites for counterfeit products and protect your brand value.",
    href: "#",
    accent: "#EF4444",
  },
  {
    image: "images/svg/12.svg",
    title: "Workflow Automation",
    desc: "Streamline data entry with OCR, custom pipelines, and intelligent workflow automation.",
    href: "#",
    accent: "#14B8A6",
  },
  {
    image: "images/svg/8.svg",
    title: "Research & Journalism",
    desc: "Acquire comprehensive datasets on any subject to support research and compelling reporting.",
    href: "/service/research-data-scraping",
    accent: "#6366F1",
  },
  {
    image: "images/svg/9.svg",
    title: "Manufacturing",
    desc: "Strengthen production with intelligence on equipment, parts, vendors, and quality control.",
    href: "#",
    accent: "#22D3EE",
  },
  {
    image: "images/svg/10.svg",
    title: "News Monitoring",
    desc: "Acquire structured news data from social media, publications, blogs, and reviews in real-time.",
    href: "/service/news-monitoring-data-scraping",
    accent: "#F59E0B",
  },
  {
    image: "images/svg/11.svg",
    title: "Retail",
    desc: "Obtain extensive location data including product details, contact info, and store amenities.",
    href: "/service/retail-data-scraping",
    accent: "#10B981",
  }
];

export default function ServicesGrid() {
  return (
    <section className="section-padding relative" style={{ background: 'var(--bg-primary)' }}>
      <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-4"
                style={{ background: 'rgba(99, 102, 241, 0.12)', border: '1px solid rgba(99, 102, 241, 0.2)', color: '#818CF8' }}>
            Our Expertise
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Discover Our <span className="gradient-text">B2B Database</span>
          </h2>
          <p className="text-slate-400 max-w-3xl mx-auto text-lg leading-relaxed">
            Transform unstructured online data into structured, actionable insights that drive business value across applications and departments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s, i) => (
            <div
              key={i}
              className="glass-card group flex flex-col !p-7 !rounded-2xl h-full animate-fadeInUp"
              style={{ animationDelay: `${(i % 4) * 100}ms` }}
            >
              {/* Icon Container */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-400 group-hover:scale-110"
                style={{ background: `${s.accent}15`, border: `1px solid ${s.accent}25` }}
              >
                <img
                  src={s.image}
                  alt=""
                  className="w-6 h-6 object-contain transition-all duration-300 opacity-70 group-hover:opacity-100"
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
              </div>

              <h3 className="font-bold text-lg text-white mb-3 group-hover:text-indigo-300 transition-colors duration-300">{s.title}</h3>
              
              <p className="text-slate-500 text-sm leading-relaxed mb-6 grow">
                {s.desc}
              </p>

              <Link href={s.href} className="inline-flex items-center gap-2 font-semibold text-sm tracking-wide transition-all duration-300 text-indigo-400 hover:text-indigo-300 hover:gap-3 mt-auto">
                Learn More
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
