# SOLID FITNESS — checkpoint 04

This checkpoint adds the Contact trial form, accessible validation, plan-specific WhatsApp messages, plan preselection and manual copy fallback. Contact actions remain gated; no enquiry is saved or sent automatically.

## Run locally

Install Node.js 22 LTS or newer, open a terminal in this folder, then run:

    npm ci
    npm run dev

Open http://localhost:3000. Stop the server with Ctrl+C.

## Check

    npm run lint
    npx tsc --noEmit
    npm run build

Review desktop navigation, phone Menu/Close, Escape to close, keyboard focus and the Contact trial form. Future section labels are intentionally unavailable until those sections are built. Preview metadata is noindex. Real gym contacts are not configured.

## Files

Design choices: design.md. Single content source: src/content/gym-config.ts. Site entry: src/app/page.tsx. Navbar: src/components/sections/navbar.tsx.

Next checkpoint: classes. Hero, Pricing and Contact are implemented.

## Contact links update

Navbar, hero placeholder and contact preview now have Call links. The mobile menu also includes Call. WhatsApp uses the supplied number and message from gym-config.ts; its sticky action displays below 768px. The number is marked TODO for verification. No calls or messages were sent during checks. Lint, TypeScript and production build passed; rendered responsive and interaction checks remain blocked by browser availability.

## Explicit preview contact flag

Placeholder Call and WhatsApp destinations are disabled by default, including production builds. To exercise the supplied TODO number in a local preview, copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_CONTACT_PREVIEW=true`, then restart the dev server. For a built preview, set the flag before `npm run build`; changing it only at server start will not change the compiled client bundle. Leave false for production. Preview metadata remains noindex. No real calls or messages are sent by verification.


## Training section

Training is driven only by gymConfig.programs (id, name, optional description). It is currently empty: npm run dev shows the labelled placeholder; production builds omit Training and its navigation entry. Approved records render semantic cards with program-specific WhatsApp messages through the existing contact gating. Browser responsive and interaction checks remain blocked; see verify.md.


## Trainers section

Trainers uses gymConfig.trainers: id, name, role, credentials ({ title, verified }), photo ({ src, alt, width, height }) and approved. Only approved records and verified credentials render. Store approved photos of the actual people in public/images; there are no supplied trainer records or photos yet. Empty/unapproved-only data shows a development placeholder and is omitted from production along with its nav link. “Ask about coaching” uses the shared gated WhatsApp helper. Browser checks remain blocked.


## Gallery section

Gallery records use id, src (local /images/... path), width, height, caption, alt and rightsApproved. No real gym photos are supplied yet. Development shows neutral “Photo to be supplied” placeholders; production omits unapproved images and hides the empty section/nav. All Gallery images load lazily. Plan Your Visit reaches the config address at #location inside Contact; the map remains deferred.


## Testimonials section

Testimonials uses gymConfig.testimonials records with id, quote, displayName, source (attribution text) and permission. Only permitted, complete records render as static blockquotes with attribution. The array is empty: development shows one labelled placeholder; production omits the section and Stories nav link. No ratings, stars or invented quotes are supplied. The preview status strip remains removed.


## FAQ section

FAQ uses typed gymConfig.faq entries: id, question, status (confirmed/unconfirmed), and answer (string for confirmed, null for unconfirmed). Confirmed address/prices derive from shared config values backed by scope. Pending topics appear only in development as “To be confirmed.” Native details/summary work without component JavaScript; the closing WhatsApp CTA follows existing contact gating. Browser interaction and 360px verification remain blocked.

new one !

