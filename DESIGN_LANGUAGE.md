# Design Language — Grace Birthday Website

> **Purpose:** This document defines the visual and interaction language for Grace's birthday website.  
> The broader product requirements and story architecture live in `CLAUDE.md`.  
> When making visual decisions, treat this file as the authoritative design companion to that spec.

---

## 1. Creative North Star

The site should feel like:

> **A hand-drawn editorial cartoon living inside a Japanese stationery scrapbook, with real relationship photos at the center and a cheeky mascot quietly guiding the experience.**

The design should feel:
- handmade
- warm
- playful
- slightly imperfect
- personal
- tactile
- romantic without being saccharine
- humorous without becoming gimmicky
- polished enough to feel intentional

The technology should disappear behind the experience.

This should **not** look like:
- a generic pink birthday website
- a Valentine's Day template
- a children's birthday page
- a SaaS landing page
- a portfolio site
- a wedding invitation
- an overproduced 3D animation demo

---

## 2. Core Visual Motifs

The design language combines three visual systems.

### A. Hand-drawn editorial cartoon
Use:
- loose but controlled outlines
- slightly uneven line weight
- rounded forms
- exaggerated expressions
- simplified anatomy
- tiny motion marks
- doodled arrows, stars, sparkles, hearts, and scribbles
- soft pencil / marker / watercolor texture

The illustrations should feel charming and expressive rather than technically perfect.

### B. Japanese stationery
Use:
- washi tape
- torn paper
- small stamp-like graphics
- sticky notes
- date labels
- subtle grid paper
- gingham tape
- photo corners
- postage motifs
- tiny flowers
- soft sticker borders

The stationery elements should organize the page, not clutter it.

### C. Modern digital scrapbook
Use:
- layered photos
- overlapping paper
- rotated polaroids
- taped corners
- handwritten-feeling annotations
- chapter labels
- collage layouts
- quiet full-screen photo moments
- uneven but balanced composition

Avoid repetitive card grids.

---

## 3. Mascot: KT

The recurring guide character is a stylized cartoon version of KT.

### Personality

The mascot should feel:
- affectionate
- cheeky
- self-aware
- goofy
- charming
- slightly mischievous
- never crude

The recurring joke is that KT has a **comically big booty**.

Treat this as an inside joke and silhouette gag, not a sexualized visual.

The mascot should read as:
> "your boyfriend made this entire ridiculous website and is also somehow lurking inside it."

### Appearance

Use the approved visual anchor as the foundation.

Key traits:
- Burmese / Southeast Asian appearance
- warm medium-brown skin
- straight, relatively flat black hair
- soft curtain/fringe shape
- slightly thinner, softer eyebrows
- friendly dark eyes
- rounded chibi proportions
- subtle stubble / faint facial hair detail
- simple nose and mouth
- expressive cheeks
- small, simplified hands and feet
- exaggerated rounded backside when relevant

Do **not** make the hair fluffy, curly, voluminous, or anime-spiky.

Do **not** make the mascot progressively more handsome, muscular, polished, or model-like.

The current approved style is intentionally a cute, simplified interpretation rather than a realistic portrait.

### Clothing language

Default outfit:
- oversized charcoal / black sweatshirt
- brown or olive cargo pants
- simple white sneakers
- optional backpack

Alternate outfits can appear when narratively useful, but preserve the same character identity.

### Approved mascot poses

Prefer a reusable library of poses:
- waving hello
- peace sign + wink
- tongue-out goofy face
- pouty / annoyed face
- big smile with backpack
- pointing / guiding
- holding a heart
- holding a note
- carrying a suitcase
- peeking from behind a photo
- secret-keeper pose
- cheeky rear-view walk with exaggerated booty silhouette

Keep poses readable at small mobile sizes.

---

## 4. Mascot Usage Rules

The mascot is a **guide**, not the protagonist.

Grace and the relationship photos are the emotional center.

Use the mascot:
- at chapter transitions
- to point toward important content
- to react to photos
- to introduce playful moments
- to guide the mystery trip section
- to create continuity between sections

Do not place the mascot:
- next to every photo
- in every viewport
- inside serious or intimate moments where it would undermine tone
- over the birthday letter except perhaps as one very small quiet accent
- in ways that compete with real photos

A good default is **one mascot appearance every 1–3 major story beats**, with occasional tiny sticker cameos.

---

## 5. Visual Density

The approved mascot concept sheet is a **style reference**, not a density target.

Production pages should generally be much simpler.

Rule of thumb:
- one dominant visual
- one secondary visual
- 2–5 small decorative elements
- generous breathing room

