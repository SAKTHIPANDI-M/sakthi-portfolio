import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if device supports hover/fine pointer
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable =
          target.closest('button') ||
          target.closest('a') ||
          target.closest('input') ||
          target.closest('select') ||
          target.closest('textarea') ||
          target.closest('[role="button"]') ||
          target.classList.contains('cursor-pointer');
        setIsPointer(!!isClickable);
      }
    };

    const onMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Center dot cursor */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        }}
      >
        <div
          className={`rounded-full transition-all duration-200 ${
            isPointer
              ? 'w-3 h-3 bg-[#FF1717] scale-125'
              : 'w-2 h-2 bg-white'
          }`}
        />
      </div>

      {/* Trailing Ring cursor */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 transition-all duration-150 ease-out"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        }}
      >
        <div
          className={`rounded-full border transition-all duration-300 ${
            isPointer
              ? 'w-10 h-10 border-[#E10600] bg-[#E10600]/10 scale-110'
              : 'w-7 h-7 border-white/30'
          }`}
        />
      </div>
    </>
  );
};
