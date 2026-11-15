# SOLID FITNESS website architecture

**Status:** In Progress. Layout and navbar checkpoint authorized by the user; later sections await review.
**Date:** 15 November 2026.
**Inputs:** `AGENTS.md`, `docs/scope/scope.md`, `docs/scope/old-site-audit.md`, the supplied reel screenshots and video.

This specification defines the first release for the Velachery branch. Recommendations are concrete enough to build, with missing business facts kept explicit. It does not install dependencies, choose hosting or implement code.

## Requirements and decision summary

| Decision | Recommendation | One line justification |
| --- | --- | --- |
| Site shape | One landing page and a privacy page | Visitors can assess the gym and act without navigating a small brochure site |
| Content source | One typed `src/content/gym-config.ts` file | Shared facts cannot drift between pricing, contact, metadata and structured data |
| Trial flow | Form prepares an editable WhatsApp message, no server submission in v1 | Uses the intended staff enquiry channel without introducing an unchosen inbox or database |
| Rendering | Server rendered content with small interactive client components | Keeps useful content available early and limits JavaScript |
| Motion | Optional athlete media plus restrained section reveals | Captures the reel's style while protecting readability and phone performance |
| Location | Verified branch map embed and Google Business link | Correct directions fix the old site's most damaging branch ambiguity |
| Unknown content | Clearly marked preview placeholders, unpublished claims omitted at launch | Makes the design reviewable without inventing gym facts |

The WhatsApp form recommendation is a proposed resolution of the scope's open delivery question. If you need requests saved independently of WhatsApp, revise this contact design before implementation to select a recipient service, server delivery, abuse controls and retention. This specification does not quietly introduce that backend.

## Proposed stack

Next.js App Router, TypeScript strict mode, Tailwind CSS and Framer Motion, as instructed in AGENTS.md. Use Server Components for layout, page sections, config access and metadata; Client Components only for the mobile menu, optional motion, form behavior and map activation. No authentication, database, CMS, payments or custom enquiry API in v1.

**Why:** The selected stack supports an indexable public page while keeping interactive features isolated.

Use the folders and naming rules in AGENTS.md. Route entry points live in `src/app/`; section components in `src/components/sections/`; shared controls in `src/components/ui/`; motion wrappers in `src/components/motion/`; utilities in `src/lib/`; approved media in `public/images/` and `public/video/`. Choose compatible supported dependency versions at scaffold time and record one lockfile. No versions are claimed installed.

## 1. Sitemap and order

| Route or surface | Sections in reading order | Indexing |
| --- | --- | --- |
| `/` | Navbar, Hero, Why Solid Fitness, Classes, Gallery, Trainers, Testimonials, Pricing, FAQ, Contact with trial form, Map, Footer | Indexable after real content and domain approval |
| `/privacy` | Navbar, privacy heading and overview, data handling, third parties, retention, privacy contact, Footer | Public with its own canonical and metadata |
| Not found state | Short explanation, Home link, contact link only when available | Return an actual 404 |

Landing anchors: `#home`, `#about`, `#classes`, `#gallery`, `#trainers`, `#testimonials`, `#pricing`, `#faq`, `#contact`, `#location`. The sticky WhatsApp button is a global control, not another section. Trial acknowledgement is inline in Contact, not a separate thank you route.

**Why:** A single journey preserves context; a separate privacy page gives contact handling a stable reference URL.

Do not create separate class, trainer, testimonial, pricing or contact routes in v1. Conditional sections can be absent without breaking navigation. Do not create empty pages for search engines.

## 2. Page and section breakdown

### Home page

