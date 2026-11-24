'use client';

import { useEffect, useRef } from 'react';
import { useScroll } from 'framer-motion';
import { revealedWordCount } from '@/lib/scroll-story';

export function StatementReveal({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 90%', 'end 45%'],
  });
  useEffect(() => {
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const words = [
      ...(ref.current?.querySelectorAll<HTMLElement>('[data-word]') ?? []),
    ];
    const reset = () =>
      words.forEach((word) => word.style.removeProperty('--word-ink'));
    const stop = scrollYProgress.on('change', (progress) => {
      if (preference.matches) return reset();
      const count = revealedWordCount(progress, words.length);
      words.forEach((word, index) =>
        word.style.setProperty(
          '--word-ink',
          index < count ? 'var(--foreground)' : 'var(--muted)',
        ),
      );
    });
    preference.addEventListener('change', reset);
    return () => {
      stop();
      reset();
      preference.removeEventListener('change', reset);
    };
  }, [scrollYProgress]);
  return (
    <p ref={ref} className="statement">
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text
          .trim()
          .split(/\s+/)
          .map((word, index) => (
            <span key={index} data-word>
              {word}{' '}
            </span>
          ))}
      </span>
    </p>
  );
}
