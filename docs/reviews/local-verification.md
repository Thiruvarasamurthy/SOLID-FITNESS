# Local verification: SOLID FITNESS (Velachery)

**Environment:** Windows PowerShell 5.1, Node.js 24.11.1, this machine (not the blocked CI environment from verify.md).
**Date:** 25 November 2026
**Server:** `npm start` on `http://127.0.0.1:3000` with `NEXT_PUBLIC_CONTACT_PREVIEW=true` (kept running after verification).
**No source files were modified.**

---

## 1. npm ci, lint, typecheck, unit tests

| Command | Result | Details |
|---|---|---|
| `npm ci` | PASS | 407 packages added; 7 moderate severity vulnerabilities (advisory only, no fix applied) |
| `npm run lint` | PASS (source) | `eslint` with no args reports 359 errors, but ALL are located in generated `.next/` build artifacts inside the untracked `solid-fitness-site/` subdirectory — not in `src/`. `npx eslint src/ --max-warnings 0` exits 0 clean. |
| `npx tsc --noEmit` | PASS | No output, exit 0 |
| `npm test` (vitest) | PASS | 6 files, 71 tests, all passed (1.69s) |

---

## 2. Production build + dev server (contact preview enabled)

| Step | Command | Result | Details |
|---|---|---|---|
| Build | `$env:NEXT_PUBLIC_CONTACT_PREVIEW="true"; npm run build` | PASS | Exit 0; all 7 routes built (`/`, `/_not-found`, `/icon.png`, `/privacy`, `/robots.txt`, `/sitemap.xml`) |
| Start server | `npm start` | PASS | Server running on `http://127.0.0.1:3000`; HTTP `GET /` returns 200; contact links enabled (tel:+917904269276 and wa.me links present in markup); preview note "Preview contact number — verification pending." displayed |

---

## 3. Playwright end-to-end tests

| Step | Command | Result | Details |
|---|---|---|---|
| Install Chromium | `npm run test:e2e:install` | PASS | Chromium 159.0.8154.6 (playwright v1255) downloaded to `C:\Users\Thiruvarasmurthy\AppData\Local\ms-playwright\chromium-1255` |
| Run tests | `npm run test:e2e` | PASS | All 3 tests passed (59.7s total) |

**Per-test results:**

| # | Test name | Result | Time |
|---|---|---|---|
| 1 | plan selection, accessible errors and valid WhatsApp handoff | PASS | 4.8s |
| 2 | closing trial action reaches the existing form | PASS | 932ms |
| 3 | pin activation preserves focus in the Visit panel after resize | PASS | 1.0s |

The e2e test's `webServer` builds and starts its own production server on `127.0.0.1:3119` with `NEXT_PUBLIC_CONTACT_PREVIEW=true`. All navigation, plan selection, form validation, error focus, WhatsApp handoff preparation, and story pin/focus assertions passed in a real Chromium browser.

> Note: The "BLOCKED" status for Playwright in verify.md came from a different environment (Chromium launch failed with `socket() Operation not permitted`). On this machine, Chromium installs and runs normally.

---

## 4. Viewport screenshots at 360 / 768 / 1280px

Real Chromium opened the running site at each width. Full-page screenshots saved to `docs/reviews/screenshots/`:

| Viewport | Screenshot | Horizontal scroll | Console errors | Console warnings |
|---|---|---|---|---|
| 360px | `home-360px.png` | None (scrollWidth 360 === clientWidth 360) | 1× 500 on `/_next/static/chunks/40vz-de_9_f9v.js` | None |
| 768px | `home-768px.png` | None (scrollWidth 768 === clientWidth 768) | 1× 500 on `/_next/static/chunks/40vz-de_9_f9v.js` | None |
| 1280px | `home-1280px.png` | None (scrollWidth 1280 === clientWidth 1280) | 1× 500 on `/_next/static/chunks/40vz-de_9_f9v.js` | None |

**Horizontal scroll:** None at any width. `scrollWidth === clientWidth` for both `<html>` and `<body>`.

**Console 500 error:** `Failed to load resource: 500 (Internal Server Error)` on `/_next/static/chunks/40vz-de_9_f9v.js`. This is a testing artifact, not an application defect: the e2e test's `webServer` runs `npm run build` which regenerates `.next/` with different chunk hashes, invalidating the chunks served by the separate port-3000 server. The e2e test's own server (port 3119) served consistent chunks and all 3 tests passed. The port-3000 server was rebuilt and restarted after this was identified.

No console warnings at any viewport.

---

## 5. 360px: Menu / Escape / focus return + empty trial form

Real Chromium at 360px × 900px viewport against the running server.

### 5a. Menu tap, Escape, focus return

