import React from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { AboutCircularBadge } from '../visuals/AboutCircularBadge';
import { GraduationCap, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { ScrollReveal } from '../ui/ScrollReveal';

interface AboutSectionProps {
  onSocialClick?: (platform: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onSocialClick }) => {
  const p = PORTFOLIO_DATA.personal;
  const stats = PORTFOLIO_DATA.stats;
  const edu = PORTFOLIO_DATA.education;

  return (
    <section id="about" className="relative py-24 sm:py-32 bg-[#050505] border-b border-white/10">
      
      {/* Background Micro Grid */}
      <div className="absolute inset-0 opacity-15 pointer-events-none tech-grid-pattern" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with ScrollReveal */}
        <ScrollReveal
          direction="up"
          distance={28}
          className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/10 pb-6 mb-12 sm:mb-16"
        >
          <div>
            <div className="text-xs sm:text-sm font-mono-tech text-[#E10600] font-bold tracking-widest uppercase mb-2">
              01 — ABOUT
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight">
              WHO IS SAKTHI?
            </h2>
          </div>
          <div className="mt-4 sm:mt-0 text-xs font-mono-tech text-[#777777] uppercase tracking-wider">
            PORTFOLIO DOSSIER // PERS.ARCHIVE
          </div>
        </ScrollReveal>

        {/* Content Split: Text & Circular Illustrated Portrait (IMAGE 2) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: About Narrative & Mission (7 Cols) */}
          <ScrollReveal direction="up" distance={35} delay={0.1} className="lg:col-span-7 space-y-6">
            
            {/* Main Statement */}
            <div className="border-l-4 border-[#E10600] pl-5 py-1">
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                {p.aboutStatement}
              </h3>
            </div>

            {/* Description Paragraph */}
            <p className="text-base sm:text-lg text-[#B8B8B8] leading-relaxed font-normal">
              {p.aboutDescription}
            </p>

            <p className="text-sm text-[#888888] leading-relaxed">
              Based in Chennai, India, I specialize in combining algorithmic data processing with intuitive software interfaces. My academic focus centers on supervised learning, diagnostic feature extraction, and deploying machine learning models into accessible web applications.
            </p>

            {/* Key Focus Points */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono-tech">
              <div className="p-3 bg-[#050505] border border-white/10 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#E10600]" />
                <span className="text-[#E0E0E0]">B.Sc Computer Science with AI</span>
              </div>
              <div className="p-3 bg-[#050505] border border-white/10 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#E10600]" />
                <span className="text-[#E0E0E0]">Core Focus: Machine Learning & Python</span>
              </div>
            </div>

          </ScrollReveal>

          {/* Right Column: IMAGE 2 (Circular Illustrated Portrait with Integrated Socials) */}
          <ScrollReveal direction="up" distance={40} delay={0.2} className="lg:col-span-5 flex justify-center">
            <AboutCircularBadge onSocialClick={onSocialClick} />
          </ScrollReveal>

        </div>

        {/* Editorial Four Statistics Grid with Staggered Scroll Reveal */}
        <div className="mt-20 pt-12 border-t border-white/10">
          <ScrollReveal direction="up" distance={20} className="text-xs font-mono-tech text-[#777777] uppercase tracking-widest mb-6">
            VERIFIED ACADEMIC & TECHNICAL METRICS
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <ScrollReveal
                key={idx}
                direction="up"
                distance={30}
                delay={idx * 0.1}
                className="p-6 bg-[#060606] border border-white/10 relative group hover:border-[#E10600] transition-colors duration-300"
              >
                <div className="text-[10px] font-mono-tech text-[#777777] mb-2 flex items-center justify-between">
                  <span>METRIC 0{idx + 1}</span>
                  <span className="text-[#E10600] opacity-0 group-hover:opacity-100 transition-opacity">●</span>
                </div>
                
                <div className="font-display text-4xl sm:text-5xl font-black text-white group-hover:text-[#FF1717] transition-colors">
                  {stat.value}
                </div>

                <div className="font-mono-tech text-xs font-bold text-[#E10600] uppercase tracking-wider mt-2">
                  {stat.label}
                </div>

                <div className="text-[11px] text-[#777777] mt-1">
                  {stat.detail}
                </div>

                {/* Corner decorative notch */}
                <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-white/20 group-hover:border-[#E10600] transition-colors" />
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Education Timeline Section */}
        <div className="mt-20 pt-12 border-t border-white/10">
          <ScrollReveal direction="up" distance={20} className="flex items-center justify-between mb-8">
            <div className="text-xs font-mono-tech text-[#E10600] uppercase tracking-widest">
              ACADEMIC FOUNDATION
            </div>
            <div className="text-xs font-mono-tech text-[#777777]">
              EDUCATION // ACCREDITED
            </div>
          </ScrollReveal>

          {/* Education Editorial Block */}
          <ScrollReveal
            direction="up"
            distance={35}
            delay={0.1}
            className="p-8 bg-[#070707] border border-white/10 relative overflow-hidden group hover:border-[#E10600]/40 transition-colors"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              
              {/* Large Red Number "01" */}
              <div className="md:col-span-2">
                <span className="font-display font-black text-6xl sm:text-7xl text-[#E10600] block">
                  {edu.number}
                </span>
                <span className="text-[10px] font-mono-tech text-[#777777] uppercase tracking-wider">
                  PRIMARY DEGREE
                </span>
              </div>

              {/* Degree Title & Institution */}
              <div className="md:col-span-7 space-y-2">
                <h4 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {edu.degree}
                </h4>
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono-tech text-[#B8B8B8]">
                  <span className="flex items-center gap-1.5 text-white">
                    <GraduationCap className="w-4 h-4 text-[#E10600]" />
                    {edu.institution}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#E10600]" />
                    {edu.period}
                  </span>
                </div>

                {/* Highlights */}
                <div className="pt-3 space-y-1.5">
                  {edu.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-[#999999]">
                      <span className="text-[#E10600] font-bold">›</span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status Badge */}
              <div className="md:col-span-3 flex md:justify-end">
                <div className="px-4 py-2 bg-[#120606] border border-[#E10600]/50 text-xs font-mono-tech text-white text-center">
                  <div className="text-[10px] text-[#777777]">CURRENT STATUS</div>
                  <div className="font-bold text-[#FF1717] mt-0.5">PURSUING (2ND YEAR)</div>
                </div>
              </div>

            </div>
          </ScrollReveal>
        </div>

      </div>
    </section>
  );
};
