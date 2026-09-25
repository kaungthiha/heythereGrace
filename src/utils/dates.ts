/**
 * Date helpers. All "YYYY-MM-DD" strings are treated as calendar dates (never parsed as UTC
 * midnight and then shown in local time — that's how things end up a day off).
 */

const DAY_MS = 86_400_000;

type YMD = { y: number; m: number; d: number };

export function parseYMD(iso: string): YMD | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso.trim());
  if (!match) return null;
  return { y: Number(match[1]), m: Number(match[2]), d: Number(match[3]) };
}

/** Calendar date of `instant` as seen in `timeZone` (default: the visitor's own zone). */
export function calendarDateIn(instant: Date, timeZone?: string): YMD {
  if (!timeZone) return { y: instant.getFullYear(), m: instant.getMonth() + 1, d: instant.getDate() };
  const parts = zonedParts(instant, timeZone);
  return { y: parts.year, m: parts.month, d: parts.day };
}

/** Whole calendar days from `startIso` to the calendar date of `now` (visitor's zone by default). */
export function daysSince(startIso: string, now: Date, timeZone?: string): number {
  const start = parseYMD(startIso);
  if (!start) return 0;
  const today = calendarDateIn(now, timeZone);
  return Math.round((Date.UTC(today.y, today.m - 1, today.d) - Date.UTC(start.y, start.m - 1, start.d)) / DAY_MS);
}

function zonedParts(instant: Date, timeZone: string) {
  const fmt = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hourCycle: 'h23',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });
  const out: Record<string, number> = {};
  for (const p of fmt.formatToParts(instant)) if (p.type !== 'literal') out[p.type] = Number(p.value);
  return { year: out.year, month: out.month, day: out.day, hour: out.hour % 24, minute: out.minute, second: out.second };
}

/** Offset of `timeZone` from UTC at `instant`, in ms (e.g. -4h for New York in October). */
function zoneOffsetMs(instant: Date, timeZone: string): number {
  const p = zonedParts(instant, timeZone);
  const asUtc = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second);
  return asUtc - Math.floor(instant.getTime() / 1000) * 1000;
}

/**
 * The exact instant a wall-clock time happens in a given zone.
 * zonedTimeToInstant("2026-10-28", "09:00", "America/New_York") → 2026-10-28T13:00:00Z
 */
export function zonedTimeToInstant(dateIso: string, time: string, timeZone: string): Date {
  const date = parseYMD(dateIso);
  if (!date) throw new Error(`Invalid date "${dateIso}" (expected YYYY-MM-DD)`);
  const [hh = 0, mm = 0] = time.split(':').map(Number);
  const wall = Date.UTC(date.y, date.m - 1, date.d, hh, mm);
  const firstGuess = wall - zoneOffsetMs(new Date(wall), timeZone);
  // Re-check once in case the guess crossed a DST boundary.
  const corrected = wall - zoneOffsetMs(new Date(firstGuess), timeZone);
  return new Date(corrected);
}

export type Countdown = { total: number; days: number; hours: number; minutes: number; seconds: number; done: boolean };

export function countdownTo(target: Date, now: Date): Countdown {
  const total = Math.max(0, target.getTime() - now.getTime());
  const s = Math.floor(total / 1000);
  return {
    total,
    days: Math.floor(s / 86_400),
    hours: Math.floor((s % 86_400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
    done: total === 0,
  };
}

/** "2025-08-09" → "August 9, 2025". Free text (e.g. "Winter 2025") is returned unchanged. */
export function formatDate(iso: string, options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' }): string {
  const date = parseYMD(iso);
  if (!date) return iso;
  return new Intl.DateTimeFormat('en-US', { ...options, timeZone: 'UTC' }).format(new Date(Date.UTC(date.y, date.m - 1, date.d)));
}
