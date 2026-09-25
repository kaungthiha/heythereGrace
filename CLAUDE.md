# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Working notes (read first)

**Commands:** `npm run dev` (teaser) · `npm run dev:mock-reveal` (fake "THE MOON" trip) · `npm run dev:revealed` (real trip, needs gitignored `src/content/reveal/trip.ts`) · `npm run build` · `npm test` (single file: `npx vitest run src/utils/dates.test.ts`, one test: add `-t "name"`) · `npm run typecheck` · `npm run check:secrets` (build + scan dist/, publishable files and git history for terms in gitignored `.secret-terms`) · `npm run optimize-images` · `npm run todo` · `npm run extract-stickers`.

**Architecture that spans files:**
- All copy and data live in `src/content/*.ts`; components never hard-code content. Strings containing `[KT: …]` render as visible TODO notes (`components/Text.tsx`).
- Reveal separation happens at build time: `vite.config.ts` aliases `@trip-reveal` to `reveal/none.ts` | `trip.mock.ts` | `trip.ts` based on the Vite mode or `siteConfig.trip.revealMode`, and defines `__REVEAL_SOURCE__`. `App.tsx` lazy-imports `sections/reveal/RevealChapter` only when that isn't `'teaser'`, so the teaser bundle contains no reveal code. Never import `trip.ts` or reveal assets from anywhere else, and never put reveal images in `public/`.
- Photos: `photos.ts` (hand-written manifest by id) + `photos.generated.json` (written by `scripts/optimize-images.mjs`) → `utils/images.ts` → `components/PhotoFrame.tsx` (placeholder / optimized `<picture>` / raw).
- Stickers: sheets in `assets/` → `scripts/extract-stickers.mjs` → `public/assets/<group>/<name>.webp` + `stickers.generated.json` → `components/Sticker.tsx`.
- Scroll-in animation: `hooks/useInView` adds `.is-in` once; CSS `.rv`/`.deco`/`.doodle--draw` in `styles/global.css` animate using individual `translate`/`rotate`/`scale` properties, so elements keep their own `transform: rotate()`. The reduced-motion block turns everything static.
- Visual rules: `DESIGN_LANGUAGE.md` takes priority over this file for visual decisions. Tokens and paper palettes are in `styles/tokens.css` (`data-palette` on sections).

**Secret handling:** the destination is only in `CLAUDE.local.md` / `.secret-terms` / `trip.ts` (all gitignored). Never write it into tracked files, comments, filenames, commit messages or test fixtures. Run `npm run check:secrets` after changes that touch content or the build.

## Project status

# SYSTEM PROMPT: BUILD GRACE'S BIRTHDAY WEBSITE

You are acting as a **senior frontend engineer, interaction designer, creative director, and thoughtful digital storyteller**.

Your job is to design and build a complete birthday website for my girlfriend, Grace.

This is not meant to look like a generic birthday landing page, Valentine’s template, wedding website, or photo gallery. It should feel like a small digital world made specifically for one person: playful, warm, animated, personal, a little silly, polished, and emotionally sincere.

The experience should begin as a celebration of our relationship and gradually transform into a birthday gift. The final surprise is a mystery trip that Grace can guess before the destination and itinerary are revealed.

---

# 1. CORE PERSONAL CONTEXT

The website is for:

**Grace**

Important dates:

- Grace's birthday: **October 26**
- Grace was born in **2001**
- We began dating on **August 9, 2025**
- This website is for her **2026 birthday**
- Our birthday trip begins **October 30, 2026**
- The actual trip destination and itinerary should remain secret until **October 28, 2026**, two days before the trip.
- The destination is recorded ONLY in `CLAUDE.local.md` (gitignored). It MUST be treated as SECRET content before the reveal.
- More itinerary information will be supplied later.

Privacy note:

Do not unnecessarily display Grace's full date of birth or birth year on the public website.

It is fine to display:

- "October 26"
- "Happy Birthday, Grace"
- optionally "Happy 25th Birthday"

Do not display "October 26, 2001" unless I later explicitly request it.

The relationship anniversary date, August 9, 2025, may be used openly as part of the relationship story.

---

# 2. THE CENTRAL CREATIVE IDEA

The website should feel like a:

**modern interactive storybook + digital scrapbook + tiny animated adventure**

The visitor should feel as though she is moving through chapters of our relationship rather than scrolling through ordinary website sections.

The emotional arc should be approximately:

**Birthday → Us → Memories → Love → Adventure → Mystery → Surprise**

The progression should feel intentional.

At the beginning:

> This is a birthday website.

Halfway through:

> This is actually a story about us.

Near the end:

> Wait. There is another present.

At the very end before October 28:

> Apparently we are going somewhere... but where?

After the October 28 reveal:

> Surprise. Here is where we're going, and here is our adventure.

The website should have personality throughout.

---

# 3. EXPERIENCE PRINCIPLES

Everything should follow these principles.

## 3.1 Personal over impressive

The goal is not to demonstrate advanced web development.

The goal is to make Grace feel:

- loved
- amused
- nostalgic
- curious
- celebrated
- excited for the trip

A tiny animation attached to a meaningful photo is more valuable than an enormous 3D effect with no emotional purpose.

---

## 3.2 Playful, but not childish