| Order and section | Content | CTA | Purpose and justification |
| --- | --- | --- | --- |
| 1. Navbar | SOLID FITNESS name or approved logo; Training, Facility, Trainers, Plans and Visit links where sections exist | Request a Trial to `#contact` | Keep the next action available without a long menu |
| 2. Hero | One H1 identifying SOLID FITNESS in Velachery; short factual introduction; athlete or approved facility image | Request a Trial; Enquire on WhatsApp | Establish gym and location immediately, then offer two clear routes |
| 3. Why Solid Fitness | Short branch introduction and up to four confirmed benefits | Explore Training to `#classes` | Explain why a visitor should continue without unsupported superlatives |
| 4. Classes | Confirmed training options, audience, coaching inclusion and schedule only when supplied | Enquire about this program | Help visitors assess fit; the Classes component may display “Training” if no scheduled classes are confirmed |
| 5. Gallery | Recent approved equipment, gym interior and entrance photos with descriptive captions | Plan Your Visit to `#location` | Demonstrate the actual branch rather than relying on generic fitness imagery |
| 6. Trainers | Approved name, role, credentials, photo and coaching availability | Ask about coaching | Build credible trust without fictional trainers |
| 7. Testimonials | Approved review text, display name, source and publication permission; optional verified transformation story | Request a Trial | Provide attributable social proof, not invented member counts or ratings |
| 8. Pricing | Four duration and total price cards; confirmed inclusions and fee notes | Enquire about this plan | Make cost comparison direct without falsely suggesting online checkout |
| 9. FAQ | Trial conditions, first visit, plans, coaching, hours and access, using confirmed answers | Still have questions? WhatsApp | Resolve objections at the point visitors are ready to act |
| 10. Contact | Trial form, phone and WhatsApp actions, visible contact details and response explanation | Continue to WhatsApp; Call Gym | Convert intent into a message while stating how staff confirm availability |
| 11. Map | Full confirmed address, hours when approved, floor/entrance details, map activation and business profile link | Load Google Map; Get Directions; View on Google | Make the real branch easy to find without loading a map during initial page render |
| 12. Footer | Branch identity, address, section links, Instagram and privacy link | Contact and social links | Provide reliable orientation and contact fallback at the end of the page |

Use these confirmed total plan prices, without monthly conversion, fake discounts, crossed out prices or an invented “most popular” badge:

| Duration | Total fee |
| --- | --- |
| 1 month | ₹2,599 |
| 3 months | ₹3,999 |
| 6 months | ₹5,999 |
| 12 months | ₹10,999 |

Tax treatment, inclusions, personal training charges and any separate registration fee remain unknown. Do not add the old site's ₹500 fee. In previews show “Inclusions and fee terms to be confirmed.” Resolve material pricing terms before launch.

Unknown Classes, Trainers and Testimonials content uses visibly labelled empty placeholders in design previews. At launch omit unapproved cards, reviews, statistics and their navigation links. Do not show a fictional person or imply stock photography depicts a trainer. Gallery may use neutral placeholders in previews; launch needs approved branch imagery or an honest text layout. Trial availability and cost must be approved before publishing a trial offer.

**Why:** Conditional rendering preserves a complete truthful page even while content is being gathered.

### Privacy page

| Section | Content | CTA | Purpose and justification |
| --- | --- | --- | --- |
| Overview | Branch identity, last updated date and what this notice covers | Back to Home | Set context without legal boilerplate unrelated to the actual site |
| Form behavior | Explain that entered fields stay in this page's memory until the visitor continues and sends through WhatsApp | Return to trial form | Distinguish preparing a message from submitting it to the gym |
| Third parties | Explain WhatsApp handoff and Google Maps activation; disclose any hosting logs or analytics actually configured | Relevant provider policy links | Match the notice to the real integrations |
| Retention | No trial database or browser persistence on this site; staff retention after messages reach WhatsApp requires owner input | Privacy contact when verified | Avoid promising deletion rules the staff have not agreed |
| Contact | Approved business privacy contact; clearly marked placeholder in previews | Contact Gym | Give visitors a way to ask about their information |

Do not claim that the whole site collects no data: hosting and third party processing depend on actual deployment. No marketing consent is bundled into the trial message.

## 3. Components and boundaries

