'use client';

import { m } from 'motion/react';
import { EASE, VIEWPORT } from '@/components/motion';

/** A fine horizontal line that extends across as it enters the screen. */
export default function Rule() {
  return (
    <m.span
      className="p-rule-line"
      aria-hidden="true"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.9, ease: EASE }}
    />
  );
}
