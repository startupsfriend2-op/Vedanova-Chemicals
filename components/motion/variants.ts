import type { Variants } from 'motion/react';

export const EASE = [0.22, 1, 0.36, 1] as const;
export const STAGGER = 0.1;
export const VIEWPORT = { once: true, amount: 0.25 } as const;

/** Fade and rise. `distance` is in px (20-32 reads best). */
export const rise = (distance = 24, duration = 0.7, delay = 0): Variants => ({
  hidden: { opacity: 0, y: distance },
  show: { opacity: 1, y: 0, transition: { duration, ease: EASE, delay } },
});

/** Same end state, zero duration. Used when the visitor prefers reduced motion. */
export const instant = (variants: Variants): Variants => ({
  ...variants,
  show: { ...(variants.show as object), transition: { duration: 0 } },
});

/** Parent that staggers its children. */
export const group = (stagger = STAGGER, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

/** Headline line inside an overflow mask. */
export const maskLine = (distance = 28): Variants => ({
  hidden: { opacity: 0, y: distance },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
});

export const clipUp: Variants = {
  hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
  show: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 0.9, ease: EASE } },
};

export const settle: Variants = {
  hidden: { scale: 1.06 },
  show: { scale: 1, transition: { duration: 1.1, ease: EASE } },
};

export const drawLine: Variants = {
  hidden: { scaleX: 0, scaleY: 0 },
  show: { scaleX: 1, scaleY: 1, transition: { duration: 1.4, ease: EASE, delay: 0.15 } },
};