| Component | Responsibility and data | Rendering or interaction |
| --- | --- | --- |
| Navbar | Brand, available section links and trial CTA | Server shell with a small client mobile menu |
| Hero | H1, intro, shared contact links, approved poster and optional athlete media | Server content with isolated client media/motion |
| Classes | Program cards from confirmed programs | Server; each CTA uses shared contact link builder |
| Trainers | Approved trainer records only | Server cards, no carousel needed |
| Pricing | Four plan records and approved fee notes | Server; selected plan carried to Contact |
| Gallery | Approved images with dimensions, captions and alt text | Server responsive grid; no mandatory lightbox |
| Testimonials | Approved review records and source attribution | Server; no auto rotating carousel |
| Map | Address, optional hours, map destination and Google Business URL | Server fallback, client click to load iframe |
| Contact | Trial form, direct contacts and request explanation | Server contact content with a small client form |
| Footer | Shared identity, address, links and privacy | Server |
| StickyWhatsAppButton | One accessible WhatsApp action | Normal link when verified, clearly unavailable control in preview |
| FAQ | Confirmed question and answer records | Semantic disclosure controls; no animation dependency |
| SectionHeading, Button, ContactLink, PlanCard | Shared semantics and styling | Server compatible unless interaction requires otherwise |
| Reveal, AthleteMotion | Optional animation and reduced motion handling | Isolated Framer Motion client boundaries |

**Why:** These boundaries prevent making the entire landing page a Client Component just for a menu or animation.

The sticky WhatsApp control sits clear of safe areas, cookie controls if later introduced, focused inputs and the footer. On narrow screens it can be a compact labelled pill; do not add a competing sticky trial bar. Reserve space so it cannot cover form controls. When the software keyboard or focused form controls would collide, hide the floating control while preserving the Contact action.

## 4. Single source data model

All public gym facts live in **`src/content/gym-config.ts`**. This is a proposed path, not a code file created by this task. Components accept config derived props; they do not contain independent copies of prices, phone numbers, addresses or hours. Layout labels and purely presentational tokens can remain in components or styles.

| Config group | Fields and rules | Current source or missing value |
| --- | --- | --- |
| identity | Stable gym ID, public name, branch, optional logo, site origin, locale | SOLID FITNESS, Velachery; approved logo and final origin pending |
| address | Street lines, floor, locality, city, state, postal code, country | 29/2, Second Floor, 1st Main Road, Taramani Link Road, Tansi Nagar, Velachery, Chennai, Tamil Nadu 600042, India |
| contact | Nullable call E.164 number, WhatsApp digits, email, verification state and display placeholders | Real values null; preview displays `+91 XXXXX XXXXX`, `contact@example.com` |
| location | Nullable latitude, longitude, place ID, verified map embed URL, directions URL, Google Business profile URL | Pending exact branch pin and approved profile URLs |
| hours | Nullable weekly intervals, closed days, exceptions and timezone | Unknown; timezone Asia/Kolkata; never copy shared old site hours |
| plans | Stable ID, integer durationMonths, integer totalPriceInr, currency INR, confirmed flag, inclusions and fee terms | Four supplied plans; terms and inclusions unknown |
| programs | Stable ID, name, description, audience, coaching terms, optional confirmed schedule | Empty until current branch services are approved |
| trainers | ID, name, role, verified credentials, photo reference, alt text and publication approval | Empty until supplied |
| gallery | ID, local asset path, width, height, caption, alt text, approval and rights status | Pending approved branch photos |
| testimonials | ID, approved quote, display name, source URL if available and permission status | Empty until supplied; never generate ratings |
| trial | Availability state, cost/conditions, eligibility, optional duration, response expectation and message template | Availability, conditions and response expectation pending |
| social | Confirmed Instagram URL and nullable other profiles | Supplied solidfitness_velachery URL; ownership needs approval |
| seo | Title/description text, approved social image and canonical origin | Suggested copy below; final origin and image pending |
| media | Hero poster, optional video source, rights status and approved motion mode | Reel is reference only, no clean athlete asset supplied |

Use a shared fact status vocabulary: confirmed, pending or placeholder. Unknown facts are null or empty lists, not plausible looking defaults. A field used publicly must have an approved value or an explicit preview placeholder. No secrets belong in this config. Derived URLs, formatted prices, metadata and structured data use pure helpers in `src/lib/` and the same source values.

