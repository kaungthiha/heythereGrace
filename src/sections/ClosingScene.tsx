import type { CSSProperties } from 'react';
import { Doodle } from '../components/Doodle';
import { PhotoFrame } from '../components/PhotoFrame';
import { T } from '../components/Text';
import { TornEdge } from '../components/TornEdge';
import { getPhoto } from '../content/photos';
import { siteConfig } from '../content/site';
import { useInView } from '../hooks/useInView';
import './closing.css';

/** A calm ending: one photo, a few words. No stickers, no footer. */
export function ClosingScene({ onReplayIntro }: { onReplayIntro: () => void }) {
  const ref = useInView<HTMLElement>();
  const { closing } = siteConfig;
  return (
    <section id="the-end" ref={ref} className="section closing" data-palette="warm" aria-labelledby="closing-title">
      <TornEdge variant={0} />
      <div className="wrap closing__wrap">
        <div className="closing__photo rv rv--pop">
          <PhotoFrame photo={getPhoto(closing.photo)} variant="polaroid" rotate={-2} caption={false} sizes="(max-width: 700px) 72vw, 380px" />
        </div>
        <h2 id="closing-title" className="display closing__line rv" style={{ '--i': 2 } as CSSProperties}>
          {closing.line}
        </h2>
        <p className="closing__message rv" style={{ '--i': 3 } as CSSProperties}>
          <T>{closing.message}</T>
        </p>
        <p className="closing__signoff hand rv" style={{ '--i': 4 } as CSSProperties}>
          <T>{closing.signoff}</T>
        </p>
        <button type="button" className="closing__replay" onClick={onReplayIntro}>
          <Doodle name="gift" size={22} /> open the present again
        </button>
      </div>
    </section>
  );
}
