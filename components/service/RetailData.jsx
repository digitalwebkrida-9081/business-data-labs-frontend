"use client";

import { FaCheckCircle, FaChartPie, FaCity, FaShieldAlt, FaHandHoldingUsd } from "react-icons/fa";
import { FaBuilding } from "react-icons/fa6";

export default function RealEstate() {
  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-cover bg-center h-[600px] flex items-center" 
        style={{ backgroundImage: `url('/images/service-page/retail-hero.png')` }}>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative max-w-7xl mx-auto px-6 w-full text-white">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Retail Store Data Scraping
            </h1>
            <p className="text-gray-200 text-lg mb-8 leading-relaxed">
              Take your business higher with precise, confirmed, refreshed, cost-effective and Retail Store Location Data available instantly. Experience matchless understanding of the retail market through wide-ranging location intelligence that covers data about store openings and closings, ease of parking, choices for in-store pickup along with services provided by subsidiaries as well as nearest competitors' locations.
            </p>
            
            <button className="bg-white text-blue-900 px-8 py-3 rounded font-semibold hover:bg-blue-50 transition">
              GET STARTED NOW →
            </button>
          </div>
        </div>

        {/* Floating Card (Example based on image - simplistic version) */}
        <div className="hidden lg:block absolute top-1/2 right-60 transform -translate-y-1/2 w-120 rounded-lg p-4  shadow-2xl">
           <img src="/images/service-page/retail-vector.png" alt="Retail Data Scraping" />
           
        </div>
      </section>

      {/* ================= UNLEASHING POTENTIAL ================= */}
      <section className="py-20 bg-[#EBF3FF]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
             Elevating Your Business with Business Data Labs
          </h2>
          <p className="max-w-4xl mx-auto text-gray-600 mb-16 leading-relaxed">
            Business Data Labs equips you with thousands of scraped retail store locations. This knowledge gives deep insights into new trends, competing prices and unlimited location data from multiple sources. With the most recent customer preferences in hand, retailers can plan their advertisements, promotions and sales campaigns effectively.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard 
              icon={<FaChartPie className="text-blue-500 text-3xl"/>}
              title="Competitive Monitoring"
              desc="Monitor your competition and uncover key insights to expand your market share."
            />
            <FeatureCard 
              icon={<FaBuilding className="text-blue-500 text-3xl"/>}
              title="Enhanced Visibility"
              desc="Viewability in buying markets, rivals and customers allows you to anticipate and react quickly to changing demands."
            />
             <FeatureCard 
              icon={<FaHandHoldingUsd className="text-blue-500 text-3xl"/>}
              title="Customer Insights"
              desc="Acquire retail data for better comprehension and quick reaction to alterations in customer likings, demands, and fashions."
            />
             <FeatureCard 
              icon={<FaCity className="text-blue-500 text-3xl"/>}
              title="Driving Innovation"
              desc="Discover chances for inventiveness in the retail sector like multi-channel retailing, mobile apps, customer data mining, responsive supply chains and others."
            />
          </div>
        </div>
      </section>

       {/* ================= COMPREHENSIVE SOLUTIONS ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
             Comprehensive Retail Store Data at Your Fingertips
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Media monitoring from Business Data Labs provides you with wide-ranging information access on particular subjects. We scrape social media platforms, podcasts, public newsletters, online news sites and blogs. You can specify exact news sources to monitor by location or industry and receive the data in your preferred customized format.
            </p>
            
            <div className="grid grid-cols-2 gap-8 text-center mt-10">
               <DataPoint icon={<FaBuilding className="text-3xl text-gray-700 mx-auto mb-3"/>} title="Store location data" desc="Extract store locations from website maps and generate valuable business leads in spreadsheet format." />
               <DataPoint icon={<FaHandHoldingUsd className="text-3xl text-gray-700 mx-auto mb-3"/>} title="Data Feed Monitoring" desc="Scrape worldwide news cost-effectively, showing real-time news and feature articles on your website according to the subjects you have chosen." />
               <DataPoint icon={<FaShieldAlt className="text-3xl text-gray-700 mx-auto mb-3"/>} title="Geographical data" desc="Get precise geographical information like longitudes, latitudes, Postal codes, city, number of stores, and other data." />
               <DataPoint icon={<FaChartPie className="text-3xl text-gray-700 mx-auto mb-3"/>} title="Large data feedsServices provided" desc="Get data for amenities and services provided in every outlet." />
            </div>
          
          </div>
          
          <div className="relative">
             <img src="/images/service-page/retail-1.png" alt="Retail Data Scraping" className="w-full rounded-lg " />
          </div>
        </div>
      </section>

      {/* ================= BLUE DATA SECTION ================= */}
      <section className="bg-[#2F66F6] py-20 text-white">
        <div className="max-w-7xl mx-auto px-6">
            <p className="mb-10 text-left max-w-5xl leading-relaxed text-blue-100 text-[18px]">
              Business Data Labs is a full-service provider that gives you fresh and special data, made only for your particular business needs. The retail location data we scrape will always be different than the generic kind of information which other providers sell to your competition. You can trust in us to provide unique and current details.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm font-medium">
               <ul className="space-y-3">
                 <ListItem text="Job Title" />
                 <ListItem text="Company Name" />
                 <ListItem text="Company Url" />
                 <ListItem text="Location" />
                 <ListItem text="Experience Required" />
                 <ListItem text="Salary" />
                 <ListItem text="Company/HR Phone Number" />
                 <ListItem text="Company/HR Email" />
               </ul>
               <ul className="space-y-3">
                 <ListItem text="Description" />
                 <ListItem text="Total Application" />
                 <ListItem text="Job Id" />
                 <ListItem text="Employment Type" />
                 <ListItem text="Skills" />
                 <ListItem text="Job Category" />
                 <ListItem text="No. of Openings" />h
               </ul>
               {/* Image Placeholder for laptop/dashboard */}
               <div className="col-span-2 relative">
                  <img src="/images/service-page/retail-2.png" alt="Dashboard" className="w-full h-auto object-contain rounded-lg" />
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
               Business Data Labs: Your Trusted Partner in Unique, Real-time, and Custom Data
             </h2>
             
             <div className="grid md:grid-cols-3 gap-8 text-sm text-gray-600">
               <ul className="space-y-2 list-disc pl-5">
                 <li>https://www.linkedin.com/jobs/</li>
                 <li>https://www.ziprecruiter.com/</li>
                 <li>https://www.snagajob.com/</li>
                 <li>https://www.job.com/</li>
                 <li>https://www.ziprecruiter.in/</li>
                 <li>https://www.idealist.org/</li>
                 <li>https://www.dice.com/</li>
               </ul>
               <ul className="space-y-2 list-disc pl-5">
                 <li>https://www.monsterindia.com/</li>
                 <li>https://www.simplyhired.com/</li>
                 <li>https://www.linkup.com/</li>
                 <li>https://www.usajobs.gov/</li>
                 <li>https://www.snagajob.com/</li>
                 <li>https://joblift.com/</li>
                 <li>https://erasmusintern.org/</li>
               </ul>
                <ul className="space-y-2 list-disc pl-5">
                 <li>https://in.indeed.com/</li>
                 <li>https://www.careerbuilder.com/</li>
                 <li>https://www.roberthalf.com/</li>
                 <li>https://www.naukri.com/</li>
                 <li>https://www.theladders.com/</li>
                 <li>https://internshala.com/</li>
                 <li>https://www.internships.com/</li>
               </ul>
             </div>

             <p className="mt-12 text-center text-gray-500 text-lg">
               Data has a very important part in promoting growth, progress and creativity within your company. Get the business locations that you require for allocation or selling. Business Data Labs is an expert at store location extraction projects, where we scrape store details from different sources.
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
