import React, { useState } from 'react';
import { Project } from './data/portfolioData';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { AIWorkspaceSection } from './components/sections/AIWorkspaceSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { ProcessSection } from './components/sections/ProcessSection';
import { LearningAndCertifications } from './components/sections/LearningAndCertifications';
import { ContactSection } from './components/sections/ContactSection';
import { ProjectDetailModal } from './components/projects/ProjectDetailModal';
import { CustomCursor } from './components/ui/CustomCursor';
import { audioFeedback } from './utils/audioFeedback';
import { ArrowUp } from 'lucide-react';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Monitor scroll for back-to-top button
  React.useEffect(() => {
    const checkScroll = () => {
      setShowScrollTop(window.scrollY > 600);
    };
    window.addEventListener('scroll', checkScroll, { passive: true });
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const handleToggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    audioFeedback.enabled = nextState;
    if (nextState) {
      audioFeedback.playClick(800, 0.05);
    }
  };

  const scrollToSection = (id: string) => {
    audioFeedback.playClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#FFFFFF] font-sans selection:bg-[#E10600] selection:text-white relative">
      
      {/* Custom Desktop Cursor */}
      <CustomCursor />

      {/* Sticky Minimal Navbar */}
      <Navbar
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
      />

      <main>
        {/* HERO SECTION with Permanent Original myimage1.jpeg & Oversized DEVELOPER Typography */}
        <HeroSection
          onExploreWork={() => scrollToSection('projects')}
          onConnect={() => scrollToSection('contact')}
        />

        {/* 01 — ABOUT SECTION with Permanent Original icon.png */}
        <AboutSection
          onSocialClick={() => scrollToSection('contact')}
        />

        {/* 02 — SKILLS SECTION with Dark Tech Grid */}
        <SkillsSection />

        {/* 03 — AI WORKSPACE with Permanent Original background.png */}
        <AIWorkspaceSection />

        {/* 04 — SELECTED PROJECTS with Editorial Cards */}
        <ProjectsSection
          onSelectProject={(project) => {
            audioFeedback.playClick(750, 0.04);
            setSelectedProject(project);
          }}
        />

        {/* 05 — PROCESS SECTION with Vertical Timeline */}
        <ProcessSection />

        {/* CURRENTLY LEARNING & CERTIFICATIONS SECTION */}
        <LearningAndCertifications />

        {/* SOCIALS, FINAL CTA ("LET'S BUILD SOMETHING GREAT"), CONTACT & FOOTER */}
        <ContactSection />
      </main>

      {/* Project Case Study / Interactive Simulation Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => {
          audioFeedback.playClick(500, 0.03);
          setSelectedProject(null);
        }}
      />

      {/* Floating Back to Top Button */}
      {showScrollTop && (
        <button
          onClick={() => {
            audioFeedback.playClick();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-30 p-3 bg-[#0E0E0E] hover:bg-[#E10600] text-white border border-white/20 hover:border-[#FF1717] transition-all duration-300 shadow-xl red-glow-subtle group cursor-pointer"
        >
          <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
        </button>
      )}

    </div>
  );
}
