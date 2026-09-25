# Content still needed

Tick things off as you add them. `npm run todo` lists every remaining `[KT: …]` placeholder with its
file and line. How-tos are in [docs/CONTENT_GUIDE.md](docs/CONTENT_GUIDE.md).

## Opening
- [ ] Hero photo (`photos.ts` → `hero`): a favorite photo of Grace
- [ ] Opening message (`site.ts` → `hero.note`)
- [ ] Your name as you sign things (`site.ts` → `author.name`)
- [ ] Decide on the "25th birthday" sticker (`site.ts` → `person.ageOrdinal`, `null` to hide)

## Relationship story (`story.ts`, `photos.ts`)
- [ ] Chapter One (August 9, 2025): photo, memory, caption
- [ ] Chapter titles for the other chapters
- [ ] Photos for each chapter, with real alt text
- [ ] Captions, asides, footnotes, arrow labels (or delete the ones you don't want)
- [ ] Choose layouts per chapter. The demo shows every layout; keep only what fits
- [ ] Decide which chapters get a KT cameo

## Grace
- [ ] Things I love about you (`loveNotes.ts`, ~6–10 short notes)
- [ ] Portrait for the love-notes board (`photos.ts` → `love-portrait`)

## Us, by the numbers (optional)
- [ ] Any real stats worth adding (`stats.ts`). Days together is automatic

## Letter
- [ ] Greeting, paragraphs, sign-off (`letter.ts`)
- [ ] One quiet photo (`photos.ts` → `letter`), or set `letter.photo = null`

## Mystery trip
- [ ] Final teaser wording, if you want to change it (`tripTeaser.ts`)
- [ ] Clue #1 (`tripClues`)
- [ ] Clue #2 (unlocks Oct 27), or delete it
- [ ] Confirm the reveal time and time zone (`site.ts` → `trip.revealTime`, `revealTimeZone`)
- [ ] Fill in `.secret-terms` with every giveaway word (nearby towns, lodging name…)

## Reveal (private, in `src/content/reveal/trip.ts`, gitignored)
- [ ] Destination name + tagline
- [ ] Destination hero image (`photos-original/reveal/`)
- [ ] Final itinerary (days + items)
- [ ] Departure time / drive time
- [ ] Lodging
- [ ] Packing list, weather, food plans, what to wear
- [ ] Directions link

## Ending
- [ ] Closing photo (`photos.ts` → `closing`)
- [ ] Closing message + last line (`site.ts` → `closing`)

## Optional
- [ ] Soundtrack you have the rights to (`site.ts` → `soundtrack`)
- [ ] Extra easter egg or inside joke
