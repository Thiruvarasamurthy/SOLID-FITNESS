import { gymConfig } from '@/content/gym-config';

export const contactLinks = {
  call: `tel:${gymConfig.contact.phone}`,
  whatsapp: `https://wa.me/${gymConfig.contact.phone.replace(/\D/g, '')}?text=${encodeURIComponent(gymConfig.contact.whatsappMessage)}`,
};