**Why:** Null values plus verification state prevent a placeholder phone number from becoming a real link or schema telephone.

Validate config during build: unique IDs, positive prices and durations, valid approved HTTPS external URLs, complete address, no placeholder contact in live contact actions and no unapproved review. Missing critical live contact or trial terms fails the live launch check; optional missing sections are omitted. Distinguish preview mode from production release mode explicitly at deployment, do not infer readiness from the build environment alone.

Trial form data is separate from public config: name (required, 1 to 80 trimmed characters), contact mobile (required, validated and normalized without rejecting valid international formats), optional preferred date/time text (up to 120 characters), optional plan ID constrained to existing plan IDs. No health details, freeform medical questions, file uploads or member account. Data exists only in page memory; do not use cookies, local storage, query parameters or analytics for its values.

## 5. Animation plan based on the reel

The source shows a changing athlete exercise pose and scale, hero text disappearing and returning, followed by ordinary content sections. It does not prove the original rendering technique or scroll trigger. The plan below is a proposed adaptation, not a claim about the source implementation.

| Element | Where and what moves | Proposed behavior | One line justification |
| --- | --- | --- | --- |
| Hero text | Initial headline, introduction and CTA group | One entrance using opacity and up to 16px vertical movement over 350ms, no delay on access | Suggests the reel's dramatic entry without hiding conversion content |
| Athlete | Hero media area | If a licensed compatible clip is supplied, play a muted inline exercise loop after the poster is ready, with a visible pause control; pause offscreen | Video gives controllable motion without assuming a 3D or frame sequence pipeline |
| Athlete framing | Desktop hero only | Optional scroll linked scale from 1 to at most 1.05 within the hero bounds, no fixed scroll pinning | Provides depth without creating a long animation gate |
| Hero return | Visitor scrolls back | Headline and CTAs remain visible; media resumes only if visitor had not paused it | Preserves the reel's return composition without a frustrating reset |
| Section heading and cards | About through Contact | Reveal once on entering viewport, opacity plus up to 16px shift, 250 to 350ms, card stagger at most 60ms | Adds hierarchy without turning the page into a slow sequence |
| Buttons and cards | Pointer hover and keyboard focus | 120 to 180ms color/border feedback; optional 2px lift on pointer hover only | Gives feedback while leaving layout and touch behavior stable |
| Mobile menu | Navigation | Short opacity/translation transition around 180ms; focus moves immediately | Keeps phone navigation fast and keyboard accessible |
| Map and form | Location and Contact | No decorative animation; reserve map dimensions and announce status text | Functional content should not move during a decision or error recovery |

Use Framer Motion for UI motion, not for decoding or synthesizing exercise poses. Prefer an ease out curve for entrances; never add motion to every keystroke. The hero image remains the default until an acceptable asset is supplied; do not stretch or crop the reel recording into a hero video. No custom 3D model, WebGL pipeline or large frame sequence is in v1.

On phones default to the poster until the optional video can load without harming initial content. Reduced motion shows the static poster, skips transforms and disables automatic playback. Data constrained or failed media also uses the poster. All content is visible if JavaScript or motion fails. Controls need readable contrast and accessible names. No copied athlete, testimonials, statistics or identity assets from the reference.

**Why:** Exact visual imitation is less useful than a fast, truthful page that reliably produces enquiries.

## 6. SEO and local discovery

