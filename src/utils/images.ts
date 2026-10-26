import generated from '../content/photos.generated.json';
import type { Orientation, Photo } from '../content/types';

/** Shape written by scripts/optimize-images.mjs. */
type GeneratedImage = { w: number; h: number; widths: number[]; formats: string[]; color: string; video?: string };
const manifest = generated as Record<string, GeneratedImage>;

export type ResolvedImage =
  | {
      kind: 'optimized';
      width: number;
      height: number;
      color: string;
      fallback: string;
      sources: { type: string; srcSet: string }[];
      /** Set for videos: URL of the MP4 (the rest describes its poster image). */
      video?: string;
    }
  | { kind: 'raw'; src: string }
  | { kind: 'placeholder' };

const base = import.meta.env.BASE_URL;
const url = (name: string, width: number, format: string) => `${base}images/${name}-${width}.${format}`;

export function resolveImage(photo: Photo): ResolvedImage {
  const src = photo.src?.trim();
  if (!src) return { kind: 'placeholder' };

  const entry = manifest[src];
  if (entry) {
    const srcSet = (format: string) => entry.widths.map((w) => `${url(src, w, format)} ${w}w`).join(', ');
    const fallbackFormat = entry.formats.includes('webp') ? 'webp' : entry.formats[0];
    return {
      kind: 'optimized',
      width: entry.w,
      height: entry.h,
      color: entry.color,
      fallback: url(src, entry.widths[Math.min(1, entry.widths.length - 1)], fallbackFormat),
      sources: entry.formats.map((f) => ({ type: `image/${f}`, srcSet: srcSet(f) })),
      video: entry.video ? `${base}videos/${entry.video}` : undefined,
    };
  }

  if (/\.(jpe?g|png|webp|avif|gif)$/i.test(src)) return { kind: 'raw', src: `${base}${src.replace(/^\/+/, '')}` };

  if (import.meta.env.DEV) console.warn(`[photos] "${src}" isn't in photos.generated.json — run \`npm run optimize-images\`?`);
  return { kind: 'placeholder' };
}

export function aspectFor(photo: Photo, resolved: ResolvedImage): string {
  if (resolved.kind === 'optimized') return `${resolved.width} / ${resolved.height}`;
  return ORIENTATION_ASPECT[photo.orientation ?? 'landscape'];
}

const ORIENTATION_ASPECT: Record<Orientation, string> = { portrait: '4 / 5', landscape: '3 / 2', square: '1 / 1' };
