/** Small deterministic "randomness" so things look hand-placed but never change on reload. */
function hash(seed: string): number {
  // FNV-1a plus a final mix, so similar seeds ("n1", "n2") still land far apart.
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  h ^= h >>> 13;
  h = Math.imul(h, 0x5bd1e995);
  h ^= h >>> 15;
  return h >>> 0;
}

/** A number in [-range, range], stable for a given seed. */
export function wobble(seed: string, range = 3): number {
  return (((hash(seed) % 1000) / 1000 - 0.5) * 2 * range);
}

/** A stable pick from a list for a given seed. */
export function pick<T>(seed: string, items: readonly T[]): T {
  return items[hash(seed) % items.length];
}