Avoid filling every empty area with:
- hearts
- flowers
- tape
- stars
- mascot stickers

Whitespace is part of the design.

---

## 6. Color System

Use warm, soft colors rather than bright saturated primaries.

Suggested tokens:

```css
:root {
  --paper: #F8F1E4;
  --paper-warm: #F2E4D2;
  --ink: #332B27;
  --ink-soft: #645A54;

  --cocoa: #8C5A3C;
  --brown-deep: #5A3929;

  --coral: #F27C6B;
  --peach: #F2B49D;
  --butter: #F6C85F;
  --powder-blue: #A9CBEA;
  --sage: #A9B79D;
  --lavender: #BDA9D4;
  --blush: #EFA6A6;

  --paper-shadow: rgba(73, 52, 40, 0.14);
}
```

These are starting points, not immutable values.

### Color behavior by chapter

**Birthday opening**
- cream
- coral
- butter yellow
- blush

**Relationship memories**
- cream
- powder blue
- peach
- sage

**Quiet / emotional sections**
- warm paper
- cocoa
- muted blush
- minimal accents

**Mystery trip**
- cream
- sage
- powder blue
- cocoa
- restrained yellow

**Reveal**
- introduce more outdoor tones while preserving the same scrapbook world

Do not use color shifts so dramatic that sections feel like separate websites.

---

## 7. Typography

Use real HTML text for all meaningful copy.

Never generate important text as part of images.

Recommended hierarchy:

### Display
Rounded, friendly, expressive.

Characteristics:
- soft corners
- slightly playful
- strong enough for large chapter titles

### Body
Simple, highly readable sans-serif.

### Accent
Optional handwritten font for:
- tiny notes
- arrows
- captions
- annotations

Do not use handwritten fonts for long paragraphs.

### Typography behavior

Use:
- large chapter titles
- short lines
- generous spacing
- varied scale
- occasional handwritten annotation

Avoid:
- centered text everywhere
- overly decorative script
- tightly packed paragraphs
- novelty fonts for body copy

---

## 8. Photo Treatment

Real photos should remain the star.

Do not apply heavy filters.

Use treatments such as:
- white instant-photo borders
- soft paper shadows
- tiny rotations
- washi tape
- torn-paper mats
- handwritten captions
- simple date stamps
- occasional overlapping stacks

### Rotation

Keep most photo rotation subtle:

```text
-4deg to +4deg
```

Rare hero moments may go slightly beyond that.

### Shadows

Shadows should feel like paper on paper:

```css
box-shadow:
  0 8px 20px rgba(72, 48, 34, 0.10),
  0 2px 6px rgba(72, 48, 34, 0.08);
```

Avoid glossy UI-card shadows.

### Cropping

Prefer preserving natural photo composition.

Do not aggressively crop faces to force uniform rectangles.

Mixed aspect ratios are desirable.

---

## 9. Paper + Texture

Texture should be subtle.

Preferred:
- warm paper grain
- faint colored-pencil texture
- lightly rough torn edges
- soft tape translucency
- imperfect linework

Avoid:
- heavy vintage noise
- dirty paper
- grunge
- dramatic film damage
- extreme sepia

The site should feel lovingly handmade, not old.

---

## 10. Decorative Asset Language

Approved recurring motifs:
- washi tape
- gingham tape
- hearts
- tiny stars
- sparkles
- hand-drawn arrows
- flowers
- bows
- postage stamps
- envelopes
- gift tags
- tiny clouds
- photo corners
- luggage tags
- map scraps
- compass motifs
- suitcase motifs
- little footsteps
- scribbles

Illustrations should use the same:
- line weight
- paper texture
- softness
- palette
- sticker-edge treatment

Do not mix:
- glossy 3D icons
- photorealistic clip art
- corporate flat-vector icons
- emoji
- unrelated illustration packs

---

## 11. Sticker Treatment

When using generated character or decorative assets as stickers:

- use transparent PNG or WebP when possible
- add a thin warm-white border
- avoid pure bright white
- use a very soft shadow
- allow tiny rotations
- keep edges slightly imperfect

Suggested treatment:

```css
.sticker {
  filter:
    drop-shadow(0 4px 8px rgba(63, 42, 31, 0.10));
  transform: rotate(var(--sticker-rotation, 0deg));
}
```

Do not add heavy glowing outlines.

---

## 12. Animation Language

Animation should feel physical and playful.

Preferred motion:
- sticker pop-in
- photo drop
- tiny rotation settle
- page slide
- paper peel
- note card flip
- doodle draw-on
- mascot peek
- suitcase bounce
- subtle booty-waddle gag
- small confetti burst

### Timing

Typical UI motion:

