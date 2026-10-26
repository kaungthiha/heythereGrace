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
    name: 'ကောင်း',
    /** Language of `name` (BCP 47), so browsers pick a font that has the script. */
    nameLang: 'my',
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
    subtitle: 'A small corner of the internet for you.',
    /** Photo id from photos.ts. */
    photo: 'hero',
    note: 'wow she oldddd',
  },

  stats: {
    title: 'Us, by the numbers',
  },

  closing: {
    photo: 'closing',
    line: 'Happy birthday, Grace.',
    signoff: 'wash up stinky',
  },

  /**
   * Site-wide soundtrack in public/audio/, looping. Starts on her first tap/keypress (browsers don't
   * allow sound before that) unless she muted it before. null = no music and no sound button.
   */
  soundtrack: {
    src: 'audio/soundtrack.mp3',
    label: 'The Kiffness × NumNum Cat (Live Looping Balkan Remix)',
  } as null | { src: string; label: string },
};

export type SiteConfig = typeof siteConfig;