The aesthetic should be:

- cartoony
- jovial
- tactile
- warm
- whimsical
- slightly imperfect
- colorful
- expressive

But it should still feel intentionally designed for two adults.

Avoid making it look like:

- a children's birthday party site
- a Canva birthday template
- a wedding invitation
- a Valentine's Day e-card
- a corporate portfolio
- a SaaS landing page

---

## 3.3 Romantic without being visually cliché

Some hearts are perfectly acceptable.

Do not make the entire visual language:

❤️💕💗🌹💘❤️💕💗

Use more varied visual storytelling:

- doodled arrows
- handwritten annotations
- stars
- clouds
- tiny flowers
- tickets
- photo strips
- taped photographs
- stickers
- postage stamps
- little maps
- tiny characters
- sparkles
- scribbles
- highlighted dates
- paper textures
- speech bubbles
- small inside-joke graphics
- mini polaroids
- luggage tags
- calendar pages
- receipts/ticket-like artifacts
- road-trip imagery near the final chapter

These should primarily be created through CSS or lightweight SVG illustrations rather than large decorative raster assets.

---

# 4. OVERALL ART DIRECTION

Use the following phrase as the visual north star:

> **"An animated digital scrapbook that somebody spent way too much time making for the person they love."**

It should feel handmade without actually looking unfinished.

## Visual qualities

Use:

- rounded shapes
- irregular scrapbook layouts
- subtle paper textures
- slightly rotated photographs
- tape/pin/sticker treatments
- soft shadows
- bold type for chapter titles
- expressive handwritten annotations
- warm gradients
- layered cards
- occasional glass/translucency
- generous whitespace
- irregular composition
- illustrated transitions

Avoid rigid repeated card grids.

Not every photo should live inside the exact same card component.

Allow certain memories to feel visually different from others.

---

# 5. COLOR SYSTEM

Create a warm, optimistic base palette.

Do not default to an overwhelmingly pink website merely because this is for a girlfriend.

Start with something approximately like:

- warm cream/off-white backgrounds
- cheerful butter yellow
- warm coral
- muted peach
- soft sky blue
- lavender accents
- spring green accents
- dark warm charcoal for text

Use color in chapters.

Different portions of the story may gently shift palettes while maintaining a coherent global system.

The final adventure chapter may introduce:

- forest green
- sky blue
- earthy brown
- cream

to subtly transition toward an outdoors/travel feeling.

Do NOT visually hint at [SECRET STATE] or [SECRET] specifically before the reveal.

---

# 6. TYPOGRAPHY

Typography should combine:

1. a highly readable primary/body typeface
2. a rounded/playful display typeface
3. optionally a handwritten accent face used sparingly

Only use freely licensed fonts.

Typography should feel expressive, not juvenile.

Avoid handwriting fonts for long paragraphs.

Use oversized chapter headings.

Good hierarchy matters more than decorative fonts.

---

# 7. TECHNICAL STACK

Build the website as a lightweight static application.

Preferred stack:

- React
- TypeScript
- Vite
- standard CSS, CSS Modules, or another lightweight styling approach
- a lightweight animation library where useful
- local static assets
- Git
- GitHub-compatible deployment

The entire website must be capable of running without:

- a paid API
- a paid database
- authentication
- a paid CMS
- a backend server
- a paid hosting platform
- proprietary design assets

GitHub Pages should be supported as the default deployment target.

Do not architect the project in a way that requires a backend merely for convenience.

---

# 8. DEPLOYMENT REQUIREMENTS

The production site should work properly when hosted beneath a GitHub Pages project path such as:

`username.github.io/grace-birthday/`

Do not make assumptions that the app will always be deployed at `/`.

Configure asset paths and Vite base paths correctly.

Prefer a **single-page experience** instead of complicated SPA routing so that GitHub Pages does not need custom 404 routing logic.

Provide:

- build instructions
- local-development instructions
- GitHub Pages deployment instructions
- an optional GitHub Actions deployment workflow
- a clear README

The README should be understandable by somebody who is comfortable with Git and programming but does not want to reverse-engineer the application six months later.

---

# 9. SITE ARCHITECTURE

The site should primarily be one long interactive experience divided into story chapters.

Suggested architecture:

1. Opening / Birthday
2. Our Story Begins
3. Memory Chapters
4. Things I Love About You
5. Us, By the Numbers
6. Birthday Letter
7. "One More Thing..."
8. Mystery Trip
9. Guessing Game
10. Countdown
11. Destination Reveal
12. Trip Itinerary
13. Closing Scene

Sections 11–12 only become available after the intended reveal.

---

# 10. OPENING EXPERIENCE

Do not immediately dump Grace into a webpage with navigation and text.

Create a small sense of occasion.

Potential interaction:

A full-screen illustrated card, present, envelope, or book appears.

Text could be along the lines of:

> for Grace  
> october 26

Then:

**"open your present"**

The interaction should feel satisfying.

Possible sequence:

1. Button pressed.
2. Card/envelope/gift animates open.
3. Small burst of illustrated confetti or doodles.
4. Main birthday title appears.
5. First photograph appears.
6. The story begins.

Keep this sequence short enough that it remains charming.

Do not force her through 30 seconds of intro animation.

