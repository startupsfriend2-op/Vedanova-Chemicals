'use client';

import { useRef, type ReactNode } from 'react';
import { m, useReducedMotion, useScroll, useTransform } from 'motion/react';

type Props = {
  as?: 'div' | 'li';
  className?: string;
  /** How far (px) the block rises while it arrives. */
  distance?: number;
  children: ReactNode;
};

/**
 * Scroll-linked reveal: the block fades and rises in step with the scroll position,
 * arriving as its top edge moves from 95% to 50% of the viewport. Reversible as you scroll back.
 * `data-reveal` makes the no-JS and reduced-motion CSS show the final state.
 */
export default function ScrollReveal({ as = 'div', className, distance = 40, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.95', 'start 0.5'] });
  const opacity = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0.12, 1]);
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [distance, 0]);
  const style = { opacity, y };

  if (as === 'li') {
    return <m.li ref={ref as never} className={className} style={style} data-reveal>{children}</m.li>;
  }
  return <m.div ref={ref} className={className} style={style} data-reveal>{children}</m.div>;
}
