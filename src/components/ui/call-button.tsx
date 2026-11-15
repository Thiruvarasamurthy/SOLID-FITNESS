import { contactLinks } from '@/lib/contact-links';

export function CallButton({ className = '' }: { className?: string }) {
  return (
    <a
      href={contactLinks.call}
      className={`button button-secondary ${className}`}
      aria-label="Call gym (preview number, verification pending)"
    >
      Call <span aria-hidden="true">↗</span>
    </a>
  );
}
