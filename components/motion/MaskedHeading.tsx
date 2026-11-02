'use client';

import type { ReactNode } from 'react';
import { m, useReducedMotion } from 'motion/react';
import { group, instant, maskLine, VIEWPORT } from './variants';
import { useInGroup } from './RevealGroup';

type Props = {
  as?: 'h1' | 'h2';
  /** One entry per visual line; each rises through its own mask. */
  lines: ReactNode[];
  className?: string;
  immediate?: boolean;
  delay?: number;
};

export default function MaskedHeading({ as = 'h1', lines, className, immediate = false, delay = 0 }: Props) {
  const reduce = useReducedMotion();
  const inGroup = useInGroup();
  const Tag = (as === 'h1' ? m.h1 : m.h2) as typeof m.h1;
  const parent = reduce ? instant(group(0.12, delay)) : group(0.12, delay);
  const line = reduce ? instant(maskLine()) : maskLine();
  const trigger = inGroup ? {} : immediate ? { initial: 'hidden', animate: 'show' } : { initial: 'hidden', whileInView: 'show', viewport: VIEWPORT };
  return (
    <Tag className={className} variants={parent} {...trigger}>
      {lines.map((content, i) => (
        <span className="mh-mask" key={i}>
          <m.span className="mh-line" data-reveal variants={line}>{content}</m.span>
        </span>
      ))}
    </Tag>
  );
}
