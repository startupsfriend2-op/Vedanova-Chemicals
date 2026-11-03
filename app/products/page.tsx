import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { MaskedHeading, MotionProvider, Reveal, RevealGroup } from '@/components/motion';
import EnquiryBand from '@/components/home/EnquiryBand';
import ProductHero from '@/components/products/ProductHero';
import ProductNav from '@/components/products/ProductNav';
import ProductShowcase from '@/components/products/ProductShowcase';
import ProductRequirementSteps from '@/components/products/ProductRequirementSteps';
import Rule from '@/components/products/Rule';
import './products.css';

export const metadata: Metadata = {
  title: 'Products & Solutions',
  description: 'Explore solvent trading, recovered solvent sourcing and petrochemical requirements with Vedanova Chemicals.',
};

export default function ProductsPage() {
  return (
    <MotionProvider>
      <ProductHero />

      <section className="p-section p-intro" aria-labelledby="portfolio-title">
        <div className="container p-intro-grid">
          <RevealGroup className="p-intro-copy">
            <Reveal><p className="label"><i className="label-rule" />01 / Our portfolio</p></Reveal>
            <MaskedHeading as="h2" className="p-h2" lines={[<span id="portfolio-title" key="a">Focused on Essential</span>, <span key="b" className="p-soft">Industrial Chemistry.</span>]} />
          </RevealGroup>
          <RevealGroup className="p-intro-side" stagger={0.1}>
            <Reveal as="p" className="p-body">Our trading interests cover three core chemical categories. Product grades, specifications, quantities and availability are discussed through individual enquiries.</Reveal>
          </RevealGroup>
        </div>
        <div className="container">
          <Rule />
        </div>
      </section>

      <div className="p-showcase-wrap">
        <div className="p-nav-bar">
          <div className="container">
            <ProductNav sticky />
          </div>
        </div>
        <div className="container">
          <ProductShowcase />
        </div>
      </div>

      <ProductRequirementSteps />

      <section className="p-section p-special" aria-labelledby="special-title">
        <div className="container">
          <RevealGroup className="p-special-copy">
            <Reveal><p className="label"><i className="label-rule" />Special requirements</p></Reveal>
            <Reveal as="h2"><span id="special-title" className="p-h2">Looking for Something Specific?</span></Reveal>
            <Reveal as="p" className="p-body">Tell us the chemical name, required specification, quantity and delivery destination so we can review your enquiry.</Reveal>
            <Reveal>
              <Link href="/contact#enquiry" className="btn btn-dark p-lift">Send Your Requirement <ArrowRight className="arrow" size={18} aria-hidden="true" /></Link>
            </Reveal>
          </RevealGroup>
        </div>
      </section>

      <EnquiryBand />
    </MotionProvider>
  );
}
