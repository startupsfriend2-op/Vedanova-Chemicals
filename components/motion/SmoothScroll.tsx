'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

let instance: Lenis | null = null;
const REDUCE = '(prefers-reduced-motion: reduce)';

/** Smooth-scrolls to a document y position (instant when reduced motion is on). */
export function scrollToY(y: number) {
  if (instance) instance.scrollTo(y, { duration: 1.4, easing: (t) => 1 - Math.pow(1 - t, 4) });
  else window.scrollTo({ top: y, behavior: window.matchMedia(REDUCE).matches ? 'auto' : 'smooth' });
}

/** Inertial wheel scrolling for the Home page only. Touch and keyboard scrolling stay native. */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia(REDUCE).matches) return;
    const lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true, autoRaf: true });
    instance = lenis;

    // In-page links ease to their target instead of jumping.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element).closest?.('a[href*="#"]') as HTMLAnchorElement | null;
      if (!a || !a.hash || a.origin !== location.origin || a.pathname !== location.pathname) return;
      const el = document.getElementById(decodeURIComponent(a.hash.slice(1)));
      if (!el) return;
      e.preventDefault();
      const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
      scrollToY(el.getBoundingClientRect().top + window.scrollY - margin);
      history.pushState(null, '', a.hash);
    };
    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('click', onClick);
      lenis.destroy();
      if (instance === lenis) instance = null;
    };
  }, []);
  return null;
}
