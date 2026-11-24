import { expect, test } from '@playwright/test';
import { gymConfig } from '../../src/content/gym-config';

test('plan selection, accessible errors and valid WhatsApp handoff', async ({
  page,
  context,
}) => {
  // Block all external navigation: test preparation, never send a real enquiry.
  await context.route('**/*', (route) => {
    const url = new URL(route.request().url());
    return url.origin === 'http://127.0.0.1:3119'
      ? route.continue()
      : route.abort();
  });
  await page.addInitScript(() => {
    window.open = (url, target, features) => {
      document.documentElement.dataset.handoff = JSON.stringify({
        url: String(url),
        target,
        features,
      });
      return null;
    };
  });
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    gymConfig.identity.name,
  );
  const form = page.getByRole('form', { name: 'Trial enquiry' });
  const submit = form.getByRole('button', { name: 'Continue to WhatsApp' });
  await expect(submit).toBeEnabled();
  const plan = gymConfig.plans[1];
  await page
    .locator(`#${plan.id}-title`)
    .locator('..')
    .getByRole('link', { name: 'Enquire about plan' })
    .click();
  await expect(form.getByLabel('Plan (optional)')).toHaveValue(plan.id);
  await submit.click();
  await expect(form.getByRole('alert')).toContainText(
    'Please correct the following:',
  );
  await expect(form.getByLabel('Name (required)')).toBeFocused();
  await expect(form.getByLabel('Mobile (required)')).toHaveAttribute(
    'aria-invalid',
    'true',
  );
  await expect(page.locator('html')).not.toHaveAttribute('data-handoff');
  await form.getByLabel('Name (required)').fill('Test Visitor');
  await form.getByLabel('Mobile (required)').fill('+12025550123');
  await form.getByLabel('Preferred time (optional)').fill('Evening');
  await submit.click();
  await expect(form.getByRole('alert')).toHaveCount(0);
  await expect(page.locator('html')).toHaveAttribute('data-handoff', /wa\.me/);
  const handoff = JSON.parse(
    (await page.locator('html').getAttribute('data-handoff'))!,
  );
  const url = new URL(handoff.url);
  expect(url.origin).toBe('https://wa.me');
  expect(url.pathname).toBe(`/${gymConfig.contact.phone.slice(1)}`);
  expect(url.searchParams.get('text')).toContain(`Plan: ${plan.months} months`);
  expect(url.searchParams.get('text')).toContain('Name: Test Visitor');
  expect(handoff.target).toBe('_blank');
  expect(handoff.features).toBe('noopener,noreferrer');
  await expect(
    form.getByLabel('If WhatsApp did not open, copy this message'),
  ).toHaveValue(url.searchParams.get('text')!);
  await expect(form.getByText(gymConfig.trial.handoff)).toBeVisible();
  await expect(
    page.getByText(/request received|booking confirmed/i),
  ).toHaveCount(0);
});

test('closing trial action reaches the existing form', async ({ page }) => {
  await page.goto('/');
  const closing = page.getByRole('region', { name: gymConfig.closing.heading });
  await closing.getByRole('link', { name: gymConfig.closing.trial }).click();
  await expect(page).toHaveURL(/#contact$/);
  await expect(page.getByRole('form', { name: 'Trial enquiry' })).toBeVisible();
});

test('pin activation preserves focus in the Visit panel after resize', async ({
  page,
}) => {
  await page.setViewportSize({ width: 900, height: 1000 });
  await page.goto('/');
  const track = page.locator('.story-track');
  await expect(track).toHaveAttribute('data-pinned', 'false');
  const visit = page.locator('#story-visit');
  const link = visit.getByRole('link', {
    name: gymConfig.story.locationDetails,
  });
  await link.focus();
  await page.setViewportSize({ width: 1280, height: 1000 });
  await expect(track).toHaveAttribute('data-pinned', 'true');
  await expect(visit).toHaveAttribute('data-active', 'true');
  await expect(visit).not.toHaveAttribute('inert');
  await expect(visit).not.toHaveAttribute('aria-hidden', 'true');
  await expect(link).toBeFocused();
});
