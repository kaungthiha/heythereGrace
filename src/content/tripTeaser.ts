import type { TripClue } from './types';

/**
 * Everything shown about the trip BEFORE the reveal.
 * This file ships in the public teaser build — it must never name or hint at the destination.
 * Anything written here (including clues that haven't unlocked yet) can be read in the page source.
 */
export const tripTeaser = {
  ending: {
    thatsEverything: 'That’s everything.',
    almost: '…almost.',
  },

  turn: {
    tag: 'October 30',
    lines: ['Pack a bag.', 'We’re going somewhere.'],
  },

  mystery: {
    eyebrow: 'One more present',
    lines: ['Clear your calendar.', 'October 30.', 'I’m taking you somewhere.', 'You can guess.'],
    fineprint: 'I will neither confirm nor deny anything.',
  },

  guess: {
    prompt: 'Where do you think we’re going?',
    placeholder: 'Type a guess…',
    button: 'Guess',
    /** Replies cycle in order. They never depend on what was guessed. */
    responses: [
      'Interesting theory.',
      'I’m saying absolutely nothing.',
      'Recorded for posterity.',
      'You seem very confident about that.',
    ],
    repeatResponse: 'You already guessed that one. Still saying nothing.',
    historyTitle: 'Your guesses so far',
  },

  countdown: {
    label: 'Destination revealed in…',
    arrived: 'It’s time. The surprise is on its way — refresh in a little bit.',
  },

  clues: {
    title: 'Clues',
    lockedLabel: 'unlocks',
  },
};

/**
 * Optional clues. Delete them all to hide the clue board. A clue with an `unlockDate` shows as a
 * sealed envelope until 00:00 on that date (in the trip's time zone).
 * Clues are hints, not secrets: locked text is still in the page source for anyone who digs.
 */
export const tripClues: TripClue[] = [
  { id: 'clue-1', text: '[KT: Add trip clue #1]', icon: 'compass' },
  { id: 'clue-2', text: '[KT: Add trip clue #2]', unlockDate: '2026-10-27', icon: 'suitcase' },
];
