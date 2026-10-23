import React from 'react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { LogoLoop, LogoItem } from '../ui/LogoLoop';
import {
  SiPython,
  SiHtml5,
  SiCss,
  SiNumpy,
  SiPandas,
  SiScikitlearn,
  SiOpencv,
  SiStreamlit,
  SiGithub,
  SiJupyter,
  SiJavascript,
  SiVercel,
  SiSupabase,
} from 'react-icons/si';
import {
  FaJava,
  FaFileExcel,
  FaChartLine,
  FaMagnifyingGlassChart,
} from 'react-icons/fa6';
import { VscVscode } from 'react-icons/vsc';
import { TbRobot, TbChartHistogram, TbBinaryTree } from 'react-icons/tb';

// Custom Power BI stepped bar icon with support for hover color transitions
const PowerBiIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M7 11.5a1.5 1.5 0 0 1 1.5 1.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-7a1.5 1.5 0 0 1 1.5-1.5h2.5Zm7-4.5a1.5 1.5 0 0 1 1.5 1.5V20a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1V8.5A1.5 1.5 0 0 1 12 7h2Zm7-4.5a1.5 1.5 0 0 1 1.5 1.5V20a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1V4a1.5 1.5 0 0 1 1.5-1.5h2.5Z" />
  </svg>
);

