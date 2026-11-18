import type { Metadata } from 'next';
import { gymConfig } from '@/content/gym-config';

export function parseSiteOrigin(value: string | null): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    if (
      url.protocol !== 'https:' ||
      url.username ||
      url.password ||
      url.pathname !== '/' ||
      url.search ||
      url.hash
    )
      return null;
    return url.origin;
  } catch {
    return null;
  }
}

export const siteOrigin = parseSiteOrigin(gymConfig.seo.siteUrl);
export const indexable =
  process.env.NODE_ENV === 'production' &&
  process.env.NEXT_PUBLIC_SITE_INDEXABLE === 'true' &&
  process.env.NEXT_PUBLIC_CONTACT_PREVIEW !== 'true' &&
  siteOrigin !== null;

export function pageMetadata(
  path: '/' | '/privacy',
  title: string,
  description: string,
): Metadata {
  const url = siteOrigin ? new URL(path, siteOrigin).href : undefined;
  const socialImage = gymConfig.seo.socialImage;
  // Relative public assets need the approved origin; never guess a deployment URL.
  const image =
    socialImage && siteOrigin
      ? {
          url: new URL(socialImage.path, siteOrigin).href,
          width: socialImage.width,
          height: socialImage.height,
          alt: socialImage.alt,
        }
      : null;
  return {
    title,
    description,
    alternates: url ? { canonical: url } : undefined,
    openGraph: {
      type: 'website',
      title,
      description,
      url,
      siteName: `${gymConfig.identity.name} ${gymConfig.identity.branch}`,
      locale: gymConfig.seo.locale,
      ...(image ? { images: [image] } : {}),
    },
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}

export const exerciseGym = {
  '@context': 'https://schema.org',
  '@type': 'ExerciseGym',
  name: `${gymConfig.identity.name} ${gymConfig.identity.branch}`,
  address: { '@type': 'PostalAddress', ...gymConfig.seo.postalAddress },
  ...(siteOrigin ? { '@id': `${siteOrigin}/#gym`, url: `${siteOrigin}/` } : {}),
};

export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}
