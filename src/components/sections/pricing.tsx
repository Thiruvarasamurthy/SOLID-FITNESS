import { gymConfig } from '@/content/gym-config';
import { contactLinks } from '@/lib/contact-links';

const rupees = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

export function Pricing() {
  return (
    <section
      id="pricing"
      className="pricing"
      aria-labelledby="pricing-title"
      tabIndex={-1}
    >
      <h2 id="pricing-title">{gymConfig.pricing.heading}</h2>
      <div className="pricing-grid">
        {gymConfig.plans.map((plan) => (
          <article
            key={plan.id}
            className="plan-card"
            aria-labelledby={`${plan.id}-title`}
          >
            <h3 id={`${plan.id}-title`}>
              {plan.months} {plan.months === 1 ? 'month' : 'months'}
            </h3>
            <p className="plan-price">{rupees.format(plan.price)}</p>
            <p className="plan-total">Total plan price</p>
            <a className="button" href="#contact">
              Enquire about plan
              <span className="sr-only">
                {' '}
                — {plan.months} {plan.months === 1 ? 'month' : 'months'}
              </span>
            </a>
            {contactLinks.whatsapp && (
              <a className="plan-whatsapp" href={contactLinks.whatsapp}>
                Enquire on WhatsApp
                <span className="sr-only">
                  {' '}
                  — {plan.months} {plan.months === 1 ? 'month' : 'months'}
                </span>
              </a>
            )}
          </article>
        ))}
      </div>
      <p className="pricing-note">{gymConfig.pricing.note}</p>
    </section>
  );
}
