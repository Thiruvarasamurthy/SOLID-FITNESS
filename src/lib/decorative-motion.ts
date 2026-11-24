export type MotionCapabilities = {
  reducedMotion: boolean;
  saveData?: boolean;
  memory?: number;
  cores?: number;
};

export function permitsDecorativeMotion({
  reducedMotion,
  saveData,
  memory,
  cores,
}: MotionCapabilities) {
  if (reducedMotion || saveData) return false;
  const known = [memory, cores].filter(
    (value): value is number => value !== undefined,
  );
  return (
    known.length > 0 &&
    known.every((value) => Number.isFinite(value) && value > 2)
  );
}

export function renderScale(width: number, dpr: number) {
  const safeDpr = Number.isFinite(dpr) && dpr > 0 ? dpr : 1;
  return width < 768 ? Math.min(safeDpr, 1.75) * 0.5 : Math.min(safeDpr, 2);
}

export function ribbonScrollOffset(progress: number) {
  return (
    Math.min(1, Math.max(0, Number.isFinite(progress) ? progress : 0)) * 0.08
  );
}

export const MAX_PARTICLES = 40;
export const PARTICLE_LIFETIME = 420;
export type TrailParticle = { x: number; y: number; born: number };

export function advanceParticles(
  particles: TrailParticle[],
  now: number,
  next?: TrailParticle,
) {
  const alive = particles.filter(
    (p) => now >= p.born && now - p.born < PARTICLE_LIFETIME,
  );
  if (next) alive.push(next);
  return alive.slice(-MAX_PARTICLES);
}
