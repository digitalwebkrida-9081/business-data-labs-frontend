"use client";

import { FaCheckCircle, FaChartPie, FaCity, FaShieldAlt, FaHandHoldingUsd } from "react-icons/fa";
import { FaBuilding } from "react-icons/fa6";

export default function RealEstate() {
  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-cover bg-center h-[600px] flex items-center" 
        style={{ backgroundImage: `url('/images/service-page/research-hero.jpg')` }}>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative max-w-7xl mx-auto px-6 w-full text-white">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Empowering Research and Journalism with High-Quality Data
            </h1>
            <p className="text-gray-200 text-lg mb-8 leading-relaxed">
              Business Data Labs knows that researchers and journalists need good data to make their analysis and reports better. We aim to help you get the Research and Journalism data like weather trends, indicators for third world development, crime stats, along with local as well as worldwide tendencies. This will fuel your next research project or news story (Business Data Labs.com).
            </p>
            
            <button className="bg-white text-blue-900 px-8 py-3 rounded font-semibold hover:bg-blue-50 transition">
              GET STARTED NOW →
            </button>
          </div>
        </div>

        {/* Floating Card (Example based on image - simplistic version) */}
        <div className="hidden lg:block absolute top-1/2 right-60 transform -translate-y-1/2 w-120 rounded-lg p-4  shadow-2xl">
           <img src="/images/service-page/research-vector.png" alt="Research Data Scraping" />
           
        </div>
      </section>

      {/* ================= UNLEASHING POTENTIAL ================= */}
      <section className="py-20 bg-[#EBF3FF]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
             Elevating Your Research with Business Data Labs
          </h2>
          <p className="max-w-4xl mx-auto text-gray-600 mb-16 leading-relaxed">
            The quality of data is what supports any research project. Our team from Business Data Labs can scrape social media sites to find out what are the most popular news topics at present, get data for backing up arguments and claims in your stories, gather information to create interesting infographics and many other things. We provide you with reliable Research and Journalism data that allows accurate analysis.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard 
              icon={<FaChartPie className="text-blue-500 text-3xl"/>}
              title="Local and Global trends"
              desc="Get newspapers and social media data to identify and monitor over local and global market trends."
            />
            <FeatureCard 
              icon={<FaBuilding className="text-blue-500 text-3xl"/>}
              title="Know the crowd sentiment"
              desc="Measure crowd sentiment by gathering data from vast sources across the web."
            />
             <FeatureCard 
              icon={<FaHandHoldingUsd className="text-blue-500 text-3xl"/>}
              title="Get historical data"
              desc="Draw graphs and patterns based on historically published data."
            />
             <FeatureCard 
              icon={<FaCity className="text-blue-500 text-3xl"/>}
              title="Index all major publications"
              desc="Extract economic data, census data, data of research papers published over the web to support your research."
            />
          </div>
        </div>
      </section>

       {/* ================= COMPREHENSIVE SOLUTIONS ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
             Get Research and Journalism Data Within Your Reach
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Business Data Labs is a service that offers many types of data from different origins. These can be publications, crime numbers, social media details or thoughts from crowds; it could also include weather facts and history records for use in Research and Journalism. We use the newest methods to give you structured data which is correct and current according to your requirements.
            </p>
            
            <div className="grid grid-cols-2 gap-8 text-center mt-10">
               <DataPoint icon={<FaBuilding className="text-3xl text-gray-700 mx-auto mb-3"/>} title="Weather data" desc="Observe the weather of specific places and draw insights about the climate based on the same data." />
               <DataPoint icon={<FaHandHoldingUsd className="text-3xl text-gray-700 mx-auto mb-3"/>} title="World development data" desc="Make reports and write research articles by getting development data of various developing countries." />
               <DataPoint icon={<FaShieldAlt className="text-3xl text-gray-700 mx-auto mb-3"/>} title="Crime & Legal data" desc="Support your research with statistical data, historical records, court cases data & more from law enforcement agencies." />
               <DataPoint icon={<FaChartPie className="text-3xl text-gray-700 mx-auto mb-3"/>} title="Social Media data" desc="Recognize trends using social media and newspaper data. Get insights from social websites such as Facebook, Instagram, Twitter, Linked In, Reddit." />
            </div>
          
          </div>
          
          <div className="relative">
             <img src="/images/service-page/research-1.png" alt="Research Data Scraping" className="w-full rounded-lg " />
          </div>
        </div>
      </section>

      {/* ================= BLUE DATA SECTION ================= */}
      <section className="bg-[#2F66F6] py-20 text-white">
        <div className="max-w-7xl mx-auto px-6">
            <p className="mb-10 text-left max-w-5xl leading-relaxed text-blue-100 text-[18px]">
              Business Data Labs is a complete provider, supplying special, instantaneous and personalized Research and Journalism data as per your demands. The data we scrape is only for you which helps to make sure that no one else has it, giving a competitive advantage over those who use generic or already present datasets.
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
                  <img src="/images/service-page/research-2.png" alt="Dashboard" className="w-full h-auto object-contain rounded-lg" />
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
               All-inclusive Research and Journalism Website Scraping Services
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
               The web has a lot of data that is very important for research, and Business Data Labs can assist you in using it well. We are able to scrape big data from all different kinds of places on the internet and organize them into structures so that our customers always have the most recent news and useful information they need available in their desired format.
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
