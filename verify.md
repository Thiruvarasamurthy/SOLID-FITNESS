# Verification: current implementation and checkpoint history

Updated 18 November 2026. Home sections, dedicated Location, Footer, Privacy, SEO, not-found recovery and automated test setup exist. Optional approved content and owner inputs remain pending. Overall browser verification remains BLOCKED. Historical results below retain their dates; later entries supersede affected implementation details.

## Current status summary

| Check | Result | Evidence |
| --- | --- | --- |
| Lint, TypeScript, production builds (preview true and false) | PASS | See selected review 02 fixes, 18 November 2026, below |
| Placeholder contact gating | PASS | Default build has no tel or wa.me anchors; explicit preview flag enables them |
| Plan-specific WhatsApp messages | PASS | Checkpoint 04 helper execution and preview HTML |
| Trial form and WhatsApp handoff | IMPLEMENTED; browser BLOCKED | Helper validation executed; interactions, popup and clipboard behavior untested in a browser |
| Automated tests | UNIT PASS; E2E BLOCKED | Vitest: 44 tests pass across 3 files. Playwright main-flow test added; browser launch fails before any steps run. See automated test validation below |
| Responsive 360, 768, 1280, 1920px | BLOCKED | No rendered viewport verification yet |
| Keyboard, focus, console, reduced motion at runtime | BLOCKED | No functioning browser available |
| Later sections and routes | IMPLEMENTED; browser BLOCKED | Location/map component, Footer, Privacy, SEO and not-found recovery exist. Owner data remains pending; Why Solid Fitness remains deferred |

## Checkpoint 01 baseline (historical, superseded where noted by later checkpoints)


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

Checkpoints 02-04 add Hero, Pricing and Contact with the trial form. Other sections remain deferred and the overall site is not declared complete.

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
| Pricing WhatsApp gating | PASS for built HTML | Default placeholder build emits no tel/wa.me anchors. Explicit-preview build emits four pricing WhatsApp links with the config number and exact decoded message; Contact CTAs remain available (message wording superseded by checkpoint 04: pricing messages are now plan-specific) |
| Disabled ContactAction | PASS for source and markup | Removed role="link"; aria-disabled and sr-only explanation retained |
| Hero entrance | PASS for source review; runtime BLOCKED | Only y animates, 16px to 0 in 350ms; opacity is never reduced. Existing reduced-motion early return and change handler retained |
| Responsive 360, 768, 1280, 1920px | BLOCKED for rendered verification | CSS uses one minmax(0, 1fr) column below 768px, two from 768px and four from 1100px. Cards use min-width: 0 and wrapping. No horizontal-scroll claim is made without a browser |
| Images | PASS for unchanged implementation | Pricing adds no images; Hero retains its dimensioned local SVG and eager loading |
| Console, keyboard and reduced-motion runtime | BLOCKED | Chromium launch retried: process_singleton socket() failed with Operation not permitted. No browser console or interaction checks could run |

Manual follow-up: run `npm run dev`, inspect all four requested widths for horizontal scroll, open mobile Menu and activate Plans, tab through each card CTA, and confirm Contact is reached. Repeat with the explicit contact preview flag and reduced motion. Do not send test messages or place calls without intending to do so. Plan selection in a future trial form was not implemented in this checkpoint (superseded by checkpoint 04).


## Checkpoint 04 validation, 17 November 2026

Contact replaces the old preview block. Other full sections remain deferred. Navbar trial links now reach Contact. The privacy explanation is an in-section disclosure with a working link; the separate privacy page remains deferred.

