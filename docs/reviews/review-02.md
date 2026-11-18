# Review 02 — SOLID FITNESS

18 November 2026. **Verdict: reviewable implementation, not ready for a public enquiry launch.** No fixes made.

Method: dual-agent independent assessments (A: `/root/design_review`; B: `/root/technical_review`), synthesized against `AGENTS.md`, `design.md`, `docs/specs/architecture.md`, scope, current source and `verify.md`. Home is a persuasion surface; Privacy is a reading surface. Applied impeccable critique and technical-audit guidance, with project rules and this report-only request taking precedence.

## Evidence and limits

- Source inspected across all sections, shared helpers, config, metadata, CSS, motion, trial flow and test configuration. The findings distinguish current defects, missing owner inputs and conditional risks.
- The skill context launcher and detector were attempted and failed with Permission denied. **Detector unavailable**, not a clean scan. No detector findings, counts or visual overlay are claimed.
- A fresh system-Chromium launch failed with `process_singleton_posix.cc: socket() failed: Operation not permitted`. **Rendered 360px layout, zoom/reflow, keyboard behavior, animation, browser console, Lighthouse and real device handoff are BLOCKED.** No fresh screenshots could be produced.
- `verify.md` records 41 passing unit tests and passing lint/types/build from the preceding task. These are historical evidence, not rerun results from this read-only review. The e2e test exists but has not executed its browser steps.
- Numerical visual/heuristic health scores are withheld: source evidence cannot establish a rendered accessibility, responsive or performance pass. This is a qualified source audit, not WCAG certification.

Severity: **critical** blocks the stated primary task at launch; **high** materially undermines launch readiness or requires release verification; **medium** is a concrete inconsistency, missing spec behavior or bounded risk; **low** is polish/documentation drift. Intentional preview restrictions are not treated as regressions.

## Critical

### C1 — Production cannot receive an enquiry

**Files:** `src/content/gym-config.ts:57`, `src/lib/contact-links.ts:12`, `src/components/sections/trial-form.tsx:45`, `src/components/sections/sticky-whatsapp-button.tsx:4`.

**Evidence/impact:** Contact status remains `placeholder`; normal production disables call/WhatsApp and the trial submit action. The primary “Request a Trial” links lead to a form visitors cannot complete. This is correct preview protection, but it fails the project's conversion goal if launched as-is. The fixed disabled WhatsApp control still occupies phone-screen space.

**Minimal fix:** Obtain and verify the real recipient, update the single contact config and status, and test actual device opening without sending unsolicited messages. Keep preview gating; never use the preview flag as the production fix. If a public launch must precede verification, obtain approval for a factual informational page and remove the unavailable conversion promise/sticky control from that mode.

## High

### H1 — Trial and membership decision terms remain unresolved

**Files:** `src/content/gym-config.ts:123`, `src/content/gym-config.ts:131`, `src/components/sections/hero.tsx:26`, `src/components/sections/pricing.tsx:18`.

**Evidence/impact:** The main offer is a trial whose availability and terms are unknown. Plan totals are confirmed, but inclusions, taxes and joining/coaching charges are not. Pending notes are honest; they do not establish a usable offer. Architecture section 7 explicitly requires trial terms before live publication.

**Minimal fix:** Owner supplies trial availability, price, duration and eligibility plus plan terms; replace only those config fields. If trials are unavailable, change the related CTA/heading to an approved membership-enquiry action. Do not invent “free”, savings or included coaching.

### H2 — Visit and privacy information is not launch-complete

**Files:** `src/content/gym-config.ts:186`, `src/content/gym-config.ts:232`, `src/components/sections/location.tsx:42`.

**Evidence/impact:** Hours are unconfirmed and directions, Google Business and embed URLs are null. Privacy still asks for owner input on hosting logs, staff access, retention/deletion and the privacy contact. A visitor can read the supplied address but cannot reliably plan opening time or find approved directions. The notice cannot describe the owner's actual handling yet.

**Minimal fix:** Supply verified hours/holiday rules and correct Velachery map links; approve operational privacy answers and contact. Populate existing config slots. Retain omission of unverified coordinates and external URLs. This is a content/operations blocker, not a recommendation to guess a legal policy.

### H3 — Expanded mobile navigation has no viewport height bound

**Files:** `src/app/globals.css:46`, `src/app/globals.css:150`, `src/components/sections/navbar.tsx:97`.

**Evidence/impact:** The header is sticky; its expanded menu contains all available sections, a Call action and a trial CTA, but has no max-height or overflow-y handling. As approved sections are populated, or at zoom/short landscape heights, the menu can exceed the viewport and leave lower controls difficult to reach. This is a source-supported risk, **not an observed 360px overflow failure**.

**Minimal fix:** Bound the expanded menu to the remaining dynamic viewport height and allow vertical scrolling. Verify 360×800, short landscape, keyboard reachability and zoom with all optional sections populated using isolated approved-shape fixtures.

### H4 — Release acceptance is still unproved in a browser

