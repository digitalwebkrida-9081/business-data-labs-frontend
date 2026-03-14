import Link from "next/link";
import { FaChartLine, FaDatabase, FaUserFriends } from "react-icons/fa";
import Image from "next/image";

export default function BeyondJustLeads() {
  return (
    <section className="py-20 bg-white pt-10">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase">
            Why SmartScrapers?
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-gray-900">
            Beyond Just Leads
          </h2>
          <p className="mt-4 text-gray-500 leading-relaxed text-[18px]">
            Maximize the potential of your marketing, sales, analytics, and operations
            with exclusive, high-quality leads. Reduce time spent on lead sourcing and
            focus on high-impact initiatives.
          </p>
        </div>

        {/* Stat Cards */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1 */}
          <div className="bg-blue-600 text-white p-8 rounded-xl relative overflow-hidden group">
               <div className="relative z-10">
                    <h4 className="text-lg font-semibold mb-2">Close Faster</h4>
                    <div className="text-5xl font-bold mb-2">62%</div>
                    <p className="text-[13px] text-blue-50">Increase in overall productivity</p>
               </div>
               <FaChartLine className="absolute bottom-4 right-4 text-blue-500 text-8xl opacity-30 group-hover:scale-110 transition-transform" />
            </div>

          {/* Card 2 */}
          <div className="bg-blue-600 text-white p-8 rounded-xl relative overflow-hidden group">
               <div className="relative z-10">
                    <h4 className="text-lg font-semibold mb-2">Save Budgets</h4>
                    <div className="text-5xl font-bold mb-2">3x</div>
                    <p className="text-[13px] text-blue-50">Increase in win rates</p>
               </div>
               <FaDatabase className="absolute bottom-4 right-4 text-blue-500 text-8xl opacity-30 group-hover:scale-110 transition-transform" />
            </div>

          {/* Card 3 */}
          <div className="bg-blue-600 text-white p-8 rounded-xl relative overflow-hidden group">
               <div className="relative z-10">
                    <h4 className="text-lg font-semibold mb-2">Attract Customers</h4>
                    <div className="text-5xl font-bold mb-2">74%</div>
                    <p className="text-[13px] text-blue-50">Decrease in marketing spend</p>
               </div>
               <FaUserFriends className="absolute bottom-4 right-4 text-blue-500 text-8xl opacity-30 group-hover:scale-110 transition-transform" />
            </div>

        </div>

        {/* Info Banner */}
        <div className="mt-20 bg-[#F7FAFF] border border-blue-100 rounded-2xl p-10 flex flex-col lg:flex-row items-center gap-10 relative overflow-hidden">
          
          {/* Left Content */}
          <div className="flex-1 max-w-xl">
            <h3 className="text-2xl font-semibold text-gray-900">
              Harness the Power of{" "}
              <span className="text-[#3067FF]">Business Data Labs</span>
            </h3>

            <p className="mt-4 text-[#425466] leading-relaxed">
              Our web scraping services collect data and convert it into standardized
              CSV, Excel, and JSON formats. We deliver accurate, fast data scraping to
              meet the high-volume needs of enterprises. These samples illustrate the
              breadth of our web scraping capabilities across industries. We can extract
              data for any business sector.
            </p>

            <button className="mt-6 inline-flex items-center px-6 py-3 bg-[#3067FF] text-white text-sm font-medium rounded-lg hover:bg-[#254eda] transition cursor-pointer">
              <Link href="/contact">Contact Our Experts Now</Link>
            </button>
          </div>

          {/* Right Illustration */}
          <div className="flex-1 flex justify-center">
            <Image
              src="/images/vector/team-illustration.avif"
              alt=" Team collaboration"
              width={360}
              height={360}
              className="w-full max-w-[360px] object-contain" 
            />
          </div>

          {/* Bottom Accent Line */}
          <span className="absolute bottom-0 left-0 w-full h-1 bg-[#3067FF]" />
        </div>

      </div>
    </section>
  );
}
