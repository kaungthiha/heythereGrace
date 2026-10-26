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
    /** She gets this many guesses. Each one unlocks the next clue; after the last, the countdown appears. */
    maxGuesses: 5,
    /** Reply to guess #1, #2, … in order. They never depend on what was guessed — right or wrong. */
    responses: [
      'Are you sure?',
      'Hmm… are you sure sure?',
      'Bold. Are you sure about that?',
      'Are you really, truly sure?',
      'Are you sure? Too late, that was your last one.',
    ],
    repeatResponse: 'You already guessed that one. That one doesn’t count.',
    /** Shown under a reply when that guess unlocked a clue. {n} = clue number. */
    clueUnlocked: 'New clue unlocked: #{n} ↓',
    /** {n} = guesses left, {max} = maxGuesses. */
    left: '{n} of {max} guesses left',
    outOfGuesses: 'That’s all five guesses. Locked in. The countdown is on.',
    historyTitle: 'Your guesses so far',
  },

  countdown: {
    /** Shown instead of the countdown until she has used every guess. */
    lockedLabel: 'Countdown locked',
    locked: 'Use up all your guesses to unlock it.',
    label: 'Destination revealed in…',
    arrived: 'It’s time. The surprise is on its way — refresh in a little bit.',
  },

  clues: {
    title: 'Clues',
    /** Rendered as "unlocks after guess #2". */
    lockedLabel: 'unlocks after guess',
  },
};

/**
 * Clues, in unlock order. The first is visible from the start; each guess unlocks the next one.
 * Delete them all to hide the clue board.
 * Clues are hints, not secrets: locked text is still in the page source for anyone who digs.
 */
export const tripClues: TripClue[] = [
  { id: 'clue-1', text: 'it’s in a nearby state.', icon: 'map' },
  { id: 'clue-2', text: 'There’s going to be a….pile of stuff.', icon: 'backpack' },
  { id: 'clue-3', text: 'Lebron.', icon: 'question' },
  { id: 'clue-4', text: 'it’s to the northwest of Urba.', icon: 'compass' },
  { id: 'clue-5', text: 'that’s enough clues lock in.', icon: 'luggage-tag' },
];
