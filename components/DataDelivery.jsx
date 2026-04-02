import Image from "next/image";
import Link from "next/link";

export default function DataDelivery() {
  return (
    <section className="section-padding relative" style={{ background: 'var(--bg-secondary)' }}>
      <div className="absolute inset-0 grid-pattern pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-24">
        
        {/* Row 1  */}
        <div className="flex flex-col-reverse lg:flex-row items-center gap-14">
          {/* Left: Visual */}
          <div className="flex-1 flex justify-center animate-fadeInUp">
            <div className="glass-card !p-8 !rounded-2xl max-w-[480px] w-full" style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
                <span className="ml-auto text-[10px] text-slate-600 font-mono">data_output.json</span>
              </div>
              {/* Simulated code block */}
              <div className="font-mono text-xs space-y-1 text-slate-400">
                <div><span className="text-indigo-400">{'{'}</span></div>
                <div className="pl-4"><span className="text-cyan-400">"company"</span>: <span className="text-emerald-400">"Acme Corp"</span>,</div>
                <div className="pl-4"><span className="text-cyan-400">"email"</span>: <span className="text-emerald-400">"info@acme.com"</span>,</div>
                <div className="pl-4"><span className="text-cyan-400">"phone"</span>: <span className="text-emerald-400">"+1-555-0123"</span>,</div>
                <div className="pl-4"><span className="text-cyan-400">"industry"</span>: <span className="text-emerald-400">"Technology"</span>,</div>
                <div className="pl-4"><span className="text-cyan-400">"records"</span>: <span className="text-amber-400">15420</span></div>
                <div><span className="text-indigo-400">{'}'}</span></div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] text-emerald-400 font-semibold">Data structured & ready</span>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="flex-1 max-w-xl animate-fadeInUp delay-200">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-4"
                  style={{ background: 'rgba(34, 211, 238, 0.1)', border: '1px solid rgba(34, 211, 238, 0.2)', color: '#22D3EE' }}>
              Data Structuring
            </span>
            <h2 className="text-3xl font-black text-white mb-5">
              Customizable Data <span className="gradient-text">Structuring</span>
            </h2>
            <p className="text-slate-400 text-base leading-relaxed mb-8">
              Business Data Labs scrapes and transforms data into your preferred
              structure and format, including TXT, PDF, Image, JSON, FTP, API,
              and CSV, streamlining integration with your business processes.
            </p>
            <Link href="/contact" className="btn-primary inline-flex items-center gap-2 text-sm">
              Contact Sales
            </Link>
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex flex-col lg:flex-row items-center gap-14">
          {/* Left: Content */}
          <div className="flex-1 max-w-xl animate-fadeInUp">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-4"
                  style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', color: '#10B981' }}>
              Secure Delivery
            </span>
            <h2 className="text-3xl font-black text-white mb-5">
              Secure Data <span className="gradient-text">Delivery</span>
            </h2>
            <p className="text-slate-400 text-base leading-relaxed mb-8">
              We ensure smooth, secure data delivery to any specified location, upholding the highest standards of data confidentiality and integrity.
            </p>
            <Link href="/contact" className="btn-primary inline-flex items-center gap-2 text-sm">
              Contact Sales
            </Link>
          </div>

          {/* Right: Visual */}
          <div className="flex-1 flex justify-center animate-fadeInUp delay-200">
            <div className="glass-card !p-8 !rounded-2xl max-w-[480px] w-full relative" style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
              {/* Data flow visual  */}
              <div className="space-y-4">
                {[
                  { label: 'Extraction', status: 'Complete', pct: '100%', color: '#10B981' },
                  { label: 'Validation', status: 'Complete', pct: '100%', color: '#22D3EE' },
                  { label: 'Formatting', status: 'Complete', pct: '100%', color: '#6366F1' },
                  { label: 'Encryption', status: 'Active', pct: '95%', color: '#F59E0B' },
                  { label: 'Delivery', status: 'Queued', pct: '0%', color: '#64748B' },
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white shrink-0"
                         style={{ background: `${step.color}25`, border: `1px solid ${step.color}30` }}>
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-white">{step.label}</span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                              style={{ background: `${step.color}15`, color: step.color }}>
                          {step.status}
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
                        <div className="h-full rounded-full transition-all duration-1000" style={{ width: step.pct, background: step.color }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