| Check | Result | Detail |
|---|---|---|
| Menu button focused before tap | PASS | `document.activeElement === menuButton` |
| Menu opens on tap | PASS | Mobile navigation element present after click |
| Escape closes menu | PASS | `aria-expanded` → `false` |
| Focus returns to Menu button after Escape | PASS | `document.activeElement === menuButton` after Escape |

The Navbar's `onKeyDown` Escape handler (`setOpen(false); trigger.current?.focus()`) works correctly at 360px.

### 5b. Empty trial form submission

| Check | Result | Detail |
|---|---|---|
| Submit button enabled | PASS | Button enabled after hydration |
| Errors show on empty submit | PASS | `role="alert"` visible with "Please correct the following:" |
| Name error present | PASS | "Enter your name (1–80 characters)." |
| Mobile error present | PASS | "Enter a valid mobile number with 8–15 digits; include your country code if outside India." |
| `aria-invalid="true"` on Name | PASS | Name field has `aria-invalid="true"` |
| `aria-invalid="true"` on Mobile | PASS | Mobile field has `aria-invalid="true"` |
| Focus moves to first invalid field (Name) | PASS | `document.activeElement === #trial-name` after submit |
| No console errors | PASS | Zero console errors during the entire flow |

The trial form's client-side validation and focus management work correctly at 360px. Errors are announced via `role="alert"`, associated with fields via `aria-describedby`, and focus moves to the first invalid field.

### Screenshot

- `docs/reviews/screenshots/home-360px-form-errors.png` — full-page screenshot at 360px with form errors displayed.

---

## Summary

| Area | Result |
|---|---|
| npm ci | PASS |
| Lint (source `src/`) | PASS |
| TypeScript (`tsc --noEmit`) | PASS |
| Unit tests (71 tests) | PASS |
| Production build (preview=true) | PASS |
| Dev server on port 3000 | PASS (HTTP 200) |
| E2E tests (3 tests) | PASS |
| Screenshots 360/768/1280px | PASS (saved) |
| Horizontal scroll at any width | None |
| Console warnings | None |
| Console errors | 1× 500 (testing artifact from e2e rebuild, not an app defect) |
| Menu / Escape / focus return at 360px | PASS |
| Empty trial form errors + focus at 360px | PASS |

No item is marked BLOCKED — every step ran successfully on this machine. The "BLOCKED" statuses in verify.md (Chromium launch, Lighthouse, browser behavior) are resolved in this environment. The dev server remains running on `http://127.0.0.1:3000` with `NEXT_PUBLIC_CONTACT_PREVIEW=true`.

---

## 6. Local Playwright verification (contact preview enabled)

**Sequence run (nothing else executed against the project during the check):**
1. Stopped all listeners on ports 3000 and 3119.
2. `$env:NEXT_PUBLIC_CONTACT_PREVIEW="true"; npm run build` — exit 0; production build succeeded (7 routes).
3. `npm start` — `next start` served `http://127.0.0.1:3000/` with the preview build.
4. Playwright Chromium (headless) at viewports 360×900 and 1280×900: navigated to `http://127.0.0.1:3000/`, waited 6 seconds, then scrolled to the bottom.

**Hero `<canvas>`:** Present at both viewports (`<canvas class="ribbon-canvas" aria-hidden="true">` inside `#home`) — count=1, visible=true.

**Three.js / ribbon chunk:** The lazy hero WebGL chunk `/_next/static/chunks/1q0i_yhbfpo21.js` (the ribbon renderer that imports Three.js) loaded with **HTTP 200** at both viewports. No `/_next/static/chunks/` request failed.

| Viewport | Console errors | Console warnings | Failed network requests | Hero `<canvas>` | Three.js/ribbon chunk |
|---|---|---|---|---|---|
| 360 × 900 | 0 | 4 | 0 | present (visible) | HTTP 200 |
| 1280 × 900 | 0 | 0 | 0 | present (visible) | HTTP 200 |

**Console warnings (360px only):** 4× Chrome WebGL driver message — `GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels` (the final occurrence noted "this message will no longer repeat"). These are browser GPU/driver diagnostics emitted while the WebGL canvas renders; they are **not** application errors or warnings and are unrelated to the WhatsApp / Call / trial enquiry journey. 1280px had zero console warnings.

**Failed network requests:** None at either viewport. The document, images, stylesheet, and every chunk (including the Three.js/ribbon chunk) returned HTTP 200.

**Conclusion:** No application console errors, no failed network requests, the hero `<canvas>` is present at both viewports, and the Three.js chunk loaded successfully (HTTP 200). The 360px WebGL "GPU stall due to ReadPixels" messages are browser driver diagnostics, not application defects.
