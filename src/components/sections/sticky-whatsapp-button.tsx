import { contactLinks } from '@/lib/contact-links';

export function StickyWhatsAppButton() {
  return (
    <a
      className="button sticky-whatsapp"
      href={contactLinks.whatsapp}
      aria-label="Enquire on WhatsApp (preview number, verification pending)"
    >
      WhatsApp <span aria-hidden="true">↗</span>
    </a>
  );
}
