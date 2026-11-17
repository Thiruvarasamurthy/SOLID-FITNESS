'use client';

import { useRef, useState } from 'react';
import { CallButton } from '@/components/ui/call-button';
import { gymConfig } from '@/content/gym-config';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [notice, setNotice] = useState(false);
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
        <a
          href="#main"
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
        </a>
        <nav className="desktop-nav" aria-label="Primary">
          {gymConfig.navigation.map((label) =>
            label === 'Plans' ? (
              <a key={label} href="#pricing">
                {label}
              </a>
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
        <button
          className="button trial-button"
          onClick={() => setNotice(!notice)}
          aria-expanded={notice}
          aria-controls={notice ? 'trial-notice' : undefined}
        >
          Request a trial <span aria-hidden="true">↗</span>
        </button>
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
      {notice && (
        <p id="trial-notice" className="container trial-notice" role="status">
          {gymConfig.preview.notice}
        </p>
      )}
      {open && (
        <nav
          id="mobile-navigation"
          className="mobile-nav container"
          aria-label="Mobile primary"
        >
          <p>Explore the gym</p>
          <CallButton />
          {gymConfig.navigation.map((label, index) =>
            label === 'Plans' ? (
              <a
                key={label}
                href="#pricing"
                className="mobile-nav-link"
                onClick={() => setOpen(false)}
              >
                <small>0{index + 1}</small>
                {label}
                <small aria-hidden="true">↗</small>
              </a>
            ) : (
              <span key={label} aria-disabled="true">
                <small>0{index + 1}</small>
                {label}
                <small>Coming soon</small>
              </span>
            ),
          )}
          <button
            className="button"
            onClick={() => {
              setNotice(true);
              setOpen(false);
              trigger.current?.focus();
            }}
          >
            Request a trial ↗
          </button>
        </nav>
      )}
    </header>
  );
}
