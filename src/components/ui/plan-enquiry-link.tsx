'use client';

import type { ReactNode } from 'react';

export function PlanEnquiryLink({
  planId,
  children,
}: {
  planId: string;
  children: ReactNode;
}) {
  return (
    <a
      className="button"
      href="#contact"
      onClick={() => {
        window.dispatchEvent(
          new CustomEvent('trial-plan-selected', { detail: planId }),
        );
      }}
    >
      {children}
    </a>
  );
}
