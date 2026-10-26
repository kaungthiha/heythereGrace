import { lazy, Suspense, useEffect, useState } from 'react';
import { ChapterNav, type NavChapter } from './components/ChapterNav';
import { SoundToggle } from './components/SoundToggle';
import { BirthdayHero } from './sections/BirthdayHero';
import { BirthdayIntro } from './sections/BirthdayIntro';
import { BirthdayLetter } from './sections/BirthdayLetter';
import { ClosingScene } from './sections/ClosingScene';
import { MysteryTrip } from './sections/MysteryTrip';
import { OneMoreThing } from './sections/OneMoreThing';
import { RelationshipStats } from './sections/RelationshipStats';
import { Story } from './sections/story/Story';
import { prefersReducedMotion } from './utils/motion';
import { setUpSoundtrack } from './utils/soundtrack';
import { readJSON, STORAGE_KEYS, writeJSON } from './utils/storage';
import './sections/BirthdayIntro.css';

/**
 * Whether this build contains the trip reveal. Decided at BUILD time (vite.config.ts), so in a
 * teaser build this is the constant `false` and the reveal code isn't even bundled.
 */
const REVEALED = __REVEAL_SOURCE__ !== 'teaser';
const RevealChapter = REVEALED ? lazy(() => import('./sections/reveal/RevealChapter')) : null;

const CHAPTERS: NavChapter[] = [
  { id: 'birthday', label: 'Birthday' },
  { id: 'us', label: 'Us' },
  { id: 'letter', label: 'A Letter' },
  { id: 'one-more-thing', label: 'One More Thing' },
  ...(REVEALED ? [{ id: 'plan', label: 'The Plan' }] : []),
];

type IntroState = 'showing' | 'closing' | 'gone';

export default function App() {
  // Returning visitors skip the intro (they can replay it from the ending).
  const [intro, setIntro] = useState<IntroState>(() => (readJSON(STORAGE_KEYS.introOpened, false) ? 'gone' : 'showing'));

  useEffect(setUpSoundtrack, []);

  const finishIntro = () => {
    writeJSON(STORAGE_KEYS.introOpened, true);
    window.scrollTo({ top: 0 });
    if (prefersReducedMotion()) {
      setIntro('gone');
    } else {
      setIntro('closing');
      window.setTimeout(() => setIntro('gone'), 850);
    }
    document.getElementById('birthday')?.focus({ preventScroll: true });
  };

  const replayIntro = () => {
    writeJSON(STORAGE_KEYS.introOpened, false);
    setIntro('showing');
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  };

  return (
    <>
      <a className="skip-link" href="#birthday">
        Skip to the birthday
      </a>
      {__REVEAL_SOURCE__ === 'mock' && <div className="mock-badge">MOCK REVEAL · fake data</div>}

      {intro !== 'gone' && (
        <div className={`intro-shell ${intro === 'closing' ? 'is-closing' : ''}`}>
          <div>
            <BirthdayIntro onOpened={finishIntro} />
          </div>
        </div>
      )}

      <ChapterNav chapters={CHAPTERS} hidden={intro !== 'gone'} />
      <SoundToggle />

      <main>
        <BirthdayHero />
        <Story />
        <RelationshipStats />
        <BirthdayLetter />
        <OneMoreThing />
        {RevealChapter ? (
          <Suspense fallback={<div className="section" data-palette="trail" style={{ minHeight: '60vh' }} />}>
            <RevealChapter />
          </Suspense>
        ) : (
          <MysteryTrip />
        )}
        <ClosingScene onReplayIntro={replayIntro} />
      </main>
    </>
  );
}
