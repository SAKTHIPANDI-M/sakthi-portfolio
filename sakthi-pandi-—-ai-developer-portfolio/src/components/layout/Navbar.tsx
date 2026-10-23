import React, { useState, useEffect } from 'react';
import { Menu, X, Volume2, VolumeX, Download } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { audioFeedback } from '../../utils/audioFeedback';
import PillNav from '../ui/PillNav';

interface NavbarProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ soundEnabled, onToggleSound }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState('#home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = [
        { id: 'home', href: '#home' },
        { id: 'about', href: '#about' },
        { id: 'skills', href: '#skills' },
        { id: 'ai-workspace', href: '#ai-workspace' },
        { id: 'projects', href: '#projects' },
        { id: 'process', href: '#process' },
        { id: 'certifications', href: '#certifications' },
        { id: 'contact', href: '#contact' },
      ];

      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250 && rect.bottom >= 150) {
            setActiveHref(section.href);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile/tablet menu when resized to desktop (>= 1280px)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close mobile/tablet menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navItems = [
    { label: 'HOME', href: '#home' },
    { label: 'ABOUT', href: '#about' },
    { label: 'SKILLS', href: '#skills' },
    { label: 'AI WORKSPACE', href: '#ai-workspace' },
    { label: 'PROJECTS', href: '#projects' },
    { label: 'PROCESS', href: '#process' },
    { label: 'CERTIFICATIONS', href: '#certifications' },
    { label: 'CONTACT', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    audioFeedback.playClick();
    setMobileMenuOpen(false);

    const targetId = href.replace('#', '');
    if (targetId === 'home') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      window.history.pushState(null, '', '#home');
      setActiveHref('#home');
      return;
    }

    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + (window.scrollY || window.pageYOffset) - headerOffset;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth',
      });
      window.history.pushState(null, '', href);
      setActiveHref(href);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || mobileMenuOpen
            ? 'bg-[#050505]/95 backdrop-blur-md border-b border-white/10 py-2.5 sm:py-3 shadow-2xl'
            : 'bg-transparent py-3 sm:py-4 border-b border-transparent'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center justify-between gap-3 sm:gap-4 lg:gap-6 w-full">
            
            {/* Logo at Top-Left (Always visible on Mobile, Tablet & Desktop) */}
            <div className="flex items-center gap-3 sm:gap-5 md:gap-6 lg:gap-7 min-w-0">
              <a
                href="#home"
                onClick={(e) => handleNavClick(e, '#home')}
                className="group flex items-center gap-2 text-white transition-colors flex-shrink-0"
                aria-label="Sakthi Portfolio Home"
              >
                <span className="font-display font-black text-xl sm:text-2xl tracking-tighter">
                  {PORTFOLIO_DATA.personal.shortName}
                </span>
                <span className="w-1.5 h-1.5 bg-[#E10600] inline-block transition-transform group-hover:scale-150 flex-shrink-0" />
                <span className="text-[10px] font-mono-tech text-[#777777] hidden sm:inline ml-0.5 uppercase tracking-wider flex-shrink-0">
                  // AI DEV
                </span>
              </a>

              {/* DESKTOP PillNav (VISIBLE ONLY ON DESKTOP 1280px+: hidden xl:flex) */}
              <div className="hidden xl:flex items-center">
                <PillNav
                  items={navItems}
                  activeHref={activeHref}
                  ease="power3.easeOut"
                  baseColor="#070707"
                  pillColor="#111111"
                  hoverCircleColor="#E10600"
                  hoveredPillTextColor="#ffffff"
                  pillTextColor="#B8B8B8"
                  onItemClick={handleNavClick}
                />
              </div>
            </div>

            {/* DESKTOP Right Controls: Sound Toggle, Resume Download & Availability Badge (VISIBLE ONLY ON DESKTOP 1280px+: hidden xl:flex) */}
            <div className="hidden xl:flex items-center gap-2.5 sm:gap-3 lg:gap-4 flex-shrink-0">
              {/* Resume Download Link */}
              <a
                href="/Sakthipandi_M_Resume.pdf"
                download="Sakthipandi_M_Resume.pdf"
                onClick={() => audioFeedback.playClick()}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0A0A0A] hover:bg-[#120606] border border-[#E10600]/30 hover:border-[#E10600] text-xs font-mono-tech text-white hover:text-[#FF1717] rounded-sm transition-all duration-200 hover:shadow-[0_0_15px_rgba(225,6,0,0.3)] cursor-pointer flex-shrink-0"
                title="Download Resume (PDF)"
                aria-label="Download Resume"
              >
                <Download className="w-3.5 h-3.5 text-[#E10600]" />
                <span className="uppercase tracking-wider font-semibold">RESUME</span>
              </a>

              {/* Audio Feedback Toggle */}
              <button
                type="button"
                onClick={onToggleSound}
                className="p-1.5 text-[#777777] hover:text-white border border-white/10 bg-[#0A0A0A] hover:border-[#E10600]/40 transition-colors cursor-pointer rounded-sm flex-shrink-0"
                title={soundEnabled ? 'Mute sound effects' : 'Enable audio feedback'}
                aria-label="Toggle audio feedback"
              >
                {soundEnabled ? (
                  <Volume2 className="w-3.5 h-3.5 text-[#E10600]" />
                ) : (
                  <VolumeX className="w-3.5 h-3.5" />
                )}
              </button>

              {/* Availability Badge */}
              <div className="flex items-center gap-2 px-3 py-1.5 bg-[#0A0A0A] border border-white/10 text-xs font-mono-tech text-[#B8B8B8] rounded-sm whitespace-nowrap shadow-sm flex-shrink-0">
                <span className="w-2 h-2 rounded-full bg-[#E10600] animate-pulse flex-shrink-0" />
                <span className="uppercase tracking-wider font-medium">{PORTFOLIO_DATA.personal.status}</span>
              </div>
            </div>

            {/* MOBILE & TABLET HAMBURGER BUTTON (VISIBLE ONLY ON MOBILE & TABLET < 1280px: xl:hidden) */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                audioFeedback.playClick();
                setMobileMenuOpen((prev) => !prev);
              }}
              className={`xl:hidden flex items-center justify-center w-10 h-10 bg-[#0A0A0A] border transition-all cursor-pointer rounded-sm shadow-md select-none touch-manipulation z-50 ${
                mobileMenuOpen
                  ? 'border-[#E10600] text-[#E10600] shadow-[0_0_12px_rgba(225,6,0,0.25)]'
                  : 'border-white/15 hover:border-[#E10600]/60 text-white'
              }`}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-[#E10600]" />
              ) : (
                <Menu className="w-5 h-5 text-white" />
              )}
            </button>

          </div>

          {/* COMPACT FLOATING DROPDOWN MENU FOR MOBILE & TABLET (< 1280px) */}
          <div
            className={`xl:hidden absolute top-[calc(100%+10px)] right-4 sm:right-6 lg:right-8 w-[270px] sm:w-[290px] max-w-[calc(100vw-32px)] bg-[#0A0A0A]/98 backdrop-blur-xl border border-white/10 hover:border-white/15 rounded-sm shadow-2xl shadow-black/95 transition-all duration-200 origin-top-right z-40 overflow-hidden ${
              mobileMenuOpen
                ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
            }`}
          >
            {/* Header label */}
            <div className="px-3.5 py-2.5 bg-[#0e0e0e] border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[10px] font-mono-tech text-[#888888] tracking-widest uppercase">
                <span className="w-1.5 h-1.5 bg-[#E10600] rounded-none inline-block animate-pulse" />
                <span>NAVIGATION</span>
              </div>
              <span className="text-[9px] font-mono-tech text-[#555555] uppercase">8 ITEMS</span>
            </div>

            {/* Scrollable list of links (max height approx 60-65vh) */}
            <nav
              className="p-1.5 space-y-1 max-h-[58vh] overflow-y-auto overscroll-contain"
              role="menu"
              aria-label="Mobile and tablet navigation"
            >
              {navItems.map((item, index) => {
                const isActive = activeHref === item.href;
                const num = String(index + 1).padStart(2, '0');
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`group flex items-center justify-between px-3 py-2 rounded-sm border transition-all text-[11px] sm:text-xs font-mono-tech tracking-wider uppercase ${
                      isActive
                        ? 'bg-[#180707] border-[#E10600]/60 text-white font-bold shadow-[inset_0_0_8px_rgba(225,6,0,0.15)]'
                        : 'bg-transparent border-transparent text-[#999999] hover:text-white hover:bg-[#141414] hover:border-white/5'
                    }`}
                    role="menuitem"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={`text-[10px] font-bold ${isActive ? 'text-[#E10600]' : 'text-[#555555] group-hover:text-[#E10600]'}`}>
                        {num}
                      </span>
                      <span className="tracking-wider">{item.label}</span>
                    </div>
                    <span
                      className={`text-xs transition-transform group-hover:translate-x-1 ${
                        isActive ? 'text-[#E10600] font-bold' : 'text-[#444444] group-hover:text-[#888888]'
                      }`}
                    >
                      →
                    </span>
                  </a>
                );
              })}
            </nav>

            {/* Compact Footer: Audio Toggle & Internship Badge */}
            <div className="p-2.5 bg-[#0e0e0e]/90 border-t border-white/5 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[9.5px] font-mono-tech text-[#666666] uppercase tracking-wider">
                  SOUND FX
                </span>
                <button
                  type="button"
                  onClick={() => {
                    audioFeedback.playClick();
                    onToggleSound();
                  }}
                  className="flex items-center gap-1.5 px-2 py-1 bg-[#141414] border border-white/10 hover:border-[#E10600]/50 rounded-sm text-[10px] font-mono-tech text-[#B8B8B8] hover:text-white transition-colors cursor-pointer"
                >
                  {soundEnabled ? (
                    <>
                      <Volume2 className="w-3 h-3 text-[#E10600]" />
                      <span className="text-[#E10600] font-medium">ON</span>
                    </>
                  ) : (
                    <>
                      <VolumeX className="w-3 h-3 text-[#666666]" />
                      <span>MUTED</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 py-1.5 px-2 bg-[#120606] border border-[#E10600]/30 rounded-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E10600] animate-pulse flex-shrink-0" />
                <span className="text-[9.5px] font-mono-tech text-[#E0E0E0] uppercase tracking-wider font-medium truncate">
                  {PORTFOLIO_DATA.personal.status}
                </span>
              </div>

              {/* Mobile Resume Download Button */}
              <a
                href="/Sakthipandi_M_Resume.pdf"
                download="Sakthipandi_M_Resume.pdf"
                onClick={() => {
                  audioFeedback.playClick();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 py-2 px-3 bg-[#110505] hover:bg-[#1f0707] border border-[#E10600]/40 hover:border-[#E10600] rounded-sm text-xs font-mono-tech text-white hover:text-[#FF1717] transition-all cursor-pointer shadow-sm w-full"
                aria-label="Download Sakthipandi M Resume PDF"
              >
                <Download className="w-3.5 h-3.5 text-[#E10600]" />
                <span className="font-bold tracking-wider uppercase">DOWNLOAD RESUME</span>
              </a>
            </div>

          </div>

        </div>
      </header>

      {/* CLICK-OUTSIDE BACKDROP FOR MOBILE & TABLET DROPDOWN */}
      {mobileMenuOpen && (
        <div
          className="xl:hidden fixed inset-0 z-30 bg-black/40 backdrop-blur-[1px] transition-opacity duration-200"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Navbar;