| Check | Result | Evidence |
| --- | --- | --- |
| Lint and TypeScript | PASS | ESLint and tsc --noEmit exited 0 |
| Production builds | PASS | Explicit preview true and false builds completed without warnings; final output has preview disabled |
| Plan-specific WhatsApp | PASS | Tested each configured duration, branch/name interpolation, URI encoding round trip, null when disabled, and rejection of unknown durations. Preview HTML contains four distinct plan messages |
| Trial validation and message | PASS for helper execution | Required/blank name, name length, invalid mobile, international mobile, preferred-time limit, invalid plan, optional empty fields, trimming and encoded message round trip checked |
| Form markup | PASS | Production HTML includes all four fields, matching labels, valid description IDs and fragment targets. Submit is disabled before hydration; fields have no name attributes so a native GET cannot leak enquiry values |
| Default placeholder gating | PASS | Default production markup has no tel or wa.me anchors; submit is disabled and includes an unavailable explanation |
| Privacy and handoff | SOURCE REVIEW | No endpoint, analytics or browser storage added. Submit prevents native navigation, validates, and opens WhatsApp synchronously in a new tab. Only the visitor can send the message. Copy fallback includes selectable text and clipboard-error handling |
| Error and plan selection interactions | SOURCE REVIEW; browser BLOCKED | Error summary links to inline errors, aria-invalid/describedby connect errors, first invalid field receives focus. Plan card event selects a validated plan ID in memory; plain #contact anchor remains without JavaScript |
| Sticky overlap and display font | SOURCE REVIEW; browser BLOCKED | html bottom scroll padding is 96px plus safe area. Floating WhatsApp hides while Contact has focus. Hero and Pricing share --font-display, preserving the previous stack |
| Responsive, keyboard, console and device handoff | BLOCKED | Chromium launch retried and failed with process_singleton socket() Operation not permitted. No browser interaction, viewport, popup/clipboard, actual call/message or Lighthouse result is claimed |

Test status: the helper results above were produced by ad-hoc execution. No committed automated test suite is claimed; unit tests for the contact link builder and trial validation are pending (step 06).

Manual checks: at 360, 768, 1280 and 1920px inspect reflow and focus visibility. In explicit preview mode, select a plan card, submit empty fields, correct errors and continue with intentional test details. Verify the editable WhatsApp message, retained page state, copy fallback (including denied clipboard access), and reduced motion. Default mode must block handoff. Contact number and trial terms still require owner verification before launch.


## Preview status strip removal, 17 November 2026

Removed the homepage checkpoint status strip and its unused config import only. No new section was specified or built; gym facts and section behavior are unchanged.

- PASS: ESLint, TypeScript and production build with contact preview disabled exited 0 without warnings.
- PASS: generated production HTML contains neither the checkpoint-status element nor “Next: Classes”.
- BLOCKED: browser layout, 360px horizontal overflow, keyboard and console checks were not run for this edit. Earlier browser restrictions remain recorded above; no visual pass is claimed.


## Classes / Training validation, 17 November 2026

Implemented Classes between Hero and Pricing with nav label Training and anchor #classes. The real programs array remains empty. Development shows one labelled “Training programs to be confirmed” placeholder without a card CTA. Production omits the empty section and Training entry in both navigation layouts, even if contact preview is enabled. Existing preview status strip remains removed.

| Check | Result | Evidence |
| --- | --- | --- |
| Lint, TypeScript, production build | PASS | ESLint, tsc --noEmit and production build with contact preview false exited 0 without warnings |
| Empty content behavior | PASS for server rendering | Ad-hoc React server rendering checked development placeholder and production omission, with matching desktop navigation. Built production HTML has no #classes section/link or placeholder text |
| Populated cards and message helper | PASS for helper/server execution | In-memory fixture verified semantic article/h3, configured name/description, enabled/disabled WhatsApp and exact encoded text with special characters. Unknown program names return null. No fixture was saved to gym config |
| Shared contact behavior | PASS for source and helper checks | Program helper uses the same createWhatsAppLink/createContactLinks path as plan links; template is in gym-config.ts. Disabled cards use the existing ContactAction explanation |
| Mobile layout | SOURCE REVIEW; browser BLOCKED | One minmax(0, 1fr) column below 768px, zero minimum card width, wrapping text and bounded CTA. No carousel or new animation. 360px overflow is not visually verified |
| Expanded mobile navigation, focus, console | BLOCKED | Not executed in a browser this turn; existing environment restriction remains unresolved |

The first ad-hoc render harness failed to resolve a relative import. Corrected the harness resolver and reran successfully; no application fix was needed. These checks are ad-hoc, not a committed automated suite. To inspect the empty placeholder use npm run dev; npm run build followed by npm start intentionally hides it. Add only approved program records (id, name, optional description) to gymConfig.programs.


