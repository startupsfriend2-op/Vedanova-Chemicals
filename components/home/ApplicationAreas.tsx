'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { m, useMotionValueEvent, useScroll, useSpring } from 'motion/react';
import { Reveal, RevealGroup } from '@/components/motion';
import { applications } from '@/lib/site';
import { photo, type PhotoName } from '@/lib/photos';
import Ticks from './Ticks';

const photos: { name: PhotoName; alt: string }[] = [
  { name: 'lab', alt: 'Laboratory glassware on shelving (illustrative photograph)' },
  { name: 'beaker', alt: 'Close view of a laboratory beaker (illustrative photograph)' },
  { name: 'drums', alt: 'Stacked steel drums (illustrative photograph)' },
  { name: 'pipes', alt: 'Industrial pipework and valves (illustrative photograph)' },
];

// Extra detail for each area. These describe how an enquiry is handled. They make no claims about stock, grades, customers or specifications.
const details = [
  'Coatings and paint formulations depend on getting the solvent balance right. Share the material, the quantity you need and where it should be delivered, and we will discuss sourcing options.',
  'Ink and printing processes rely on solvent systems where carrier and drying behaviour matter. Tell us the application and expected volumes, and we will check what can be sourced.',
  'Adhesive and resin formulations often combine solvents with petrochemical inputs. Send the material name, the intended use and the quantity, and our team will respond with next steps.',
  'Cleaning and degreasing work needs a solvent suited to the surface and the process. Describe the cleaning application and volumes, and we will talk through the options available to you.',
];

const items = applications.slice(0, 4).map((a, i) => ({ ...a, no: `0${i + 1}`, ...photos[i], detail: details[i] }));
const n = items.length;

export default function ApplicationAreas() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  // Each area owns an equal slice of the scroll. Its row opens and its photo fades in as the slice begins.
  const [active, setActive] = useState(0);
  useMotionValueEvent(p, 'change', (v) => setActive(Math.min(n - 1, Math.max(0, Math.floor(v * n)))));

  return (
    <section ref={ref} className="h-apps-pin h-apps on-dark" aria-labelledby="apps-title">
      <div className="h-apps-stage">
        <div className="container h-apps-grid">
          <div className="h-apps-main">
            <RevealGroup>
              <Reveal><p className="label"><i className="label-rule" />Application areas</p></Reveal>
              <Reveal as="h2"><span id="apps-title">Supporting a world of industry.</span></Reveal>
              <Reveal as="p" className="h-apps-note">Our product categories are relevant to multiple industrial and formulation applications. Specific product suitability depends on the material and grade.</Reveal>
              <Reveal><Link href="/industries" className="h-textlink">Explore industries <ArrowRight className="arrow-r" size={16} aria-hidden="true" /></Link></Reveal>
            </RevealGroup>

            <ol className="h-apps-list">
              {items.map((a, i) => (
                <li key={a.title} className="h-app-item" data-state={i === active ? 'current' : 'upcoming'}>
                  <div className="h-app-head">
                    <span className="h-idx">{a.no}</span>
                    <span className="h-app-title">{a.title}</span>
                    <span className="h-app-thumb" aria-hidden="true"><Image {...photo(a.name)} alt="" fill sizes="72px" /></span>
                  </div>
                  <div className="h-app-detail-wrap">
                    <div className="h-app-detail">
                      <p className="h-app-lead">{a.text}</p>
                      <p>{a.detail}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="h-apps-visual" aria-hidden="true">
            <m.div className="h-apps-frame">
              {items.map((a, i) => (
                <div key={a.name} className="h-apps-pv" data-active={i === active}>
                  <Image {...photo(a.name)} alt="" fill sizes="(min-width: 1024px) 36vw, 0px" />
                </div>
              ))}
              <Ticks />
              <p className="h-apps-count"><b>0{active + 1}</b> / 0{n} <span>{items[active].title}</span></p>
            </m.div>
            <p className="h-caption">Illustrative photography. Application areas do not imply any specific customer or site.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
