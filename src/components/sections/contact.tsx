import { gymConfig } from '@/content/gym-config';
import { contactLinks } from '@/lib/contact-links';
import { CallButton } from '@/components/ui/call-button';
import { ContactAction } from '@/components/ui/contact-action';
import { TrialForm } from '@/components/sections/trial-form';

export function Contact() {
  return (
    <section
      id="contact" data-bg-section="faq"
      className="contact-section"
      aria-labelledby="contact-title"
      tabIndex={-1}
    >
      <h2 id="contact-title">{gymConfig.trial.heading}</h2>
      <p>{gymConfig.trial.terms}</p>
      <div className="contact-grid">
        <TrialForm />
        <div>
          <h3>Contact the gym</h3>
          {gymConfig.contact.status === 'placeholder' && (
            <p>{gymConfig.contact.previewNote}</p>
          )}
          <p>
            {gymConfig.contact.status === 'confirmed'
              ? gymConfig.contact.phone
              : gymConfig.contact.placeholder}
          </p>
          <div className="contact-actions">
            <CallButton />
            <ContactAction href={contactLinks.whatsapp}>
              Enquire on WhatsApp ↗
            </ContactAction>
          </div>
          <details id="contact-privacy" className="contact-privacy">
            <summary>How your enquiry details are used</summary>
            <p>{gymConfig.trial.privacy}</p>
            <a className="privacy-link" href="/privacy">
              Read the full privacy notice
            </a>
          </details>
        </div>
      </div>
    </section>
  );
}
