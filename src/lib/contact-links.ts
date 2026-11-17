import { gymConfig } from '@/content/gym-config';

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
