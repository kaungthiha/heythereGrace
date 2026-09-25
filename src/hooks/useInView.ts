import { useEffect, useRef } from 'react';

/**
 * Adds the class `is-in` to an element the first time it scrolls into view (and never removes it),
 * which triggers the CSS entrance animations. One shared IntersectionObserver for the whole page.
 * Without IntersectionObserver, everything is simply shown.
 */
let observer: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver | null {
  if (typeof IntersectionObserver === 'undefined') return null;
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          observer?.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.01 },
  );
  return observer;
}

export function useInView<T extends Element>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = getObserver();
    if (!obs) {
      el.classList.add('is-in');
      return;
    }
    obs.observe(el);
    return () => obs.unobserve(el);
  }, []);
  return ref;
}
