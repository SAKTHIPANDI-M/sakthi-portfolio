import React, { useState } from 'react';
import { Github, Linkedin, ExternalLink } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import permanentIcon from '../../assets/icon.png';

interface AboutCircularBadgeProps {
  className?: string;
  onSocialClick?: (platform: string) => void;
}

export const AboutCircularBadge: React.FC<AboutCircularBadgeProps> = ({
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const socials = [
    {
      id: 'github',
      name: 'GitHub',
      icon: Github,
      url: PORTFOLIO_DATA.personal.github,
      handle: 'SAKTHIPANDI-M',
      color: 'hover:border-[#E10600] hover:text-[#FF1717]',
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: Linkedin,
      url: PORTFOLIO_DATA.personal.linkedin,
      handle: 'sakthi-pandi-1411h',
      color: 'hover:border-[#E10600] hover:text-[#FF1717]',
    },
  ];

  return (
    <div
      className={`relative flex flex-col items-center justify-center select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 
        Outer Circular Container:
        - Adjusted vertical focus (object-[center_37%]) and calibrated scale
        - Eliminates the bottom crescent blank space completely
      */}
      <div
        className={`relative w-72 h-72 sm:w-84 sm:h-84 md:w-96 md:h-96 aspect-square rounded-full transition-all duration-700 ${
          isHovered ? 'scale-[1.03] red-glow' : ''
        }`}
      >
        {/* Animated Cybernetic Dashed Border */}
        <div
          className="absolute -inset-1.5 rounded-full border-2 border-dashed border-[#E10600]/40 transition-transform duration-1000 pointer-events-none"
          style={{
            transform: isHovered ? 'rotate(45deg)' : 'rotate(0deg)',
          }}
        />

        {/* Circular Frame permanently fitted edge-to-edge by icon image */}
        <div
          className="relative w-full h-full rounded-full overflow-hidden bg-[#0A0A0A] border-2 border-white/20 hover:border-[#E10600] shadow-2xl flex items-center justify-center transition-all duration-500"
        >
          <img
            src={permanentIcon}
            alt="Sakthi Pandi — Personal Branding"
            className="w-full h-full object-cover object-[center_42.8%] scale-[1.04] transition-transform duration-700 group-hover:scale-[1.08]"
            loading="eager"
            decoding="async"
          />
        </div>
      </div>

      {/* Real Social Links with Direct URLs */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        {socials.map((soc) => {
          const Icon = soc.icon;

          return (
            <a
              key={soc.id}
              href={soc.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group/soc flex items-center gap-2 px-4 py-2.5 bg-[#0E0E0E] border border-white/10 transition-all duration-300 ${soc.color} hover:border-[#E10600] hover:bg-[#1A0A0A] hover:-translate-y-1 red-glow-subtle`}
              title={`${soc.name} Profile (${soc.handle})`}
            >
              <Icon className="w-4 h-4 text-white group-hover/soc:text-[#FF1717] transition-colors" />
              <span className="text-xs font-mono-tech uppercase tracking-wider text-[#B8B8B8] group-hover/soc:text-white">
                {soc.name}
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-white/30 group-hover/soc:text-[#E10600] transition-colors" />
            </a>
          );
        })}
      </div>

      <div className="mt-3 text-[11px] font-mono-tech text-[#777777] flex items-center gap-2">
        <span className="text-[#E10600]">●</span>
        <span>GITHUB: SAKTHIPANDI-M // LINKEDIN: SAKTHI-PANDI-1411H</span>
      </div>
    </div>
  );
};
