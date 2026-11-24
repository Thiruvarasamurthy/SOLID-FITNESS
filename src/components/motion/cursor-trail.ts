import {
  advanceParticles,
  PARTICLE_LIFETIME,
  type TrailParticle,
} from '@/lib/decorative-motion';

/** Called only after capability approval, never at module evaluation. */
export function createCursorTrail() {
  const media = matchMedia(
    '(min-width: 1024px) and (hover: hover) and (pointer: fine)',
  );
  const canvas = document.createElement('canvas');
  canvas.className = 'decorative-cursor';
  canvas.setAttribute('aria-hidden', 'true');
  const ctx = canvas.getContext('2d');
  if (!ctx) return { setRunning: () => {}, dispose: () => {} };
  document.body.append(canvas);
  let active = false;
  let frame = 0;
  let particles: TrailParticle[] = [];
  let pointer: { x: number; y: number } | null = null;
  let ring = { x: 0, y: 0 };
  let lastEmission = 0;
  let lastFrame = 0;
  let disposed = false;

  function clear() {
    cancelAnimationFrame(frame);
    frame = 0;
    particles = [];
    pointer = null;
    ctx!.clearRect(0, 0, innerWidth, innerHeight);
  }
  function resize() {
    clear();
    const dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(innerWidth * dpr);
    canvas.height = Math.round(innerHeight * dpr);
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  function draw(now: number) {
    frame = 0;
    if (!active || disposed || !media.matches || document.hidden || !pointer)
      return clear();
    ctx!.clearRect(0, 0, innerWidth, innerHeight);
    particles = advanceParticles(particles, now);
    ctx!.globalCompositeOperation = 'lighter';
    for (const p of particles) {
      const life = 1 - (now - p.born) / PARTICLE_LIFETIME;
      const glow = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, 6);
      glow.addColorStop(0, `rgba(255,77,77,${life * 0.35})`);
      glow.addColorStop(1, 'rgba(226,27,35,0)');
      ctx!.fillStyle = glow;
      ctx!.fillRect(p.x - 6, p.y - 6, 12, 12);
    }
    ctx!.globalCompositeOperation = 'source-over';
    const blend = 1 - Math.exp(-Math.min(now - lastFrame, 50) / 45);
    lastFrame = now;
    ring.x += (pointer.x - ring.x) * blend;
    ring.y += (pointer.y - ring.y) * blend;
    ctx!.strokeStyle = 'rgba(245,242,235,0.45)';
    ctx!.lineWidth = 1;
    ctx!.beginPath();
    ctx!.arc(ring.x, ring.y, 9, 0, Math.PI * 2);
    ctx!.stroke();
    if (
      particles.length ||
      Math.hypot(pointer.x - ring.x, pointer.y - ring.y) > 0.1
    )
      frame = requestAnimationFrame(draw);
  }
  function move(event: PointerEvent) {
    if (
      !active ||
      !media.matches ||
      document.hidden ||
      event.pointerType !== 'mouse'
    )
      return;
    // Keep decorative pixels off actions, focused controls and the enquiry area.
    const target = event.target instanceof Element ? event.target : null;
    if (
      target?.closest(
        'a, button, input, select, textarea, summary, #contact, .sticky-whatsapp',
      ) ||
      document.querySelector(':focus-visible')
    )
      return clear();
    const now = performance.now();
    if (!pointer) {
      ring = { x: event.clientX, y: event.clientY };
      lastFrame = now;
    }
    pointer = { x: event.clientX, y: event.clientY };
    if (now - lastEmission >= 12) {
      particles = advanceParticles(particles, now, { ...pointer, born: now });
      lastEmission = now;
    }
    if (!frame) frame = requestAnimationFrame(draw);
  }
  function key(event: KeyboardEvent) {
    if (event.key === 'Tab') clear();
  }
  resize();
  window.addEventListener('resize', resize);
  window.addEventListener('pointermove', move, { passive: true });
  document.documentElement.addEventListener('pointerleave', clear);
  window.addEventListener('blur', clear);
  window.addEventListener('keydown', key);
  document.addEventListener('focusin', clear);
  window.addEventListener('scroll', clear, { passive: true });
  media.addEventListener('change', clear);
  return {
    setRunning(running: boolean) {
      active = running;
      if (!running) clear();
    },
    dispose() {
      disposed = true;
      clear();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('pointerleave', clear);
      window.removeEventListener('blur', clear);
      window.removeEventListener('keydown', key);
      document.removeEventListener('focusin', clear);
      window.removeEventListener('scroll', clear);
      media.removeEventListener('change', clear);
      canvas.remove();
    },
  };
}
