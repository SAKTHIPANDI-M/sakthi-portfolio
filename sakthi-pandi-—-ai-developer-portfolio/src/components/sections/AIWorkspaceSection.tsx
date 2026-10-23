import React from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { AIWorkspaceVisual } from '../visuals/AIWorkspaceVisual';
import { ScrollReveal as FadeContainer } from '../ui/ScrollReveal';
import ScrollReveal from '../ScrollReveal';

export const AIWorkspaceSection: React.FC = () => {
  const ws = PORTFOLIO_DATA.aiWorkspace;

  return (
    <section id="ai-workspace" className="relative py-24 sm:py-32 bg-[#050505] border-b border-white/10">
      
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-[#E10600]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with FadeContainer */}
        <FadeContainer
          direction="up"
          distance={28}
          className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/10 pb-6 mb-12 sm:mb-16"
        >
          <div>
            <div className="text-xs sm:text-sm font-mono-tech text-[#E10600] font-bold tracking-widest uppercase mb-2">
              {ws.label}
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight">
              {ws.heading}
            </h2>
          </div>

          <ScrollReveal
            baseOpacity={0.1}
            enableBlur={true}
            baseRotation={2}
            blurStrength={4}
            rotationEnd="bottom bottom"
            wordAnimationEnd="bottom bottom"
            containerClassName="mt-4 sm:mt-0 max-w-md"
            textClassName="text-sm text-[#B8B8B8] leading-relaxed"
          >
            {ws.description}
          </ScrollReveal>
        </FadeContainer>

        {/* Visually Dominant Centerpiece with FadeContainer */}
        <FadeContainer direction="up" distance={35} delay={0.15} className="w-full">
          <AIWorkspaceVisual />
        </FadeContainer>

        {/* Micro-Summary row below the console with Staggered FadeContainer */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono-tech">
          <FadeContainer direction="up" distance={25} delay={0.1} className="p-4 bg-[#0A0A0A] border border-white/10 flex items-center gap-3">
            <span className="text-[#E10600] font-bold text-base">01</span>
            <div>
              <div className="text-white font-bold">ACCELERATED SYNTHESIS</div>
              <div className="text-[#777777] text-[11px] mt-0.5">Rapid exploration of algorithmic approaches and edge cases</div>
            </div>
          </FadeContainer>

          <FadeContainer direction="up" distance={25} delay={0.2} className="p-4 bg-[#0A0A0A] border border-white/10 flex items-center gap-3">
            <span className="text-[#E10600] font-bold text-base">02</span>
            <div>
              <div className="text-white font-bold">AGENTIC REFACTORING</div>
              <div className="text-[#777777] text-[11px] mt-0.5">Automated code reviews, type safety, and test scenarios</div>
            </div>
          </FadeContainer>

          <FadeContainer direction="up" distance={25} delay={0.3} className="p-4 bg-[#0A0A0A] border border-white/10 flex items-center gap-3">
            <span className="text-[#E10600] font-bold text-base">03</span>
            <div>
              <div className="text-white font-bold">MULTIMODAL INTELLIGENCE</div>
              <div className="text-[#777777] text-[11px] mt-0.5">Extracting structured insights from varied data formats</div>
            </div>
          </FadeContainer>
        </div>

      </div>
    </section>
  );
};
