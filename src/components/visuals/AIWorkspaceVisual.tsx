import React from 'react';

interface AIWorkspaceVisualProps {
  className?: string;
}

export const AIWorkspaceVisual: React.FC<AIWorkspaceVisualProps> = ({ className = '' }) => {
  return (
    <div
      className={`relative bg-[#070505] border border-white/15 overflow-hidden shadow-[0_25px_80px_-20px_rgba(225,6,0,0.35)] ${className}`}
    >
      {/* Top Editorial Watermark Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#0A0A0A] border-b border-white/10 text-xs font-mono-tech text-[#777777]">
        <div className="flex items-center gap-2 text-white">
          <span className="w-2 h-2 bg-[#E10600] inline-block animate-pulse" />
          <span className="font-bold tracking-wider">AI WORKSPACE // RESEARCH & TOOLKIT ENVIRONMENT</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[#E10600] font-bold">SYSTEM ONLINE</span>
        </div>
      </div>

      {/* PRIMARY AI WORKSPACE RENDER: background.png */}
      <div className="relative w-full overflow-hidden bg-[#050505] group select-none flex items-center justify-center">
        <img
          src="/background.png"
          alt="Sakthi Pandi — AI Workspace Environment (background.png)"
          onError={(e) => {
            const target = e.currentTarget;
            if (target.src !== window.location.origin + '/backround.png') {
              target.src = '/backround.png';
            }
          }}
          className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-[1.01]"
          loading="lazy"
          decoding="async"
        />

        {/* Floating Bottom Left Metadata Pill */}
        <div className="absolute bottom-4 left-4 z-20 hidden sm:flex items-center gap-2 bg-black/85 backdrop-blur-md px-3 py-1.5 border border-white/10 text-[10px] font-mono-tech text-white">
          <span className="w-1.5 h-1.5 bg-[#FF1717] rounded-full animate-ping" />
          <span>ORIGINAL WORKSPACE COMPOSITION</span>
        </div>

        {/* Floating Bottom Right Pill */}
        <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2 bg-black/85 backdrop-blur-md px-3 py-1.5 border border-[#E10600]/40 text-[10px] font-mono-tech text-[#E0E0E0]">
          <span className="text-[#E10600]">SEC.03</span>
          <span>SAKTHI PANDI // AI DEV</span>
        </div>
      </div>

      {/* Bottom Editorial Caption Bar */}
      <div className="p-4 sm:p-6 bg-[#0B0B0B] border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-mono-tech text-[#E10600] uppercase tracking-wider mb-1">
            INTELLIGENT APPLICATION DEVELOPMENT
          </div>
          <p className="text-sm text-[#B8B8B8] max-w-2xl leading-relaxed">
            Integrated multi-agent intelligence and modern LLM tooling driving rapid experimentation, model benchmarking, automated refactoring, and machine learning deployments.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono-tech text-[#777777] shrink-0">
          <div className="px-3 py-1.5 bg-[#140606] border border-[#E10600]/30 text-white flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E10600]" />
            <span>AI ACCELERATED</span>
          </div>
        </div>
      </div>

    </div>
  );
};
