import { useState, type CSSProperties } from 'react';
import type { Photo } from '../content/types';
import { formatDate } from '../utils/dates';
import { aspectFor, resolveImage } from '../utils/images';
import { pick, wobble } from '../utils/random';
import { Doodle } from './Doodle';
import { Sticker, type StickerName } from './Sticker';
import { T } from './Text';
import './PhotoFrame.css';

export type PhotoVariant = 'polaroid' | 'taped' | 'plain' | 'bare';

type Props = {
  photo: Photo;
  variant?: PhotoVariant;
  /** Force an aspect ratio (crops using photo.focalPoint). Default: the photo's own shape. */
  aspect?: string;
  /** `sizes` attribute — how wide this photo renders, so the browser picks the right file. */
  sizes?: string;
  /** Load immediately with high priority. Only for the one hero image above the fold. */
  priority?: boolean;
  rotate?: number;
  tape?: boolean | 'corners';
  /** Show caption/date/location/footnote under the photo. */
  caption?: boolean;
  className?: string;
  style?: CSSProperties;
};

export function PhotoFrame({
  photo,
  variant = 'taped',
  aspect,
  sizes = '(max-width: 700px) 92vw, 560px',
  priority = false,
  rotate = 0,
  tape = false,
  caption = true,
  className = '',
  style,
}: Props) {
  const resolved = resolveImage(photo);
  const [status, setStatus] = useState<'loading' | 'loaded' | 'failed'>('loading');
  const showImage = resolved.kind !== 'placeholder' && status !== 'failed';
  const hasCaption = caption && (photo.caption || photo.date || photo.location || photo.footnote);

  const mediaStyle: CSSProperties = {
    aspectRatio: aspect ?? aspectFor(photo, resolved),
    background: resolved.kind === 'optimized' ? resolved.color : undefined,
  };
  const imgStyle: CSSProperties = { objectPosition: photo.focalPoint ?? '50% 50%' };
  const imgProps = {
    alt: photo.alt,
    loading: priority ? ('eager' as const) : ('lazy' as const),
    decoding: 'async' as const,
    fetchPriority: priority ? ('high' as const) : undefined,
    style: imgStyle,
    className: `photo__img ${status === 'loaded' ? 'is-loaded' : ''}`,
    onLoad: () => setStatus('loaded'),
    onError: () => setStatus('failed'),
    ref: (img: HTMLImageElement | null) => {
      if (img?.complete && img.naturalWidth > 0 && status === 'loading') setStatus('loaded');
    },
  };

  return (
    <figure className={`photo photo--${variant} ${className}`} style={{ '--r': `${rotate}deg`, ...style } as CSSProperties}>
      {tape === true && (
        <Sticker name={pick(photo.id, TAPES)} width="clamp(64px, 30%, 116px)" rotate={-rotate + wobble(photo.id, 6)} className="photo__tape" />
      )}
      <div className="photo__mount">
        {tape === 'corners' &&
          (['tl', 'tr', 'br', 'bl'] as const).map((pos, i) => (
            <Sticker key={pos} name={pick(photo.id, CORNERS)} width="clamp(30px, 7%, 52px)" rotate={i * 90} className={`photo__corner photo__corner--${pos}`} />
          ))}
        <div className="photo__media" style={mediaStyle}>
          {showImage && resolved.kind === 'optimized' && (
            <picture>
              {resolved.sources.map((s) => (
                <source key={s.type} type={s.type} srcSet={s.srcSet} sizes={sizes} />
              ))}
              <img src={resolved.fallback} width={resolved.width} height={resolved.height} {...imgProps} />
            </picture>
          )}
          {showImage && resolved.kind === 'raw' && <img src={resolved.src} {...imgProps} />}
          {!showImage && <PhotoPlaceholder photo={photo} failed={status === 'failed'} />}

          {photo.pointer && (
            <span className="photo__pointer" style={{ left: `${photo.pointer.x}%`, top: `${photo.pointer.y}%` }}>
              <Doodle name="arrow" size={46} className="photo__pointer-arrow" />
              <span className="photo__pointer-label hand">
                <T>{photo.pointer.label}</T>
              </span>
            </span>
          )}
        </div>
      </div>

      {hasCaption && (
        <figcaption className="photo__caption">
          {photo.caption && (
            <span className="photo__caption-text hand">
              <T>{photo.caption}</T>
            </span>
          )}
          {(photo.date || photo.location) && (
            <span className="photo__meta">
              {photo.date && <T>{formatDate(photo.date, { month: 'short', day: 'numeric', year: 'numeric' })}</T>}
              {photo.date && photo.location && ' · '}
              {photo.location && <T>{photo.location}</T>}
            </span>
          )}
          {photo.footnote && (
            <small className="photo__footnote">
              * <T>{photo.footnote}</T>
            </small>
          )}
        </figcaption>
      )}
    </figure>
  );
}

const TAPES: StickerName[] = ['scrapbook/tape-pink', 'scrapbook/tape-blue', 'scrapbook/tape-hearts', 'scrapbook/tape-sage'];
const CORNERS: StickerName[] = ['scrapbook/corner-brown', 'scrapbook/corner-pink', 'scrapbook/corner-sage', 'scrapbook/corner-blue'];

function PhotoPlaceholder({ photo, failed }: { photo: Photo; failed: boolean }) {
  return (
    <div className="photo__placeholder" role={failed ? 'img' : undefined} aria-label={failed ? photo.alt : undefined}>
      <Doodle name="camera" size={34} />
      <span className="photo__placeholder-label">{failed ? 'photo didn’t load' : (photo.placeholder ?? 'PHOTO')}</span>
      <span className="photo__placeholder-hint hand">{failed ? photo.alt : 'add photo here'}</span>
    </div>
  );
}
