import { afterEach, expect, it, vi } from 'vitest';
import { gymConfig } from '@/content/gym-config';
import { exerciseGym } from '@/lib/seo';

afterEach(() => {
  vi.doUnmock('@/content/gym-config');
  vi.resetModules();
});

it('keeps visible, FAQ and JSON-LD addresses identical to the confirmed address', () => {
  const address = exerciseGym.address;
  const visible = `${address.streetAddress}, ${address.addressLocality}, ${address.addressRegion} ${address.postalCode}`;
  expect(gymConfig.address).toBe(visible);
  expect(visible).toBe(
    '29/2, Second Floor, 1st Main Road, Taramani Link Rd, Tansi Nagar, Velachery, Chennai, Tamil Nadu 600042',
  );
  expect(gymConfig.faq.find((item) => item.id === 'address')?.answer).toBe(
    visible,
  );
  expect(address).toEqual({
    '@type': 'PostalAddress',
    ...gymConfig.seo.postalAddress,
  });
});

it.each([
  null,
  {
    path: '/images/test-only.jpg',
    width: 1200,
    height: 630,
    alt: 'Test fixture',
  },
])('emits social images only when configured: %j', async (socialImage) => {
  vi.resetModules();
  vi.doMock('@/content/gym-config', () => ({
    gymConfig: {
      ...gymConfig,
      seo: { ...gymConfig.seo, siteUrl: 'https://example.test', socialImage },
    },
  }));
  const { pageMetadata } = await import('@/lib/seo');
  const metadata = pageMetadata('/', 'Test', 'Test description');
  if (socialImage) {
    const images = [
      {
        url: 'https://example.test/images/test-only.jpg',
        width: 1200,
        height: 630,
        alt: 'Test fixture',
      },
    ];
    expect(metadata.openGraph).toMatchObject({ images });
    expect(metadata.twitter).toMatchObject({
      card: 'summary_large_image',
      images,
    });
  } else {
    expect(metadata.openGraph).not.toHaveProperty('images');
    expect(metadata.twitter).not.toHaveProperty('images');
  }
});
