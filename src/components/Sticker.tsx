import type { CSSProperties } from 'react';
import dims from '../content/stickers.generated.json';

/**
 * A die-cut sticker from public/assets/<group>/<name>.webp (cut from the sheets in assets/ by
 * `node scripts/extract-stickers.mjs`). Decorative by default: pass `alt` only when the sticker
 * carries meaning.
 */
export type StickerName = keyof typeof dims;

type Props = {
  name: StickerName;
  /** CSS width, e.g. 120 or "clamp(80px, 20vw, 140px)". Height follows the image. */
  width: number | string;
  rotate?: number;
  flip?: boolean;
  alt?: string;
  /** Load immediately (only for stickers visible on first paint). */
  eager?: boolean;
  className?: string;
  style?: CSSProperties;
};

export function Sticker({ name, width, rotate = 0, flip = false, alt, eager = false, className = '', style }: Props) {
  const [w, h] = (dims as Record<string, number[]>)[name] ?? [100, 100];
  return (
    <img
      src={`${import.meta.env.BASE_URL}assets/${name}.webp`}
      width={w}
      height={h}
      alt={alt ?? ''}
      aria-hidden={alt ? undefined : true}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      draggable={false}
      className={`sticker ${className}`}
      style={{ width, '--r': `${rotate}deg`, '--flip': flip ? -1 : 1, ...style } as CSSProperties}
    />
  );
}
