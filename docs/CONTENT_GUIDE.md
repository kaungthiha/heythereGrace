# Content guide

Everything Grace reads or sees is data in `src/content/`. You shouldn't need to touch components to
change the story.

**Placeholders.** Any text containing `[KT: …]` shows on the page as a yellow striped TODO note, so
nothing unfinished can slip through unnoticed. Run `npm run todo` to list them all.

Run `npm run dev` and keep the browser open. Changes appear as soon as you save.

---

## Photos

### Add a photo

1. Drop the original into `photos-original/` (subfolders are fine). This folder is never committed
   and never modified.
2. Run `npm run optimize-images`. For each photo it:
   - fixes rotation and strips all EXIF metadata (GPS, camera, time)
   - writes 480/960/1600px AVIF + WebP files to `public/images/`
   - records the size and average color in `src/content/photos.generated.json`
   - prints the photo's name, e.g. `IMG_4012.jpg → "img-4012"`
3. Point an entry in `src/content/photos.ts` at it:

```ts
{
  id: 'first-date',              // what chapters refer to
  src: 'img-4012',               // the name printed by optimize-images
  alt: 'Grace laughing at a candlelit table',   // describe the photo — required
  caption: 'the night it started',               // handwritten caption (optional)
  date: '2025-08-09',            // optional; shown small under the caption
  location: 'somewhere cozy',    // optional
  aside: 'she ordered for me',   // optional handwritten aside next to the photo
  footnote: 'tiny print',        // optional
  pointer: { label: 'me, nervous', x: 62, y: 38 },  // optional hand-drawn arrow at x%/y% of the photo
  focalPoint: '50% 30%',         // optional: which part to keep if a layout crops
},
```

Once `src` is set, the placeholder disappears automatically. Photos load lazily. Only the hero photo
loads immediately.

- **Filenames become public.** Rename originals before optimizing if a name gives anything away.
  The script refuses filenames that contain a secret term.
- **iPhone HEIC** may not be supported. Export as JPEG if the script says so.
- **Quick test without optimizing:** `src: 'images/raw/test.jpg'` (put the file under `public/`). It
  won't be resized or stripped, so don't ship it that way.
- `npm run optimize-images -- --force` redoes everything. `-- --clean` deletes files for originals you
  removed.