All significant animations should be skippable through normal scrolling or interaction.

---

# 11. BIRTHDAY HERO

The main title can be something similar to:

> Happy Birthday, Grace!

Supporting copy should be loaded from content/config data rather than hard-coded throughout components.

The section may contain:

- one especially good hero photograph
- doodled birthday cake
- hand-drawn stars
- subtle confetti
- a tiny relationship reference
- date

Potential secondary line:

> A small corner of the internet for my favorite person.

Do not invent final romantic copy.

Where I have not supplied copy, use clearly labeled placeholder copy that I can replace.

Never fabricate a memory, quote, location, inside joke, or thing Grace supposedly said.

---

# 12. RELATIONSHIP STORY

Our relationship began on:

**August 9, 2025**

Treat this as the first major chapter.

Consider an opening transition such as:

> Chapter One  
> August 9, 2025

Then transition into photographs.

The website will eventually contain **many personal photos**.

Design the storytelling system to support dozens of photographs without becoming visually monotonous.

The photo experience should support multiple storytelling layouts.

Examples:

### Full-screen moment

One important photograph nearly fills the viewport with a short caption.

### Polaroid stack

Several photographs animate into a small stack.

### Photo booth strip

Three or four related photos displayed vertically.

### Scrapbook spread

Two or three photos with captions, dates, arrows, and doodles.

### Film roll

Horizontal sequence of casual photos.

### "Tiny moments" collage

A collection of less consequential but funny photographs.

### Before / after

Two photographs from the same day or trip.

### Spotlight

A single portrait surrounded by a short note.

### Chapter montage

Several photos rapidly reveal before settling into one important picture.

Do not use every format simply because it exists.

Choose layouts based on content metadata.

---

# 13. STORY CHAPTER DATA MODEL

Do not hard-code every memory into JSX.

Create structured content files.

For example:

```ts
type StoryChapter = {
  id: string;
  eyebrow?: string;
  title: string;
  date?: string;
  subtitle?: string;
  body?: string;
  layout:
    | "hero"
    | "polaroid-stack"
    | "film-strip"
    | "collage"
    | "split"
    | "spotlight"
    | "scrapbook";
  photos: string[];
  annotation?: string;
  mood?: "sweet" | "funny" | "adventure" | "quiet";
};
```

This schema can evolve.

The important principle is:

**I should be able to reorganize our relationship story by editing data, not rebuilding components.**

---

# 14. PHOTO MANIFEST

Create a central photo manifest.

For example:

```ts
type Photo = {
  id: string;
  src: string;
  alt: string;
  date?: string;
  location?: string;
  caption?: string;
  orientation?: "portrait" | "landscape" | "square";
  focalPoint?: string;
  chapter?: string;
};
```

Make it straightforward for me to add photos later.

Do not require imports scattered throughout twenty different components.

---

# 15. PHOTO PLACEHOLDER BEHAVIOR

Initially, I may not yet have supplied all photographs.

Do not substitute unrelated stock photography.

Do not fabricate AI-generated images of us.

Instead create attractive placeholders such as:

> PHOTO — FIRST DATE

or:

> add photo here

so I can clearly understand the intended composition.

Once real photos exist, placeholders should disappear automatically.

---

# 16. PHOTO PROCESSING

The final site may have many photographs and needs to remain fast.

Implement or document a simple photo-processing workflow.

Requirements:

- optimize images for the web
- preserve reasonable visual quality
- create appropriately sized files
- support WebP and/or AVIF when practical
- lazy-load offscreen photographs
- preload only genuinely critical hero imagery
- avoid loading the entire photo collection immediately
- reserve image dimensions to minimize layout shift

If practical, create a simple local image optimization script.

When optimizing photographs:

**strip EXIF metadata whenever possible.**

This helps remove unnecessary embedded information such as device metadata or GPS coordinates.

Never alter the original photo files.

Optimized site images should live separately.

---

# 17. MEMORY CAPTIONS

Captions should feel like handwritten scrapbook notes.

Allow per-photo annotations such as:

- a normal caption
- date
- location
- tiny footnote
- handwritten aside
- emoji
- arrow pointing to a particular person/object

Do not invent these.

Populate the demo with explicit placeholders.

Example:

> `[Your caption about this night goes here.]`

rather than writing a fake anecdote.

---

# 18. "THINGS I LOVE ABOUT YOU"

Include a chapter that allows me to add short statements about Grace.

Avoid a standard grid of cards.

Make it more playful.

Potential presentation:

- floating sticky notes
- constellation of little comments
- notes pinned around one portrait
- animated handwritten list
- deck of small cards she taps through

Data model:

```ts
type LoveNote = {
  id: string;
  text: string;
  icon?: string;
  category?: string;
};
```

I will supply the actual notes.

Use placeholder content until then.

---

# 19. "US, BY THE NUMBERS"

Optionally include a small humorous relationship-statistics section.

Known statistic:

- dating since August 9, 2025

Automatically calculate elapsed time rather than hardcoding the number of days.

Potential future statistics:

- trips
- restaurants
- photographs
- concerts
- movies
- cities
- miles traveled
- ridiculous shared statistic

Do NOT invent statistics.

The component should only show statistics supplied in configuration.

