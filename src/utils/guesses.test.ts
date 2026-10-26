import { beforeEach, describe, expect, it } from 'vitest';
import { tripTeaser } from '../content/tripTeaser';
import { addGuess, cluesUnlocked, isRepeat, loadGuesses, replyFor } from './guesses';

describe('guesses', () => {
  beforeEach(() => localStorage.clear());

  it('stores guesses with timestamps under graceTripGuesses', () => {
    const next = addGuess('  Paris ', [], new Date('2026-10-26T10:00:00Z'));
    expect(next).toEqual([{ text: 'Paris', at: '2026-10-26T10:00:00.000Z' }]);
    expect(JSON.parse(localStorage.getItem('graceTripGuesses')!)).toEqual(next);
    expect(loadGuesses()).toEqual(next);
  });

  it('ignores corrupted storage', () => {
    localStorage.setItem('graceTripGuesses', '{not json');
    expect(loadGuesses()).toEqual([]);
    localStorage.setItem('graceTripGuesses', JSON.stringify([{ nope: 1 }, { text: 'ok', at: 'x' }]));
    expect(loadGuesses()).toEqual([{ text: 'ok', at: 'x' }]);
  });

  it('spots repeats regardless of case/spacing', () => {
    expect(isRepeat(' PARIS  ', [{ text: 'paris', at: '' }])).toBe(true);
    expect(isRepeat('Rome', [{ text: 'paris', at: '' }])).toBe(false);
  });

  it('unlocks one clue up front and one more per guess, up to the total', () => {
    expect(cluesUnlocked(0, 5)).toBe(1);
    expect(cluesUnlocked(1, 5)).toBe(2);
    expect(cluesUnlocked(4, 5)).toBe(5);
    expect(cluesUnlocked(9, 5)).toBe(5);
    expect(cluesUnlocked(0, 0)).toBe(0);
  });

  it('replies never depend on the guess text (no answer checking)', () => {
    const responses = tripTeaser.guess.responses;
    expect(replyFor(0, responses)).toBe(responses[0]);
    expect(replyFor(1, responses)).toBe(responses[1]);
    expect(replyFor(responses.length, responses)).toBe(responses[0]);
    // replyFor has no parameter for the guess itself — the signature is the guarantee.
    expect(replyFor.length).toBe(2);
  });
});
