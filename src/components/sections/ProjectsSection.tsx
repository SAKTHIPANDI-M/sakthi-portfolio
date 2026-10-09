import React, { useState } from 'react';
import { PORTFOLIO_DATA, Project } from '../../data/portfolioData';
import { ArrowRight, ArrowUpRight, Github, Activity, Trophy, Database, Play } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);
  const projects = PORTFOLIO_DATA.projects;

  return (
    <section id="projects" className="relative py-24 sm:py-32 bg-[#050505] border-b border-white/10">
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-15 pointer-events-none tech-grid-pattern" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with ScrollReveal */}
        <ScrollReveal
          direction="up"
          distance={28}
          className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/10 pb-6 mb-16"
        >
          <div>
            <div className="text-xs sm:text-sm font-mono-tech text-[#E10600] font-bold tracking-widest uppercase mb-2">
              04 — SELECTED PROJECTS
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight">
              THINGS I'VE BUILT
            </h2>
          </div>
          <div className="mt-4 sm:mt-0 text-xs font-mono-tech text-[#777777] uppercase tracking-wider">
            FEATURED WORKS // CASE STUDIES & CODE
          </div>
        </ScrollReveal>

        {/* Editorial Project Blocks (Stacked Large Layout with ScrollReveal) */}
        <div className="space-y-12 sm:space-y-16">
          {projects.map((project, idx) => {
            const isHovered = hoveredProjectId === project.id;

            return (
              <ScrollReveal
                key={project.id}
                direction="up"
                distance={40}
                delay={0.1}
                className={`relative bg-[#0A0A0A] border transition-all duration-500 overflow-hidden group ${
                  isHovered
                    ? 'border-[#E10600] shadow-[0_15px_60px_-15px_rgba(225,6,0,0.3)]'
                    : 'border-white/10 hover:border-white/25'
                }`}
                onMouseEnter={() => setHoveredProjectId(project.id)}
                onMouseLeave={() => setHoveredProjectId(null)}
              >
                {/* Subtle red tint overlay on hover */}
                <div
                  className={`absolute inset-0 bg-[#E10600]/[0.02] pointer-events-none transition-opacity duration-500 ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                  }`}
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
                  
                  {/* Left Column: Project Editorial Spec & Actions (7 Cols) */}
                  <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
                    <div>
                      {/* Top Row: Project Number & Category */}
                      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                        <div className="flex items-center gap-3">
                          <span
                            className={`font-display font-black text-3xl sm:text-4xl transition-colors duration-300 ${
                              isHovered ? 'text-[#FF1717] red-text-glow' : 'text-[#E10600]'
                            }`}
                          >
                            {project.number}
                          </span>
                          <span className="h-4 w-[1px] bg-white/20" />
                          <span className="text-xs font-mono-tech uppercase tracking-widest text-[#B8B8B8]">
                            {project.category}
                          </span>
                        </div>

                        <span className="text-xs font-mono-tech text-[#777777] hidden sm:inline">
                          PROJECT 0{idx + 1} OF 03
                        </span>
                      </div>

                      {/* Project Title (Oversized Editorial Heading) */}
                      <h3
                        onClick={() => onSelectProject(project)}
                        className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight cursor-pointer group-hover:text-white transition-colors"
                      >
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p
                        className={`text-sm sm:text-base leading-relaxed mt-4 transition-colors duration-300 ${
                          isHovered ? 'text-white' : 'text-[#A0A0A0]'
                        }`}
                      >
                        {project.shortDesc}
                      </p>

                      {/* Tech Tags */}
                      <div className="flex flex-wrap items-center gap-2 mt-6">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 bg-[#141414] border border-white/10 text-xs font-mono-tech text-[#D4D4D4] group-hover:border-[#E10600]/30 transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Highlights */}
                      <div className="mt-6 space-y-2 text-xs text-[#888888]">
                        {project.highlights.slice(0, 2).map((h, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <span className="text-[#E10600] font-bold">›</span>
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-4">
                      <button
                        onClick={() => onSelectProject(project)}
                        className="group/btn inline-flex items-center gap-2.5 px-6 py-3 bg-[#E10600] hover:bg-[#FF1717] text-white text-xs font-mono-tech font-bold uppercase tracking-wider transition-all duration-300 red-glow-subtle cursor-pointer"
                      >
                        <span>VIEW PROJECT</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                      </button>

                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/git inline-flex items-center gap-2 px-5 py-3 bg-[#111111] hover:bg-white hover:text-black text-white text-xs font-mono-tech uppercase tracking-wider border border-white/15 transition-all duration-300"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>GITHUB</span>
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/git:translate-x-0.5 group-hover/git:-translate-y-0.5" />
                      </a>

                      <button
                        onClick={() => onSelectProject(project)}
                        className="inline-flex items-center gap-1.5 text-xs font-mono-tech text-[#888888] hover:text-[#FF1717] transition-colors ml-auto cursor-pointer"
                      >
                        <Play className="w-3 h-3 text-[#E10600]" />
                        <span>RUN SIMULATOR</span>
                      </button>
                    </div>

                  </div>

                  {/* Right Column: High-Tech Project Schematic / Visual Artwork (5 Cols) */}
                  <div
                    onClick={() => onSelectProject(project)}
                    className="lg:col-span-5 bg-[#070707] border-t lg:border-t-0 lg:border-l border-white/10 p-6 sm:p-8 flex flex-col justify-center items-center cursor-pointer relative overflow-hidden"
                  >
                    {/* Visual Schematic Component */}
                    <div
                      className={`w-full transition-transform duration-700 ${
                        isHovered ? 'scale-[1.03]' : 'scale-100'
                      }`}
                    >
                      <ProjectSchematicVisual projectId={project.id} />
                    </div>

                    {/* Corner Tag */}
                    <div className="absolute bottom-3 right-4 text-[10px] font-mono-tech text-[#777777] flex items-center gap-1">
                      <span>CLICK TO INSPECT CASE STUDY</span>
                      <span className="text-[#E10600]">↗</span>
                    </div>
                  </div>

                </div>

              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
};

/* Bespoke SVG Schematics for each project */
const ProjectSchematicVisual: React.FC<{ projectId: string }> = ({ projectId }) => {
  if (projectId === 'heart-disease-prediction') {
    return (
      <div className="w-full aspect-[4/3] bg-[#0A0A0A] border border-white/10 p-4 flex flex-col justify-between relative overflow-hidden">
        <div className="flex items-center justify-between text-[10px] font-mono-tech text-[#777777] border-b border-white/10 pb-2">
          <span className="text-[#E10600] flex items-center gap-1">
            <Activity className="w-3 h-3" /> ECG_TELEMETRY // CH-01
          </span>
          <span>BPM: 74 [STABLE]</span>
        </div>

        {/* Animated Heartbeat Wave SVG */}
        <div className="my-auto py-2">
          <svg viewBox="0 0 300 80" className="w-full h-20 text-[#E10600]">
            <path
              d="M 0,40 L 40,40 L 50,40 L 55,20 L 60,60 L 65,10 L 70,75 L 75,35 L 80,45 L 85,40 L 140,40 L 145,20 L 150,60 L 155,10 L 160,75 L 165,35 L 170,45 L 175,40 L 230,40 L 235,20 L 240,60 L 245,10 L 250,75 L 255,35 L 260,40 L 300,40"
              fill="none"
              stroke="#E10600"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono-tech border-t border-white/10 pt-2 text-[#999999]">
          <div>ACC: <span className="text-white">86.4%</span></div>
          <div>ROC-AUC: <span className="text-white">0.91</span></div>
          <div>INFER: <span className="text-[#E10600]">&lt;80ms</span></div>
        </div>
      </div>
    );
  }

  if (projectId === 'fifa-2026-predictor') {
    return (
      <div className="w-full aspect-[4/3] bg-[#0A0A0A] border border-white/10 p-4 flex flex-col justify-between relative overflow-hidden">
        <div className="flex items-center justify-between text-[10px] font-mono-tech text-[#777777] border-b border-white/10 pb-2">
          <span className="text-[#E10600] flex items-center gap-1">
            <Trophy className="w-3 h-3" /> FIFA_2026 // MONTE_CARLO
          </span>
          <span>48 NATIONS</span>
        </div>

        {/* Pitch Graphic & Probability Matrix */}
        <div className="my-auto py-2 flex items-center justify-center">
          <div className="w-full max-w-[240px] aspect-[16/9] border border-white/20 relative flex items-center justify-center bg-[#071007]/50">
            {/* Center circle */}
            <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[#E10600]" />
            </div>
            {/* Half line */}
            <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-white/20" />
            {/* Penalty boxes */}
            <div className="absolute left-0 top-3 bottom-3 w-8 border-r border-y border-white/20" />
            <div className="absolute right-0 top-3 bottom-3 w-8 border-l border-y border-white/20" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono-tech border-t border-white/10 pt-2 text-[#999999]">
          <div>ELO: <span className="text-white">UPDATED</span></div>
          <div>RUNS: <span className="text-white">1,000</span></div>
          <div>STREAMLIT: <span className="text-[#E10600]">LIVE</span></div>
        </div>
      </div>
    );
  }

  // Student Management System
  return (
    <div className="w-full aspect-[4/3] bg-[#0A0A0A] border border-white/10 p-4 flex flex-col justify-between relative overflow-hidden">
      <div className="flex items-center justify-between text-[10px] font-mono-tech text-[#777777] border-b border-white/10 pb-2">
        <span className="text-[#E10600] flex items-center gap-1">
          <Database className="w-3 h-3" /> STUDENT_SYS // CRUD_ROSTER
        </span>
        <span>LATENCY: &lt;5MS</span>
      </div>

      {/* Mini Mock Dashboard Table */}
      <div className="my-auto py-1 space-y-1.5 font-mono-tech text-[10px]">
        <div className="flex justify-between p-1.5 bg-[#141414] border-l-2 border-[#E10600]">
          <span className="text-white font-bold">CS-2401 Sakthi P.</span>
          <span className="text-[#E10600]">CGPA 8.3</span>
        </div>
        <div className="flex justify-between p-1.5 bg-[#0E0E0E] text-[#888888]">
          <span>CS-2402 Student B.</span>
          <span>CGPA 8.7</span>
        </div>
        <div className="flex justify-between p-1.5 bg-[#0E0E0E] text-[#888888]">
          <span>CS-2403 Student C.</span>
          <span>CGPA 8.1</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono-tech border-t border-white/10 pt-2 text-[#999999]">
        <div>STORAGE: <span className="text-white">LOCAL</span></div>
        <div>DEP: <span className="text-white">ZERO</span></div>
        <div>EXPORT: <span className="text-[#E10600]">CSV</span></div>
      </div>
    </div>
  );
};