**Files:** `verify.md:14`, `playwright.config.ts`, `tests/e2e/main-flow.spec.ts`, `AGENTS.md` (Mobile and accessibility; Performance and SEO).

**Evidence/impact:** No successful main-flow e2e, mobile visual review, accessibility journey or Lighthouse run exists. Unit tests cover helpers, not hydration, DOM focus, sticky overlap, real touch behavior or rendering speed. The e2e test intercepts window.open, so even a future pass will verify prepared handoff, not actual WhatsApp delivery.

**Minimal fix:** Run the existing e2e suite in a browser-capable environment, then record the requested widths, keyboard/zoom/reduced-motion checks and median of three production Lighthouse runs. Test real app opening separately with authorization. Do not replace BLOCKED with PASS based on compilation.

## Medium

### M1 — Hero's production visual remains a large labelled placeholder

**Files:** `src/content/gym-config.ts:140`, `src/components/sections/hero.tsx:51`, `src/app/globals.css:452`.

**Evidence/impact:** Hero always renders the neutral SVG and “Gym photograph to be supplied”, including production. Optional Gallery correctly disappears when empty. The only prominent production image therefore provides no evidence of the actual facility and occupies substantial vertical space on a phone.

**Minimal fix:** Supply one rights-approved branch image, or approve a compact text-only production hero while retaining the labelled asset in preview. Preserve dimensions and factual copy. No stock people presented as members/trainers.

### M2 — Contact breaks section hierarchy and spacing

**Files:** `src/app/globals.css:301`, `src/app/globals.css:478`, `src/app/globals.css:573`, `design.md` (Space and layout; Fonts).

**Evidence/impact:** Most section headings use line-height 1 and 64px top padding, increasing section spacing at desktop. Contact uses 32px top padding and its h2 inherits body line-height 1.6; an earlier rule leaves it at font-weight 700. The same display size therefore has a different line box and rhythm at the primary conversion point.

**Minimal fix:** Align Contact's h2 line-height and section spacing with the existing section rules. Consolidate only the duplicate Contact heading declarations; preserve the form and contact paths. Check wrapping before changing any content.

### M3 — Promised branch-benefits section is absent

**Files:** `src/app/page.tsx:25`, `src/content/gym-config.ts`, `docs/specs/architecture.md:53`.

**Evidence/impact:** Architecture includes Why Solid Fitness after Hero and the #about target. There is no component, config data or rendered section. This is a specification gap, not evidence that benefits should be fabricated. With optional sections empty, production moves directly from generic location introduction to prices.

**Minimal fix:** Owner approves a short branch introduction/verified benefits, then add the smallest config-driven section; alternatively formally defer it in the architecture. Do not create an empty marketing claim solely to satisfy section count.

### M4 — Map loading can steal focus after the user moves on

**Files:** `src/components/ui/location-map.tsx:25`.

**Evidence/impact:** The iframe unconditionally calls focus in onLoad. With a slow map request, a visitor who activates Load map and then tabs elsewhere can be pulled back when it finishes. This path is dormant with the current null embed; runtime reproduction is blocked.

**Minimal fix:** Move focus deliberately when replacing the activated button, or guard delayed focus so it happens only if the user has not moved focus since activation. Keep the map keyboard-accessible and retain its reserved height.

### M5 — Visible address and structured address can drift

**Files:** `src/content/gym-config.ts:40`, `src/content/gym-config.ts:202`, `src/lib/seo.ts:57`.

**Evidence/impact:** Both addresses currently agree, but the supplied street address is independently written as a full string and as schema fields. Changing the visible address does not automatically update JSON-LD, contrary to the architecture's single-change parity requirement.

**Minimal fix:** Store one structured address and derive the visible formatted address from it, or derive both from shared address constants. Add a parity assertion. Do not change the confirmed address itself.

### M6 — Social image support is absent, not just unconfigured

**Files:** `src/content/gym-config.ts:201`, `src/lib/seo.ts:35`, `docs/specs/architecture.md` (SEO and local discovery).

**Evidence/impact:** Open Graph title/description and URL handling exist, but there is only a TODO for an image; no nullable approved image record or metadata mapping exists. Supplying an image alone will not complete the promised social preview.

**Minimal fix:** Add an optional approved social-image config record with URL/path, dimensions and alt text, and emit image tags only when configured and approved. Leave it omitted until an actual asset is supplied.

### M7 — Custom not-found recovery promised but missing

**Files:** `src/app/` (no `not-found.tsx`), `src/app/layout.tsx`, `docs/specs/architecture.md:37`.

**Evidence/impact:** No custom not-found route supplies the specified short explanation, Home recovery and gated contact action. Next's default not-found UI may provide the HTTP error state; that does not implement the specified recovery content. The shared skip link also needs a valid #main target on that route.

**Minimal fix:** Add a minimal not-found component with #main, concise explanation, Home link and shared gated contact control. Verify real HTTP 404 and keyboard recovery; do not redirect unknown URLs to a 200 homepage.

## Low

