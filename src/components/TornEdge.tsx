/**
 * A torn-paper edge that sits on top of a section, in that section's background color,
 * so each chapter looks like a new sheet of paper laid over the last.
 */
const EDGES = [
  'M0 40V18l40 6 38-10 44 8 36-12 52 14 40-9 46 11 38-13 50 12 40-8 44 10 40-12 32 8V40Z',
  'M0 40V22l34-10 50 12 30-8 56 9 36-14 48 13 44-6 40 10 52-12 38 9 46-7 36 10 30-8V40Z',
  'M0 40V14l46 12 40-8 36 10 52-14 34 8 48 6 38-12 44 10 46-9 40 12 36-8 50 6 30-4V40Z',
];

export function TornEdge({ variant = 0, flip = false }: { variant?: number; flip?: boolean }) {
  return (
    <svg
      className="torn-edge"
      viewBox="0 0 560 40"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
    >
      <path d={EDGES[variant % EDGES.length]} />
    </svg>
  );
}
