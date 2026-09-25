import type { CSSProperties, ReactNode } from 'react';

/** Text on a scrap of torn paper (blue or kraft), like a taped chapter label. */
export function PaperLabel({ children, tone = 'blue', rotate = -2, className = '' }: { children: ReactNode; tone?: 'blue' | 'kraft'; rotate?: number; className?: string }) {
  return (
    <span className={`paper-label ${className}`} style={{ '--r': `${rotate}deg` } as CSSProperties}>
      <img className="paper-label__bg" src={`${import.meta.env.BASE_URL}assets/scrapbook/paper-${tone}.webp`} alt="" aria-hidden="true" loading="lazy" decoding="async" />
      <span>{children}</span>
    </span>
  );
}
