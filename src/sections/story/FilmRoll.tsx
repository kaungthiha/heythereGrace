import { useRef } from 'react';
import { PhotoFrame } from '../../components/PhotoFrame';
import type { LayoutProps } from './Story';

/**
 * A horizontal roll of film. Swipe/scroll sideways, or use the arrow buttons.
 * The strip itself is focusable so arrow keys scroll it too.
 */
export function FilmRoll({ chapter, photos }: LayoutProps) {
  const scroller = useRef<HTMLDivElement>(null);
  const move = (dir: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };

  return (
    <div className="layout-film rv">
      <div className="layout-film__roll" ref={scroller} tabIndex={0} role="region" aria-label={`Photos: ${chapter.title}. Scroll sideways for more.`}>
        <ul className="layout-film__frames" role="list">
          {photos.map((photo) => (
            <li key={photo.id} className="layout-film__frame">
              <PhotoFrame photo={photo} variant="bare" sizes="(max-width: 640px) 70vw, 420px" />
            </li>
          ))}
        </ul>
      </div>
      <div className="layout-film__controls">
        <button type="button" className="btn btn--small btn--light" onClick={() => move(-1)} aria-label="Previous photos">
          ←
        </button>
        <span className="layout-film__hint hand" aria-hidden="true">
          swipe →
        </span>
        <button type="button" className="btn btn--small btn--light" onClick={() => move(1)} aria-label="Next photos">
          →
        </button>
      </div>
    </div>
  );
}
