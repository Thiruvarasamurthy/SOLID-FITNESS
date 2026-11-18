import Link from 'next/link';
import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { gymConfig } from '@/content/gym-config';

export const metadata: Metadata = pageMetadata(
  '/privacy',
  `${gymConfig.privacy.title} | ${gymConfig.identity.name} ${gymConfig.identity.branch}`,
  gymConfig.privacy.description,
);

export default function PrivacyPage() {
  return (
    <main id="main" tabIndex={-1} className="container privacy-page">
      <article>
        <Link href="/" className="privacy-back">
          Back to Home
        </Link>
        <h1>{gymConfig.privacy.title}</h1>
        <p>
          {gymConfig.identity.name} · {gymConfig.identity.branch},{' '}
          {gymConfig.identity.city}
        </p>
        <p>Last updated: {gymConfig.privacy.updated}</p>
        <p>{gymConfig.privacy.description}</p>
        {gymConfig.privacy.sections.map((section) => (
          <section key={section.id} aria-labelledby={`privacy-${section.id}`}>
            <h2 id={`privacy-${section.id}`}>{section.heading}</h2>
            <p>{section.text}</p>
          </section>
        ))}
        <Link className="button" href="/#contact">
          Return to trial form
        </Link>
      </article>
    </main>
  );
}
