import { Suspense } from 'react';
import { connection } from 'next/server';
import { gymConfig } from '@/content/gym-config';
import { showTraining } from '@/lib/training';
import { showTrainers } from '@/lib/trainers';
import { showGallery } from '@/lib/gallery';
import { showTestimonials } from '@/lib/testimonials';
import { contactLinks } from '@/lib/contact-links';
import { ContactAction } from '@/components/ui/contact-action';
import { CallButton } from '@/components/ui/call-button';

async function Copyright() {
  await connection();
  return (
    <>
      © {new Date().getFullYear()} {gymConfig.identity.name}
    </>
  );
}

export function Footer() {
  const links = [
    { label: 'Home', href: '#home', show: true },
    { label: 'Training', href: '#classes', show: showTraining },
    { label: 'Facility', href: '#gallery', show: showGallery },
    { label: 'Trainers', href: '#trainers', show: showTrainers },
    { label: 'Member stories', href: '#testimonials', show: showTestimonials },
    { label: 'Plans', href: '#pricing', show: true },
    {
      label: 'FAQ',
      href: '#faq',
      show: gymConfig.faq.some(
        (item) =>
          item.status === 'confirmed' || process.env.NODE_ENV !== 'production',
      ),
    },
    { label: 'Contact', href: '#contact', show: true },
    { label: 'Visit', href: '#location', show: true },
  ].filter((link) => link.show);
  const instagram = gymConfig.social.instagramUrl;
  let instagramUrl: string | null = null;
  if (instagram) {
    try {
      const url = new URL(instagram);
      if (
        url.protocol === 'https:' &&
        ['instagram.com', 'www.instagram.com'].includes(url.hostname) &&
        !url.username &&
        !url.password
      )
        instagramUrl = instagram;
    } catch {
      /* Omit invalid destinations. */
    }
  }
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <p className="footer-brand">{gymConfig.identity.name}</p>
            <p>
              {gymConfig.identity.branch} / {gymConfig.identity.city}
            </p>
            <address>{gymConfig.address}</address>
          </div>
          <nav aria-label="Footer sections" className="footer-links">
            {links.map((link) => (
              <a key={link.href} href={`/${link.href}`}>
                {link.label}
              </a>
            ))}
          </nav>
          <div className="footer-contact">
            <h2>Get in touch</h2>
            <div className="contact-actions">
              <CallButton />
              <ContactAction href={contactLinks.whatsapp}>
                WhatsApp
              </ContactAction>
            </div>
            {instagramUrl && (
              <a className="footer-text-link" href={instagramUrl}>
                Instagram
              </a>
            )}
            <a className="footer-text-link" href="/privacy">
              Privacy
            </a>
          </div>
        </div>
        <p className="footer-copyright">
          <Suspense fallback={<>© {gymConfig.identity.name}</>}>
            <Copyright />
          </Suspense>
        </p>
      </div>
    </footer>
  );
}
