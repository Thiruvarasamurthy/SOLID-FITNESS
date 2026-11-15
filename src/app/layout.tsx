import type { Metadata } from 'next';
import './globals.css';
import { StickyWhatsAppButton } from '@/components/sections/sticky-whatsapp-button';
import { Navbar } from '@/components/sections/navbar';
import { gymConfig } from '@/content/gym-config';
export const metadata: Metadata = {
  title: `${gymConfig.identity.name} | ${gymConfig.identity.branch} — Preview`,
  description: gymConfig.preview.description,
  robots: { index: false, follow: false },
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
        <StickyWhatsAppButton />
      </body>
    </html>
  );
}
