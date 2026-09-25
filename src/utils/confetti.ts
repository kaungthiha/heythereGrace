import { prefersReducedMotion } from './motion';

const COLORS = ['#F6C85F', '#F27C6B', '#A9CBEA', '#BDA9D4', '#A9B79D', '#EFA6A6', '#F2B49D'];
const SHAPES = [
  'circle(50%)',
  'polygon(0 0, 100% 0, 100% 45%, 0 45%)', // paper strip
  'polygon(50% 0, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)', // star
  'polygon(50% 0, 100% 100%, 0 100%)',
];

/**
 * A small burst of paper confetti from a point on screen. Plain DOM + Web Animations,
 * cleans up after itself, and does nothing for visitors who prefer reduced motion.
 */
export function confettiBurst(x: number, y: number, { count = 36, spread = 1 }: { count?: number; spread?: number } = {}): void {
  if (prefersReducedMotion() || typeof document === 'undefined') return;
  const layer = document.createElement('div');
  layer.setAttribute('aria-hidden', 'true');
  layer.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:60;overflow:hidden';
  document.body.appendChild(layer);

  const animations: Animation[] = [];
  for (let i = 0; i < count; i++) {
    const bit = document.createElement('span');
    const size = 7 + Math.random() * 9;
    bit.style.cssText = `position:absolute;left:${x}px;top:${y}px;width:${size}px;height:${size}px;background:${
      COLORS[i % COLORS.length]
    };clip-path:${SHAPES[i % SHAPES.length]};will-change:transform,opacity`;
    layer.appendChild(bit);

    const angle = Math.random() * Math.PI * 2;
    const dist = (90 + Math.random() * 180) * spread;
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist - 120 * spread;
    const spin = (Math.random() - 0.5) * 900;
    animations.push(
      bit.animate(
        [
          { transform: 'translate(-50%,-50%) scale(.4) rotate(0deg)', opacity: 1 },
          { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(1) rotate(${spin / 2}deg)`, opacity: 1, offset: 0.45 },
          { transform: `translate(calc(-50% + ${dx * 1.15}px), calc(-50% + ${dy + 260}px)) scale(.9) rotate(${spin}deg)`, opacity: 0 },
        ],
        { duration: 1300 + Math.random() * 700, easing: 'cubic-bezier(.2,.7,.3,1)', fill: 'forwards' },
      ),
    );
  }
  Promise.all(animations.map((a) => a.finished)).finally(() => layer.remove());
}

export function confettiFrom(el: Element | null, options?: { count?: number; spread?: number }): void {
  if (!el) return;
  const r = el.getBoundingClientRect();
  confettiBurst(r.left + r.width / 2, r.top + r.height / 2, options);
}
