import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Reveal, RevealGroup } from '@/components/motion';
import { applications } from '@/lib/site';
import { photo, type PhotoName } from '@/lib/photos';
import Ticks from './Ticks';

const previews: { name: PhotoName; alt: string }[] = [
  { name: 'lab', alt: 'Laboratory glassware on shelving (illustrative photograph)' },
  { name: 'beaker', alt: 'Close view of a laboratory beaker (illustrative photograph)' },
  { name: 'drums', alt: 'Stacked steel drums (illustrative photograph)' },
  { name: 'pipes', alt: 'Industrial pipework and valves (illustrative photograph)' },
];
const items = applications.slice(0, 4);

export default function ApplicationAreas() {
  return (
    <section className="h-section h-apps on-dark" aria-labelledby="apps-title">
      <div className="container">
        <RevealGroup className="h-sechead">
          <div>
            <Reveal><p className="label"><i className="label-rule" />Application areas</p></Reveal>
            <Reveal as="h2"><span id="apps-title">Supporting a world of industry.</span></Reveal>
          </div>
          <div className="h-sechead-side">
            <Reveal as="p">Our product categories are relevant to multiple industrial and formulation applications. Specific product suitability depends on the material and grade.</Reveal>
            <Reveal><Link href="/industries" className="h-textlink">Explore industries <ArrowRight className="arrow-r" size={16} aria-hidden="true" /></Link></Reveal>
          </div>
        </RevealGroup>
        <div className="h-apps-grid">
          <RevealGroup as="ul" className="h-apps-list" stagger={0.1}>
            {items.map((a, i) => (
              <Reveal as="li" key={a.title} dataIndex={i}>
                <Link href="/industries" className="h-app-row">
                  <span className="h-idx">0{i + 1}</span>
                  <span className="h-app-body"><strong>{a.title}</strong><span>{a.text}</span></span>
                  <span className="h-thumb" aria-hidden="true"><Image {...photo(previews[i].name)} alt="" fill sizes="88px" /></span>
                  <ArrowUpRight className="h-app-arrow" size={22} aria-hidden="true" />
                </Link>
              </Reveal>
            ))}
          </RevealGroup>
          <Reveal className="h-apps-preview">
            <div className="h-apps-frame" aria-hidden="true">
              {previews.map((p, i) => (
                <div className="h-pv" data-i={i} key={p.name}><Image {...photo(p.name)} alt="" fill sizes="(min-width: 1024px) 440px, 0px" /></div>
              ))}
              <Ticks />
            </div>
            <p className="h-caption">Illustrative photography. Application areas do not imply any specific customer or site.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
