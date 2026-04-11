"use client";
import { 
  HiHomeModern, 
  HiUsers, 
  HiCurrencyDollar, 
  HiOutlineShoppingBag, 
  HiBriefcase, 
  HiGlobeAmericas, 
  HiMagnifyingGlass, 
  HiBuildingStorefront, 
  HiBuildingOffice2, 
  HiShare, 
  HiNewspaper 
} from "react-icons/hi2";
import { BsShieldCheck } from "react-icons/bs";
import Link from "next/link";

export default function ServicesPage() {
  const services = [
    { title: "Real Estate and Housing Data Scraping Services", desc: "Stay ahead in the real estate market with our comprehensive Real Estate Data Scraping Services. Scrape valuable real estate data, including agents, listings, brokers, estate agents, houses, mortgages, and building permits.", wide: true, image: "images/service-page/1.png", href: "/service/real-estate-data-scraping", accent: "#6366F1", icon: HiHomeModern },
    { title: "Sales Lead Generation Data Scraping", desc: "Achieve laser-focused targeting by extracting relevant Sales Lead Data from the web. Reach your ideal audience to effectively market your products or services and execute successful sales campaigns.", image: "images/service-page/2.png", href: "/service/sales-leads-data", accent: "#22D3EE", icon: HiUsers },
    { title: "Financial Data Scraping Services", desc: "Stay ahead of the curve in the finance industry with our Financial Data Scraping Services. Scrape essential finance market data, including news articles, company information, equity research, and real-time stock rates.", image: "images/service-page/3.png", href: "#", accent: "#10B981", icon: HiCurrencyDollar },
    { title: "E-commerce Data Scraping Services", desc: "Extract valuable E-commerce data from any website. Scrape product details, pricing, deals, customer reviews, ratings, and seller information. Gain insights into consumer preferences and market trends.", wide: true, image: "images/service-page/4.png", href: "/service/ecom-scraping", accent: "#F59E0B", icon: HiOutlineShoppingBag },
    { title: "Recruitment Data Scraping Services", desc: "Streamline your hiring process. Scrape job data from various sources, including the latest job listings, open vacancies, candidate profiles, company information, in-demand skills, and hiring locations.", image: "images/service-page/5.png", href: "/service/recruitment-scraping", accent: "#EC4899", icon: HiBriefcase },
    { title: "Travel and Leisure Data Scraping", desc: "Unlock valuable insights in the travel industry. Scrape travel data, such as hotel reviews, pricing, room availability, airline ticket prices, and more to optimize your offerings.", image: "images/service-page/6.png", href: "#", accent: "#8B5CF6", icon: HiGlobeAmericas },
    { title: "Research and Journalism Data Scraping", desc: "Empower your research and journalism projects. Access a wealth of data on weather, development, crime, local and global trends to support your research or news stories.", wide: true, image: "images/service-page/7.png", href: "/service/research-data-scraping", accent: "#14B8A6", icon: HiMagnifyingGlass },
    { title: "Retail Store Data Scraping", desc: "Gain a competitive edge in the retail industry. Scrape vital information such as store openings, closures, parking convenience, in-store pickup options, services, and competitors.", image: "images/service-page/8.png", href: "/service/retail-data-scraping", accent: "#6366F1", icon: HiBuildingStorefront },
    { title: "Brand Monitoring Data", desc: "Scrape data from vast sources across the web. Analyze customers' patterns, likes, dislikes, and many other details to protect your brand and monitor market sentiment.", image: "images/service-page/9.png", href: "#", accent: "#EF4444", icon: BsShieldCheck },
    { title: "Manufacturing Industry Data Scraping", desc: "Revolutionize your manufacturing processes with data-driven insights. Identify consumer preferences, optimize resource usage, reduce waste, and improve machine productivity.", wide: true, image: "images/service-page/10.png", href: "#", accent: "#22D3EE", icon: HiBuildingOffice2 },
    { title: "Social Media Data Extraction Services", desc: "Harness the power of social media. Monitor platforms for posts, analyze sentiments, and create winning strategies by scraping valuable social media data.", image: "images/service-page/11.png", href: "#", accent: "#F59E0B", icon: HiShare },
    { title: "News Monitoring Data Scraping", desc: "Stay informed about the latest events and trends. Extract news data about companies, products, and industries using our advanced web scraping technologies.", image: "images/service-page/12.png", href: "/service/news-monitoring-data-scraping", accent: "#10B981", icon: HiNewspaper },
  ];

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden mesh-gradient pt-36 pb-24" style={{ background: 'var(--bg-primary)' }}>
        <div className="absolute inset-0 dot-pattern" />
        <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div className="animate-fadeInUp">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6"
                 style={{ background: 'rgba(99, 102, 241, 0.12)', border: '1px solid rgba(99, 102, 241, 0.2)', color: '#818CF8' }}>
              Our Services
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-6 text-white">
              Web Scraping <span className="gradient-text">Services</span>
            </h1>
            <p className="text-slate-400 max-w-xl text-base leading-relaxed mb-8">
              Discover the most reliable web scraping services at your
              fingertips with Business Data Labs, your trusted web scraping
              solution provider.
            </p>
            <Link href="/b2b-database" className="btn-primary inline-flex items-center gap-2 text-sm">
              Explore B2B Database
            </Link>
          </div>
          <div className="hidden lg:block animate-fadeInUp delay-300">
            <img src="images/bg-service.png" alt="Service Vector" className="w-full h-auto opacity-80" />
          </div>
        </div>
      </section>

      {/* ═══ SERVICES GRID ═══ */}
      <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {services.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className={`glass-card !p-8 !rounded-2xl group ${item.wide ? "lg:col-span-2" : ""}`}
                >
                  <div className={`flex flex-col gap-6 ${item.wide ? 'md:flex-row md:items-center' : ''}`}>
                    <div className="flex-1">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                           style={{ 
                             background: `${item.accent}15`, 
                             border: `1px solid ${item.accent}30`,
                             color: item.accent 
                           }}>
                        <Icon size={24} />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors uppercase tracking-tight">{item.title}</h3>
                      <p className="text-sm text-slate-400 leading-relaxed mb-5">{item.desc}</p>
                      <Link href={item.href} className="inline-flex items-center gap-2 font-semibold text-sm text-indigo-400 hover:text-indigo-300 hover:gap-3 transition-all">
                        Learn More →
                      </Link>
                    </div>
                    {item.wide && (
                      <div className="flex-shrink-0 md:w-[240px]">
                        <img src={item.image} alt="" className="w-full h-auto opacity-80 rounded-xl" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="section-padding relative overflow-hidden" style={{ background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))' }}>
        <div className="absolute inset-0 dot-pattern opacity-10" />
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-4 text-white">
            Scale up your business with Business Data Labs
          </h2>
          <p className="text-sm text-white/70 max-w-2xl mx-auto mb-8">
            Unlock powerful data extraction solutions tailored to your business
            needs and drive smarter decision-making.
          </p>
          <Link href="/contact" className="inline-block bg-white text-primary font-bold text-sm px-8 py-3.5 rounded-xl hover:bg-indigo-50 transition shadow-xl">
            Get Started Today
          </Link>
        </div>
      </section>
    </>
  );
}
