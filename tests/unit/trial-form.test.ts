import { describe, expect, it } from 'vitest';
import { gymConfig } from '@/content/gym-config';
import {
  createTrialMessage,
  validateTrial,
  type TrialValues,
} from '@/lib/trial-form';

const valid: TrialValues = {
  name: 'Test Visitor',
  mobile: '+1 (202) 555-0123',
  preferredTime: '',
  plan: '',
};

describe('trial validation and message', () => {
  it('accepts required fields with optional fields blank', () => {
    expect(validateTrial(valid)).toEqual({});
    expect(createTrialMessage(valid)).toContain('Mobile: +12025550123');
    expect(createTrialMessage(valid)).not.toMatch(/Preferred time:|Plan:/);
  });
  it.each(['', '   ', 'a'.repeat(81)])('rejects invalid names', (name) => {
    const values = { ...valid, name };
    expect(validateTrial(values).name).toBeTruthy();
    expect(createTrialMessage(values)).toBeNull();
  });
  it('accepts trimmed name and preferred-time length boundaries', () => {
    expect(
      validateTrial({
        ...valid,
        name: ` ${'a'.repeat(80)} `,
        preferredTime: 'x'.repeat(120),
      }),
    ).toEqual({});
    expect(
      validateTrial({ ...valid, preferredTime: 'x'.repeat(121) }).preferredTime,
    ).toBeTruthy();
  });
  it.each([
    '',
    '1234567',
    '+0123456789',
    '+1234567890123456',
    'abc12345678',
    '++12025550123',
  ])('rejects invalid mobile %s', (mobile) => {
    expect(validateTrial({ ...valid, mobile }).mobile).toBeTruthy();
    expect(createTrialMessage({ ...valid, mobile })).toBeNull();
  });
  it.each(['12345678', '+123456789012345', '+1 (202) 555-0123'])(
    'accepts supported mobile format %s',
    (mobile) => {
      expect(validateTrial({ ...valid, mobile })).toEqual({});
    },
  );
  it('reports multiple errors and rejects an unknown plan', () => {
    expect(
      Object.keys(
        validateTrial({
          name: '',
          mobile: '',
          preferredTime: 'x'.repeat(121),
          plan: 'unknown',
        }),
      ),
    ).toEqual(['name', 'mobile', 'preferredTime', 'plan']);
    expect(createTrialMessage({ ...valid, plan: 'unknown' })).toBeNull();
  });
  it.each(gymConfig.plans)(
    'accepts configured plan $id and preserves its duration',
    (plan) => {
      const values = {
        ...valid,
        name: '  Test Visitor  ',
        preferredTime: ' Evening ',
        plan: plan.id,
      };
      expect(validateTrial(values)).toEqual({});
      const message = createTrialMessage(values)!;
      expect(message).toContain('\nName: Test Visitor\n');
      expect(message).toContain('\nPreferred time: Evening\n');
      expect(message).toContain(
        `Plan: ${plan.months} ${plan.months === 1 ? 'month' : 'months'}`,
      );
      expect(message).not.toMatch(/request received|booking confirmed/i);
    },
  );
});
