import type { MetadataRoute } from 'next';
import { indexable, siteOrigin } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    // Allow crawlers to read preview noindex tags; robots is not access control.
    rules: { userAgent: '*', allow: '/' },
    ...(indexable && siteOrigin
      ? { sitemap: `${siteOrigin}/sitemap.xml` }
      : {}),
  };
}
