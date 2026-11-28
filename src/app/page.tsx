import { BackgroundStage } from '@/components/motion/background-stage';
import { ClosingCta } from '@/components/sections/closing-cta';
import { gymConfig } from '@/content/gym-config';
import { exerciseGym, pageMetadata, serializeJsonLd } from '@/lib/seo';
import { Location } from '@/components/sections/location';
import { ScrollStory } from '@/components/sections/scroll-story';
import { StatementReveal } from '@/components/motion/statement-reveal';
import { Hero } from '@/components/sections/hero';
import { Classes } from '@/components/sections/classes';
import { Gallery } from '@/components/sections/gallery';
import { Pricing } from '@/components/sections/pricing';
import { Trainers } from '@/components/sections/trainers';
import { Testimonials } from '@/components/sections/testimonials';
import { Contact } from '@/components/sections/contact';
import { Faq } from '@/components/sections/faq';
export const metadata = pageMetadata(
  '/',
  gymConfig.seo.title,
  gymConfig.seo.description,
);

export default function Home() {
  return (
    <main id="main" tabIndex={-1} className="container checkpoint">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(exerciseGym) }}
      />
      <BackgroundStage />
      <Hero />
      <ScrollStory />
      {gymConfig.statement?.trim() && (
        <StatementReveal text={gymConfig.statement} />
      )}
      <Classes />
      <Gallery />
      <Trainers />
      <Testimonials />
      <Pricing />
      <Faq />
      <Contact />
      <Location />
      <ClosingCta />
    </main>
  );
}
