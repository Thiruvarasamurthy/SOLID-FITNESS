import type { MetadataRoute } from 'next';
import { indexable, siteOrigin } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = siteOrigin;
  if (!indexable || !origin) return [];
  return ['/', '/privacy'].map((path) => ({
    url: new URL(path, origin).href,
  }));
}
