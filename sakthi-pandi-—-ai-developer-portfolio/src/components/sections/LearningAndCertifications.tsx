import React, { useState, useEffect } from 'react';
import { PORTFOLIO_DATA, Certificate } from '../../data/portfolioData';
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Clock,
  Sparkles,
  X,
  ExternalLink,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2
} from 'lucide-react';
import { ScrollReveal as FadeContainer } from '../ui/ScrollReveal';
import ScrollReveal from '../ScrollReveal';

export const LearningAndCertifications: React.FC = () => {
  const learningItems = PORTFOLIO_DATA.currentlyLearning;
  const certs = PORTFOLIO_DATA.certifications as Certificate[];
  const [hoveredLearning, setHoveredLearning] = useState<number | null>(0);
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [zoom, setZoom] = useState<number>(1);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedCert(null);
        setZoom(1);
      }
    };

    if (selectedCert) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedCert]);

  const handleOpenCert = (cert: Certificate) => {
    setSelectedCert(cert);
    setZoom(1);
  };

  const handleCloseModal = () => {
    setSelectedCert(null);
    setZoom(1);
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.25, 2.5));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.25, 0.75));
  };

  const handleResetZoom = () => {
    setZoom(1);
  };

  const handleImageError = (certId: string) => {
    setFailedImages((prev) => {
      if (prev[certId]) return prev;
      return { ...prev, [certId]: true };
    });
  };

  return (
    <section id="certifications" className="relative py-24 sm:py-32 bg-[#050505] border-b border-white/10">
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* 1. CURRENTLY LEARNING SECTION */}
        <div>
          <FadeContainer
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
          </FadeContainer>

          {/* Interactive Learning Matrix */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Technology List */}
            <div className="lg:col-span-6 space-y-2.5">
              {learningItems.map((item, idx) => {
                const isHovered = hoveredLearning === idx;

                return (
                  <FadeContainer
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
                  </FadeContainer>
                );
              })}
            </div>

            {/* Right: Active Deep-Dive Insight Card */}
            <FadeContainer
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
            </FadeContainer>

          </div>
        </div>

        {/* 2. CERTIFICATIONS & CREDENTIALS SECTION */}
        <div id="certifications" className="scroll-mt-24 sm:scroll-mt-28">
          <FadeContainer
            direction="up"
            distance={28}
            className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/10 pb-6 mb-12"
          >
            <div>
              <div className="text-xs sm:text-sm font-mono-tech text-[#E10600] font-bold tracking-widest uppercase mb-2">
                ACCREDITATIONS & HONORS
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight">
                CERTIFICATIONS & CREDENTIALS
              </h2>
            </div>
            
            <ScrollReveal
              baseOpacity={0.1}
              enableBlur={true}
              baseRotation={2}
              blurStrength={4}
              rotationEnd="bottom bottom"
              wordAnimationEnd="bottom bottom"
              containerClassName="mt-4 sm:mt-0 max-w-sm"
              textClassName="text-xs font-mono-tech text-[#888888] uppercase tracking-wider leading-relaxed"
            >
              Official credentials from IBM SkillsBuild, IBM Career Education, Oracle University, OfficeMaster, and Agni College of Technology.
            </ScrollReveal>
          </FadeContainer>

          {/* Clean, Consistent 3-Column Desktop / 2-Column Tablet / 1-Column Mobile Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {certs.map((cert, idx) => {
              const isImageMissing = failedImages[cert.id];

              return (
                <FadeContainer
                  key={cert.id}
                  direction="up"
                  distance={30}
                  delay={idx * 0.08}
                  className="group relative bg-[#090909] border border-white/10 hover:border-[#E10600] p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_45px_-10px_rgba(225,6,0,0.3)]"
                >
                  <div className="flex flex-col h-full">
                    {/* Top Bar: Number & Category & Date */}
                    <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                      <div className="flex items-center gap-2.5">
                        <span className="font-display font-black text-2xl sm:text-3xl text-[#E10600] group-hover:text-[#FF1717] transition-colors">
                          {cert.number}
                        </span>
                        {cert.category && (
                          <span className="text-[10px] font-mono-tech text-[#888888] uppercase tracking-wider px-2 py-0.5 bg-white/5 border border-white/10">
                            {cert.category}
                          </span>
                        )}
                      </div>

                      {cert.date && (
                        <div className="flex items-center gap-1.5 text-[11px] font-mono-tech text-[#777777]">
                          <Clock className="w-3 h-3 text-[#E10600]" />
                          <span>{cert.date}</span>
                        </div>
                      )}
                    </div>

                    {/* Certificate Title & Issuer */}
                    <div className="mb-4 min-w-0">
                      <h3 className="font-display text-lg sm:text-xl font-bold text-white group-hover:text-white transition-colors tracking-tight leading-snug line-clamp-2 min-h-[3.25rem]">
                        {cert.title}
                      </h3>
                      <div className="text-xs font-mono-tech text-[#E10600] mt-1.5 flex flex-wrap items-center gap-1.5">
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

                    {/* Certificate Thumbnail Preview */}
                    <div
                      onClick={() => handleOpenCert(cert)}
                      className="relative w-full aspect-[16/10] bg-[#050505] border border-white/15 overflow-hidden mb-4 group/preview cursor-pointer hover:border-[#E10600] transition-all flex items-center justify-center"
                    >
                      {!isImageMissing ? (
                        <img
                          src={cert.image}
                          alt={cert.title}
                          className="w-full h-full object-contain p-2.5 bg-[#070707] transition-transform duration-300 group-hover/preview:scale-[1.03]"
                          onError={() => handleImageError(cert.id)}
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full p-4 flex flex-col items-center justify-center text-center bg-[#070707] space-y-2">
                          <Award className="w-8 h-8 text-[#E10600]" />
                          <div className="text-xs font-display font-bold text-white line-clamp-1">
                            {cert.title}
                          </div>
                          <div className="text-[10px] font-mono-tech text-[#888888]">
                            {cert.issuer}
                          </div>
                          <div className="text-[9px] font-mono-tech text-[#E10600] border border-[#E10600]/40 px-2 py-0.5">
                            CLICK TO VIEW CERTIFICATE
                          </div>
                        </div>
                      )}

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/preview:opacity-100 transition-opacity flex items-center justify-center p-3">
                        <span className="px-3.5 py-1.5 bg-[#E10600] text-white font-mono-tech text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 shadow-lg">
                          <Maximize2 className="w-3.5 h-3.5" /> VIEW FULL IMAGE
                        </span>
                      </div>

                      {/* Corner marks */}
                      <div className="absolute top-1 right-1 text-[8px] font-mono-tech text-white/20 select-none">+</div>
                      <div className="absolute bottom-1 left-1 text-[8px] font-mono-tech text-white/20 select-none">+</div>
                    </div>

                    {/* Short Description */}
                    <p className="text-xs text-[#A0A0A0] leading-relaxed mb-5 font-normal line-clamp-3">
                      {cert.description}
                    </p>

                    {/* Single Clean Action Button: VIEW CERTIFICATE */}
                    <div className="pt-4 border-t border-white/10 mt-auto">
                      <button
                        onClick={() => handleOpenCert(cert)}
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#121212] hover:bg-[#E10600] text-white text-xs font-mono-tech font-bold uppercase tracking-wider border border-white/20 hover:border-[#E10600] transition-all duration-300 hover:shadow-[0_0_20px_rgba(225,6,0,0.4)] cursor-pointer group/btn"
                      >
                        <span>VIEW CERTIFICATE</span>
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                      </button>
                    </div>

                  </div>
                </FadeContainer>
              );
            })}
          </div>
        </div>

      </div>

      {/* Full-Screen Lightbox Modal */}
      {selectedCert && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) handleCloseModal();
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-between p-3 sm:p-6 bg-black/95 backdrop-blur-xl animate-in fade-in duration-200"
        >
          {/* Top Bar: Title & Controls */}
          <div className="w-full max-w-6xl flex items-center justify-between border-b border-white/10 pb-4 mb-3">
            <div className="flex items-center gap-3 min-w-0">
              <span className="w-2.5 h-2.5 bg-[#E10600] inline-block animate-pulse shrink-0" />
              <div className="min-w-0">
                <div className="font-mono-tech text-[10px] sm:text-xs text-[#E10600] font-bold uppercase tracking-widest truncate">
                  CERTIFICATE {selectedCert.number} // {selectedCert.issuer}
                </div>
                <h3 className="font-display text-base sm:text-xl font-bold text-white tracking-tight truncate">
                  {selectedCert.title}
                </h3>
              </div>
            </div>

            {/* Controls: Zoom Out, Reset, Zoom In, Open in New Tab, Close */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <button
                type="button"
                onClick={handleZoomOut}
                disabled={zoom <= 0.75}
                className="p-2 bg-[#121212] hover:bg-[#202020] disabled:opacity-40 text-white/80 hover:text-white border border-white/10 transition-colors cursor-pointer"
                title="Zoom Out (-)"
              >
                <ZoomOut className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleResetZoom}
                className="px-2.5 py-1.5 bg-[#121212] hover:bg-[#202020] text-xs font-mono-tech text-white/80 hover:text-white border border-white/10 transition-colors cursor-pointer"
                title="Reset Zoom"
              >
                {Math.round(zoom * 100)}%
              </button>

              <button
                type="button"
                onClick={handleZoomIn}
                disabled={zoom >= 2.5}
                className="p-2 bg-[#121212] hover:bg-[#202020] disabled:opacity-40 text-white/80 hover:text-white border border-white/10 transition-colors cursor-pointer"
                title="Zoom In (+)"
              >
                <ZoomIn className="w-4 h-4" />
              </button>

              <a
                href={selectedCert.image}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[#121212] hover:bg-[#202020] text-white/80 hover:text-white border border-white/10 transition-colors cursor-pointer"
                title="Open Original Image in New Tab"
              >
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={handleCloseModal}
                className="p-2 bg-[#1E0808] hover:bg-[#E10600] text-white border border-[#E10600]/40 transition-colors cursor-pointer ml-1"
                title="Close (Esc)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Lightbox Body (Certificate Image with Object Contain Fit) */}
          <div className="w-full max-w-6xl flex-1 overflow-auto flex items-center justify-center p-2 relative">
            <div className="relative max-h-full max-w-full flex items-center justify-center">
              {!failedImages[selectedCert.id] ? (
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  style={{
                    transform: `scale(${zoom})`,
                    transformOrigin: 'center center',
                  }}
                  className="max-h-[72vh] w-auto max-w-full object-contain rounded-none border border-white/15 shadow-[0_15px_60px_rgba(0,0,0,0.9)] transition-transform duration-200 select-none bg-[#080808]"
                  onError={() => handleImageError(selectedCert.id)}
                />
              ) : (
                <div className="max-w-xl mx-auto bg-[#0A0A0A] border-2 border-[#E10600]/50 p-8 text-center space-y-4 shadow-2xl">
                  <Award className="w-12 h-12 text-[#E10600] mx-auto" />
                  <div className="font-mono-tech text-xs text-[#E10600] font-bold uppercase tracking-widest">
                    OFFICIAL CREDENTIAL // {selectedCert.number}
                  </div>
                  <h4 className="font-display text-2xl font-bold text-white">
                    {selectedCert.title}
                  </h4>
                  {selectedCert.subtitle && (
                    <div className="text-sm font-editorial text-[#FF1717]">
                      {selectedCert.subtitle}
                    </div>
                  )}
                  <div className="text-sm text-[#A0A0A0] leading-relaxed">
                    {selectedCert.description}
                  </div>
                  <div className="p-3 bg-[#111111] border border-white/10 text-xs font-mono-tech text-[#888888] space-y-1 text-left">
                    <div>ISSUER: <span className="text-white font-bold">{selectedCert.issuer}</span></div>
                    <div>RECIPIENT: <span className="text-white font-bold">{selectedCert.recipient || 'SAKTHIPANDI M'}</span></div>
                    {selectedCert.date && <div>DATE: <span className="text-white">{selectedCert.date}</span></div>}
                    <div>ASSET PATH: <span className="text-[#FF1717]">public{selectedCert.image}</span></div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Lightbox Footer Bar */}
          <div className="w-full max-w-6xl pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono-tech text-[#888888]">
            <div className="flex items-center gap-3">
              <span className="text-[#E10600] font-bold">RECIPIENT:</span>
              <span className="text-white font-bold">{selectedCert.recipient || 'SAKTHIPANDI M'}</span>
              {selectedCert.date && (
                <>
                  <span className="text-white/20">•</span>
                  <span>{selectedCert.date}</span>
                </>
              )}
              {selectedCert.category && (
                <>
                  <span className="text-white/20">•</span>
                  <span className="text-[#B0B0B0]">{selectedCert.category}</span>
                </>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] text-[#666666] hidden sm:inline">Press Esc or click outside to exit</span>
              <button
                type="button"
                onClick={handleCloseModal}
                className="px-4 py-1.5 bg-[#141414] hover:bg-white hover:text-black text-white text-xs font-mono-tech uppercase tracking-wider transition-colors cursor-pointer"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
