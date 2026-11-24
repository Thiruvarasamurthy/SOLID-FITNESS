'use client';

import { useRef, useState, useSyncExternalStore, type ReactNode } from 'react';
import { tabIndexForKey } from '@/lib/tab-keyboard';

const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

export function GalleryTabs({
  items,
  label,
}: {
  items: { id: string; label: string; content: ReactNode }[];
  label: string;
}) {
  const enhanced = useSyncExternalStore(
    subscribe,
    clientSnapshot,
    serverSnapshot,
  );
  const [active, setActive] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  return (
    <div className="gallery-tabs">
      <div
        className="gallery-tab-list"
        role="tablist"
        aria-label={label}
        style={{ visibility: enhanced ? 'visible' : 'hidden' }}
      >
        {items.map((item, index) => (
          <button
            key={item.id}
            ref={(node) => {
              buttons.current[index] = node;
            }}
            type="button"
            role="tab"
            id={`gallery-tab-${item.id}`}
            aria-controls={`gallery-panel-${item.id}`}
            aria-selected={active === index}
            tabIndex={active === index ? 0 : -1}
            onClick={() => setActive(index)}
            onKeyDown={(event) => {
              const next = tabIndexForKey(event.key, index, items.length);
              if (next === null) return;
              event.preventDefault();
              setActive(next);
              buttons.current[next]?.focus();
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="gallery-panels">
        {items.map((item, index) => (
          <div
            key={item.id}
            id={`gallery-panel-${item.id}`}
            role={enhanced ? 'tabpanel' : undefined}
            aria-labelledby={enhanced ? `gallery-tab-${item.id}` : undefined}
            tabIndex={enhanced ? 0 : undefined}
            hidden={enhanced && active !== index}
          >
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
}