| Surface | Plan | One line justification |
| --- | --- | --- |
| Home title | Suggested: SOLID FITNESS Velachery Chennai \| Gym & Membership Plans | Names the actual branch and primary visitor intent |
| Home description | Suggested: Explore SOLID FITNESS in Velachery, Chennai. Compare membership plans, find our Tansi Nagar location and enquire about a gym trial. Publish trial wording only once the offer is confirmed | Avoids generic chain directory wording and unsupported claims |
| Privacy metadata | Unique title and short accurate description, canonical `/privacy` | Prevents duplicating home metadata |
| Canonicals | Absolute URLs from the verified deployment origin | Avoids guessing that the chain domain is dedicated to this branch |
| Social previews | Open Graph and social card title, description, canonical URL and approved local image with dimensions and alt text | Makes shared links recognizable |
| Local business JSON-LD | One branch entity using the specific ExerciseGym subtype, with stable canonical fragment ID, name, confirmed PostalAddress, URL, approved image and confirmed contacts/hours only | Gives machines the same branch facts visitors see |
| Conditional schema | Add geo, openingHoursSpecification, telephone, hasMap and sameAs only after verification; no placeholders or self authored aggregateRating | Prevents publishing invented local business facts |
| Google Maps embed | Click to load the owner supplied Google Maps share embed iframe after validating its branch pin and trusted host | Provides the requested map without initial map network overhead or a custom Maps SDK |
| Directions | Approved directions URL alongside visible text address, usable even if iframe fails | Makes wayfinding robust |
| Google Business link | Configured approved branch profile URL, labelled View SOLID FITNESS on Google | Connects visitors to the correct branch listing without inventing a profile ID |
| Discovery files | Sitemap includes only canonical public routes; robots permits public launch and blocks unwanted crawl areas | Keeps discovery focused on real pages |
| Preview protection | Deployment access controls plus noindex metadata for previews; production resets to indexable only after release checks | Keeps placeholders out of search; robots alone is not privacy protection |
| Migration | Confirm domain ownership and inventory old branch URLs before adding individual redirects | Avoids sending the whole chain website to a single branch |

Do not build an iframe from unverified coordinates or the old Porur map. When no verified embed is available, render the text address and an explicit preview map placeholder. An optional later Maps Embed API approach requires its own key/configuration decision; it is not selected here. No reviews API, embedded live social feed or Google Business API is needed.

Metadata is generated on the server from config. Serialize JSON-LD safely and validate visible data parity. Validate schema with Google Rich Results Test and metadata on the deployed output. A valid schema does not guarantee enhanced search appearance. Do not advertise an Accessibility score as proof of WCAG conformance.

## 7. Contact and trial flow

### Direct WhatsApp and call actions

1. Every WhatsApp action resolves the same verified config number. Use the `https://wa.me/` digits only destination and a URL encoded editable message identifying SOLID FITNESS Velachery and the selected program or plan where relevant. No message is sent automatically.
2. Generic enquiries use short neutral wording. A plan card moves to `#contact` with the matching plan selected in memory; no personal data enters the URL. Without JavaScript it still links to Contact, where a native plan selector remains available.
3. Call actions use the confirmed E.164 value with the `tel:` scheme. Display a readable number separately so visitors can copy it or call from another device.
4. When config contact values are missing, show the requested anonymous placeholders and an unavailable explanation in previews. Never create `tel:` or WhatsApp links from placeholder strings. Live launch requires verified working recipients.

**Why:** Central link builders prevent different parts of the page contacting different branches.

### Trial form handoff

| State or event | Behavior and copy | Source or rule |
| --- | --- | --- |
| Initial | Show labelled name, mobile, optional preferred time and optional plan; brief trial terms and link to privacy | Approved trial config and plan list |
| Unknown trial terms | Preview says Trial availability and terms to be confirmed; live trial flow cannot launch until resolved | Explicit pending trial state |
| Invalid input | Inline associated errors, error summary and focus to first invalid field; retain valid entries | Shared field rules described in data model |
| Ready | Button says Continue to WhatsApp; notice says the next step opens WhatsApp and you must send the message | Clear handoff semantics |
| Continue | Prepare an encoded message from validated inputs; navigate from the user action rather than an asynchronous popup | Avoids a hidden submission or unnecessary popup blocker dependency |
| Return to page | Show “Send your message in WhatsApp. The gym will confirm availability.” Never show “Request received” or “Booking confirmed” | No delivery receipt exists |
| WhatsApp unavailable | Offer copy prepared message and the readable verified phone number; provide manual copy text if clipboard access fails | No reliance on detecting whether a message was sent |
| Contact unconfigured | No handoff, explicit preview only message | Anonymous contact requirement |

