# SOLID FITNESS design system

Direction: the supplied reel's charcoal canvas, orange accents, condensed uppercase headings and restrained athletic imagery. Original layout adapted for phone use.

## Palette

| Token      | Value   | Usage                          |
| ---------- | ------- | ------------------------------ |
| background | #090B0D | Page canvas                    |
| surface    | #14171B | Panels and expanded navigation |
| foreground | #F5F2EB | Headings and primary text      |
| muted      | #B3B6BA | Supporting text                |
| accent     | #FF6B2C | Primary buttons and emphasis   |
| ink        | #090B0D | Text on orange buttons         |
| border     | #343A40 | Dividers                       |
| focus      | #FFD19A | Visible focus ring             |

Use dark text on orange buttons, never small white text on orange. Normal text needs 4.5:1 contrast; large text and interface boundaries need 3:1 where required.

## Fonts

Display: locally hosted Barlow Condensed 700 when available, with Impact and Arial Narrow fallbacks. Body: locally hosted Barlow 400/600 when available, with Arial and system sans fallbacks. The first checkpoint uses system fallbacks without external font requests. Display headings uppercase, line height 0.95, tracking -0.02em; body 16px/1.6. Navbar labels 13px/1.4, weight 600, tracking 0.08em. Do not shrink phone text to fit desktop navigation.

## Space and layout

Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px. Container maximum 1280px; gutters 20px mobile, 32px tablet, 48px desktop. Section padding 64px mobile, 96px desktop. Navbar minimum height 80px; 44px minimum control targets. Cards use 1px borders, 4px corners and 24px inner padding. No excessive pills or glass effects.

## Buttons

Primary: orange background, ink text, 48px minimum height, 20px horizontal padding, 2px radius, uppercase 13px semibold. Hover uses lighter orange. Secondary: transparent with a visible border. Focus: 2px focus color outline offset 4px. Unavailable actions have a written explanation, no fake destination. Menu is an inline disclosure, not a modal, so no focus trap; Escape closes it and returns focus to its trigger.

## Motion

Menu 180ms ease out; button feedback 150ms; hero entrance 350ms with at most 16px shift; section reveals 250–350ms once with at most 60ms stagger. No scroll pinning. Reduced motion removes translations and automatic media. Athlete media is optional and must have a poster, pause control and failure fallback. Motion never hides essential content while waiting to load.

## Assets and content

All gym facts and placeholder content live in src/content/gym-config.ts. Unknown people, quotes and services stay explicitly pending. Neutral local image placeholders will be added with the sections that need them. No athlete image is required for the layout/navbar checkpoint.

## Review checkpoints

Build layout/navbar, then stop. Subsequent checkpoints: hero, classes, pricing, trainers, gallery, testimonials, location/contact, footer. Do not build later sections before review. Until a section exists its navbar label is unavailable text, not a broken anchor. The trial action shows an accessible explanation until Contact is built.
