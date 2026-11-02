import Link from 'next/link';
import { getImageProps } from 'next/image';
import { preload } from 'react-dom';
import { ArrowDownRight, ArrowRight, ArrowUpRight } from 'lucide-react';
import { MaskedHeading, Reveal, RevealGroup } from '@/components/motion';
import { offerings } from '@/lib/site';
import { photo, type PhotoName } from '@/lib/photos';
import { HeroBackground, HeroControls, HeroShell } from './HeroSlider';

const ALT = 'Industrial refinery towers against a clear sky (illustrative photograph)';
const LABEL = 'Industrial chemical trading & sourcing';

// Slides after the first reuse the offering photography, in the same order as the rail.
const followUps: { name: PhotoName; alt: string }[] = [
  { name: 'solvents', alt: 'Stainless steel storage silos (illustrative photograph)' },
  { name: 'recovered', alt: 'Distillation column and process structure (illustrative photograph)' },
  { name: 'petrochemicals', alt: 'Refinery towers and steam on a plant skyline (illustrative photograph)' },
];
const captions = [LABEL, ...offerings.map((o) => o.title)];

export default function Hero() {
  const wide = getImageProps({ ...photo('hero'), alt: ALT, fill: true, sizes: '100vw', priority: true });
  const narrow = getImageProps({ ...photo('hero-mobile'), alt: ALT, fill: true, sizes: '100vw', priority: true });
  preload(wide.props.src, { as: 'image', imageSrcSet: wide.props.srcSet, imageSizes: '100vw', fetchPriority: 'high', media: '(min-width: 768px)' });
  preload(narrow.props.src, { as: 'image', imageSrcSet: narrow.props.srcSet, imageSizes: '100vw', fetchPriority: 'high', media: '(max-width: 767px)' });
  const extra = followUps.map((f) => getImageProps({ ...photo(f.name), alt: f.alt, fill: true, sizes: '100vw' }).props);
  return (
    <HeroShell total={captions.length}>
      <HeroBackground extra={extra}>
        <picture>
          <source media="(max-width: 767px)" srcSet={narrow.props.srcSet} sizes="100vw" />
          <img {...wide.props} alt={ALT} className="h-cover" />
        </picture>
      </HeroBackground>
      <div className="h-hero-shade" aria-hidden="true" />
      <div className="h-hero-cols" aria-hidden="true">{Array.from({ length: 12 }, (_, i) => <i key={i} />)}</div>
      <RevealGroup immediate delay={0.15} className="container h-hero-inner">
        <Reveal className="h-hero-label"><p className="label"><i className="label-rule" />Industrial chemical trading &amp; sourcing</p></Reveal>
        <div className="h-hero-main">
          <MaskedHeading as="h1" className="h-display" lines={[<span key="a">Industrial needs.</span>, <span key="b"><em>Reliable</em> connections.</span>]} />
          <Reveal as="p" className="h-lead">Your point of contact for industrial solvents, recovered solvents and a broad range of petrochemical requirements.</Reveal>
          <Reveal className="h-hero-actions">
            <Link className="btn btn-accent" href="/products">Explore Our Products <ArrowUpRight className="arrow" size={18} aria-hidden="true" /></Link>
            <Link className="btn btn-outline-white" href="/contact#enquiry">Request a Quote <ArrowRight className="arrow-r" size={17} aria-hidden="true" /></Link>
          </Reveal>
        </div>
        <Reveal className="h-rail-wrap">
          <nav className="h-rail" aria-label="Core offerings">
            <p className="label">Core offerings</p>
            <ol>{offerings.map((o) => <li key={o.slug}><a href={`#offer-${o.slug}`}><span className="h-idx">{o.no}</span><span className="h-rail-name">{o.title}</span><ArrowDownRight size={16} aria-hidden="true" /></a></li>)}</ol>
          </nav>
        </Reveal>
        <Reveal className="h-hero-foot">
          <a href="#strip" className="h-cue"><span className="h-cue-line" aria-hidden="true" /><span>Scroll</span></a>
          <p>Based in Vadodara, Gujarat <b aria-hidden="true">·</b> Business-to-business supply enquiries</p>
          <HeroControls captions={captions} />
        </Reveal>
      </RevealGroup>
    </HeroShell>
  );
}
