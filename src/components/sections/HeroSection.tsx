import React from 'react';
import { ArrowRight, ArrowUpRight, Terminal, Sparkles } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import TechText from '../ui/TechText';

interface HeroSectionProps {
  onExploreWork: () => void;
  onConnect: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreWork, onConnect }) => {
  const p = PORTFOLIO_DATA.personal;

  return (
    <section
      id="home"
      className="relative min-h-screen pt-28 pb-20 flex items-center overflow-hidden bg-[#050505] tech-grid-pattern border-b border-white/10"
    >
      {/* Ambient Red Glow for Depth */}
      <div className="absolute top-1/3 right-1/4 w-[520px] h-[520px] bg-[#E10600]/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#E10600]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* HUGE OVERSIZED EDITORIAL TYPOGRAPHY BEHIND THE ENTIRE SECTION & PORTRAIT */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none z-0 overflow-hidden leading-none"
      >
        <span className="font-display font-black text-[17vw] tracking-tighter text-white/[0.04] uppercase block whitespace-nowrap drop-shadow-[0_0_30px_rgba(225,6,0,0.15)]">
          DEVELOPER
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Top Editorial Dossier Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 items-center justify-between text-xs font-mono-tech text-[#777777] border-b border-white/10 pb-4 mb-10 sm:mb-14">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#E10600] inline-block" />
            <span className="text-white font-bold tracking-wider">{p.name}</span>
            <span className="text-[#E10600] text-[10px] hidden sm:inline">// {p.location}</span>
          </div>

          <div className="hidden sm:block text-center tracking-widest text-[#B8B8B8] text-[11px]">
            {p.tagline}
          </div>

          <div className="text-right flex items-center justify-end gap-2">
            <span className="w-1.5 h-1.5 bg-[#FF1717] rounded-full animate-ping" />
            <span className="text-white font-mono-tech text-[11px] uppercase tracking-wider">{p.statusHero}</span>
          </div>
        </div>

        {/* MAIN HERO GRID: LEFT (50%) • RIGHT (50% LARGE PORTRAIT) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* ================= LEFT COLUMN ================= */}
          <div className="lg:col-span-6 space-y-7 z-10">
            
            {/* Small Label: AI DEVELOPER */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#120606] border border-[#E10600]/40 text-xs font-mono-tech uppercase tracking-widest text-[#FF1717] font-bold">
              <span className="w-2 h-2 bg-[#E10600] inline-block animate-pulse" />
              <span>AI DEVELOPER</span>
            </div>

            {/* Main Editorial Heading */}
            <div className="space-y-2">
              <div className="text-sm sm:text-base font-mono-tech text-[#888888] tracking-widest uppercase">
                HELLO, I'M
              </div>

              <h1 className="font-display font-black tracking-tight text-white leading-[0.92]">
                <span className="sr-only">SAKTHI PANDI</span>
                <div className="h-16 sm:h-20 md:h-24 lg:h-28 w-full max-w-xl">
                  <TechText
                    text="SAKTHI"
                    fontFamily="'Syne', sans-serif"
                    fontWeight={900}
                    fontSize={100}
                    color="#ffffff"
                    accentColor="#E10600"
                    reach={180}
                    softness={0.7}
                    dashLength={4}
                    dashGap={2}
                    strokeWidth={1.5}
                    lineStyle="dashed"
                    reveal="letter"
                    specks={15}
                    selection={true}
                    labels={true}
                    draggable={true}
                    sweep={true}
                    speed={1}
                  />
                </div>
                <div className="h-16 sm:h-20 md:h-24 lg:h-28 w-full max-w-xl -mt-2 sm:-mt-3">
                  <TechText
                    text="PANDI"
                    fontFamily="'Syne', sans-serif"
                    fontWeight={900}
                    fontSize={100}
                    color="#ffffff"
                    accentColor="#E10600"
                    reach={180}
                    softness={0.7}
                    dashLength={4}
                    dashGap={2}
                    strokeWidth={1.5}
                    lineStyle="dashed"
                    reveal="letter"
                    specks={15}
                    selection={true}
                    labels={true}
                    draggable={true}
                    sweep={true}
                    speed={1}
                  />
                </div>
              </h1>

              {/* Sub-Headline */}
              <div className="pt-2 text-xl sm:text-2xl md:text-3xl font-editorial font-bold text-[#E10600] tracking-wide flex items-center gap-3">
                <span>AI DEVELOPER & COMPUTER SCIENCE STUDENT</span>
              </div>
            </div>

            {/* Short Description */}
            <p className="text-base sm:text-lg text-[#B8B8B8] max-w-xl leading-relaxed font-normal">
              Turning ideas into intelligent experiences using Python, machine learning algorithms, deep neural architectures, and modern web applications.
            </p>

            {/* Action Buttons: [ VIEW PROJECTS → ] [ LET'S CONNECT → ] */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreWork}
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-[#E10600] hover:bg-[#FF1717] text-white font-mono-tech text-xs sm:text-sm uppercase tracking-wider font-bold transition-all duration-300 shadow-[0_0_30px_rgba(225,6,0,0.45)] hover:shadow-[0_0_40px_rgba(255,23,23,0.7)] hover:-translate-y-0.5 cursor-pointer"
              >
                <span>VIEW PROJECTS</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onConnect}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-[#0D0D0D] hover:bg-white hover:text-black text-white font-mono-tech text-xs sm:text-sm uppercase tracking-wider border border-white/20 hover:border-white transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
              >
                <span>LET'S CONNECT</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>

            {/* Technical Sub-row */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-4 text-xs font-mono-tech text-[#777777]">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-[#E10600]" />
                <span className="text-[#B8B8B8]">STACK:</span>
                <span>Python // Scikit-Learn // Pandas // PyTorch</span>
              </div>
              <span className="text-white/20">•</span>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#E10600]" />
                <span>B.Sc CS with AI (S.I.V.E.T. College)</span>
              </div>
            </div>

          </div>

          {/* ================= RIGHT COLUMN: PERMANENT ORIGINAL myimage1.jpeg (45-50% HERO AREA) ================= */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end z-10">
            
            {/* Background Red Architectural Accent Glow */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#E10600]/30 to-transparent blur-2xl opacity-60 pointer-events-none" />

            {/* Giant Editorial Portrait Container */}
            <div className="relative w-full max-w-[500px] sm:max-w-[540px] bg-[#0A0A0A] border-2 border-white/20 hover:border-[#FF1717] transition-all duration-500 shadow-[0_25px_80px_-15px_rgba(225,6,0,0.55)] group">
              
              {/* Editorial Top Coordinate Header */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-black/90 border-b border-white/15 text-[10px] font-mono-tech text-[#B8B8B8]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#E10600] inline-block animate-pulse" />
                  <span className="text-white font-bold tracking-widest">SAKTHI PANDI // PORTRAIT</span>
                </div>
                <div className="text-[#E10600] font-bold">
                  CHENNAI, IN [13.0827°N]
                </div>
              </div>

              {/* THE EXACT ORIGINAL UPLOADED PHOTOGRAPH: myimage1.jpeg */}
              <div className="relative w-full overflow-hidden bg-[#050505]">
                <img
                  src="/myimage1.jpeg"
                  alt="Sakthi Pandi — AI Developer (myimage1.jpeg)"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== window.location.origin + '/myimage1.jpg') {
                      target.src = '/myimage1.jpg';
                    }
                  }}
                  className="w-full h-auto max-h-[660px] object-contain object-center block mx-auto transition-transform duration-700 group-hover:scale-[1.02]"
                  loading="eager"
                  decoding="async"
                />
              </div>

              {/* Editorial Bottom Status Bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#080808] border-t border-white/15 text-[10px] font-mono-tech text-[#888888]">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#FF1717] rounded-full animate-ping" />
                  <span className="text-white">AI DEVELOPER & CS STUDENT</span>
                </div>
                <div className="text-white/60">
                  REF: SAKTHI // FIG.01
                </div>
              </div>

              {/* Decorative High-Contrast Precision Corner Crosses */}
              <div className="absolute -top-3.5 -left-3.5 text-[#E10600] font-mono-tech text-2xl select-none pointer-events-none">+</div>
              <div className="absolute -bottom-3.5 -right-3.5 text-[#E10600] font-mono-tech text-2xl select-none pointer-events-none">+</div>
              <div className="absolute -bottom-3.5 -left-3.5 text-[#E10600] font-mono-tech text-2xl select-none pointer-events-none">+</div>
              <div className="absolute -top-3.5 -right-3.5 text-[#E10600] font-mono-tech text-2xl select-none pointer-events-none">+</div>
            </div>

          </div>

        </div>

        {/* Editorial Bottom Section Marks */}
        <div className="mt-14 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between text-xs font-mono-tech text-[#666666]">
          <div className="flex items-center gap-3">
            <span className="text-[#E10600] font-bold">+ 001 // HERO</span>
            <span>PORTFOLIO ENTRY POINT</span>
          </div>
          <div className="flex items-center gap-4">
            <span>B.SC COMPUTER SCIENCE WITH ARTIFICIAL INTELLIGENCE</span>
            <span className="text-white">2024 — 2027</span>
          </div>
        </div>

      </div>
    </section>
  );
};
