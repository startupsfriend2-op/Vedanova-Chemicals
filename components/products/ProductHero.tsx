import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { MaskedHeading, Parallax, Reveal, RevealGroup } from '@/components/motion';
import { photo } from '@/lib/photos';
import { categories } from './data';

export default function ProductHero() {
  return (
    <section className="p-hero on-dark" aria-labelledby="products-title">
      <Parallax className="p-hero-img" distance={30} introScale={1.05}>
        <Image {...photo('pipes')} alt="Industrial pipework and valves at a process plant (illustrative photograph)" fill priority sizes="100vw" />
      </Parallax>
      <div className="p-hero-shade" aria-hidden="true" />
      <RevealGroup immediate delay={0.15} className="container p-hero-inner">
        <Reveal><p className="p-hero-label">Our products &amp; solutions</p></Reveal>
        <MaskedHeading as="h1" className="p-display" lines={[<span id="products-title" key="a">Chemicals for Every</span>, <span key="b"><em>Industrial</em> Requirement.</span>]} />
        <Reveal as="p" className="p-hero-lead">Explore our focused trading categories across industrial solvents, recovered solvents, and petrochemicals.</Reveal>
        <Reveal className="p-hero-foot">
          <nav className="p-hero-nav" aria-label="Jump to a category">
            <ol>
              {categories.map((c) => (
                <li key={c.slug}>
                  <a href={`#${c.slug}`} className="p-hero-link">
                    <span className="p-hero-no">{c.no}</span>
                    <span>{c.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <Link href="/contact#enquiry" className="p-hero-cta">
            Start an enquiry <ArrowRight className="p-hero-arrow" size={18} aria-hidden="true" />
          </Link>
        </Reveal>
      </RevealGroup>
    </section>
  );
}
