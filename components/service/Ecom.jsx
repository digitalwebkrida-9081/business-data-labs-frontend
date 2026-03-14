"use client";

import { FaCheckCircle, FaChartPie, FaCity, FaShieldAlt, FaHandHoldingUsd } from "react-icons/fa";
import { FaBuilding } from "react-icons/fa6";

export default function RealEstate() {
  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-cover bg-center h-[600px] flex items-center" 
        style={{ backgroundImage: `url('/images/service-page/ecom-hero.jpg')` }}>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative max-w-7xl mx-auto px-6 w-full text-white">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Unlock E-commerce Success with Business Data Labs
            </h1>
            <p className="text-gray-200 text-lg mb-8 leading-relaxed">
              Business Data Labs offers powerful E-commerce data scraping services to extract valuable insights from any website. Scrape E-commerce data such as product details, pricing, deals, customer reviews, ratings, and seller information. Make data-driven decisions to optimize your product offerings and understand your target audience.
            </p>
            
            <button className="bg-white text-blue-900 px-8 py-3 rounded font-semibold hover:bg-blue-50 transition">
              GET STARTED NOW →
            </button>
          </div>
        </div>

        {/* Floating Card (Example based on image - simplistic version) */}
        <div className="hidden lg:block absolute top-1/2 right-60 transform -translate-y-1/2 w-120 rounded-lg p-4  shadow-2xl">
           <img src="/images/service-page/ecom-vector.png" alt="Ecom Scraping" />
           
        </div>
      </section>

      {/* ================= UNLEASHING POTENTIAL ================= */}
      <section className="py-20 bg-[#EBF3FF]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
             Empower Your Business with Business Data Labs
          </h2>
          <p className="max-w-4xl mx-auto text-gray-600 mb-16 leading-relaxed">
            Business Data Labs delivers high-quality, actionable E-commerce data to drive your online success. We provide comprehensive data, including product descriptions, bestsellers, images, demand trends, stock availability, and more from diverse sources. Gain access to structured, reliable data to expand your reach and dominate global markets.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard 
              icon={<FaChartPie className="text-blue-500 text-3xl"/>}
              title="Price Predictions"
              desc="Predict the weakness of your product by analyzing the pricing data of the competitor’s company. Pricing data helps in deciding the right product price."
            />
            <FeatureCard 
              icon={<FaBuilding className="text-blue-500 text-3xl"/>}
              title="Consistent Monitoring"
              desc="Stay updated with the latest market trends by keeping track of competitor’s activities like new product listing, price changes, and much more."
            />
             <FeatureCard 
              icon={<FaHandHoldingUsd className="text-blue-500 text-3xl"/>}
              title="Shopping Experience"
              desc="Send personalized Emails, discount offers, targeting ads to the customer. Personalized experience drives the customer to buy more."
            />
             <FeatureCard 
              icon={<FaCity className="text-blue-500 text-3xl"/>}
              title="Know Your Customer"
              desc="Analyze customer reviews, ratings, and feedback to understand customer preferences and launch the right product."
            />
          </div>
        </div>
      </section>

       {/* ================= COMPREHENSIVE SOLUTIONS ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Harness the Power of E-commerce Data
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Business Data Labs uses cutting-edge technologies to gather a wealth of E-commerce data, empowering you to outperform competitors. From product images and descriptions to performance metrics, variations, and stock availability, our data solutions provide the foundation for your success.
            </p>
            
            <div className="grid grid-cols-2 gap-8 text-center mt-10">
               <DataPoint icon={<FaBuilding className="text-3xl text-gray-700 mx-auto mb-3"/>} title="Product Information" desc="Track demand for E-commerce products, top-ranking products, product specifications, seller details, shipping information, and more" />
               <DataPoint icon={<FaHandHoldingUsd className="text-3xl text-gray-700 mx-auto mb-3"/>} title="Customer’s Review & Ratings" desc="Scrape data for customer reviews and ratings from different sites to understand customer’s tastes and preferences." />
               <DataPoint icon={<FaShieldAlt className="text-3xl text-gray-700 mx-auto mb-3"/>} title="Sellers Information" desc="Discover the items of different sellers and evaluate what items can offer the most reliable revenue-generating perspective." />
               <DataPoint icon={<FaChartPie className="text-3xl text-gray-700 mx-auto mb-3"/>} title="Stock availability" desc="Accurate and structured data ensure adequate product supply in the market. Pricing history and stock availability help in optimizing the product index." />
            </div>
          
          </div>
          
          <div className="relative">
             <img src="/images/service-page/ecom-1.png" alt="Ecom Solutions" className="w-full rounded-lg " />
          </div>
        </div>
      </section>

      {/* ================= BLUE DATA SECTION ================= */}
      <section className="bg-[#2F66F6] py-20 text-white">
        <div className="max-w-7xl mx-auto px-6">
            <p className="mb-10 text-left max-w-5xl leading-relaxed text-blue-100 text-[18px]">
              Ensure a seamless supply chain with accurate data on pricing and stock availability.
Business Data Labs delivers unique, real-time, and customized data solutions tailored to your specific needs. Our exclusive, up-to-date insights give you a competitive edge.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm font-medium">
               <ul className="space-y-3">
                 <ListItem text="Product Name" />
                 <ListItem text="Images" />
                 <ListItem text="Review Counts" />
                 <ListItem text="Price" />
                 <ListItem text="Stock Availability" />
                 <ListItem text="Brand Name" />
                 <ListItem text="Specifications" />
                 <ListItem text="Seller Profile Url" />
               </ul>
               <ul className="space-y-3">
                 <ListItem text="Category" />
                 <ListItem text="Product Id/Model Number" />
                 <ListItem text="Delivery Charges" />
                 <ListItem text="Description" />
                 <ListItem text="Color" />
                 <ListItem text="Video Links" />
                 <ListItem text="Seller Name" />
                 <ListItem text="Seller Rating" />
               </ul>
               {/* Image Placeholder for laptop/dashboard */}
               <div className="col-span-2 relative">
                  <img src="/images/service-page/ecom-2.png" alt="Dashboard" className="w-full h-auto object-contain rounded-lg" />
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
               Elevate Your Brand with Targeted E-commerce Scraping
             </h2>
             
             <div className="grid md:grid-cols-3 gap-8 text-sm text-gray-600">
               <ul className="space-y-2 list-disc pl-5">
                 <li>https://www.amazon.com</li>
                 <li>https://www.walmart.com</li>
                 <li>https://www.ebay.com</li>
                 <li>https://www.target.com</li>
                 <li>https://www.bestbuy.com</li>
                 <li>https://www.costco.com</li>
                 <li>https://www.wayfair.com</li>
               </ul>
               <ul className="space-y-2 list-disc pl-5">
                 <li>https://www.etsy.com</li>
                 <li>https://www.newegg.com</li>
                 <li>https://www.overstock.com</li>
                 <li>https://www.macys.com</li>
                 <li>https://www.nordstrom.com</li>
                 <li>https://www.sephora.com</li>
                 <li>https://www.homedepot.com</li>
               </ul>
                <ul className="space-y-2 list-disc pl-5">
                 <li>https://www.lowes.com</li>
                 <li>https://www.nike.com</li>
                 <li>https://www.adidas.com</li>
                 <li>https://www.zara.com</li>
                 <li>https://www.hm.com</li>
                 <li>https://www.walgreens.com</li>
                 <li>https://www.cvs.com</li>
               </ul>
             </div>

             <p className="mt-12 text-center text-gray-500 text-lg">
               E-commerce data scraping is a game-changer for businesses looking to expand their brand. Leverage data-driven insights to make informed decisions about products, ensuring alignment with your target audience. As your business scales, reliable data becomes crucial. Business Data Labs empowers data-driven E-commerce companies to measure and refine their strategies, enabling them to thrive in the competitive marketplace.
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
