import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Reveal, RevealGroup } from '@/components/motion';
import Ticks from '@/components/home/Ticks';
import { industries, type Industry } from './data';

/** Two feature cards on the first row, four balanced cards below. Each card's image zooms gently on hover. */
export default function IndustryShowcase() {
  const features = industries.filter((i) => i.feature);
  const rest = industries.filter((i) => !i.feature);
  return (
    <div className="i-showcase">
      <RevealGroup as="ul" className="i-cards i-cards-feature" stagger={0.12}>
        {features.map((i) => <IndustryCard key={i.no} industry={i} />)}
      </RevealGroup>
      <RevealGroup as="ul" className="i-cards i-cards-rest" stagger={0.1}>
        {rest.map((i) => <IndustryCard key={i.no} industry={i} />)}
      </RevealGroup>
    </div>
  );
}

function IndustryCard({ industry: i }: { industry: Industry }) {
  return (
    <Reveal as="li" className={`i-card${i.feature ? ' i-card-feature' : ''}`}>
      <article className="i-card-inner">
        <div className="i-card-media">
          <Image src={i.src} alt={i.alt} fill sizes={i.feature ? '(min-width: 1024px) 46vw, 100vw' : '(min-width: 1024px) 22vw, (min-width: 640px) 46vw, 100vw'} />
          <span className="i-card-shade" aria-hidden="true" />
          <Ticks />
          <span className="i-card-no">{i.no}</span>
        </div>
        <div className="i-card-body">
          <h3>{i.title}</h3>
          <p>{i.text}</p>
          <Link href="/contact#enquiry" className="i-card-cta" aria-label={`Discuss a requirement for ${i.title}`}>
            Discuss a Requirement <ArrowUpRight className="i-card-arrow" size={17} aria-hidden="true" />
          </Link>
        </div>
      </article>
    </Reveal>
  );
}
