import { useEffect, useRef, useState } from 'react';
import { scrollToId } from '../utils/motion';
import './ChapterNav.css';

export type NavChapter = { id: string; label: string };

/**
 * A tiny chapter indicator ("03 · You") plus a thread-and-star progress line.
 * Tapping the indicator opens a small chapter list.
 */
export function ChapterNav({ chapters, hidden = false }: { chapters: NavChapter[]; hidden?: boolean }) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      progressRef.current?.style.setProperty('--progress', String(progress));

      const line = window.innerHeight * 0.4;
      let current = 0;
      chapters.forEach((ch, i) => {
        const el = document.getElementById(ch.id);
        if (el && el.getBoundingClientRect().top <= line) current = i;
      });
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [chapters]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onClick);
    };
  }, [open]);

  const num = (i: number) => String(i + 1).padStart(2, '0');

  return (
    <>
      <div className={`progress ${hidden ? 'is-hidden' : ''}`} ref={progressRef} aria-hidden="true">
        <span className="progress__thread" />
        <span className="progress__star">★</span>
      </div>
      <nav ref={rootRef} className={`chapter-nav ${hidden ? 'is-hidden' : ''}`} aria-label="Chapters">
        <button
          type="button"
          className="chapter-nav__toggle"
          aria-expanded={open}
          aria-controls="chapter-nav-list"
          onClick={() => setOpen((o) => !o)}
          tabIndex={hidden ? -1 : undefined}
        >
          <span className="chapter-nav__num">{num(active)}</span>
          <span className="chapter-nav__label">{chapters[active]?.label}</span>
          <span className="chapter-nav__caret" aria-hidden="true">
            ▾
          </span>
        </button>
        {open && (
          <ol id="chapter-nav-list" className="chapter-nav__list" role="list">
            {chapters.map((ch, i) => (
              <li key={ch.id}>
                <a
                  href={`#${ch.id}`}
                  aria-current={i === active ? 'true' : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    setOpen(false);
                    scrollToId(ch.id);
                  }}
                >
                  <span className="chapter-nav__num">{num(i)}</span> {ch.label}
                </a>
              </li>
            ))}
          </ol>
        )}
      </nav>
    </>
  );
}
