import type { CSSProperties } from 'react';
import { Doodle } from '../components/Doodle';
import { PhotoFrame } from '../components/PhotoFrame';
import { Sticker, type StickerName } from '../components/Sticker';
import { T } from '../components/Text';
import { TornEdge } from '../components/TornEdge';
import { loveNotes } from '../content/loveNotes';
import { getPhoto } from '../content/photos';
import { siteConfig } from '../content/site';
import { useInView } from '../hooks/useInView';
import { wobble } from '../utils/random';
import './personal.css';

const NOTE_COLORS = ['#fbe6ad', '#dde9f4', '#e4e9d8', '#ece3f1', '#f9e0d3', 'var(--paper-card)'];
const TAPES: StickerName[] = ['scrapbook/tape-pink', 'scrapbook/tape-blue', 'scrapbook/tape-hearts', 'scrapbook/tape-sage'];

/** Sticky notes pinned around one portrait. Tap a note to give it a wiggle. */
export function LoveNotes() {
  const ref = useInView<HTMLElement>();
  const { title, subtitle, photo } = siteConfig.loveNotes;
  if (loveNotes.length === 0) return null;

  const half = Math.ceil(loveNotes.length / 2);
  const columns = [loveNotes.slice(0, half), loveNotes.slice(half)];

  return (
    <section id="love" ref={ref} className="section love" data-palette="peach" aria-labelledby="love-title">
      <TornEdge variant={2} />
      <div className="wrap">
        <header className="love__header">
          <h2 id="love-title" className="display love__title rv">
            {title}
          </h2>
          <p className="hand love__subtitle rv" style={{ '--i': 1 } as CSSProperties}>
            {subtitle}
          </p>
        </header>

        <div className="love__board">
          <div className="love__portrait rv rv--pop" style={{ '--i': 1 } as CSSProperties}>
            <PhotoFrame photo={getPhoto(photo)} variant="polaroid" rotate={-2} caption={false} sizes="(max-width: 900px) 70vw, 340px" />
            <div className="love__kt deco" style={{ '--i': 4 } as CSSProperties}>
              <Sticker name="mascot/kt-heart" width="100%" rotate={-5} />
            </div>
          </div>
          {columns.map((notes, col) => (
            <ul key={col} className={`love__notes love__notes--${col === 0 ? 'left' : 'right'}`} role="list">
              {notes.map((note, i) => {
                const n = col * half + i;
                return (
                  <li
                    key={note.id}
                    className="love__note rv rv--drop"
                    style={
                      {
                        '--i': i + 2,
                        '--r': `${wobble(note.id, 5)}deg`,
                        '--note': NOTE_COLORS[n % NOTE_COLORS.length],
                      } as CSSProperties
                    }
                    onPointerDown={(e) => {
                      const el = e.currentTarget;
                      el.classList.remove('is-wiggling');
                      void el.offsetWidth;
                      el.classList.add('is-wiggling');
                    }}
                  >
                    <Sticker name={TAPES[n % TAPES.length]} width={62} rotate={wobble(note.id + 't', 8)} className="love__note-tape" />
                    {note.icon && <Doodle name={note.icon} size={24} weight={2} className="love__note-icon" />}
                    <T>{note.text}</T>
                  </li>
                );
              })}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
