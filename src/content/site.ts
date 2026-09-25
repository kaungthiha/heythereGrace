/**
 * Central site configuration. Plain data only — this file is also read by vite.config.ts.
 *
 * NEVER put the trip destination (or anything that hints at it) in this file.
 * Real trip content goes in src/content/reveal/trip.ts only.
 */
export const siteConfig = {
  person: {
    name: 'Grace',
    birthday: { month: 10, day: 26 },
    /** Shown as a small sticker in the hero ("25th"). Set to null to hide. The birth year is never shown. */
    ageOrdinal: '25th' as string | null,
  },

  author: {
    /** How you sign things. */
    name: '[KT: your name, as you sign it]',
  },

  relationship: {
    startDate: '2025-08-09',
  },

  trip: {
    departureDate: '2026-10-30',
    revealDate: '2026-10-28',
    revealTime: '09:00',
    /** IANA time zone the reveal date/time and clue unlock dates are measured in. */
    revealTimeZone: 'America/New_York',
    /**
     * "teaser"   → the build contains NO destination/itinerary (default; safe to deploy any time).
     * "revealed" → the build includes src/content/reveal/trip.ts. Only switch on reveal day.
     */
    revealMode: 'teaser' as 'teaser' | 'revealed',
  },

  intro: {
    tagLine1: 'for Grace',
    tagLine2: 'october 26',
    button: 'open your present',
  },

  hero: {
    title: 'Happy Birthday,',
    subtitle: 'A small corner of the internet for my favorite person.',
    /** Photo id from photos.ts. */
    photo: 'hero',
    note: '[KT: Add opening message]',
  },

  loveNotes: {
    title: 'Things I love about you',
    subtitle: '(an incomplete list)',
    photo: 'love-portrait',
  },

  stats: {
    title: 'Us, by the numbers',
  },

  closing: {
    photo: 'closing',
    line: 'Happy birthday, Grace.',
    message: '[KT: Your closing message]',
    signoff: '[KT: Closing line — e.g. “See you on the next page.”]',
  },

  /** Optional soundtrack you own the rights to, placed in public/audio/. Never autoplays. null = no sound button. */
  soundtrack: null as null | { src: string; label: string },
};

export type SiteConfig = typeof siteConfig;
