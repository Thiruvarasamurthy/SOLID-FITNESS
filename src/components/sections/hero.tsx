import Image from 'next/image';
import { gymConfig } from '@/content/gym-config';
import { contactLinks } from '@/lib/contact-links';
import { HeroEntrance } from '@/components/motion/hero-entrance';
import { ContactAction } from '@/components/ui/contact-action';
import { CallButton } from '@/components/ui/call-button';

export function Hero() {
  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <HeroEntrance>
        <div className="hero-copy">
          <span className="eyebrow">{gymConfig.hero.eyebrow}</span>
          <h1 id="hero-title">
            {gymConfig.identity.name}
            <span>IN {gymConfig.identity.branch}.</span>
          </h1>
          <p>{gymConfig.hero.intro}</p>
          <div className="hero-actions">
            <a className="button" href="#contact">
              Request a Trial <span aria-hidden="true">↗</span>
            </a>
            <ContactAction
              href={contactLinks.whatsapp}
              className="button-secondary"
            >
              WhatsApp <span aria-hidden="true">↗</span>
            </ContactAction>
            <CallButton />
          </div>
          <p className="hero-note">{gymConfig.hero.trialNote}</p>
          {!contactLinks.whatsapp && (
            <p className="hero-note">
              Contact actions are unavailable while the number awaits
              verification.
            </p>
          )}
        </div>
        <figure className="hero-media">
          <Image
            src={gymConfig.hero.image.src}
            width={gymConfig.hero.image.width}
            height={gymConfig.hero.image.height}
            alt={gymConfig.hero.image.alt}
            loading="eager"
          />
          <figcaption>{gymConfig.hero.image.caption}</figcaption>
        </figure>
      </HeroEntrance>
    </section>
  );
}
