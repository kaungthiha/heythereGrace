# Content still needed

Tick things off as you add them. `npm run todo` lists every remaining `[KT: …]` placeholder with its
file and line. How-tos are in [docs/CONTENT_GUIDE.md](docs/CONTENT_GUIDE.md).

## Opening
- [x] Hero photo (`photos.ts` → `hero`): "fancy dinner". Swap if you have a favorite
- [x] Opening message (`site.ts` → `hero.note`)
- [x] Your name as you sign things (`site.ts` → `author.name`): ကောင်း
- [ ] Decide on the "25th birthday" sticker (`site.ts` → `person.ageOrdinal`, `null` to hide)

## Relationship story (`story.ts`, `photos.ts`)
- [x] Photos for each chapter, with alt text (from `gton photos/`, sorted by date; review the alt text)
- [x] Chapter One (August 9, 2025): memory
- [x] Chapter titles + memories for the other chapters
- [ ] Review captions: they're your filenames verbatim. Check you're happy for Grace (and anyone with
      the link) to read "goat jizzler", "human trafficker core", and the dentistry office name
- [ ] Full-size copy of "i got so many pics of you sleeping mmm" (the one you sent is 96px wide, so it's left out)
- [ ] Optional: a "Before Chapter One" chapter now opens the story (June–Aug 2025 photos). Delete it from
      `story.ts` if you'd rather start at August 9
- [ ] Decide which chapters get a KT cameo

## Grace

## Us, by the numbers (optional)
- [x] Stats: miles, meals, farts, stims (`stats.ts`). Days together is automatic
- [ ] Update miles after new trips (the note in `stats.ts` shows the per-city numbers)

## Letter
- [x] Greeting, paragraphs, sign-off (`letter.ts`)
- [x] One quiet photo (`photos.ts` → `letter`): "'exquisite'"

## Mystery trip
- [ ] Final teaser wording, if you want to change it (`tripTeaser.ts`)
- [x] Clues #1–5 (`tripClues`), unlocked one per guess, five guesses max
- [ ] Confirm the reveal time and time zone (`site.ts` → `trip.revealTime`, `revealTimeZone`)
- [ ] Fill in `.secret-terms` with every giveaway word (nearby towns, lodging name…)

## Reveal (private, in `src/content/reveal/trip.ts`, gitignored)
- [x] Destination name (`trip.ts`, created from the mock)
- [ ] Tagline
- [x] Destination hero image (`photos-original/reveal/destination.jpg`)
- [ ] Credit for that photo (`trip.ts` → `destination.image.credit`), shown under it after the reveal
- [ ] Final itinerary (days + items)
- [ ] Departure time / drive time
- [ ] Lodging
- [ ] Packing list, weather, food plans, what to wear
- [ ] Directions link

## Ending
- [ ] Closing photo (`photos.ts` → `closing`): currently the escape-room photo again as a bookend. Swap for a favorite of you two
- [x] Closing last line (`site.ts` → `closing.signoff`): "wash up stinky"

## Optional
- [x] Soundtrack (`site.ts` → `soundtrack`): The Kiffness × NumNum Cat, looping
- [ ] Extra easter egg or inside joke
