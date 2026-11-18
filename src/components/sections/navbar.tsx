'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import { CallButton } from '@/components/ui/call-button';
import { gymConfig } from '@/content/gym-config';
import { showTraining } from '@/lib/training';
import { showTrainers } from '@/lib/trainers';
import { showGallery } from '@/lib/gallery';
import { showTestimonials } from '@/lib/testimonials';

const navigation = gymConfig.navigation.filter(
  (label) =>
    (label !== 'Training' || showTraining) &&
    (label !== 'Trainers' || showTrainers) &&
    (label !== 'Facility' || showGallery) &&
    (label !== 'Stories' || showTestimonials),
);

const sectionLinks: Record<string, string> = {
  Training: '#classes',
  Trainers: '#trainers',
  Plans: '#pricing',
  Facility: '#gallery',
  Stories: '#testimonials',
  Visit: '#location',
};

export function Navbar() {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  return (
    <header
      className="site-header"
      onKeyDown={(event) => {
        if (event.key === 'Escape' && open) {
          setOpen(false);
          trigger.current?.focus();
        }
      }}
    >
      <div className="container nav-row">
        <Link
          href="/#main"
          className="brand"
          aria-label={`${gymConfig.identity.name} home`}
        >
          <span className="brand-mark" aria-hidden="true">
            S
          </span>
          <span>
            <strong>{gymConfig.identity.name}</strong>
            <small>
              {gymConfig.identity.branch} / {gymConfig.identity.city}
            </small>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Primary">
          {navigation.map((label) =>
            sectionLinks[label] ? (
              <Link key={label} href={`/${sectionLinks[label]}`}>
                {label}
              </Link>
            ) : (
              <span
                key={label}
                aria-disabled="true"
                title="Available in a later section"
              >
                {label}
              </span>
            ),
          )}
        </nav>
        <CallButton className="navbar-call" />
        <Link className="button trial-button" href="/#contact">
          Request a trial <span aria-hidden="true">↗</span>
        </Link>
        <button
          ref={trigger}
          className="menu-button"
          aria-expanded={open}
          aria-controls={open ? 'mobile-navigation' : undefined}
          onClick={() => setOpen(!open)}
        >
          {open ? 'Close' : 'Menu'}{' '}
          <span aria-hidden="true">{open ? '−' : '+'}</span>
        </button>
      </div>
      {open && (
        <nav
          id="mobile-navigation"
          className="mobile-nav container"
          aria-label="Mobile primary"
        >
          <p>Explore the gym</p>
          <CallButton />
          {navigation.map((label, index) =>
            sectionLinks[label] ? (
              <Link
                key={label}
                href={`/${sectionLinks[label]}`}
                className="mobile-nav-link"
                onClick={() => setOpen(false)}
              >
                <small>0{index + 1}</small>
                {label}
                <small aria-hidden="true">↗</small>
              </Link>
            ) : (
              <span key={label} aria-disabled="true">
                <small>0{index + 1}</small>
                {label}
                <small>Coming soon</small>
              </span>
            ),
          )}
          <Link
            className="button"
            href="/#contact"
            onClick={() => setOpen(false)}
          >
            Request a trial ↗
          </Link>
        </nav>
      )}
    </header>
  );
}
