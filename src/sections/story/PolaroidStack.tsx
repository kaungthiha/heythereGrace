import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { PhotoFrame } from '../../components/PhotoFrame';
import { prefersReducedMotion } from '../../utils/motion';
import { wobble } from '../../utils/random';
import type { LayoutProps } from './Story';

/**
 * A little pile of polaroids. Tap the top one (or "next") and it slides to the back of the pile.
 * Only the top photo is exposed to screen readers; the counter announces position.
 */
export function PolaroidStack({ chapter, photos }: LayoutProps) {
  const [order, setOrder] = useState(() => photos.map((_, i) => i));
  const [leaving, setLeaving] = useState<number | null>(null);
  const timer = useRef<number>(0);
  useEffect(() => () => clearTimeout(timer.current), []);

  if (photos.length === 0) return null;
  const top = order[0];

  const next = () => {
    if (leaving !== null || photos.length < 2) return;
    const rotate = () => setOrder((o) => [...o.slice(1), o[0]]);
    if (prefersReducedMotion()) return rotate();
    setLeaving(top);
    timer.current = window.setTimeout(() => {
      rotate();
      setLeaving(null);
    }, 380);
  };
  const prev = () => {
    if (leaving !== null) return;
    setOrder((o) => [o[o.length - 1], ...o.slice(0, -1)]);
  };

  return (
    <div className="layout-stack">
      <div className="layout-stack__pile rv rv--drop">
        {photos.map((photo, i) => {
          const depth = order.indexOf(i);
          const isTop = depth === 0;
          return (
            <div
              key={photo.id}
              className={`layout-stack__card ${i === leaving ? 'is-leaving' : ''}`}
              style={
                {
                  zIndex: photos.length - depth,
                  '--r': `${isTop ? wobble(photo.id, 2) : wobble(photo.id, 9)}deg`,
                  '--depth': depth,
                } as CSSProperties
              }
              aria-hidden={!isTop}
            >
              <PhotoFrame photo={photo} variant="polaroid" aspect="1 / 1" sizes="(max-width: 640px) 76vw, 380px" />
              {isTop && photos.length > 1 && (
                // Pointer shortcut only; keyboard + screen readers use the Next/Previous buttons below.
                <button type="button" className="layout-stack__hit" onClick={next} tabIndex={-1} aria-hidden="true" />
              )}
            </div>
          );
        })}
      </div>
      <div className="layout-stack__controls">
        <button type="button" className="btn btn--small btn--light" onClick={prev} aria-label="Previous photo">
          ←
        </button>
        <span className="layout-stack__count" aria-live="polite">
          {top + 1} / {photos.length}
        </span>
        <button type="button" className="btn btn--small btn--light" onClick={next} aria-label="Next photo">
          →
        </button>
      </div>
      <p className="visually-hidden">Photo stack for {chapter.title}.</p>
    </div>
  );
}
