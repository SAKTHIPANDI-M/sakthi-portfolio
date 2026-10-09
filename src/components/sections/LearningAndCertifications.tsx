import React, { useState } from 'react';
import { PORTFOLIO_DATA, Certificate } from '../../data/portfolioData';
import { ArrowRight, ArrowUpRight, CheckCircle2, Award, Clock, ShieldCheck, Sparkles, X, ExternalLink } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';

export const LearningAndCertifications: React.FC = () => {
  const learningItems = PORTFOLIO_DATA.currentlyLearning;
  const certs = PORTFOLIO_DATA.certifications as Certificate[];
  const [hoveredLearning, setHoveredLearning] = useState<number | null>(0);
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  return (
    <section className="relative py-24 sm:py-32 bg-[#050505] border-b border-white/10">
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* 1. CURRENTLY LEARNING SECTION (Kept pristine & untouched) */}
        <div>
          <ScrollReveal
            direction="up"
            distance={28}
            className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/10 pb-6 mb-12"
          >
            <div>
              <div className="text-xs sm:text-sm font-mono-tech text-[#E10600] font-bold tracking-widest uppercase mb-2">
                RADAR // HORIZON SCAN
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight">
                CURRENTLY LEARNING
              </h2>
            </div>
            <div className="mt-4 sm:mt-0 text-xs font-mono-tech text-[#777777]">
              ACTIVE STUDY & RESEARCH DOMAINS
            </div>
          </ScrollReveal>

          {/* Interactive Learning Matrix */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Technology List (Interactive Selector) */}
            <div className="lg:col-span-6 space-y-2.5">
              {learningItems.map((item, idx) => {
                const isHovered = hoveredLearning === idx;

                return (
                  <ScrollReveal
                    key={item.title}
                    direction="up"
                    distance={25}
                    delay={idx * 0.05}
                    onMouseEnter={() => setHoveredLearning(idx)}
                    onClick={() => setHoveredLearning(idx)}
                    className={`p-4 border transition-all duration-200 cursor-pointer flex items-center justify-between group ${
                      isHovered
                        ? 'border-[#E10600] bg-[#140606] text-white red-glow-subtle'
                        : 'border-white/10 bg-[#090909] text-[#A0A0A0] hover:border-white/25 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono-tech text-xs text-[#E10600] font-bold">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="font-editorial text-base sm:text-lg font-bold tracking-wide">
                        {item.title}
                      </span>
                    </div>

                    <ArrowRight
                      className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${
                        isHovered ? 'text-[#FF1717]' : 'text-white/20'
                      }`}
                    />
                  </ScrollReveal>
                );
              })}
            </div>

            {/* Right: Active Deep-Dive Insight Card */}
            <ScrollReveal
              direction="up"
              distance={35}
              delay={0.15}
              className="lg:col-span-6 sticky top-28 p-8 bg-[#090909] border-2 border-[#E10600]/40 shadow-xl min-h-[260px] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono-tech text-[#777777] border-b border-white/10 pb-3 mb-4">
                  <span className="text-[#E10600] flex items-center gap-1.5 font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    SYLLABUS & EXPERIMENTATION
                  </span>
                  <span>DOMAIN 0{(hoveredLearning ?? 0) + 1} // 0{learningItems.length}</span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {learningItems[hoveredLearning ?? 0].title}
                </h3>

                <p className="text-base text-[#C0C0C0] mt-4 leading-relaxed font-normal">
                  {learningItems[hoveredLearning ?? 0].desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono-tech text-[#777777]">
                <span>STATUS: IN ACTIVE PROGRESSION</span>
                <span className="text-white font-bold">2026 ROADMAP</span>
              </div>
            </ScrollReveal>

          </div>
        </div>

        {/* 2. CERTIFICATIONS & CREDENTIALS SECTION (UPGRADED EDITORIAL 2-COLUMN GRID) */}
        <div id="certifications" className="scroll-mt-24 sm:scroll-mt-28">
          <ScrollReveal
            direction="up"
            distance={28}
            className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/10 pb-6 mb-12"
          >
            <div>
              <div className="text-xs sm:text-sm font-mono-tech text-[#E10600] font-bold tracking-widest uppercase mb-2">
                VERIFIED CREDENTIALS
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight">
                CERTIFICATIONS & CREDENTIALS
              </h2>
            </div>
            <div className="mt-4 sm:mt-0 text-xs font-mono-tech text-[#777777]">
              OFFICIAL ACCREDITATIONS & HACKATHONS
            </div>
          </ScrollReveal>

          {/* Elegant 2-Column Desktop Grid / 1-Column Responsive Mobile Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {certs.map((cert, idx) => (
              <ScrollReveal
                key={cert.id}
                direction="up"
                distance={30}
                delay={idx * 0.08}
                className="group relative bg-[#090909] border border-white/10 hover:border-[#E10600] p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_45px_-10px_rgba(225,6,0,0.3)]"
              >
                <div>
                  {/* Top Bar: Certificate Number & Category */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
                    <div className="flex items-center gap-3">
                      <span className="font-display font-black text-3xl sm:text-4xl text-[#E10600] group-hover:text-[#FF1717] transition-colors">
                        {cert.number}
                      </span>
                      {cert.category && (
                        <span className="text-[10px] font-mono-tech text-[#888888] uppercase tracking-wider px-2 py-0.5 bg-white/5 border border-white/10">
                          {cert.category}
                        </span>
                      )}
                    </div>

                    {cert.date && (
                      <div className="flex items-center gap-1.5 text-xs font-mono-tech text-[#777777]">
                        <Clock className="w-3.5 h-3.5 text-[#E10600]" />
                        <span>{cert.date}</span>
                      </div>
                    )}
                  </div>

                  {/* Certificate Title & Issuer */}
                  <div className="mb-5">
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-white transition-colors tracking-tight leading-snug">
                      {cert.title}
                    </h3>
                    <div className="text-sm font-mono-tech text-[#E10600] mt-1 flex flex-wrap items-center gap-2">
                      <span className="font-bold text-white/90">{cert.issuer}</span>
                      {cert.poweredBy && (
                        <>
                          <span className="text-white/30">•</span>
                          <span className="text-[#888888]">{cert.poweredBy}</span>
                        </>
                      )}
                      {cert.courseCode && (
                        <>
                          <span className="text-white/30">•</span>
                          <span className="text-[#FF1717] font-bold">[{cert.courseCode}]</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* High-Tech Certificate Preview Card */}
                  <div
                    onClick={() => setSelectedCert(cert)}
                    className="relative bg-[#050505] border border-white/15 p-4 sm:p-5 mb-5 rounded-none cursor-pointer overflow-hidden transition-all duration-300 group/preview hover:border-white/40"
                  >
                    {/* Subtle top indicator */}
                    <div className="flex items-center justify-between text-[10px] font-mono-tech text-[#777777] border-b border-white/10 pb-2 mb-3">
                      <span className="text-[#E10600] flex items-center gap-1 font-bold">
                        <Award className="w-3 h-3" /> OFFICIAL CREDENTIAL
                      </span>
                      <span>HOLDER: SAKTHIPANDI M</span>
                    </div>

                    <div className="space-y-1.5">
                      <div className="text-xs font-editorial font-bold text-white tracking-wide">
                        {cert.title}
                      </div>
                      <div className="text-[11px] font-mono-tech text-[#888888]">
                        Issued by: {cert.issuer}
                      </div>
                      {cert.institution && (
                        <div className="text-[11px] font-mono-tech text-[#777777]">
                          College: {cert.institution}
                        </div>
                      )}
                    </div>

                    {/* Status Pill */}
                    <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-[10px] font-mono-tech">
                      {cert.verificationUrl ? (
                        <span className="text-emerald-400 flex items-center gap-1 font-bold">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          VERIFIED CREDENTIAL
                        </span>
                      ) : (
                        <span className="text-amber-400 flex items-center gap-1 font-bold">
                          <Clock className="w-3 h-3 text-amber-400" />
                          VERIFICATION LINK PENDING
                        </span>
                      )}
                      <span className="text-[#888888] group-hover/preview:text-white transition-colors">
                        CLICK TO INSPECT ↗
                      </span>
                    </div>

                    {/* Corner Tech Marks */}
                    <div className="absolute top-1 right-1 text-[8px] font-mono-tech text-white/20">+</div>
                    <div className="absolute bottom-1 left-1 text-[8px] font-mono-tech text-white/20">+</div>
                  </div>

                  {/* Short Credential Description */}
                  <p className="text-xs sm:text-sm text-[#A0A0A0] leading-relaxed mb-6 font-normal">
                    {cert.description}
                  </p>
                </div>

                {/* Bottom Action Buttons: VIEW CERTIFICATE ↗ & VERIFY CERTIFICATE ↗ */}
                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                  <button
                    onClick={() => setSelectedCert(cert)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#121212] hover:bg-white hover:text-black text-white text-xs font-mono-tech uppercase tracking-wider border border-white/20 transition-all cursor-pointer"
                  >
                    <span>VIEW CERTIFICATE</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  {cert.verificationUrl ? (
                    <a
                      href={cert.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-5 py-2 bg-[#E10600] hover:bg-[#FF1717] text-white text-xs font-mono-tech font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_0_15px_rgba(225,6,0,0.3)] hover:shadow-[0_0_25px_rgba(255,23,23,0.5)] group/btn"
                    >
                      <span>VERIFY CERTIFICATE</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </a>
                  ) : (
                    <div className="px-3.5 py-2 bg-amber-950/30 border border-amber-600/40 text-amber-300 text-[11px] font-mono-tech flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>VERIFICATION LINK PENDING</span>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

      </div>

      {/* Official Certificate Dossier Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-[#090909] border-2 border-white/20 p-6 sm:p-8 shadow-[0_20px_70px_rgba(225,6,0,0.4)] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#E10600] inline-block animate-pulse" />
                <span className="font-mono-tech text-xs text-[#E10600] font-bold uppercase tracking-widest">
                  CREDENTIAL DOSSIER // {selectedCert.number}
                </span>
              </div>
              <button
                onClick={() => setSelectedCert(null)}
                className="p-1.5 text-white/60 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Official Certificate Document Presentation */}
            <div className="p-6 sm:p-8 bg-[#050505] border-2 border-white/15 relative overflow-hidden space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 text-xs font-mono-tech">
                <div className="flex items-center gap-2 text-white font-bold">
                  <Award className="w-4 h-4 text-[#E10600]" />
                  <span>{selectedCert.issuer}</span>
                </div>
                {selectedCert.date && (
                  <span className="text-[#888888]">{selectedCert.date}</span>
                )}
              </div>

              <div className="space-y-2 text-center py-4">
                <div className="text-xs font-mono-tech text-[#888888] uppercase tracking-widest">
                  {selectedCert.isHackathon ? 'CERTIFICATE OF PARTICIPATION' : 'VERIFIED ACCREDITATION'}
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {selectedCert.title}
                </h3>
                {selectedCert.subtitle && (
                  <div className="text-sm font-editorial text-[#E10600] font-bold">
                    {selectedCert.subtitle}
                  </div>
                )}
              </div>

              <div className="p-4 bg-[#0A0A0A] border border-white/10 text-xs font-mono-tech space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#777777]">CERTIFICATE HOLDER:</span>
                  <span className="text-white font-bold">SAKTHIPANDI M</span>
                </div>
                {selectedCert.institution && (
                  <div className="flex justify-between">
                    <span className="text-[#777777]">COLLEGE:</span>
                    <span className="text-white">{selectedCert.institution}</span>
                  </div>
                )}
                {selectedCert.courseCode && (
                  <div className="flex justify-between">
                    <span className="text-[#777777]">COURSE CODE:</span>
                    <span className="text-[#E10600] font-bold">{selectedCert.courseCode}</span>
                  </div>
                )}
                {selectedCert.poweredBy && (
                  <div className="flex justify-between">
                    <span className="text-[#777777]">POWERED BY:</span>
                    <span className="text-white">{selectedCert.poweredBy}</span>
                  </div>
                )}
              </div>

              <p className="text-xs sm:text-sm text-[#A0A0A0] leading-relaxed">
                {selectedCert.description}
              </p>

              {/* Status & Verification Footer */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                {selectedCert.verificationUrl ? (
                  <a
                    href={selectedCert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#E10600] hover:bg-[#FF1717] text-white text-xs font-mono-tech font-bold uppercase tracking-wider transition-colors shadow-lg"
                  >
                    <span>VERIFY ON OFFICIAL PORTAL</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <div className="px-3 py-1.5 bg-amber-950/40 border border-amber-600/50 text-amber-300 text-xs font-mono-tech flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>VERIFICATION LINK PENDING (OFFICIAL ISSUER VALIDATION)</span>
                  </div>
                )}

                <button
                  onClick={() => setSelectedCert(null)}
                  className="px-4 py-2 bg-[#1A1A1A] hover:bg-white hover:text-black text-white text-xs font-mono-tech uppercase transition-colors ml-auto cursor-pointer"
                >
                  CLOSE
                </button>
              </div>

              {/* Corner Watermarks */}
              <div className="absolute top-2 left-2 text-[8px] font-mono-tech text-white/20">[CREDENTIAL_SEC]</div>
              <div className="absolute bottom-2 right-2 text-[8px] font-mono-tech text-white/20">[SAKTHI_PANDI]</div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