### L1 — Small typography drifts below the design's control sizes

**Files:** `src/app/globals.css:85`, `src/app/globals.css:93`, `src/app/globals.css:101`, `design.md` (Fonts; Buttons).

**Evidence/impact:** Buttons and desktop nav are 12px instead of the specified 13px; branch identification is 10px. Button hit areas are generally large, so small type is not itself a demonstrated WCAG violation. The secondary branch label is nevertheless harder to scan on a phone.

**Minimal fix:** Use the specified 13px control text and test a modest increase to the branch label at 360px without crowding the brand/Menu row. Keep the current system-font fallback until approved local fonts are available; fallback use was explicitly permitted.

### L2 — Guidance still describes already-built features as missing

**Files:** `AGENTS.md:3`, `design.md` (Review checkpoints), `verify.md:3`, `verify.md:17`, `src/content/gym-config.ts:149`.

**Evidence/impact:** Top-level verification still says Map, Privacy and SEO are deferred; AGENTS describes a minimal location target inside Contact. Later appended records contradict those summaries. Unused preview copy also says finished sections are forthcoming. This risks future work undoing or duplicating working features.

**Minimal fix:** Update current-state summaries and remove unused stale preview fields only after checking references. Preserve historical verification as dated history. Do not erase BLOCKED results.

## Cross-section critique and fact integrity

| Surface | Source-based assessment |
| --- | --- |
| Navbar/Hero | Clear gym and locality; shared dark/orange system. Three hero contact actions are explicitly requested in later checkpoints, so not flagged as an accidental extra CTA. Large placeholder and unresolved trial dominate the launch problem. |
| Training/Trainers | Consistent grid/heading patterns; approved trainer and verified credential filtering present. Empty production omission is intentional. Training content requires owner confirmation before insertion. |
| Gallery | Responsive grid, dimensions and lazy next/image usage; rights-approved local-file filtering. Neutral preview labels are required, not a design defect. |
| Testimonials | Static quote/attribution hierarchy and permission filtering; no fabricated ratings or carousel. Empty production omission is correct. |
| Pricing/FAQ | Four exact totals, no invented discounts. Native FAQ disclosures and clear pending-content rules. Repeated address/prices in FAQ are accurate but contribute little beyond prior sections until real questions are answered. |
| Contact/Location | Form labels, inline errors and honest handoff language exist. Contact rhythm differs; visit details and privacy operations are unresolved. |
| Footer/Privacy | Conditional section links, shared contact gating, server year and readable 65ch privacy measure. Plain, factual privacy wording is preferable to generic “we value your privacy” claims. |

**Copy:** The current copy is mostly restrained and factual. “Get in touch to learn about membership plans”, “Explore the gym” and “Get in touch” are generic utility wording; changing them into louder marketing would not solve the lack of verified programs, imagery and benefits. Replace the hero's generic second sentence only when a specific approved offer/benefit exists. No unsupported “best gym”, transformations, member counts, reviews, free trial, discount or coaching inclusion was found in published source. The number is user-supplied but explicitly unverified; supplied Instagram ownership and public brand/logo approval remain owner tasks. Schema correctly omits telephone, geo, hours and ratings. Do not mistake neutral placeholders for invented gym evidence.

**Accessibility:** Semantic headings, labels, focus outlines, native details and clear disabled spans are present. Token calculations give muted/background 9.68:1, muted/surface 8.83:1, accent/background 6.94:1 and focus/surface 12.70:1. These are numeric token checks, not pixel-level coverage of every rendered state. Low-contrast decorative borders alone are not a WCAG failure. Focus order, touch target spacing, full contrast states, zoom, screen-reader output and sticky obstruction require browser checks.

**360px:** CSS provides a 320px content width at a 360px viewport, single-column card grids, wrapping content and bounded form controls. Those are good source choices, not proof of zero horizontal scrolling. Main risks to exercise are the brand/Menu row, expanded menu, long approved names/alt content, font substitution, and sticky CTA overlap when tabbing through Pricing. Bottom scroll padding cannot by itself prove all focused elements remain visible.

**Performance:** No heavy shaders, pinned scrolling, autoplay media or initial map iframe were found. Below-fold approved images are lazy and dimensioned; reveals use transform/opacity and readable initial HTML. No measured latency, chunk-budget or Lighthouse failure is asserted. When replacing the hero SVG with a real photograph, supply an accurate responsive sizes hint and measure LCP before deciding preload/fetch priority. Inspect client bundle cost before changing the existing Motion import strategy. A passing production build does not prove Lighthouse 90+.

## Suggested order after approval

1. Resolve C1 and H1–H2 with owner-approved inputs; keep preview noindex meanwhile.
2. Address the bounded mobile-menu and focus risks; align Contact hierarchy.
3. Decide the omitted benefits/recovery/social-image work and replace or omit the hero placeholder for launch.
4. Run browser acceptance and performance checks, then a final polish review.

Questions skipped: the user requested a ranked written review and no fixes. Only this report was created; application files and verify.md were left unchanged.
