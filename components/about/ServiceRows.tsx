'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { m, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import { EASE, ScrollReveal, VIEWPORT } from '@/components/motion';
import Ticks from '@/components/home/Ticks';
import { photo, type PhotoName } from '@/lib/photos';

type Service = { no: string; title: string; text: string; href: string; name: PhotoName; alt: string };

const services: Service[] = [
  { no: '01', title: 'Industrial Solvents', text: 'Trading and sourcing enquiries for industrial solvent requirements.', href: '/products#industrial-solvents', name: 'solvents', alt: 'Stainless steel storage silos (illustrative photograph)' },
  { no: '02', title: 'Recovered Solvents', text: 'Enquiries for recovered solvents suited to relevant industrial applications.', href: '/products#recovered-solvents', name: 'recovered', alt: 'Distillation column and process structure (illustrative photograph)' },
  { no: '03', title: 'Petrochemicals', text: 'Trading and sourcing discussions covering petrochemical product requirements.', href: '/products#petrochemicals', name: 'petrochemicals', alt: 'Refinery towers and steam on a plant skyline (illustrative photograph)' },
];

// Each photo starts as a small thumbnail and grows to full size as its row travels up through the middle of the screen.
// Once grown it stays full size, so the list builds down the page.
const SMALL = 0.34;

export default function ServiceRows() {
  return (
    <section className="a-section a-tint" aria-labelledby="do-title">
      <div className="container">
        <ScrollReveal className="a-head">
          <p className="a-label">02 / What we do</p>
          <h2><span id="do-title" className="a-h2">Focused on What Industry Needs.</span></h2>
        </ScrollReveal>
        <ol className="a-rows">
          {services.map((s) => (
            <ServiceRow key={s.no} {...s} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function ServiceRow({ no, title, text, href, name, alt }: Service) {
  const ref = useRef<HTMLLIElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start center'] });
  const grow = useSpring(useTransform(scrollYProgress, [0, 1], [SMALL, 1], { clamp: true }), { stiffness: 120, damping: 26, restDelta: 0.001 });

  return (
    <li ref={ref} className="a-row">
      <ScrollReveal className="a-row-copy">
        <div>
          <span className="a-row-no">{no}.</span>
          <h3>{title}</h3>
        </div>
        <div>
          <p>{text}</p>
          <Link href={href} className="a-explore">Explore {title} <ArrowUpRight className="a-arrow" size={18} aria-hidden="true" /></Link>
        </div>
      </ScrollReveal>
      <figure className="a-row-media">
        <m.div className="a-row-frame" style={{ scale: reduce ? 1 : grow }}>
          <m.div className="reveal-fill" data-reveal initial="hidden" whileInView="show" viewport={VIEWPORT} variants={fade}>
            <Image {...photo(name)} alt={alt} fill sizes="(min-width: 1024px) 45vw, 100vw" />
          </m.div>
          <Ticks />
        </m.div>
      </figure>
    </li>
  );
}

const fade = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: EASE } },
};
