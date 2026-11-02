'use client';

import type { ReactNode } from 'react';
import { m, useReducedMotion } from 'motion/react';
import { instant, rise, VIEWPORT } from './variants';
import { useInGroup } from './RevealGroup';

type Props = {
  as?: 'div' | 'p' | 'li' | 'span' | 'h2' | 'h3' | 'article' | 'ul';
  distance?: number;
  delay?: number;
  immediate?: boolean;
  className?: string;
  id?: string;
  dataIndex?: number;
  children: ReactNode;
};

/** Fade and rise. Inside a RevealGroup it follows the group's stagger. */
export default function Reveal({ as = 'div', distance = 24, delay = 0, immediate = false, className, id, dataIndex, children }: Props) {
  const reduce = useReducedMotion();
  const inGroup = useInGroup();
  const Comp = m[as] as typeof m.div;
  const base = rise(distance, 0.7, inGroup ? 0 : delay);
  const variants = reduce ? instant(base) : base;
  const trigger = inGroup ? {} : immediate ? { initial: 'hidden', animate: 'show' } : { initial: 'hidden', whileInView: 'show', viewport: VIEWPORT };
  return <Comp className={className} id={id} data-i={dataIndex} data-reveal variants={variants} {...trigger}>{children}</Comp>;
}
