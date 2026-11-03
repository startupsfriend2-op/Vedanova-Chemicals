import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Reveal, RevealGroup } from '@/components/motion';
import { productLinks } from './data';

/** Navigation to the Products page. This is not a suitability recommendation. */
export default function ProductCategoryLinks() {
  return (
    <section className="i-products" aria-labelledby="products-title">
      <div className="container">
        <RevealGroup className="i-products-head">
          <Reveal><p className="i-label">Explore our trading categories</p></Reveal>
          <Reveal as="h2"><span id="products-title" className="i-h2">Discover Our Core Product Focus.</span></Reveal>
        </RevealGroup>
        <RevealGroup as="ul" className="i-product-rows" stagger={0.08}>
          {productLinks.map((p) => (
            <Reveal as="li" key={p.no}>
              <Link href={p.href} className="i-product-row">
                <span className="i-product-no">{p.no}</span>
                <span className="i-product-name">{p.title}</span>
                <ArrowUpRight className="i-product-arrow" size={26} aria-hidden="true" />
              </Link>
            </Reveal>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
