import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowUpRight, Building2, Mail, MapPin, Phone } from 'lucide-react';
import { MaskedHeading, MotionProvider, Parallax, Reveal, RevealGroup } from '@/components/motion';
import ContactForm from '@/components/ContactForm';
import { company } from '@/lib/site';
import { photo } from '@/lib/photos';
import './contact.css';

export const metadata: Metadata = {
  title: 'Contact Us & Request a Quote',
  description: 'Contact Vedanova Chemicals in Vadodara to discuss industrial solvent, recovered solvent and petrochemical sourcing requirements.',
};

// Organization details from the supplied company information only.
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: company.brand,
  legalName: company.legalName,
  url: 'https://vedanova-chemicals.vercel.app/contact',
  telephone: company.phone,
  email: company.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'B 801, Iscon Heights, Gotri Road',
    addressLocality: 'Vadodara',
    addressRegion: 'Gujarat',
    postalCode: '390021',
    addressCountry: 'IN',
  },
};

export default function ContactPage() {
  return (
    <MotionProvider>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />

      {/* 01 — Hero */}
      <section className="c-hero on-dark" aria-labelledby="contact-title">
        <Parallax className="c-hero-img" distance={24} introScale={1.04}>
          <Image {...photo('tank')} alt="Stainless steel process tank (illustrative photograph)" fill priority sizes="100vw" />
        </Parallax>
        <div className="c-hero-shade" aria-hidden="true" />
        <RevealGroup immediate delay={0.12} className="container c-hero-inner">
          <Reveal><p className="c-hero-eyebrow">Get in touch</p></Reveal>
          <MaskedHeading as="h1" className="c-display" lines={[<span id="contact-title" key="a">Let’s Talk</span>, <span key="b"><em>Chemistry.</em></span>]} />
          <Reveal as="p" className="c-hero-lead">Tell us about your industrial solvent, recovered solvent or petrochemical requirements. We’re here to start the conversation.</Reveal>
        </RevealGroup>
      </section>

      {/* 02 — Contact details and enquiry form */}
      <section id="enquiry-section" className="c-section c-main" aria-label="Contact details and enquiry form">
        <div className="container c-main-grid">
          <RevealGroup className="c-info" stagger={0.08}>
            <Reveal><p className="c-label"><span className="c-label-rule" aria-hidden="true" />Contact information</p></Reveal>
            <Reveal as="h2" className="c-h2">Let’s build a business connection.</Reveal>
            <Reveal as="p" className="c-body">Reach Vedanova Chemicals directly, or send your requirements through the enquiry form.</Reveal>

            <ul className="c-methods">
              <Reveal as="li">
                <a href={`tel:${company.phone}`} className="c-method">
                  <span className="c-method-icon"><Phone size={20} aria-hidden="true" /></span>
                  <span className="c-method-text"><span className="c-method-label">Phone</span><span className="c-method-value">{company.phoneDisplay}</span></span>
                  <ArrowUpRight className="c-method-arrow" size={18} aria-hidden="true" />
                </a>
              </Reveal>
              <Reveal as="li">
                <a href={`mailto:${company.email}`} className="c-method">
                  <span className="c-method-icon"><Mail size={20} aria-hidden="true" /></span>
                  <span className="c-method-text"><span className="c-method-label">Email</span><span className="c-method-value">{company.email}</span></span>
                  <ArrowUpRight className="c-method-arrow" size={18} aria-hidden="true" />
                </a>
              </Reveal>
              <Reveal as="li">
                <a href={company.mapsUrl} target="_blank" rel="noopener noreferrer" className="c-method">
                  <span className="c-method-icon"><MapPin size={20} aria-hidden="true" /></span>
                  <span className="c-method-text"><span className="c-method-label">Registered office</span><span className="c-method-value">{company.addressLine1}, {company.addressLine2}</span></span>
                  <ArrowUpRight className="c-method-arrow" size={18} aria-hidden="true" />
                  <span className="sr-only"> (opens Google Maps in a new tab)</span>
                </a>
              </Reveal>
              <Reveal as="li">
                <div className="c-method c-method-static">
                  <span className="c-method-icon"><Building2 size={20} aria-hidden="true" /></span>
                  <span className="c-method-text">
                    <span className="c-method-label">Registered company</span>
                    <span className="c-method-value">{company.legalName}</span>
                    <span className="c-method-sub">CIN: {company.cin}</span>
                  </span>
                </div>
              </Reveal>
            </ul>
          </RevealGroup>

          <Reveal className="c-form-panel" distance={24}>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      {/* 03 — Location */}
      <section className="c-section c-location" aria-labelledby="location-title">
        <div className="container">
          <RevealGroup className="c-location-head">
            <Reveal><p className="c-label"><span className="c-label-rule" aria-hidden="true" />Our location</p></Reveal>
            <Reveal as="h2" className="c-h2"><span id="location-title">Based in Vadodara, Gujarat.</span></Reveal>
            <Reveal as="p" className="c-body">Vedanova Chemicals Private Limited operates from its registered office in Vadodara, Gujarat, India.</Reveal>
          </RevealGroup>
          <Reveal className="c-location-panel">
            <div className="c-location-address">
              <p className="c-location-label">Registered office</p>
              <p className="c-location-text">{company.addressLine1}<br />{company.addressLine2}</p>
              <p className="c-location-company"><strong>{company.legalName}</strong><span>CIN: {company.cin}</span></p>
            </div>
            <div className="c-location-actions">
              <a href={company.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-dark c-map-btn">
                View on Google Maps <ArrowUpRight className="arrow" size={18} aria-hidden="true" />
              </a>
              <a href={`tel:${company.phone}`} className="c-map-link">Call {company.phoneDisplay}</a>
            </div>
          </Reveal>
        </div>
      </section>
    </MotionProvider>
  );
}
