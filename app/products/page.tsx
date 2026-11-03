import type { Metadata } from 'next';
import { MaskedHeading, MotionProvider, Reveal, RevealGroup } from '@/components/motion';
import EnquiryBand from '@/components/home/EnquiryBand';
import ProductHero from '@/components/products/ProductHero';
import ProductNav from '@/components/products/ProductNav';
import ProductShowcase from '@/components/products/ProductShowcase';
import ProductRequirementSteps from '@/components/products/ProductRequirementSteps';
import Rule from '@/components/products/Rule';
import './products.css';

export const metadata: Metadata = {
  title: { absolute: 'Industrial Solvents & Petrochemicals | Vedanova Chemicals' },
  description: 'Enquire about industrial solvents, recovered solvents and petrochemical products from Vedanova Chemicals, Vadodara. Share your grade and quantity.',
  alternates: { canonical: '/products' },
  openGraph: { title: 'Industrial Solvents & Petrochemicals | Vedanova Chemicals', description: 'Enquire about industrial solvents, recovered solvents and petrochemical products from Vedanova Chemicals, Vadodara. Share your grade and quantity.', url: '/products', type: 'website', siteName: 'Vedanova Chemicals', locale: 'en_IN' },
  twitter: { card: 'summary', title: 'Industrial Solvents & Petrochemicals | Vedanova Chemicals', description: 'Enquire about industrial solvents, recovered solvents and petrochemical products from Vedanova Chemicals, Vadodara. Share your grade and quantity.' },
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

      <div className="p-showcase-wrap on-dark">
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

      <EnquiryBand />
    </MotionProvider>
  );
}
