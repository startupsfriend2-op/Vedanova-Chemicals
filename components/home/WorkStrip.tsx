import { Reveal, RevealGroup } from '@/components/motion';
import { offerings } from '@/lib/site';

export default function WorkStrip() {
  return (
    <section className="h-strip" id="strip" aria-label="What we work with">
      <RevealGroup className="container h-strip-grid" stagger={0.08}>
        <Reveal><p className="label"><i className="label-rule" />What we work with</p></Reveal>
        <ul className="h-strip-list">
          {offerings.map((o) => (
            <Reveal as="li" key={o.slug}><span className="h-idx">{o.no}</span><strong>{o.title}</strong><span className="h-cap">{o.tag}</span></Reveal>
          ))}
        </ul>
      </RevealGroup>
    </section>
  );
}
