import { gymConfig } from '@/content/gym-config';
import { Reveal } from '@/components/motion/reveal';
import { createPlanWhatsAppLink } from '@/lib/contact-links';

import { PlanEnquiryLink } from '@/components/ui/plan-enquiry-link';

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
      <Reveal as="h2" id="pricing-title">
        {gymConfig.pricing.heading}
      </Reveal>
      <div className="pricing-grid">
        {gymConfig.plans.map((plan, index) => (
          <Reveal
            as="article"
            delay={index * 0.02}
            key={plan.id}
            className={`plan-card${index % 2 === 0 ? ' plan-card-light' : ''}`}
            labelledBy={`${plan.id}-title`}
          >
            <h3 id={`${plan.id}-title`}>
              {plan.months}{' '}
              {plan.months === 1
                ? gymConfig.story.month
                : gymConfig.story.months}
            </h3>
            <p className="plan-price">{rupees.format(plan.price)}</p>
            <ul className="plan-facts">
              <li>
                <span aria-hidden="true">✓</span> {gymConfig.story.total}
              </li>
            </ul>
            <PlanEnquiryLink planId={plan.id}>
              {gymConfig.story.enquire}
              <span className="sr-only">
                {' '}
                — {plan.months}{' '}
                {plan.months === 1
                  ? gymConfig.story.month
                  : gymConfig.story.months}
              </span>
            </PlanEnquiryLink>
            {createPlanWhatsAppLink(plan.months) && (
              <a
                className="plan-whatsapp"
                href={createPlanWhatsAppLink(plan.months) ?? undefined}
              >
                {gymConfig.closing.whatsapp}
                <span className="sr-only">
                  {' '}
                  — {plan.months}{' '}
                  {plan.months === 1
                    ? gymConfig.story.month
                    : gymConfig.story.months}
                </span>
              </a>
            )}
          </Reveal>
        ))}
      </div>
      <p className="pricing-note">{gymConfig.pricing.note}</p>
    </section>
  );
}
