# SOLID FITNESS design system

Direction (authorized 18 November 2026): red/near-black athletic identity, off-white contrasting sections, and metallic white-to-deep-red ribbon arcs inspired by the new screenshots and recording. Adapt composition and motion only; never reuse reference code, copy, logos or assets. Phase 0 records the target; Phase 1 tokens and navigation are now implemented; clean transparent logo artwork remains pending.

## Palette

| Token | Target value | Usage |
| --- | --- | --- |
| background | #090B0D | Near-black page canvas |
| surface | #14171B | Dark panels and navigation |
| foreground | #F5F2EB | Near-white text on dark |
| muted | #B3B6BA | Supporting text on dark only |
| accent | #E21B23 | Fills, large emphasis and borders |
| accent-text | #FF4D4D | Small accent text on dark |
| accent-deep | #B3121A | Small accent text on light |
| light-surface | #F5F2EB | Off-white sections and alternating pricing cards |
| light-ink | #090B0D | Text on light sections |
| light-muted | #45494F | Supporting text on light |
| on-accent | #FFFFFF | Candidate text on red fills; validate in Phase 1 |
| border | #343A40 | Decorative dark dividers, not assumed accessible control boundaries |
| focus | Theme-specific contrasting outline | Minimum 3:1 against adjacent surface |

Phase 1 must script-check every actual text/background pair and interactive state: 4.5:1 normal text, 3:1 large text and applicable UI/focus boundaries. These are proposed tokens, not a completed contrast audit. Do not reuse dark muted text on light surfaces. Keep text on stable contrasting surfaces during scroll background interpolation; do not interpolate foreground/background blindly through unreadable mid-tones.

## Fonts

Display: locally hosted Barlow Condensed 700 when available, with Impact and Arial Narrow fallbacks. Body: locally hosted Barlow 400/600 when available, with Arial and system sans fallbacks. The first checkpoint uses system fallbacks without external font requests. Display headings uppercase, line height 0.95, tracking -0.02em; body 16px/1.6. Navbar labels 13px/1.4, weight 600, tracking 0.08em. Do not shrink phone text to fit desktop navigation.

## Space and layout

Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px. Container maximum 1280px; gutters 20px mobile, 32px tablet, 48px desktop. Section padding 64px mobile, 96px desktop. Navbar minimum height 80px; 44px minimum control targets. Cards use 1px borders, 4px corners and 24px inner padding. Desktop navigation alone uses a floating pill; retain the bounded mobile disclosure, Escape/focus behavior and 44px controls. No additional glass or pill styling is implied.

## Buttons

Primary: red background, contrast-verified on-accent text, 48px minimum height, 20px horizontal padding, 2px radius, uppercase 13px semibold. Hover uses a separately contrast-verified red state. Secondary: transparent with a visible border. Focus: 2px focus color outline offset 4px. Unavailable actions have a written explanation, no fake destination. Menu is an inline disclosure, not a modal, so no focus trap; Escape closes it and returns focus to its trigger.

## Motion

Two main motion areas: hero ribbon composition and the bounded Training/Plans/Visit story. The closing CTA reuses static ribbon artwork by default to avoid another live GPU context. A statement reveal exists only if the nullable config text is approved; no invented slogan fills the gap.

Menu 180ms custom ease-out; press scale 0.98 for 100ms; hover 150ms on hover-capable fine pointers only. Keyboard selection/focus changes are immediate. Existing small entrances remain within 250–350ms, maximum 16px movement and 60ms stagger. Prefer interruptible transitions, no transition: all. Reduced motion disables all animations, including hover/press transforms, continuous ribbons, trails, smooth scrolling and scroll reveals.

The hero uses a faint dot grid and decorative concentric ribbon bands on the right, with readable DOM headline and CTAs above them. Preserve a calm text area and stack on phones. Pointer tracking never replaces the native cursor; the ring/trail is noninteractive and desktop/fine-pointer only. Provide a keyboard-accessible pause control for continuous decorative movement.

Dark hero → light story region → dark approved content/statement → light pricing surface with alternating light/dark cards → dark closing CTA/footer. FAQ, Contact and Location retain stable readable surfaces. Use Framer Motion useScroll for theme progress and CSS variables; initial server styles must already match each section. Original logo on any light surface; transparent dark-safe logo on dark surfaces. No theme flash or layout movement at hydration.

Only the story container may pin with CSS sticky on desktop; never pin Contact or capture wheel/touch/keyboard scrolling. On phones, no-JS and reduced-motion paths, show normal stacked content. Architecture section 5 defines loading and resource budgets.

## Assets and content

All gym facts and placeholder content live in src/content/gym-config.ts. Unknown people, quotes and services stay explicitly pending. Neutral local placeholders are implemented; approved gym imagery remains pending. Contact and content placeholders must remain honest.

## Review checkpoints

Implemented checkpoints: layout/navbar, Hero, Pricing, Contact, conditional Training/Trainers/Gallery/Testimonials, FAQ, Location, Footer, Privacy, SEO and not-found recovery. Optional sections and their links follow config visibility. The trial form exists; contact gating still disables unverified recipients unless explicitly enabled for preview. Review 02 fixes align Contact spacing and control text; mobile menu scrolling and immediate map focus require browser verification. Preserve incremental scope and all BLOCKED checks in verify.md.

