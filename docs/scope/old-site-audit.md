# Old site audit: SOLID FITNESS

Reviewed 15 November 2026 for the proposed Velachery redesign. Goal: identify barriers to trial requests and WhatsApp enquiries.

## Method and limits

Reviewed the public homepage, Velachery registration page and cardio service page through retrieved page text. Also fetched homepage HTML directly with HTTP 200 and inspected its markup. Compared branch details with your supplied scope. No enquiry was submitted. No rendered mobile inspection, keyboard audit or Lighthouse run was completed. Findings below distinguish observed content and markup from untested risks. Hidden dialogs and template elements can appear in extracted text without being visible to visitors.

## Findings and priorities

| Priority | Area | Evidence and problem | Recommended correction |
| --- | --- | --- | --- |
| P0 | Branch accuracy | The Velachery page says 29/3; you confirmed 29/2, Second Floor. Its footer and directions link refer to Porur | Use the confirmed Velachery address and verify its exact map pin; keep other branches separate |
| P0 | Contact routing | Homepage header and branch listing show different phone numbers; the shared footer uses Porur details | Confirm branch ownership of each destination; use your anonymous placeholders only in previews |
| P0 | Pricing | Branch page shows ₹500 registration but not your four membership plans | Publish ₹2,599 for 1 month, ₹3,999 for 3 months, ₹5,999 for 6 months and ₹10,999 for 12 months; confirm inclusions and taxes; do not carry over an unconfirmed joining fee |
| P1 | Conversion UX | General enquiry and WhatsApp options exist, but reviewed content does not explain a trial offer, eligibility or confirmation process | Give Request a Trial a clear path and state that staff confirm the slot; do not assume the trial is free |
| P1 | Navigation | Homepage leads through multiple branches, updates, search and product style listings | Make Velachery visitors' primary decisions easy: training, plans, facility, trial and visit |
| P1 | Service content | Retrieved cardio page offers a heading and enquiry link, with almost no useful service explanation | Explain who each confirmed program suits, coaching included and how to get started |
| P1 | Missing information | No clear visible Velachery hours, named trainer roster, verified credentials or current class timetable found in reviewed content | Obtain owner approved details; clearly identify unavailable information rather than invent it |
| P1 | Local SEO | Velachery body content is paired with Porur footer contact and directions | Align branch identity, address, phone and structured data; mismatches make local relevance and visitor trust weaker |
| P1 | Search presentation | HTML title is generic to Chennai; description reads like a branch catalogue listing five areas | Write a clear Velachery gym title and useful description for the new branch page; chain wide pages may retain broader intent |
| P1 | Heading structure | Direct homepage HTML contains no H1 element | Add one descriptive page H1 and a coherent hierarchy; confirm runtime DOM before treating this as an exhaustive semantic audit |
| P1 | Speed risk | Homepage HTML contains many images and external scripts, detailed below | Reduce template overhead, inspect actual transfers and rendering, and measure mobile performance before choosing fixes |
| P1 | Mobile decision flow | The same branch ambiguity and missing plans affect phone visitors; actual layout and tap behavior are untested | Build from phone widths, put trial and WhatsApp actions within easy reach, and verify navigation, reflow and forms on devices |
| P2 | Stale content | Homepage latest updates displayed dates in October 2024 at review time | Maintain relevant current information or remove an updates section nobody owns |
| P2 | Template residue | Extracted markup includes an owner preview prompt, raw contact metadata and a multiple currency order alert | Check visibility in a real browser; remove irrelevant template output from public content and DOM |
| P2 | Image semantics | Extracted images include generic background and preview descriptions | Review actual alt attributes and replace generic descriptions on meaningful images; mark decorative images appropriately |
| P2 | Enquiry clarity | Extracted form fields include a combined mobile/email prompt; full labeling, errors and delivery behavior are unverified | Use persistent labels, minimal fields, accessible errors and genuine delivery acknowledgement |

P0 means fix before a live enquiry launch. P1 means core redesign work. P2 means polish and content hygiene. This is a branch focused assessment; the old site intentionally serves several branches, so a chain directory itself is not inherently wrong.

## Speed evidence, not a Lighthouse score

One direct HTML request returned HTTP 200 in 12.62 seconds, including network and full response time, with 134,976 bytes of decoded response content. This single request is not TTFB, browser load time or a representative mobile benchmark. It is a signal to investigate, not proof that all visitors wait 12 seconds.

A simple HTML scan counted 23 script tags with external sources, 15 stylesheet links and 114 image tags. Of the image tags, five lack an alt attribute and eight declare native lazy loading. Six external script tags do not declare async or defer. These are markup findings, not proof of blocking behavior or a complete accessibility assessment. Counts include possible hidden, duplicated, tracking and deferred markup; they are not equivalent to network request count, transferred bytes or visible images. Resources span several image/CDN domains. A large resource surface can increase download and execution cost, but no bottleneck or Core Web Vitals failure is established without a browser trace.

No Lighthouse score, LCP, INP, CLS, image payload total or JavaScript execution measurement is available from this audit. Do not describe a guessed score as measured. The replacement targets mobile Lighthouse 90+ and the Core Web Vitals thresholds recorded in AGENTS.md.

## SEO and mobile details that should not be misreported

The homepage HTML does contain a viewport meta tag, a canonical URL, a description and Open Graph tags. Do not report these as missing. Their content needs focus and accuracy rather than automatic replacement simply because the site is old.

The HTML contains openingHours microdata for every day, 5:30 AM to 10:00 PM. These are shared site metadata, not verified Velachery hours, and do not resolve the missing visible branch hours. No JSON-LD block was found, but microdata exists, so the site must not be described as having no structured data. Check which business entity the existing markup describes before migration.

A viewport tag alone does not establish mobile usability. Overflow, font size, touch target spacing, contrast, focus, overlay behavior and responsive navigation remain untested. Likewise, absence of an H1 in initial HTML does not prove no client rendered H1 exists.

## Follow up verification

1. Run three mobile Lighthouse tests on the homepage and Velachery page, record URLs, version, settings and medians, and retain the reports. Use a production build for the replacement comparison.
2. Inspect the network waterfall, image dimensions/formats, script execution and caching. Identify the actual LCP element before optimizing it.
3. Test 320, 375, 390 and 768 pixel layouts plus desktop, keyboard navigation, reduced motion, zoom, dialogs, form errors and unobscured CTAs.
4. Verify call, WhatsApp and map destinations without sending an unsolicited enquiry. Test submission delivery only with an agreed test recipient.
5. Inspect robots.txt, sitemap, indexability, redirects, page specific canonical metadata and complete business microdata. Search Console coverage needs owner access; it was not checked here.

## Evidence sources

1. [Homepage](https://www.solidfitness.co.in/), retrieved page text and direct HTML fetch on the review date.
2. [Velachery registration page](https://www.solidfitness.co.in/branches/velachery-solid-fitness-registration/6), retrieved page text on the review date.
3. [Cardio training page](https://www.solidfitness.co.in/page/cardio-vascular-training/5c960ddcce60260001d2a2df), retrieved page text on the review date.
4. `docs/scope/scope.md`, confirmed address, prices, anonymity requirement and conversion goals supplied by you.

This audit records findings only. It does not change the old site or implement the replacement.
