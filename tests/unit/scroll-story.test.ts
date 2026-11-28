import { describe, expect, it } from 'vitest';
import {
  boundedProgress,
  storyIndex,
  revealedWordCount,
  canPinStory,
} from '@/lib/scroll-story';
import { gymConfig } from '@/content/gym-config';

describe('story progress and theme math', () => {
  it('clamps invalid and out-of-range progress', () => {
    expect(boundedProgress(NaN)).toBe(0);
    expect(boundedProgress(-1)).toBe(0);
    expect(boundedProgress(3)).toBe(1);
  });
  it('maps progress to either two or three available panels', () => {
    expect(storyIndex(0.4, 3)).toBe(1);
    expect(storyIndex(0.4, 2)).toBe(0);
    expect(storyIndex(1, 2)).toBe(1);
    expect(storyIndex(1, 0)).toBe(0);
  });
  it('selects one of the available story panels', () => {
    expect(storyIndex(0.4, 3)).toBe(1);
    expect(storyIndex(0.4, 2)).toBe(0);
    expect(storyIndex(1, 2)).toBe(1);
    expect(storyIndex(1, 0)).toBe(0);
  });
  it('bounds word emphasis without removing text', () => {
    expect(revealedWordCount(0, 4)).toBe(0);
    expect(revealedWordCount(0.5, 4)).toBe(2);
    expect(revealedWordCount(2, 4)).toBe(4);
  });
  it('refuses pinning at phone widths and short viewports', () => {
    expect(canPinStory(360, 800, 560)).toBe(false);
    expect(canPinStory(1280, 700, 560)).toBe(false);
    expect(canPinStory(1280, 900, 560)).toBe(true);
  });
  it('does not insert an unapproved statement or programs', () => {
    expect(gymConfig.statement).toBeNull();
    expect(gymConfig.programs).toEqual([]);
  });
});

// SSR checks exercise the actual components without claiming browser interaction.
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { ScrollStory } from '@/components/sections/scroll-story';
import { StatementReveal } from '@/components/motion/statement-reveal';

describe('story server fallbacks', () => {
  it('renders the labelled empty-training preview and all native plan choices', () => {
    const html = renderToStaticMarkup(createElement(ScrollStory));
    expect(html).toContain(gymConfig.training.placeholder);
    expect(html).toContain('data-pinned="false"');
    expect(html.match(/name="story-duration"/g)).toHaveLength(4);
    expect(html).not.toContain('inert=""');
    for (const total of ['₹2,599', '₹3,999', '₹5,999', '₹10,999'])
      expect(html).toContain(total);
  });
  it('renders a supplied statement fully readable before effects execute', () => {
    const html = renderToStaticMarkup(
      createElement(StatementReveal, { text: 'Statement test fixture' }),
    );
    expect(html).toContain('class="sr-only">Statement test fixture');
    expect(html.match(/data-word=/g)).toHaveLength(3);
    expect(html).not.toContain('opacity:0');
    expect(html).not.toContain('visibility:hidden');
  });
});