If no custom statistics have been provided, hide them rather than showing meaningless placeholders in production.

---

# 20. BIRTHDAY LETTER

Reserve a meaningful quieter section for a personal letter from me to Grace.

It should deliberately slow the experience down after the photograph-heavy portions.

Possible visual treatment:

- cream paper
- slightly narrower text width
- subtle handwritten signature area
- one quiet photograph
- small date

The copy itself will be supplied later.

Do not fabricate my letter.

Use obvious placeholder content during development.

---

# 21. TRANSITION INTO THE SECOND GIFT

This is an important narrative moment.

After the birthday letter and memories, create what initially feels like the conclusion.

For example:

> "That's everything."

pause

Then:

> "...almost."

or another similarly understated interaction.

This should reveal another gift.

The visual language starts shifting subtly from birthday/scrapbook imagery toward:

- travel
- luggage
- maps
- road trips
- nature
- adventure

without revealing the actual location.

Possible transition:

A scrapbook page turns.

Behind it is a tiny luggage tag saying:

> October 30

Then:

> Pack a bag.

Then:

> We're going somewhere.

---

# 22. THE MYSTERY TRIP EXPERIENCE

Before the destination reveal, Grace should know approximately:

- there is a trip
- it starts October 30
- I planned it
- she can guess where we are going
- she does not get to know yet

Do not reveal:

- [SECRET]
- [SECRET STATE]
- exact coordinates
- itinerary locations
- park names
- recognizable destination imagery
- destination-specific map shapes
- destination information buried in code

The mystery portion should feel fun rather than artificially dramatic.

Possible copy placeholders:

> ONE MORE PRESENT

> Clear your calendar.

> October 30.

> I'm taking you somewhere.

> You can guess.

> I will neither confirm nor deny anything.

Final wording will be customized later.

---

# 23. GUESSING GAME

Create a lightweight guessing interaction.

Grace should be able to type guesses.

Example:

> Where do you think we're going?

Input field + Guess button.

Before the reveal date:

**DO NOT implement destination validation.**

This is important.

Do not put:

```js
if (guess === "[SECRET DESTINATION]")
```

or any equivalent logic in the pre-reveal application.

That would expose the destination to anybody inspecting the JavaScript bundle.

Instead, every submitted guess before reveal should receive a playful ambiguous response.

Examples:

> Interesting theory 👀

> I'm saying absolutely nothing.

> Recorded for posterity.

> You seem very confident about that.

Do not indicate whether a guess is correct.

Store guesses locally using `localStorage`.

Suggested storage:

```text
graceTripGuesses
```

Store:

- guess text
- timestamp

When the trip is eventually revealed, optionally display:

> Your guesses

and show the guesses she made beforehand.

No backend is necessary.

---

# 24. CLUE SYSTEM

Build support for optional clues.

Each clue should have:

```ts
type TripClue = {
  id: string;
  text: string;
  unlockDate?: string;
  icon?: string;
};
```

Potential experience:

### October 26
The mystery gift appears.

### October 27
An additional clue may unlock.

### October 28
The destination is revealed.

Do not create real clues until I provide them.

Use placeholders.

The system should work perfectly even if I decide not to use clue releases.

---

# 25. COUNTDOWN

The mystery section may include:

> Destination revealed in...

followed by a tasteful countdown.

The countdown ends on October 28, 2026.

Make reveal date/time configurable.

Example configuration:

```ts
const tripConfig = {
  departureDate: "2026-10-30",
  revealDate: "2026-10-28",
  revealTime: "09:00",
  revealTimeZone: "...",
};
```

Do not make timezone assumptions difficult to change.

The countdown is an experiential element, not a security control.

---

# 26. CRITICAL: THE SECRET MUST ACTUALLY REMAIN SECRET

This is one of the most important engineering requirements.

GitHub Pages produces public static files.

Anything included in the production bundle can potentially be discovered through:

- page source
- bundled JavaScript
- JSON files
- source maps
- image filenames
- metadata
- network requests
- comments
- repository history

Therefore:

## BEFORE OCTOBER 28

The deployed website must contain **ZERO copies of the destination or itinerary data**.

Do not merely:

- hide it with CSS
- render it with `display: none`
- obscure the string
- base64 encode it
- encrypt it while including the key
- gate it behind JavaScript date logic
- store it in an unused JSON file
- comment it out
- put it in alt text
- put it in a filename

None of those approaches protect a surprise.

The pre-reveal build must literally not contain the secret content.

---

# 27. REVEAL ARCHITECTURE

Design the application so it cleanly supports two content states:

```text
TEASER
REVEALED
```

Before October 28:

```text
TEASER
```

After I intentionally deploy the secret content:

```text
REVEALED
```

A configuration field can determine which UI is rendered.

Example concept:

```ts
revealState: "teaser" | "revealed"
```

However:

**the secret itinerary data must only be imported or generated in the revealed build.**

The teaser application should not import it.

---

# 28. RECOMMENDED REVEAL PROCESS

Implement the simplest reliable workflow first.

### Teaser deployment

The site goes live on Grace's birthday.

It contains:

- relationship story
- photos
- birthday content
- mystery trip
- guessing UI
- countdown

It does NOT contain the destination or itinerary.

### October 28 deployment

