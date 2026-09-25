import { describe, expect, it } from 'vitest';
import { countdownTo, daysSince, formatDate, zonedTimeToInstant } from './dates';

describe('zonedTimeToInstant', () => {
  it('converts New York wall time (EDT, UTC-4) to the right instant', () => {
    expect(zonedTimeToInstant('2026-10-28', '09:00', 'America/New_York').toISOString()).toBe('2026-10-28T13:00:00.000Z');
  });
  it('handles standard time after the DST switch (EST, UTC-5)', () => {
    expect(zonedTimeToInstant('2026-11-02', '00:00', 'America/New_York').toISOString()).toBe('2026-11-02T05:00:00.000Z');
  });
  it('works for other zones', () => {
    expect(zonedTimeToInstant('2026-10-28', '09:00', 'Asia/Yangon').toISOString()).toBe('2026-10-28T02:30:00.000Z');
    expect(zonedTimeToInstant('2026-10-28', '09:00', 'UTC').toISOString()).toBe('2026-10-28T09:00:00.000Z');
  });
});

describe('reveal countdown does not unlock early', () => {
  const reveal = zonedTimeToInstant('2026-10-28', '09:00', 'America/New_York');
  it('is still counting one minute before 9:00 New York time', () => {
    const c = countdownTo(reveal, new Date('2026-10-28T12:59:00Z'));
    expect(c.done).toBe(false);
    expect(c.minutes).toBe(1);
  });
  it('is not done at UTC midnight on the reveal date (the naive-UTC bug)', () => {
    expect(countdownTo(reveal, new Date('2026-10-28T00:00:00Z')).done).toBe(false);
  });
  it('is done once the time passes', () => {
    expect(countdownTo(reveal, new Date('2026-10-28T13:00:01Z')).done).toBe(true);
  });
  it('splits days/hours/minutes/seconds', () => {
    const c = countdownTo(reveal, new Date('2026-10-26T11:58:30Z'));
    expect([c.days, c.hours, c.minutes, c.seconds]).toEqual([2, 1, 1, 30]);
  });
});

describe('daysSince', () => {
  it('counts calendar days in a given zone', () => {
    expect(daysSince('2025-08-09', new Date('2025-08-09T12:00:00Z'), 'UTC')).toBe(0);
    expect(daysSince('2025-08-09', new Date('2026-08-09T12:00:00Z'), 'UTC')).toBe(365);
  });
  it('uses that zone’s calendar date, not UTC’s', () => {
    // 02:00 UTC on Aug 10 is still Aug 9 in New York.
    expect(daysSince('2025-08-09', new Date('2025-08-10T02:00:00Z'), 'America/New_York')).toBe(0);
  });
});

describe('formatDate', () => {
  it('formats ISO dates without shifting a day', () => {
    expect(formatDate('2025-08-09')).toBe('August 9, 2025');
  });
  it('passes free text through', () => {
    expect(formatDate('Winter 2025')).toBe('Winter 2025');
  });
});
