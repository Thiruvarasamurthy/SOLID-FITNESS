import { CardIcon } from '@/components/ui/card-icon';
import { gymConfig } from '@/content/gym-config';
import { createProgramWhatsAppLink } from '@/lib/contact-links';
import { showTraining } from '@/lib/training';
import { ContactAction } from '@/components/ui/contact-action';

export function Classes() {
  if (!showTraining) return null;

  return (
    <section
      id="classes"
      className="training"
      aria-labelledby="training-title"
      tabIndex={-1}
    >
      <h2 id="training-title">{gymConfig.training.heading}</h2>
      {gymConfig.programs.length === 0 ? (
        <div className="training-placeholder">
          <CardIcon />
          <p className="eyebrow">{gymConfig.interface.placeholder}</p>
          <h3>{gymConfig.training.placeholder}</h3>
        </div>
      ) : (
        <div className="training-grid">
          {gymConfig.programs.map((program) => (
            <article
              key={program.id}
              className="training-card"
              aria-labelledby={`program-${program.id}-title`}
            >
              <CardIcon />
              <h3 id={`program-${program.id}-title`}>{program.name}</h3>
              {program.description && <p>{program.description}</p>}
              <ContactAction href={createProgramWhatsAppLink(program.name)}>
                {gymConfig.closing.whatsapp}
                <span className="sr-only"> — {program.name}</span>
              </ContactAction>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
