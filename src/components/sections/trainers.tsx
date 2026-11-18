import Image from 'next/image';
import { gymConfig } from '@/content/gym-config';
import { approvedTrainers, showTrainers } from '@/lib/trainers';
import { createCoachingWhatsAppLink } from '@/lib/contact-links';
import { ContactAction } from '@/components/ui/contact-action';

export function Trainers() {
  if (!showTrainers) return null;

  return (
    <section
      id="trainers"
      className="training trainers"
      aria-labelledby="trainers-title"
      tabIndex={-1}
    >
      <h2 id="trainers-title">{gymConfig.trainersSection.heading}</h2>
      {approvedTrainers.length === 0 ? (
        <div className="training-placeholder">
          <p className="eyebrow">Content placeholder</p>
          <h3>{gymConfig.trainersSection.placeholder}</h3>
        </div>
      ) : (
        <div className="training-grid">
          {approvedTrainers.map((trainer) => (
            <article
              key={trainer.id}
              className="training-card trainer-card"
              aria-labelledby={`trainer-${trainer.id}-title`}
            >
              <Image
                src={trainer.photo.src}
                alt={trainer.photo.alt}
                width={trainer.photo.width}
                height={trainer.photo.height}
                sizes="(min-width: 1380px) 367px, (min-width: 1100px) calc((100vw - 224px) / 3), (min-width: 768px) calc((100vw - 180px) / 2), calc(100vw - 90px)"
                loading="lazy"
              />
              <h3 id={`trainer-${trainer.id}-title`}>{trainer.name}</h3>
              <p>{trainer.role}</p>
              {trainer.credentials.some(
                (credential) => credential.verified === true,
              ) && (
                <ul
                  className="trainer-credentials"
                  aria-label="Verified credentials"
                >
                  {trainer.credentials
                    .filter((credential) => credential.verified === true)
                    .map((credential) => (
                      <li key={credential.title}>{credential.title}</li>
                    ))}
                </ul>
              )}
              <ContactAction href={createCoachingWhatsAppLink(trainer.id)}>
                Ask about coaching
                <span className="sr-only"> — {trainer.name}</span>
              </ContactAction>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
