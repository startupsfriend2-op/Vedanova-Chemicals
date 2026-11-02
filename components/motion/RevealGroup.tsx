'use client';

import { createContext, useContext, type ReactNode } from 'react';
import { m, useReducedMotion } from 'motion/react';
import { group, instant, STAGGER, VIEWPORT } from './variants';

const GroupContext = createContext(false);
export const useInGroup = () => useContext(GroupContext);

type Props = {
  as?: 'div' | 'ul' | 'ol' | 'section';
  stagger?: number;
  delay?: number;
  /** Play on mount instead of when scrolled into view (hero). */
  immediate?: boolean;
  className?: string;
  children: ReactNode;
};

/** Staggers any Reveal, MaskedHeading or ImageReveal placed inside it. */
export default function RevealGroup({ as = 'div', stagger = STAGGER, delay = 0, immediate = false, className, children }: Props) {
  const reduce = useReducedMotion();
  const nested = useInGroup();
  const Comp = m[as] as typeof m.div;
  const base = group(stagger, delay);
  const variants = reduce ? instant(base) : base;
  const trigger = nested ? {} : immediate ? { initial: 'hidden', animate: 'show' } : { initial: 'hidden', whileInView: 'show', viewport: VIEWPORT };
  return (
    <GroupContext.Provider value>
      <Comp className={className} variants={variants} {...trigger}>{children}</Comp>
    </GroupContext.Provider>
  );
}