export const SkillsSection: React.FC = () => {
  // Exact technologies requested by user for the continuous technology reel
  const techLogos: LogoItem[] = [
    {
      node: (
        <div className="flex items-center gap-2.5 px-4 py-2.5 bg-[#090909] border border-white/10 rounded-sm group/logo transition-all duration-300 hover:border-[#E10600] hover:bg-[#120606] shadow-sm select-none">
          <SiPython className="w-5 h-5 text-[#3776AB] group-hover/logo:text-[#FF1717] transition-colors" />
          <span className="font-mono-tech text-xs uppercase tracking-wider text-white font-bold whitespace-nowrap">Python</span>
        </div>
      ),
      title: 'Python',
      ariaLabel: 'Python Programming',
    },
    {
      node: (
        <div className="flex items-center gap-2.5 px-4 py-2.5 bg-[#090909] border border-white/10 rounded-sm group/logo transition-all duration-300 hover:border-[#E10600] hover:bg-[#120606] shadow-sm select-none">
          <FaJava className="w-5 h-5 text-[#ED8B00] group-hover/logo:text-[#FF1717] transition-colors" />
          <span className="font-mono-tech text-xs uppercase tracking-wider text-white font-bold whitespace-nowrap">Java</span>
        </div>
      ),
      title: 'Java',
      ariaLabel: 'Java Programming',
    },
    {
      node: (
        <div className="flex items-center gap-2.5 px-4 py-2.5 bg-[#090909] border border-white/10 rounded-sm group/logo transition-all duration-300 hover:border-[#E10600] hover:bg-[#120606] shadow-sm select-none">
          <SiJavascript className="w-5 h-5 text-[#F7DF1E] group-hover/logo:text-[#FF1717] transition-colors" />
          <span className="font-mono-tech text-xs uppercase tracking-wider text-white font-bold whitespace-nowrap">JavaScript</span>
        </div>
      ),
      title: 'JavaScript',
      ariaLabel: 'JavaScript Programming',
    },
    {
      node: (
        <div className="flex items-center gap-2.5 px-4 py-2.5 bg-[#090909] border border-white/10 rounded-sm group/logo transition-all duration-300 hover:border-[#E10600] hover:bg-[#120606] shadow-sm select-none">
          <TbBinaryTree className="w-5 h-5 text-[#FF2A2A] group-hover/logo:text-[#FF1717] transition-colors" />
          <span className="font-mono-tech text-xs uppercase tracking-wider text-white font-bold whitespace-nowrap">Prolog</span>
        </div>
      ),
      title: 'Prolog',
      ariaLabel: 'Prolog Logic Programming',
    },
    {
      node: (
        <div className="flex items-center gap-2.5 px-4 py-2.5 bg-[#090909] border border-white/10 rounded-sm group/logo transition-all duration-300 hover:border-[#E10600] hover:bg-[#120606] shadow-sm select-none">
          <SiHtml5 className="w-5 h-5 text-[#E34F26] group-hover/logo:text-[#FF1717] transition-colors" />
          <span className="font-mono-tech text-xs uppercase tracking-wider text-white font-bold whitespace-nowrap">HTML5</span>
        </div>
      ),
      title: 'HTML',
      ariaLabel: 'HTML5 Markup',
    },
    {
      node: (
        <div className="flex items-center gap-2.5 px-4 py-2.5 bg-[#090909] border border-white/10 rounded-sm group/logo transition-all duration-300 hover:border-[#E10600] hover:bg-[#120606] shadow-sm select-none">
          <SiCss className="w-5 h-5 text-[#1572B6] group-hover/logo:text-[#FF1717] transition-colors" />
          <span className="font-mono-tech text-xs uppercase tracking-wider text-white font-bold whitespace-nowrap">CSS</span>
        </div>
      ),
      title: 'CSS',
      ariaLabel: 'CSS3 Stylesheet',
    },
    {
      node: (
        <div className="flex items-center gap-2.5 px-4 py-2.5 bg-[#090909] border border-white/10 rounded-sm group/logo transition-all duration-300 hover:border-[#E10600] hover:bg-[#120606] shadow-sm select-none">
          <TbRobot className="w-5 h-5 text-[#E10600] group-hover/logo:text-[#FF1717] transition-colors" />
          <span className="font-mono-tech text-xs uppercase tracking-wider text-white font-bold whitespace-nowrap">Machine Learning</span>
        </div>
      ),
      title: 'Machine Learning',
      ariaLabel: 'Machine Learning Algorithms',
    },
    {
      node: (
        <div className="flex items-center gap-2.5 px-4 py-2.5 bg-[#090909] border border-white/10 rounded-sm group/logo transition-all duration-300 hover:border-[#E10600] hover:bg-[#120606] shadow-sm select-none">
          <SiScikitlearn className="w-5 h-5 text-[#F7931E] group-hover/logo:text-[#FF1717] transition-colors" />
          <span className="font-mono-tech text-xs uppercase tracking-wider text-white font-bold whitespace-nowrap">Scikit-learn</span>
        </div>
      ),
      title: 'Scikit-learn',
      ariaLabel: 'Scikit-learn ML Library',
    },
    {
      node: (
        <div className="flex items-center gap-2.5 px-4 py-2.5 bg-[#090909] border border-white/10 rounded-sm group/logo transition-all duration-300 hover:border-[#E10600] hover:bg-[#120606] shadow-sm select-none">
          <SiPandas className="w-5 h-5 text-[#150458] group-hover/logo:text-[#FF1717] transition-colors" />
          <span className="font-mono-tech text-xs uppercase tracking-wider text-white font-bold whitespace-nowrap">Pandas</span>
        </div>
      ),
      title: 'Pandas',
      ariaLabel: 'Pandas Data Analysis',
    },
    {
      node: (
        <div className="flex items-center gap-2.5 px-4 py-2.5 bg-[#090909] border border-white/10 rounded-sm group/logo transition-all duration-300 hover:border-[#E10600] hover:bg-[#120606] shadow-sm select-none">
          <SiNumpy className="w-5 h-5 text-[#4DABCF] group-hover/logo:text-[#FF1717] transition-colors" />
          <span className="font-mono-tech text-xs uppercase tracking-wider text-white font-bold whitespace-nowrap">NumPy</span>
        </div>
      ),
      title: 'NumPy',
      ariaLabel: 'NumPy Numerical Computing',
    },
    {
      node: (
        <div className="flex items-center gap-2.5 px-4 py-2.5 bg-[#090909] border border-white/10 rounded-sm group/logo transition-all duration-300 hover:border-[#E10600] hover:bg-[#120606] shadow-sm select-none">
          <SiOpencv className="w-5 h-5 text-[#5C3EE8] group-hover/logo:text-[#FF1717] transition-colors" />
          <span className="font-mono-tech text-xs uppercase tracking-wider text-white font-bold whitespace-nowrap">OpenCV</span>
        </div>
      ),
      title: 'OpenCV',
      ariaLabel: 'OpenCV Computer Vision',
    },
    {
      node: (
        <div className="flex items-center gap-2.5 px-4 py-2.5 bg-[#090909] border border-white/10 rounded-sm group/logo transition-all duration-300 hover:border-[#E10600] hover:bg-[#120606] shadow-sm select-none">
          <FaMagnifyingGlassChart className="w-5 h-5 text-[#E10600] group-hover/logo:text-[#FF1717] transition-colors" />
          <span className="font-mono-tech text-xs uppercase tracking-wider text-white font-bold whitespace-nowrap">Data Analysis</span>
        </div>
      ),
      title: 'Data Analysis',
      ariaLabel: 'Statistical Data Analysis',
    },
    {
      node: (
        <div className="flex items-center gap-2.5 px-4 py-2.5 bg-[#090909] border border-white/10 rounded-sm group/logo transition-all duration-300 hover:border-[#E10600] hover:bg-[#120606] shadow-sm select-none">
          <TbChartHistogram className="w-5 h-5 text-[#E10600] group-hover/logo:text-[#FF1717] transition-colors" />
          <span className="font-mono-tech text-xs uppercase tracking-wider text-white font-bold whitespace-nowrap">Data Visualization</span>
        </div>
      ),
      title: 'Data Visualization',
      ariaLabel: 'Data Visualization',
    },
    {
      node: (
        <div className="flex items-center gap-2.5 px-4 py-2.5 bg-[#090909] border border-white/10 rounded-sm group/logo transition-all duration-300 hover:border-[#E10600] hover:bg-[#120606] shadow-sm select-none">
          <FaChartLine className="w-5 h-5 text-[#11557C] group-hover/logo:text-[#FF1717] transition-colors" />
          <span className="font-mono-tech text-xs uppercase tracking-wider text-white font-bold whitespace-nowrap">Matplotlib</span>
        </div>
      ),
      title: 'Matplotlib',
      ariaLabel: 'Matplotlib Graphing Library',
    },
    {
      node: (
        <div className="flex items-center gap-2.5 px-4 py-2.5 bg-[#090909] border border-white/10 rounded-sm group/logo transition-all duration-300 hover:border-[#E10600] hover:bg-[#120606] shadow-sm select-none">
          <FaFileExcel className="w-5 h-5 text-[#217346] group-hover/logo:text-[#FF1717] transition-colors" />
          <span className="font-mono-tech text-xs uppercase tracking-wider text-white font-bold whitespace-nowrap">Excel</span>
        </div>
      ),
      title: 'Excel',
      ariaLabel: 'Microsoft Excel Data Tool',
    },
    {
      node: (
        <div className="flex items-center gap-2.5 px-4 py-2.5 bg-[#090909] border border-white/10 rounded-sm group/logo transition-all duration-300 hover:border-[#E10600] hover:bg-[#120606] shadow-sm select-none">
          <PowerBiIcon className="w-5 h-5 text-[#F2C811] group-hover/logo:text-[#FF1717] transition-colors" />
          <span className="font-mono-tech text-xs uppercase tracking-wider text-white font-bold whitespace-nowrap">Power BI</span>
        </div>
      ),
      title: 'Power BI',
      ariaLabel: 'Microsoft Power BI Business Intelligence',
    },
    {
      node: (
        <div className="flex items-center gap-2.5 px-4 py-2.5 bg-[#090909] border border-white/10 rounded-sm group/logo transition-all duration-300 hover:border-[#E10600] hover:bg-[#120606] shadow-sm select-none">
          <SiStreamlit className="w-5 h-5 text-[#FF4B4B] group-hover/logo:text-[#FF1717] transition-colors" />
          <span className="font-mono-tech text-xs uppercase tracking-wider text-white font-bold whitespace-nowrap">Streamlit</span>
        </div>
      ),
      title: 'Streamlit',
      ariaLabel: 'Streamlit ML Web Apps',
    },
    {
      node: (
        <div className="flex items-center gap-2.5 px-4 py-2.5 bg-[#090909] border border-white/10 rounded-sm group/logo transition-all duration-300 hover:border-[#E10600] hover:bg-[#120606] shadow-sm select-none">
          <SiVercel className="w-5 h-5 text-white group-hover/logo:text-[#FF1717] transition-colors" />
          <span className="font-mono-tech text-xs uppercase tracking-wider text-white font-bold whitespace-nowrap">Vercel</span>
        </div>
      ),
      title: 'Vercel',
      ariaLabel: 'Vercel Cloud Platform',
    },
    {
      node: (
        <div className="flex items-center gap-2.5 px-4 py-2.5 bg-[#090909] border border-white/10 rounded-sm group/logo transition-all duration-300 hover:border-[#E10600] hover:bg-[#120606] shadow-sm select-none">
          <SiSupabase className="w-5 h-5 text-[#3ECF8E] group-hover/logo:text-[#FF1717] transition-colors" />
          <span className="font-mono-tech text-xs uppercase tracking-wider text-white font-bold whitespace-nowrap">Supabase</span>
        </div>
      ),
      title: 'Supabase',
      ariaLabel: 'Supabase Backend & Database',
    },
    {
      node: (
        <div className="flex items-center gap-2.5 px-4 py-2.5 bg-[#090909] border border-white/10 rounded-sm group/logo transition-all duration-300 hover:border-[#E10600] hover:bg-[#120606] shadow-sm select-none">
          <SiGithub className="w-5 h-5 text-white group-hover/logo:text-[#FF1717] transition-colors" />
          <span className="font-mono-tech text-xs uppercase tracking-wider text-white font-bold whitespace-nowrap">GitHub</span>
        </div>
      ),
      title: 'GitHub',
      ariaLabel: 'GitHub Version Control',
    },
    {
      node: (
        <div className="flex items-center gap-2.5 px-4 py-2.5 bg-[#090909] border border-white/10 rounded-sm group/logo transition-all duration-300 hover:border-[#E10600] hover:bg-[#120606] shadow-sm select-none">
          <VscVscode className="w-5 h-5 text-[#007ACC] group-hover/logo:text-[#FF1717] transition-colors" />
          <span className="font-mono-tech text-xs uppercase tracking-wider text-white font-bold whitespace-nowrap">VS Code</span>
        </div>
      ),
      title: 'VS Code',
      ariaLabel: 'Visual Studio Code Editor',
    },
    {
      node: (
        <div className="flex items-center gap-2.5 px-4 py-2.5 bg-[#090909] border border-white/10 rounded-sm group/logo transition-all duration-300 hover:border-[#E10600] hover:bg-[#120606] shadow-sm select-none">
          <SiJupyter className="w-5 h-5 text-[#F37626] group-hover/logo:text-[#FF1717] transition-colors" />
          <span className="font-mono-tech text-xs uppercase tracking-wider text-white font-bold whitespace-nowrap">Jupyter Notebook</span>
        </div>
      ),
      title: 'Jupyter Notebook',
      ariaLabel: 'Jupyter Notebook Environment',
    },
  ];

  // Exact 4 categories requested by user
  const skillCategories = [
    {
      number: '01',
      category: 'PROGRAMMING',
      tagline: 'SYNTAX & CORE COMPUTATION',
      // ISSUE 1: Keep PROGRAMMING on a single line, slightly reduced font size, adjusted letter-spacing
      headingNode: (
        <h3
          className="font-display font-black text-white group-hover:text-white transition-colors whitespace-nowrap min-w-0"
          style={{
            fontSize: 'clamp(1.05rem, 1.25vw, 1.3rem)',
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
          }}
        >
          PROGRAMMING
        </h3>
      ),
      skills: [
        {
          name: 'Python',
          icon: SiPython,
          focus: 'Core algorithmic language for ML models, data pipelines & backend logic',
        },
        {
          name: 'Java',
          icon: FaJava,
          focus: 'Object-oriented programming, data structures & computational problem solving',
        },
        {
          name: 'JavaScript',
          icon: SiJavascript,
          focus: 'Modern ES6+, client-side interactivity, asynchronous async/await workflows & UI logic',
        },
        {
          name: 'Prolog',
          icon: TbBinaryTree,
          focus: 'Logic programming, declarative knowledge bases, inference engines & AI reasoning',
        },
        {
          name: 'HTML',
          icon: SiHtml5,
          focus: 'Semantic structural markup, accessibility standards & document architecture',
        },
        {
          name: 'CSS',
          icon: SiCss,
          focus: 'Responsive UI styling, flexbox, CSS grid & modern presentation mechanics',
        },
      ],
    },
    {
      number: '02',
      category: 'AI & MACHINE LEARNING',
      tagline: 'PREDICTIVE & INTELLIGENT SYSTEMS',
      headingNode: (
        <h3
          className="font-display font-black text-white group-hover:text-white transition-colors min-w-0 max-w-full mb-2.5"
          style={{
            fontSize: 'clamp(0.85rem, 0.98vw, 1.08rem)',
            letterSpacing: '-0.02em',
            lineHeight: 1.22,
          }}
        >
          <span className="block min-w-0 max-w-full">AI &amp;</span>
          <span className="block min-w-0 max-w-full whitespace-nowrap">MACHINE LEARNING</span>
        </h3>
      ),
      skills: [
        {
          name: 'Machine Learning',
          icon: TbRobot,
          focus: 'Supervised & unsupervised learning architectures, model training & validation',
        },
        {
          name: 'Scikit-learn',
          icon: SiScikitlearn,
          focus: 'Regression, classification algorithms, feature scaling & cross-validation metrics',
        },
        {
          name: 'Pandas',
          icon: SiPandas,
          focus: 'High-performance DataFrame operations, exploratory cleaning & feature engineering',
        },
        {
          name: 'NumPy',
          icon: SiNumpy,
          focus: 'Multidimensional array computations, matrix operations & numerical computing',
        },
        {
          name: 'OpenCV',
          icon: SiOpencv,
          focus: 'Computer vision routines, image pre-processing, matrix filtering & transformations',
        },
      ],
    },
    {
      number: '03',
      category: 'DATA & VISUALIZATION',
      tagline: 'ANALYTICS & DIAGNOSTIC INSIGHTS',
      // ISSUE 2: Intentional line break DATA & / VISUALIZATION, fits card, line-height, bottom margin, separated from subtitle
      headingNode: (
        <h3
          className="font-display font-black text-white group-hover:text-white transition-colors min-w-0 mb-2.5"
          style={{
            fontSize: 'clamp(0.96rem, 1.15vw, 1.2rem)',
            letterSpacing: '-0.015em',
            lineHeight: 1.25,
          }}
        >
          <span className="block">DATA &amp;</span>
          <span className="block whitespace-nowrap">VISUALIZATION</span>
        </h3>
      ),
      skills: [
        {
          name: 'Power BI',
          icon: PowerBiIcon,
          focus: 'Interactive business intelligence reports, DAX modeling, automated KPI tracking & executive dashboards',
        },
        {
          name: 'Data Analysis',
          icon: FaMagnifyingGlassChart,
          focus: 'Quantitative discovery, metric extraction, distribution tests & pattern spotting',
        },
        {
          name: 'Data Visualization',
          icon: TbChartHistogram,
          focus: 'Visual statistical storytelling, correlation matrices & diagnostic dashboarding',
        },
        {
          name: 'Matplotlib',
          icon: FaChartLine,
          focus: 'Publication-quality scientific plots, trend lines & multi-figure visualizations',
        },
        {
          name: 'Excel',
          icon: FaFileExcel,
          focus: 'Tabular data analysis, pivot synthesis, data auditing & rapid numeric models',
        },
      ],
    },
    {
      number: '04',
      category: 'DEVELOPMENT & TOOLS',
      tagline: 'PIPELINES & WORK ENVIRONMENTS',
      headingNode: (
        <h3
          className="font-display font-black text-white group-hover:text-white transition-colors min-w-0 mb-1.5"
          style={{
            fontSize: 'clamp(1.0rem, 1.2vw, 1.25rem)',
            letterSpacing: '-0.01em',
            lineHeight: 1.25,
          }}
        >
          <span className="block">DEVELOPMENT &amp;</span>
          <span className="block">TOOLS</span>
        </h3>
      ),
      skills: [
        {
          name: 'Vercel',
          icon: SiVercel,
          focus: 'Edge runtime deployment, automated CI/CD pipelines & production cloud hosting',
        },
        {
          name: 'Supabase',
          icon: SiSupabase,
          focus: 'Cloud PostgreSQL database, backend-as-a-service, real-time subscriptions & authentication',
        },
        {
          name: 'Streamlit',
          icon: SiStreamlit,
          focus: 'Rapid interactive prototyping & deployment of machine learning web applications',
        },
        {
          name: 'GitHub',
          icon: SiGithub,
          focus: 'Distributed version control, remote code repository management & team collaboration',
        },
        {
          name: 'VS Code',
          icon: VscVscode,
          focus: 'Primary IDE workflow with language servers, interactive debuggers & environment tooling',
        },
        {
          name: 'Jupyter Notebook',
          icon: SiJupyter,
          focus: 'Interactive exploratory computing, code execution experiments & documented analysis',
        },
      ],
    },
  ];

  return (
    <section id="skills" className="relative py-24 sm:py-32 bg-[#050505] border-b border-white/10 overflow-hidden">
      {/* Background Architectural Grid Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none tech-grid-pattern" />

      {/* Subtle Red Ambient Gradient Accent */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#E10600]/5 blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with ScrollReveal */}
        <ScrollReveal
          direction="up"
          distance={28}
          className="border-b border-white/10 pb-8 mb-12 sm:mb-16"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-mono-tech text-[#E10600] font-bold tracking-widest uppercase mb-3">
                <span className="w-1.5 h-1.5 bg-[#E10600] inline-block" />
                <span>WHAT I WORK WITH</span>
                <span className="text-white/20">//</span>
                <span className="text-white/60">02 — SKILLS</span>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.05]">
                TOOLS. TECHNOLOGIES.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/70 block sm:inline">
                  INTELLIGENCE.
                </span>
              </h2>
            </div>
            <div className="text-xs font-mono-tech text-[#777777] uppercase tracking-wider flex items-center gap-2">
              <span className="text-[#E10600]">●</span>
              <span>22 VERIFIED TOOLS</span>
            </div>
          </div>

          <p className="mt-4 max-w-2xl text-sm sm:text-base text-[#B8B8B8] leading-relaxed">
            A focused toolkit built around Artificial Intelligence, Machine Learning, Python, data, and modern web development.
          </p>
        </ScrollReveal>

        {/* ================= REACT BITS LOGOLOOP: FULL-WIDTH TECHNOLOGY STRIP ================= */}
        <ScrollReveal direction="up" distance={30} delay={0.1} className="mb-16 sm:mb-20">
          <div className="relative bg-[#070707] border-y border-white/10 py-5 sm:py-6 overflow-hidden">
            {/* Top Micro Legend */}
            <div className="px-4 mb-3 flex items-center justify-between text-[10px] font-mono-tech text-[#666666] uppercase tracking-widest">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E10600] animate-pulse" />
                <span>CONTINUOUS STACK REEL</span>
              </span>
              <span className="hidden sm:inline text-white/30">HOVER TO PAUSE // ACCELERATION ACTIVE</span>
            </div>

            {/* React Bits LogoLoop Component */}
            <LogoLoop
              logos={techLogos}
              speed={70}
              direction="left"
              logoHeight={38}
              gap={42}
              hoverSpeed={0}
              scaleOnHover={true}
              fadeOut={true}
              fadeOutColor="#050505"
              ariaLabel="Technology partners and core stack continuous loop"
              className="w-full"
            />
          </div>
        </ScrollReveal>

        {/* ================= 4 CLEAN SKILL CATEGORY BLOCKS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 lg:gap-6 min-w-0">
          {skillCategories.map((cat, idx) => (
            <ScrollReveal
              key={cat.number}
              direction="up"
              distance={35}
              delay={0.1 + idx * 0.08}
              className="relative p-5 sm:p-6 bg-[#080808] border border-white/10 hover:border-[#E10600] transition-all duration-300 flex flex-col justify-between group red-glow-subtle min-w-0 max-w-full"
            >
              {/* Corner Notch */}
              <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-white/20 group-hover:border-[#E10600] transition-colors duration-300 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-white/20 group-hover:border-[#E10600] transition-colors duration-300 pointer-events-none" />

              <div className="min-w-0 w-full">
                {/* Large Category Number & Header */}
                <div className="flex items-start justify-between gap-2 min-w-0">
                  <span className="font-display text-4xl sm:text-5xl font-black text-white/20 group-hover:text-[#E10600] transition-colors duration-300 select-none leading-none">
                    {cat.number}
                  </span>
                  <span className="px-2 py-0.5 bg-[#120606] border border-[#E10600]/30 text-[10px] font-mono-tech text-[#FF1717] uppercase tracking-wider flex-shrink-0">
                    {cat.skills.length} TOOLS
                  </span>
                </div>

                <div className="mt-3 min-w-0 max-w-full">
                  {cat.headingNode}
                  <p className="text-[10px] font-mono-tech text-[#777777] uppercase tracking-widest mt-1 leading-relaxed block min-w-0">
                    {cat.tagline}
                  </p>
                </div>

                {/* Specific Tool Items */}
                <div className="space-y-2.5 mt-6 pt-5 border-t border-white/10 min-w-0">
                  {cat.skills.map((skill) => {
                    const Icon = skill.icon;
                    return (
                      <div
                        key={skill.name}
                        className="p-3 bg-[#050505] border border-white/5 hover:border-[#E10600]/40 transition-all duration-200 group/item min-w-0 max-w-full"
                      >
                        <div className="flex items-center justify-between gap-2 min-w-0">
                          <div className="flex items-center gap-2.5 min-w-0 flex-1">
                            <Icon className="w-4 h-4 flex-shrink-0 text-[#E10600] group-hover/item:text-[#FF1717] transition-colors" />
                            <span className="font-mono-tech text-xs sm:text-sm font-bold text-white group-hover/item:text-[#FF1717] transition-colors truncate">
                              {skill.name}
                            </span>
                          </div>
                          <span className="text-[9px] font-mono-tech text-white/30 group-hover/item:text-[#E10600] transition-colors flex-shrink-0">
                            ACTIVE
                          </span>
                        </div>
                        <p className="text-[11px] text-[#888888] leading-relaxed mt-1.5 font-sans group-hover/item:text-[#D5D5D5] transition-colors break-words [overflow-wrap:anywhere]">
                          {skill.focus}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Card Summary */}
              <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono-tech text-[#666666] min-w-0">
                <span className="group-hover:text-[#B8B8B8] transition-colors truncate">
                  PROFICIENCY: APPLIED
                </span>
                <span className="text-[#E10600] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 font-bold flex-shrink-0">
                  VERIFIED →
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Editorial Footnote with Zero-Percentage Discipline */}
        <ScrollReveal
          direction="up"
          distance={20}
          delay={0.2}
          className="mt-12 sm:mt-16 p-4 sm:p-5 bg-[#080808] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono-tech text-[#777777]"
        >
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 bg-[#E10600] rounded-none animate-pulse" />
            <span className="text-[#B8B8B8]">
              DISCIPLINE: Pure project application &middot; Zero arbitrary percentage bars
            </span>
          </div>
          <div className="text-white/60">
            TOTAL VERIFIED TOOLKIT: <span className="text-white font-bold">22 CORE TECHNOLOGIES</span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
