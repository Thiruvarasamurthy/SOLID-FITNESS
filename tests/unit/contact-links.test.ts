import { afterEach, describe, expect, it, vi } from 'vitest';
import { gymConfig } from '@/content/gym-config';
import {
  createContactLinks,
  createPlanWhatsAppLink,
  createWhatsAppLink,
} from '@/lib/contact-links';

const contact = {
  phone: '+12025550123',
  status: 'placeholder' as const,
  whatsappMessage: 'Test enquiry',
};
afterEach(() => vi.unstubAllEnvs());

describe('contact links', () => {
  it('disables placeholders unless explicitly enabled', () => {
    expect(createContactLinks(contact, false)).toEqual({
      call: null,
      whatsapp: null,
    });
    expect(createContactLinks(contact, true).call).toBe('tel:+12025550123');
    expect(
      createContactLinks({ ...contact, status: 'confirmed' }, false).call,
    ).toBe('tel:+12025550123');
  });
  it.each([
    null,
    '',
    '12025550123',
    '+0123456789',
    '+1234567',
    '+1234567890123456',
    '+1 2025550123',
    '+1202ABC0123',
    'tel:+12025550123',
  ])('rejects invalid number %s even when enabled', (phone) => {
    expect(
      createContactLinks({ ...contact, phone, status: 'confirmed' }, true),
    ).toEqual({ call: null, whatsapp: null });
  });
  it('round-trips punctuation, Unicode and newlines without extra query fields', () => {
    const message = "Hi, I'd like plans & fees? ₹2,599 + தமிழ்\n#trial=1";
    const link = createContactLinks(
      { ...contact, whatsappMessage: message },
      true,
    ).whatsapp!;
    expect(link).toBe(
      `https://wa.me/12025550123?text=${encodeURIComponent(message)}`,
    );
    expect(new URL(link).searchParams.get('text')).toBe(message);
    expect([...new URL(link).searchParams.keys()]).toEqual(['text']);
  });
  it.each(['false', '', 'TRUE'])(
    'keeps shared helpers gated for flag %s',
    (flag) => {
      vi.stubEnv('NEXT_PUBLIC_CONTACT_PREVIEW', flag);
      expect(createWhatsAppLink('test')).toBeNull();
      for (const plan of gymConfig.plans)
        expect(createPlanWhatsAppLink(plan.months)).toBeNull();
    },
  );
  it.each(gymConfig.plans)(
    'builds the specific $months-month message',
    (plan) => {
      vi.stubEnv('NEXT_PUBLIC_CONTACT_PREVIEW', 'true');
      const link = createPlanWhatsAppLink(plan.months)!;
      expect(new URL(link).searchParams.get('text')).toBe(
        `Hi, I'd like to know about the ${plan.months}-month membership plan at ${gymConfig.identity.name}, ${gymConfig.identity.branch}.`,
      );
    },
  );
  it.each([0, 2, -1, NaN])('rejects unknown plan duration %s', (months) => {
    vi.stubEnv('NEXT_PUBLIC_CONTACT_PREVIEW', 'true');
    expect(createPlanWhatsAppLink(months)).toBeNull();
  });
});
