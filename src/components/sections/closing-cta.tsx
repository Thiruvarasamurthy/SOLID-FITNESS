import { gymConfig } from '@/content/gym-config';
import { contactLinks } from '@/lib/contact-links';
import { ContactAction } from '@/components/ui/contact-action';
import { RibbonFallback } from '@/components/motion/ribbon-fallback';

export function ClosingCta() {
  return (
    <section className="closing-cta" aria-labelledby="closing-title">
      <div className="closing-copy">
        <h2 id="closing-title">{gymConfig.closing.heading}</h2>
        <p>{gymConfig.hero.trialNote}</p>
        <div className="hero-actions">
          <a className="button" href="#contact">
            {gymConfig.closing.trial}
          </a>
          <ContactAction
            href={contactLinks.whatsapp}
            className="button-secondary"
          >
            {gymConfig.closing.whatsapp}
          </ContactAction>
        </div>
      </div>
      <div className="closing-art">
        <RibbonFallback id="closing-ribbon-metal" />
      </div>
    </section>
  );
}
