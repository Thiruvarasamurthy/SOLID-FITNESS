import type { Metadata } from 'next';
import './globals.css';
import { Footer } from '@/components/sections/footer';
import { StickyWhatsAppButton } from '@/components/sections/sticky-whatsapp-button';
import { Navbar } from '@/components/sections/navbar';
import { indexable, siteOrigin } from '@/lib/seo';
export const metadata: Metadata = {
  metadataBase: siteOrigin ? new URL(siteOrigin) : null,
  robots: { index: indexable, follow: indexable },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Navbar />
        {children}
        <Footer />
        <StickyWhatsAppButton />
      </body>
    </html>
  );
}
