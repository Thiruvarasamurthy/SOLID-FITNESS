'use client';

import { useEffect, type ReactNode } from 'react';
import { useAnimate } from 'framer-motion';

export function HeroEntrance({ children }: { children: ReactNode }) {
  const [scope, animate] = useAnimate();
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (preference.matches) return;
    const animation = animate(
      scope.current,
      { y: [16, 0] },
      { duration: 0.35, ease: 'easeOut' },
    );
    const stop = () => {
      if (preference.matches) {
        animation.stop();
        scope.current.style.transform = 'none';
      }
    };
    preference.addEventListener('change', stop);
    return () => {
      animation.stop();
      preference.removeEventListener('change', stop);
    };
  }, [animate, scope]);
  // Server HTML stays visible: no hidden initial state, including without JavaScript.
  return (
    <div ref={scope} className="hero-grid">
      {children}
    </div>
  );
}