```text
300–650ms
```

Narrative reveals:

```text
600–1000ms
```

Use longer timing only for genuinely important moments.

### Motion principles

Good:
- small overshoot
- spring-like settle
- slightly staggered elements
- transform + opacity
- asymmetry

Bad:
- constant floating
- aggressive parallax
- scroll hijacking
- huge particle systems
- autoplay sequences that delay reading
- every element bouncing

Animations should generally play once.

Always support `prefers-reduced-motion`.

---

## 13. Scrapbook Layout Rules

Layouts should feel irregular but composed.

Use:
- intentional asymmetry
- staggered vertical rhythm
- overlap
- occasional edge bleed
- alternating text/photo dominance
- occasional full-width breathing room

Avoid:
- three-column card grids repeated section after section
- perfect symmetry everywhere
- identical spacing between every element
- dashboard-like visual rhythm

A scrapbook should feel arranged by a person.

---

## 14. Chapter Transition Language

Transitions should feel like moving between pages of the same book.

Possible mechanisms:
- torn-paper divider
- taped chapter label
- date stamp
- page curl
- photo sliding out while note slides in
- mascot pointing toward next section
- tiny handwritten arrow
- strip of washi tape
- paper color shift

Do not use large generic gradient blobs as the primary transition device.

---

## 15. Opening Scene

The opening should feel ceremonial but short.

Preferred sequence:
1. cream-paper background
2. small card / envelope / gift
3. "for Grace" in HTML text
4. user taps or clicks
5. opening object animates
6. a restrained burst of doodled confetti
7. first hero photo enters
8. mascot appears as a small guide

The mascot should not dominate the opening over Grace.

---

## 16. Emotional Sections

When the site becomes sincere, simplify.

For:
- birthday letter
- deeply meaningful photo
- relationship reflection
- closing scene

Reduce:
- stickers
- mascot presence
- doodles
- animation
- competing colors

Use:
- more cream
- more whitespace
- larger photos
- slower pacing
- quieter typography

The playful design works better when it knows when to get out of the way.

---

## 17. Mystery Trip Visual Language

Before the reveal, use generic adventure motifs:
- suitcase
- luggage tag
- map fold
- compass
- road line
- date card
- tiny clouds
- little backpack
- question mark / secret-keeper expression

Do **not** visually reveal:
- the real destination
- [SECRET STATE]-specific imagery (see CLAUDE.local.md)
- recognizable park landmarks
- destination coordinates
- state shapes
- destination-specific flora/fauna if too obvious

The mascot can become more mischievous here.

Suggested mascot behaviors:
- holding a sealed clue envelope
- zipper-mouth expression
- peeking around a map
- dragging a suitcase
- shrugging after Grace submits a guess

---

## 18. Responsive Design

Design mobile first.

On phone:
- preserve visual hierarchy
- allow scrapbook elements to stack
- reduce overlap where necessary
- never let decorative assets block copy
- keep tap targets large
- avoid tiny handwritten annotations that become unreadable

Desktop may introduce:
- more overlap
- wider compositions
- more decorative margins
- slightly more asymmetry

Do not make desktop the "real" design and mobile a compressed afterthought.

---

## 19. Asset Generation Rules

When requesting new visual assets, preserve these traits:

```text
Style:
hand-drawn editorial cartoon + Japanese stationery + modern digital scrapbook

Line:
soft dark-brown/charcoal outlines, slightly imperfect

Fill:
subtle watercolor / marker / colored-pencil texture

Palette:
warm cream, cocoa, coral, butter yellow, powder blue, sage, soft lavender

Edges:
sticker-like cutout or soft torn-paper treatment

Mood:
warm, cute, playful, affectionate, slightly cheeky

Detail level:
simple to medium; never highly ornate
```

For KT mascot generations, always include:

```text
warm medium-brown Burmese/Southeast Asian skin tone
straight flat black hair with soft fringe/curtain shape
slightly thin/soft eyebrows
friendly dark eyes
subtle faint stubble
rounded chibi proportions
cheeky but non-explicit exaggerated big-booty silhouette
```

---

## 20. Asset File Structure

Recommended:

```text
public/
  assets/
    mascot/
      kt-wave.webp
      kt-point.webp
      kt-heart.webp
      kt-secret.webp
      kt-suitcase.webp
      kt-booty-walk.webp

    scrapbook/
      tape-blue.webp
      tape-sage.webp
      paper-torn-01.webp
      flower-small.webp
      sparkle-01.webp
      heart-01.webp

    birthday/
      cake.webp
      gift.webp
      envelope.webp
      confetti.webp

    trip/
      suitcase.webp
      luggage-tag.webp
      clue-envelope.webp
      map-scrap.webp

    reference/
      mascot-style-anchor.png
```

