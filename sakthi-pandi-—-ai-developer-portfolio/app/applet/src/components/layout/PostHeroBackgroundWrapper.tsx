import React from 'react';
import ColorBends from '../ui/ColorBends';

interface PostHeroBackgroundWrapperProps {
  children: React.ReactNode;
}

/**
 * PostHeroBackgroundWrapper
 * 
 * Houses the React Bits ColorBends animated background exclusively for post-hero sections
 * (About, Skills, AI Workspace, Projects, Process, Certifications, Contact).
 * 
 * Features:
 * - Uses a single persistent WebGL canvas pinned to the viewport via sticky positioning,
 *   preventing multiple renderer instances and preserving 60fps performance.
 * - Leaves Hero section 100% untouched.
 * - Deep cyber-tech palette (#E10600, #8B0000, #240000) over near-black #050507 base.
 * - Large, vivid, soft-edged red ribbons flowing smoothly across the dark background.
 * - pointer-events-none on all decorative layers so scrolling, clicks, and hovers work seamlessly.
 */
export const PostHeroBackgroundWrapper: React.FC<PostHeroBackgroundWrapperProps> = ({ children }) => {
  return (
    <div className="relative w-full bg-[#050507]">
      {/* Sticky viewport-pinned decorative background layer */}
      <div
        aria-hidden="true"
        className="pointer-events-none sticky top-0 left-0 w-full h-screen overflow-hidden z-0"
      >
        <ColorBends
          colors={['#E10600', '#8B0000', '#240000', '#E10600']}
          rotation={50}
          speed={0.15}
          scale={1.05}
          frequency={0.85}
          warpStrength={1.0}
          mouseInfluence={0.25}
          noise={0.025}
          parallax={0.35}
          iterations={1}
          intensity={1.65}
          bandWidth={4.8}
          transparent={false}
          backgroundColor="#050507"
          className="w-full h-full"
        />

        {/* Subtle top edge transition seam from Hero section border */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#050505] to-transparent pointer-events-none" />
      </div>

      {/* Content container aligned directly over the sticky background canvas */}
      <div className="relative z-10 -mt-[100vh]">
        {children}
      </div>
    </div>
  );
};
