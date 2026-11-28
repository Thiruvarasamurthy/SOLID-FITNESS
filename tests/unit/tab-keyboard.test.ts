import { describe, expect, it } from 'vitest';
import { tabIndexForKey } from '@/lib/tab-keyboard';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { GalleryTabs } from '@/components/ui/gallery-tabs';
import { ClosingCta } from '@/components/sections/closing-cta';
import { RibbonFallback } from '@/components/motion/ribbon-fallback';

describe('horizontal gallery tab navigation', () => {
  it('wraps forward and backward', () => {
    expect(tabIndexForKey('ArrowRight', 2, 3)).toBe(0);
    expect(tabIndexForKey('ArrowLeft', 0, 3)).toBe(2);
  });
  it('supports Home and End', () => {
    expect(tabIndexForKey('Home', 2, 3)).toBe(0);
    expect(tabIndexForKey('End', 0, 3)).toBe(2);
  });
  it('leaves Tab, vertical arrows and unrelated keys to the browser', () => {
    for (const key of ['Tab', 'ArrowUp', 'ArrowDown', 'Escape', 'a'])
      expect(tabIndexForKey(key, 1, 3)).toBeNull();
  });
  it('handles empty and single item galleries', () => {
    expect(tabIndexForKey('End', 0, 0)).toBeNull();
    expect(tabIndexForKey('ArrowLeft', 0, 1)).toBe(0);
  });
  it('keeps every photo in ordinary visible HTML until hydration succeeds', () => {
    const html = renderToStaticMarkup(
      createElement(GalleryTabs, {
        label: 'Fixture gallery',
        items: [
          { id: 'one', label: 'Photo 1', content: 'First fixture' },
          { id: 'two', label: 'Photo 2', content: 'Second fixture' },
        ],
      }),
    );
    expect(html).toContain('visibility:hidden');
    expect(html).toContain('aria-controls="gallery-panel-two"');
    expect(html).not.toContain('<noscript>');
    expect(html).not.toMatch(/\shidden(?:=|>|\s)/);
    expect(html.match(/First fixture/g)).toHaveLength(1);
    expect(html.match(/Second fixture/g)).toHaveLength(1);
  });
  it('keeps closing actions real DOM links and ribbon paint IDs distinct', () => {
    const html = renderToStaticMarkup(
      createElement(
        'div',
        {},
        createElement(RibbonFallback),
        createElement(ClosingCta),
      ),
    );
    expect(html).toContain('href="#contact"');
    expect(html).not.toContain('<canvas');
  });
});
