'use client';

import { m } from 'motion/react';
import { EASE, VIEWPORT } from '@/components/motion';

/** A thin divider that expands from left to right as it enters the screen. */
export default function Rule() {
  return (
    <m.span
      className="i-rule"
      aria-hidden="true"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.85, ease: EASE }}
    />
  );
}
