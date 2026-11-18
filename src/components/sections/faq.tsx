import { gymConfig } from '@/content/gym-config';
import { contactLinks } from '@/lib/contact-links';
import { ContactAction } from '@/components/ui/contact-action';

export function Faq() {
  const questions = gymConfig.faq.filter(
    (item) =>
      item.status === 'confirmed' || process.env.NODE_ENV !== 'production',
  );
  if (questions.length === 0) return null;

  return (
    <section
      id="faq"
      className="training faq"
      aria-labelledby="faq-title"
      tabIndex={-1}
    >
      <h2 id="faq-title">{gymConfig.faqSection.heading}</h2>
      <div className="faq-list">
        {questions.map((item) => (
          <details key={item.id} className="faq-item">
            <summary>{item.question}</summary>
            <p>
              {item.status === 'confirmed'
                ? item.answer
                : gymConfig.faqSection.pendingAnswer}
            </p>
          </details>
        ))}
      </div>
      <div className="faq-cta">
        <ContactAction href={contactLinks.whatsapp}>
          {gymConfig.faqSection.closingCta}
        </ContactAction>
      </div>
    </section>
  );
}
