import { ContactAction } from './contact-action';
import { contactLinks } from '@/lib/contact-links';

export function CallButton({ className = '' }: { className?: string }) {
  return (
    <ContactAction
      href={contactLinks.call}
      className={`button button-secondary ${className}`}
    >
      Call <span aria-hidden="true">↗</span>
    </ContactAction>
  );
}
