import { ContactAction } from '@/components/ui/contact-action';
import { contactLinks } from '@/lib/contact-links';

export function StickyWhatsAppButton() {
  return (
    <ContactAction
      className="button sticky-whatsapp"
      href={contactLinks.whatsapp}
    >
      WhatsApp <span aria-hidden="true">↗</span>
    </ContactAction>
  );
}
