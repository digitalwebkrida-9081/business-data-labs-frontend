"use client";
import Link from "next/link";

export default function ServicesPage() {
  const services = [
  {
    title: "Real Estate and Housing Data Scraping Services",
    desc: "Stay ahead in the real estate market with our comprehensive Real Estate Data Scraping Services. Scrape valuable real estate data, including agents, listings, brokers, estate agents, houses, mortgages, and building permits. Gather detailed housing data, including current and historical owners, deeds, tax assessments, and precise valuations to power your system or receive timely email alerts.",
    wide: true,
    image: "images/service-page/1.png",
    className: "flex-row",
    href: "/service/real-estate-data-scraping"
  },
  {
    title: "Sales Lead Generation Data Scraping",
    desc: "Services Achieve laser-focused targeting by extracting relevant Sales Lead Data from the web. Reach your ideal audience to effectively market your products or services and execute successful sales campaigns. Enrich your CRM with emails, contact numbers, addresses, revenue figures, and social media profiles through our Sales Lead Generation Data Scraping Services.",
    image: "images/service-page/2.png",
    className: "flex-col-reverse items-center border border-indigo-200 border-t-8 border-t-indigo-500",
    href: "/service/sales-leads-data"
  },
  {
    title: "Financial Data Scraping Services",
    desc: "Stay ahead of the curve in the finance industry with our Financial Data Scraping Services. Scrape essential finance market data, including news articles, company information, equity research, turnover, retained earnings, business and political news, and real-time stock rates. Unlock limitless financial data to drive informed decision-making.",
    image: "images/service-page/3.png",
    className: "flex-col-reverse items-center border border-indigo-200 border-t-8 border-t-indigo-500",
    href: "#"
  },
  {
    title: "E-commerce Data Scraping Services",
    desc: "Extract valuable E-commerce data from any website with our specialized E-commerce Data Scraping Services. Scrape product details, pricing, deals, customer reviews, ratings, and seller information. Gain insights into consumer preferences and market trends to optimize your e-commerce strategies.",
    wide: true,
    image: "images/service-page/4.png",
    className: "flex-row",
    href: "/service/ecom-scraping"
  },
  {
    title: "Recruitment Data Scraping Services",
    desc: "Streamline your hiring process with our customized Recruitment Data Scraping Services. Scrape job data from various sources, including the latest job listings, open vacancies, candidate profiles, company information, in-demand skills, and hiring locations. Leverage this data to find the perfect candidates and make informed hiring decisions.",
    image: "images/service-page/5.png",
    className: "flex-col-reverse items-center border border-indigo-200 border-t-8 border-t-indigo-500",
    href: "/service/recruitment-scraping"
  },
  {
    title: "Travel and Leisure Data Scraping",
    desc: "Unlock valuable insights in the travel industry with our Travel and Leisure Data Scraping Services. Scrape travel data, such as hotel reviews, pricing, room availability, airline ticket prices, and more from diverse web sources. Analyze traveler patterns, preferences, and sentiments to optimize your offerings in the travel and hospitality sector.",
    image: "images/service-page/6.png",
    className: "flex-col-reverse items-center border border-indigo-200 border-t-8 border-t-indigo-500",
    href: "#"
  },
  {
    title: "Research and Journalism Data Scraping",
    desc: "Empower your research and journalism projects with our comprehensive data scraping services. Access a wealth of data on weather, third world development, crime, local and global trends to support your research or news stories. Ensure accuracy and credibility with our reliable Research and Journalism Data Scraping solutions.",
    wide: true,
    image: "images/service-page/7.png",
    className: "flex-row",
    href: "/service/research-data-scraping"
  },
  {
    title: "Retail Store Data Scraping",
    desc: "Gain a competitive edge in the retail industry with our Retail Store Data Scraping Services. Scrape vital information such as store openings, closures, parking convenience, in-store pickup options, services, subsidiaries, and nearest competitors. Leverage this data to optimize your retail strategies and drive growth.",
    image: "images/service-page/8.png",
    className: "flex-col-reverse items-center border border-indigo-200 border-t-8 border-t-indigo-500",
    href: "/service/retail-data-scraping"
  },
  {
    title: "Brand Monitoring Data",
    desc: "Scrape travel data such as hotel reviews, pricing, room availability, airline ticket prices, and more from vast sources available across the web. Analyze travelers’ patterns, likes, dislikes of customers, and many other details, which can be utilized for successful dealings in the travel & hospitality industry.",
    image: "images/service-page/9.png",
    className: "flex-col-reverse items-center border border-indigo-200 border-t-8 border-t-indigo-500",
    href: "#"
  },
  {
    title: "Manufacturing Industry Data Scraping",
    desc: "Revolutionize your manufacturing processes with data-driven insights from our Manufacturing Industry Data Scraping Services. Identify consumer preferences, optimize resource usage, reduce waste, improve machine productivity, and increase efficiency. Unlock the power of data to streamline your manufacturing operations and stay ahead of the competition.",
    wide: true,
    image: "images/service-page/10.png",
    className: "flex-row",
    href: "#"
  },
  {
    title: "Social Media Data Extraction Services",
    desc: "Harness the power of social media with our Social Media Data Extraction Services. Monitor social media platforms for posts, analyze sentiments, and create winning social media strategies. Scrape valuable social media data, including posts, likes, comments, and more to gain insights into your customers, retailers, and competitors.",
    image: "images/service-page/11.png",
    className: "flex-col-reverse items-center border border-indigo-200 border-t-8 border-t-indigo-500",
    href: "#"
  },
  {
    title: "News Monitoring Data Scraping",
    desc: "Stay informed about the latest events and trends with our News Monitoring Data Scraping Services. Extract news data about companies, products, industries, and more using our advanced web scraping technologies. Access global data, visualizations, infographics, and local news to evaluate recent events and gain valuable insights.",
    image: "images/service-page/12.png",
    className: "flex-col-reverse items-center border border-indigo-200 border-t-8 border-t-indigo-500",
    href: "/service/news-monitoring-data-scraping"
  },
];


  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative bg-linear-to-r from-[#020617] to-[#0a1f44] text-white py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_40%)]" />

        <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Web Scraping Services
            </h1>
            <p className="text-gray-300 max-w-xl text-sm leading-relaxed mb-8">
              Discover the most reliable web scraping services at your
              fingertips with Business Data Labs, your trusted web scraping
              solution provider.
            </p>

            <button className="bg-blue-700 hover:bg-blue-800 transition px-6 py-3 rounded-md text-sm font-medium cursor-pointer">
              <Link href="/b2b">Explore B2B Database</Link>
            </button>
          </div>

          {/* Illustration */}
          <div className="hidden lg:block">
            <img src="images/bg-service.png" alt="Service Vector" className="w-full h-auto" />
          </div>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="bg-[#f6f8ff] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {services.map((item, idx) => (
              <div
                key={idx}
                className={`bg-white rounded-xl  p-8 shadow-sm hover:shadow-md transition ${
                  item.wide ? "lg:col-span-2" : ""
                }
                    ${item.className || ""}
                `}>
                <div
                  className={`flex flex-col items-center text-center gap-6 border-0!
                    md:items-start md:text-left
                    md:${item.className || "flex-row"}
                  `}>

                  <div>
                    
                    <h3 className="text-3xl font-semibold text-gray-900 mb-3">
                      {item.title}
                    </h3>
                    
                    <p className="text-sm text-gray-600 leading-relaxed mb-5">
                      {item.desc}
                    </p>
                    <Link href={item.href} className="text-blue-600 text-sm font-medium hover:underline cursor-pointer">
                      Learn More &rarr;
                    </Link>
                  
                  </div>
                  
                  <img src={item.image} alt="image"/>
                
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="relative bg-[#2F66F6] py-24 text-white overflow-hidden">
  <div className="absolute top-0 left-0 w-full h-24 bg-white skew-y-[-2.9deg] origin-top-left"></div>

  <div className="relative max-w-7xl mx-auto px-6 text-center">
    <h2 className="text-3xl md:text-4xl font-bold mb-4">
      Scale up your business with Business Data Labs
    </h2>
    <p className="text-sm text-blue-100 max-w-2xl mx-auto mb-8">
      Unlock powerful data extraction solutions tailored to your business
      needs and drive smarter decision-making.
    </p>

    <button className="bg-white text-blue-700 font-medium text-sm px-8 py-3 rounded-md hover:bg-blue-50 transition cursor-pointer">
      Get Started Today
    </button>
  </div>
</section>

    </>
  );
}
