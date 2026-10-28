import type { TripRevealContent } from '../types';
import heroImage from './assets/destination.webp';

/**
 * THE REAL TRIP. Gitignored — only bundled by the revealed build (`npm run dev:revealed`,
 * `npx vite build --mode revealed`, or revealMode: 'revealed' in site.ts). Never import it anywhere else.
 * See trip.mock.ts for every optional field (departure, lodging, packing, weather, notes, map).
 */
const tripReveal: TripRevealContent = {
  destination: {
    name: 'Ohiopyle State Park',
    region: 'Pennsylvania',
    image: {
      src: heroImage,
      alt: 'A wide waterfall pouring over rock ledges in a river, surrounded by hills of orange and red autumn trees',
      width: 1200,
      height: 609,
    },
  },
  postscript: 'P.S. you owe Kaung 100 bucks.',
  // Add `planIntro: 'Here’s the plan.'` and days here once the itinerary is ready (see trip.mock.ts).
  days: [],
};

export default tripReveal;