The `reference/` folder is for development guidance only.

Do not render the entire style sheet inside the production site unless intentionally used.

---

## 21. Asset Naming

Use semantic generic filenames.

Good:

```text
kt-wave.webp
kt-secret.webp
trip-suitcase.webp
scrapbook-tape-sage.webp
```

Bad:

```text
secret-park-map.png
secret-state-trip.png
final-secret-destination.png
```

Nothing in pre-reveal asset names should expose the trip destination.

---

## 22. Implementation Preference

Claude should build motion and composition around supplied assets.

Do **not** redraw the visual system with generic SVGs unless:
- the element is extremely simple
- it needs to scale dynamically
- it matches the approved style

Prefer:
> generated static illustration + browser-native animation

Examples:
- mascot PNG + CSS transform
- suitcase PNG + bounce motion
- envelope layers + open animation
- static doodle + SVG stroke animation
- polaroid frame + real photo inside

Avoid generating animation as video unless explicitly requested.

---

## 23. CSS Design Tokens

Claude may start with:

```css
:root {
  --bg-paper: #F8F1E4;
  --bg-paper-warm: #F2E4D2;

  --text-main: #332B27;
  --text-muted: #645A54;

  --accent-cocoa: #8C5A3C;
  --accent-coral: #F27C6B;
  --accent-peach: #F2B49D;
  --accent-butter: #F6C85F;
  --accent-blue: #A9CBEA;
  --accent-sage: #A9B79D;
  --accent-lavender: #BDA9D4;
  --accent-blush: #EFA6A6;

  --radius-paper: 18px;
  --radius-sticker: 24px;

  --shadow-paper:
    0 8px 20px rgba(72, 48, 34, 0.10),
    0 2px 6px rgba(72, 48, 34, 0.08);

  --motion-fast: 300ms;
  --motion-base: 500ms;
  --motion-story: 850ms;
}
```

Treat these as a coherent starting point rather than rigid branding requirements.

---

## 24. Do / Don't

### Do
- let real photos dominate
- use asymmetry
- preserve whitespace
- use mascot sparingly
- use tactile motion
- keep illustrations stylistically consistent
- make mobile excellent
- make emotional sections quieter
- use warm, muted colors
- reuse a coherent sticker vocabulary
- preserve KT's approved mascot identity

### Don't
- overdecorate
- use generic emoji
- use random clip-art packs
- turn the whole site pink
- make every section a card grid
- make the mascot overly realistic
- make the mascot muscular or fashion-model-like
- make the booty joke explicit or sexualized
- create fluffy/spiky hair for KT
- use dense decoration simply because space is available
- use glossy SaaS UI patterns
- animate everything continuously

---

## 25. Visual QA Checklist

Before considering a section done, ask:

- Does this look like the same visual world as the approved mascot sheet?
- Is the page simpler than the concept sheet?
- Is Grace's photo/content still the focal point?
- Does the mascot help rather than distract?
- Is the color palette restrained?
- Are the stationery motifs consistent?
- Does the page feel handmade rather than templated?
- Does the mobile composition still feel intentional?
- Is there enough empty space?
- Are animations tactile and brief?
- Does anything look like generic stock UI?
- Did we accidentally reveal trip information?

---

## 26. Reference Priority

When there is a visual conflict, use this order:

1. **The approved KT mascot anchor image**
2. **This design-language document**
3. **The broader `CLAUDE.md` product brief**
4. General implementation convenience

Do not sacrifice the visual language simply because a generic component library makes something easier.

---

## 27. Final Design Test

The site should feel like:

> **KT assembled a tiny paper-and-sticker world around the memories he shares with Grace, then hid one more adventure inside it.**

If the experience starts feeling like a polished template, simplify and reintroduce:
- irregularity
- personal photos
- handwriting-like annotations
- handmade paper composition
- mascot personality

If the experience starts feeling childish, reduce:
- decorative density
- oversized hearts
- excessive bounce
- cartoon frequency

The target is **playful adulthood**, not children's stationery.

---

## 28. Claude-Specific Instruction

When implementing visuals:

- do not invent a new art style
- do not replace supplied assets with generic alternatives
- do not increase decorative density without reason
- do not overuse the mascot
- do not treat the approved style sheet as a literal page layout
- do preserve the approved character identity and palette
- do prioritize real photos and relationship content
- do use CSS / browser animation to bring static assets to life
- do document any deliberate deviation from this visual language

If an asset is missing, use a neutral placeholder and mark it clearly rather than fabricating a mismatched production illustration.
