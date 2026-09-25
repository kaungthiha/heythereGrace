import { useId, useState, type CSSProperties, type FormEvent } from 'react';
import { Doodle } from '../components/Doodle';
import { PaperLabel } from '../components/PaperLabel';
import { Sticker, type StickerName } from '../components/Sticker';
import { T } from '../components/Text';
import { TornEdge } from '../components/TornEdge';
import { siteConfig } from '../content/site';
import stickerDims from '../content/stickers.generated.json';
import { tripClues, tripTeaser } from '../content/tripTeaser';
import { useInView } from '../hooks/useInView';
import { useNow } from '../hooks/useNow';
import { countdownTo, formatDate, zonedTimeToInstant } from '../utils/dates';
import { addGuess, isRepeat, loadGuesses, replyFor, type Guess } from '../utils/guesses';
import './trip.css';

/**
 * The mystery trip teaser: countdown, guessing game and clues.
 * This component ships in the PUBLIC teaser build — it contains no destination and does no answer checking.
 */
export function MysteryTrip() {
  const ref = useInView<HTMLElement>();
  const { mystery } = tripTeaser;

  return (
    <section id="mystery" ref={ref} className="section mystery" data-palette="mystery" aria-labelledby="mystery-title">
      <TornEdge variant={2} flip />
      <div className="wrap">
        <header className="mystery__header">
          <h2 id="mystery-title" className="rv">
            <PaperLabel tone="kraft" rotate={-3} className="eyebrow mystery__eyebrow">
              {mystery.eyebrow}
            </PaperLabel>
          </h2>
          <div className="mystery__lines">
            {mystery.lines.map((line, i) => (
              <p key={line} className="display mystery__line rv" style={{ '--i': i * 2 + 1 } as CSSProperties}>
                {line}
              </p>
            ))}
          </div>
          <p className="mystery__fineprint hand rv" style={{ '--i': 10 } as CSSProperties}>
            {mystery.fineprint}
          </p>
          <div className="mystery__kt deco" style={{ '--i': 8 } as CSSProperties}>
            <Sticker name="mascot/kt-secret" width="100%" rotate={4} />
          </div>
        </header>

        <div className="mystery__grid">
          <Countdown />
          <GuessForm />
        </div>

        <Clues />
      </div>

      <Sticker name="trip/question" width={84} rotate={-8} className="deco mystery__deco-left" style={{ '--i': 1 } as CSSProperties} />
      <Sticker name="trip/compass" width={70} rotate={10} className="deco mystery__deco-right" style={{ '--i': 3 } as CSSProperties} />
    </section>
  );
}

/* ---------------- Countdown ---------------- */

export function Countdown() {
  const { revealDate, revealTime, revealTimeZone } = siteConfig.trip;
  const target = zonedTimeToInstant(revealDate, revealTime, revealTimeZone);
  const now = useNow(1000);
  const c = countdownTo(target, now);
  const when = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit' }).format(target);

  return (
    <div className="countdown rv rv--left">
      <p className="countdown__label">{tripTeaser.countdown.label}</p>
      {c.done ? (
        <p className="countdown__arrived hand" role="status">
          {tripTeaser.countdown.arrived}
        </p>
      ) : (
        <>
          <p className="visually-hidden">Revealed on {when} (your time).</p>
          <div className="countdown__tiles" aria-hidden="true">
            {(
              [
                ['days', c.days],
                ['hrs', c.hours],
                ['min', c.minutes],
                ['sec', c.seconds],
              ] as const
            ).map(([label, value]) => (
              <span key={label} className="countdown__tile">
                <span className="countdown__num">{String(value).padStart(2, '0')}</span>
                <span className="countdown__unit">{label}</span>
              </span>
            ))}
          </div>
          <p className="countdown__date">{formatDate(revealDate, { weekday: 'long', month: 'long', day: 'numeric' })}</p>
        </>
      )}
      <Sticker name="trip/map" width={96} rotate={8} className="countdown__map" />
    </div>
  );
}

