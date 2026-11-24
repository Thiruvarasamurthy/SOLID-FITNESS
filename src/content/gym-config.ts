export type TrainingProgram = {
  id: string;
  name: string;
  description?: string;
};

export type Trainer = {
  id: string;
  name: string;
  role: string;
  credentials: { title: string; verified: boolean }[];
  // Approved photograph of this person, stored under public/images/.
  photo: { src: string; alt: string; width: number; height: number };
  approved: boolean;
};

export type GalleryImage = {
  id: string;
  src: string;
  width: number;
  height: number;
  caption: string;
  alt: string;
  rightsApproved: boolean;
};

export type Testimonial = {
  id: string;
  quote: string;
  displayName: string;
  source: string;
  permission: boolean;
};

export type FaqItem = { id: string; question: string } & (
  | { status: 'confirmed'; answer: string }
  | { status: 'unconfirmed'; answer: null }
);

export type SocialImage = {
  path: string;
  width: number;
  height: number;
  alt: string;
};

const postalAddress = {
  streetAddress:
    '29/2, Second Floor, 1st Main Road, Taramani Link Rd, Tansi Nagar, Velachery',
  addressLocality: 'Chennai',
  addressRegion: 'Tamil Nadu',
  postalCode: '600042',
  addressCountry: 'IN',
};
const address = `${postalAddress.streetAddress}, ${postalAddress.addressLocality}, ${postalAddress.addressRegion} ${postalAddress.postalCode}`;
const plans = [
  { id: 'one-month', months: 1, price: 2599 },
  { id: 'three-months', months: 3, price: 3999 },
  { id: 'six-months', months: 6, price: 5999 },
  { id: 'twelve-months', months: 12, price: 10999 },
];
const rupees = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

