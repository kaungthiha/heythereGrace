import type { TripRevealContent } from '../types';
import cabinImage from './assets/cabin.webp';
import heroImage from './assets/destination.webp';
import routeImage from './assets/route.webp';

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
  photos: [
    {
      src: cabinImage,
      caption: 'our cabin for the weekend',
      alt: 'Collage of the cabin: a wood-panelled living room with a stone chimney, a bedroom, the A-frame outside, a fire pit by a creek, and the creek running through the woods',
      width: 1189,
      height: 329,
      credit: 'Photos from the rental listing',
    },
    {
      src: routeImage,
      caption: 'the route up (with current traffic)',
      alt: 'Map of the drive northwest from Arlington through Hagerstown and Cumberland to Ohiopyle: about 3 hours 46 minutes, 188 miles',
      width: 1428,
      height: 874,
      credit: 'Map: Google Maps',
    },
  ],
  // Add `planIntro: 'Here’s the plan.'` and days here once the itinerary is ready (see trip.mock.ts).
  days: [],
};

export default tripReveal;
