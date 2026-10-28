import tripReveal from '@trip-reveal';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { PaperLabel } from '../../components/PaperLabel';
import { Sticker } from '../../components/Sticker';
import { T } from '../../components/Text';
import { TornEdge } from '../../components/TornEdge';
import { tripTeaser } from '../../content/tripTeaser';
import type { RevealImage } from '../../content/types';
import { useInView } from '../../hooks/useInView';
import { confettiFrom } from '../../utils/confetti';
import { loadGuesses } from '../../utils/guesses';
import { prefersReducedMotion } from '../../utils/motion';
import { readJSON, STORAGE_KEYS, writeJSON } from '../../utils/storage';
import { Itinerary } from './Itinerary';
import './reveal.css';

/**
 * The payoff. Only compiled into revealed (or mock) builds — see vite.config.ts.
 * Works for a first-time visitor: the card starts closed, one tap opens it, and it remembers.
 */
export default function RevealChapter() {
  const ref = useInView<HTMLElement>();
  const [opened, setOpened] = useState(() => readJSON(STORAGE_KEYS.revealOpened, false));
  const [justOpened, setJustOpened] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [guesses] = useState(loadGuesses);

  useEffect(() => {
    if (!justOpened) return;
    const t1 = window.setTimeout(() => confettiFrom(cardRef.current, { count: 60, spread: 1.5 }), 450);
    const t2 = window.setTimeout(() => titleRef.current?.focus({ preventScroll: true }), 900);
    return () => [t1, t2].forEach(clearTimeout);
  }, [justOpened]);

  if (!tripReveal) return null;
  const { destination } = tripReveal;

  const open = () => {
    writeJSON(STORAGE_KEYS.revealOpened, true);
    setOpened(true);
    setJustOpened(!prefersReducedMotion());
  };

  return (
    <section id="plan" ref={ref} className="section reveal" data-palette="trail" data-opened={opened} aria-labelledby="reveal-title">
      <TornEdge variant={2} flip />
      <div className="wrap">
        <header className="reveal__header">
          <PaperLabel tone="kraft" rotate={-3} className="eyebrow reveal__eyebrow rv">
            {tripTeaser.mystery.eyebrow}
          </PaperLabel>
          {!opened && (
            <p className="display reveal__teaser rv" style={{ '--i': 1 } as CSSProperties}>
              It’s time.
            </p>
          )}
        </header>

        <div className={`reveal__card ${justOpened ? 'is-opening' : ''}`} ref={cardRef}>
          <div className="reveal__inside">
            <Sticker name="scrapbook/sparkle-cluster" width={56} rotate={-8} className="reveal__spark reveal__spark--1" />
            <Sticker name="birthday/sparkles" width={60} rotate={10} className="reveal__spark reveal__spark--2" />
            <p className="reveal__were-going hand">we’re going to…</p>
            <h2 id="reveal-title" className="display reveal__destination" ref={titleRef} tabIndex={-1}>
              {opened ? destination.name : <span className="visually-hidden">A surprise destination</span>}
            </h2>
            {opened && destination.tagline && (
              <p className="reveal__tagline">
                <T>{destination.tagline}</T>
              </p>
            )}
            {opened && destination.region && <p className="reveal__region">{destination.region}</p>}
          </div>
          {!opened && (
            <div className="reveal__cover">
              <Sticker name="trip/map" width="clamp(120px, 34vw, 190px)" rotate={-6} eager />
              <button type="button" className="btn btn--light reveal__open" onClick={open}>
                Open it.
              </button>
            </div>
          )}
        </div>

        {opened && (
          <div className="reveal__after">
            {destination.image ? (
              <figure className="reveal__photo rv rv--pop">
                <img src={destination.image.src} alt={destination.image.alt} width={destination.image.width} height={destination.image.height} loading="lazy" decoding="async" />
                {destination.image.credit && (
                  <figcaption className="reveal__credit">
                    <T>{destination.image.credit}</T>
                  </figcaption>
                )}
              </figure>
            ) : (
              <div className="reveal__illustration rv rv--pop" aria-hidden="true">
                <Sticker name="trip/backpack" width="clamp(90px, 22vw, 140px)" rotate={-6} />
                <Sticker name="trip/kt-suitcase" width="clamp(120px, 30vw, 190px)" />
                <Sticker name="trip/compass" width="clamp(76px, 18vw, 116px)" rotate={8} />
              </div>
            )}

            {tripReveal.postscript && (
              <p className="reveal__postscript scribble-note rv" style={{ '--i': 2, '--r': '-3deg' } as CSSProperties}>
                <T>{tripReveal.postscript}</T>
              </p>
            )}

            {tripReveal.photos?.map((photo: RevealImage & { caption?: string }, i: number) => (
              <figure key={photo.src} className="reveal__photo reveal__photo--extra rv rv--pop" style={{ '--r': `${i % 2 ? 1.2 : -1.4}deg` } as CSSProperties}>
                {photo.caption && (
                  <figcaption className="reveal__extra-caption hand">
                    <T>{photo.caption}</T>
                  </figcaption>
                )}
                <a href={photo.src} target="_blank" rel="noopener" aria-label={`${photo.alt} (opens full size)`}>
                  <img src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} loading="lazy" decoding="async" />
                </a>
                {photo.credit && (
                  <small className="reveal__credit">
                    <T>{photo.credit}</T>
                  </small>
                )}
              </figure>
            ))}

            {guesses.length > 0 && (
              <div className="reveal__guesses rv">
                <p className="reveal__guesses-title hand">Your guesses, for the record:</p>
                <ul role="list">
                  {guesses.map((g, i) => (
                    <li key={`${i}-${g.at}`}>{g.text}</li>
                  ))}
                </ul>
              </div>
            )}

            <Itinerary trip={tripReveal} />
          </div>
        )}
      </div>
    </section>
  );
}
