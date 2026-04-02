"use client";

const formats = [
  { name: "CSV", icon: "📄", color: "#10B981" },
  { name: "Excel", icon: "📊", color: "#22D3EE" },
  { name: "JSON", icon: "{ }", color: "#F59E0B" },
  { name: "PDF", icon: "📕", color: "#EF4444" },
  { name: "TXT", icon: "📝", color: "#8B5CF6" },
  { name: "API", icon: "⚡", color: "#6366F1" },
];

export default function DataFormatting() {
  return (
    <section className="section-padding relative overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left — Format badges */}
          <div className="flex-1 flex justify-center">
            <div className="grid grid-cols-3 gap-4 max-w-[340px]">
              {formats.map((fmt, i) => (
                <div
                  key={i}
                  className="glass-card !p-5 !rounded-2xl text-center group animate-fadeInUp !border-transparent hover:!border-indigo-500/30"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="text-3xl mb-2">{fmt.icon}</div>
                  <div className="text-xs font-bold text-slate-400 group-hover:text-white transition-colors">{fmt.name}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Content */}
          <div className="flex-1 max-w-xl animate-fadeInUp delay-300">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-4"
                  style={{ background: 'rgba(99, 102, 241, 0.12)', border: '1px solid rgba(99, 102, 241, 0.2)', color: '#818CF8' }}>
              Flexible Formats
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-5">
              Flexible Data Delivery <span className="gradient-text">& Formatting</span>
            </h2>
            <p className="text-slate-400 text-base leading-relaxed">
              We prioritize client convenience by delivering data in user-friendly, accessible formats such as XLS, CSV, JSON, PDF, TXT, and API endpoints. Our clean, insightful, and easily sortable data enables swift, reliable information retrieval tailored to your needs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