## Redesign composition decisions — Phase 0

- Logo targets: public/images/solid-fitness-logo.png (transparent dark-safe version), public/images/solid-fitness-logo-original.png (light surfaces), src/app/icon.png. Navbar uses next/image via gymConfig.identity.logo, 372×132 ratio, 40px mobile / 48px desktop height, eager and alt “SOLID FITNESS”; Footer reuses the appropriate variant. Preserve the supplied original; do not distort its aspect ratio. Asset preparation belongs to Phase 1.
- Training, Trainers and Facility cards: 3px accent top edge, optional decorative icon slot, real config titles/content. No fabricated facilities or icons implying unconfirmed services.
- Facility/Gallery tabs use approved content only, semantic tabs, roving focus and arrow/Home/End keys; no autoplay. Preview placeholders never become production evidence.
- Four pricing cards alternate light/dark; retain exact total INR amounts, the existing fee-terms note and shared CTA behavior. Check bullets may denote only confirmed facts, never invented inclusions, discounts or popularity.
- Final CTA and footer use existing config actions, an aligned link grid and equally visible hover/focus rows; preserve safe-area bottom spacing and sticky-button clearance.
- Reference frames 01/02/12 guide hero/cursor, 03/10/11 guide story composition, 04 the optional statement, 05 cards, 06 tabs, 07 pricing, 08 closing CTA and 09 footer. Frame 13's tech marquee is explicitly excluded; demo sliders and iridescent product panels are not gym features.
- Skills: design-taste-frontend concentrates motion into two areas; emil-design-eng keeps keyboard changes immediate and press response at 100ms; ui-ux-pro-max informs distinct dark/light text tokens and contrast checks. Its broad palette suggestion did not match the brief and was rejected; targeted contrast guidance was used. Impeccable final critique is deferred to Phase 5 and report-only.

### Phase 1 implementation note — 19 November 2026

Primary text is white on #E21B23 (4.76:1), hover #C91820 (5.78:1). Small red text uses #FF4D4D on dark and #B3121A on light. Focus uses #FFB3B6 on dark / accent-deep on light. Actual pairs are scripted in scripts/check-contrast.mjs and recorded in verify.md. The logo source remains unchanged: two generated transparency attempts were rejected for damaged edges. The dark variant currently uses CSS inversion/hue rotation and screen blending; replace with clean transparent owner-approved artwork and remove that provisional filter. This is not a completed transparent asset. Logo/favicon legibility and no-CLS behavior need browser checks. No Phase 2 effects added.

### Phase 2 implementation note — 19 November 2026

Hero now uses original static SVG arcs with an optional idle-loaded shader in the right-side visual slot and a faint dot grid. Existing factual copy/CTAs stay in the left DOM column. Motion is restricted to the visible hero: the desktop mouse ring/trail pauses with it, clears over controls/focus and never replaces the native cursor. A 44px config-labelled button pauses both decorations. Reduced motion/data constraints/low hardware/no WebGL2/no idle API retain static artwork. The renderer and cursor resources are separate lazy imports; shader and device performance remain browser-BLOCKED. No scroll-story or tabbed content was added in this phase.

### Phase 3 implementation note — 22 November 2026

The light story overview follows Hero, with a dark/light/dark decorative wash around stable light content surfaces. Desktop panel selection uses one bounded sticky stage; native duration radios and stacked server/mobile/reduced-motion content remain usable without a scroll sequence. Oversized panels/short viewports disable pinning. Header uses the original logo on its light surface. Statement config remains null; no slogan was invented. Actual sticky timing, focus paths, 360px rendering and theme smoothness remain BLOCKED; see verify.md. Phase 4 restyling is not implemented.

### Phase 4 implementation note — 22 November 2026

Dark cards have a 3px red top edge and decorative icon slot. The approved-photo gallery uses wrapping photo tabs with immediate keyboard selection and a noscript fallback; no unsupported facility categories are introduced. Pricing alternates off-white and dark cards with checks only against the confirmed total-price label. The closing CTA uses static ribbons beside its DOM content, and footer links have identical red hover/focus rows. Existing content filters and contact gating remain intact. Browser layout, interaction, reduced-motion and CLS acceptance remain BLOCKED.

### Phase 5 verification note — 23 November 2026

Paused/offscreen ribbon resize work is deferred until rendering resumes. Final source critique is in docs/reviews/review-03.md, with no edits from that critique. Automated checks pass, but browser/device/Lighthouse acceptance remains BLOCKED. Known sticky-panel resize-focus and failed-gallery-hydration risks remain open; logo artwork and approved gym imagery remain pending.

### Authorized resilience fixes — 24 November 2026

Story pin activation preserves the panel containing keyboard focus. Gallery uses a readable stacked server/failure fallback; only successful hydration hides inactive panels. Layout shift during enhancement requires browser measurement with approved imagery. This supersedes the earlier first-photo/noscript fallback description.
