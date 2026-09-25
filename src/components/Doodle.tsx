import type { CSSProperties, ReactNode } from 'react';

/**
 * Hand-drawn doodles as tiny inline SVGs. They use currentColor for the line, so set `color`
 * to recolor, and `fill` to fill the closed shapes. Decorative: hidden from screen readers.
 * Add a new one by adding an entry below (48×48 viewBox unless noted).
 */
type DoodleDef = { viewBox?: string; body: ReactNode };

const P = ({ d, fill }: { d: string; fill?: boolean }) => <path d={d} pathLength={1} className={fill ? 'df' : undefined} />;

const DOODLES = {
  star: { body: <P fill d="M24 5c1.6 4.2 3.4 8.4 5.6 12.4 4.4.4 8.8.6 13.2 1.3-3.2 3-6.6 5.9-10 8.8 1 4.4 2.2 8.7 3 13.1-3.9-2.2-7.8-4.5-11.8-6.6-4 2.1-7.8 4.5-11.8 6.5.9-4.4 2-8.7 3-13-3.4-2.9-6.8-5.8-10-8.9 4.4-.6 8.8-.9 13.2-1.3C20.6 13.4 22.4 9.2 24 5Z" /> },
  sparkle: { body: <P fill d="M24 4c1 13 7 19 20 20-13 1-19 7-20 20-1-13-7-19-20-20 13-1 19-7 20-20Z" /> },
  heart: { body: <P fill d="M24 41C10 31 5 23 7 15c2-7 11-9 17-1 6-8 15-6 17 1 2 8-3 16-17 26Z" /> },
  arrow: {
    body: (
      <>
        <P d="M5 14c12-8 30-5 34 16" />
        <P d="M31 26.5l8 4.5 3.5-8.5" />
      </>
    ),
  },
  squiggle: { viewBox: '0 0 96 24', body: <P d="M3 14c6-10 10-10 13-2s8 8 11 0 8-8 11 0 8 8 11 0 8-8 11 0 8 8 11 0 8-8 12 2" /> },
  underline: { viewBox: '0 0 200 20', body: <P d="M4 13c40-7 80-7 120-4 22 1.6 45 1 72-3M24 17c34-3 70-3 110-1" /> },
  circle: { viewBox: '0 0 120 60', body: <P d="M18 38C8 20 40 6 72 7c30 1 46 14 40 28-7 16-44 21-72 17C18 49 4 38 20 22c7-7 18-11 28-12" /> },
  cloud: { body: <P fill d="M13 36c-7 0-8-9-2-11-1-8 9-11 13-5 3-7 14-6 13 3 7 0 7 13-1 13H13Z" /> },
  flower: {
    body: (
      <>
        {[0, 72, 144, 216, 288].map((r) => (
          <ellipse key={r} cx="24" cy="13" rx="6" ry="9" transform={`rotate(${r} 24 24)`} pathLength={1} className="df" />
        ))}
        <circle cx="24" cy="24" r="4.5" pathLength={1} />
      </>
    ),
  },
  sun: {
    body: (
      <>
        <circle cx="24" cy="24" r="8" pathLength={1} className="df" />
        <P d="M24 4v6M24 38v6M4 24h6M38 24h6M10 10l4 4M34 34l4 4M38 10l-4 4M14 34l-4 4" />
      </>
    ),
  },
  cake: {
    body: (
      <>
        <P fill d="M10 38V25h28v13H10Z" />
        <P d="M10 29c2.3 3 4.7 3 7 0 2.3 3 4.7 3 7 0 2.3 3 4.7 3 7 0 2.3 3 4.7 3 7 0M5 41h38M24 25v-9" />
        <P fill d="M24 13c-3-3-1-7 0-8 1 2 3 5 0 8Z" />
      </>
    ),
  },
  balloon: {
    body: (
      <>
        <ellipse cx="24" cy="17" rx="11" ry="13" pathLength={1} className="df" />
        <P d="M22 30h4l-2 3-2-3ZM24 33c-4 4 4 7 0 12" />
      </>
    ),
  },
  swirl: { body: <P d="M24 24c0-3 4-3 4 0 0 5-8 5-8 0 0-7 12-8 12 0 0 9-16 10-16 0 0-11 20-12 20 0" /> },
  plane: { body: <P fill d="M4 22 44 6 32 42 22 28 4 22Zm18 6L44 6M22 28l-2 10 6-6" /> },
  car: {
    body: (
      <>
        <P fill d="M5 33v-7c0-2 2-3 4-3l5-1 5-7c1-1.3 2.3-2 4-2h10c2 0 3 1 4 2l4 7c2 0 3 2 3 4v7H5Z" />
        <P d="M20 22l3-6h6v6h-9Zm12 0v-6h2l4 6h-6Z" />
        <circle cx="14" cy="34" r="4" pathLength={1} className="dk" />
        <circle cx="35" cy="34" r="4" pathLength={1} className="dk" />
      </>
    ),
  },
  suitcase: {
    body: (
      <>
        <rect x="8" y="16" width="32" height="25" rx="4" pathLength={1} className="df" />
        <P d="M18 16v-5c0-2 1-3 3-3h6c2 0 3 1 3 3v5M16 16v25M32 16v25" />
      </>
    ),
  },
  pine: { body: <P fill d="M24 4l9 13h-5l8 11h-6l8 11H10l8-11h-6l8-11h-5l9-13Zm0 35v6" /> },
  tent: { body: <P fill d="M4 40 24 8l20 32H4Zm20-32v32m-6 0 6-12 6 12" /> },
  mountain: { body: <P fill d="M3 40 17 18l8 10 7-14 13 26H3Zm25-20 4-6 4 7" /> },
  compass: {
    body: (
      <>
        <circle cx="24" cy="24" r="18" pathLength={1} className="df" />
        <P d="M24 10l4 14-4 14-4-14 4-14Z" />
        <P d="M24 3v3M24 42v3M3 24h3M42 24h3" />
      </>
    ),
  },
  sign: { body: <P fill d="M24 22v24M8 8h28l6 7-6 7H8V8Z" /> },
  camera: {
    body: (
      <>
        <rect x="6" y="14" width="36" height="26" rx="5" pathLength={1} className="df" />
        <circle cx="24" cy="27" r="7" pathLength={1} />
        <P d="M16 14l3-5h10l3 5M35 19h2" />
      </>
    ),
  },
  pin: {
    body: (
      <>
        <P fill d="M24 44S10 29 10 19c0-8 6-14 14-14s14 6 14 14c0 10-14 25-14 25Z" />
        <circle cx="24" cy="19" r="5" pathLength={1} />
      </>
    ),
  },
  question: {
    body: (
      <>
        <P d="M15 16c0-9 18-10 18 0 0 8-9 7-9 15" />
        <circle cx="24" cy="39" r="2" pathLength={1} className="dk" />
      </>
    ),
  },
  gift: {
    body: (
      <>
        <rect x="8" y="20" width="32" height="22" rx="2" pathLength={1} className="df" />
        <rect x="6" y="14" width="36" height="7" rx="2" pathLength={1} className="df" />
        <P d="M24 14v28M24 14c-6-10-14-4 0 0 14-4 6-10 0 0" />
      </>
    ),
  },
  moon: { body: <P fill d="M30 6a18 18 0 1 0 12 26A15 15 0 0 1 30 6Z" /> },
} satisfies Record<string, DoodleDef>;

export type DoodleName = keyof typeof DOODLES;
export const doodleNames = Object.keys(DOODLES) as DoodleName[];

type Props = {
  name: DoodleName | (string & {});
  size?: number | string;
  /** Fill color for closed shapes (default: none). */
  fill?: string;
  /** Line width in viewBox units. */
  weight?: number;
  /** Draw the lines on when scrolled into view. */
  draw?: boolean;
  className?: string;
  style?: CSSProperties;
};

export function Doodle({ name, size = 48, fill, weight = 2.6, draw = false, className = '', style }: Props) {
  const def: DoodleDef | undefined = (DOODLES as Record<string, DoodleDef>)[name];
  if (!def) return null;
  return (
    <svg
      viewBox={def.viewBox ?? '0 0 48 48'}
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
      className={`doodle ${draw ? 'doodle--draw' : ''} ${className}`}
      style={{ '--doodle-fill': fill ?? 'none', ...style } as CSSProperties}
      fill="none"
      stroke="currentColor"
      strokeWidth={weight}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {def.body}
    </svg>
  );
}
