const trusted = [
  { icon: "🏢", desc: "Trusted by 76 out of Fortune 500 companies for workflow automation and data collection", accent: "#6366F1" },
  { icon: "🛡️", desc: "Trusted by most valuable brands in the world for protection against counterfeits", accent: "#22D3EE" },
  { icon: "🏠", desc: "Trusted by some of the largest real estate investment firms globally", accent: "#10B981" },
  { icon: "🚀", desc: "Trusted by thousands of startups and enterprises for sales data mining", accent: "#F59E0B" },
  { icon: "🛒", desc: "Trusted by top 10 e-commerce companies for competitor product insights", accent: "#EC4899" },
  { icon: "📰", desc: "Trusted by top researchers and journalists to source verified data", accent: "#8B5CF6" },
  { icon: "👥", desc: "Trusted by some of the largest recruitment firms worldwide", accent: "#14B8A6" },
];

export default function Trusted() {
  return (
    <section className="section-padding relative" style={{ background: 'var(--bg-secondary)' }}>
      <div className="absolute inset-0 grid-pattern pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-4"
              style={{ background: 'rgba(34, 211, 238, 0.1)', border: '1px solid rgba(34, 211, 238, 0.2)', color: '#22D3EE' }}>
          Social Proof
        </span>
        
        <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
          Trusted by <span className="gradient-text">Industry Leaders</span>
        </h2>

        <p className="max-w-3xl mx-auto text-slate-400 text-lg leading-relaxed mb-14">
          Web scraping solutions empower businesses to extract online data and transform it
          into structured insights that drive value across applications, fuelling growth and innovation.
        </p>

        <div className="flex flex-wrap justify-center gap-5">
          {trusted.map((item, index) => (
            <div key={index} className="w-full md:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] xl:w-[370px] grow-0">
              <div className="glass-card h-full !p-6 flex items-start gap-5 text-left group animate-fadeInUp"
                   style={{ animationDelay: `${index * 80}ms` }}>
                {/* Icon */}
                <div className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-all duration-300 group-hover:scale-110"
                     style={{ background: `${item.accent}12`, border: `1px solid ${item.accent}20` }}>
                  {item.icon}
                </div>

                <p className="text-[14px] font-medium text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
