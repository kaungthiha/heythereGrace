/**
 * localStorage that never throws. Private browsing, blocked storage or full quota all fall back
 * to an in-memory copy, so the site keeps working for the rest of the visit.
 */
const memory = new Map<string, string>();

export const STORAGE_KEYS = {
  guesses: 'graceTripGuesses',
  introOpened: 'graceIntroOpened',
  revealOpened: 'graceRevealOpened',
} as const;

export function readJSON<T>(key: string, fallback: T): T {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(key);
  } catch {
    /* unavailable */
  }
  raw ??= memory.get(key) ?? null;
  if (raw == null) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeJSON(key: string, value: unknown): void {
  const raw = JSON.stringify(value);
  memory.set(key, raw);
  try {
    window.localStorage.setItem(key, raw);
  } catch {
    /* in-memory copy is enough */
  }
}
