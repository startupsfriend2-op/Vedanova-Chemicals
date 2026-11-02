'use client';

import { useSyncExternalStore, type ReactNode } from 'react';
import { m, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { EASE } from './variants';

const DESKTOP = '(min-width: 1024px) and (hover: hover)';
const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(DESKTOP);
  mq.addEventListener('change', cb);
  return () => mq.removeEventListener('change', cb);
};

type Props = {
  /** Max drift in px as the page scrolls (desktop only). */
  distance?: number;
  /** Start zoomed in and settle to 1 on mount. */
  introScale?: number;
  className?: string;
  children: ReactNode;
};

export default function Parallax({ distance = 40, introScale, className, children }: Props) {
  const reduce = useReducedMotion();
  const desktop = useSyncExternalStore(subscribe, () => window.matchMedia(DESKTOP).matches, () => false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, distance]);
  return (
    <m.div className={className} data-reveal style={desktop && !reduce ? { y } : undefined}>
      <m.div
        className="reveal-fill"
        data-reveal
        initial={introScale ? { scale: introScale } : false}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease: EASE }}
      >
        {children}
      </m.div>
    </m.div>
  );
}
