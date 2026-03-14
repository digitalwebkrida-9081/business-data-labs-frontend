"use client";

import { FaCheckCircle, FaChartPie, FaCity, FaShieldAlt, FaHandHoldingUsd } from "react-icons/fa";
import { FaBuilding } from "react-icons/fa6";

export default function RealEstate() {
  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-cover bg-center h-[600px] flex items-center" 
        style={{ backgroundImage: `url('/images/service-page/sales-hero.jpg')` }}>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative max-w-7xl mx-auto px-6 w-full text-white">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Sales Lead Data: Unlock Your Business's Full Potential
            </h1>
            <p className="text-gray-200 text-lg mb-8 leading-relaxed">
              Refine your targeting accuracy by procuring relevant leads from the wide internet world. Communicate with perfect audience for product/service promotion or sales campaign execution smoothly. Enrich CRM data with emails, contact numbers, addresses, revenue figures, social media profiles and more. <br /> <br />
              START YOUR JOURNEY WITH Business Data Labs TODAY
            </p>
            
            <button className="bg-white text-blue-900 px-8 py-3 rounded font-semibold hover:bg-blue-50 transition">
              GET STARTED NOW →
            </button>
          </div>
        </div>

        {/* Floating Card (Example based on image - simplistic version) */}
        <div className="hidden lg:block absolute top-1/2 right-60 transform -translate-y-1/2 w-120 rounded-lg p-4  shadow-2xl">
           <img src="/images/service-page/sales-vector.png" alt="Sales Lead" />
           
        </div>
      </section>

      {/* ================= UNLEASHING POTENTIAL ================= */}
      <section className="py-20 bg-[#EBF3FF]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
             Unleashing the Potential of Real Estate Data
          </h2>
          <p className="max-w-4xl mx-auto text-gray-600 mb-16 leading-relaxed">
            Business Data Labs provides sales lead data that is current and of high quality, saving you time and resources. You can get detailed information like postal codes, first names and last names, LinkedIn URLs and more from us. The sales lead generation data assists you in finding prospective customers who are prepared to purchase your product or service. We empower companies to maximize resource utilization by providing rich and predictive details.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard 
              icon={<FaChartPie className="text-blue-500 text-3xl"/>}
              title="Get more potential leads"
              desc="Get more customers and sell your products to people around the world. Our professionals offer sales data from different countries, cities, and areas so you can increase sales in various locations and strengthen your market position."
            />
            <FeatureCard 
              icon={<FaBuilding className="text-blue-500 text-3xl"/>}
              title="Build a massive lead list"
              desc="Get lots of data on sales creation leads that are 99% accurate. Fill your CRM with full and trustworthy information for later use, giving your team the ability to do great work."
            />
             <FeatureCard 
              icon={<FaHandHoldingUsd className="text-blue-500 text-3xl"/>}
              title="Get contact details"
              desc="Contacts of high quality are the lifeblood for developing business. It is these people that your sales team can approach to personally market your products, creating real connections."
            />
             <FeatureCard 
              icon={<FaCity className="text-blue-500 text-3xl"/>}
              title="Company’s profile data"
              desc="Get detailed company lists for competition analysis, sales prediction or searching B2B customers from all industries you work in."
            />
          </div>
        </div>
      </section>

       {/* ================= COMPREHENSIVE SOLUTIONS ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Unrivaled Sales Lead Data at Your Fingertips
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              We get information from business directories, listings, social media, online classifieds and reviews. We also have data about employees collected from job portals and many other sources that we can adjust to fit your needs. We use the latest technologies for gathering sales data which is the most prominent and appropriate for our customers.
            </p>
            
            <div className="grid grid-cols-2 gap-8 text-center mt-10">
               <DataPoint icon={<FaBuilding className="text-3xl text-gray-700 mx-auto mb-3"/>} title="Tap into Business Listings" desc="Obtain data from business listings such as Yellow Pages and Yelp, use this for B2B marketing of your products and create important leads." />
               <DataPoint icon={<FaHandHoldingUsd className="text-3xl text-gray-700 mx-auto mb-3"/>} title="Harness the Power of Reviews" desc="Monitor your competitors' reviews to understand consumer preferences and leverage them for targeted marketing." />
               <DataPoint icon={<FaShieldAlt className="text-3xl text-gray-700 mx-auto mb-3"/>} title="Access Employee Data" desc="Obtain high-level employee contact data through multi-level data gathering and refinement processes." />
               <DataPoint icon={<FaChartPie className="text-3xl text-gray-700 mx-auto mb-3"/>} title="Leverage Social Media Insights" desc="Identify prominent customers by tracking hashtags on platforms like Facebook, Instagram, and Twitter." />
            </div>
          
          </div>
          
          <div className="relative">
             <img src="/images/service-page/sales-1.png" alt="Real Estate Solutions" className="w-full rounded-lg " />
          </div>
        </div>
      </section>

      {/* ================= BLUE DATA SECTION ================= */}
      <section className="bg-[#2F66F6] py-20 text-white">
        <div className="max-w-7xl mx-auto px-6">
            <p className="mb-10 text-left max-w-5xl leading-relaxed text-blue-100 text-[18px]">
              Business Data Labs is the complete provider, presenting unique, on-demand and tailored data as per your business requirements. Only you get the scraped sales lead generation data, making you distinct from rivals who use general data providers. We bring fresh and different information for you to rely on.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm font-medium">
               <ul className="space-y-3">
                 <ListItem text="Name" />
                 <ListItem text="Title" />
                 <ListItem text="Address" />
                 <ListItem text="Phone" />
               </ul>
               <ul className="space-y-3">
                 <ListItem text="Url" />
                 <ListItem text="Company" />
                 <ListItem text="Email" />
               </ul>
               {/* Image Placeholder for laptop/dashboard */}
               <div className="col-span-2 relative">
                  <img src="/images/service-page/sales-2.png" alt="Dashboard" className="w-full h-auto object-contain rounded-lg" />
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
                 <li>https://linkedin.com</li>
                 <li>https://www.beyondcodes.com</li>
                 <li>https://teleprogroup.com</li>
                 <li>https://www.callboxinc.com</li>
                 <li>https://www.vsaprospecting.com</li>
                 <li>https://www.leadjen.com</li>
                 <li>https://segalomedia.com</li>
                 <li>https://www.outboundview.com</li>
               </ul>
               <ul className="space-y-2 list-disc pl-5">
                 <li>https://www.webimax.com</li>
                 <li>https://ebq.com</li>
                 <li>https://salesroads.com</li>
                 <li>http://salesaladin.com</li>
                 <li>https://www.upgrow.io</li>
                 <li>https://gensales.com</li>
                 <li>https://www.salesartillery.com</li>
                 <li>https://martal.ca</li>
               </ul>
                <ul className="space-y-2 list-disc pl-5">
                 <li>https://www.hooklead.com</li>
                 <li>https://belkins.io</li>
                 <li>https://growatorchard.com</li>
                 <li>https://clientfinders.com</li>
                 <li>https://kaleidico.com</li>
                 <li>https://leadtycoons.com</li>
                 <li>https://www.upgrow.io</li>
                 <li>https://zdperformancemarketing.com</li>
               </ul>
             </div>

             <p className="mt-12 text-center text-gray-500 text-lg">
               Precise data helps you connect with your intended viewers. Clever data supports unique pitching, giving a human touch to your sales style. Data scraping can bring numerous leads quickly in no time. Our scraping solutions are adjustable to fit your needs, you can configure them as per your requirements and modify later on.
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
