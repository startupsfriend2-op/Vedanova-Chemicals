'use client';

import { useRef, useSyncExternalStore } from 'react';
import Image from 'next/image';
import { m, useScroll, useSpring, useTransform, type MotionValue } from 'motion/react';
import { EASE, MaskedHeading, Reveal, RevealGroup, VIEWPORT } from '@/components/motion';
import Ticks from '@/components/home/Ticks';

// The pinned scene needs a wide screen, a fine pointer and motion. Everything else gets the stacked version.
const QUERY = '(min-width: 1024px) and (hover: hover) and (prefers-reduced-motion: no-preference)';
const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener('change', cb);
  return () => mq.removeEventListener('change', cb);
};

const heading = [<span id="who-title" key="a">One Focus.</span>, <span key="b" className="a-soft">Better Business Connections.</span>];
const lead = 'Based in Vadodara, Gujarat, Vedanova Chemicals Private Limited is engaged in trading and sourcing industrial solvents, recovered solvents, and petrochemical products.';
const body = 'Our approach begins with understanding each enquiry, including the required material, relevant specifications, quantity, and intended application.';
const specRows = ['Industrial solvents', 'Recovered solvents', 'Petrochemical products'];
const caption = 'Fig. 01 — Illustrative industrial photography';
const alt = 'Industrial refinery with storage tanks and metal pipes under a warm sky (illustrative photograph)';

export default function WhoScene() {
  const pinned = useSyncExternalStore(subscribe, () => window.matchMedia(QUERY).matches, () => false);
  return pinned ? <Pinned /> : <Stacked />;
}

/** One scope line: fades and rises as the scroll passes `start`. */
function useRowIn(p: MotionValue<number>, start: number) {
  return {
    opacity: useTransform(p, [start, start + 0.12], [0, 1]),
    y: useTransform(p, [start, start + 0.12], [18, 0]),
  };
}

/** Desktop: the photo opens from a narrow band to full width as you scroll, then the panel rises over it and the scope lines follow in turn. */
function Pinned() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const p = useSpring(scrollYProgress, { stiffness: 140, damping: 32, restDelta: 0.001 });

  const frame = useTransform(p, [0, 0.5], ['inset(0% 22% 0% 22% round 10px)', 'inset(0% 0% 0% 0% round 0px)']);
  const zoom = useTransform(p, [0, 0.5], [1.22, 1]);
  const panelY = useTransform(p, [0.42, 0.66], [56, 0]);
  const panelOpacity = useTransform(p, [0.42, 0.6], [0, 1]);
  const r0 = useRowIn(p, 0.6);
  const r1 = useRowIn(p, 0.68);
  const r2 = useRowIn(p, 0.76);
  const rows = [r0, r1, r2];

  return (
    <section ref={ref} id="who" className="a-who-pin" aria-labelledby="who-title">
      <div className="a-who-stage">
        <div className="container">
          <Reveal immediate><p className="a-label">01 / Who we are</p></Reveal>
          <MaskedHeading as="h2" immediate className="a-h2" lines={heading} />
        </div>
        <div className="container">
          <m.figure className="a-who-frame" style={{ clipPath: frame }}>
            <m.div className="a-who-img" style={{ scale: zoom }}>
              <Image src="/images/about/who-refinery.jpg" alt={alt} fill sizes="(min-width: 1024px) 1140px, 100vw" />
            </m.div>
            <Ticks />
            <m.div className="a-who-panel" style={{ y: panelY, opacity: panelOpacity }}>
              <p className="a-lead-text">{lead}</p>
              <p className="a-body">{body}</p>
              <ul className="a-spec">
                {specRows.map((row, i) => (
                  <m.li key={row} style={rows[i]}>
                    <span>{row}</span>
                    <span className="a-spec-no">0{i + 1}</span>
                  </m.li>
                ))}
              </ul>
            </m.div>
          </m.figure>
          <p className="a-caption">{caption}</p>
        </div>
      </div>
    </section>
  );
}

/** Phones, tablets, reduced motion and no-JS: the same content, stacked, revealing once as it enters the viewport. */
function Stacked() {
  const photoIn = { hidden: { opacity: 0, scale: 1.08 }, show: { opacity: 1, scale: 1, transition: { duration: 1.4, ease: EASE } } };
  return (
    <section id="who" className="a-section a-who" aria-labelledby="who-title">
      <div className="container">
        <RevealGroup className="a-who-head">
          <Reveal><p className="a-label">01 / Who we are</p></Reveal>
          <MaskedHeading as="h2" className="a-h2" lines={heading} />
        </RevealGroup>
        <figure className="a-who-band">
          <m.div className="a-who-frame" data-reveal initial="hidden" whileInView="show" viewport={VIEWPORT} variants={photoIn}>
            <div className="a-who-img">
              <Image src="/images/about/who-refinery.jpg" alt={alt} fill sizes="100vw" />
            </div>
            <Ticks />
          </m.div>
          <figcaption className="a-caption">{caption}</figcaption>
        </figure>
        <div className="a-who-cols">
          <RevealGroup className="a-who-lead" stagger={0.1}>
            <Reveal as="p" className="a-lead-text">{lead}</Reveal>
          </RevealGroup>
          <RevealGroup className="a-who-side" stagger={0.1}>
            <Reveal as="p" className="a-body">{body}</Reveal>
            <ul className="a-spec">
              {specRows.map((row, i) => (
                <Reveal as="li" key={row}><span>{row}</span><span className="a-spec-no">0{i + 1}</span></Reveal>
              ))}
            </ul>
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
