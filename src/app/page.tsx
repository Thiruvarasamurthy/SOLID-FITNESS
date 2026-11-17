import { Hero } from '@/components/sections/hero';
import { Pricing } from '@/components/sections/pricing';
import { ContactAction } from '@/components/ui/contact-action';
import { CallButton } from '@/components/ui/call-button';
import { contactLinks } from '@/lib/contact-links';
import { gymConfig } from '@/content/gym-config';
export default function Home() {
  return (
    <main id="main" tabIndex={-1} className="container checkpoint">
      <Hero />
      <Pricing />
      <section
        id="contact"
        className="contact-preview"
        aria-labelledby="contact-title"
      >
        <h2 id="contact-title">Contact</h2>
        <p>{gymConfig.contact.previewNote}</p>
        <p>{gymConfig.contact.placeholder}</p>
        <div className="contact-actions">
          <CallButton />
          <ContactAction href={contactLinks.whatsapp}>
            Enquire on WhatsApp ↗
          </ContactAction>
        </div>
      </section>
      <div className="checkpoint-status">
        <span>03 / {gymConfig.preview.status}</span>
        <span>Next: Classes</span>
      </div>
    </main>
  );
}
