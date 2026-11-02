import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Reveal, RevealGroup } from '@/components/motion';
import { offerings } from '@/lib/site';
import { photo, type PhotoName } from '@/lib/photos';
import Ticks from './Ticks';
import PinnedOfferings, { type PinnedItem } from './PinnedOfferings';

const media: { name: PhotoName; alt: string; position: string }[] = [
  { name: 'solvents', alt: 'Stainless steel storage silos (illustrative photograph)', position: '50% 50%' },
  { name: 'recovered', alt: 'Distillation column and process structure (illustrative photograph)', position: '50% 40%' },
  { name: 'petrochemicals', alt: 'Refinery towers and steam on a plant skyline (illustrative photograph)', position: '42% 50%' },
];

const items: PinnedItem[] = offerings.map((o, i) => ({ ...o, photo: media[i].name, alt: media[i].alt, position: media[i].position }));

export default function Offerings() {
  // The card grid is the default (no JS, phones, tablets, reduced motion); wide screens swap in the pinned scroll scene.
  return <PinnedOfferings items={items} fallback={<OfferingGrid />} />;
}

function OfferingGrid() {
  return (
    <section className="h-section h-offerings" id="offerings" aria-labelledby="offerings-title">
      <div className="container">
        <RevealGroup className="h-sechead">
          <div>
            <Reveal><p className="label"><i className="label-rule" />Our core offerings</p></Reveal>
            <Reveal as="h2"><span id="offerings-title">The materials your business needs.</span></Reveal>
          </div>
          <div className="h-sechead-side">
            <Reveal as="p">Focused on requirement-led trading and sourcing for industrial chemical applications.</Reveal>
            <Reveal><Link href="/products" className="h-textlink">View all products <ArrowRight className="arrow-r" size={16} aria-hidden="true" /></Link></Reveal>
          </div>
        </RevealGroup>
        <ul className="h-cards">
          {offerings.map((o, i) => (
            <li key={o.slug} id={`offer-${o.slug}`} className="h-card-slot">
              <Reveal as="article" className="h-card" delay={i * 0.12} distance={32}>
                <div className="h-card-media">
                  <Image {...photo(media[i].name)} alt={media[i].alt} fill sizes="(min-width: 1024px) 380px, (min-width: 700px) 50vw, 100vw" style={{ objectPosition: media[i].position }} />
                  <span className="h-card-shade" aria-hidden="true" />
                  <Ticks />
                </div>
                <div className="h-card-top"><span className="h-idx">{o.no}<span> / 03</span></span><span className="h-tag">{o.tag}</span></div>
                <div className="h-card-body">
                  <h3>{o.title}</h3>
                  <p>{o.short}</p>
                  <Link className="h-card-link" href={`/contact?product=${encodeURIComponent(o.title)}#enquiry`}>Enquire <span className="sr-only">about {o.title}</span><ArrowRight className="h-card-arrow" size={18} aria-hidden="true" /></Link>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
