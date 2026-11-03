'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { m, useMotionValueEvent, useScroll, useSpring, useTransform } from 'motion/react';
import { Reveal, RevealGroup } from '@/components/motion';

const steps = [
  ['01', 'Share your requirement', 'Tell us the material, grade and intended application.'],
  ['02', 'Specify the details', 'Include approximate quantity and delivery location.'],
  ['03', 'Discuss sourcing', 'Our team can review the request and respond with next steps.'],
];

// Scroll progress at which each step is reached. The line between two steps fills across its own range.
const REACH = [0, 0.33, 0.66];

export default function Process() {
  const pinRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: pinRef, offset: ['start start', 'end end'] });
  const p = useSpring(scrollYProgress, { stiffness: 110, damping: 24, restDelta: 0.001 });

  const seg0 = useTransform(p, [REACH[0], REACH[1]], [0, 1], { clamp: true });
  const seg1 = useTransform(p, [REACH[1], REACH[2]], [0, 1], { clamp: true });
  const segments = [seg0, seg1];

  const [active, setActive] = useState(0);
  useMotionValueEvent(p, 'change', (v) => {
    setActive(REACH.reduce((n, at, k) => (v >= at - 0.001 ? k : n), 0));
  });

  return (
    <section ref={pinRef} className="h-process-pin" id="process" aria-labelledby="process-title">
      <div className="h-process-sticky">
        <div className="container h-process-grid">
          <div className="h-process-intro">
            <RevealGroup>
              <Reveal><p className="label"><i className="label-rule" />How to get started</p></Reveal>
              <Reveal as="h2"><span id="process-title">A straightforward way to work together.</span></Reveal>
              <Reveal as="p" className="h-process-note">From the first enquiry to the next conversation, we keep the focus on your actual requirements.</Reveal>
              <Reveal><Link href="/contact#enquiry" className="h-textlink">Start an enquiry <ArrowRight className="arrow-r" size={16} aria-hidden="true" /></Link></Reveal>
            </RevealGroup>
            {/* The large index follows the scroll. Keyed on the step so each change plays the entrance again. */}
            <div className="h-chap" aria-hidden="true">
              <div key={active} className="h-chap-step">
                <span className="h-chap-no">{steps[active][0]}</span>
                <span className="h-chap-title">{steps[active][1]}</span>
              </div>
            </div>
          </div>

          <ol className="h-process-list">
            {steps.map(([no, title, text], i) => (
              <li key={no} data-state={i < active ? 'done' : i === active ? 'current' : 'upcoming'}>
                <span className="h-proc-dot" aria-hidden="true" />
                {i < steps.length - 1 && (
                  <m.span className="h-proc-seg" aria-hidden="true" style={{ scaleY: segments[i] }} />
                )}
                <span className="h-idx">{no}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
