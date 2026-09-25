# For Grace 🎁

A one-page birthday scrapbook for Grace's 2026 birthday (October 26). It tells our story in chapters,
then turns into a second present: a mystery trip she can guess at, with the destination revealed on
October 28.

It's a static React + TypeScript + Vite site, hosted free on GitHub Pages. It has no backend, no
paid services and no analytics.

---

## Quick start

```bash
npm install
npm run dev                 # http://localhost:5173 (teaser: no destination anywhere)
npm run dev:mock-reveal     # the reveal UI with a fake trip ("THE MOON")
npm run dev:revealed        # the reveal with the REAL trip (needs src/content/reveal/trip.ts)
```

| Command | What it does |
| --- | --- |
| `npm run build` | Production build into `dist/` (reveal mode taken from `src/content/site.ts`) |
| `npm run preview` | Serve `dist/` locally |
| `npm test` | Unit tests (dates/countdown, guesses, content integrity, placeholders) |
| `npm run typecheck` | TypeScript only |
| `npm run check:secrets` | Build, then prove the destination isn't in `dist/`, the repo or git history |
| `npm run optimize-images` | `photos-original/` → web-sized, EXIF-free images + manifest |
| `npm run todo` | List every `[KT: …]` placeholder still in the content |
| `npm run extract-stickers` | Re-cut the sticker sheets in `assets/` into `public/assets/` |

To run a single test file: `npx vitest run src/utils/dates.test.ts`. Add `-t "name"` to run one test.

---

## Where things live

```
src/content/          ← everything you'd edit: words, photos, chapters, trip teaser
  site.ts             central config: names, dates, reveal date/time/zone, revealMode
  story.ts            relationship chapters (order, layout, photos, mascot cameo)
  photos.ts           photo manifest (one entry per photo, referenced by id)
  loveNotes.ts  stats.ts  letter.ts  tripTeaser.ts
  reveal/             none.ts (teaser), trip.mock.ts (fake), trip.ts (REAL — gitignored)
src/sections/         one component per part of the story
src/components/       PhotoFrame, Sticker, Doodle, PaperLabel, ChapterNav, …
public/assets/        die-cut stickers (mascot, birthday, scrapbook, trip)
public/images/        optimized photos (generated)
assets/               original sticker sheets (source for extract-stickers)
docs/                 CONTENT_GUIDE.md, REVEAL_CHECKLIST.md
CONTENT_TODO.md       what content is still missing
DESIGN_LANGUAGE.md    the visual rules (palette, stickers, mascot usage)
```

The full how-to for adding content is in **[docs/CONTENT_GUIDE.md](docs/CONTENT_GUIDE.md)**.

---

## How the surprise stays secret

GitHub Pages serves plain public files. Anything in the build can be found by someone who looks:
page source, JavaScript, JSON, filenames or source maps. So the destination is **never in the teaser
build**. It isn't hidden or encrypted there. It just isn't included.

- `vite.config.ts` points the import `@trip-reveal` at one of three files **at build time**:
  `none.ts` (teaser, exports `null`), `trip.mock.ts` (fake trip), or `trip.ts` (the real one).
- The teaser build doesn't even contain the reveal component (it's dead-code-eliminated).
- The guessing game never checks answers. Every reply is picked without looking at the guess.
- `trip.ts`, `src/content/reveal/assets/`, `CLAUDE.local.md` and `.secret-terms` are gitignored.
- Production source maps are off.
- `npm run check:secrets` fails if any term in `.secret-terms` shows up in `dist/` (including
  filenames and bytes inside images), in any file git would publish, or anywhere in git history. It also
  fails if reveal code or mock trip data leaks into a teaser build.

The countdown is just for fun. It doesn't protect anything. The reveal only happens when you deploy a
revealed build. See **[docs/REVEAL_CHECKLIST.md](docs/REVEAL_CHECKLIST.md)**.

---

## Deploying to GitHub Pages

**Automatic (recommended).** `.github/workflows/deploy.yml` builds and publishes on every push to `main`.

1. Push this repo to GitHub (e.g. `username/grace-birthday`).
2. Repo **Settings → Pages → Source: GitHub Actions**.
3. Optional: **Settings → Secrets → Actions →** add `SECRET_TERMS` (comma-separated destination words)
   so CI refuses to deploy a build that mentions them.
4. Push to `main`. The site appears at `https://username.github.io/grace-birthday/`.

The build uses a relative base path (`base: './'`), so it works under any repo name or at a root
domain without configuration. There's a single page and no client-side routing, so no 404 tricks are
needed.

**Manual alternative:** `npm run check:secrets` and then upload `dist/` anywhere that serves static
files.

---

## Privacy

- `<meta name="robots" content="noindex,nofollow">` and `robots.txt` ask search engines not to
  index the site. **This does not make the site private.** Anyone with the link can open it, and
  GitHub Pages has no password protection.
- Free GitHub Pages needs a **public repository**, so committed photos are publicly downloadable from
  the repo too. Only commit photos you're comfortable with being public.
- `npm run optimize-images` strips all EXIF metadata (GPS, camera, timestamps). Originals in
  `photos-original/` are never modified or committed.
- No analytics, trackers, cookies or third-party requests. Fonts are self-hosted.
- The birth year is never displayed.

---

## Design notes

Visual rules live in `DESIGN_LANGUAGE.md`, which wins over `CLAUDE.md` on visual questions. In short:

- warm muted paper palette
- die-cut stickers cut from the supplied sheets
- the KT mascot used sparingly as a guide
- real photos as the focus
- motion that plays once, with full `prefers-reduced-motion` support

Deliberate choices:

- **Fonts:** Fraunces (display, with its "soft" axis for rounded corners), Figtree (body), Caveat
  (handwritten accents only). All SIL Open Font License and self-hosted. To swap the display face,
  change `--font-display` in `src/styles/tokens.css`.
- **No animation library.** CSS transitions, one shared IntersectionObserver and the Web Animations API
  cover everything, which keeps the JavaScript small (~84 KB gzipped, mostly React).
- **Simple SVG doodles** (underlines, circled dates, itinerary icons) are still hand-coded, because the
  sticker sheets don't cover them and they need to scale or draw themselves on.
- **Time zone:** the reveal and clue unlocks default to `America/New_York`. Change `revealTimeZone` in
  `site.ts` if you're elsewhere.

Tested in Chrome at 390px and 1280px, with and without reduced motion. Still worth checking by hand
before the birthday: Safari/iOS and very large text sizes.
