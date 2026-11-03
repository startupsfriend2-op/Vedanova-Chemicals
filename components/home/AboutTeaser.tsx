'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { m, useReducedMotion } from 'motion/react';
import { EASE, MaskedHeading, Reveal, RevealGroup, VIEWPORT } from '@/components/motion';
import { photo } from '@/lib/photos';

const principles = ['Requirement-focused approach', 'Industrial solvent and petrochemical scope', 'Clear, direct business communication'];

// The photo opens like a window: the mask widens from an inset rectangle to the full frame while the image settles from a slight zoom.
const windowOpen = {
  hidden: { clipPath: 'inset(16% 16% 16% 16% round 6px)', opacity: 0 },
  show: { clipPath: 'inset(0% 0% 0% 0% round 0px)', opacity: 1, transition: { duration: 1.3, ease: EASE } },
};
const settle = {
  hidden: { scale: 1.18 },
  show: { scale: 1, transition: { duration: 2, ease: EASE } },
};
const still = { hidden: {}, show: {} };

export default function AboutTeaser() {
  const reduce = useReducedMotion();
  return (
    <section className="h-section h-about" aria-labelledby="about-title">
      <div className="container">
        <div className="h-about-row">
          <figure className="h-about-media">
            {/* The observed box is unclipped; only the inner layers animate, so the reveal always triggers */}
            <m.div className="h-about-frame" initial="hidden" whileInView="show" viewport={VIEWPORT}>
              <m.div className="reveal-fill" data-reveal variants={reduce ? still : windowOpen}>
                <m.div className="reveal-fill" data-reveal variants={reduce ? still : settle}>
                  <Image {...photo('tank')} alt="Stainless steel process tank with access stair and ladder (illustrative photograph)" fill sizes="(min-width: 1024px) 36vw, 100vw" />
                </m.div>
              </m.div>
            </m.div>
            <figcaption className="h-caption">Fig. 02 — Illustrative industrial photography</figcaption>
          </figure>

          <RevealGroup className="h-about-copy" stagger={0.1}>
            <Reveal><p className="label"><i className="label-rule" />Who we are</p></Reveal>
            <MaskedHeading as="h2" className="h-about-statement" lines={[<span id="about-title" key="a">Driven by requirements.</span>, <span className="h-soft" key="b">Defined by relationships.</span>]} />
            <Reveal as="p" className="h-body">Vedanova Chemicals Private Limited is a Vadodara-based company focused on the trading and sourcing of solvents and petrochemical products.</Reveal>
            <Reveal as="p" className="h-body">We believe good business begins with understanding the requirement — from product type and specification to quantity and delivery needs.</Reveal>
            <Reveal><Link href="/about" className="btn btn-dark">More About Us <ArrowUpRight className="arrow" size={18} aria-hidden="true" /></Link></Reveal>
          </RevealGroup>
        </div>

        {/* Principles run as three columns, each opening on a navy rule */}
        <RevealGroup className="h-about-principles" stagger={0.12}>
          <ol>
            {principles.map((p, i) => <Reveal as="li" key={p}><span className="h-idx">0{i + 1}</span><span>{p}</span></Reveal>)}
          </ol>
        </RevealGroup>
      </div>
    </section>
  );
}
