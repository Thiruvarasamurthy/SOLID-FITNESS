'use client';

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type FormEvent,
} from 'react';
import { gymConfig } from '@/content/gym-config';
import { contactLinks, createWhatsAppLink } from '@/lib/contact-links';
import {
  createTrialMessage,
  validateTrial,
  type TrialErrors,
  type TrialValues,
} from '@/lib/trial-form';

const subscribe = () => () => {};
const fields = ['name', 'mobile', 'preferredTime', 'plan'] as const;
const labels = {
  name: 'Name',
  mobile: 'Mobile',
  preferredTime: 'Preferred time (optional)',
  plan: 'Plan (optional)',
};

export function TrialForm() {
  const hydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const [values, setValues] = useState<TrialValues>({
    name: '',
    mobile: '',
    preferredTime: '',
    plan: '',
  });
  const [errors, setErrors] = useState<TrialErrors>({});
  const [message, setMessage] = useState('');
  const [copyStatus, setCopyStatus] = useState('');
  const form = useRef<HTMLFormElement>(null);
  const fallback = useRef<HTMLTextAreaElement>(null);
  const enabled = Boolean(contactLinks.whatsapp);

  useEffect(() => {
    const selectPlan = (event: Event) => {
      const id: unknown = (event as CustomEvent).detail;
      if (
        typeof id === 'string' &&
        gymConfig.plans.some((plan) => plan.id === id)
      ) {
        setValues((current) => ({ ...current, plan: id }));
        setMessage('');
      }
    };
    window.addEventListener('trial-plan-selected', selectPlan);
    return () => window.removeEventListener('trial-plan-selected', selectPlan);
  }, []);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!enabled) return;
    const nextErrors = validateTrial(values);
    setErrors(nextErrors);
    const first = fields.find((field) => nextErrors[field]);
    if (first) {
      form.current?.querySelector<HTMLElement>(`#trial-${first}`)?.focus();
      return;
    }
    const prepared = createTrialMessage(values);
    if (!prepared) return;
    const url = createWhatsAppLink(prepared);
    if (!url) return;
    setMessage(prepared);
    setCopyStatus('');
    // Synchronous user-initiated handoff; this page retains the manual fallback.
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  return (
    <form
      ref={form}
      noValidate
      onSubmit={submit}
      aria-label="Trial enquiry"
      aria-describedby="trial-handoff trial-availability"
    >
      <p id="trial-handoff">
        Continue opens WhatsApp in a new tab with an editable message. You must
        send it there; a trial is not booked by this form.
      </p>
      <p id="trial-availability">
        {enabled
          ? 'Enquire to confirm trial availability and terms.'
          : 'Preview only: WhatsApp handoff is unavailable until the contact number is verified.'}
      </p>
      <noscript>
        <p>
          Enable JavaScript to prepare a trial message, or use the contact links
          when available.
        </p>
      </noscript>
      {Object.keys(errors).length > 0 && (
        <div className="form-errors" role="alert">
          <p>Please correct the following:</p>
          <ul>
            {fields
              .filter((field) => errors[field])
              .map((field) => (
                <li key={field}>
                  <a href={`#trial-${field}`}>{errors[field]}</a>
                </li>
              ))}
          </ul>
        </div>
      )}
      {fields.map((field) => (
        <div className="form-field" key={field}>
          <label htmlFor={`trial-${field}`}>
            {labels[field]}
            {(field === 'name' || field === 'mobile') && ' (required)'}
          </label>
          {field === 'plan' ? (
            <select
              id="trial-plan"
              value={values.plan}
              aria-invalid={Boolean(errors.plan)}
              aria-describedby={errors.plan ? 'trial-plan-error' : undefined}
              onChange={(event) => {
                setValues({ ...values, plan: event.target.value });
                setMessage('');
              }}
            >
              <option value="">Not sure yet</option>
              {gymConfig.plans.map((plan) => (
                <option key={plan.id} value={plan.id}>
                  {plan.months} {plan.months === 1 ? 'month' : 'months'}
                </option>
              ))}
            </select>
          ) : (
            <input
              id={`trial-${field}`}
              type={field === 'mobile' ? 'tel' : 'text'}
              inputMode={field === 'mobile' ? 'tel' : 'text'}
              autoComplete={
                field === 'name' ? 'name' : field === 'mobile' ? 'tel' : 'off'
              }
              required={field !== 'preferredTime'}
              maxLength={field === 'name' ? 80 : field === 'mobile' ? 30 : 120}
              value={values[field]}
              aria-invalid={Boolean(errors[field])}
              aria-describedby={
                errors[field] ? `trial-${field}-error` : undefined
              }
              onChange={(event) => {
                setValues({ ...values, [field]: event.target.value });
                setMessage('');
              }}
            />
          )}
          {errors[field] && (
            <p className="field-error" id={`trial-${field}-error`}>
              {errors[field]}
            </p>
          )}
        </div>
      ))}
      <p>
        <a
          className="privacy-link"
          href="#contact-privacy"
          onClick={() => {
            const details =
              document.querySelector<HTMLDetailsElement>('#contact-privacy');
            if (details) details.open = true;
          }}
        >
          How your enquiry details are used
        </a>
      </p>
      <p>
        <a className="privacy-link" href="/privacy">
          Read the full privacy notice
        </a>
      </p>
      <button className="button" type="submit" disabled={!hydrated || !enabled}>
        Continue to WhatsApp
      </button>
      <div role="status" aria-live="polite">
        {message && <p>{gymConfig.trial.handoff}</p>}
      </div>
      {message && (
        <div className="message-fallback">
          <label htmlFor="prepared-message">
            If WhatsApp did not open, copy this message
          </label>
          <textarea
            ref={fallback}
            id="prepared-message"
            readOnly
            value={message}
            rows={7}
          />
          <button
            type="button"
            className="button button-secondary"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(message);
                setCopyStatus(
                  'Message copied. Paste it into WhatsApp and send it.',
                );
              } catch {
                fallback.current?.focus();
                fallback.current?.select();
                setCopyStatus(
                  'Copy unavailable. Select and copy the message above manually.',
                );
              }
            }}
          >
            Copy message
          </button>
          <p role="status">{copyStatus}</p>
        </div>
      )}
    </form>
  );
}
