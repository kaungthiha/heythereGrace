import type { CSSProperties, ReactNode } from 'react';
import { Doodle } from '../../components/Doodle';
import { PaperLabel } from '../../components/PaperLabel';
import { Sticker, type StickerName } from '../../components/Sticker';
import { T } from '../../components/Text';
import { TornEdge } from '../../components/TornEdge';
import { getPhoto } from '../../content/photos';
import { story } from '../../content/story';
import type { ChapterLayout, Mood, Palette, Photo, StoryChapter } from '../../content/types';
import { useInView } from '../../hooks/useInView';
import { formatDate } from '../../utils/dates';
import { FilmRoll } from './FilmRoll';
import { Collage, Fullscreen, PhotoStrip, Scrapbook, Split, Spotlight } from './layouts';
import { PolaroidStack } from './PolaroidStack';
import './story.css';

export type LayoutProps = { chapter: StoryChapter; photos: Photo[] };

const LAYOUTS: Record<ChapterLayout, (props: LayoutProps) => ReactNode> = {
  fullscreen: Fullscreen,
  'polaroid-stack': PolaroidStack,
  'photo-strip': PhotoStrip,
  scrapbook: Scrapbook,
  'film-roll': FilmRoll,
  collage: Collage,
  split: Split,
  spotlight: Spotlight,
};

/** Each mood has two paper tints so neighbouring chapters don't blur together. */
const MOOD_PALETTES: Record<Mood, [Palette, Palette]> = {
  sweet: ['peach', 'cream'],
  funny: ['blue', 'cream'],
  adventure: ['sage', 'blue'],
  quiet: ['lavender', 'warm'],
};

function assignPalettes(chapters: StoryChapter[]): Palette[] {
  const out: Palette[] = [];
  chapters.forEach((ch, i) => {
    const [first, second] = MOOD_PALETTES[ch.mood ?? 'sweet'];
    const wanted = ch.palette ?? first;
    out.push(!ch.palette && i > 0 && out[i - 1] === wanted ? second : wanted);
  });
  return out;
}

export function Story() {
  const palettes = assignPalettes(story);
  return (
    <div id="us" className="story">
      {story.map((chapter, i) => (
        <MemorySection key={chapter.id} chapter={chapter} index={i} palette={palettes[i]} />
      ))}
    </div>
  );
}

const ARROWS: StickerName[] = ['scrapbook/arrow-loop', 'scrapbook/arrow-red', 'scrapbook/arrow-squiggle'];

function MemorySection({ chapter, index, palette }: { chapter: StoryChapter; index: number; palette: Palette }) {
  const ref = useInView<HTMLElement>();
  const Layout = LAYOUTS[chapter.layout] ?? Scrapbook;
  const photos = chapter.photos.map(getPhoto);
  const titleId = `chapter-${chapter.id}-title`;
  const first = index === 0;

  return (
    <section
      id={`chapter-${chapter.id}`}
      ref={ref}
      className={`section chapter chapter--${chapter.layout} ${first ? 'chapter--first' : ''}`}
      data-palette={palette}
      aria-labelledby={titleId}
    >
      <TornEdge variant={index} flip={index % 2 === 1} />
      <div className="wrap">
        <header className={`chapter__header ${chapter.mascot ? 'has-mascot' : ''}`}>
          {chapter.eyebrow && (
            <PaperLabel tone={index % 2 ? 'kraft' : 'blue'} rotate={index % 2 ? 2 : -2} className="chapter__eyebrow eyebrow rv">
              <T>{chapter.eyebrow}</T>
            </PaperLabel>
          )}
          <h2 id={titleId} className="display chapter__title rv" style={{ '--i': 1 } as CSSProperties}>
            <T>{chapter.title}</T>
          </h2>
          {chapter.date && (
            <p className="chapter__date hand rv" style={{ '--i': 2 } as CSSProperties}>
              <T>{formatDate(chapter.date)}</T>
              <Doodle name="circle" className="chapter__date-circle" draw weight={2.2} />
            </p>
          )}
          {chapter.subtitle && (
            <p className="lede rv" style={{ '--i': 2 } as CSSProperties}>
              <T>{chapter.subtitle}</T>
            </p>
          )}
          {chapter.body && chapter.layout !== 'spotlight' && (
            <p className="chapter__body rv" style={{ '--i': 3 } as CSSProperties}>
              <T>{chapter.body}</T>
            </p>
          )}
          {chapter.mascot && (
            <div className="chapter__mascot deco" style={{ '--i': 3 } as CSSProperties}>
              <Sticker name={`mascot/kt-${chapter.mascot}` as StickerName} width="100%" rotate={index % 2 ? 4 : -4} />
            </div>
          )}
        </header>

        <Layout chapter={chapter} photos={photos} />

        {chapter.annotation && chapter.layout !== 'photo-strip' && (
          <p className="scribble-note chapter__annotation rv" style={{ '--i': 4 } as CSSProperties}>
            <Sticker name={ARROWS[index % ARROWS.length]} width={64} rotate={200} className="chapter__annotation-arrow" />
            <T>{chapter.annotation}</T>
          </p>
        )}
      </div>
    </section>
  );
}