### Alt text
Describe what's in the photo as you'd tell someone on the phone ("Grace holding a giant pretzel,
laughing"). Screen readers read it, and it shows if a photo fails to load.

---

## The story (chapters)

Edit `src/content/story.ts`. Each chapter:

```ts
{
  id: 'first-trip',             // unique, never shown
  eyebrow: 'Chapter Three',     // small taped label (optional)
  title: 'A few adventures later…',
  date: '2025-11-14',           // ISO date, or free text like 'Winter 2025' (optional)
  subtitle: '…',                // optional
  body: '…',                    // a short paragraph (optional)
  layout: 'film-roll',          // see below
  photos: ['roll-1', 'roll-2'], // photo ids, in order
  annotation: '…',              // handwritten note with an arrow (optional)
  mood: 'adventure',            // sweet | funny | adventure | quiet → picks the paper tint
  palette: 'sage',              // optional override: cream peach blue sage lavender warm blush
  mascot: 'backpack',           // optional KT cameo (see below)
}
```

**Reorder chapters** by moving entries in the array. **Delete** one by removing it.

### Layouts: pick by content, not variety

| layout | best for | photos |
| --- | --- | --- |
| `fullscreen` | one important photo, nearly full screen | 1 |
| `scrapbook` | 2–3 photos from one day, with asides | 2–3 |
| `photo-strip` | photo-booth sequences | 3–4 (square-cropped) |
| `film-roll` | casual trip photos; swipe sideways | 4–10 |
| `collage` | "tiny moments": lots of small silly ones | 5–12 |
| `split` | before/after, same day | 2 |
| `polaroid-stack` | a pile she taps through | 3–6 (square-cropped) |
| `spotlight` | one portrait + a note (uses `body` as the note) | 1 |

The demo uses every layout once so you can see them. The real story doesn't need to.

### KT mascot cameos
`mascot:` accepts `wave`, `peace`, `tongue`, `backpack`, `point-right`, `point-left`, `heart`,
`note`, `secret` or `booty-walk`. DESIGN_LANGUAGE.md says to use him roughly once every 2–3
chapters, and not in the quiet or intimate ones.

---

## Hero, love notes, stats, letter, closing

| What | File | Notes |
| --- | --- | --- |
| Opening message, hero photo, subtitle | `site.ts` → `hero` | `hero.photo` is a photo id |
| "25th birthday" sticker | `site.ts` → `person.ageOrdinal` | `null` hides it. The birth year is never shown |
| Your signature | `site.ts` → `author.name` | Used at the end of the letter |
| Things I love about you | `loveNotes.ts` | Short sentences. `icon` is optional: `star`, `heart`, `sparkle`, `flower` |
| Us, by the numbers | `stats.ts` | Days together is calculated live. Add only real numbers; if the list is empty, nothing extra shows in production |
| Birthday letter | `letter.ts` | One string per paragraph. `photo: null` removes the photo |
| Closing scene | `site.ts` → `closing` | One photo, one line, your message |
| Opening gift text | `site.ts` → `intro` | |

---

## Mystery trip (before the reveal)

Everything in `src/content/tripTeaser.ts` **is public in the teaser build**. Never put the
destination or hints that give it away here.

- **Wording:** `tripTeaser.ending`, `.turn`, `.mystery`.
- **Guess replies:** `tripTeaser.guess.responses`. They cycle in order and never depend on the guess.
- **Clues:** `tripClues`. A clue with `unlockDate: '2026-10-27'` shows as a sealed envelope until
  midnight that day in the trip's time zone. `icon` can be a trip sticker name (`compass`, `suitcase`,
  `map`, `backpack`, `luggage-tag`, `cloud`, `footsteps`) or a doodle name. Delete all clues to hide the
  board. A locked clue's text is still in the page source, so only use hints you'd be fine with her
  finding early.

### Change the reveal date or time
`site.ts` → `trip.revealDate`, `revealTime` (24h `"HH:MM"`), `revealTimeZone` (IANA name, e.g.
`America/New_York`). This only moves the countdown. The actual reveal is the deploy in
[REVEAL_CHECKLIST.md](REVEAL_CHECKLIST.md).

---

## The itinerary (after the reveal)

1. `cp src/content/reveal/trip.mock.ts src/content/reveal/trip.ts`. The new file is gitignored, so it
   stays on your machine.
2. Fill it in. Every field is typed and optional except `destination.name` and `days`. Blocks with
   nothing in them disappear.
3. Preview with `npm run dev:revealed`.
4. **Destination photo:** put the original in `photos-original/reveal/` and run
   `npm run optimize-images`. It lands in `src/content/reveal/assets/` (also gitignored) and the
   script prints the exact `import` line to paste into `trip.ts`. Keep reveal images out of
   `public/`, because everything there is published in every build.
5. On reveal day, follow [REVEAL_CHECKLIST.md](REVEAL_CHECKLIST.md).

---

## Soundtrack (optional)
Put an audio file you have the rights to in `public/audio/` and set
`site.ts → soundtrack: { src: 'audio/song.mp3', label: 'Song name' }`. A small button appears. It
never autoplays.

## Easter eggs
Tapping the hearts next to the hero photo bursts confetti. The "open the present again" button at the
very end replays the intro. For more, `useInView` (runs once on scroll-in), `confettiFrom(element)`
and the `wiggle` CSS animation are the building blocks. Keep them small and never hide anything
important behind one.

## Stickers
Stickers come from the four sheets in `assets/`. If you replace a sheet, update the names list in
`scripts/extract-stickers.mjs` (run with `--list` to see what it detects) and run
`npm run extract-stickers`.
