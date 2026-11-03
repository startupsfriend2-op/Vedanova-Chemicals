import Image from 'next/image';
import { MaskedHeading, Parallax, Reveal, RevealGroup } from '@/components/motion';
import { photo } from '@/lib/photos';

export default function IndustriesHero() {
  return (
    <section className="i-hero on-dark" aria-labelledby="industries-title">
      <Parallax className="i-hero-img" distance={28} introScale={1.05}>
        <Image {...photo('aerial')} alt="Aerial view of an industrial process plant (illustrative photograph)" fill priority sizes="100vw" />
      </Parallax>
      <div className="i-hero-shade" aria-hidden="true" />
      <RevealGroup immediate delay={0.15} className="container i-hero-inner">
        <Reveal><p className="i-eyebrow">Industries &amp; applications</p></Reveal>
        <MaskedHeading as="h1" className="i-display" lines={[<span id="industries-title" key="a">Chemistry Behind</span>, <span key="b"><em>Industrial</em> Possibilities.</span>]} />
        <Reveal as="p" className="i-lead">Explore common industrial applications where solvents and petrochemical products play a role.</Reveal>
        <Reveal>
          <a href="#application-areas" className="i-cue">
            <span className="i-cue-line" aria-hidden="true" />
            <span>Scroll</span>
          </a>
        </Reveal>
      </RevealGroup>
    </section>
  );
}