The form has no POST endpoint and creates no lead record in v1. Fields stay in memory while this page remains open, are not deliberately persisted across reloads, and are never logged or sent to site analytics. The visitor deliberately passes them to WhatsApp by continuing. Avoid claiming whether WhatsApp stores drafts or staff retain messages; those systems are outside this site's control.

Track only generic CTA type, placement and public plan ID if analytics is later configured. A WhatsApp click is a handoff event; staff confirmed conversations, trial requests, attendance and memberships require staff reporting. No analytics provider is chosen here and none is required to render the site.

**Why:** Honest state labels preserve trust when the site cannot observe delivery or availability.

## Acceptance and verification

1. Config edits update all instances of address, prices, contacts, metadata and schema without component changes. No duplicate gym facts are hardcoded.
2. Home sections follow the specified reading order; missing optional content removes its navigation links. Four plans remain readable on a phone without horizontal scrolling.
3. Request a Trial reaches Contact. Plan enquiries select the matching plan. WhatsApp and call actions resolve the same approved branch destinations.
4. Invalid form input is explained accessibly. Successful preparation never claims delivery. Missing contact config produces no functional links to an invented recipient.
5. Hero content and CTAs remain usable with reduced motion, blocked video and failed JavaScript. Any automatic moving content has appropriate pause behavior.
6. Map loads only after activation, uses the approved branch pin and retains a directions fallback. The Google Business link is verified before launch.
7. Titles, canonicals, social cards, sitemap and branch schema agree with visible approved data. No fake review, hour or contact is emitted.
8. Verify keyboard navigation, menu focus, form errors, 200% text zoom, 400% reflow, contrast and phone widths defined in AGENTS.md. Target WCAG 2.2 AA.
9. Target median Lighthouse mobile 90+ in Performance, Accessibility, Best Practices and SEO over three production runs, and field LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 when sufficient traffic exists. Record settings and versions, never fabricate scores.

## Build plan, for a later implementation request

1. Establish selected stack, tooling, typed config, content readiness checks and responsive visual primitives; no backend or auth scaffold.
2. Complete the discovery to trial journey with real config, four plans, accessible form validation, WhatsApp preparation, missing contact states and fallback behavior. Verify the entire journey before starting additional interactions.
3. Complete enquiry and visit journey with call links, verified map activation, Google Business link and readable fallbacks; include the accurate privacy page.
4. Add approved optional content and restrained motion without weakening the working contact paths. Verify reduced motion, media failures and mobile usability.
5. Validate SEO, metadata and redirects, then run production accessibility and performance checks and the owner content review.

## Consequences and open launch inputs

The config approach requires a reviewed content change and redeploy rather than a CMS editor. The WhatsApp approach provides no server stored leads or automatic delivery confirmation. Optional athlete motion depends on approved media and may remain a static poster. These tradeoffs keep v1 small and maintainable.

Before live launch you must provide or approve: real contact destinations, trial availability and terms, plan inclusions and taxes, current hours, exact map pin and embed, Google Business URL, domain deployment ownership and approved brand/media assets. Trainers, programs and reviews stay conditional until approved. English first remains the scope assumption; Tamil is deferred.

No scope feature is marked built or accepted by this document. The scope's framework undecided note is superseded by the stack explicitly chosen in your later audit request and AGENTS.md; the scope otherwise remains unchanged.

## Decision references

Project sources: AGENTS.md and both files under docs/scope listed above. External documentation checked for the relevant capabilities:

1. [Next.js Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)
2. [Next.js metadata and social images](https://nextjs.org/docs/app/getting-started/metadata-and-og-images)
3. [Google Local Business structured data](https://developers.google.com/search/docs/appearance/structured-data/local-business)
4. [Google Maps Embed API setup, relevant only if that alternative is later selected](https://developers.google.com/maps/documentation/embed/get-api-key)

These references support platform capabilities; the page order, motion timings and WhatsApp form design are project recommendations rather than facts inferred from the reel.
