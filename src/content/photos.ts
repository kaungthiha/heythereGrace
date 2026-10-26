import type { Photo } from './types';

/**
 * The photo manifest. Every photo on the site is listed here once, then referenced by `id`.
 *
 * To use a real photo (or a short video):
 *   1. drop the original into photos-original/ (never committed, never modified)
 *   2. run `npm run optimize-images`
 *   3. set `src` below to the printed name (e.g. "2025-08-09-gala") and write real `alt` text
 * Until `src` is set, the photo renders as a labelled placeholder showing `placeholder`.
 * If `src` names a video, it renders as a tap-to-play video with that photo's poster frame.
 *
 * Captions are the original filenames from "gton photos/". Locations are kept to city level on purpose.
 * `focalPoint` matters where a layout crops to a square (polaroid stack, photo-booth strip).
 */
export const photos: Photo[] = [
  // ---- Site sections (ids referenced from site.ts / letter.ts) ----
  {
    id: 'hero',
    src: '2026-03-06-fancy-dinner',
    alt: 'Grace beaming at a restaurant table, holding up a dessert plate with “Congrats” written on it',
    date: '2026-03-06',
    location: 'New York',
  },
  { id: 'letter', src: '2025-12-21-exquisite', alt: 'Grace eating by a restaurant window, a steaming bowl in front of her', caption: '‘exquisite’', date: '2025-12-21' },
  {
    id: 'closing',
    src: '2025-06-25-escape-room',
    alt: 'The two of us in a red-lit escape room, holding up glowing signs after escaping',
  },

  // ---- Before Chapter One ----
  {
    id: 'book-festival',
    src: '2024-book-festival',
    alt: 'Grace smiling in front of a National Book Festival poster, holding up the festival book',
    caption: 'wow so youthful',
  },
  {
    id: 'escape-room',
    src: '2025-06-25-escape-room',
    alt: 'The two of us in a red-lit escape room, holding up glowing signs after escaping',
    caption: 'peep that gentlemanly arm positioning by me on one of our earliest dates',
    date: '2025-06-25',
    location: 'Washington, DC',
  },
  { id: 'qb', src: '2025-06-25-qb', alt: 'Grace on the sidewalk, hand on hip, watching a golden retriever on a leash sniff the grass', caption: 'disapproving of qb', date: '2025-06-25' },
  { id: 'teddy-bears', src: '2025-08-02-teddy-bears', alt: 'Grace striking a pose on a chair surrounded by a wall of stuffed bears and bees', caption: 'ok pose', date: '2025-08-02', location: 'Woodbridge, VA' },

  // ---- Chapter One ----
  { id: 'gala', src: '2025-08-09-gala', alt: 'Grace in a blazer taking a big bite of salad at a table full of food', caption: 'aura after gala', aside: 'look at you wearing my jacket (first of many)', date: '2025-08-09', location: 'Tysons, VA' },

  // ---- Early days ----
  { id: 'noodles', src: '2025-08-23-noodles', alt: 'Grace holding a forkful of noodles high above her bowl at a restaurant', caption: 'noodle like your hair', date: '2025-08-23' },
  { id: 'rat', src: '2025-08-31-rat', alt: 'Grace lying on the carpet, grinning with a hand over her mouth', caption: 'rat', date: '2025-08-31' },
  { id: 'cookout', src: '2025-10-04-cookout', alt: 'Grace holding a plate at an outdoor cookout, giving a thumbs up', caption: 'cultural exposure', date: '2025-10-04', location: 'Maryland' },

  // ---- Same night (taken two seconds apart) ----
  { id: 'focaccia', src: '2025-09-28-focaccia', alt: 'Grace in blue oven mitts pulling a tray of focaccia out of the oven', caption: 'focaccia adventures', date: '2025-09-28' },
  { id: 'oven-mitts', src: '2025-09-28-oven-mitts', alt: 'Grace giving two thumbs up in her blue oven mitts', caption: 'boxer', date: '2025-09-28' },

  // ---- One year ago: birthday week 2025 ----
  { id: 'birthday-dinner', src: '2025-10-24-birthday-dinner', alt: 'Grace taking a bite of dessert at dinner, with a polaroid of her held up and a small gift box beside her', caption: 'burthday gurlll', date: '2025-10-24', location: 'Washington, DC', focalPoint: '50% 40%' },
  { id: 'cookies', src: '2025-10-25-cookies', alt: 'Grace standing at the stove next to a tray of freshly baked cookies', caption: 'batch of cookies!', date: '2025-10-25', focalPoint: '50% 25%' },
  { id: 'hotpot', src: '2025-10-25-hotpot', alt: 'Grace laughing behind a table covered in hotpot ingredients', caption: '1 year ago: hotpot at the thai place that might’ve given me food poisoning', date: '2025-10-25', focalPoint: '50% 20%' },
  { id: 'rave', src: '2025-10-25-rave', alt: 'The two of us squished into a selfie under purple rave lights', caption: 'im so cooked in this one', date: '2025-10-25', location: 'Washington, DC' },
  { id: 'halloween', src: '2025-10-26-halloween', alt: 'Grace in her Halloween costume, posing on a sidewalk at night', caption: 'yak bag!', date: '2025-10-26', location: 'Washington, DC', focalPoint: '50% 55%' },
  { id: 'birthday-24', src: '2025-10-26-birthday-24', alt: 'Grace smiling behind a cutting board with a sliced steak and “24” birthday candles', caption: 'unc at 24', date: '2025-10-26', focalPoint: '50% 45%' },

  // ---- Adventures ----
  { id: 'departure', src: '2025-10-30-departure', alt: 'Grace wheeling a suitcase and bag out of an airport terminal', caption: 'on another adventure', date: '2025-10-30' },
  { id: 'hotel-lobby', src: '2025-10-31-hotel-lobby', alt: 'Grace sitting at a glass table in a hotel lobby next to a suitcase', caption: 'bro is stealing my clothes', date: '2025-10-31' },
  { id: 'hotel-room', src: '2025-10-31-hotel-room', alt: 'Grace getting ready in a hotel bathroom, takeout and snacks on the desk', caption: 'nice pits', date: '2025-10-31' },
  { id: 'gym', src: '2025-11-28-gym', alt: 'Grace in a hotel gym, flexing with a dumbbell overhead', caption: 'chicken arms like wat', date: '2025-11-28', location: 'San Francisco' },
  { id: 'big-bites', src: '2025-12-01-big-bites', alt: 'Grace in a hoodie taking a huge bite out of a pastry', caption: 'big bites', date: '2025-12-01', location: 'San Francisco' },
  { id: 'new-years-eve', src: '2025-12-31-new-years-eve', alt: 'Grace with her arms up inside a lit-up glass dome beside a Christmas tree at night', caption: 'so tall', date: '2025-12-31', location: 'Maryland' },
  { id: 'goat', src: '2026-01-02-goat', alt: 'Grace laughing as a fluffy white goat leans in toward her in the woods', caption: 'goat jizzler', date: '2026-01-02', location: 'Maryland' },
  { id: 'soundcheck', src: '2026-01-11-soundcheck', alt: 'Grace giving a thumbs up under the glowing Soundcheck sign', caption: 'soundcheck for elephante!', date: '2026-01-11', location: 'Washington, DC' },
  { id: 'van', src: '2026-05-14-van', alt: 'Grace sitting cross-legged in the back of a van, eating from a cup with a spoon', caption: 'human trafficker core', date: '2026-05-14', location: 'Las Vegas' },
  { id: 'edc', src: '2026-05-17-edc', alt: 'Video: a festival main stage lit up at night, phones raised in the crowd', caption: 'woah edc moment', date: '2026-05-17', location: 'Las Vegas' },
  { id: 'train', src: '2026-06-06-train', alt: 'Grace sitting on a metro train, glancing at the camera', caption: 'sneaky train pic', date: '2026-06-06', location: 'Washington, DC' },

  // ---- Sleeping evidence (photo-booth strip) ----
  { id: 'sleeping-1', src: '2026-05-08-sleeping', alt: 'Grace fast asleep, mouth slightly open', date: '2026-05-08', focalPoint: '50% 45%' },
  { id: 'sleeping-zoom', src: '2026-06-06-sleeping-zoom', alt: 'Video: a slow zoom in on Grace asleep with her glasses still on', caption: 'sleeping zoom', date: '2026-06-06', focalPoint: '50% 45%' },
  { id: 'sleeping-2', src: '2026-08-09-sleeping', alt: 'A close-up of Grace asleep', caption: 'AND ANOTHER', date: '2026-08-09', focalPoint: '50% 62%' },
  { id: 'sleeping-3', src: '2026-08-22-sleeping', alt: 'Grace asleep wrapped in a blanket, glasses still on', caption: 'ANOTHER ONE', date: '2026-08-22', focalPoint: '50% 40%' },

  // ---- Tiny moments ----
  { id: 'huge-pot', src: '2025-11-09-huge-pot', alt: 'Grace cooking at the stove with a very large pot', caption: 'huge pot', date: '2025-11-09' },
  { id: 'office', src: '2025-11-21-office', alt: 'Grace in a long puffer coat and a mask, standing in an office', caption: 'wow so professional at logical dentistry office', date: '2025-11-21' },
  { id: 'cooking-class', src: '2025-11-23-cooking-class', alt: 'Grace in an apron at a cooking class station, looking extremely focused', caption: 'she got hands', date: '2025-11-23' },
  { id: 'running', src: '2025-12-13-running', alt: 'Video: Grace running down a city sidewalk at night', caption: 'video of her running so fast', date: '2025-12-13' },
  { id: 'mixer', src: '2025-12-21-mixer', alt: 'Video: Grace using a stand mixer in the kitchen', caption: 'experiencing the mixer', date: '2025-12-21' },
  { id: 'sourdough-kit', src: '2026-01-24-sourdough-kit', alt: 'Grace holding up a sourdough starter kit with a huge open-mouthed smile', caption: 'beginning of da bread', date: '2026-01-24' },
  { id: 'not-amused', src: '2026-08-29-not-amused', alt: 'Grace holding up a plate of food, looking unimpressed at the camera', caption: 'not looking amused', date: '2026-08-29', location: 'Washington, DC' },

  // ---- One year later ----
  { id: 'anniversary', src: '2026-08-09-anniversary', alt: 'Grace mid-yell with a towel on her head, holding up the framed photo collage she gave me for our anniversary', caption: 'ANNIVERSARY THANK YOU SO MUCH FOR THIS BB GURL', date: '2026-08-09' },

  // ---- Spotlight ----
  { id: 'bundled-up', src: '2026-03-06-bundled-up', alt: 'Grace bundled up in a hood and scarf on a city street, hugging herself against the cold', caption: 'cutie patootie', date: '2026-03-06', location: 'Queens, NY' },
];

const byId = new Map(photos.map((p) => [p.id, p]));

export function getPhoto(id: string): Photo {
  const photo = byId.get(id);
  if (photo) return photo;
  if (import.meta.env.DEV) console.warn(`[photos] No photo with id "${id}" in src/content/photos.ts`);
  return { id, alt: '', placeholder: `MISSING PHOTO “${id}”` };
}
