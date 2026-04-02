"use client";
import Link from "next/link";
import { FaChartLine, FaDatabase, FaUserFriends } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";

function AnimatedStat({ target, suffix = "" }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const done = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true;
        let s = 0;
        const inc = target / 60;
        const t = setInterval(() => {
          s += inc;
          if (s >= target) { setVal(target); clearInterval(t); }
          else setVal(Math.floor(s));
        }, 16);
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);

  return <span ref={ref}>{val}{suffix}</span>;
}

export default function WhyChoose() {
  return (
    <section className="section-padding relative" style={{ background: 'var(--bg-primary)' }}>
      <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-4"
                style={{ background: 'rgba(139, 92, 246, 0.12)', border: '1px solid rgba(139, 92, 246, 0.2)', color: '#A78BFA' }}>
            Why Business Data Labs?
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Beyond Just <span className="gradient-text">Leads</span>
          </h2>
          <p className="text-slate-400 leading-relaxed text-lg">
            Maximize the potential of your marketing, sales, analytics, and operations
            with exclusive, high-quality leads. Reduce time spent on lead sourcing and
            focus on high-impact initiatives.
          </p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20">
          {[
            { title: 'Close Faster', value: 62, suffix: '%', sub: 'Increase in overall productivity', icon: FaChartLine, gradient: 'linear-gradient(135deg, #6366F1, #4F46E5)' },
            { title: 'Save Budgets', value: 3, suffix: 'x', sub: 'Increase in win rates', icon: FaDatabase, gradient: 'linear-gradient(135deg, #8B5CF6, #7C3AED)' },
            { title: 'Attract Customers', value: 74, suffix: '%', sub: 'Decrease in marketing spend', icon: FaUserFriends, gradient: 'linear-gradient(135deg, #22D3EE, #06B6D4)' },
          ].map((card, i) => (
            <div key={i}
                 className="relative overflow-hidden rounded-2xl p-8 group transition-all duration-300 hover:-translate-y-2"
                 style={{ background: card.gradient, boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}>
              <div className="relative z-10">
                <h4 className="text-base font-semibold text-white/80 mb-2">{card.title}</h4>
                <div className="text-5xl font-black text-white mb-2">
                  <AnimatedStat target={card.value} suffix={card.suffix} />
                </div>
                <p className="text-sm text-white/60">{card.sub}</p>
              </div>
              <card.icon className="absolute bottom-4 right-4 text-white/10 text-8xl group-hover:text-white/20 group-hover:scale-110 transition-all duration-500" />
            </div>
          ))}
        </div>

        {/* Info Banner */}
        <div className="glass-card !p-10 !rounded-2xl flex flex-col lg:flex-row items-center gap-10 relative overflow-hidden"
             style={{ background: 'rgba(26, 31, 46, 0.9)' }}>
          
          {/* Glow accents */}
          <div className="absolute top-0 left-0 w-48 h-48 rounded-full opacity-20 pointer-events-none" style={{ background: 'radial-gradient(circle, var(--accent-primary), transparent 70%)' }} />
          
          {/* Left Content */}
          <div className="flex-1 max-w-xl relative z-10">
            <h3 className="text-2xl font-black text-white mb-4">
              Harness the Power of{" "}
              <span className="gradient-text">Business Data Labs</span>
            </h3>
            <p className="text-slate-400 leading-relaxed mb-6">
              Our web scraping services collect data and convert it into standardized
              CSV, Excel, and JSON formats. We deliver accurate, fast data scraping to
              meet the high-volume needs of enterprises. These samples illustrate the
              breadth of our web scraping capabilities across industries.
            </p>
            <Link href="/contact" className="btn-primary inline-flex items-center gap-2 text-sm">
              Contact Our Experts Now
            </Link>
          </div>

          {/* Right Visual */}
          <div className="flex-1 flex justify-center relative z-10">
            <div className="grid grid-cols-2 gap-3 max-w-[280px]">
              {[
                { label: 'Verified Emails', value: '8.5M+', color: '#22D3EE' },
                { label: 'Phone Numbers', value: '7.2M+', color: '#10B981' },
                { label: 'Global Coverage', value: '150+', color: '#6366F1' },
                { label: 'Data Accuracy', value: '99.9%', color: '#F59E0B' },
              ].map((item, i) => (
                <div key={i} className="glass-card !p-4 !rounded-xl text-center !border-transparent">
                  <div className="text-lg font-black text-white mb-1">{item.value}</div>
                  <div className="text-[10px] font-semibold" style={{ color: item.color }}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Accent Line */}
          <div className="absolute bottom-0 left-0 w-full h-1" style={{ background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary), var(--accent-cyan))' }} />
        </div>

      </div>
    </section>
  );
}
