const trusted = [
  { image: "images/svg/w1.svg", desc: "Trusted by 76 out of Fortune 500 companies for workflow automation and data collection" },
  { image: "images/svg/w2.svg", desc: "Trusted by most valuable brands in the world for protection against counterfeits" },
  { image: "images/svg/w3.svg", desc: "Trusted by some of the largest real estate investments firms" },
  { image: "images/svg/w4.svg", desc: "Trusted by thousands of startups and established enterprises for sales data mining" },
  { image: "images/svg/w5.svg", desc: "Trusted by top 10 e-commerce companies to get insight into competitor’s products" },
  { image: "images/svg/w6.svg", desc: "Trusted by top researchers and journalist to source data" },
  { image: "images/svg/w7.svg", desc: "Trusted by some of the largest recruitment firms" },
];

export default function Trusted() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        
        <h2 className="text-3xl md:text-4xl font-bold text-[#030e21] mb-6">
          Trusted by Industry Leaders
        </h2>

        <p className="max-w-4xl mx-auto text-slate-600 text-lg leading-relaxed mb-16">
          Web scraping solutions empower businesses to extract online data and transform it
          into structured insights that drive value across applications, fuelling growth and innovation.
        </p>

        <div className="flex flex-wrap justify-center gap-6">
           {trusted.map((item, index) => (
             <div key={index} className={`w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[380px] grow-0`}>
                <Card {...item} />
             </div>
           ))}
        </div>

      </div>
    </section>
  );
}

function Card({ image, desc }) {
  return (
    <div className="h-full bg-white border border-slate-200 rounded-2xl p-6 flex items-start gap-5 hover:shadow-xl hover:shadow-blue-900/5 hover:-translate-y-1 transition-all duration-300 group text-left">
      
      {/* Icon Wrapper */}
      <div className="shrink-0 w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
        <img
          src={image}
          alt=""
          className="w-8 h-8 object-contain brightness-0 opacity-60 group-hover:opacity-100 group-hover:brightness-0 group-hover:invert transition-all duration-300"
          draggable={false}
        />
      </div>

      {/* Text */}
      <p className="text-[15px] font-medium text-slate-600 leading-relaxed group-hover:text-slate-800 transition-colors">
        {desc}
      </p>

    </div>
  );
}

