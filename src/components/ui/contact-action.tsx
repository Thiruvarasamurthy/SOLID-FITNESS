import type { ReactNode } from 'react';

export function ContactAction({
  href,
  className = '',
  children,
}: {
  href: string | null;
  className?: string;
  children: ReactNode;
}) {
  if (!href) {
    return (
      <span
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
    <a href={href} className={`button ${className}`}>
      {children}
    </a>
  );
}
