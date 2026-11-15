export const gymConfig = {
  identity: { name: 'SOLID FITNESS', branch: 'Velachery', city: 'Chennai' },
  address:
    '29/2, Second Floor, 1st Main Road, Taramani Link Rd, Tansi Nagar, Velachery, Chennai, Tamil Nadu 600042',
  contact: {
    // TODO: Verify or replace this user supplied placeholder before launch.
    phone: '+917904269276',
    status: 'placeholder',
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
  navigation: ['Training', 'Plans', 'Trainers', 'Facility', 'Visit'],
  preview: {
    label: 'DESIGN PREVIEW / 01',
    title: 'THE FOUNDATION.',
    description:
      'Layout and navigation are ready for review. The hero and remaining sections will follow one at a time.',
    notice:
      'Trial enquiries will be available when the contact section and verified gym details are ready.',
    status: 'Layout + navbar',
  },
  programs: [],
  trainers: [],
  testimonials: [],
  gallery: [],
} as const;
