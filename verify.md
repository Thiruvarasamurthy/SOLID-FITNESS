# Verification: checkpoints 01–03

Updated 17 November 2026. Checkpoint 01 and shared contact components exist; checkpoint 02 adds Hero; checkpoint 03 adds Pricing and Plans navigation. Overall browser verification remains BLOCKED; other sections remain deferred. Earlier evidence below is historical; the checkpoint 03 results supersede it for affected features.

## Checklist and results

| Check | Result | Evidence |
| --- | --- | --- |
| Build with no errors or warnings | PASS after environment correction | Production build exited 0, compiled and prerendered `/` and `/_not-found`; final captured output contained no warning or error. ESLint and TypeScript also exited 0 |
| Existing link targets | PASS for HTTP markup | Production HTTP GET `/` returned 200; both rendered fragment links target the existing main element |
| Buttons and menu interactions | BLOCKED | Code reviewed, but no functioning browser was available to execute clicks, Escape and focus return |
| WhatsApp and call links | IMPLEMENTED, gating checks below | Shared config drives Call and WhatsApp actions; placeholder numbers default to disabled unless the explicit preview flag is true |
| Responsive at 360px | BLOCKED | CSS inspected; no rendered viewport verification possible |
| Responsive at 768px | BLOCKED | CSS inspected; no rendered viewport verification possible |
| Responsive at 1280px | BLOCKED | CSS inspected; no rendered viewport verification possible |
| Responsive at 1920px | BLOCKED | CSS inspected; no rendered viewport verification possible |
| Hero image | IMPLEMENTED | Neutral local SVG with explicit dimensions and eager loading above the fold; no below fold images yet |
| No console errors | BLOCKED | Production request succeeded, but browser console and hydration errors could not be observed |

- [x] Run production build, lint and TypeScript checks.
- [x] Start production server and verify HTTP response and existing fragment targets.
- [x] Fix the identified dangling aria-controls references and check generated markup again.
- [ ] Exercise all buttons and menu keyboard behavior in a browser.
- [ ] Inspect closed and expanded menu at 360, 768, 1280 and 1920px.
- [ ] Verify contact interactions in a browser in both disabled and preview modes.
- [ ] Visually verify hero image sizing at the requested widths.
- [ ] Observe browser console during every interaction.

## Failure and surgical fix

`src/components/sections/navbar.tsx` contained aria-controls values referring to conditionally absent notice and menu elements. Changed only those two attributes to emit their target IDs when the respective controlled element exists. The final HTTP response has no dangling aria-controls references. The runtime expanded states still require browser verification.

The initial npm invocation emitted an unknown http-proxy environment configuration warning. The clean verification command unsets both uppercase and lowercase npm HTTP proxy variables for that process only. No proxy setting or project dependency was changed to hide a source warning.

## Commands and evidence

Build: `env -u npm_config_http_proxy -u NPM_CONFIG_HTTP_PROXY npm run build`, exit 0. Lint used the same environment cleanup; TypeScript used `./node_modules/.bin/tsc --noEmit`, both exit 0. The earlier build transcript was recorded as `verification-build.log` in checkpoint 01.

Started Next.js production server with explicit hostname 127.0.0.1, fetched http://127.0.0.1:3102/ in the same process environment and stopped it. Observed JSON: status 200, missingControlTargets [], two #main links with targetExists true, images 0.

System Chromium previously failed with process singleton socket permission errors. Playwright's alternative headless browser was absent; downloading it failed because the returned archive was invalid. A production server started without an explicit hostname also hit the environment's networkInterfaces restriction; using 127.0.0.1 succeeded. These are environment blocks, not demonstrated responsive or console passes.

## Manual checks still needed

Run `npm ci` then `npm run dev`. At each requested width, verify no horizontal scroll, clipped brand, overlapping CTA or inaccessible expanded menu. Open and close Menu, press Escape, confirm focus returns to Menu, and activate Request a Trial to read its availability notice. Check skip link and logo link. Keep DevTools Console open throughout. Repeat with reduced motion enabled.

Checkpoint 02 now adds Hero. No full later section has been built and the overall site is not declared complete.

