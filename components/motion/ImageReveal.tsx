'use client';

import type { ReactNode } from 'react';
import { m, useReducedMotion } from 'motion/react';
import { clipUp, instant, settle, VIEWPORT } from './variants';
import { useInGroup } from './RevealGroup';

type Props = { className?: string; children: ReactNode; immediate?: boolean };

/**
 * Clip-path wipe with a slight settle of the image inside. Give `className` its size.
 * The observed element is an unclipped wrapper: a fully clipped element never reports as in view.
 */
export default function ImageReveal({ className, children, immediate = false }: Props) {
  const reduce = useReducedMotion();
  const inGroup = useInGroup();
  const clip = reduce ? instant(clipUp) : clipUp;
  const scale = reduce ? instant(settle) : settle;
  const trigger = inGroup ? {} : immediate ? { initial: 'hidden', animate: 'show' } : { initial: 'hidden', whileInView: 'show', viewport: VIEWPORT };
  return (
    <m.div className={className} variants={{ hidden: {}, show: {} }} {...trigger}>
      <m.div className="reveal-fill" data-reveal variants={clip}>
        <m.div className="reveal-fill" data-reveal variants={scale}>{children}</m.div>
      </m.div>
    </m.div>
  );
}
