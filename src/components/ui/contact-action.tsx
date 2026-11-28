import type { ReactNode } from 'react';

export function ContactAction({
  href,
  channel = 'whatsapp',
  className = '',
  children,
}: {
  href: string | null;
  channel?: 'whatsapp' | 'call';
  className?: string;
  children: ReactNode;
}) {
  if (!href) {
    return (
      <span
        data-contact-channel={channel}
        className={`button contact-disabled ${className}`}
        aria-disabled="true"
        title="Contact number awaiting verification"
      >
        {children}
        <span className="sr-only">
          {' '}
          — unavailable until the contact number is verified
        </span>
      </span>
    );
  }
  return (
    <a href={href} data-contact-channel={channel} className={`button ${className}`}>
      {children}
    </a>
  );
}
