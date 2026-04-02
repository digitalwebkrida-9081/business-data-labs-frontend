"use client";

export default function Newsletter(){
  return (
    <div style={{
      background: 'linear-gradient(90deg, var(--bg-primary), var(--bg-secondary))',
      borderBottom: '1px solid rgba(99, 102, 241, 0.15)',
    }}>
      <div className="max-w-7xl mx-auto px-4 py-2 text-center flex items-center justify-center gap-2">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <p className="text-xs sm:text-sm text-slate-400">
          Looking for custom datasets?{" "}
          <span
            className="text-indigo-400 font-semibold cursor-pointer hover:text-indigo-300 transition-colors"
            onClick={() => window.location.href = "/contact"}
          >
            Contact us →
          </span>
        </p>
      </div>
    </div>
  );
}
