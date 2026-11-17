# SOLID FITNESS — checkpoint 03

This checkpoint adds four config-driven pricing cards and Plans navigation to the existing layout, navbar and Hero. Contact actions remain gated; the Hero uses a position-only 350ms entrance.

## Run locally

Install Node.js 22 LTS or newer, open a terminal in this folder, then run:

    npm ci
    npm run dev

Open http://localhost:3000. Stop the server with Ctrl+C.

## Check

    npm run lint
    npx tsc --noEmit
    npm run build

Review desktop navigation, phone Menu/Close, Escape to close, keyboard focus and the trial availability notice. Future section labels are intentionally unavailable until those sections are built. Preview metadata is noindex. Real gym contacts are not configured.

## Files

Design choices: design.md. Single content source: src/content/gym-config.ts. Site entry: src/app/page.tsx. Navbar: src/components/sections/navbar.tsx.

Next checkpoint: classes. Only Hero and Pricing are full page sections so far.

## Contact links update

Navbar, hero placeholder and contact preview now have Call links. The mobile menu also includes Call. WhatsApp uses the supplied number and message from gym-config.ts; its sticky action displays below 768px. The number is marked TODO for verification. No calls or messages were sent during checks. Lint, TypeScript and production build passed; rendered responsive and interaction checks remain blocked by browser availability.

## Explicit preview contact flag

Placeholder Call and WhatsApp destinations are disabled by default, including production builds. To exercise the supplied TODO number in a local preview, copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_CONTACT_PREVIEW=true`, then restart the dev server. For a built preview, set the flag before `npm run build`; changing it only at server start will not change the compiled client bundle. Leave false for production. Preview metadata remains noindex. No real calls or messages are sent by verification.
