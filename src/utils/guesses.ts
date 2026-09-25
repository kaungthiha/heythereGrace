import { readJSON, STORAGE_KEYS, writeJSON } from './storage';

/**
 * Trip guesses, kept only in Grace's browser.
 *
 * There is deliberately NO answer checking here. The teaser build doesn't contain the answer,
 * so a guess can't be "right" or "wrong" — every reply is picked without looking at the guess text
 * (apart from spotting repeats of her own earlier guesses).
 */
export type Guess = { text: string; at: string };

export function loadGuesses(): Guess[] {
  const value = readJSON<unknown>(STORAGE_KEYS.guesses, []);
  if (!Array.isArray(value)) return [];
  return value.filter((g): g is Guess => typeof g?.text === 'string' && typeof g?.at === 'string');
}

const normalize = (s: string) => s.trim().toLowerCase().replace(/\s+/g, ' ');

export function isRepeat(text: string, previous: Guess[]): boolean {
  const n = normalize(text);
  return previous.some((g) => normalize(g.text) === n);
}

export function addGuess(text: string, previous: Guess[], now = new Date()): Guess[] {
  const next = [...previous, { text: text.trim().slice(0, 200), at: now.toISOString() }];
  writeJSON(STORAGE_KEYS.guesses, next);
  return next;
}

/** Cycles through replies so two guesses in a row never get the same one. */
export function replyFor(guessNumber: number, responses: string[]): string {
  if (responses.length === 0) return '';
  return responses[guessNumber % responses.length];
}
