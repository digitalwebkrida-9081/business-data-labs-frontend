"use client";
import Link from "next/link";
import { FaArrowRight, FaDatabase, FaGlobe, FaBolt } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";

function AnimatedCounter({ target, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          const increment = target / (duration / 16);
          const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden mesh-gradient" style={{ background: 'var(--bg-primary)', minHeight: '85vh' }}>
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 dot-pattern" />
      
      {/* Animated gradient orbs */}
      <div className="absolute top-20 right-[10%] w-80 h-80 rounded-full opacity-20 animate-float" style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.4), transparent 70%)' }} />
      <div className="absolute bottom-10 left-[5%] w-60 h-60 rounded-full opacity-15 animate-float" style={{ animationDelay: '3s', background: 'radial-gradient(circle, rgba(34,211,238,0.3), transparent 70%)' }} />
      <div className="absolute top-[60%] right-[30%] w-40 h-40 rounded-full opacity-10 animate-float" style={{ animationDelay: '5s', background: 'radial-gradient(circle, rgba(139,92,246,0.4), transparent 70%)' }} />

      {/* Content */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 pt-36 pb-24 lg:pt-44 lg:pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left column */}
            <div className="animate-fadeInUp">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-8"
                   style={{ background: 'rgba(99, 102, 241, 0.12)', border: '1px solid rgba(99, 102, 241, 0.2)', color: '#818CF8' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Trusted by 500+ Enterprises Worldwide
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight text-white mb-6">
                Premiere{" "}
                <span className="gradient-text">Web Scraping</span>{" "}
                Solutions
              </h1>

              <p className="text-lg text-slate-400 max-w-lg mb-10 leading-relaxed">
                Experience industry-leading data extraction services relied upon by enterprises globally. 
                Transform raw web data into actionable business intelligence.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-16">
                <Link
                  href="/b2b-database"
                  className="btn-primary text-base flex items-center justify-center gap-2 group"
                >
                  Explore B2B Database
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" size={14} />
                </Link>
                <Link
                  href="/contact"
                  className="btn-ghost text-base flex items-center justify-center gap-2"
                >
                  Talk to Sales
                </Link>
              </div>
            </div>

            {/* Right column — floating data visualization */}
            <div className="hidden lg:flex justify-center animate-fadeInUp delay-300">
              <div className="relative">
                {/* Main card */}
                <div className="glass-card p-8 rounded-2xl w-[380px]" style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))' }}>
                      <FaDatabase className="text-white text-sm" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">B2B Database</div>
                      <div className="text-xs text-slate-500">Real-time data</div>
                    </div>
                    <span className="ml-auto px-2.5 py-1 rounded-full text-[10px] font-bold" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10B981' }}>LIVE</span>
                  </div>
                  
                  {/* Mini data rows */}
                  {[
                    { label: 'Records Available', value: '10M+', color: '#6366F1' },
                    { label: 'Email Addresses', value: '8.5M+', color: '#22D3EE' },
                    { label: 'Phone Numbers', value: '7.2M+', color: '#10B981' },
                    { label: 'Countries Covered', value: '150+', color: '#F59E0B' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-3" style={{ borderBottom: '1px solid var(--border-glass)' }}>
                      <span className="text-sm text-slate-400 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                        {item.label}
                      </span>
                      <span className="text-sm font-bold text-white">{item.value}</span>
                    </div>
                  ))}
                  
                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-xs text-slate-500">Updated just now</span>
                    <span className="text-xs font-semibold text-indigo-400">99.9% Accuracy</span>
                  </div>
                </div>

                {/* Floating mini cards */}
                <div className="absolute -top-6 -right-6 glass-card !p-4 !rounded-xl animate-float" style={{ animationDelay: '1s' }}>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(34, 211, 238, 0.15)' }}>
                      <FaGlobe className="text-cyan-400 text-xs" />
                    </div>
                    <div>
                      <div className="text-[11px] text-slate-500">Coverage</div>
                      <div className="text-sm font-bold text-white">Global</div>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-8 glass-card !p-4 !rounded-xl animate-float" style={{ animationDelay: '2s' }}>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(245, 158, 11, 0.15)' }}>
                      <FaBolt className="text-amber-400 text-xs" />
                    </div>
                    <div>
                      <div className="text-[11px] text-slate-500">Speed</div>
                      <div className="text-sm font-bold text-white">Instant</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-fadeInUp delay-500">
            {[
              { num: 10, suffix: 'M+', label: 'Data Records', icon: '📊' },
              { num: 150, suffix: '+', label: 'Countries', icon: '🌍' },
              { num: 99, suffix: '.9%', label: 'Data Accuracy', icon: '✓' },
              { num: 500, suffix: '+', label: 'Enterprise Clients', icon: '🏢' },
            ].map((stat, i) => (
              <div key={i} className="glass-card !p-5 text-center !rounded-xl group !border-transparent hover:!border-indigo-500/30">
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-2xl md:text-3xl font-black text-white mb-1">
                  <AnimatedCounter target={stat.num} suffix={stat.suffix} />
                </div>
                <div className="text-xs text-slate-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}