"use client";

import { FaCheckCircle, FaChartPie, FaCity, FaShieldAlt, FaHandHoldingUsd } from "react-icons/fa";
import { FaBuilding } from "react-icons/fa6";

export default function RealEstate() {
  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-cover bg-center h-[600px] flex items-center" 
        style={{ backgroundImage: `url('/images/service-page/newsmoni-hero.png')` }}>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative max-w-7xl mx-auto px-6 w-full text-white">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Leverage News Monitoring Data
            </h1>
            <p className="text-gray-200 text-lg mb-8 leading-relaxed">
              Be updated with the most recent events by using our cutting-edge web scraping technologies to extract news data regarding companies, products, industries and suchlike. You can get worldwide data along with visualizations, infographics, trends and local news. News cycles and other types of data are also included that you may require for monitoring or evaluating any recent event worldwide trend or insight.
            </p>
            
            <button className="bg-white text-blue-900 px-8 py-3 rounded font-semibold hover:bg-blue-50 transition">
              GET STARTED NOW →
            </button>
          </div>
        </div>

        {/* Floating Card (Example based on image - simplistic version) */}
        <div className="hidden lg:block absolute top-1/2 right-60 transform -translate-y-1/2 w-120 rounded-lg p-4  shadow-2xl">
           <img src="/images/service-page/newsmoni-vector.png" alt="News Monitoring Data Scraping" />
           
        </div>
      </section>

      {/* ================= UNLEASHING POTENTIAL ================= */}
      <section className="py-20 bg-[#EBF3FF]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
             What We Can Do for You
          </h2>
          <p className="max-w-4xl mx-auto text-gray-600 mb-16 leading-relaxed">
            Business Data Labs Labs is the place where we give you a lot of information that helps in monitoring and tracking subjects with accuracy and speed. Our services deliver trustworthy and precise data from websites, blogs, social media platforms like Facebook or Instagram, news sites such as BBC News online etc., review sites (like Yelp), and many other sources.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard 
              icon={<FaChartPie className="text-blue-500 text-3xl"/>}
              title="Smooth monitoring process"
              desc="Get structured data to do live monitoring and analysis of all the data feeds easily. Keep an eye on every public information through data scraping."
            />
            <FeatureCard 
              icon={<FaBuilding className="text-blue-500 text-3xl"/>}
              title="More comprehensive"
              desc="Web scraping is the finest solution for the widest, deepest news coverage that allows you to not miss single news or clip."
            />
             <FeatureCard 
              icon={<FaHandHoldingUsd className="text-blue-500 text-3xl"/>}
              title="More accurate news clipping"
              desc="Get a high-powered, customized search profile through the most advanced news monitoring tools in the media monitoring industry."
            />
             <FeatureCard 
              icon={<FaCity className="text-blue-500 text-3xl"/>}
              title="Detailed analysis"
              desc="Every news clip and information includes detailed data that helps in increasing online site ranking and print circulation."
            />
          </div>
        </div>
      </section>

       {/* ================= COMPREHENSIVE SOLUTIONS ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
             News Monitoring Data We Provide
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Business Data Labs Labs gives full media monitoring services, giving you a wider range of information related to your chosen topic. We can scrape social media platforms, podcasts, publicly available newsletters and online news sites plus blogs and forums among other places. We have the ability to focus on specific news sources for monitoring either by geographical location or industry sector. The data will be provided in any format that suits your needs best.
            </p>
            
            <div className="grid grid-cols-2 gap-8 text-center mt-10">
               <DataPoint icon={<FaBuilding className="text-3xl text-gray-700 mx-auto mb-3"/>} title="Social media data" desc="Obtain the latest job listings data to stay updated on new vacancies. Enhance your job board's quality and organize aggregated data for effective use.Watch over comments, news talks, evaluations of products and brands to comprehend the general way customers think." />
               <DataPoint icon={<FaHandHoldingUsd className="text-3xl text-gray-700 mx-auto mb-3"/>} title="News data" desc="Scrape data from across the globe's news scene in a cost-effective manner. Present current news and feature articles on your website, emphasizing the topics you prefer." />
               <DataPoint icon={<FaShieldAlt className="text-3xl text-gray-700 mx-auto mb-3"/>} title="Public profiles data" desc="Share the voice and influence of top public profiles within your business niche." />
               <DataPoint icon={<FaChartPie className="text-3xl text-gray-700 mx-auto mb-3"/>} title="Large data feeds" desc="Monitor public relations and extensive data feed to improve media coverage and media relations.Get data feeds such as Hashtag analytics, campaign analytics, market research, etc." />
            </div>
          
          </div>
          
          <div className="relative">
             <img src="/images/service-page/newsmoni-1.png" alt="News Monitoring Data Scraping" className="w-full rounded-lg " />
          </div>
        </div>
      </section>

      {/* ================= BLUE DATA SECTION ================= */}
      <section className="bg-[#2F66F6] py-20 text-white">
        <div className="max-w-7xl mx-auto px-6">
            <p className="mb-10 text-left max-w-5xl leading-relaxed text-blue-100 text-[18px]">
              Business Data Labs Labs is a complete provider, giving you exclusive, real-time and custom data that matches exactly with what your business needs. The scraped news monitoring data we provide is specific to only one user like yourself - it's different from the stuff other providers sell to your competition. Trust in our unique and current information for all of your business requirements.
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
                  <img src="/images/service-page/newsmoni-2.png" alt="Dashboard" className="w-full h-auto object-contain rounded-lg" />
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
               Diverse News Monitoring Website Scraping Services
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
               Understand how the public views your brand, company, PR, market campaigns, news, products and services by using our news and media monitoring services. We keep an eye on all kinds of media sources and deliver to you each piece of information talking about your chosen topics - commercial/non-commercial or scientific in nature.
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
