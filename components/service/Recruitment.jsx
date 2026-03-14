"use client";

import { FaCheckCircle, FaChartPie, FaCity, FaShieldAlt, FaHandHoldingUsd } from "react-icons/fa";
import { FaBuilding } from "react-icons/fa6";

export default function RealEstate() {
  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-cover bg-center h-[600px] flex items-center" 
        style={{ backgroundImage: `url('/images/service-page/recruit-hero.png')` }}>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative max-w-7xl mx-auto px-6 w-full text-white">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Recruitment Data Scraping Services
            </h1>
            <p className="text-gray-200 text-lg mb-8 leading-relaxed">
              At Business Data Labs, we offer tailored data scraping solutions to extract job data from various recruitment-related sources across the web. Our services enable you to scrape job data, including the latest job listings, open vacancies, candidate profiles, company profiles, in-demand skills, and hiring locations from career pages of company websites and job portals. With our help, you can build reliable job data feeds to fuel your recruitment efforts.
            </p>
            
            <button className="bg-white text-blue-900 px-8 py-3 rounded font-semibold hover:bg-blue-50 transition">
              GET STARTED NOW →
            </button>
          </div>
        </div>

        {/* Floating Card (Example based on image - simplistic version) */}
        <div className="hidden lg:block absolute top-1/2 right-60 transform -translate-y-1/2 w-120 rounded-lg p-4  shadow-2xl">
           <img src="/images/service-page/recruit-vector.png" alt="Recruitment Data Scraping" />
           
        </div>
      </section>

      {/* ================= UNLEASHING POTENTIAL ================= */}
      <section className="py-20 bg-[#EBF3FF]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
             Empowering Your Recruitment Process
          </h2>
          <p className="max-w-4xl mx-auto text-gray-600 mb-16 leading-relaxed">
            Our accurate data pool can supercharge your CRM and accelerate your business growth. By monitoring jobs, companies, reviews, candidates, profiles, and resumes, you can stay ahead of your competitors. Scraping job listing websites allows you to aggregate jobs and keep your job portal updated with the latest data.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard 
              icon={<FaChartPie className="text-blue-500 text-3xl"/>}
              title="Obtain refined and structured job data"
              desc="Source talent with automated & quality web data. We turn web content into data sources so you can receive the latest, clean & organized data on your schedule."
            />
            <FeatureCard 
              icon={<FaBuilding className="text-blue-500 text-3xl"/>}
              title="Feed your recruitment 
process"
              desc="Streamline your recruitment process with enriched data and get a competitive advantage in your talent sourcing."
            />
             <FeatureCard 
              icon={<FaHandHoldingUsd className="text-blue-500 text-3xl"/>}
              title="Get the latest updates for new job openings"
              desc="Stay updated with all the new job openings, their listing, and removals so you can get the latest information from time to time."
            />
             <FeatureCard 
              icon={<FaCity className="text-blue-500 text-3xl"/>}
              title="Focus on obtaining new talent"
              desc="Let us handle the data acquisition and you focus on hiring the top talent. We’ll acquire and deliver exactly what you want so as you can research & analyze hiring trends, salary trends, and much more."
            />
          </div>
        </div>
      </section>

       {/* ================= COMPREHENSIVE SOLUTIONS ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Comprehensive Recruitment Data
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Business Data Labs provides job monitoring data, including job listings, candidates seeking opportunities, resumes, professionals with specific skills, company reviews, salary trends, job responsibilities, and more. Our cutting-edge technologies allow us to serve web data tailored to your exact requirements.
            </p>
            
            <div className="grid grid-cols-2 gap-8 text-center mt-10">
               <DataPoint icon={<FaBuilding className="text-3xl text-gray-700 mx-auto mb-3"/>} title="Job listing data" desc="Obtain the latest job listings data to stay updated on new vacancies. Enhance your job board's quality and organize aggregated data for effective use." />
               <DataPoint icon={<FaHandHoldingUsd className="text-3xl text-gray-700 mx-auto mb-3"/>} title="Most searched location data" desc="Set up an analytical system to identify when and where new jobs are posted to optimize the process of lead generation." />
               <DataPoint icon={<FaShieldAlt className="text-3xl text-gray-700 mx-auto mb-3"/>} title="Candidates resume" desc="Access a vast pool of candidate resumes to ensure your business attracts the best talent. Feed your recruitment management portal with thousands of resumes for more efficient sourcing." />
               <DataPoint icon={<FaChartPie className="text-3xl text-gray-700 mx-auto mb-3"/>} title="Stock availability" desc="Source the best talent by knowing what the market needs. Talk to a greater number of candidates with specific skills and reach the right group of candidates for the right hiring." />
            </div>
          
          </div>
          
          <div className="relative">
             <img src="/images/service-page/recruit-1.png" alt="Recruitment Data Scraping" className="w-full rounded-lg " />
          </div>
        </div>
      </section>

      {/* ================= BLUE DATA SECTION ================= */}
      <section className="bg-[#2F66F6] py-20 text-white">
        <div className="max-w-7xl mx-auto px-6">
            <p className="mb-10 text-left max-w-5xl leading-relaxed text-blue-100 text-[18px]">
              Business Data Labs is a full-service provider, offering unique, real-time, and custom data based on your precise business requirements. Scraped recruitment data from Business Data Labs will never be the same as the data your competitors purchase from existing providers. We deliver unique and updated data you can trust.
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
                  <img src="/images/service-page/recruit-2.png" alt="Dashboard" className="w-full h-auto object-contain rounded-lg" />
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
               Diverse Recruitment Website Scraping Services
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
