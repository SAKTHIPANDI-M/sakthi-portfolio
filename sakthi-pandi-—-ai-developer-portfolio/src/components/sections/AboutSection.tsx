import React from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { AboutCircularBadge } from '../visuals/AboutCircularBadge';
import { GraduationCap, Calendar, Briefcase, MapPin, CheckCircle2, Globe, Sparkles } from 'lucide-react';
import { ScrollReveal as FadeContainer } from '../ui/ScrollReveal';
import ScrollReveal from '../ScrollReveal';

interface AboutSectionProps {
  onSocialClick?: (platform: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onSocialClick }) => {
  const p = PORTFOLIO_DATA.personal;
  const stats = PORTFOLIO_DATA.stats;
  const experiences = PORTFOLIO_DATA.experience;
  const educationList = PORTFOLIO_DATA.education;
  const personalSkills = PORTFOLIO_DATA.personalSkills;
  const languages = PORTFOLIO_DATA.languages;

  return (
    <section id="about" className="relative py-24 sm:py-32 bg-[#050505] border-b border-white/10">
      
      {/* Background Micro Grid */}
      <div className="absolute inset-0 opacity-15 pointer-events-none tech-grid-pattern" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with FadeContainer */}
        <FadeContainer
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
        </FadeContainer>

        {/* Content Split: Text & Circular Illustrated Portrait */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: About Narrative & Mission (7 Cols) */}
          <FadeContainer direction="up" distance={35} delay={0.1} className="lg:col-span-7 space-y-6">
            
            {/* Main Statement */}
            <div className="border-l-4 border-[#E10600] pl-5 py-1">
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                {p.aboutStatement}
              </h3>
            </div>

            {/* Description Paragraph with React Bits ScrollReveal */}
            <ScrollReveal
              baseOpacity={0.1}
              enableBlur={true}
              baseRotation={2}
              blurStrength={4}
              rotationEnd="bottom bottom"
              wordAnimationEnd="bottom bottom"
              textClassName="text-base sm:text-lg text-[#B8B8B8] leading-relaxed font-normal"
            >
              {p.aboutDescription}
            </ScrollReveal>

            {/* Career Objective from Resume */}
            <div className="p-4 bg-[#090909] border border-white/10 text-xs font-mono-tech space-y-2">
              <div className="text-[10px] text-[#E10600] font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                CAREER OBJECTIVE
              </div>
              <p className="text-[#C0C0C0] leading-relaxed font-sans text-sm">
                "{p.careerObjective}"
              </p>
            </div>

            {/* Key Focus Points */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono-tech">
              <div className="p-3 bg-[#050505] border border-white/10 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#E10600]" />
                <span className="text-[#E0E0E0]">B.Sc CS with AI • 3rd Year (CGPA 8.3)</span>
              </div>
              <div className="p-3 bg-[#050505] border border-white/10 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#E10600]" />
                <span className="text-[#E0E0E0]">AI Developer Intern @ Approtech R&D</span>
              </div>
            </div>

          </FadeContainer>

          {/* Right Column: Circular Illustrated Portrait with Integrated Socials */}
          <FadeContainer direction="up" distance={40} delay={0.2} className="lg:col-span-5 flex justify-center">
            <AboutCircularBadge onSocialClick={onSocialClick} />
          </FadeContainer>

        </div>

        {/* Editorial Four Statistics Grid */}
        <div className="mt-20 pt-12 border-t border-white/10">
          <FadeContainer direction="up" distance={20} className="text-xs font-mono-tech text-[#777777] uppercase tracking-widest mb-6">
            VERIFIED ACADEMIC & TECHNICAL METRICS
          </FadeContainer>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 min-w-0">
            {stats.map((stat, idx) => {
              const isPython = stat.value === 'PYTHON';
              const isMediumWord = stat.value.length === 4;

              return (
                <FadeContainer
                  key={idx}
                  direction="up"
                  distance={30}
                  delay={idx * 0.1}
                  className="p-5 sm:p-6 bg-[#060606] border border-white/10 relative group hover:border-[#E10600] transition-colors duration-300 min-w-0 max-w-full flex flex-col justify-between"
                >
                  <div className="min-w-0">
                    <div className="text-[10px] font-mono-tech text-[#777777] mb-2 sm:mb-3 flex items-center justify-between min-w-0">
                      <span>METRIC 0{idx + 1}</span>
                      <span className="text-[#E10600] opacity-0 group-hover:opacity-100 transition-opacity">●</span>
                    </div>
                    
                    <div
                      className={`font-display font-black text-white group-hover:text-[#FF1717] transition-colors leading-none tracking-tight min-w-0 ${
                        isPython ? 'whitespace-nowrap' : 'break-words'
                      }`}
                      style={{
                        fontSize: isPython
                          ? 'clamp(1.3rem, 1.85vw, 1.85rem)'
                          : isMediumWord
                          ? 'clamp(1.75rem, 3.2vw, 2.85rem)'
                          : 'clamp(2.1rem, 3.8vw, 3.25rem)',
                      }}
                    >
                      {stat.value}
                    </div>

                    <div className="font-mono-tech text-[11px] sm:text-xs font-bold text-[#E10600] uppercase tracking-wider mt-2.5 sm:mt-3 break-words min-w-0 leading-snug">
                      {stat.label}
                    </div>

                    <div className="text-[11px] text-[#777777] mt-1 sm:mt-1.5 leading-relaxed break-words min-w-0">
                      {stat.detail}
                    </div>
                  </div>

                  {/* Corner decorative notch */}
                  <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-white/20 group-hover:border-[#E10600] transition-colors pointer-events-none" />
                </FadeContainer>
              );
            })}
          </div>
        </div>

        {/* WORK EXPERIENCE SECTION (from Resume) */}
        <div className="mt-20 pt-12 border-t border-white/10">
          <FadeContainer direction="up" distance={20} className="flex items-center justify-between mb-8">
            <div className="text-xs font-mono-tech text-[#E10600] uppercase tracking-widest">
              PROFESSIONAL EXPERIENCE
            </div>
            <div className="text-xs font-mono-tech text-[#777777]">
              WORK HISTORY // VERIFIED
            </div>
          </FadeContainer>

          <div className="space-y-6">
            {experiences.map((exp, idx) => (
              <FadeContainer
                key={idx}
                direction="up"
                distance={30}
                delay={0.1}
                className="p-6 sm:p-8 bg-[#070707] border border-white/10 relative overflow-hidden group hover:border-[#E10600]/40 transition-colors"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  {/* Number */}
                  <div className="md:col-span-2">
                    <span className="font-display font-black text-5xl sm:text-6xl text-[#E10600] block">
                      {exp.number}
                    </span>
                    <span className="text-[10px] font-mono-tech text-[#777777] uppercase tracking-wider">
                      INTERNSHIP
                    </span>
                  </div>

                  {/* Role, Company, Period */}
                  <div className="md:col-span-7 space-y-2">
                    <h4 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      {exp.role}
                    </h4>
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-mono-tech text-[#B8B8B8]">
                      <span className="flex items-center gap-1.5 text-white font-bold">
                        <Briefcase className="w-4 h-4 text-[#E10600]" />
                        {exp.company}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#E10600]" />
                        {exp.period}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#777777]" />
                        {exp.location}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-[#A0A0A0] leading-relaxed pt-1">
                      {exp.description}
                    </p>

                    {/* Highlights */}
                    <div className="pt-2 space-y-1.5">
                      {exp.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-[#888888]">
                          <span className="text-[#E10600] font-bold">›</span>
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Badge */}
                  <div className="md:col-span-3 flex md:justify-end">
                    <div className="px-4 py-2 bg-[#120606] border border-[#E10600]/50 text-xs font-mono-tech text-white text-center">
                      <div className="text-[10px] text-[#777777]">EXPERIENCE STATUS</div>
                      <div className="font-bold text-[#FF1717] mt-0.5">{exp.badge}</div>
                    </div>
                  </div>
                </div>
              </FadeContainer>
            ))}
          </div>
        </div>

        {/* Education Timeline Section */}
        <div className="mt-20 pt-12 border-t border-white/10">
          <FadeContainer direction="up" distance={20} className="flex items-center justify-between mb-8">
            <div className="text-xs font-mono-tech text-[#E10600] uppercase tracking-widest">
              ACADEMIC FOUNDATION
            </div>
            <div className="text-xs font-mono-tech text-[#777777]">
              EDUCATION // ACCREDITED
            </div>
          </FadeContainer>

          <div className="space-y-6">
            {educationList.map((edu, idx) => (
              <FadeContainer
                key={idx}
                direction="up"
                distance={35}
                delay={idx * 0.1}
                className="p-6 sm:p-8 bg-[#070707] border border-white/10 relative overflow-hidden group hover:border-[#E10600]/40 transition-colors"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  
                  {/* Large Red Number */}
                  <div className="md:col-span-2">
                    <span className="font-display font-black text-5xl sm:text-6xl text-[#E10600] block">
                      {edu.number}
                    </span>
                    <span className="text-[10px] font-mono-tech text-[#777777] uppercase tracking-wider">
                      {idx === 0 ? 'DEGREE' : 'SECONDARY'}
                    </span>
                  </div>

                  {/* Degree Title & Institution */}
                  <div className="md:col-span-7 space-y-2">
                    <h4 className="font-display text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                      {edu.degree}
                    </h4>
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-mono-tech text-[#B8B8B8]">
                      <span className="flex items-center gap-1.5 text-white">
                        <GraduationCap className="w-4 h-4 text-[#E10600]" />
                        {edu.institution}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#E10600]" />
                        {edu.period}
                      </span>
                      <span>•</span>
                      <span className="text-[#FF1717] font-bold font-mono-tech">
                        {edu.score}
                      </span>
                    </div>

                    {/* Highlights */}
                    <div className="pt-2 space-y-1.5">
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
                      <div className="text-[10px] text-[#777777]">ACADEMIC STATUS</div>
                      <div className="font-bold text-[#FF1717] mt-0.5">{edu.statusBadge}</div>
                    </div>
                  </div>

                </div>
              </FadeContainer>
            ))}
          </div>
        </div>

        {/* PERSONAL SKILLS & SPOKEN LANGUAGES (from Resume) */}
        <div className="mt-20 pt-12 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Personal Skills (7 Cols) */}
            <FadeContainer direction="up" distance={25} className="md:col-span-7 space-y-4">
              <div className="text-xs font-mono-tech text-[#E10600] uppercase tracking-widest">
                PERSONAL & PROFESSIONAL ATTRIBUTES
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {personalSkills.map((ps, i) => (
                  <div key={i} className="p-4 bg-[#080808] border border-white/10 group hover:border-[#E10600]/40 transition-colors">
                    <div className="flex items-center gap-2 text-white font-display font-bold text-sm">
                      <CheckCircle2 className="w-4 h-4 text-[#E10600]" />
                      <span>{ps.name}</span>
                    </div>
                    <p className="text-[11px] text-[#888888] mt-1.5 leading-relaxed">
                      {ps.desc}
                    </p>
                  </div>
                ))}
              </div>
            </FadeContainer>

            {/* Languages (5 Cols) */}
            <FadeContainer direction="up" distance={25} delay={0.1} className="md:col-span-5 space-y-4">
              <div className="text-xs font-mono-tech text-[#E10600] uppercase tracking-widest flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" />
                <span>LANGUAGES KNOWN</span>
              </div>
              <div className="space-y-3">
                {languages.map((lang, i) => (
                  <div key={i} className="p-4 bg-[#080808] border border-white/10 flex items-center justify-between">
                    <div>
                      <div className="font-display font-bold text-base text-white">{lang.language}</div>
                      <div className="text-[11px] font-mono-tech text-[#777777]">{lang.proficiency}</div>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-[#E10600]" />
                  </div>
                ))}
              </div>
            </FadeContainer>

          </div>
        </div>

      </div>
    </section>
  );
};
