import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Volume2, VolumeX, FastForward } from 'lucide-react';
import { audioFeedback } from '../../utils/audioFeedback';
import { PortalTunnel3D } from './PortalTunnel3D';

interface LoadingIntroProps {
  onComplete: () => void;
  soundEnabled?: boolean;
  onToggleSound?: () => void;
}

type IntroStage = 'loading' | 'welcome' | 'portal' | 'complete';

export const LoadingIntro: React.FC<LoadingIntroProps> = ({
  onComplete,
  soundEnabled = false,
  onToggleSound,
}) => {
  const [stage, setStage] = useState<IntroStage>('loading');
  const [count, setCount] = useState<number>(1);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isTransitioningOut, setIsTransitioningOut] = useState<boolean>(false);

  const hasTriggeredCompleteRef = useRef<boolean>(false);
  const hasPlayedWarpAudioRef = useRef<boolean>(false);

  // Status message for loading stage
  const getStatusText = (val: number): string => {
    if (val < 25) return 'INITIALIZING NEURAL SYSTEMS...';
    if (val < 50) return 'SYNCHRONIZING SPACETIME METRICS...';
    if (val < 75) return 'STABILIZING EVENT HORIZON...';
    if (val < 95) return 'CALIBRATING RED ENERGY TUNNEL...';
    return 'EVENT HORIZON STABILIZED // READY';
  };

  // Safe completion trigger to reveal hero
  const triggerCompletion = useCallback(() => {
    if (hasTriggeredCompleteRef.current) return;
    hasTriggeredCompleteRef.current = true;
    setIsTransitioningOut(true);
    audioFeedback.playTransitionWhoosh();

    setTimeout(() => {
      onComplete();
    }, 600);
  }, [onComplete]);

  // Skip button (ESC key or dedicated HUD button)
  const handleSkip = useCallback(() => {
    triggerCompletion();
  }, [triggerCompletion]);

  // Keyboard controls: ESC to skip
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSkip]);

  // =========================================================================
  // STAGE 1: NUMBER COUNTER 1 TO 100 (Runs smoothly on initial load)
  // =========================================================================
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setCount(100);
      setStage('welcome');
      setTimeout(() => triggerCompletion(), 400);
      return;
    }

    const duration = 1800; // 1.8 seconds smooth ramp
    let startTimestamp: number | null = null;
    let animId: number;
    let lastTick = 1;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const linearProgress = Math.min(elapsed / duration, 1);

      // Smooth ease-out cubic ramp
      const easedProgress = 1 - Math.pow(1 - linearProgress, 2.6);
      const currentVal = Math.min(100, Math.max(1, Math.floor(1 + easedProgress * 99)));
      setCount(currentVal);

      if (currentVal - lastTick >= 10) {
        lastTick = currentVal;
        audioFeedback.playTick(currentVal / 100);
      }

      if (linearProgress < 1) {
        animId = requestAnimationFrame(step);
      } else {
        setCount(100);
        audioFeedback.playBootComplete();
        // Transition to Stage 2: Welcome animation
        setTimeout(() => {
          setStage('welcome');
        }, 220);
      }
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [triggerCompletion]);

  // =========================================================================
  // STAGE 2: WELCOME REVEAL TIMING (Auto-transitions to Stage 3: 3D Tunnel)
  // =========================================================================
  useEffect(() => {
    if (stage !== 'welcome') return;

    // Show welcome screen for 1.6s, then start portal plunge automatically
    const timer = setTimeout(() => {
      setStage('portal');
    }, 1600);

    return () => clearTimeout(timer);
  }, [stage]);

  // =========================================================================
  // STAGE 3: AUTOMATIC CINEMATIC PORTAL CAMERA PLUNGE (0 -> 1 over 2.4s)
  // =========================================================================
  useEffect(() => {
    if (stage !== 'portal') return;

    const portalDuration = 2400; // 2.4s tunnel warp duration
    let startTimestamp: number | null = null;
    let animId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const linearProgress = Math.min(elapsed / portalDuration, 1);

      // Smooth ease-in-out quintic camera acceleration through depth
      const p =
        linearProgress < 0.5
          ? 16 * Math.pow(linearProgress, 5)
          : 1 - Math.pow(-2 * linearProgress + 2, 5) / 2;

      setScrollProgress(p);

      // Play portal warp audio pulse once camera enters deep tunnel (progress > 0.35)
      if (p > 0.35 && !hasPlayedWarpAudioRef.current) {
        hasPlayedWarpAudioRef.current = true;
        audioFeedback.playPortalWarp();
      }

      if (linearProgress < 1) {
        animId = requestAnimationFrame(step);
      } else {
        setScrollProgress(1);
        setStage('complete');
        triggerCompletion();
      }
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [stage, triggerCompletion]);

  // Dynamic calculations based on scrollProgress
  const depthPercentage = Math.min(100, Math.floor(scrollProgress * 100));
  const formattedCount = count < 10 ? `0${count}` : `${count}`;

  // Radial energy lines expansion & rotation
  const radialLinesScale = 1 + scrollProgress * 5;
  const radialLinesRotate = scrollProgress * 36;

  // Welcome text fades out and scales toward camera during portal plunge
  const welcomeTextOpacity =
    stage === 'welcome' ? 1 : Math.max(0, 1 - scrollProgress * 3.5);
  const welcomeTextScale = 1 + scrollProgress * 2.2;

  // Emergence flash as camera punches through event horizon (progress > 0.88)
  const emergenceFlashOpacity =
    scrollProgress > 0.86 ? Math.min(1, (scrollProgress - 0.86) * 7.2) : 0;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Cinematic Portfolio Entry"
      className={`fixed inset-0 z-[9999] bg-[#050505] text-white select-none overflow-hidden transition-opacity duration-600 ${
        isTransitioningOut ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
      }`}
      style={{ perspective: '1200px' }}
    >
      {/* 1. Deep Space Dark Background & Radial Glow */}
      <div className="absolute inset-0 bg-[#050505] pointer-events-none" />
      <div className="absolute inset-0 portal-radial-glow pointer-events-none opacity-80" />
      <div className="absolute inset-0 tech-grid-pattern opacity-15 pointer-events-none" />

      {/* 2. Full-Screen 3D Particle Tunnel (Three.js WebGL with curved spline & swirling vortex) */}
      <PortalTunnel3D
        scrollProgress={scrollProgress}
        stage={stage === 'loading' ? 'counter' : stage === 'welcome' ? 'ready' : 'entering'}
      />

      {/* 3. Radial Energy Perspective Lines (24 lines converging to vanishing point) */}
      <div
        className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center transition-transform duration-75 ease-out"
        style={{
          transform: `scale(${radialLinesScale}) rotate(${radialLinesRotate}deg)`,
        }}
      >
        <svg
          className="w-[180vmax] h-[180vmax] opacity-40"
          viewBox="-500 -500 1000 1000"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="radialEnergyGrad" cx="0%" cy="0%" r="50%">
              <stop offset="0%" stopColor="#8B0000" stopOpacity="0.8" />
              <stop offset="40%" stopColor="#E10600" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#050505" stopOpacity="0" />
            </radialGradient>
          </defs>
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i * 360) / 24;
            const rad = (angle * Math.PI) / 180;
            const x2 = Math.cos(rad) * 600;
            const y2 = Math.sin(rad) * 600;
            return (
              <line
                key={i}
                x1={0}
                y1={0}
                x2={x2}
                y2={y2}
                stroke="url(#radialEnergyGrad)"
                strokeWidth={1 + scrollProgress * 2.5}
                strokeDasharray={i % 2 === 0 ? '4 8' : 'none'}
              />
            );
          })}
        </svg>
      </div>

      {/* 4. Layered Entrance Reticle Rings */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-15 transition-opacity duration-150"
        style={{
          opacity: Math.max(0, 1 - scrollProgress * 5),
          transform: `scale(${1 + scrollProgress * 2.5})`,
        }}
      >
        <div
          className="absolute rounded-full border border-[#8B0000]/40"
          style={{ width: '680px', height: '680px' }}
        />
        <div
          className="absolute rounded-full border border-dashed border-[#E10600]/40 animate-spin-slow"
          style={{ width: '520px', height: '520px' }}
        />
        <div
          className="absolute rounded-full border-2 border-[#E10600]/60 animate-spin-reverse-slow"
          style={{
            width: '380px',
            height: '380px',
            boxShadow: `0 0 35px rgba(225, 6, 0, 0.4), inset 0 0 20px rgba(139, 0, 0, 0.3)`,
          }}
        />
        <div
          className="absolute rounded-full border-2 border-[#FF2222]"
          style={{
            width: '240px',
            height: '240px',
            boxShadow: `0 0 40px #E10600, inset 0 0 25px #8B0000`,
          }}
        />
      </div>

      {/* 5. TOP HUD BAR: BRANDING, SOUND TOGGLE & VISIBLE SKIP INTRO BUTTON */}
      <header className="absolute top-0 left-0 right-0 z-40 p-4 sm:p-8 flex items-center justify-between text-[11px] sm:text-xs font-mono-tech text-white/50 tracking-[0.2em] uppercase pointer-events-auto">
        <div className="flex items-center space-x-2.5">
          <span className="w-2 h-2 bg-[#E10600] inline-block animate-pulse shadow-[0_0_8px_#E10600]" />
          <span className="text-white font-bold tracking-widest">SAKTHIPANDI // AI PORTAL</span>
          <span className="text-[#E10600] hidden sm:inline">[SINGULARITY PROTOCOL]</span>
        </div>

        <div className="flex items-center space-x-3 sm:space-x-5">
          {onToggleSound && (
            <button
              type="button"
              onClick={onToggleSound}
              className="flex items-center space-x-1.5 px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-colors duration-200 cursor-pointer"
              aria-label={soundEnabled ? 'Mute sound' : 'Enable sound'}
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#E10600]" />
                  <span className="text-[10px]">SOUND: ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-white/40" />
                  <span className="text-[10px]">SOUND: OFF</span>
                </>
              )}
            </button>
          )}

          {/* Visible SKIP INTRO Control */}
          <button
            type="button"
            onClick={handleSkip}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-[#120606] hover:bg-[#E10600] border border-[#E10600]/60 hover:border-[#E10600] text-[#FF1717] hover:text-white transition-all duration-200 cursor-pointer group shadow-[0_0_15px_rgba(225,6,0,0.3)]"
            aria-label="Skip cinematic intro to homepage"
          >
            <FastForward className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            <span className="font-bold text-[10px] sm:text-xs tracking-wider">SKIP INTRO</span>
            <span className="text-white/40 group-hover:text-white/80 text-[9px] hidden sm:inline">(ESC)</span>
          </button>
        </div>
      </header>

      {/* Cyber Corner Brackets */}
      <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#E10600]/60 pointer-events-none z-30" />
      <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#E10600]/60 pointer-events-none z-30" />
      <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#E10600]/60 pointer-events-none z-30" />
      <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#E10600]/60 pointer-events-none z-30" />

      {/* =========================================================================
          STAGE 1: LOADING SCREEN (1 TO 100 COUNTER & PROGRESS INDICATOR)
      ========================================================================= */}
      {stage === 'loading' && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-6 text-center pointer-events-none">
          <div className="max-w-md w-full flex flex-col items-center">
            {/* Telemetry Bracket */}
            <div className="mb-3 text-[10px] sm:text-xs font-mono-tech tracking-[0.3em] text-[#E10600] uppercase font-bold flex items-center space-x-2">
              <span className="w-1.5 h-1.5 bg-[#E10600]" />
              <span>SPACETIME SINGULARITY INITIALIZATION</span>
              <span className="w-1.5 h-1.5 bg-[#E10600]" />
            </div>

            {/* Number Counter Animating Smoothly 1 to 100 */}
            <div className="relative mb-6">
              <div className="font-cyber text-7xl sm:text-8xl md:text-9xl font-black tracking-tight text-white flex items-baseline justify-center">
                <span className="tabular-nums drop-shadow-[0_0_35px_rgba(255,255,255,0.2)]">
                  {formattedCount}
                </span>
                <span className="text-[#E10600] text-4xl sm:text-6xl md:text-7xl font-light ml-2 drop-shadow-[0_0_25px_rgba(225,6,0,0.8)]">
                  %
                </span>
              </div>
              <div className="absolute -inset-6 bg-[#E10600]/20 blur-3xl rounded-full -z-10" />
            </div>

            {/* Red Progress Indicator Bar */}
            <div className="w-full max-w-xs sm:max-w-md h-[4px] bg-white/10 relative overflow-hidden mb-4">
              <div
                className="h-full bg-[#E10600] transition-all duration-75 ease-out shadow-[0_0_18px_#FF1717]"
                style={{ width: `${count}%` }}
              />
            </div>

            {/* Dynamic Milestone Telemetry Text */}
            <div className="h-6 flex items-center justify-center">
              <div className="inline-flex items-center space-x-2 text-white/70 font-mono-tech text-xs sm:text-sm tracking-[0.2em] uppercase">
                <span className="w-1.5 h-1.5 bg-[#E10600] animate-ping inline-block" />
                <span>{getStatusText(count)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          STAGE 2 & 3: WELCOME ANIMATION (HORIZONTAL MARQUEE & TEXT REVEAL)
      ========================================================================= */}
      {(stage === 'welcome' || stage === 'portal') && (
        <div
          className="absolute inset-0 z-30 flex flex-col items-center justify-between p-6 sm:p-12 text-center pointer-events-none transition-transform duration-100 ease-out"
          style={{
            opacity: welcomeTextOpacity,
            transform: `scale(${welcomeTextScale})`,
          }}
        >
          {/* Top Kinetic Marquee Track */}
          <div className="w-full overflow-hidden whitespace-nowrap opacity-20 pointer-events-none pt-12">
            <div className="animate-marquee-left text-xs font-mono-tech uppercase tracking-[0.4em] text-[#E10600]">
              WELCOME TO MY PORTFOLIO // SAKTHI PANDI // ARTIFICIAL INTELLIGENCE // DEEP LEARNING // CHENNAI, INDIA //&nbsp;
              WELCOME TO MY PORTFOLIO // SAKTHI PANDI // ARTIFICIAL INTELLIGENCE // DEEP LEARNING // CHENNAI, INDIA //&nbsp;
            </div>
          </div>

          {/* Central Welcome Reveal */}
          <div className="max-w-4xl mx-auto px-4 flex flex-col items-center my-auto">
            {/* Tag */}
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#120606]/90 border border-[#E10600]/60 text-[10px] sm:text-xs font-mono-tech text-[#E10600] font-bold tracking-[0.3em] uppercase mb-4 shadow-[0_0_20px_rgba(225,6,0,0.3)] animate-pulse">
              <span className="w-1.5 h-1.5 bg-[#E10600]" />
              <span>SINGULARITY PROTOCOL ONLINE</span>
              <span className="w-1.5 h-1.5 bg-[#E10600]" />
            </div>

            {/* Primary Headline: WELCOME TO MY PORTFOLIO */}
            <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-tight uppercase leading-none mb-4 drop-shadow-[0_0_40px_rgba(225,6,0,0.6)]">
              WELCOME TO MY <span className="text-[#E10600] red-text-glow">PORTFOLIO</span>
            </h1>

            {/* Subtitle Identity */}
            <p className="font-mono-tech text-xs sm:text-base text-[#C0C0C0] tracking-[0.28em] uppercase max-w-2xl">
              SAKTHI PANDI // AI DEVELOPER & MACHINE LEARNING ENGINEER
            </p>

            {/* Portal Entering Pulse Badge */}
            <div className="mt-6 flex items-center space-x-2 text-[11px] font-mono-tech text-[#FF1717] tracking-[0.2em] uppercase">
              <span className="w-2 h-2 rounded-full bg-[#E10600] animate-ping" />
              <span>WARPING TO HOMEPAGE...</span>
            </div>
          </div>

          {/* Bottom Kinetic Marquee Track */}
          <div className="w-full overflow-hidden whitespace-nowrap opacity-20 pointer-events-none pb-12">
            <div className="animate-marquee-right text-xs font-mono-tech uppercase tracking-[0.4em] text-white">
              AUTONOMOUS SYSTEMS // REASONING AGENTS // PREDICTIVE MODELING // COMPUTER VISION // NEURAL NETWORKS //&nbsp;
              AUTONOMOUS SYSTEMS // REASONING AGENTS // PREDICTIVE MODELING // COMPUTER VISION // NEURAL NETWORKS //&nbsp;
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          STAGE 3: TUNNEL HUD TELEMETRY & DEPTH METRICS
      ========================================================================= */}
      {stage === 'portal' && (
        <footer className="absolute bottom-0 left-0 right-0 z-40 p-4 sm:p-8 flex items-center justify-between text-[10px] sm:text-[11px] font-mono-tech text-white/60 tracking-[0.2em] uppercase pointer-events-none">
          <div className="flex items-center space-x-4">
            <div>
              <span className="text-[#E10600]">LOC:</span> <span>CHENNAI // TN</span>
            </div>
            <div className="hidden sm:inline">
              <span className="text-[#E10600]">COORD:</span> <span>13.08°N 80.27°E</span>
            </div>
          </div>

          {/* Right: Live Portal Depth Percentage */}
          <div className="flex items-center space-x-3">
            <span className="text-[#E10600]">PORTAL DEPTH:</span>
            <span className="text-white font-bold tabular-nums">
              {depthPercentage}%
            </span>
            <div className="w-20 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#E10600] shadow-[0_0_8px_#E10600] transition-all duration-75"
                style={{ width: `${depthPercentage}%` }}
              />
            </div>
          </div>
        </footer>
      )}

      {/* =========================================================================
          STAGE 4: EMERGENCE FLASH (SMOOTH TRANSITION INTO HERO SECTION)
      ========================================================================= */}
      <div
        className="absolute inset-0 bg-[#E10600] pointer-events-none z-50 transition-opacity duration-300"
        style={{
          opacity: emergenceFlashOpacity,
          mixBlendMode: 'screen',
        }}
      />
    </div>
  );
};
