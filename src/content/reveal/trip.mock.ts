import type { TripRevealContent } from '../types';

/**
 * FAKE trip used to test the reveal (`npm run dev:mock-reveal`).
 * It is also the template for the real one: copy this file to trip.ts (gitignored) and edit.
 * Every optional field is filled in here so you can see how each one renders.
 */
const tripReveal: TripRevealContent = {
  destination: {
    name: 'THE MOON',
    tagline: 'Secret test destination',
    region: 'Low lunar orbit',
    // image: { src: heroImage, alt: 'Describe the photo', width: 1600, height: 1067 },
  },
  postscript: 'P.S. you owe Kaung 100 bucks.',
  planIntro: 'Here’s the plan.',
  departure: {
    time: 'Friday, 8:00 AM',
    from: 'Home',
    driveTime: 'About 3 days (it’s the moon)',
    note: '[KT: departure note]',
  },
  days: [
    {
      date: '2026-10-30',
      title: 'The Escape',
      subtitle: '[KT: day subtitle]',
      items: [
        { time: '8:00 AM', title: 'Liftoff', description: '[KT: description]', travelTime: '3 days', icon: 'car' },
        { time: '1:00 PM', title: 'Lunch somewhere', location: '[KT: place]', reservation: '[KT: reservation]', icon: 'cake' },
        { time: 'Evening', title: 'Check in', note: '[KT: note]', icon: 'tent' },
      ],
    },
    {
      date: '2026-10-31',
      title: 'Adventure',
      items: [
        { time: 'Morning', title: 'A long walk', description: '[KT: description]', icon: 'mountain', link: 'https://example.com' },
        { time: 'Afternoon', title: '[KT: activity]', icon: 'compass' },
        { time: 'Night', title: '[KT: activity]', icon: 'star' },
      ],
    },
    {
      date: '2026-11-01',
      title: 'Slow morning, drive home',
      items: [{ time: 'Late', title: 'Breakfast', icon: 'sun' }, { title: 'Home', icon: 'car' }],
    },
  ],
  lodging: {
    name: 'Tranquility Base',
    address: 'Sea of Tranquility',
    checkIn: 'Fri 4:00 PM',
    checkOut: 'Sun 11:00 AM',
    note: '[KT: lodging note]',
  },
  packing: ['Warm layers', 'Comfortable shoes', 'Something cozy for the evening', '[KT: packing item]'],
  weather: '[KT: weather note]',
  notes: [
    { title: 'Food', text: '[KT: food plans]', icon: 'cake' },
    { title: 'What to wear', text: '[KT: clothing suggestions]', icon: 'suitcase' },
  ],
  map: { label: 'Directions', href: 'https://example.com' },
};

export default tripReveal;
