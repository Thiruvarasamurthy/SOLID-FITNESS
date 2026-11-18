import { gymConfig } from '@/content/gym-config';

export const approvedTestimonials = gymConfig.testimonials.filter(
  (story) =>
    story.permission === true &&
    story.quote.trim().length > 0 &&
    story.displayName.trim().length > 0 &&
    story.source.trim().length > 0,
);

export const showTestimonials =
  approvedTestimonials.length > 0 || process.env.NODE_ENV !== 'production';