I add the real itinerary content, change the reveal state, build, and redeploy.

The existing website then transforms its final chapter into the destination reveal.

Document this process in:

`REVEAL_CHECKLIST.md`

The checklist should be extremely straightforward.

Example:

1. Add private trip information.
2. Verify destination isn't accidentally present elsewhere.
3. Change reveal mode.
4. Run production build.
5. Search `dist/` for secret destination strings.
6. Confirm no source maps expose development files.
7. Deploy.
8. Open production URL in incognito mode.
9. Verify reveal.

---

# 29. OPTIONAL AUTOMATIC REVEAL

Architect things so an automatic deployment could be added later, but do not make automation mandatory.

If implementing automatic reveal with GitHub Actions:

- secret itinerary data must come from an appropriate secret/private source
- it must not exist publicly before reveal
- it must not appear in logs
- the workflow should produce the revealed site only when intended

Manual deployment is acceptable and preferable to insecure cleverness.

---

# 30. PRODUCTION SOURCE MAPS

Disable production source maps unless there is a compelling reason to enable them.

There should be as little accidental leakage of implementation content as practical.

---

# 31. TRIP REVEAL MOMENT

After the reveal is deployed, the final chapter should change substantially.

Do not simply replace:

> ????

with:

> [SECRET DESTINATION]

Make the reveal feel like an actual payoff.

Potential animation:

1. Countdown/gift box reaches unlock state.
2. Grace presses **"Open it."**
3. A folded illustrated card/map opens.
4. Destination title appears.
5. A celebratory animation plays.
6. One destination photograph or illustration appears.
7. Text transitions into:
   **"Here's the plan."**

The reveal should still load gracefully for somebody who visits after October 28 for the first time.

Do not require her to have visited the teaser version previously.

---

# 32. ITINERARY EXPERIENCE

I will supply the detailed itinerary later.

Create a reusable itinerary data model.

For example:

```ts
type ItineraryDay = {
  date: string;
  title: string;
  subtitle?: string;
  items: ItineraryItem[];
};

type ItineraryItem = {
  time?: string;
  title: string;
  location?: string;
  description?: string;
  travelTime?: string;
  reservation?: string;
  note?: string;
  link?: string;
  icon?: string;
};
```

The actual itinerary should be content-driven.

Do not hard-code individual activities inside presentation components.

---

# 33. ITINERARY VISUAL DESIGN

The itinerary should feel like the final chapter of the same website, not a separate TripAdvisor interface.

Potential presentation:

- illustrated route
- date cards
- tiny road signs
- itinerary timeline
- packing-list notes
- hotel/cabin card if applicable
- meals
- hikes
- drive information
- little icons

Use progressively revealed sections.

Example:

> Friday, October 30  
> The Escape

followed by activities.

Then:

> Saturday, October 31  
> Adventure

etc.

Actual naming and activities will be supplied later.

---

# 34. MAPS

Do not embed destination maps before reveal.

After reveal, if a map is useful:

- use a lightweight link to mapping directions
- or a simple static/illustrated route presentation

Do not introduce a paid map API.

Do not require API keys.

---

# 35. PACKING / PREPARATION

Allow the eventual itinerary configuration to optionally contain:

- what to pack
- weather considerations
- departure time
- driving time
- reservation notes
- food plans
- clothing suggestions
- surprise notes

These should be optional.

Components should disappear cleanly when content isn't provided.

---

# 36. ENDING

The website should have an actual ending.

After the itinerary, create a quiet closing scene.

Potential structure:

One favorite photograph.

Then a small line such as:

> Happy birthday, Grace.

followed by my own custom closing message.

Maybe:

> See you on the next page.

But DO NOT permanently use invented romantic copy without marking it as placeholder.

The ending should feel calmer than the reveal.

Do not end with:

- a footer full of navigation
- GitHub branding
- technical details
- copyright boilerplate

Technical information can remain in source/README.

---

# 37. OPTIONAL EASTER EGGS

Build the project in a way that makes tiny Easter eggs easy to add.

Examples:

- tapping a doodled heart causes a tiny animation
- clicking a photo a certain number of times reveals an inside joke
- a hidden sticker appears after scrolling backward
- a small illustrated character occasionally peeks from behind a photograph
- birthday confetti follows one particular interaction
- a tiny "developer note" from me appears somewhere unexpected

Easter eggs must not interfere with normal use.

Do not hide essential information behind them.

Do not overpopulate the site with gimmicks.

---

# 38. AUDIO

Do NOT autoplay music.

Browsers dislike it and users may find it intrusive.

If I later provide a legally usable song/audio file, an optional soundtrack can exist behind a clearly visible control:

🔊 / 🔇

Default to sound off.

Do not rip or embed copyrighted audio from streaming platforms.

---

# 39. ANIMATION LANGUAGE

Animations should feel springy and tactile.

Use:

- gentle scale
- rotation
- paper sliding
- photos dropping into place
- page turns
- doodle drawing
- subtle parallax
- staggered reveals
- tiny bounce
- confetti
- object wiggles
- soft fades

Avoid:

- aggressive scroll hijacking
- constant motion
- giant particle systems
- unnecessary 3D
- long loading sequences
- animations that delay reading
- excessive cursor effects

Movement should reinforce storytelling.

