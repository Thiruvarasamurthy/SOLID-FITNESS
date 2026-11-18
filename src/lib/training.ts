import { gymConfig } from '@/content/gym-config';

// Share the same visibility rule between the section and both navigation layouts.
export const showTraining =
  gymConfig.programs.length > 0 || process.env.NODE_ENV !== 'production';
