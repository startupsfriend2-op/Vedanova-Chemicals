import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { ImageReveal, MaskedHeading, Reveal, RevealGroup } from '@/components/motion';
import { photo } from '@/lib/photos';
import Ticks from './Ticks';

const principles = ['Requirement-focused approach', 'Industrial solvent and petrochemical scope', 'Clear, direct business communication'];

export default function AboutTeaser() {
  return (
    <section className="h-section h-about" aria-labelledby="about-title">
      <div className="container h-about-grid">
        <figure className="h-about-media">
          <div className="h-about-art">
          <ImageReveal className="h-frame">
            <Image {...photo('tank')} alt="Stainless steel process tank with access stair and ladder (illustrative photograph)" fill sizes="(min-width: 1024px) 480px, 100vw" />
            <Ticks />
          </ImageReveal>
          </div>
          <figcaption className="h-caption">Fig. 02 — Illustrative industrial photography</figcaption>
        </figure>
        <RevealGroup className="h-about-copy" stagger={0.09}>
          <Reveal><p className="label"><i className="label-rule" />Who we are</p></Reveal>
          <MaskedHeading as="h2" className="h-statement" lines={[<span id="about-title" key="a">Driven by requirements.</span>, <span className="h-soft" key="b">Defined by relationships.</span>]} />
          <Reveal as="p" className="h-body">Vedanova Chemicals Private Limited is a Vadodara-based company focused on the trading and sourcing of solvents and petrochemical products.</Reveal>
          <Reveal as="p" className="h-body">We believe good business begins with understanding the requirement — from product type and specification to quantity and delivery needs.</Reveal>
          <ol className="h-principles">
            {principles.map((p, i) => <Reveal as="li" key={p}><span className="h-idx">0{i + 1}</span><span>{p}</span></Reveal>)}
          </ol>
          <Reveal><Link href="/about" className="btn btn-dark">More About Us <ArrowUpRight className="arrow" size={18} aria-hidden="true" /></Link></Reveal>
        </RevealGroup>
      </div>
    </section>
  );
}
