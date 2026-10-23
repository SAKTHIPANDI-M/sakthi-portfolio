import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { ScrollReveal as FadeContainer } from '../ui/ScrollReveal';
import ScrollReveal from '../ScrollReveal';

export const ProcessSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const steps = PORTFOLIO_DATA.process;

  return (
    <section id="process" className="relative py-24 sm:py-32 bg-[#050505] border-b border-white/10">
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with FadeContainer */}
        <FadeContainer
          direction="up"
          distance={28}
          className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/10 pb-6 mb-16"
        >
          <div>
            <div className="text-xs sm:text-sm font-mono-tech text-[#E10600] font-bold tracking-widest uppercase mb-2">
              05 — PROCESS
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight">
              HOW I BUILD
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
            A disciplined engineering methodology translating data intuition into robust, verified machine learning models and production web architectures.
          </ScrollReveal>
        </FadeContainer>

        {/* Vertical Timeline with Large Red Numbers & Connecting Thin Line */}
        <div className="relative max-w-4xl mx-auto">
          
          {/* Continuous Vertical Thin Line */}
          <div className="absolute left-6 sm:left-12 top-6 bottom-6 w-[2px] bg-gradient-to-b from-[#E10600] via-[#E10600]/40 to-white/10" />

          <div className="space-y-12">
            {steps.map((item, idx) => {
              const isSelected = activeStep === idx;

              return (
                <FadeContainer
                  key={item.step}
                  direction="up"
                  distance={35}
                  delay={idx * 0.08}
                  className="relative pl-16 sm:pl-28 cursor-pointer transition-all duration-300 group"
                  onClick={() => setActiveStep(idx)}
                >
                  {/* Timeline Node & Large Red Number */}
                  <div className="absolute left-0 top-0 flex items-center justify-center">
                    <div
                      className={`w-12 sm:w-16 h-12 sm:h-16 bg-[#050505] border-2 flex items-center justify-center transition-all duration-300 ${
                        isSelected
                          ? 'border-[#E10600] scale-110 red-glow'
                          : 'border-white/20 group-hover:border-[#E10600]/50'
                      }`}
                    >
                      <span
                        className={`font-display font-black text-xl sm:text-2xl transition-colors ${
                          isSelected ? 'text-[#FF1717]' : 'text-[#E10600]'
                        }`}
                      >
                        {item.step}
                      </span>
                    </div>
                  </div>

                  {/* Step Card Content */}
                  <div
                    className={`p-6 sm:p-8 bg-[#070707] border transition-all duration-300 ${
                      isSelected
                        ? 'border-[#E10600] bg-[#120606] shadow-lg'
                        : 'border-white/10 group-hover:border-white/25'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3 mb-3">
                      <h3 className="font-display text-xl sm:text-2xl font-black text-white tracking-tight uppercase group-hover:text-[#FF1717] transition-colors">
                        {item.step} — {item.title}
                      </h3>
                      <span className="text-[10px] font-mono-tech text-[#777777] uppercase tracking-wider">
                        PHASE {idx + 1} OF 5
                      </span>
                    </div>

                    <p className="text-base text-white font-medium mb-2">
                      {item.summary}
                    </p>

                    <p className="text-sm text-[#999999] leading-relaxed">
                      {item.details}
                    </p>
                  </div>
                </FadeContainer>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