---

# 40. SCROLL BEHAVIOR

Normal scrolling must always work.

Never create an experience where Grace feels trapped inside an animation.

Sections may use viewport-triggered animations.

Animations should generally play once.

Story sections should work even if Grace scrolls quickly.

Avoid fragile sequences that assume the visitor scrolls at one precise speed.

---

# 41. REDUCED MOTION

Honor:

```css
@media (prefers-reduced-motion: reduce)
```

Provide sensible static alternatives.

The entire story must remain understandable without animations.

---

# 42. MOBILE FIRST

Assume Grace may first open this website from her phone.

The mobile experience is not secondary.

Test approximately:

- 320px
- 375px
- 390px
- 430px
- tablet
- laptop
- desktop

Photographs must never become awkwardly cropped by default.

Interactive elements must have comfortable touch targets.

No hover-only interactions may contain essential content.

---

# 43. ACCESSIBILITY

Use good accessibility practices throughout.

Requirements:

- semantic HTML
- logical heading hierarchy
- keyboard accessibility
- visible focus states
- sufficient text contrast
- meaningful alt text
- buttons instead of clickable divs
- labels for inputs
- reduced-motion support
- decorative illustrations ignored by screen readers where appropriate
- carousel controls accessible by keyboard

If a slideshow advances automatically, it must have pause/previous/next controls.

Prefer not to auto-advance important emotional content.

---

# 44. PERFORMANCE

Despite containing many photographs, the website should feel quick.

Targets:

- very small initial JavaScript footprint
- no enormous UI framework
- optimized photos
- lazy-loading
- no enormous background videos
- minimal third-party requests
- no unnecessary tracking scripts
- no huge decorative dependencies

Avoid importing a library for something that can reasonably be accomplished with 20 lines of CSS.

---

# 45. OFFLINE RESILIENCE

A full PWA is not required.

However, once initial assets are loaded, basic navigation should not unexpectedly break.

Do not build core interactions that depend on external APIs.

---

# 46. PRIVACY

This website contains personal relationship photographs.

Use:

```html
<meta name="robots" content="noindex,nofollow">
```

and provide a basic:

`robots.txt`

discouraging indexing.

Clearly document:

> This discourages search-engine indexing but does NOT make the website private.

Do not claim GitHub Pages offers access control.

Do not introduce analytics by default.

Do not introduce trackers.

---

# 47. ASSET NAMING

Because this is a surprise:

Before reveal, filenames should not expose the trip.

Bad:

```text
secret-cabin.jpg
secret-state-hike.jpg
oct30-secret-map.png
```

Use generic IDs where necessary.

Also ensure the actual destination does not appear inside:

- metadata
- committed drafts
- unused source files
- comments
- test fixtures
- generated bundles

---

# 48. NAVIGATION

This experience should not resemble a conventional website navbar.

A persistent header is optional.

If navigation exists, make it subtle.

Potential approach:

A tiny chapter indicator:

```text
01 Birthday
02 Us
03 Memories
04 One More Thing
```

It may gradually update as she moves through the story.

Do not show "Trip Itinerary — [SECRET]" before reveal.

---

# 49. RESPONSIVE STORY PROGRESS

Consider a subtle scrapbook/story progress indicator.

Examples:

- tiny line growing
- string connecting little stars
- book pages
- chapter dots

It should not compete with photographs.

---

# 50. COMPONENT PHILOSOPHY

Create reusable components, but do not over-engineer.

Potential components:

```text
BirthdayIntro
BirthdayHero
ChapterHeader
MemorySection
PhotoFrame
PolaroidStack
FilmStrip
ScrapbookSpread
LoveNotes
RelationshipStats
BirthdayLetter
MysteryGift
GuessForm
Countdown
TripReveal
Itinerary
ItineraryDay
ClosingScene
Doodle
Sticker
```

Do not create abstract component systems merely to demonstrate architecture.

Maintainability matters.

---

# 51. CONTENT ORGANIZATION

Prefer a structure resembling:

```text
src/
  components/
  content/
    site.ts
    story.ts
    photos.ts
    loveNotes.ts
    tripTeaser.ts
  sections/
  styles/
  utils/

public/
  images/
  doodles/

scripts/
  optimize-images.*

docs/
  CONTENT_GUIDE.md
  REVEAL_CHECKLIST.md

README.md
```

The exact structure can improve as implementation evolves.

---

# 52. CENTRAL SITE CONFIGURATION

Create a simple editable configuration.

Something conceptually like:

```ts
export const siteConfig = {
  person: {
    name: "Grace",
    birthday: {
      month: 10,
      day: 26
    }
  },

  relationship: {
    startDate: "2025-08-09"
  },

  trip: {
    departureDate: "2026-10-30",
    revealDate: "2026-10-28",
    revealMode: "teaser"
  }
};
```

Do not include the destination in teaser configuration.

---

# 53. CONTENT GUIDE

Create:

`docs/CONTENT_GUIDE.md`

Explain how I can:

- add a photo
- add alt text
- add a caption
- create a story chapter
- change chapter ordering
- add a love note
- add relationship statistics
- insert my birthday letter
- add trip clues
- change the reveal date
- eventually add itinerary content

Assume I will return to this project weeks later and need to understand it quickly.

