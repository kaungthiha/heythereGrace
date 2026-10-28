/**
 * Content schemas. Everything Grace sees is data in src/content/*.ts — components only render it.
 * Any string starting with "[KT:" is treated as a placeholder and rendered as a visible TODO note.
 */

export type Orientation = 'portrait' | 'landscape' | 'square';

/** Paper tint for a section. Defined in src/styles/tokens.css. */
export type Palette = 'blush' | 'cream' | 'peach' | 'blue' | 'sage' | 'lavender' | 'warm' | 'mystery' | 'trail';

export type Photo = {
  /** Stable id that chapters/sections refer to. Never shown to anyone. */
  id: string;
  /**
   * The image. Either:
   *  - an optimized image name produced by `npm run optimize-images` (e.g. "img-0412"), or
   *  - a path inside public/ (e.g. "images/raw/something.jpg") for a quick un-optimized test.
   * Leave empty to show a labelled placeholder instead.
   */
  src?: string;
  /** Describes the photo for screen readers. Required — write what's actually in it. */
  alt: string;
  /** Label shown on the placeholder until a real photo exists, e.g. "PHOTO — FIRST DATE". */
  placeholder?: string;
  date?: string;
  location?: string;
  /** Normal caption, written under the photo in handwriting. */
  caption?: string;
  /** Extra handwritten aside, scribbled at an angle beside the photo. */
  aside?: string;
  /** Tiny small-print footnote. */
  footnote?: string;
  /** Hand-drawn arrow pointing at something in the photo. x/y are percentages of the photo. */
  pointer?: { label: string; x: number; y: number };
  /** Used for the placeholder's shape until the real image (with real dimensions) exists. */
  orientation?: Orientation;
  /** CSS object-position used when a layout has to crop, e.g. "50% 30%". Default is center. */
  focalPoint?: string;
};

export type ChapterLayout =
  | 'fullscreen' // one important photo nearly fills the screen
  | 'polaroid-stack' // tap-through stack of polaroids
  | 'photo-strip' // photo-booth strip, 3–4 photos
  | 'scrapbook' // 2–3 taped photos with notes and doodles
  | 'film-roll' // horizontal scrolling film of casual photos
  | 'collage' // "tiny moments": lots of small, silly photos
  | 'split' // before / after, two photos side by side
  | 'spotlight'; // one portrait surrounded by a note

export type Mood = 'sweet' | 'funny' | 'adventure' | 'quiet';

/** KT mascot poses (public/assets/mascot/kt-<pose>.webp). */
export type MascotPose = 'wave' | 'peace' | 'tongue' | 'backpack' | 'point-right' | 'point-left' | 'heart' | 'note' | 'secret' | 'booty-walk';

export type StoryChapter = {
  id: string;
  eyebrow?: string;
  title: string;
  /** ISO date (YYYY-MM-DD) or free text like "Winter 2025". */
  date?: string;
  subtitle?: string;
  body?: string;
  layout: ChapterLayout;
  /** Photo ids from src/content/photos.ts, in display order. */
  photos: string[];
  /** Handwritten note that floats beside the chapter. */
  annotation?: string;
  mood?: Mood;
  /** Override the palette picked from the mood. */
  palette?: Palette;
  /** Optional KT cameo beside the chapter title. Use sparingly — roughly one every 2–3 chapters. */
  mascot?: MascotPose;
};

export type RelationshipStat = {
  id: string;
  value: string;
  label: string;
  note?: string;
};

export type TripClue = {
  id: string;
  text: string;
  icon?: string;
};

/* ---------- Reveal-only content (never imported by the teaser build) ---------- */

export type ItineraryItem = {
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

export type ItineraryDay = {
  /** YYYY-MM-DD */
  date: string;
  title: string;
  subtitle?: string;
  items: ItineraryItem[];
};

export type RevealImage = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  /** Photographer / source, shown small under the photo. Required in spirit for any photo you didn't take. */
  credit?: string;
};

export type TripRevealContent = {
  destination: {
    name: string;
    tagline?: string;
    region?: string;
    /** Import an image from ./assets/ (see docs/CONTENT_GUIDE.md). Omit to use an illustration. */
    image?: RevealImage;
  };
  /** A handwritten note shown under the destination photo (e.g. who owes whom money). */
  postscript?: string;
  /** More photos after the postscript (the cabin, a route map…). Each opens full size when tapped. */
  photos?: (RevealImage & { caption?: string })[];
  /** Line shown after the reveal, before the itinerary. */
  planIntro?: string;
  days: ItineraryDay[];
  departure?: { time?: string; from?: string; driveTime?: string; note?: string };
  lodging?: { name: string; address?: string; checkIn?: string; checkOut?: string; note?: string; link?: string };
  packing?: string[];
  weather?: string;
  /** Free-form cards: food plans, clothing suggestions, surprise notes… */
  notes?: { title: string; text: string; icon?: string }[];
  map?: { label: string; href: string };
};
