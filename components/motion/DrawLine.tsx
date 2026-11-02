'use client';

import { m, useReducedMotion } from 'motion/react';
import { drawLine, instant } from './variants';

/**
 * A rule that draws from its start edge. Scales on X and Y so one element serves a horizontal or vertical line.
 * It has no trigger of its own: place it inside a RevealGroup, which observes the (unscaled) group instead.
 */
export default function DrawLine({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  return <m.span className={className} data-reveal aria-hidden="true" variants={reduce ? instant(drawLine) : drawLine} />;
}
