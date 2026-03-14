"use client";

import { FaCheckCircle, FaChartPie, FaCity, FaShieldAlt, FaHandHoldingUsd } from "react-icons/fa";
import { FaBuilding } from "react-icons/fa6";

export default function RealEstate() {
  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-cover bg-center h-[600px] flex items-center" 
        style={{ backgroundImage: `url('/images/service-page/real-estate-hero.png')` }}>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative max-w-7xl mx-auto px-6 w-full text-white">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Harness the Power of Real Estate and Housing Data with Business Data Labs
            </h1>
            <p className="text-gray-200 text-lg mb-8 leading-relaxed">
              Staying ahead of the curve in real estate means access to accurate and timely data. 
              At Business Data Labs, we specialize in providing comprehensive real estate data scraping services 
              to help you make informed decisions. From tracking market trends to identifying investment opportunities, 
              our housing data solutions empower you to navigate the complexities of the real estate landscape with confidence.
            </p>
            
            <button className="bg-white text-blue-900 px-8 py-3 rounded font-semibold hover:bg-blue-50 transition">
              GET STARTED NOW →
            </button>
          </div>
        </div>

        {/* Floating Card (Example based on image - simplistic version) */}
        <div className="hidden lg:block absolute top-1/2 right-60 transform -translate-y-1/2 w-120 rounded-lg p-4  shadow-2xl">
           <img src="/images/service-page/real-estate-1.png" alt="Real Estate" />
           
        </div>
      </section>

      {/* ================= UNLEASHING POTENTIAL ================= */}
      <section className="py-20 bg-[#EBF3FF]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
             Unleashing the Potential of Real Estate Data
          </h2>
          <p className="max-w-4xl mx-auto text-gray-600 mb-16 leading-relaxed">
            At Business Data Labs, we understand the critical role that structured and interactive real estate data plays in driving informed decision-making. 
            Our team of experts leverages cutting-edge technologies to transform raw housing data into actionable insights. 
            Through our rigorous quality assurance process, we ensure the delivery of reliable and precise property data across the nation, 
            making us your one-stop solution for all your real estate data needs.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard 
              icon={<FaChartPie className="text-blue-500 text-3xl"/>}
              title="Right Investing"
              desc="Identify the most lucrative investment opportunities in the real estate sector while minimizing the risk of suboptimal investments."
            />
            <FeatureCard 
              icon={<FaBuilding className="text-blue-500 text-3xl"/>}
              title="Real-Time Analysis"
              desc="Stay ahead of the game by monitoring real-time price fluctuations and current real estate market trends, enabling you to make accurate future predictions."
            />
             <FeatureCard 
              icon={<FaHandHoldingUsd className="text-blue-500 text-3xl"/>}
              title="Boost Sales"
              desc="Empower brokers and agents to increase their sales and profitability by leveraging structured real estate data."
            />
             <FeatureCard 
              icon={<FaCity className="text-blue-500 text-3xl"/>}
              title="Market patterns"
              desc="Uncover hidden market patterns and insights to reveal the true reality of the real estate market through subjective data analysis."
            />
          </div>
        </div>
      </section>

       {/* ================= COMPREHENSIVE SOLUTIONS ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Comprehensive Real Estate and Housing Data Solutions
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Business Data Labs specializes in gathering a wide range of real estate and housing data to meet your specific requirements. 
              From ownership and listing information to demographic data, property status, valuation, urban planning insights, store expansions, 
              and beyond, we leave no stone unturned. With Business Data Labs, you can build your business faster with the most accessible 
              and reliable real estate data available across the web.
            </p>
            
            <div className="grid grid-cols-2 gap-8 text-center mt-10">
               <DataPoint icon={<FaBuilding className="text-3xl text-gray-700 mx-auto mb-3"/>} title="Real Estate Market Data" desc="Stay informed about the real estate market trends across the country, enabling you to determine the optimal time to buy or sell a property based on thorough data analysis." />
               <DataPoint icon={<FaHandHoldingUsd className="text-3xl text-gray-700 mx-auto mb-3"/>} title="Property Valuation Data" desc="Obtain accurate property data for precise valuation by gathering detailed information from country-level websites." />
               <DataPoint icon={<FaShieldAlt className="text-3xl text-gray-700 mx-auto mb-3"/>} title="Crime And Safety Data" desc="Safeguard your investments, property, and personnel by analyzing crime and safety data before making critical decisions." />
               <DataPoint icon={<FaChartPie className="text-3xl text-gray-700 mx-auto mb-3"/>} title="Investment Data" desc="Stay updated on real estate investment activities, such as auctions, to identify new opportunities. Pinpoint areas with special economic zones, commercial and residential listings to generate leads." />
            </div>
          
          </div>
          
          <div className="relative">
             <img src="/images/service-page/real-estate-2.png" alt="Real Estate Solutions" className="w-full rounded-lg " />
          </div>
        </div>
      </section>

      {/* ================= BLUE DATA SECTION ================= */}
      <section className="bg-[#2F66F6] py-20 text-white">
        <div className="max-w-7xl mx-auto px-6">
            <p className="mb-10 text-left max-w-5xl leading-relaxed text-blue-100 text-[18px]">
              Business Data Labs is an expert in real estate data scraping, giving strong abilities to businesses and experts by providing top-quality information. Our skills cover various kinds of residential, commercial and industrial lands as well as plots among others - guaranteeing a comprehensive method for gathering data. If you are a real estate investor or part of a broker company, agent who works independently then Business Data Labs will be your reliable companion to provide structured and precise real estate data globally; so that you can make knowledgeable choices and stay ahead in the competitive market.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm font-medium">
               <ul className="space-y-3">
                 <ListItem text="Agent Information" />
                 <ListItem text="Property Data" />
                 <ListItem text="Street Name" />
                 <ListItem text="Address" />
                 <ListItem text="City" />
                 <ListItem text="State/Zip Code" />
                 <ListItem text="Property Size" />
                 <ListItem text="Facts & Features" />
               </ul>
               <ul className="space-y-3">
                 <ListItem text="Images" />
                 <ListItem text="Price Data" />
                 <ListItem text="Real Estate Provider" />
                 <ListItem text="Reviews" />
                 <ListItem text="Title" />
                 <ListItem text="URL" />
                 <ListItem text="Sellers Profile" />
                 <ListItem text="Plot Information" />
               </ul>
               {/* Image Placeholder for laptop/dashboard */}
               <div className="col-span-2 relative">
                  <img src="/images/service-page/real-estate-3.png" alt="Dashboard" className="w-full h-auto object-contain rounded-lg" />
               </div>
            </div>

             <div className="text-center mt-12">
               <button className="bg-white text-[#2F66F6] px-8 py-3 rounded font-bold hover:bg-blue-50 transition cursor-pointer">
                 GET STARTED NOW →
               </button>
             </div>
        </div>
      </section>

      {/* ================= TRUSTED PARTNER ================= */}
      <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
             <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
               Your Trusted Partner in Real Estate Data Scraping
             </h2>
             
             <div className="grid md:grid-cols-3 gap-8 text-sm text-gray-600">
               <ul className="space-y-2 list-disc pl-5">
                 <li>https://www.zillow.com</li>
                 <li>https://www.goodacreproperties.com</li>
                 <li>https://www.realtor.com</li>
                 <li>https://www.redfin.com</li>
                 <li>https://www.trulia.com</li>
                 <li>https://www.homesnap.com</li>
                 <li>https://www.luxuryrealestate.com</li>
               </ul>
               <ul className="space-y-2 list-disc pl-5">
                 <li>http://www.century21.com</li>
                 <li>https://www.xome.com</li>
                 <li>https://www.movoto.com</li>
                 <li>https://www.foxtons.co.uk</li>
                 <li>https://www.rightmove.co.uk</li>
                 <li>https://www.zoopla.co.uk</li>
               </ul>
                <ul className="space-y-2 list-disc pl-5">
                 <li>https://www.remax.com</li>
                 <li>https://www.citigroup.com</li>
                 <li>https://www.apartmentlist.com</li>
                 <li>https://www.yestudent.com</li>
                 <li>https://www.loopnet.com</li>
               </ul>
             </div>

             <p className="mt-12 text-center text-gray-500 text-lg">
               At Business Data Labs, we take pride in being a full-service provider, delivering unique, real-time, and custom real estate data based on your specific business requirements. Unlike generic data providers, we ensure that the scraped housing data you receive is tailored to your needs, giving you a competitive edge in the market. With Business Data Labs, you can rely on receiving up-to-date and exclusive data that sets you apart from your competitors.
               <br/><br/>
               Tell us your project and we will scrape it for you.
             </p>
          </div>
      </section>
    </>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition text-left">
      <div className="bg-blue-50 w-14 h-14 rounded-full flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="font-bold text-lg text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

function DataPoint({ icon, title, desc }) {
    return (
        <div className="flex flex-col items-center">
            {icon}
            <h4 className="font-bold text-sm mb-2">{title}</h4>
            <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
        </div>
    )
}

function ListItem({ text }) {
    return (
        <li className="flex items-center gap-2">
            <FaCheckCircle className="text-blue-300" />
            <span>{text}</span>
        </li>
    )
}
