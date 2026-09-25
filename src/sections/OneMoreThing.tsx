import type { CSSProperties } from 'react';
import { Sticker } from '../components/Sticker';
import { TornEdge } from '../components/TornEdge';
import { siteConfig } from '../content/site';
import { tripTeaser } from '../content/tripTeaser';
import { useInView } from '../hooks/useInView';
import { formatDate } from '../utils/dates';
import './trip.css';

/**
 * The fake ending ("That's everything." — KT waddles off — "…almost.") and the turn toward
 * the trip: a scrapbook page flips away to reveal a luggage tag. Nothing here hints at the destination.
 */
export function OneMoreThing() {
  const endRef = useInView<HTMLElement>();
  const turnRef = useInView<HTMLElement>();
  const { ending, turn } = tripTeaser;
  const weekday = formatDate(siteConfig.trip.departureDate, { weekday: 'long' });

  return (
    <>
      <section id="one-more-thing" ref={endRef} className="section ending" data-palette="cream" aria-label="The end?">
        <div className="wrap ending__wrap">
          <p className="display ending__everything rv">{ending.thatsEverything}</p>
          <div className="ending__walk" aria-hidden="true">
            <Sticker name="mascot/kt-booty-walk" width="100%" className="ending__kt" />
          </div>
          <p className="hand ending__almost rv">{ending.almost}</p>
        </div>
      </section>

      <section ref={turnRef} className="section turn" data-palette="blue" aria-labelledby="turn-title">
        <TornEdge variant={1} />
        <div className="wrap turn__wrap">
          <div className="turn__stage">
            <div className="turn__tag" aria-hidden="true">
              <span className="turn__tag-hole" />
              <span className="turn__tag-label">departs</span>
              <span className="turn__tag-date hand">{turn.tag}</span>
              <span className="turn__tag-row">
                <span>{weekday}</span>
                <span>dest: ????</span>
              </span>
            </div>
            <div className="turn__page" aria-hidden="true">
              <Sticker name="birthday/hearts" width="26%" rotate={-8} />
              <Sticker name="birthday/sparkles" width="22%" rotate={6} />
              <Sticker name="birthday/flowers" width="24%" rotate={-4} />
            </div>
          </div>

          <h2 id="turn-title" className="turn__lines">
            <span className="visually-hidden">{turn.tag}. </span>
            {turn.lines.map((line, i) => (
              <span key={line} className="display turn__line rv" style={{ '--i': i * 4 + 8 } as CSSProperties}>
                {line}
              </span>
            ))}
          </h2>
        </div>

        <div className="turn__road" aria-hidden="true">
          <Sticker name="trip/footsteps" width={96} className="turn__steps" />
          <Sticker name="trip/kt-suitcase" width={120} className="turn__kt" />
        </div>
      </section>
    </>
  );
}
