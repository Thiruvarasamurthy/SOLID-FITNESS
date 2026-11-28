type BackgroundKey = 'hero' | 'training' | 'plans' | 'questions' | 'visit' | 'closing';
type BackgroundSection = 'home' | 'story' | 'pricing' | 'faq' | 'location' | 'closing';

function background(key: BackgroundKey, section: BackgroundSection) {
  return {
    key,
    src: `/images/bg/${key}.webp`,
    width: 1672,
    height: 941,
    kind: 'ai-generated',
    position: 'right center',
    mobilePosition: '75% center',
    section,
  } as const;
}

export const backgrounds = [
  background('hero', 'home'),
  background('training', 'story'),
  background('plans', 'pricing'),
  background('questions', 'faq'),
  background('visit', 'location'),
  background('closing', 'closing'),
] as const;