export const gymConfig = {
  identity: {
    name: 'SOLID FITNESS',
    branch: 'Velachery',
    city: 'Chennai',
    logo: {
      src: '/images/solid-fitness-logo.png',
      lightSrc: '/images/solid-fitness-logo-original.png',
      width: 372,
      height: 132,
      alt: 'SOLID FITNESS',
      // TODO: Supply a clean transparent PNG; dark src currently preserves the original
      // with CSS treatment. Owner approval of recolor is still required before launch.
    },
  },
  address,
  contact: {
    // TODO: Verify or replace this user supplied placeholder before launch.
    phone: '+917904269276',
    status: 'placeholder' as 'placeholder' | 'confirmed',
    whatsappMessage: "Hi, I'd like to know about membership plans.",
    planMessage:
      "Hi, I'd like to know about the {months}-month membership plan at {name}, {branch}.",
    trialMessage: "Hi, I'd like to enquire about a trial at {name}, {branch}.",
    programMessage: "Hi, I'd like to know about {program} at {name}, {branch}.",
    coachingMessage:
      "Hi, I'd like to ask about coaching with {trainer} at {name}, {branch}.",
    email: null,
    placeholder: '+91 79042 69276',
    previewNote: 'Preview contact number — verification pending.',
  },
  plans,
  // Owner-approved factual statement only; null omits the entire reveal.
  statement: null as string | null,
  story: {
    heading: 'Plan your visit',
    training: 'Training',
    plans: 'Plans',
    visit: 'Visit',
    chooseDuration: 'Choose a plan duration',
    month: 'month',
    months: 'months',
    total: 'Total plan price',
    enquire: 'Enquire about plan',
    directions: 'Get Directions',
    locationDetails: 'View location details',
  },
  faqSection: {
    heading: 'Questions before your visit',
    pendingAnswer: 'To be confirmed.',
    closingCta: 'Still have questions? WhatsApp',
  },
  // Confirmed facts: docs/scope/scope.md section 2; pending topics: section 8.
  faq: [
    {
      id: 'address',
      question: 'Where is the gym?',
      status: 'confirmed',
      answer: address,
    },
    {
      id: 'plans',
      question: 'What are the membership plan prices?',
      status: 'confirmed',
      answer:
        plans
          .map(
            (plan) =>
              `${plan.months} ${plan.months === 1 ? 'month' : 'months'}: ${rupees.format(plan.price)} total`,
          )
          .join('; ') + '.',
    },
    {
      id: 'trial',
      question: 'Is a trial available, and what are the terms?',
      status: 'unconfirmed',
      answer: null,
    },
    {
      id: 'hours',
      question: 'What are the opening hours?',
      status: 'unconfirmed',
      answer: null,
    },
    {
      id: 'fees',
      question: 'What is included, and are there additional fees or taxes?',
      status: 'unconfirmed',
      answer: null,
    },
    {
      id: 'coaching',
      question: 'What training and coaching options are available?',
      status: 'unconfirmed',
      answer: null,
    },
  ] satisfies FaqItem[],
  trial: {
    heading: 'Request a trial',
    terms: 'Trial availability and terms to be confirmed.',
    privacy:
      'Your details stay in this page until you continue to WhatsApp. This site does not save your enquiry. You must send the message in WhatsApp; WhatsApp and the gym handle it from there. Staff retention details are still to be confirmed.',
    handoff:
      'Send your message in WhatsApp. The gym will confirm availability.',
  },
  closing: {
    heading: 'Plan your visit to SOLID FITNESS',
    trial: 'Request a Trial',
    whatsapp: 'Enquire on WhatsApp',
  },
  interface: {
    placeholder: 'Content placeholder',
    credentials: 'Verified credentials',
    coaching: 'Ask about coaching',
  },
  footer: {
    explore: 'Explore',
    visit: 'Visit',
    contact: 'Get in touch',
    home: 'Home',
    faq: 'FAQ',
    contactLink: 'Contact',
    privacy: 'Privacy',
    instagram: 'Instagram',
    whatsapp: 'WhatsApp',
  },
  pricing: {
    heading: 'Membership plans',
    note: 'Inclusions and fee terms to be confirmed.',
  },
  hero: {
    motion: {
      pause: 'Pause decorative motion',
      resume: 'Resume decorative motion',
      unavailable: 'Static artwork',
    },
    eyebrow: 'VELACHERY · CHENNAI',
    intro:
      'Find us on the second floor in Tansi Nagar, off Taramani Link Road. Get in touch to learn about membership plans.',
    trialNote: 'Trial availability and terms are still to be confirmed.',
    image: {
      src: '/images/hero-placeholder.svg',
      width: 960,
      height: 1080,
      alt: 'Neutral placeholder for a future gym photograph',
      caption: 'Gym photograph to be supplied',
    },
  },
  navigation: ['Training', 'Plans', 'Trainers', 'Facility', 'Stories', 'Visit'],
  training: {
    heading: 'Training',
    placeholder: 'Training programs to be confirmed',
  },
  programs: [] as TrainingProgram[],
  trainersSection: {
    heading: 'Trainers',
    placeholder: 'Trainer details to be confirmed',
  },
  trainers: [] as Trainer[],
  testimonialsSection: {
    heading: 'Member stories',
    placeholder: 'Member stories to be added with permission',
  },
  testimonials: [] as Testimonial[],
  gallerySection: {
    heading: 'Facility gallery',
    photoLabel: 'Photo',
    visitLabel: 'Plan Your Visit',
    locationHeading: 'Location',
    placeholder: {
      src: '/images/hero-placeholder.svg',
      width: 960,
      height: 1080,
      alt: '',
      caption: 'Photo to be supplied',
    },
    previewSlots: ['photo-1', 'photo-2', 'photo-3'],
  },
  location: {
    heading: 'Visit SOLID FITNESS',
    hours: 'To be confirmed',
    directionsUrl: null as string | null,
    googleBusinessUrl: null as string | null,
    embedUrl: null as string | null,
    embedVerified: false,
    mapPlaceholder: 'Map location to be confirmed',
  },
  seo: {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || null,
    title: 'SOLID FITNESS Velachery Chennai | Gym & Membership Plans',
    description:
      'Explore membership plans and find SOLID FITNESS in Tansi Nagar, Velachery, Chennai.',
    locale: 'en_IN',
    // TODO: Supply an approved social-preview image before adding image tags.
    socialImage: null as SocialImage | null,
    postalAddress,
  },
  privacy: {
    title: 'Privacy and enquiry details',
    description:
      'How this website handles trial enquiries, WhatsApp handoff and optional Google Maps loading.',
    updated: '18 November 2026',
    sections: [
      {
        id: 'form',
        heading: 'Enquiry details on this page',
        text: 'The trial form asks for your name and mobile number, with optional preferred time and plan. The application keeps these fields and the prepared message in page memory only. It does not deliberately save them to cookies, local storage or a lead database, or submit them to a site API. Browser autofill and session restoration depend on your browser settings.',
      },
      {
        id: 'whatsapp',
        heading: 'Continuing to WhatsApp',
        text: 'Continue to WhatsApp validates the fields and opens WhatsApp in a new tab with the details in an editable message. The prepared details are passed to WhatsApp in the link when you continue. You must send the message there; opening WhatsApp does not confirm a booking or delivery. WhatsApp handles data under its own policies, and the gym receives what you choose to send. Copy message copies the prepared text to your clipboard only when you choose that action.',
      },
      {
        id: 'maps',
        heading: 'Loading Google Maps',
        text: 'The map iframe is not loaded until you choose Load map. When an approved embed is configured and you activate it, your browser connects to Google Maps, which may receive network and browser information and use cookies under its own policies. Without a verified embed, this site shows a placeholder. Directions, business profile and social links connect to their services when you follow them.',
      },
      {
        id: 'hosting',
        heading: 'Hosting logs and technical data',
        text: 'The hosting provider may process technical request information such as IP addresses, requested pages, browser details and timestamps to deliver and protect the website. The hosting provider, log settings and retention periods need owner confirmation. No site analytics or advertising integration has been added to this implementation. This does not mean that the site or its service providers collect no data.',
      },
      {
        id: 'retention',
        heading: 'Retention — owner input needed',
        text: 'Owner input needed: how long staff retain WhatsApp conversations, who can access them, how deletion requests are handled, and the hosting log retention period. This site does not maintain a trial enquiry database. WhatsApp, Google and your browser have separate storage practices; no deletion period is promised here.',
      },
      {
        id: 'contact',
        heading: 'Privacy questions',
        text: 'Owner input needed: a verified privacy contact and the process for handling access or deletion requests. The current contact number is a placeholder awaiting verification; contact actions stay unavailable unless explicitly enabled for preview. No marketing consent is bundled into the trial enquiry.',
      },
    ],
  },
  social: {
    instagramUrl: 'https://www.instagram.com/solidfitness_velachery/' as
      string | null,
  },
  gallery: [] as GalleryImage[],
} as const;
