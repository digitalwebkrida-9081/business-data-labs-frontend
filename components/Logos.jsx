"use client"; 
import Image from "next/image";

export default function Logos() {
  return (
    <section style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-glass)', borderBottom: '1px solid var(--border-glass)' }}>
      <div className="max-w-7xl mx-auto px-6 py-10">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 mb-8">
          Trusted by leading enterprises worldwide
        </p>
        <div className="marquee-container">
          <div className="flex items-center gap-16 animate-marquee" style={{ width: 'max-content' }}>
            {/* Duplicate for seamless loop */}
            {[...Array(2)].map((_, loopIdx) => (
              <div key={loopIdx} className="flex items-center gap-16 shrink-0">
                {['Walmart', 'KPMG', 'Citi', 'JLL', 'Kroger', 'Deloitte', 'McKinsey', 'Goldman Sachs'].map((brand, i) => (
                  <span
                    key={`${loopIdx}-${i}`}
                    className="logo-brand text-lg md:text-xl font-bold tracking-tight whitespace-nowrap cursor-default select-none"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