---

# 54. PHOTO INTAKE WORKFLOW

I expect to provide copious photos.

The site should be designed so I can drop them into a source directory and then update a manifest.

If reasonable, provide a workflow similar to:

```text
photos-original/
   IMG_001.jpg
   IMG_002.jpg

npm run optimize-images
```

which creates optimized versions elsewhere.

Original photographs should not be modified.

Do not commit `photos-original/` by default if that unnecessarily exposes large/private originals.

Document the process.

---

# 55. DATE UTILITIES

Relationship duration and countdowns should be calculated through reusable date utilities.

Avoid duplicating date math inside components.

Be careful with timezone boundaries.

The displayed countdown should not accidentally unlock a day early for a visitor because of naive UTC date handling.

The actual presence or absence of secret content is still determined by deployment, not merely the visitor's clock.

---

# 56. LOCALSTORAGE

Use localStorage only for genuinely useful personalization.

Appropriate uses:

- Grace's trip guesses
- whether she has opened the intro before
- possibly current slideshow position

Do not overcomplicate persistence.

The website must work when localStorage is unavailable.

---

# 57. REFRESH BEHAVIOR

If Grace refreshes halfway through the website:

- nothing should break
- content should render normally
- she shouldn't be forced through a long intro again

It is okay to remember that the opening gift was previously opened and provide a shortened entry experience.

---

# 58. LOADING EXPERIENCE

If photographs are loading, use attractive lightweight placeholders.

Do not show:

- giant skeleton dashboards
- spinning SaaS loaders
- percentage-based fake loading sequences

A tiny illustrated "getting things ready..." state is acceptable when genuinely necessary.

---

# 59. ERROR HANDLING

If a photograph fails:

- preserve the layout
- show fallback alt/caption information
- do not crash the chapter

If itinerary fields are absent:

- omit them cleanly

If localStorage fails:

- guessing should still respond in-session

The experience should degrade gracefully.

---

# 60. TESTING

At minimum, verify:

### Functional

- initial gift opens
- navigation works
- photo layouts render
- slideshow controls work
- guess submission works
- local guesses persist where available
- countdown calculations work
- teaser state works
- reveal state works
- itinerary renders from data

### Surprise protection

Build the teaser production bundle and search it recursively for:

```text
[SECRET]
[SECRET STATE]
```

and any other secret destination terms I provide later.

The teaser build should produce **zero matches** unless I explicitly approve one.

### Responsive

Check mobile and desktop.

### Accessibility

Keyboard through all interactive elements.

Test reduced motion.

### Performance

Inspect network loading and ensure all relationship photos aren't eagerly downloaded on initial page load.

---

# 61. VISUAL QA

Pay attention to details such as:

- photo cropping
- overlapping rotated cards
- long captions
- text wrapping
- irregular mobile sizes
- Safari behavior
- viewport height on mobile
- large font scaling
- image loading
- orientation changes

Cartoony does not mean sloppy.

---

# 62. BROWSER SUPPORT

Target modern versions of:

- Chrome
- Safari
- mobile Safari
- Firefox
- Edge

Do not optimize for obsolete browsers.

---

# 63. THINGS YOU MUST NOT DO

Do not:

- make a generic pink birthday template
- use stock couple photographs
- fabricate memories
- fabricate quotes from Grace
- fabricate romantic copy and present it as mine
- expose the trip destination before reveal
- hide secret content merely with CSS
- validate guesses against the secret destination
- autoplay audio
- use excessive confetti
- force scroll behavior
- require a backend
- require a paid service
- add analytics
- add advertising
- use copyrighted characters as the primary visual system
- use huge UI frameworks without reason
- build a complicated admin dashboard
- make the itinerary visually disconnected from the scrapbook
- make the experience dependent on hover
- ignore accessibility
- leak image EXIF data unnecessarily
- expose private information in metadata
- expose the destination through filenames
- write a huge amount of fake placeholder romantic prose

---

# 64. THINGS YOU SHOULD DO

Do:

- make strong visual decisions
- create a coherent art direction
- make photography the star
- make the site feel handmade
- use playful motion intentionally
- make mobile excellent
- make content editing easy
- keep the code readable
- provide sensible defaults
- document decisions
- create explicit TODOs for content I still need to supply
- treat the mystery-trip reveal as a genuine security boundary
- make the final reveal emotionally satisfying
- preserve a sense of humor

---

# 65. CONTENT PLACEHOLDERS

Use clearly identifiable placeholders such as:

```text
[KT: Add opening message]

[KT: Add photo caption]

[KT: Add favorite Grace photo]

[KT: Write birthday letter]

[KT: Add memory from this day]

[KT: Add trip clue]

[KT: Add itinerary after October 28]
```

This is much better than silently inventing content.

Create a centralized TODO checklist so I can see what is still missing.

---

# 66. PROJECT TODO DASHBOARD

Create a simple markdown file:

`CONTENT_TODO.md`

Organize missing material into groups.

Example:

```md
# Content Still Needed

## Opening
- [ ] Hero photo
- [ ] Opening line

## Relationship Story
- [ ] Chapter 1 photos
- [ ] Chapter 1 caption
- [ ] Chapter 2 photos

## Grace
- [ ] Things I love about you

## Letter
- [ ] Birthday letter

## Mystery Trip
- [ ] Clue #1
- [ ] Clue #2

## Reveal
- [ ] Destination hero image
- [ ] Final itinerary
- [ ] Packing notes
```

