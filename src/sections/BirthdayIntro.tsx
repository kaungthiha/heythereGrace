import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { PaperLabel } from '../components/PaperLabel';
import { Sticker, type StickerName } from '../components/Sticker';
import { siteConfig } from '../content/site';
import { confettiFrom } from '../utils/confetti';
import { prefersReducedMotion } from '../utils/motion';
import './BirthdayIntro.css';

type Props = {
  /** Called once the present has opened; the intro then folds away. */
  onOpened: () => void;
};

/** Stickers that burst out of the gift: [name, x offset, y offset, rotation]. */
const BURST: [StickerName, string, string, number][] = [
  ['birthday/confetti', '-120%', '-70%', -14],
  ['birthday/sparkles', '115%', '-85%', 10],
  ['birthday/hearts', '-105%', '55%', -8],
  ['birthday/bow', '120%', '45%', 12],
];

/**
 * The opening "present". Short on purpose: shake → pop → confetti → fold away (~1.4s).
 * It's an ordinary first section, so scrolling past it works too.
 */
export function BirthdayIntro({ onOpened }: Props) {
  const { intro } = siteConfig;
  const [state, setState] = useState<'closed' | 'opening'>('closed');
  const giftRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const open = () => {
    if (state !== 'closed') return;
    if (prefersReducedMotion()) return onOpened();
    setState('opening');
    timers.current.push(
      window.setTimeout(() => confettiFrom(giftRef.current, { count: 28, spread: 1.1 }), 480),
      window.setTimeout(onOpened, 1400),
    );
  };

  return (
    <section className="intro" data-palette="cream" data-state={state} aria-label={`A present ${intro.tagLine1}`}>
      <Sticker name="birthday/sparkles" width="clamp(56px, 12vw, 96px)" rotate={-8} eager className="intro__deco" style={{ top: '11%', left: '9%' }} />
      <Sticker name="birthday/flowers" width="clamp(56px, 11vw, 92px)" rotate={10} eager className="intro__deco" style={{ top: '14%', right: '8%' }} />
      <Sticker name="birthday/candles" width="clamp(60px, 13vw, 100px)" rotate={6} eager className="intro__deco" style={{ bottom: '9%', right: '10%' }} />

      <div className="intro__stage">
        <div className="intro__gift" ref={giftRef}>
          {BURST.map(([name, x, y, r]) => (
            <Sticker key={name} name={name} width="44%" rotate={r} eager className="intro__burst" style={{ '--x': x, '--y': y } as CSSProperties} />
          ))}
          <Sticker name="birthday/gift" width="100%" eager className="intro__box" />
        </div>

        <PaperLabel tone="kraft" rotate={-4} className="intro__tag">
          <span className="hand intro__tag-name">{intro.tagLine1}</span>
          <span className="intro__tag-date">{intro.tagLine2}</span>
        </PaperLabel>

        <button type="button" className="btn intro__btn" onClick={open} disabled={state !== 'closed'}>
          {intro.button}
        </button>
        <p className="intro__hint" aria-hidden="true">
          or just scroll ↓
        </p>
      </div>
    </section>
  );
}
