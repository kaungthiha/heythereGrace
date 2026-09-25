import type { RelationshipStat } from './types';

/**
 * Optional extra stats for "Us, by the numbers". The days-together counter is always calculated
 * automatically. Only real numbers go here — if this list is empty, the extra stats are hidden
 * in production (development shows a reminder instead).
 *
 * Example: { id: 'trips', value: '4', label: 'trips', note: 'and counting' }
 */
export const stats: RelationshipStat[] = [];
