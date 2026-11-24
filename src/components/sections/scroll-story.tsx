import { gymConfig } from '@/content/gym-config';
import { showTraining } from '@/lib/training';
import { StoryStage } from '@/components/motion/story-stage';
import { PlanEnquiryLink } from '@/components/ui/plan-enquiry-link';

const rupees = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

function PlansPanel() {
  const copy = gymConfig.story;
  return (
    <>
      <h3>{gymConfig.pricing.heading}</h3>
      <fieldset className="story-duration-picker">
        <legend>{copy.chooseDuration}</legend>
        {gymConfig.plans.map((plan, index) => (
          <div className="story-duration-option" key={plan.id}>
            <input
              type="radio"
              name="story-duration"
              id={`story-duration-${plan.id}`}
              defaultChecked={index === 0}
            />
            <label htmlFor={`story-duration-${plan.id}`}>
              {plan.months} {plan.months === 1 ? copy.month : copy.months}
            </label>
            <div className="story-plan-detail">
              <p className="story-price">{rupees.format(plan.price)}</p>
              <p>{copy.total}</p>
              <PlanEnquiryLink planId={plan.id}>{copy.enquire}</PlanEnquiryLink>
            </div>
          </div>
        ))}
      </fieldset>
      <p className="story-note">{gymConfig.pricing.note}</p>
    </>
  );
}

export function ScrollStory() {
  const copy = gymConfig.story;
  const panels = [];
  if (showTraining)
    panels.push({
      id: 'story-training',
      label: copy.training,
      content: (
        <>
          <h3>{gymConfig.training.heading}</h3>
          {gymConfig.programs.length ? (
            <ul className="story-programs">
              {gymConfig.programs.map((program) => (
                <li key={program.id}>
                  <h4>{program.name}</h4>
                  {program.description && <p>{program.description}</p>}
                </li>
              ))}
            </ul>
          ) : (
            <p>{gymConfig.training.placeholder}</p>
          )}
        </>
      ),
    });
  panels.push({
    id: 'story-plans',
    label: copy.plans,
    content: <PlansPanel />,
  });
  let directions: string | null = null;
  try {
    const candidate = new URL(gymConfig.location.directionsUrl ?? '');
    if (
      candidate.protocol === 'https:' &&
      !candidate.username &&
      !candidate.password
    )
      directions = candidate.href;
  } catch {
    /* Missing or invalid destinations remain omitted. */
  }
  panels.push({
    id: 'story-visit',
    label: copy.visit,
    content: (
      <>
        <h3>{gymConfig.location.heading}</h3>
        <address>{gymConfig.address}</address>
        {directions && (
          <a className="button" href={directions}>
            {copy.directions}
          </a>
        )}
        <a className="story-location-link" href="#location">
          {copy.locationDetails}
        </a>
      </>
    ),
  });
  return <StoryStage heading={copy.heading} panels={panels} />;
}
