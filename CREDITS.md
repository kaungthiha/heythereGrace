# Credits & copyrights

This is a personal, non-commercial birthday site. Everything below that isn't ours belongs to its
owners. Nothing here grants anyone else a license to reuse it.

## Music

- **The Kiffness × NumNum Cat (Live Looping Balkan Remix)**, by The Kiffness.
  © The Kiffness and the respective rights holders. All rights reserved. The NumNum Cat source
  footage belongs to its original creator(s).
  Used as the background soundtrack of a private birthday gift. It is not licensed by us for
  redistribution or reuse. File: `public/audio/soundtrack.mp3`. If a rights holder objects, delete the
  file and set `siteConfig.soundtrack = null` in `src/content/site.ts`.

## Photos & videos

- Everything in `public/images/` and `public/videos/` is © Kaung and Grace. These are personal photos
  and clips. All rights reserved; please don't reuse them.
- The Ohiopyle waterfall photo shown in the reveal (`src/content/reveal/assets/destination.webp`) was
  found online; its source wasn't recorded. © its photographer, all rights reserved. If you know who
  took it, add `credit` to `destination.image` in `src/content/reveal/trip.ts` so it shows under the photo.
- The cabin collage (`src/content/reveal/assets/cabin.webp`) is a screenshot of the rental listing's
  photos. © the host / listing platform; credited under the photo.
- The route map (`src/content/reveal/assets/route.webp`) is a Google Maps screenshot. Map data
  © Google; credited under the map.

## Illustrations

- The KT mascot, scrapbook and trip stickers (`assets/` sheets → `public/assets/`) were generated for
  this project with ChatGPT image generation. They contain no third-party artwork or characters.
- Line doodles (`src/components/Doodle.tsx`) are original SVG drawn for this site.

## Fonts

All self-hosted via [Fontsource](https://fontsource.org), under the
[SIL Open Font License 1.1](https://openfontlicense.org):

- **Fraunces**, by Undercase Type
- **Figtree**, by Erik Kennedy
- **Caveat**, by Impallari Type

## Software

Shipped in the page:

- **React** and **React DOM**: MIT License, © Meta Platforms, Inc. and affiliates.

Build and development tools only (never sent to visitors):

- **Vite**, **Vitest**, **@vitejs/plugin-react**, **Testing Library**: MIT License
- **sharp**: Apache License 2.0 (image resizing)
- **ffmpeg-static** / **FFmpeg**: GPL-3.0-or-later (converts videos locally; the FFmpeg binary is not
  distributed with the site)

Full license texts are in each package's folder under `node_modules/`.
