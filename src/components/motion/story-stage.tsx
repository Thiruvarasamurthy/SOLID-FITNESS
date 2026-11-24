'use client';

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';
import { useScroll } from 'framer-motion';
import { canPinStory, storyIndex, storyWash } from '@/lib/scroll-story';

type StoryPanel = { id: string; label: string; content: ReactNode };

export function StoryStage({
  panels,
  heading,
}: {
  panels: StoryPanel[];
  heading: string;
}) {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const enhanced = useRef(false);
  const reduced = useRef(true);
  const [pinned, setPinned] = useState(false);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({
    target: track,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const root = section.current;
    const target = track.current;
    if (!root || !target) return;
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const header = document.querySelector<HTMLElement>('.site-header');
    let frame = 0;
    let headerFrame = 0;
    const headerTheme = () => {
      if (!header) return;
      const box = root.getBoundingClientRect();
      const edge = header.getBoundingClientRect().bottom;
      if (box.top <= edge && box.bottom > edge) header.dataset.theme = 'light';
      else delete header.dataset.theme;
    };
    const scrollHeader = () => {
      cancelAnimationFrame(headerFrame);
      headerFrame = requestAnimationFrame(headerTheme);
    };
    const measure = () => {
      reduced.current = preference.matches;
      const panelNodes = [
        ...target.querySelectorAll<HTMLElement>('.story-panel'),
      ];
      panelNodes.forEach((node) => {
        node.style.minHeight = '0';
      });
      const height = Math.max(
        560,
        ...panelNodes.map((node) => node.scrollHeight),
        target.querySelector<HTMLElement>('.story-nav')?.scrollHeight ?? 0,
      );
      panelNodes.forEach((node) => {
        node.style.removeProperty('min-height');
      });
      const enabled =
        !preference.matches &&
        height <= 560 &&
        canPinStory(innerWidth, innerHeight, height);
      target.style.setProperty('--story-step', `560px`);
      // Select the focused panel in the same React batch that enables pinning.
      // Otherwise resize/hydration can make its controls inert before scroll runs.
      if (enabled) {
        const focusedIndex = panelNodes.findIndex((node) =>
          node.contains(document.activeElement),
        );
        if (focusedIndex !== -1) setActive(focusedIndex);
      }
      enhanced.current = enabled;
      setPinned(enabled);
      if (preference.matches) root.style.removeProperty('--story-wash');
      headerTheme();
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    const resize = new ResizeObserver(schedule);
    target
      .querySelectorAll('.story-panel, .story-nav')
      .forEach((node) => resize.observe(node));
    const unsubscribe = scrollYProgress.on('change', (progress) => {
      if (!reduced.current)
        root.style.setProperty('--story-wash', storyWash(progress));
      // Never let scrolling hide a focused radio, CTA or navigation choice.
      if (enhanced.current && !root.contains(document.activeElement))
        setActive(storyIndex(progress, panels.length));
    });
    schedule();
    window.addEventListener('resize', schedule);
    window.addEventListener('scroll', scrollHeader, { passive: true });
    preference.addEventListener('change', schedule);
    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(headerFrame);
      resize.disconnect();
      unsubscribe();
      window.removeEventListener('resize', schedule);
      window.removeEventListener('scroll', scrollHeader);
      preference.removeEventListener('change', schedule);
      root.style.removeProperty('--story-wash');
      if (header) delete header.dataset.theme;
    };
  }, [panels.length, scrollYProgress]);

  return (
    <section
      ref={section}
      className="scroll-story"
      data-theme="light"
      aria-labelledby="story-title"
    >
      <h2 id="story-title">{heading}</h2>
      <div
        ref={track}
        className="story-track"
        data-pinned={pinned}
        style={{ '--story-count': panels.length } as CSSProperties}
      >
        <div className="story-stage">
          <nav className="story-nav" aria-label={heading}>
            {panels.map((panel, index) => (
              <a
                key={panel.id}
                href={`#${panel.id}`}
                aria-current={pinned && active === index ? 'step' : undefined}
                onClick={(event) => {
                  if (!pinned) return;
                  event.preventDefault();
                  setActive(index);
                }}
              >
                {panel.label}
              </a>
            ))}
          </nav>
          <div className="story-panels">
            {panels.map((panel, index) => (
              <section
                key={panel.id}
                id={panel.id}
                className="story-panel"
                data-active={active === index}
                aria-label={panel.label}
                aria-hidden={pinned && active !== index ? true : undefined}
                inert={pinned && active !== index ? true : undefined}
              >
                {panel.content}
              </section>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
