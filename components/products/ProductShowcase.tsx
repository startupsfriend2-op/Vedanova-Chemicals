'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ClipboardList, FileCheck2 } from 'lucide-react';
import { m, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { EASE, Reveal, RevealGroup, VIEWPORT } from '@/components/motion';
import Ticks from '@/components/home/Ticks';
import { photo } from '@/lib/photos';
import { categories, categoryMeta, type Category } from './data';

// The photo opens from a slightly zoomed state to rest as it enters, then drifts gently while the row is on screen.
const photoIn = {
  hidden: { opacity: 0, scale: 1.04 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.9, ease: EASE } },
};

export default function ProductShowcase() {
  return (
    <div className="p-showcase">
      {categories.map((c) => (
        <ShowcaseRow key={c.slug} category={c} />
      ))}
    </div>
  );
}

function ShowcaseRow({ category: c }: { category: Category }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const drift = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-22, 22]);
  const frameOrder = c.side === 'left' ? 1 : 2;

  return (
    <section ref={ref} id={c.slug} className={`p-item p-item-${c.side}`} aria-labelledby={`${c.slug}-title`}>
      <span className="p-bignum" aria-hidden="true">{c.no}</span>

      <figure className="p-media" style={{ gridColumn: frameOrder === 1 ? '1 / 7' : '7 / 13' }}>
        <div className="p-frame">
          <m.div className="reveal-fill" data-reveal initial="hidden" whileInView="show" viewport={VIEWPORT} variants={photoIn}>
            <m.div className="p-frame-img" style={{ y: drift }}>
              <Image {...photo(c.photo)} alt={c.alt} fill sizes="(min-width: 1024px) 48vw, 100vw" />
            </m.div>
          </m.div>
          <Ticks />
        </div>
      </figure>

      <div className="p-copy">
        <RevealGroup stagger={0.1}>
          <Reveal><p className="p-count"><b>{c.no}</b> / 03</p></Reveal>
          <Reveal><p className="label"><i className="label-rule" />{c.tag}</p></Reveal>
          <Reveal as="h2"><span id={`${c.slug}-title`}>{c.title}</span></Reveal>
          <Reveal as="p" className="p-lead">{c.text}</Reveal>
          <Reveal as="p" className="p-body">{c.support}</Reveal>
        </RevealGroup>

        <m.span className="p-rule" aria-hidden="true" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={VIEWPORT} transition={{ duration: 0.8, delay: 0.2, ease: EASE }} />

        <RevealGroup stagger={0.08}>
          <Reveal as="ul" className="p-meta">
            <li><FileCheck2 size={16} aria-hidden="true" />{categoryMeta[0]}</li>
            <li><ClipboardList size={16} aria-hidden="true" />{categoryMeta[1]}</li>
          </Reveal>
          <Reveal>
            <Link href={`/contact?product=${encodeURIComponent(c.title)}#enquiry`} className="btn btn-dark p-enquire">
              Enquire About {c.title} <ArrowUpRight className="arrow" size={18} aria-hidden="true" />
            </Link>
          </Reveal>
        </RevealGroup>
      </div>
    </section>
  );
}
