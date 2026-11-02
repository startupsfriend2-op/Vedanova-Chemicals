'use client';

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { easeInOut, m, useMotionValueEvent, useScroll, useTransform } from 'motion/react';
import { scrollToY } from '@/components/motion';
import { photo, type PhotoName } from '@/lib/photos';
import Ticks from './Ticks';

export type PinnedItem = {
  slug: string; no: string; title: string; tag: string; short: string; details: string;
  photo: PhotoName; alt: string; position: string;
};

// The scroll-driven scene needs a wide screen and motion; everything else gets the plain card grid.
const QUERY = '(min-width: 1024px) and (prefers-reduced-motion: no-preference)';
const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener('change', cb);
  return () => mq.removeEventListener('change', cb);
};

/** Fraction of the scroll range spent on the opening scene before the first card is fully in. */
const INTRO = 0.22;
/** A move between cards lasts this fraction of a dwell. */
const MOVE = 0.7;

export default function PinnedOfferings({ items, fallback }: { items: PinnedItem[]; fallback: ReactNode }) {
  const on = useSyncExternalStore(subscribe, () => window.matchMedia(QUERY).matches, () => false);
  return on ? <Scene items={items} /> : fallback;
}

function Scene({ items }: { items: PinnedItem[] }) {
  const n = items.length;
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(-1);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  // Timeline: opening scene, then for each card a dwell, with an eased move between neighbours.
  const dwell = (1 - INTRO) / (n + (n - 1) * MOVE);
  const move = dwell * MOVE;
  const centre = (k: number) => INTRO + k * (dwell + move) + dwell / 2;
  const stops = [0];
  const xs = ['0%'];
  for (let k = 0, t = INTRO; k < n; k++, t += dwell + move) {
    stops.push(t, t + dwell);
    xs.push(`${(-k * 100) / n}%`, `${(-k * 100) / n}%`);
  }

  const x = useTransform(p, stops, xs, { ease: easeInOut });
  const trackScale = useTransform(p, [0.05, INTRO + 0.03], [0.8, 1]);
  const trackOpacity = useTransform(p, [0.08, INTRO], [0, 1]);
  const leftX = useTransform(p, [0, INTRO - 0.02], ['0vw', '-12vw']);
  const rightX = useTransform(p, [0, INTRO - 0.02], ['0vw', '12vw']);
  const wordOpacity = useTransform(p, [0.05, INTRO - 0.04], [1, 0]);
  const clusterScale = useTransform(p, [0, INTRO], [1, 3.4]);
  const clusterOpacity = useTransform(p, [0.1, INTRO], [1, 0]);
  const metaOpacity = useTransform(p, [0, 0.07], [1, 0]);
  const progress = useTransform(p, [INTRO, 1], [0, 1]);

  useMotionValueEvent(p, 'change', (v) => {
    let idx = -1;
    if (v >= INTRO - 0.03) {
      idx = 0;
      while (idx < n - 1 && v > centre(idx) + (dwell + move) / 2) idx++;
    }
    setActive(idx);
  });

  // A link such as /#offer-petrochemicals lands on the card's scroll position rather than a DOM slot.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (id.startsWith('offer-')) document.getElementById(id)?.scrollIntoView();
  }, []);

  const goTo = (k: number) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    scrollToY(top + centre(k) * (el.offsetHeight - window.innerHeight));
  };

  return (
    <section ref={ref} className="h-pin" id="offerings" aria-labelledby="offerings-title" style={{ height: `${(n + 1.4) * 100}svh` }}>
      {items.map((o, k) => (
        <span key={o.slug} id={`offer-${o.slug}`} className="h-pin-anchor" style={{ top: `calc((100% - 100svh) * ${centre(k).toFixed(4)})` }} />
      ))}
      <div className="h-pin-stage">
        <div className="h-pin-intro" inert={active >= 0}>
          <m.p className="label" style={{ opacity: wordOpacity }}><i className="label-rule" />Our core offerings</m.p>
          <h2 id="offerings-title" className="h-pin-title">
            <m.span style={{ x: leftX, opacity: wordOpacity }}>The materials your</m.span>
            <m.span className="h-pin-cluster" aria-hidden="true" style={{ scale: clusterScale, opacity: clusterOpacity }}>
              {items.map((o) => (
                <i key={o.slug}><Image {...photo(o.photo)} alt="" fill sizes="120px" style={{ objectPosition: o.position }} /></i>
              ))}
            </m.span>
            <m.span style={{ x: rightX, opacity: wordOpacity }}>business needs.</m.span>
          </h2>
          <m.p className="h-pin-sub" style={{ opacity: metaOpacity }}>Focused on requirement-led trading and sourcing for industrial chemical applications.</m.p>
        </div>

        <m.div className="h-pin-track" style={{ x, scale: trackScale, opacity: trackOpacity, width: `${n * 100}%`, transformOrigin: `${50 / n}% 50%` }}>
          {items.map((o, k) => (
            <article key={o.slug} className="h-pin-panel" inert={active !== k} aria-label={`${o.title}, ${k + 1} of ${n}`}>
              <div className="container h-pin-grid">
                <figure className="h-pin-card">
                  <div className="h-card-media">
                    <Image {...photo(o.photo)} alt={o.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" style={{ objectPosition: o.position }} />
                    <span className="h-card-shade" aria-hidden="true" />
                    <Ticks />
                  </div>
                  <div className="h-card-top"><span className="h-idx">{o.no}<span> / 0{n}</span></span><span className="h-tag">{o.tag}</span></div>
                </figure>
                <div className="h-pin-copy">
                  <p className="label"><i className="label-rule" />{o.tag}</p>
                  <h3>{o.title}</h3>
                  <p className="h-pin-lead">{o.short}</p>
                  <p className="h-pin-body">{o.details}</p>
                  <Link className="btn btn-accent" href={`/contact?product=${encodeURIComponent(o.title)}#enquiry`}>Enquire about {o.title} <ArrowUpRight className="arrow" size={18} aria-hidden="true" /></Link>
                </div>
              </div>
            </article>
          ))}
        </m.div>

        <div className="container h-pin-bar">
          <nav className="h-pin-nav" aria-label="Core offerings">
            {items.map((o, k) => (
              <button key={o.slug} type="button" onClick={() => goTo(k)} aria-current={active === k ? 'true' : undefined}>
                <span className="h-idx">{o.no}</span>{o.title}
              </button>
            ))}
          </nav>
          <Link href="/products" className="h-textlink">View all products <ArrowRight className="arrow-r" size={16} aria-hidden="true" /></Link>
        </div>
        <m.span className="h-pin-progress" aria-hidden="true" style={{ scaleX: progress }} />
      </div>
    </section>
  );
}
