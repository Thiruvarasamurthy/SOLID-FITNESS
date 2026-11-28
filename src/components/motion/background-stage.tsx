'use client';

import Image from 'next/image';
import {
  useEffect,
  useState,
  type CSSProperties,
} from 'react';
import { useScroll, useTransform } from 'framer-motion';
import { backgrounds } from '@/content/backgrounds';

export function BackgroundStage() {
  const [mounted, setMounted] = useState<ReadonlySet<string>>(
    () => new Set(['home']),
  );
  const [active, setActive] = useState('home');
  const [capabilities, setCapabilities] = useState<{
    desktop: boolean;
    finePointer: boolean;
    motionAllowed: boolean;
  }>({ desktop: false, finePointer: false, motionAllowed: true });

  const scroll = useScroll();
  const translateY = useTransform(
    scroll.scrollYProgress,
    [0, 1],
    ['0%', '3vh'],
  );

  useEffect(() => {
    const checkCapabilities = () => {
      setCapabilities({
        desktop: window.matchMedia('(min-width: 1024px)').matches,
        finePointer: window.matchMedia('(pointer: fine)').matches,
        motionAllowed: !window.matchMedia(
          '(prefers-reduced-motion: reduce)',
        ).matches,
      });
    };
    checkCapabilities();
    const mqDesktop = window.matchMedia('(min-width: 1024px)');
    const mqPointer = window.matchMedia('(pointer: fine)');
    const mqMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    mqDesktop.addEventListener('change', checkCapabilities);
    mqPointer.addEventListener('change', checkCapabilities);
    mqMotion.addEventListener('change', checkCapabilities);
    window.addEventListener('resize', checkCapabilities);
    return () => {
      mqDesktop.removeEventListener('change', checkCapabilities);
      mqPointer.removeEventListener('change', checkCapabilities);
      mqMotion.removeEventListener('change', checkCapabilities);
      window.removeEventListener('resize', checkCapabilities);
    };
  }, []);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const sections =
      document.querySelectorAll<HTMLElement>('[data-bg-section]');
    let near: IntersectionObserver;
    let middle: IntersectionObserver;
    function observe() {
      near?.disconnect();
      middle?.disconnect();
      const height = document.documentElement.clientHeight;
      near = new IntersectionObserver(
        (entries) => {
          const arriving = entries.filter((entry) => entry.isIntersecting);
          if (!arriving.length) return;
          setMounted(
            (previous) =>
              new Set([
                ...previous,
                ...arriving.map(({ target }) =>
                  target.getAttribute('data-bg-section')!,
                ),
              ]),
          );
          arriving.forEach(({ target }) => near.unobserve(target));
        },
        { rootMargin: `${height * 1.5}px 0px` },
      );
      middle = new IntersectionObserver(
        (entries) => {
          for (const { target, isIntersecting } of entries) {
            if (isIntersecting)
              setActive(target.getAttribute('data-bg-section')!);
          }
        },
        { rootMargin: '-45% 0px -45% 0px' },
      );
      sections.forEach((section) => {
        near.observe(section);
        middle.observe(section);
      });
    }
    observe();
    window.addEventListener('resize', observe);
    return () => {
      near.disconnect();
      middle.disconnect();
      window.removeEventListener('resize', observe);
    };
  }, []);

  const shouldParallax =
    capabilities.desktop &&
    capabilities.finePointer &&
    capabilities.motionAllowed;

  return (
    <div className="background-stage" aria-hidden="true" data-active={active}>
      {backgrounds
        .filter(({ section }) => mounted.has(section))
        .map((image) => {
          const isActive = active === image.section;
          return (
            <Image
              key={image.key}
              src={image.src}
              alt=""
              fill
              sizes="100vw"
              quality={70}
              preload={image.key === 'hero'}
              loading={image.key === 'hero' ? undefined : 'eager'}
            data-active={active === image.section}
            data-parallax={shouldParallax && isActive || undefined}
            style={{
              '--bg-position': image.position,
              '--bg-mobile-position': image.mobilePosition,
              ...(shouldParallax && isActive && {
                transform: translateY,
                willChange: 'transform',
              }),
            } as CSSProperties}
            />
          );
        })}
    </div>
  );
}
