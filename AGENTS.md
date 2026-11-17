# SOLID FITNESS website

## Context and build approach
Read `docs/scope/scope.md` before work. Goal: more trial requests and WhatsApp enquiries for the Velachery branch. Journey approach: finish discovery to trial request, then enquiries and visits. Checkpoint 01 is implemented: Next.js scaffold, layout, navbar, shared gym config and Call/WhatsApp components. Checkpoint 02 adds the Hero. Checkpoint 03 adds Pricing and enables Plans navigation; other full sections remain pending.

## Stack
Use Next.js App Router, TypeScript with strict checking, Tailwind CSS and Framer Motion, as selected by the user. Prefer Server Components; add small Client Components only for interaction and motion. No database, payment system or hosting provider is selected. Choose compatible supported versions when scaffolding and commit one package manager lockfile. The scope's older statement that no framework was selected is superseded by this user instruction.

## Folder structure and naming
Create directories only when needed. Do not generate empty structure for its own sake.

| Path | Purpose |
| --- | --- |
| `src/app/` | App Router routes, layouts, metadata, loading and error boundaries |
| `src/app/globals.css` | Tailwind entry, design tokens and essential global styles |
| `src/components/ui/` | Shared accessible primitives |
| `src/components/sections/` | Hero, plans, gallery and other page sections |
| `src/components/motion/` | Small reusable motion wrappers and reduced motion behavior |
| `src/content/` | Typed gym facts, plan data and explicit placeholder status |
| `src/lib/` | Shared utilities and server helpers, no UI |
| `public/images/`, `public/video/` | Approved optimized assets |
| `tests/` | Visitor journey tests when needed; small unit tests may be colocated |
| `docs/scope/`, `docs/specs/` | Scope and requested audit; later design decisions |

Use kebab-case filenames and route segments, PascalCase React component and type names, camelCase functions and variables, and UPPER_SNAKE_CASE module constants. Keep Next.js required filenames such as `page.tsx`, `layout.tsx` and `error.tsx` unchanged. Prefer named exports except where Next.js requires default exports.

## Code and editing rules
1. Make surgical edits. Read a file before changing it, preserve working behavior and unrelated formatting, and never rewrite a working file merely for preference.
2. Keep components focused, props typed and data separate from presentation. Avoid `any`, duplicate business facts, unexplained effects and abstractions with no current use.
3. Use two space indentation, semicolons and consistent formatting. ESLint and Prettier are installed; use the project configuration as the formatting authority.
4. Prefer Tailwind utilities and shared tokens; keep inline styles for genuinely dynamic values. Reuse existing components before adding another dependency.
5. Validate untrusted input on the server if a form endpoint is added. Keep secrets server side. Show success only after actual accepted delivery; a WhatsApp click is not a submitted enquiry or booking.
6. Run configured lint, type and production build checks for implementation changes. Verify the affected journey and test meaningful failure cases. Do not claim checks ran before tooling exists. Documentation edits need link and content checks, not an application test suite.

## Mobile and accessibility
Mobile first is mandatory: design the base layout for phones because gym visitors are expected to use phones most often. Enhance for larger screens, never shrink a desktop composition blindly. Verify 320, 375, 390 and 768 pixel widths plus desktop, without horizontal overflow or obscured CTAs.
Target WCAG 2.2 AA. Use semantic landmarks, one clear page H1, ordered headings, real buttons and descriptive links. Provide a skip link, keyboard access and visible focus; sticky UI must not obscure focus or content. Dialogs need accessible names, focus management, Escape handling and focus return.
Maintain contrast of at least 4.5:1 for normal text, 3:1 for large text and 3:1 for relevant UI boundaries and focus indicators. Check actual orange and dark color combinations. Aim for 44 by 44 CSS pixel touch areas; meet WCAG target size and spacing requirements. Do not convey meaning through color alone.
Give meaningful images useful alt text and decorative images empty alt text. Forms need persistent labels, appropriate autocomplete and input modes, associated errors and announced status. Support 200% text zoom and 400% reflow. Honor reduced motion, avoid flashing and scroll capture, and provide pause controls for qualifying automatic movement. The athlete effect must have a usable static fallback with readable headline and CTAs.

## Performance and SEO
Target Lighthouse mobile scores of at least 90 for Performance, Accessibility, Best Practices and SEO on key public pages. Record production URL/build, device profile, Lighthouse version and median of three runs; these are targets, not current results or accessibility certification.
Target field Core Web Vitals at the 75th percentile: LCP ≤2.5 seconds, INP ≤200 milliseconds, CLS ≤0.1. Field verification requires enough real traffic; use lab checks before launch.
Use responsive optimized images with dimensions, prioritize only the likely LCP image and lazy load below fold media. Keep fonts small and avoid unnecessary weights. Minimize client JavaScript, lazy load optional animation, animate transform and opacity where possible, and defer nonessential third party scripts. Never preload a heavy athlete sequence at the expense of content; load maps on demand. Audit media and scripts when a target is missed.
Provide accurate titles, descriptions, canonical URLs, sitemap, robots policy, social previews and branch specific business data. Structured data must contain only confirmed facts. Preserve existing useful URLs or map redirects without disrupting other branches.

## Gym data integrity
Never invent gym data. Use clear placeholders for unknown hours, trainers, qualifications, services, statistics, reviews, trial terms and facilities; do not publish fictional claims as real. Follow the scope's confirmed 29/2 address and four supplied plan totals. Do not add the old ₹500 registration fee or claim taxes or coaching are included without confirmation.
The user supplied contact number lives in config with status `placeholder` and a TODO to verify it. Contact links are disabled by default, including production builds. Only `NEXT_PUBLIC_CONTACT_PREVIEW=true` explicitly enables placeholder links for review. Keep preview builds noindex and rebuild after changing this flag. Disable unavailable contact actions with an explanation; never invent a destination. Replace placeholders with verified contacts before a live enquiry launch. Do not collect health data or include enquiry values in analytics.

_Drafted by /audit from the scope and user instructions. Updated to reflect checkpoints 01 and 02 and contact preview gating._

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
