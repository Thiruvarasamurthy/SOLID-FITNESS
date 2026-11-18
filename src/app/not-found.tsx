import Link from 'next/link';
import { ContactAction } from '@/components/ui/contact-action';
import { contactLinks } from '@/lib/contact-links';

export default function NotFound() {
  return (
    <main id="main" tabIndex={-1} className="container privacy-page">
      <h1>Page not found</h1>
      <p>This page does not exist. Return home to explore the gym.</p>
      <div className="contact-actions">
        <Link href="/" className="button">
          Home
        </Link>
        <ContactAction href={contactLinks.whatsapp}>WhatsApp</ContactAction>
      </div>
    </main>
  );
}
