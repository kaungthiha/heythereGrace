import type { StoryChapter } from './types';

/**
 * The relationship story, in order. Reorder, add or delete chapters freely — it's just data.
 *
 * The demo below uses every layout once so you can see what each looks like. When the real
 * photos arrive, pick the layout that suits each memory (repeats are fine) rather than
 * keeping all of them.
 */
export const story: StoryChapter[] = [
  {
    id: 'the-beginning',
    eyebrow: 'Chapter One',
    title: 'August 9, 2025',
    body: '[KT: Add memory from this day]',
    layout: 'fullscreen',
    photos: ['first-date'],
    mood: 'sweet',
    mascot: 'wave',
  },
  {
    id: 'early-days',
    eyebrow: 'Chapter Two',
    title: '[KT: Chapter title]',
    date: '[KT: when]',
    body: '[KT: Add memory from these days]',
    layout: 'scrapbook',
    photos: ['early-1', 'early-2', 'early-3'],
    annotation: '[KT: handwritten note]',
    mood: 'sweet',
  },
  {
    id: 'photo-booth',
    eyebrow: 'Evidence',
    title: '[KT: Chapter title]',
    layout: 'photo-strip',
    photos: ['booth-1', 'booth-2', 'booth-3', 'booth-4'],
    annotation: '[KT: handwritten note]',
    mood: 'funny',
    mascot: 'tongue',
  },
  {
    id: 'adventures',
    eyebrow: 'Chapter Three',
    title: 'A few adventures later…',
    body: '[KT: Add memory]',
    layout: 'film-roll',
    photos: ['roll-1', 'roll-2', 'roll-3', 'roll-4', 'roll-5'],
    mood: 'adventure',
    mascot: 'backpack',
  },
  {
    id: 'tiny-moments',
    eyebrow: 'Also important',
    title: 'Tiny moments',
    subtitle: '[KT: subtitle]',
    layout: 'collage',
    photos: ['tiny-1', 'tiny-2', 'tiny-3', 'tiny-4', 'tiny-5', 'tiny-6'],
    mood: 'funny',
  },
  {
    id: 'same-day',
    eyebrow: 'Same day',
    title: '[KT: Chapter title]',
    body: '[KT: Add memory]',
    layout: 'split',
    photos: ['before', 'after'],
    mood: 'funny',
  },
  {
    id: 'stack',
    eyebrow: 'Chapter Four',
    title: '[KT: Chapter title]',
    body: '[KT: Add memory]',
    layout: 'polaroid-stack',
    photos: ['stack-1', 'stack-2', 'stack-3', 'stack-4'],
    mood: 'adventure',
    mascot: 'peace',
  },
  {
    id: 'you',
    eyebrow: 'And then there’s you',
    title: '[KT: Chapter title]',
    body: '[KT: A short note about this photo]',
    layout: 'spotlight',
    photos: ['spotlight'],
    mood: 'quiet',
  },
];
