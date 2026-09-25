/// <reference types="vite/client" />

/** "teaser" | "mock" | "revealed" — set by vite.config.ts at build time. */
declare const __REVEAL_SOURCE__: 'teaser' | 'mock' | 'revealed';

/** Resolved by vite.config.ts to reveal/none.ts, reveal/trip.mock.ts or reveal/trip.ts. */
declare module '@trip-reveal' {
  import type { TripRevealContent } from './content/types';
  const tripReveal: TripRevealContent | null;
  export default tripReveal;
}
