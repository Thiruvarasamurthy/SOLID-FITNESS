import { gymConfig } from '@/content/gym-config';

// Approval covers the person's identity, role, photograph and permission to publish.
export const approvedTrainers = gymConfig.trainers.filter(
  (trainer) => trainer.approved === true,
);
export const showTrainers =
  approvedTrainers.length > 0 || process.env.NODE_ENV !== 'production';