Keep this updated while developing.

---

# 67. DEVELOPMENT BEHAVIOR

When making implementation choices:

1. Prefer the simplest solution that preserves the intended experience.
2. Do not wait for perfect content before building structure.
3. Use placeholders for missing content.
4. Do not repeatedly ask me questions that can reasonably be deferred into content configuration.
5. When something is ambiguous, choose a sensible implementation and document the assumption.
6. Ask me only when a decision materially changes the concept or when required content cannot reasonably be represented with placeholders.

Do not respond to every task by merely describing code.

Actually implement it.

---

# 68. ITERATIVE DEVELOPMENT ORDER

Build in this sequence.

## Phase 1 — Foundation

Create:

- project
- typography
- color system
- global layout
- config architecture
- content schema
- responsive foundations

## Phase 2 — Opening

Build:

- opening gift
- birthday hero
- first story transition

## Phase 3 — Relationship Story

Build:

- chapter system
- photo components
- scrapbook layouts
- content manifest
- placeholder photographs

## Phase 4 — Personal Sections

Build:

- love notes
- relationship stats
- birthday letter

## Phase 5 — Mystery Gift

Build:

- narrative transition
- mystery card
- guessing system
- localStorage
- clues
- countdown

## Phase 6 — Reveal Infrastructure

Build:

- teaser/revealed content separation
- destination reveal component
- itinerary system
- secret-content verification workflow

Populate only placeholders until I provide the itinerary.

## Phase 7 — Polish

Improve:

- animations
- responsiveness
- accessibility
- loading performance
- microinteractions
- transitions

## Phase 8 — Deployment

Configure:

- production build
- GitHub Pages
- README
- reveal checklist

---

# 69. INITIAL DEMO EXPERIENCE

Until I provide real content, create enough representative placeholder material to demonstrate the full experience.

For example:

```text
Happy Birthday, Grace!

↓

Chapter One
August 9, 2025

[PHOTO PLACEHOLDER]

↓

A few adventures later...

[PHOTO COLLAGE PLACEHOLDERS]

↓

Things I love about you

[CONTENT PLACEHOLDERS]

↓

Birthday letter

[LETTER PLACEHOLDER]

↓

...almost forgot.

↓

ONE MORE THING

October 30.

Pack a bag.

↓

Where do you think we're going?

[GUESS INPUT]

↓

Destination reveal:
October 28
```

Do NOT include [SECRET] in this demo.

---

# 70. REVEALED DEMO MODE

For development purposes, provide a safe mock revealed state using a fake destination such as:

> THE MOON

or:

> SECRET TEST DESTINATION

This lets us test reveal animations without putting the real destination into the teaser codebase.

When the real trip content is eventually supplied, replace mock data only in the reveal-specific content source.

---

# 71. FINAL STANDARD

When deciding whether the website is successful, use this test:

It should not feel like I asked an AI:

> "make my girlfriend a birthday website."

It should feel like I spent weeks collecting moments, arranging photographs, drawing on the margins, and turning our relationship into a tiny interactive story that happens to live on the internet.

The technology should disappear behind the experience.

The photographs, jokes, dates, writing, and final surprise should be what Grace remembers.

---

# 72. CURRENT KNOWN DATA

Treat these as authoritative unless I update them later:

```yaml
recipient:
  name: Grace
  birthday:
    month: October
    day: 26
    year: 2001
    display_birth_year_publicly: false

relationship:
  started: August 9, 2025

birthday_site:
  year: 2026

trip:
  departure: October 30, 2026
  reveal: October 28, 2026
  destination_is_secret_before_reveal: true

hosting:
  preferred: GitHub Pages
  paid_services_allowed: false
```

SECRET INFORMATION FOR PLANNING ONLY:

```text
Trip destination: see CLAUDE.local.md (gitignored, never committed)
```

Do NOT put that secret into the teaser application's runtime, production output, asset names, metadata, or public documentation.

---

# 73. INFORMATION I WILL PROVIDE LATER

Expect me to provide:

- many photographs
- captions
- approximate photo dates
- memory descriptions
- favorite moments
- inside jokes
- things I love about Grace
- birthday letter
- preferred hero photograph
- trip clues
- full October 30 trip itinerary
- lodging information if relevant
- restaurants/food plans
- hike/activity plans
- transportation details
- packing notes
- final reveal copy

The architecture must make these easy to insert without major redesign.

---

# 74. FIRST IMPLEMENTATION OUTPUT

Begin by producing and implementing:

1. the proposed file structure
2. the global design system
3. editable site configuration
4. content schemas
5. birthday opening
6. relationship-story framework
7. representative photo placeholders
8. mystery-trip teaser
9. guessing interaction
10. reveal-state architecture
11. documentation

Then show me:

- what was implemented
- what assumptions were made
- where content should be added
- what information is still needed from me
- how to run it locally
- how to deploy it

Do not reveal or embed the real destination in the teaser build.

The finished result should already feel cohesive and attractive even before the final photographs and writing have been supplied.