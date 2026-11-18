import { gymConfig } from '@/content/gym-config';
import { approvedTrainers } from '@/lib/trainers';

export function createContactLinks(
  contact: {
    phone: string | null;
    status: 'placeholder' | 'confirmed';
    whatsappMessage: string;
  },
  previewEnabled: boolean,
): { call: string | null; whatsapp: string | null } {
  const enabled = contact.status === 'confirmed' || previewEnabled;
  if (!enabled || !contact.phone || !/^\+[1-9]\d{7,14}$/.test(contact.phone)) {
    return { call: null, whatsapp: null };
  }
  return {
    call: `tel:${contact.phone}`,
    whatsapp: `https://wa.me/${contact.phone.slice(1)}?text=${encodeURIComponent(contact.whatsappMessage)}`,
  };
}

// Explicit opt-in, also required for preview builds made with NODE_ENV=production.
export const contactLinks = createContactLinks(
  gymConfig.contact,
  process.env.NEXT_PUBLIC_CONTACT_PREVIEW === 'true',
);

export function createWhatsAppLink(message: string): string | null {
  return createContactLinks(
    { ...gymConfig.contact, whatsappMessage: message },
    process.env.NEXT_PUBLIC_CONTACT_PREVIEW === 'true',
  ).whatsapp;
}

export function createPlanWhatsAppLink(months: number): string | null {
  if (!gymConfig.plans.some((plan) => plan.months === months)) return null;
  return createWhatsAppLink(
    gymConfig.contact.planMessage
      .replace('{months}', String(months))
      .replace('{name}', gymConfig.identity.name)
      .replace('{branch}', gymConfig.identity.branch),
  );
}

export function createProgramWhatsAppLink(programName: string): string | null {
  if (!gymConfig.programs.some((program) => program.name === programName)) {
    return null;
  }
  return createWhatsAppLink(
    gymConfig.contact.programMessage
      .replace('{name}', () => gymConfig.identity.name)
      .replace('{branch}', () => gymConfig.identity.branch)
      .replace('{program}', () => programName),
  );
}

export function createCoachingWhatsAppLink(trainerId: string): string | null {
  const trainer = approvedTrainers.find((entry) => entry.id === trainerId);
  if (!trainer) return null;
  return createWhatsAppLink(
    gymConfig.contact.coachingMessage
      .replace('{name}', () => gymConfig.identity.name)
      .replace('{branch}', () => gymConfig.identity.branch)
      .replace('{trainer}', () => trainer.name),
  );
}
