export const gymConfig = {
  identity: { name: 'SOLID FITNESS', branch: 'Velachery', city: 'Chennai' },
  address:
    '29/2, Second Floor, 1st Main Road, Taramani Link Rd, Tansi Nagar, Velachery, Chennai, Tamil Nadu 600042',
  contact: {
    // TODO: Verify or replace this user supplied placeholder before launch.
    phone: '+917904269276',
    status: 'placeholder' as 'placeholder' | 'confirmed',
    whatsappMessage: "Hi, I'd like to know about membership plans.",
    email: null,
    placeholder: '+91 79042 69276',
    previewNote: 'Preview contact number — verification pending.',
  },
  plans: [
    { id: 'one-month', months: 1, price: 2599 },
    { id: 'three-months', months: 3, price: 3999 },
    { id: 'six-months', months: 6, price: 5999 },
    { id: 'twelve-months', months: 12, price: 10999 },
  ],
  pricing: {
    heading: 'Membership plans',
    note: 'Inclusions and fee terms to be confirmed.',
  },
  hero: {
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
  navigation: ['Training', 'Plans', 'Trainers', 'Facility', 'Visit'],
  preview: {
    label: 'DESIGN PREVIEW / 03',
    title: 'THE FOUNDATION.',
    description:
      'Layout, navigation, hero and pricing are ready for review. Remaining sections will follow one at a time.',
    notice:
      'Trial enquiries will be available when the contact section and verified gym details are ready.',
    status: 'Layout + navbar + hero + pricing',
  },
  programs: [],
  trainers: [],
  testimonials: [],
  gallery: [],
} as const;
