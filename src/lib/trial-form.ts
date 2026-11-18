import { gymConfig } from '@/content/gym-config';

export type TrialValues = {
  name: string;
  mobile: string;
  preferredTime: string;
  plan: string;
};
export type TrialErrors = Partial<Record<keyof TrialValues, string>>;

export function validateTrial(values: TrialValues): TrialErrors {
  const errors: TrialErrors = {};
  if (!values.name.trim() || values.name.trim().length > 80)
    errors.name = 'Enter your name (1–80 characters).';
  const mobile = values.mobile.replace(/[\s().-]/g, '');
  if (!/^\+?[1-9]\d{7,14}$/.test(mobile))
    errors.mobile =
      'Enter a valid mobile number with 8–15 digits; include your country code if outside India.';
  if (values.preferredTime.trim().length > 120)
    errors.preferredTime = 'Keep your preferred time within 120 characters.';
  if (values.plan && !gymConfig.plans.some((plan) => plan.id === values.plan))
    errors.plan = 'Choose an available plan or leave this blank.';
  return errors;
}

export function createTrialMessage(values: TrialValues): string | null {
  if (Object.keys(validateTrial(values)).length) return null;
  const plan = gymConfig.plans.find((plan) => plan.id === values.plan);
  return [
    gymConfig.contact.trialMessage
      .replace('{name}', gymConfig.identity.name)
      .replace('{branch}', gymConfig.identity.branch),
    `Name: ${values.name.trim()}`,
    `Mobile: ${values.mobile.replace(/[\s().-]/g, '')}`,
    values.preferredTime.trim()
      ? `Preferred time: ${values.preferredTime.trim()}`
      : null,
    plan
      ? `Plan: ${plan.months} ${plan.months === 1 ? 'month' : 'months'}`
      : null,
  ]
    .filter(Boolean)
    .join('\n');
}