## Trainers validation, 17 November 2026

Trainers (#trainers) uses only gymConfig.trainers records marked approved. The array remains empty: development renders a labelled “Trainer details to be confirmed” placeholder with no person, photo or CTA; production omits the section and Trainers navigation entry. Unapproved-only arrays follow the same rule. No preview status strip was added.

| Check | Result | Evidence |
| --- | --- | --- |
| Lint, TypeScript, production build | PASS | ESLint, tsc --noEmit and production build (contact preview false) exited 0 without warnings |
| Empty/unapproved section and navigation | PASS for server rendering | Ad-hoc React server checks cover empty and unapproved-only records in development and production; production HTML has no Trainers section, link or placeholder |
| Approved cards and verified credentials | PASS for server rendering | Isolated in-memory fixtures show only approved records and credential entries with verified === true. Fixture people/photos were never written to config or public assets |
| Photos | PASS for rendered markup; browser BLOCKED | next/image receives config src, alt, width and height, responsive sizes and lazy loading. No real trainer photo is supplied, so image delivery and visual quality remain unverified |
| Coaching CTA | PASS for helper execution | “Ask about coaching” uses shared contact gating and URI encoding with a config template. Verified exact message with special characters; unknown/unapproved IDs return null, as do disabled placeholder contacts |
| Mobile and interactions | SOURCE REVIEW; browser BLOCKED | Reuses the mobile-first Training grid, bounded image widths and wrapping cards. No browser viewport, 360px overflow, expanded menu, keyboard, console or device handoff checks ran |

Approval covers identity, role, the actual person's photograph and publication permission. Credentials are independently marked verified. Supply approved local photographs under public/images with descriptive alt text and intrinsic dimensions; do not substitute stock people. Tests above are ad-hoc checks, not a committed test suite. No calls or messages were sent.


## Gallery validation, 17 November 2026

Gallery (#gallery), between Training and Trainers, renders config images with rightsApproved === true. Empty development mode uses three neutral existing local SVG placeholders labelled “Photo to be supplied”. Unapproved/invalid records use neutral placeholders in development and are omitted in production. Empty production output omits Gallery and its Facility nav link. No lightbox, eager Gallery image, invented gym photograph or status strip was added.

The CTA is “Plan Your Visit” to #location. Because that target did not exist, added a minimal address block inside Contact using the existing confirmed config address. A map, hours and directions links remain deferred.

| Check | Result | Evidence |
| --- | --- | --- |
| Lint, TypeScript, production build | PASS after fix | Initial TypeScript check found flatMap inference mixing approved images and placeholders. Added an explicit display-image type; lint, tsc and production build then exited 0 without warnings |
| Approval and preview behavior | PASS for ad-hoc server rendering | Checked empty, unapproved-only and mixed data in development/production; unapproved photo sources never appear in rendered Gallery. Config gallery remains empty; fixtures were in memory only |
| Image markup | PASS for server rendering | next/image receives local src, intrinsic width/height, alt, responsive sizes and loading=lazy; captions use config. No eager Gallery images. Existing neutral placeholder asset is present |
| Invalid image records | PASS for helper checks | Remote paths, traversal paths, nonpositive dimensions and blank approved alt text are excluded in production |
| Navigation and CTA | PASS for markup; browser BLOCKED | Facility nav follows Gallery visibility; CTA targets #location. Built output has a real location target and all rendered fragment links resolve |
| Responsive and interactions | SOURCE REVIEW; browser BLOCKED | One minmax(0, 1fr) column on phones, two from 768px, three from 1100px; bounded images and wrapping captions. No rendered 360px overflow, keyboard, console, image network or visual-quality check ran |

These were ad-hoc helper/server-render checks, not a committed automated suite. Future image records require actual approved files under public/images and correct dimensions, captions and alt text. Run npm run dev to see neutral placeholders; production intentionally hides the empty Gallery.


## Testimonials validation, 17 November 2026

Testimonials (#testimonials) sits between Trainers and Pricing. Only config records with permission === true and nonempty quote, displayName and source render. The real array remains empty. Development shows exactly one labelled “Member stories to be added with permission” placeholder, without a blockquote or attribution. Production omits the section and Stories nav link when no permitted, complete records exist. Both nav layouts share visibility rules. No invented reviews, ratings, stars, member counts, carousel, animation or preview status strip were added.

| Check | Result | Evidence |
| --- | --- | --- |
| Lint and TypeScript | PASS | ESLint and tsc --noEmit exited 0 |
| Production build | PASS | Production build with contact preview false exited 0 without warnings; rebuilt after preserving the existing container breakpoint |
| Permission and empty behavior | PASS for ad-hoc server checks | Empty, unapproved-only and incomplete records checked in development/production. Preview contains one placeholder and no blockquote; production returns no section or nav entry |
| Approved content semantics | PASS for ad-hoc rendering | In-memory non-review sentinel strings checked figure/blockquote/figcaption, display name/source attribution, escaped text and exclusion of unapproved records. No testimonial content was saved to config |
| Status strip and production omission | PASS for built markup | No testimonial section/link/placeholder or checkpoint-status element with the current empty config |
| Responsive and browser interaction | SOURCE REVIEW; browser BLOCKED | Single-column rows on phones with min-width: 0, wrapping text, 65ch quote limit and 16px attribution. Desktop nav now begins at 1280px to allow room for Stories; existing content gutters retain their 1100px breakpoint. No rendered 360px overflow, expanded-menu, keyboard, console or visual pass is claimed |

Design decisions: design-taste-frontend informed aligned, static quote/attribution rows instead of another boxed card grid. ui-ux-pro-max's targeted typography guidance informed the 65ch reading width and at-least-16px attribution text. AGENTS.md and the requested surgical scope take precedence over full-page restyling, stock imagery, fixed-screen sections or unrelated motion. No full-page skill gate or browser audit was run. These are ad-hoc checks, not a committed test suite.


## FAQ validation, 17 November 2026

FAQ (#faq) follows Pricing and precedes Contact. Typed gymConfig.faq entries distinguish confirmed answers from unconfirmed null answers. Address and plan totals are derived from the same config values used elsewhere, sourced from docs/scope/scope.md section 2. Trial terms, hours, fees/inclusions and coaching are pending in scope section 8: development renders “To be confirmed.” for these; production omits their entire disclosures. No gym facts were inferred or invented.

| Check | Result | Evidence |
| --- | --- | --- |
| Lint, TypeScript, production build | PASS | ESLint, tsc --noEmit and production build with contact preview false exited 0 without warnings |
| Content filtering | PASS for ad-hoc server rendering | Six development disclosures, two production disclosures. Confirmed address and all four INR totals match config; pending questions/answers absent in production |
| Native markup | PASS for source/server markup | Each details has a direct summary child, starts closed, and uses browser semantics with no redundant role, aria-expanded, state hook, event handler or animation dependency |
| Closing CTA | PASS for server rendering | Exact “Still have questions? WhatsApp” label uses shared contactLinks/ContactAction. Checked disabled placeholder and enabled explicit preview states in development and production render contexts; no message sent |
| Built output and status strip | PASS | Production HTML contains two FAQ details/summary pairs and no checkpoint-status element; no new preview strip added |
| Readability, focus, touch targets | SOURCE REVIEW; browser BLOCKED | 18px semibold questions, 16px answers capped at 65ch, wrapping rows, summary min-height 44px with 16px padding. Explicit focus-visible outline; native marker and open-state surface color. Sticky WhatsApp hides while FAQ has focus |
| Interaction and 360px layout | BLOCKED | No browser run this turn: Space/Enter toggling, focus retention, no-JavaScript interaction, 360px overflow, console and actual device handoff remain unverified |

Skill decisions: ui-ux-pro-max's targeted readability guidance informed the 18px question / 16px answer hierarchy. emil-design-eng informed immediate native toggles without animation, a visible open state, and focus retained on the summary instead of scripted focus moves. Project rules override unnecessary motion or broader redesign. Checks were ad-hoc server-render checks, not a committed automated suite.


## Location validation, 17 November 2026

Replaced the address fragment inside Contact with a dedicated #location section after Contact and enabled Visit navigation. Full address remains config-driven; hours are To be confirmed. Nullable directions, Google Business and map URLs remain null; no coordinates or old map were used. No status strip was added.

- PASS: lint, TypeScript and production build completed without warnings.
- PASS: built HTML has exactly one location target, Visit anchor and no iframe with current null configuration.
- SOURCE REVIEW: HTTPS external links are omitted when null/invalid. Map requires embedVerified plus a Google Maps embed URL; iframe is rendered only after Load map is clicked. Map box reserves 360px height in both states. No verified embed renders a labelled placeholder.
- BLOCKED: browser 360px overflow, clicking Load map, actual iframe loading, focus behavior, navigation interactions and console were not tested. No real verified URLs are available to test external destinations.

Layout decision: design-taste-frontend informed aligned address/map columns that stack on mobile. ui-ux-pro-max general action hierarchy informed a primary Get Directions action and secondary business-profile action; the initial targeted search was off-topic, so no database-specific action recommendation is claimed. Existing Contact controls remain separate. Full browser validation remains outstanding.


## Footer validation, 18 November 2026

Added a server Footer with config identity/address, conditional existing-section links, the user-supplied Instagram URL in nullable config, shared gated contact controls and a privacy link to the existing enquiry disclosure. The separate privacy page remains deferred. Footer fragment links include / so they also reach the homepage from the not-found route. No status strip was added.

- PASS: lint, TypeScript, formatting and production build. The year component awaits connection() then calls new Date().getFullYear() on the server inside Suspense, enabling request-time year updates without annual edits/rebuilds.
- PASS: production HTTP response 200 contained the current server year. Parsed footer links resolved to homepage IDs; omitted sections had no footer links, supplied Instagram appeared, and placeholder tel/WhatsApp destinations were absent.
- SOURCE REVIEW: null or invalid Instagram URL is omitted. Shared content visibility rules drive optional links, including FAQ filtering.
- SOURCE REVIEW: existing bottom scroll padding retained; footer has 112px plus safe-area bottom spacing and sticky WhatsApp hides while footer has focus. Navigation links have 44px minimum height.
- BLOCKED: browser 360px layout, overflow, focus/scroll overlap, external Instagram navigation and privacy-disclosure interaction not run. The privacy link lands at the existing summary; visitors open it using native disclosure behavior.

Applied design-taste-frontend: aligned identity, navigation and contact columns with shared display typography, stacked on phones. Existing project rules override unrelated page redesign. No browser design gate pass is claimed.


## Privacy page validation, 18 November 2026

Added /privacy with config-driven overview, update date, form memory behavior, WhatsApp transfer, map activation, hosting-log uncertainty and retention marked owner input needed. It does not claim the site collects no data. Browser autofill/session restoration and third-party processing are distinguished from application storage. Privacy is linked from the trial form, Contact disclosure and Footer; the original disclosure and its open handler remain. Navbar homepage links now work from /privacy. Shared layout supplies the same header, Footer and gated sticky control.

- PASS after fix: lint, TypeScript and production build. Initial lint required Next Link for homepage navigation; fixed those links. An HTTP check against the previous build returned 404 before the successful rebuild; final / and /privacy requests both returned 200.
- PASS: HTTP markup checks for own description, one H1, shared Footer, valid homepage fragment destinations, three homepage privacy links and retained Contact disclosure.
- PASS: canonical function tests for valid HTTPS origin, missing origin and unsafe protocol. NEXT_PUBLIC_SITE_URL is blank until an approved deployment origin is provided. Canonical activation is PENDING that input; no domain was invented. Rebuild after configuring it.
- SOURCE REVIEW: 65ch reading measure, 16px body / 1.7 line height, 24px subsection headings and 40px section spacing. Footer bottom spacing retained and sticky WhatsApp hides while privacy content has focus.
- BLOCKED: browser 360px reflow, keyboard/focus, cross-page navigation interaction, disclosure interaction and console were not run. No legal compliance certification or verified retention policy is claimed.

Applied ui-ux-pro-max: its line-length guidance led to a 65ch reading column with clear heading and paragraph spacing. Checks are ad-hoc, not a committed automated suite.

## Metadata and discovery validation, 18 November 2026

Added config-driven home/privacy metadata and Open Graph text, shared HTTPS-origin canonical handling, public-route sitemap, robots route and homepage ExerciseGym JSON-LD. Unknown telephone, geo, hours, ratings, social identity claims and images are omitted from schema. No social-preview image is claimed approved. Canonicals and schema URL/ID are absent until NEXT_PUBLIC_SITE_URL is a valid HTTPS origin without credentials, path, query or fragment.

Indexing requires NODE_ENV=production, NEXT_PUBLIC_SITE_INDEXABLE=true, a valid site origin and contact preview disabled. Defaults remain noindex/nofollow, with an empty sitemap. robots allows crawlers to read noindex tags and advertises the sitemap only when indexing is enabled; it is not access control. Keep the indexing flag false on all preview deployments and rebuild after changing environment settings. Private previews require deployment access controls.

| Check | Result | Evidence |
| --- | --- | --- |
| Lint, types, production build | PASS after fix | Initial tsc caught nullable origin narrowing inside the sitemap callback. Fixed with a local constant; rerun lint, tsc and next build exited 0 without warnings |
| Indexing gates and discovery | PASS, ad-hoc module checks | Six cases: defaults, missing origin, invalid HTTP origin, explicit production opt-in, development, and contact-preview override. Only valid opted-in production exposes the two sitemap URLs and robots sitemap reference |
| Origin handling and page metadata | PASS, ad-hoc module checks | Rejects malformed URLs, credentials, HTTP, paths, queries and fragments; normalizes a trailing slash. Privacy canonical/OG URL resolve to /privacy with a synthetic test origin; no domain saved to config |
| JSON-LD safety and omissions | PASS, ad-hoc module checks | A closing-script injection string plus ampersand and Unicode separators round-trips through JSON parsing without literal HTML delimiters. Telephone, geo, hours, ratings, sameAs and image fields are absent |
| Built HTTP responses | PASS | Home, privacy, robots.txt and sitemap.xml returned 200. Both pages have noindex/nofollow and own OG metadata; no canonical with blank origin. Home schema parses with ExerciseGym and confirmed postal code; preview sitemap has no loc entries; robots does not advertise it |
| Indexable deployment output | BLOCKED | Opt-in behavior was module-tested with a synthetic origin, not deployed or built against an owner-approved live domain |
| Browser, mobile layout, console, social sharing, external schema validators | BLOCKED | No browser run this turn. No Lighthouse, 360px reflow, actual social-card rendering, Rich Results Test or search-engine indexing pass is claimed |

### Owner approvals still pending before launch

- Public brand name/logo and branch-only scope; English-only launch and final content/design approval. Accept a static hero or supply licensed motion; approve genuine hero/gallery/social-preview images and usage rights, or approve their omission.
- Verified call, WhatsApp and any email/privacy destination; responsible staff, trial handoff and failure handling. Confirm trial availability, cost, duration, eligibility and booking confirmation process.
- Plan inclusions, taxes, joining fees, coaching charges and any expiry conditions; opening hours, holidays and access periods; entrance/access details and verified map pin, embed, directions and Google Business URLs.
- Confirm programs/coaching and any timetable before publication. Approve trainer identities, credentials/photos and testimonial text/source/permission if those optional sections will appear; otherwise keep them omitted. Confirm ownership of the supplied Instagram profile.
- Approve canonical HTTPS domain, hosting, domain control, existing URL/redirect plan and effects on other branches. Explicitly approve enabling indexing only after release checks.
- Approve privacy notice, enquiry purpose, staff access, WhatsApp retention/deletion handling, privacy contact, hosting provider/log settings and log retention. Replace owner-input-needed text with the approved practices.
- Name launch/content approver and ongoing maintenance owner; agree launch date/budget and staff response expectations. Any analytics/measurement integration requires a separate decision and privacy review; none has been added.

These checks are ad-hoc script/server checks, not a committed automated test suite. No gym facts or production origin were invented; no commit or deployment performed.

## Restrained reveals and press feedback, 18 November 2026

Added a reusable client Reveal wrapper to one new motion moment: the Pricing heading and four plan cards. Existing h2/article semantics, grid boxes, content and CTA code are retained. No Contact/form components or contact helpers changed. Hero keeps its existing entrance; Gallery and other sections remain unchanged.

| Check | Result | Evidence |
| --- | --- | --- |
| Lint, TypeScript, production build | PASS | ESLint, tsc --noEmit and next build exited 0 without warnings |
| Reveal bounds and once behavior | PASS for source/mocked effects | 280ms, opacity 0.95 to 1, y 16px to 0, custom ease-out [0.23, 1, 0.32, 1]. Card delays 0/20/40/60ms; wrapper clamps delay to 60ms. Observer disconnects at first entry |
| Failure and reduced-motion paths | PASS for ad-hoc mocked effects | Initial reduced motion skips observer/animation. Preference changes stop motion; synchronous animation errors and a 450ms watchdog restore opacity 1/transform none. Promise completion/rejection also restores styles. Opacity never reaches zero even if recovery cannot execute |
| Server content and semantics | PASS for built HTTP markup | Four article cards and the pricing h2 are present without opacity/transform initial styles; #contact CTA remains. Server output is readable without hydration; no extra layout wrappers were introduced |
| Focus handling | SOURCE REVIEW | Focus inside a Reveal disconnects its observer and restores the final state; entry is skipped if it already contains focus |
| Button press rules | SOURCE REVIEW | Enabled button elements and button-styled anchors outside #contact scale to 0.98 over 100ms. Disabled controls and keyboard focus-visible presses are excluded. Rules apply only under no-preference; Contact/form are excluded |
| Animation timing, easing, once behavior in browser, reduced-motion emulation, press feel | BLOCKED | No browser run. Mocked effects establish code paths, not rendered timing, smoothness or compositor behavior |
| Mobile 360px, overflow, keyboard, console, no-JS browser journey | BLOCKED | No browser run; semantic/grid preservation was checked in source and HTTP output only |

Applied emil-design-eng: chose a custom ease-out, a 280ms entrance and interruptible 100ms CSS press response. Applied design-taste-frontend: limited the new reveals to Pricing as one purposeful moment, rather than adding motion to every section. User and AGENTS.md limits override broader skill effects, full-page redesign and conflicting reveal guidance. No full-page skill browser gate pass is claimed. These tests are ad-hoc; no new persistent test suite, contact behavior changes or gym facts were added.

## Automated test validation, 18 November 2026

Added Vitest 4.1.12 and Playwright 1.65.1 as development dependencies with the npm lockfile updated. The initial attempt to install Vitest 5 failed on its Node type peer requirement; installed compatible Vitest 4 without force or legacy-peer-deps. Application code and gym config are unchanged.

| Check | Result | Evidence |
| --- | --- | --- |
| Vitest | PASS | npm test: 2 files, 41 tests passed; repeated after resuming the session with the same result |
| Contact links | PASS | Placeholder gating, explicit preview flag, confirmed contacts, invalid/missing numbers, Unicode/punctuation encoding round trip, all four per-plan messages, unknown durations |
| Trial validation | PASS | Required fields, whitespace, length boundaries, supported mobile formatting, invalid mobiles, optional fields, invalid/configured plans, multiple errors and normalized message preparation |
| Lint, TypeScript, test-file formatting | PASS | npm run lint, npm run typecheck and Prettier check all exited 0 |
| Playwright discovery | PASS | --list finds one main-flow test in the Chromium project |
| Playwright browser flow | BLOCKED | Default run stopped at launch because bundled Chromium was absent. System Chromium retry stopped with process_singleton_posix socket() failed: Operation not permitted. Runner reports one failed test due to browser setup; no navigation, plan click, error or valid-continue assertion executed |

The e2e config builds and starts a dedicated production server on 127.0.0.1:3119 with explicit contact preview true and indexing false, without reusing an existing server. The test uses a 360px viewport, selects a plan, checks required-field errors/focus, fills synthetic visitor details, and verifies the prepared WhatsApp URL and manual fallback. window.open is intercepted and external requests are blocked: it tests handoff preparation, not WhatsApp delivery. No actual call or message is sent. Browser layout, timing and device handoff remain unverified.

Scripts: npm test (one run), npm run test:watch, npm run typecheck, npm run test:e2e:install (install Chromium), npm run test:e2e (build/start/test). Optional PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH selects an existing Chromium executable. Test reports/traces are ignored in .gitignore. The first e2e attempt emitted an inherited NO_COLOR/FORCE_COLOR warning; the retry unset NO_COLOR. No browser failure was treated as a passing test. No commit or deployment performed.

Final production build: PASS, exit 0 without build warnings, with NEXT_PUBLIC_CONTACT_PREVIEW=false and NEXT_PUBLIC_SITE_INDEXABLE=false. The current build is restored to disabled placeholder contacts and noindex after the e2e preview build.

## Selected review 02 fixes, 18 November 2026

Scope limited to H3, M2, M4, M5, M6, M7, L1 and L2. C1, H1, H2, H4, M1 and M3 remain open. No contact gating, preview flag implementation, owner-input placeholders, plan prices or supplied address changed.

| Finding | Change | Verification |
| --- | --- | --- |
| H3 | Sticky header constrained to 100dvh with a nonshrinking top row; mobile nav max-height calc(100dvh - 84px), min-height 0 and overflow-y auto | SOURCE REVIEW; actual scrolling, Tab reachability, Escape and zoom BLOCKED |
| M2 | Consolidated Contact h2 rules, line-height 1 and 32px bottom margin; 64px section spacing mobile / 96px desktop matches Pricing | SOURCE REVIEW; visual rhythm BLOCKED |
| M4 | Removed asynchronous iframe onLoad focus; stable callback ref focuses once when the activated map replaces its button, with preventScroll | SOURCE REVIEW; slow-network focus interaction BLOCKED |
| M5 | Visible address and JSON-LD share one structured postalAddress; FAQ derives the same visible value | PASS: new unit assertion checks exact unchanged address and schema/FAQ parity |
| M6 | Nullable socialImage config (path, width, height, alt); optional OG/Twitter images with absolute approved-origin URL | PASS: tests cover null omission and configured image metadata. Config remains null; a valid configured site origin is required for local image paths |
| M7 | Custom not-found main with explanation, Home link and shared gated WhatsApp control | HTTP status/markup checks recorded below; browser recovery BLOCKED |
| L1 | Buttons/desktop nav now 13px; branch label 11px; brand text can shrink/wrap while Menu and brand mark cannot shrink | Browser launch attempted for 360px validation: BLOCKED by socket() Operation not permitted. No no-crowding or no-overflow pass claimed |
| L2 | Updated current summaries in AGENTS.md, design.md and this file; removed unused gymConfig.preview object after source/test reference search | PASS for source/reference review; contact.previewNote, gallery preview slots and all owner-input placeholders retained |

Checks run: lint PASS, tsc PASS, Vitest PASS (44 tests, 3 files). Historical results and all BLOCKED statuses retained. The added address/social tests use synthetic fixtures only in tests, not published config. Existing 100ms press response and reduced-motion exclusion were preserved.

Skill decisions: emil-design-eng informed immediate focus transfer on button replacement instead of network-timed focus, and retaining a scrollable keyboard-accessible disclosure without a focus trap. Impeccable informed matching Contact's heading rhythm and section spacing to existing sections and restoring documented 13px control typography. No broader redesign or unrelated fixes were applied.

Both production builds PASS (NEXT_PUBLIC_CONTACT_PREVIEW=true and false, indexing false), exit 0 with no build errors/warnings. The first emitted Next's informational telemetry notice. In each mode, HTTP GET of an unknown path returned a real 404 with #main, Home and the expected gated WhatsApp output; home metadata omitted social image tags while config is null. Final build restored to contact preview false. No commit or deployment performed.
