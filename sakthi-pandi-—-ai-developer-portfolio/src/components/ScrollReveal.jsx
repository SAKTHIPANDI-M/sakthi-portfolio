import React, { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ScrollReveal.css';

// Ensure ScrollTrigger is registered with GSAP
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const ScrollReveal = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = '',
  textClassName = '',
  rotationEnd = 'bottom bottom',
  wordAnimationEnd = 'bottom bottom',
  as: Component = 'div',
  textAs: TextComponent = 'p',
}) => {
  const containerRef = useRef(null);

  // Helper to process nodes into words while keeping non-string children intact
  const splitContent = useMemo(() => {
    const processChild = (child, keyPrefix = 'w') => {
      if (typeof child === 'string') {
        const tokens = child.split(/(\s+)/);
        return tokens.map((token, index) => {
          if (token.match(/^\s+$/)) {
            return token;
          }
          return (
            <span className="word" key={`${keyPrefix}-${index}`}>
              {token}
            </span>
          );
        });
      }
      if (Array.isArray(child)) {
        return child.map((c, i) => processChild(c, `${keyPrefix}-${i}`));
      }
      return child;
    };

    return processChild(children);
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Check accessibility: prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      return;
    }

    const scroller =
      scrollContainerRef && scrollContainerRef.current
        ? scrollContainerRef.current
        : window;

    // Scoped GSAP context to ensure cleanup does not kill unrelated ScrollTriggers
    const ctx = gsap.context(() => {
      // Rotation animation on the container
      if (baseRotation !== 0) {
        gsap.fromTo(
          el,
          { transformOrigin: '0% 50%', rotate: baseRotation },
          {
            ease: 'none',
            rotate: 0,
            scrollTrigger: {
              trigger: el,
              scroller,
              start: 'top bottom',
              end: rotationEnd,
              scrub: true,
            },
          }
        );
      }

      // Word-level opacity and blur animations
      const wordElements = el.querySelectorAll('.word');
      if (wordElements.length > 0) {
        gsap.fromTo(
          wordElements,
          { opacity: baseOpacity, willChange: 'opacity' },
          {
            ease: 'none',
            opacity: 1,
            stagger: 0.05,
            scrollTrigger: {
              trigger: el,
              scroller,
              start: 'top bottom+=20%',
              end: wordAnimationEnd,
              scrub: true,
            },
          }
        );

        if (enableBlur && blurStrength > 0) {
          gsap.fromTo(
            wordElements,
            { filter: `blur(${blurStrength}px)` },
            {
              ease: 'none',
              filter: 'blur(0px)',
              stagger: 0.05,
              scrollTrigger: {
                trigger: el,
                scroller,
                start: 'top bottom+=20%',
                end: wordAnimationEnd,
                scrub: true,
              },
            }
          );
        }
      }
    }, containerRef);

    return () => {
      // Scoped cleanup ensures other animations & ScrollTriggers are not affected
      ctx.revert();
    };
  }, [
    scrollContainerRef,
    enableBlur,
    baseRotation,
    baseOpacity,
    rotationEnd,
    wordAnimationEnd,
    blurStrength,
  ]);

  return (
    <Component ref={containerRef} className={`scroll-reveal ${containerClassName}`}>
      <TextComponent className={`scroll-reveal-text ${textClassName}`}>
        {splitContent}
      </TextComponent>
    </Component>
  );
};

export default ScrollReveal;
