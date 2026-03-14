import Link from "next/link";

const services = [
  {
    image: "images/svg/1.svg",
    title: "Real Estate Data Scraping",
    desc: "Access property listings, pricing, historical trends, agent details, and sales records. Our real estate and housing data scraping services gather information from thousands of global sources.",
    href: "/service/real-estate-data-scraping"
  },
  {
    image: "images/svg/2.svg",
    title: "Sales Lead Generation Data",
    desc: "Obtain targeted company, contact, email, and phone number lists for your industry. Outsource sales lead data collection and prioritize lead nurturing efforts.",
    href: "/service/sales-leads-data"
  },
  {
    image: "images/svg/3.svg",
    title: "Financial Data Scraping",
    desc: "Harness extensive datasets spanning pricing, volume, sentiment, news, social media, and more. Our finance market data scraping offers current and historical insights for public companies.",
    href: "#"
  },
  {
    image: "images/svg/4.svg",
    title: "Financial Data Extraction",
    desc: "Harness extensive datasets spanning pricing, volume, sentiment, news, social media, and more. Our finance market data scraping offers current and historical insights for public companies.",
    href: "#"
  },
  {
    image: "images/svg/5.svg",
    title: "Ecommerce",
    desc: "Gather product details, pricing, reviews, ratings, and inventory from leading e-commerce platforms. Our e-commerce data scraping services help you monitor competitors and optimize your offerings.",
    href: "/service/ecom-scraping"
  },
  {
    image: "images/svg/6.svg",
    title: "Recruitment",
    desc: "Track job postings, company profiles, candidate resumes, and more. Stay competitive with our recruitment data scraping services.",
    href: "/service/recruitment-scraping"
  },
  {
    image: "images/svg/7.svg",
    title: "Brand Monitoring",
    desc: "Safeguard your brand by monitoring millions of e-commerce sites for counterfeit products and seller contact information. Our high-frequency scraping protects brand value.",
    href: "#"
  },
  {
    image: "images/svg/12.svg",
    title: "Workflow Automation",
    desc: "Streamline data entry with OCR, custom pipelines, and data management tools. Reclaim countless hours through intelligent workflow automation data services.",
    href: "#"
  },
  {
    image: "images/svg/8.svg",
    title: "Research and Journalism",
    desc: "Acquire comprehensive datasets on virtually any subject to support your research and reporting. Our web and data scraping services provide the foundation for compelling insights.",
    href: "/service/research-data-scraping"
  },
  {
    image: "images/svg/9.svg",
    title: "Manufacturing",
    desc: "Strengthen production processes with intelligence on equipment, parts, vendors, competitors, and quality control. Drive well-informed decisions at every manufacturing stage.",
    href: "#"
  },
  {
    image: "images/svg/10.svg",
    title: "News monitoring",
    desc: "Acquire reliable, structured news data from social media, publications, blogs, reviews, and additional sources. Stay current with local and global events through multi-source news monitoring data.",
    href: "/service/news-monitoring-data-scraping"
  },
  {
    image: "images/svg/11.svg",
    title: "Retail",
    desc: "Obtain extensive location data including product details, contact information, pickup options, and store amenities. Boost retail market insights with our location intelligence and geographical data scraping.",
    href: "/service/retail-data-scraping"
  }
];

export default function ServicesGrid() {
  return (
    <section className="py-24 bg-[#EBF3FF]">
      <div className="max-w-[1400px] mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-slate-900 mb-4">Discover Our B2B Database</h2>
        <p className="text-center text-slate-600 max-w-4xl mx-auto mb-16 text-lg leading-relaxed">
          Empowering businesses with web and data scraping. Web scraping solutions transform unstructured online data into structured, actionable insights that drive business value across applications and departments.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((s, i) => {
            return (
              <div 
                key={i} 
                className="group flex flex-col p-8 rounded-2xl bg-white shadow-sm transition-all duration-300 h-full hover:shadow-xl border-t-4 border-transparent hover:border-blue-600"
              >
                {/* Icon Container */}
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300 bg-blue-50 group-hover:bg-blue-600">
                  <img 
                    src={s.image} 
                    alt="" 
                    className="w-7 h-7 object-contain transition-all duration-300 group-hover:brightness-0 group-hover:invert"
                  />
                </div>

                <h3 className="font-bold text-xl text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">{s.title}</h3>
                
                <p className="text-slate-500 text-sm leading-relaxed mb-8 grow">
                  {s.desc}
                </p>

                <Link href={s.href} className="inline-flex font-bold text-sm tracking-wide transition-colors mt-auto text-blue-600 hover:text-blue-700">
                  Learn More
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
