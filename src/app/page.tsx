import { CallButton } from '@/components/ui/call-button';
import { contactLinks } from '@/lib/contact-links';
import { gymConfig } from '@/content/gym-config';
export default function Home() {
  return (
    <main id="main" tabIndex={-1} className="container checkpoint">
      <section id="home" aria-labelledby="hero-title">
        <span className="eyebrow">{gymConfig.preview.label}</span>
        <h1 id="hero-title">{gymConfig.preview.title}</h1>
        <p>{gymConfig.preview.description}</p>
        <CallButton />
      </section>
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
          <a className="button" href={contactLinks.whatsapp}>
            Enquire on WhatsApp ↗
          </a>
        </div>
      </section>
      <div className="checkpoint-status">
        <span>01 / {gymConfig.preview.status}</span>
        <span>Next: Hero</span>
      </div>
    </main>
  );
}
