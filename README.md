# SOLID FITNESS — checkpoint 01

This runnable checkpoint contains the shared layout and navbar only. The large heading in the body is a temporary review placeholder, not the completed hero.

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

Next checkpoint: hero. No later sections have been built.

## Contact links update

Navbar, hero placeholder and contact preview now have Call links. The mobile menu also includes Call. WhatsApp uses the supplied number and message from gym-config.ts; its sticky action displays below 768px. The number is marked TODO for verification. No calls or messages were sent during checks. Lint, TypeScript and production build passed; rendered responsive and interaction checks remain blocked by browser availability.
