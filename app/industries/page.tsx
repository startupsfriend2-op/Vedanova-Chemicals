import type { Metadata } from 'next';
import { MotionProvider, Reveal, RevealGroup } from '@/components/motion';
import EnquiryBand from '@/components/home/EnquiryBand';
import IndustriesHero from '@/components/industries/IndustriesHero';
import IndustryShowcase from '@/components/industries/IndustryShowcase';
import RequirementProcess from '@/components/industries/RequirementProcess';
import ProductCategoryLinks from '@/components/industries/ProductCategoryLinks';
import Rule from '@/components/industries/Rule';
import { TechnicalNote } from '@/components/industries/RequirementProcess';
import './industries.css';

export const metadata: Metadata = {
  title: { absolute: 'Solvent & Petrochemical Applications | Vedanova Chemicals' },
  description: 'Industrial application areas for solvents and petrochemicals: paints and coatings, printing and inks, adhesives, cleaning and chemical processing.',
  alternates: { canonical: '/industries' },
  openGraph: { title: 'Solvent & Petrochemical Applications | Vedanova Chemicals', description: 'Industrial application areas for solvents and petrochemicals: paints and coatings, printing and inks, adhesives, cleaning and chemical processing.', url: '/industries', type: 'website', siteName: 'Vedanova Chemicals', locale: 'en_IN' },
  twitter: { card: 'summary', title: 'Solvent & Petrochemical Applications | Vedanova Chemicals', description: 'Industrial application areas for solvents and petrochemicals: paints and coatings, printing and inks, adhesives, cleaning and chemical processing.' },
};

export default function IndustriesPage() {
  return (
    <MotionProvider>
      <IndustriesHero />

      <section id="application-areas" className="i-section i-intro" aria-labelledby="intro-title">
        <div className="container i-intro-grid">
          <RevealGroup className="i-intro-copy">
            <Reveal><p className="i-label">01 / Application areas</p></Reveal>
            <Reveal as="h2"><span id="intro-title" className="i-h2">Different Industries. <span className="i-soft">Distinct Requirements.</span></span></Reveal>
          </RevealGroup>
          <RevealGroup className="i-intro-side" stagger={0.1}>
            <Reveal as="p" className="i-body">Industrial solvents and petrochemicals are used in a variety of manufacturing and formulation processes. The appropriate material depends on the application, grade and technical specifications.</Reveal>
            <Reveal as="p" className="i-count"><b>06</b> Application areas</Reveal>
          </RevealGroup>
        </div>
        <div className="container">
          <Rule />
        </div>
      </section>

      <section className="i-section i-showcase-section" aria-label="Industry showcase">
        <div className="container">
          <IndustryShowcase />
        </div>
      </section>

      <RequirementProcess />

      <section className="i-section i-products-section">
        <ProductCategoryLinks />
        <div className="container">
          <TechnicalNote />
        </div>
      </section>

      <EnquiryBand title="Have an application-specific enquiry?" text="Share the intended use and specifications, and we can discuss the relevant product category." />
    </MotionProvider>
  );
}
