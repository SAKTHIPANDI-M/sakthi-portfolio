import React, { useState, useEffect } from 'react';
import { Menu, X, Volume2, VolumeX } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { audioFeedback } from '../../utils/audioFeedback';

interface NavbarProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ soundEnabled, onToggleSound }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = ['home', 'about', 'skills', 'ai-workspace', 'projects', 'process', 'certifications', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'HOME', href: '#home', id: 'home' },
    { label: 'ABOUT', href: '#about', id: 'about' },
    { label: 'SKILLS', href: '#skills', id: 'skills' },
    { label: 'AI WORKSPACE', href: '#ai-workspace', id: 'ai-workspace' },
    { label: 'PROJECTS', href: '#projects', id: 'projects' },
    { label: 'PROCESS', href: '#process', id: 'process' },
    { label: 'CERTIFICATIONS', href: '#certifications', id: 'certifications' },
    { label: 'CONTACT', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (soundEnabled) {
      audioFeedback.playClick();
    }
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      window.history.pushState(null, '', `#${id}`);
      setActiveSection(id);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#050505]/95 backdrop-blur-md border-b border-white/10 py-3 shadow-lg'
          : 'bg-transparent py-4 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo (SAKTHI) */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, 'home')}
            className="group flex items-center gap-2 text-white transition-colors"
          >
            <span className="font-display font-black text-xl sm:text-2xl tracking-tighter">
              {PORTFOLIO_DATA.personal.shortName}
            </span>
            <span className="w-1.5 h-1.5 bg-[#E10600] inline-block transition-transform group-hover:scale-150" />
            <span className="text-[10px] font-mono-tech text-[#777777] hidden md:inline ml-1 uppercase">
              // AI DEV
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-7">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`text-xs font-mono-tech uppercase tracking-widest transition-all duration-200 relative py-1 whitespace-nowrap ${
                    isActive
                      ? 'text-white font-bold'
                      : 'text-[#B8B8B8] hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#E10600]" />
                  )}
                </a>
              );
            })}
          </div>

          {/* Right Status Indicator & Sound Toggle */}
          <div className="flex items-center gap-3">
            
            {/* Audio Feedback Toggle */}
            <button
              onClick={onToggleSound}
              className="p-1.5 text-[#777777] hover:text-white border border-white/10 bg-[#0A0A0A] hover:border-[#E10600]/40 transition-colors cursor-pointer"
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
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-[#0A0A0A] border border-white/10 text-xs font-mono-tech text-[#B8B8B8]">
              <span className="w-2 h-2 rounded-full bg-[#E10600] animate-pulse" />
              <span className="uppercase">{PORTFOLIO_DATA.personal.status}</span>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-[#B8B8B8] hover:text-white border border-white/10 bg-[#0A0A0A] cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#0A0A0A] border-b border-white/10 px-4 pt-4 pb-6 space-y-3">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => {
                handleNavClick(e, item.id);
                setIsMobileMenuOpen(false);
              }}
              className="block text-sm font-mono-tech uppercase tracking-wider py-2 text-[#B8B8B8] hover:text-white border-b border-white/5"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};
