import type { CSSProperties } from 'react';
import { PhotoFrame } from '../../components/PhotoFrame';
import { Sticker } from '../../components/Sticker';
import { T } from '../../components/Text';
import type { Photo } from '../../content/types';
import { formatDate } from '../../utils/dates';
import { aspectFor, resolveImage } from '../../utils/images';
import { wobble } from '../../utils/random';
import type { LayoutProps } from './Story';

const vars = (v: Record<string, string | number>) => v as CSSProperties;

function Aside({ photo, index }: { photo: Photo; index: number }) {
  if (!photo.aside) return null;
  return (
    <p className="scribble-note layout-aside" style={vars({ '--r': `${index % 2 ? 4 : -5}deg` })}>
      <T>{photo.aside}</T>
    </p>
  );
}

/* ---------------- fullscreen: one important photo nearly fills the screen ---------------- */

export function Fullscreen({ photos }: LayoutProps) {
  const photo = photos[0];
  if (!photo) return null;
  const aspect = aspectFor(photo, resolveImage(photo));
  return (
    <div className="layout-fullscreen rv rv--pop">
      <PhotoFrame
        photo={photo}
        variant="taped"
        tape="corners"
        rotate={-1.2}
        sizes="(max-width: 1100px) 94vw, 1060px"
        style={{ width: `min(100%, calc(78svh * (${aspect})))` }}
      />
      <Aside photo={photo} index={0} />
    </div>
  );
}

/* ---------------- scrapbook: 2–3 taped photos in an uneven spread ---------------- */

export function Scrapbook({ photos }: LayoutProps) {
  return (
    <div className="layout-scrapbook">
      {photos.slice(0, 3).map((photo, i) => (
        <div key={photo.id} className={`layout-scrapbook__item layout-scrapbook__item--${i + 1} rv rv--drop`} style={vars({ '--i': i + 1 })}>
          <PhotoFrame photo={photo} variant={i === 1 ? 'polaroid' : 'taped'} tape={i !== 1} rotate={[-3, 2.5, -1.5][i]} sizes="(max-width: 760px) 86vw, 460px" />
          <Aside photo={photo} index={i} />
        </div>
      ))}
      <Sticker name="birthday/flowers" width={72} rotate={8} className="layout-scrapbook__doodle deco" />
    </div>
  );
}

/* ---------------- photo-strip: a photo-booth strip ---------------- */

export function PhotoStrip({ chapter, photos }: LayoutProps) {
  const dateLabel = chapter.date ? formatDate(chapter.date, { month: 'short', day: 'numeric', year: 'numeric' }) : null;
  return (
    <div className="layout-strip">
      <div className="layout-strip__strip rv rv--drop">
        {photos.slice(0, 4).map((photo) => (
          <PhotoFrame key={photo.id} photo={photo} variant="bare" aspect="1 / 1" caption={false} sizes="240px" />
        ))}
        <p className="layout-strip__stamp">{dateLabel ?? '★ ★ ★'}</p>
      </div>
      {chapter.annotation && (
        <p className="scribble-note layout-strip__note rv" style={vars({ '--i': 3, '--r': '-4deg' })}>
          <Sticker name="scrapbook/arrow-loop" width={72} className="layout-strip__arrow" />
          <T>{chapter.annotation}</T>
        </p>
      )}
    </div>
  );
}

/* ---------------- collage: "tiny moments" ---------------- */

export function Collage({ photos }: LayoutProps) {
  return (
    <ul className="layout-collage" role="list">
      {photos.map((photo, i) => (
        <li key={photo.id} className="layout-collage__item rv rv--pop" style={vars({ '--i': i % 6 })}>
          <PhotoFrame
            photo={photo}
            variant={i % 3 === 1 ? 'polaroid' : 'taped'}
            tape={i % 3 === 0}
            rotate={wobble(photo.id, 3.5)}
            sizes="(max-width: 640px) 45vw, 260px"
          />
        </li>
      ))}
    </ul>
  );
}

/* ---------------- split: before / after ---------------- */

export function Split({ photos }: LayoutProps) {
  const [a, b] = photos;
  if (!a || !b) return null;
  return (
    <div className="layout-split">
      <div className="layout-split__side rv rv--left">
        <span className="layout-split__label">before</span>
        <PhotoFrame photo={a} variant="polaroid" rotate={-3} sizes="(max-width: 700px) 80vw, 420px" />
      </div>
      <Sticker name="scrapbook/arrow-red" width={84} className="layout-split__arrow" />
      <div className="layout-split__side rv rv--right" style={vars({ '--i': 2 })}>
        <span className="layout-split__label layout-split__label--after">after</span>
        <PhotoFrame photo={b} variant="polaroid" rotate={2.5} sizes="(max-width: 700px) 80vw, 420px" />
      </div>
    </div>
  );
}

/* ---------------- spotlight: one portrait + a note ---------------- */

export function Spotlight({ chapter, photos }: LayoutProps) {
  const photo = photos[0];
  if (!photo) return null;
  return (
    <div className="layout-spotlight">
      <div className="layout-spotlight__photo rv rv--pop">
        <PhotoFrame photo={photo} variant="plain" sizes="(max-width: 800px) 86vw, 520px" />
      </div>
      {chapter.body && (
        <div className="layout-spotlight__note rv rv--right" style={vars({ '--i': 2 })}>
          <Sticker name="scrapbook/tape-sage" width={96} rotate={-4} className="layout-spotlight__tape" />
          <p>
            <T>{chapter.body}</T>
          </p>
        </div>
      )}
    </div>
  );
}
