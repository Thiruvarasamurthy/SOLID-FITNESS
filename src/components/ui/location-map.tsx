'use client';

import { useCallback, useState } from 'react';

export function LocationMap({
  embedUrl,
  title,
  placeholder,
}: {
  embedUrl: string | null;
  title: string;
  placeholder: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const focusMap = useCallback((node: HTMLIFrameElement | null) => {
    // Transfer focus at replacement, never on an asynchronous network load.
    node?.focus({ preventScroll: true });
  }, []);
  return (
    <div className="location-map">
      {embedUrl ? (
        loaded ? (
          <iframe
            src={embedUrl}
            title={title}
            referrerPolicy="no-referrer"
            allowFullScreen
            tabIndex={0}
            ref={focusMap}
          />
        ) : (
          <div className="map-placeholder">
            <p>Loading the map connects to Google Maps.</p>
            <button
              type="button"
              className="button"
              onClick={() => setLoaded(true)}
            >
              Load map
            </button>
            <noscript>
              Enable JavaScript to load the map, or use the address and
              directions link when available.
            </noscript>
          </div>
        )
      ) : (
        <div className="map-placeholder">
          <p>{placeholder}</p>
        </div>
      )}
    </div>
  );
}
