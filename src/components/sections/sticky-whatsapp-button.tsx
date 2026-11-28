'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ContactAction } from '@/components/ui/contact-action';
import { contactLinks } from '@/lib/contact-links';

export function StickyWhatsAppButton() {
  const pathname = usePathname();
  const [obstructsContact, setObstructsContact] = useState(false);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const visible = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const { target, isIntersecting } of entries) {
        if (isIntersecting) visible.add(target);
        else visible.delete(target);
      }
      setObstructsContact(visible.size > 0);
    });
    document.querySelectorAll(
      '[data-contact-channel="whatsapp"]:not(.sticky-whatsapp), .plan-whatsapp, #contact form, .footer-contact',
    ).forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [pathname]);

  if (obstructsContact) return null;
  return (
    <ContactAction
      className="button sticky-whatsapp"
      href={contactLinks.whatsapp}
    >
      WhatsApp <span aria-hidden="true">↗</span>
    </ContactAction>
  );
}
