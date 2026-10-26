import type { RelationshipStat } from './types';

/**
 * Optional extra stats for "Us, by the numbers". The days-together counter is always calculated
 * automatically. Only real numbers go here — if this list is empty, the extra stats are hidden
 * in production (development shows a reminder instead).
 *
 * Example: { id: 'trips', value: '4', label: 'trips', note: 'and counting' }
 */
export const stats: RelationshipStat[] = [
  // Each city counted as its own round trip from Arlington, VA, as the crow flies
  // (SF 2,432 · Sacramento 2,369 · NYC 207 · Chicago 592 miles each way). Update as you go places.
  { id: 'miles', value: '~11,200', label: 'miles travelled', note: 'SF · Sacramento · NYC · Chicago' },
  { id: 'meals', value: '150+', label: 'meals shared', note: 'at the very least' },
  { id: 'farts', value: 'classified', label: 'farts smelled' },
  { id: 'stims', value: '∞', label: 'stims stimmed', note: 'uncountable' },
];
