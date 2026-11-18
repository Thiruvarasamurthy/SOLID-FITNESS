'use client';

import { useEffect, type ReactNode } from 'react';
import { useAnimate } from 'framer-motion';

export function Reveal({
  children,
  as: Tag = 'div',
  className,
  id,
  labelledBy,
  delay = 0,
}: {
  children: ReactNode;
  as?: 'div' | 'h2' | 'article';
  className?: string;
  id?: string;
  labelledBy?: string;
  delay?: number;
}) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const element = scope.current as HTMLElement;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (preference.matches || !('IntersectionObserver' in window)) return;

    let animation: ReturnType<typeof animate> | undefined;
    let timeout: ReturnType<typeof setTimeout> | undefined;
    const restore = () => {
      animation?.stop();
      element.style.opacity = '1';
      element.style.transform = 'none';
      clearTimeout(timeout);
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      if (preference.matches || element.contains(document.activeElement))
        return;
      // Never hide content, even if Motion stops midway or fails to complete.
      timeout = setTimeout(restore, 450);
      try {
        animation = animate(
          element,
          { opacity: [0.95, 1], y: [16, 0] },
          {
            duration: 0.28,
            delay: Math.min(0.06, Math.max(0, delay)),
            ease: [0.23, 1, 0.32, 1],
          },
        );
        animation.then(restore, restore);
      } catch {
        restore();
      }
    });
    const skip = () => {
      observer.disconnect();
      restore();
    };
    const preferenceChanged = () => {
      if (preference.matches) skip();
    };
    observer.observe(element);
    element.addEventListener('focusin', skip);
    preference.addEventListener('change', preferenceChanged);
    return () => {
      skip();
      element.removeEventListener('focusin', skip);
      preference.removeEventListener('change', preferenceChanged);
    };
  }, [animate, delay, scope]);

  // No initial hidden styles: SSR, no-JS and failed hydration remain readable.
  return (
    <Tag ref={scope} id={id} aria-labelledby={labelledBy} className={className}>
      {children}
    </Tag>
  );
}
