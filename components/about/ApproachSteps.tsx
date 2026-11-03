'use client';

import { useRef } from 'react';
import { m, useScroll, useTransform } from 'motion/react';
import { ScrollReveal } from '@/components/motion';

type Step = { no: string; title: string; text: string };

/** Numbered steps with a hairline that fills as the reader scrolls through the list. */
export default function ApproachSteps({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.75', 'end 0.6'] });
  const fill = useTransform(scrollYProgress, [0, 1], [0, 1], { clamp: true });

  return (
    <div className="a-steps">
      <span className="a-steps-track" aria-hidden="true">
        <m.span className="a-steps-fill" style={{ scaleY: fill }} />
      </span>
      <ol ref={ref} className="a-steps-list">
        {steps.map((s) => (
          <ScrollReveal as="li" key={s.no} className="a-step">
            <span className="a-step-no">{s.no}</span>
            <div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          </ScrollReveal>
        ))}
      </ol>
    </div>
  );
}
