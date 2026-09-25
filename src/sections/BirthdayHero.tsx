import { useRef, type CSSProperties } from 'react';
import { Doodle } from '../components/Doodle';
import { PhotoFrame } from '../components/PhotoFrame';
import { Sticker } from '../components/Sticker';
import { T } from '../components/Text';
import { getPhoto } from '../content/photos';
import { siteConfig } from '../content/site';
import { useInView } from '../hooks/useInView';
import { confettiFrom } from '../utils/confetti';
import { daysSince } from '../utils/dates';
import './BirthdayHero.css';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export function BirthdayHero() {
  const { hero, person, relationship } = siteConfig;
  const ref = useInView<HTMLElement>();
  const day = daysSince(relationship.startDate, new Date()) + 1;
  const birthday = `${MONTHS[person.birthday.month - 1]} ${person.birthday.day}`;

  return (
    <section id="birthday" className="hero section" data-palette="blush" ref={ref} aria-labelledby="hero-title" tabIndex={-1}>
      <div className="wrap hero__grid">
        <div className="hero__copy">
          <p className="eyebrow rv">{birthday}</p>
          <h1 id="hero-title" className="display hero__title rv" style={{ '--i': 1 } as CSSProperties}>
            {hero.title}{' '}
            <span className="hero__name">
              {person.name}!
              <Doodle name="underline" draw className="hero__underline" weight={5} />
            </span>
          </h1>
          <p className="lede hero__subtitle rv" style={{ '--i': 3 } as CSSProperties}>
            {hero.subtitle}
          </p>
          <p className="hero__note rv" style={{ '--i': 4 } as CSSProperties}>
            <T>{hero.note}</T>
          </p>
        </div>

        <div className="hero__photo">
          <div className="hero__grid-paper" aria-hidden="true" />
          <div className="rv rv--drop" style={{ '--i': 2 } as CSSProperties}>
            <PhotoFrame photo={getPhoto(hero.photo)} variant="polaroid" rotate={3} tape priority caption={false} sizes="(max-width: 800px) 80vw, 420px" />
          </div>
          {person.ageOrdinal && (
            <span className="badge hero__age deco" style={{ '--r': '-10deg', '--i': 3 } as CSSProperties}>
              <span>
                <span className="hero__age-num">{person.ageOrdinal}</span>
                <br />
                birthday
              </span>
            </span>
          )}
          {day > 0 && (
            <p className="hero__day hand deco" style={{ '--i': 5 } as CSSProperties}>
              day {day.toLocaleString('en-US')} of us
            </p>
          )}
          <div className="hero__kt deco" style={{ '--i': 6 } as CSSProperties}>
            <Sticker name="birthday/kt-cake" width="100%" rotate={-4} eager />
          </div>
          <HeartButton />
        </div>
      </div>

      <Sticker name="birthday/sparkles" width={64} rotate={-10} className="deco hero__sparkles" style={{ '--i': 1 } as CSSProperties} />

      <a className="hero__cue" href="#us">
        <span>our story</span>
        <span aria-hidden="true">↓</span>
      </a>
    </section>
  );
}

/** Easter egg: a heart sticker that wiggles and bursts into confetti when tapped. */
function HeartButton() {
  const ref = useRef<HTMLButtonElement>(null);
  return (
    <button
      ref={ref}
      type="button"
      className="hero__heart deco"
      style={{ '--i': 4 } as CSSProperties}
      aria-label="Tap the hearts"
      onClick={() => {
        const el = ref.current;
        if (!el) return;
        el.classList.remove('is-tapped');
        void el.offsetWidth; // restart the CSS animation
        el.classList.add('is-tapped');
        confettiFrom(el, { count: 16, spread: 0.6 });
      }}
    >
      <Sticker name="birthday/hearts" width="100%" rotate={8} eager />
    </button>
  );
}
