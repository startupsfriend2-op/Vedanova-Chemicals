import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { ImageReveal, MaskedHeading, MotionProvider, Parallax, Reveal, RevealGroup } from '@/components/motion';
import ApproachSteps from '@/components/about/ApproachSteps';
import Ticks from '@/components/home/Ticks';
import { photo } from '@/lib/photos';
import './about.css';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Vedanova Chemicals Private Limited, a Vadodara-based trading and sourcing company focused on industrial solvents, recovered solvents and petrochemical products.',
};

const offerings = [
  { no: '01', title: 'Industrial Solvents', text: 'Trading and sourcing enquiries for industrial solvent requirements.', href: '/products#industrial-solvents', name: 'solvents' as const, alt: 'Stainless steel storage silos (illustrative photograph)' },
  { no: '02', title: 'Recovered Solvents', text: 'Enquiries for recovered solvents suited to relevant industrial applications.', href: '/products#recovered-solvents', name: 'recovered' as const, alt: 'Distillation column and process structure (illustrative photograph)' },
  { no: '03', title: 'Petrochemicals', text: 'Trading and sourcing discussions covering petrochemical product requirements.', href: '/products#petrochemicals', name: 'petrochemicals' as const, alt: 'Refinery towers and steam on a plant skyline (illustrative photograph)' },
];

const steps = [
  { no: '01', title: 'Understand the Requirement', text: 'Begin with the product type, specifications, quantity, and intended application.' },
  { no: '02', title: 'Discuss the Product Scope', text: 'Explore relevant solvent, recovered solvent, and petrochemical sourcing requirements.' },
  { no: '03', title: 'Communicate the Next Steps', text: 'Keep the enquiry process clear, direct, and focused on business requirements.' },
];

export default function AboutPage() {
  const hero = photo('aerial');
  return (
    <MotionProvider>
      {/* 01 — Hero */}
      <section className="a-hero on-dark" aria-label="About Vedanova">
        <Parallax className="a-hero-img" distance={30} introScale={1.06}>
          <Image {...hero} alt="Aerial view of an industrial plant (illustrative photograph)" fill priority sizes="100vw" />
        </Parallax>
        <div className="a-hero-shade" aria-hidden="true" />
        <RevealGroup immediate delay={0.15} className="container a-hero-inner">
          <Reveal><p className="a-label">About Vedanova</p></Reveal>
          <MaskedHeading as="h1" className="a-display" lines={[<span key="a">Connecting Industries</span>, <span key="b">Through <em>Chemistry.</em></span>]} />
          <Reveal as="p" className="a-lead">Focused on trading and sourcing industrial solvents, recovered solvents, and petrochemical products.</Reveal>
          <Reveal className="a-cue-row">
            <a href="#who" className="a-cue"><span className="a-cue-line" aria-hidden="true" /><span>Scroll</span></a>
            <p className="a-caption">Illustrative industrial photography</p>
          </Reveal>
        </RevealGroup>
      </section>

      {/* 02 — Who we are */}
      <section id="who" className="a-section" aria-labelledby="who-title">
        <div className="container a-split">
          <RevealGroup className="a-split-copy" stagger={0.1}>
            <Reveal><p className="a-label">01 / Who we are</p></Reveal>
            <MaskedHeading as="h2" className="a-h2" lines={[<span id="who-title" key="a">One Focus.</span>, <span key="b" className="a-soft">Better Business Connections.</span>]} />
            <Reveal as="p" className="a-body">Based in Vadodara, Gujarat, Vedanova Chemicals Private Limited is engaged in trading and sourcing industrial solvents, recovered solvents, and petrochemical products.</Reveal>
            <Reveal as="p" className="a-body">Our approach begins with understanding each enquiry, including the required material, relevant specifications, quantity, and intended application.</Reveal>
          </RevealGroup>
          <figure className="a-split-media">
            <ImageReveal className="a-frame">
              <Image {...photo('drums')} alt="Stacked steel drums (illustrative photograph)" fill sizes="(min-width: 1024px) 46vw, 100vw" />
              <Ticks />
            </ImageReveal>
            <figcaption className="a-caption">Illustrative industrial photography</figcaption>
          </figure>
        </div>
      </section>

      {/* 03 — What we do */}
      <section className="a-section a-tint" aria-labelledby="do-title">
        <div className="container">
          <RevealGroup className="a-head">
            <Reveal><p className="a-label">02 / What we do</p></Reveal>
            <Reveal as="h2"><span id="do-title" className="a-h2">Focused on What Industry Needs.</span></Reveal>
          </RevealGroup>
          <RevealGroup as="ul" className="a-cards" stagger={0.1}>
            {offerings.map((o) => (
              <Reveal as="li" key={o.no} className="a-card-slot">
                <article className="a-card">
                  <div className="a-card-media">
                    <Image {...photo(o.name)} alt={o.alt} fill sizes="(min-width: 1024px) 30vw, (min-width: 700px) 50vw, 100vw" />
                    <Ticks />
                  </div>
                  <div className="a-card-body">
                    <span className="a-card-no">{o.no}</span>
                    <h3>{o.title}</h3>
                    <p>{o.text}</p>
                    <Link href={o.href} className="a-card-link">Explore {o.title} <ArrowUpRight className="a-arrow" size={18} aria-hidden="true" /></Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* 04 — Working approach */}
      <section className="a-section a-approach" aria-labelledby="approach-title">
        <div className="container a-approach-grid">
          <RevealGroup className="a-approach-head">
            <Reveal><p className="a-label">03 / Our working approach</p></Reveal>
            <Reveal as="h2"><span id="approach-title" className="a-h2">A Practical Approach to Every Enquiry.</span></Reveal>
          </RevealGroup>
          <ApproachSteps steps={steps} />
        </div>
      </section>

      {/* 05 — Closing call to action */}
      <section className="a-cta on-dark" aria-labelledby="cta-title">
        <div className="container a-cta-inner">
          <RevealGroup stagger={0.1}>
            <Reveal><p className="a-label">Let’s work together</p></Reveal>
            <Reveal as="h2"><span id="cta-title" className="a-h2 a-h2-xl">Let’s Discuss Your Next Requirement.</span></Reveal>
            <Reveal as="p" className="a-body">Connect with Vedanova Chemicals to discuss your industrial solvent or petrochemical requirements.</Reveal>
            <Reveal>
              <Link href="/contact#enquiry" className="btn btn-accent a-cta-btn">Request a Quote <ArrowRight className="arrow-r" size={18} aria-hidden="true" /></Link>
            </Reveal>
          </RevealGroup>
        </div>
      </section>
    </MotionProvider>
  );
}
