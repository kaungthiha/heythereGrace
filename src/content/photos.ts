import type { Photo } from './types';

/**
 * The photo manifest. Every photo on the site is listed here once, then referenced by `id`.
 *
 * To use a real photo:
 *   1. drop the original into photos-original/ (never committed, never modified)
 *   2. run `npm run optimize-images`
 *   3. set `src` below to the printed name (e.g. "img-0412") and write real `alt` text
 * Until `src` is set, the photo renders as a labelled placeholder showing `placeholder`.
 */
export const photos: Photo[] = [
  // ---- Opening ----
  { id: 'hero', alt: '[KT: describe the hero photo]', placeholder: 'PHOTO — FAVORITE GRACE PHOTO', orientation: 'portrait' },

  // ---- Chapter One ----
  {
    id: 'first-date',
    alt: '[KT: describe this photo]',
    placeholder: 'PHOTO — FIRST DATE',
    orientation: 'landscape',
    caption: '[KT: Add photo caption]',
    date: '2025-08-09',
  },

  // ---- Early days (scrapbook) ----
  { id: 'early-1', alt: '[KT: describe this photo]', placeholder: 'PHOTO — EARLY DAYS #1', orientation: 'portrait', caption: '[KT: caption]', pointer: { label: '[KT: arrow label]', x: 62, y: 38 } },
  { id: 'early-2', alt: '[KT: describe this photo]', placeholder: 'PHOTO — EARLY DAYS #2', orientation: 'landscape', caption: '[KT: caption]', footnote: '[KT: tiny footnote]' },
  { id: 'early-3', alt: '[KT: describe this photo]', placeholder: 'PHOTO — EARLY DAYS #3', orientation: 'square', aside: '[KT: handwritten aside]' },

  // ---- Photo booth strip ----
  { id: 'booth-1', alt: '[KT: describe this photo]', placeholder: 'BOOTH #1', orientation: 'square' },
  { id: 'booth-2', alt: '[KT: describe this photo]', placeholder: 'BOOTH #2', orientation: 'square' },
  { id: 'booth-3', alt: '[KT: describe this photo]', placeholder: 'BOOTH #3', orientation: 'square' },
  { id: 'booth-4', alt: '[KT: describe this photo]', placeholder: 'BOOTH #4', orientation: 'square' },

  // ---- Film roll ----
  { id: 'roll-1', alt: '[KT: describe this photo]', placeholder: 'ADVENTURE #1', orientation: 'landscape', caption: '[KT: caption]' },
  { id: 'roll-2', alt: '[KT: describe this photo]', placeholder: 'ADVENTURE #2', orientation: 'portrait', caption: '[KT: caption]' },
  { id: 'roll-3', alt: '[KT: describe this photo]', placeholder: 'ADVENTURE #3', orientation: 'landscape', caption: '[KT: caption]' },
  { id: 'roll-4', alt: '[KT: describe this photo]', placeholder: 'ADVENTURE #4', orientation: 'landscape', caption: '[KT: caption]' },
  { id: 'roll-5', alt: '[KT: describe this photo]', placeholder: 'ADVENTURE #5', orientation: 'portrait', caption: '[KT: caption]' },

  // ---- Tiny moments collage ----
  { id: 'tiny-1', alt: '[KT: describe this photo]', placeholder: 'TINY MOMENT', orientation: 'square' },
  { id: 'tiny-2', alt: '[KT: describe this photo]', placeholder: 'TINY MOMENT', orientation: 'portrait' },
  { id: 'tiny-3', alt: '[KT: describe this photo]', placeholder: 'TINY MOMENT', orientation: 'landscape' },
  { id: 'tiny-4', alt: '[KT: describe this photo]', placeholder: 'TINY MOMENT', orientation: 'square' },
  { id: 'tiny-5', alt: '[KT: describe this photo]', placeholder: 'TINY MOMENT', orientation: 'portrait' },
  { id: 'tiny-6', alt: '[KT: describe this photo]', placeholder: 'TINY MOMENT', orientation: 'landscape' },

  // ---- Before / after ----
  { id: 'before', alt: '[KT: describe this photo]', placeholder: 'PHOTO — BEFORE', orientation: 'portrait', caption: '[KT: before]' },
  { id: 'after', alt: '[KT: describe this photo]', placeholder: 'PHOTO — AFTER', orientation: 'portrait', caption: '[KT: after]' },

  // ---- Polaroid stack ----
  { id: 'stack-1', alt: '[KT: describe this photo]', placeholder: 'POLAROID #1', orientation: 'square', caption: '[KT: caption]' },
  { id: 'stack-2', alt: '[KT: describe this photo]', placeholder: 'POLAROID #2', orientation: 'square', caption: '[KT: caption]' },
  { id: 'stack-3', alt: '[KT: describe this photo]', placeholder: 'POLAROID #3', orientation: 'square', caption: '[KT: caption]' },
  { id: 'stack-4', alt: '[KT: describe this photo]', placeholder: 'POLAROID #4', orientation: 'square', caption: '[KT: caption]' },

  // ---- Spotlight ----
  { id: 'spotlight', alt: '[KT: describe this photo]', placeholder: 'PHOTO — A PORTRAIT OF GRACE', orientation: 'portrait' },

  // ---- Later sections ----
  { id: 'love-portrait', alt: '[KT: describe this photo]', placeholder: 'PHOTO — GRACE', orientation: 'portrait' },
  { id: 'letter', alt: '[KT: describe this photo]', placeholder: 'PHOTO — A QUIET ONE', orientation: 'landscape' },
  { id: 'closing', alt: '[KT: describe this photo]', placeholder: 'PHOTO — FAVORITE OF US', orientation: 'portrait' },
];

const byId = new Map(photos.map((p) => [p.id, p]));

export function getPhoto(id: string): Photo {
  const photo = byId.get(id);
  if (photo) return photo;
  if (import.meta.env.DEV) console.warn(`[photos] No photo with id "${id}" in src/content/photos.ts`);
  return { id, alt: '', placeholder: `MISSING PHOTO “${id}”` };
}
