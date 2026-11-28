import { Suspense } from 'react';
import { BrandLogo } from '@/components/ui/brand-logo';
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
    { label: gymConfig.footer.home, href: '#home', show: true },
    { label: gymConfig.training.heading, href: '#classes', show: showTraining },
    {
      label: gymConfig.gallerySection.heading,
      href: '#gallery',
      show: showGallery,
    },
    {
      label: gymConfig.trainersSection.heading,
      href: '#trainers',
      show: showTrainers,
    },
    {
      label: gymConfig.testimonialsSection.heading,
      href: '#testimonials',
      show: showTestimonials,
    },
    { label: gymConfig.story.plans, href: '#pricing', show: true },
    {
      label: gymConfig.footer.faq,
      href: '#faq',
      show: gymConfig.faq.some(
        (item) =>
          item.status === 'confirmed' || process.env.NODE_ENV !== 'production',
      ),
    },
    { label: gymConfig.footer.contactLink, href: '#contact', show: true },
    { label: gymConfig.footer.visit, href: '#location', show: true },
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
    <footer className="site-footer" data-bg-section="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <BrandLogo className="footer-brand" />
            <p>
              {gymConfig.identity.branch} / {gymConfig.identity.city}
            </p>
            <address>{gymConfig.address}</address>
          </div>
          <nav aria-label={gymConfig.footer.explore} className="footer-links">
            <h2>{gymConfig.footer.explore}</h2>
            {links.map((link) => (
              <a key={link.href} href={`/${link.href}`}>
                {link.label}
              </a>
            ))}
          </nav>
          <div className="footer-contact">
            <h2>{gymConfig.footer.contact}</h2>
            <div className="contact-actions">
              <CallButton />
              <ContactAction href={contactLinks.whatsapp}>
                {gymConfig.footer.whatsapp}
              </ContactAction>
            </div>
            {instagramUrl && (
              <a className="footer-text-link" href={instagramUrl}>
                {gymConfig.footer.instagram}
              </a>
            )}
            <a className="footer-text-link" href="/privacy">
              {gymConfig.footer.privacy}
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