## Subsequent contact update

The earlier missing contact verdict is superseded: Call and WhatsApp links are now implemented using the user supplied TODO number from config. At the previous contact checkpoint, production HTML checks confirmed three initial tel links and two wa.me links with the expected decoded message; the mobile menu adds its Call link when expanded. Lint, types and production build pass. Browser interaction and responsive checks remain blocked. No external call or message was initiated.

## Checkpoint 02 validation, 16 November 2026

- PASS: contact helper returns null for placeholder values with preview disabled, accepts explicit preview and confirmed numbers, rejects missing or invalid numbers, and preserves the exact WhatsApp message.
- PASS: production build with `NEXT_PUBLIC_CONTACT_PREVIEW=false` contains no tel or wa.me anchor destinations, one H1, a working #contact target, and a dimensioned eager hero image.
- PASS: production build with `NEXT_PUBLIC_CONTACT_PREVIEW=true` contains three initial Call and three WhatsApp links matching config. The mobile menu Call remains conditional on expansion.
- PASS: both build modes compiled successfully; lint and TypeScript checks passed.
- CODE REVIEW ONLY: HeroEntrance is isolated client code with a 350ms Framer Motion entrance, reduced motion early return and preference change handling. Server content is visible before hydration and without JavaScript. Motion timing has not been measured in a running browser.
- BLOCKED: rendered widths, browser console, keyboard interactions and actual device handoff still need a functioning browser. No calls or WhatsApp messages were sent.

Default production placeholder gating is now enforced. Only the exact flag value `true` opts in; NODE_ENV alone never enables placeholder links. Rebuild when changing the public flag. Current compiled output is reset to preview disabled.

## Checkpoint 03 validation, 17 November 2026

Scope: Pricing only, plus the requested disabled-contact semantics and Hero opacity fixes. No Classes, Trainers, Gallery or later full sections were added.

| Check | Result | Evidence |
| --- | --- | --- |
| Lint, TypeScript, production builds | PASS | ESLint and `tsc --noEmit` exited 0; builds with preview false and true exited 0 without warnings. Final build reset to false |
| Four cards and accurate totals | PASS | Production HTML contains four plan articles and ₹2,599, ₹3,999, ₹5,999, ₹10,999. Source maps `gymConfig.plans` with `Intl.NumberFormat('en-IN')`; no conversions, discounts or popularity badges |
| Fee terms | PASS | Required note appears verbatim below the cards, sourced from config |
| Plan CTAs and Plans navigation | PASS for markup; browser interactions BLOCKED | Four card CTAs point to existing #contact. Desktop Plans points to existing #pricing. Mobile Plans link closes the menu in source; runtime focus and navigation still untested |
| Pricing WhatsApp gating | PASS for built HTML | Default placeholder build emits no tel/wa.me anchors. Explicit-preview build emits four pricing WhatsApp links with the config number and exact decoded message; Contact CTAs remain available |
| Disabled ContactAction | PASS for source and markup | Removed role="link"; aria-disabled and sr-only explanation retained |
| Hero entrance | PASS for source review; runtime BLOCKED | Only y animates, 16px to 0 in 350ms; opacity is never reduced. Existing reduced-motion early return and change handler retained |
| Responsive 360, 768, 1280, 1920px | BLOCKED for rendered verification | CSS uses one minmax(0, 1fr) column below 768px, two from 768px and four from 1100px. Cards use min-width: 0 and wrapping. No horizontal-scroll claim is made without a browser |
| Images | PASS for unchanged implementation | Pricing adds no images; Hero retains its dimensioned local SVG and eager loading |
| Console, keyboard and reduced-motion runtime | BLOCKED | Chromium launch retried: process_singleton socket() failed with Operation not permitted. No browser console or interaction checks could run |

Manual follow-up: run `npm run dev`, inspect all four requested widths for horizontal scroll, open mobile Menu and activate Plans, tab through each card CTA, and confirm Contact is reached. Repeat with the explicit contact preview flag and reduced motion. Do not send test messages or place calls without intending to do so. Plan selection in a future trial form is not implemented in this checkpoint.
