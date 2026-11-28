'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useScroll } from 'framer-motion';
import { permitsDecorativeMotion } from '@/lib/decorative-motion';
import type { createRibbonRenderer } from './ribbon-renderer';
import type { createCursorTrail } from './cursor-trail';

type Connection = EventTarget & { saveData?: boolean };
type DeviceNavigator = Navigator & {
  deviceMemory?: number;
  connection?: Connection;
};

export function RibbonExperience({
  children,
  labels,
}: {
  children: ReactNode;
  labels: { pause: string; resume: string; unavailable: string };
}) {
  const host = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const paused = useRef(false);
  const toggle = useRef<(paused: boolean) => void>(() => {});
  const [isPaused, setPaused] = useState(false);
  const [status, setStatus] = useState<'idle' | 'ready' | 'static'>('idle');
  const { scrollYProgress } = useScroll({
    target: host,
    offset: ['start end', 'end start'],
  });

  useEffect(() => {
    const element = host.current;
    const drawing = canvas.current;
    if (!element || !drawing) return;
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const device = navigator as DeviceNavigator;
    let destroyed = false;
    let retired = false;
    let pending = false;
    let visible = false;
    let idleId: number | undefined;
    let context: WebGL2RenderingContext | null = null;
    let renderer: ReturnType<typeof createRibbonRenderer> | undefined;
    let cursor: ReturnType<typeof createCursorTrail> | undefined;
    const allowed = () =>
      permitsDecorativeMotion({
        reducedMotion: preference.matches,
        saveData: device.connection?.saveData,
        memory: device.deviceMemory,
        cores: device.hardwareConcurrency,
      });
    const cancelIdle = () => {
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      idleId = undefined;
    };
    const stop = () => {
      cancelIdle();
      element.removeAttribute('data-ribbon-ready');
      renderer?.dispose();
      cursor?.dispose();
      if (!renderer) context?.getExtension('WEBGL_lose_context')?.loseContext();
      renderer = undefined;
      cursor = undefined;
      context = null;
    };
    const fail = () => {
      retired = true;
      stop();
      if (!destroyed) setStatus('static');
    };
    const sync = () => {
      const running =
        visible && !document.hidden && !paused.current && allowed();
      renderer?.setRunning(running);
      cursor?.setRunning(running);
    };
    async function enhance() {
      idleId = undefined;
      if (
        destroyed ||
        retired ||
        pending ||
        renderer ||
        !visible ||
        document.hidden ||
        !allowed()
      )
        return;
      pending = true;
      try {
        context = drawing!.getContext('webgl2', {
          alpha: true,
          antialias: false,
          powerPreference: 'low-power',
          failIfMajorPerformanceCaveat: true,
        });
        if (!context) {
          retired = true;
          return;
        }
        // No Three import or preload until idle, visible and all capability checks pass.
        const { createRibbonRenderer } = await import('./ribbon-renderer');
        if (destroyed || retired || !allowed()) {
          stop();
          return;
        }
        // A chunk may finish after the hero leaves view. Keep its context idle
        // until a later visible idle callback, without drawing a hidden frame.
        if (!visible || document.hidden) return;
        renderer = createRibbonRenderer(drawing!, context, fail);
        if (retired || destroyed) {
          stop();
          return;
        }
        renderer.setProgress(scrollYProgress.get());
        element!.setAttribute('data-ribbon-ready', 'true');
        setStatus('ready');
        sync();
        // Cursor enhancement is optional and must never take down working ribbons.
        if (
          matchMedia(
            '(min-width: 1024px) and (hover: hover) and (pointer: fine)',
          ).matches
        ) {
          try {
            const { createCursorTrail } = await import('./cursor-trail');
            if (!destroyed && !retired && allowed()) {
              cursor = createCursorTrail();
              sync();
            }
          } catch {
            /* Static native cursor remains usable. */
          }
        }
      } catch {
        fail();
      } finally {
        pending = false;
      }
    }
    function schedule() {
      sync();
      if (
        destroyed ||
        retired ||
        pending ||
        renderer ||
        !visible ||
        document.hidden ||
        !allowed() ||
        idleId !== undefined
      )
        return;
      if ('requestIdleCallback' in window)
        idleId = window.requestIdleCallback(() => {
          void enhance();
        });
      // Without an idle callback API, retain the static fallback.
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (!visible) cancelIdle();
        schedule();
      },
      { threshold: 0 },
    );
    const visibility = () => {
      if (document.hidden) cancelIdle();
      schedule();
    };
    const changed = () => {
      if (!allowed()) {
        // Never restart automatically after the visitor requests reduced motion/data saving.
        retired = true;
        const wasEnhanced = !!renderer;
        stop();
        if (wasEnhanced) setStatus('static');
      }
    };
    const unsubscribe = scrollYProgress.on('change', (value) =>
      renderer?.setProgress(value),
    );
    toggle.current = (value) => {
      paused.current = value;
      sync();
    };
    observer.observe(element);
    document.addEventListener('visibilitychange', visibility);
    preference.addEventListener('change', changed);
    device.connection?.addEventListener('change', changed);
    return () => {
      destroyed = true;
      retired = true;
      observer.disconnect();
      unsubscribe();
      document.removeEventListener('visibilitychange', visibility);
      preference.removeEventListener('change', changed);
      device.connection?.removeEventListener('change', changed);
      toggle.current = () => {};
      stop();
    };
  }, [scrollYProgress]);

  return (
    <div ref={host} className="ribbon-art" data-motion-paused={isPaused}>
      {children}
      <canvas ref={canvas} className="ribbon-canvas" aria-hidden="true" />
      <button
        type="button"
        className="motion-toggle button button-secondary"
        hidden={status === 'idle'}
        aria-disabled={status === 'static' || undefined}
        onClick={() => {
          if (status !== 'ready') return;
          const value = !isPaused;
          toggle.current(value);
          setPaused(value);
        }}
      >
        {status === 'static'
          ? labels.unavailable
          : isPaused
            ? labels.resume
            : labels.pause}
      </button>
    </div>
  );
}