/* ---------------- Guessing game ---------------- */

export function GuessForm() {
  const { guess } = tripTeaser;
  const inputId = useId();
  const [guesses, setGuesses] = useState<Guess[]>(loadGuesses);
  const [value, setValue] = useState('');
  const [reply, setReply] = useState<{ text: string; n: number } | null>(null);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const text = value.trim();
    if (!text) return;
    // The reply never looks at whether the guess is right. There is no answer in this build.
    const repeat = isRepeat(text, guesses);
    const next = repeat ? guesses : addGuess(text, guesses);
    setGuesses(next);
    setReply({ text: repeat ? guess.repeatResponse : replyFor(next.length - 1, guess.responses), n: (reply?.n ?? 0) + 1 });
    setValue('');
  };

  return (
    <div className="guess rv rv--right" style={{ '--i': 2 } as CSSProperties}>
      <Sticker name="scrapbook/tape-sage" width={90} rotate={-6} className="guess__tape" />
      <form className="guess__form" onSubmit={submit}>
        <label htmlFor={inputId} className="guess__prompt display">
          {guess.prompt}
        </label>
        <div className="guess__row">
          <input
            id={inputId}
            className="guess__input"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={guess.placeholder}
            autoComplete="off"
            maxLength={200}
            enterKeyHint="send"
          />
          <button type="submit" className="btn guess__btn">
            {guess.button}
          </button>
        </div>
      </form>

      <div className="guess__reply" aria-live="polite">
        {reply && (
          <p key={reply.n} className="guess__answer">
            <Sticker name="trip/kt-secret-closeup" width={64} rotate={-4} className="guess__kt" />
            <span className="guess__bubble hand">{reply.text}</span>
          </p>
        )}
      </div>

      {guesses.length > 0 && (
        <div className="guess__history">
          <p className="guess__history-title">{guess.historyTitle}</p>
          <ol className="guess__list" role="list">
            {guesses.map((g, i) => (
              <li key={`${i}-${g.at}`}>{g.text}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

/* ---------------- Clues ---------------- */

/** A clue icon is a trip sticker if one exists by that name (e.g. "compass"), otherwise a line doodle. */
function ClueIcon({ icon }: { icon: string }) {
  const sticker = `trip/${icon}`;
  if (sticker in stickerDims) return <Sticker name={sticker as StickerName} width={56} className="clue__icon" />;
  return <Doodle name={icon} size={34} className="clue__icon" />;
}

function Clues() {
  const now = useNow(60_000);
  const tz = siteConfig.trip.revealTimeZone;
  if (tripClues.length === 0) return null;

  return (
    <div className="clues">
      <h3 className="clues__title eyebrow">{tripTeaser.clues.title}</h3>
      <ul className="clues__list" role="list">
        {tripClues.map((clue, i) => {
          const unlockAt = clue.unlockDate ? zonedTimeToInstant(clue.unlockDate, '00:00', tz) : null;
          const locked = !!unlockAt && unlockAt > now;
          return (
            <li key={clue.id} className={`clue rv rv--pop ${locked ? 'clue--locked' : ''}`} style={{ '--i': i + 1, '--r': `${i % 2 ? 2 : -2}deg` } as CSSProperties}>
              <span className="clue__num">#{i + 1}</span>
              {locked ? (
                <>
                  <Sticker name="trip/envelope-sealed" width={120} rotate={-3} className="clue__envelope" />
                  <p className="clue__sealed">
                    {tripTeaser.clues.lockedLabel} {formatDate(clue.unlockDate!, { month: 'short', day: 'numeric' })}
                  </p>
                </>
              ) : (
                <>
                  {clue.icon && <ClueIcon icon={clue.icon} />}
                  <p className="clue__text">
                    <T>{clue.text}</T>
                  </p>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
