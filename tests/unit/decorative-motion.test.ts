import { describe, expect, it } from 'vitest';
import {
  advanceParticles,
  MAX_PARTICLES,
  permitsDecorativeMotion,
  renderScale,
  ribbonScrollOffset,
} from '@/lib/decorative-motion';

describe('decorative motion capability policy', () => {
  it.each([
    [{ reducedMotion: true, memory: 8, cores: 8 }, false],
    [{ reducedMotion: false, saveData: true, cores: 8 }, false],
    [{ reducedMotion: false, memory: 2, cores: 8 }, false],
    [{ reducedMotion: false, memory: 8, cores: 2 }, false],
    [{ reducedMotion: false }, false],
    [{ reducedMotion: false, cores: NaN }, false],
    [{ reducedMotion: false, cores: 0 }, false],
    [{ reducedMotion: false, memory: 4, cores: 4 }, true],
    [{ reducedMotion: false, cores: 4 }, true],
  ])('guards capability input %j', (input, expected) => {
    expect(permitsDecorativeMotion(input)).toBe(expected);
  });
});

describe('resolution and scroll bounds', () => {
  it('caps mobile DPR before halving both dimensions', () => {
    expect(renderScale(360, 3)).toBe(0.875);
    expect(renderScale(767, 1)).toBe(0.5);
    expect(renderScale(768, 3)).toBe(2);
    expect(renderScale(1280, 1)).toBe(1);
    expect(renderScale(360, NaN)).toBe(0.5);
  });
  it('constrains scroll to a small finite offset', () => {
    expect(ribbonScrollOffset(-1)).toBe(0);
    expect(ribbonScrollOffset(0.5)).toBe(0.04);
    expect(ribbonScrollOffset(2)).toBe(0.08);
    expect(ribbonScrollOffset(NaN)).toBe(0);
  });
});

describe('cursor resource limits', () => {
  it('caps sustained pointer input at 40 particles and retains the newest', () => {
    let particles: { x: number; y: number; born: number }[] = [];
    for (let i = 0; i < 100; i++)
      particles = advanceParticles(particles, i, { x: i, y: 0, born: i });
    expect(particles).toHaveLength(MAX_PARTICLES);
    expect(particles[0].x).toBe(60);
    expect(particles.at(-1)?.x).toBe(99);
  });
  it('expires all particles after 420ms, including after a tab pause', () => {
    const particles = [{ x: 1, y: 2, born: 100 }];
    expect(advanceParticles(particles, 519)).toHaveLength(1);
    expect(advanceParticles(particles, 520)).toEqual([]);
    expect(advanceParticles(particles, 5000)).toEqual([]);
    expect(particles).toHaveLength(1);
  });
});
