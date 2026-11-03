import type { Metadata } from 'next';
import { ArrowUpRight, Building2, Clock, Mail, MapPin, Phone } from 'lucide-react';
import { MotionProvider, Reveal, RevealGroup } from '@/components/motion';
import ContactForm from '@/components/ContactForm';
import { company } from '@/lib/site';
import './contact.css';

export const metadata: Metadata = {
  title: { absolute: 'Contact Vedanova Chemicals | Request an Industrial Quote' },
  description: 'Contact Vedanova Chemicals in Vadodara, Gujarat by phone, email or enquiry form for industrial solvent and petrochemical requirements.',
  alternates: { canonical: '/contact' },
  openGraph: { title: 'Contact Vedanova Chemicals | Request an Industrial Quote', description: 'Contact Vedanova Chemicals in Vadodara, Gujarat by phone, email or enquiry form for industrial solvent and petrochemical requirements.', url: '/contact', type: 'website', siteName: 'Vedanova Chemicals', locale: 'en_IN' },
  twitter: { card: 'summary', title: 'Contact Vedanova Chemicals | Request an Industrial Quote', description: 'Contact Vedanova Chemicals in Vadodara, Gujarat by phone, email or enquiry form for industrial solvent and petrochemical requirements.' },
};

// Business hours are not confirmed yet. Set this to the verified hours (for example "Mon – Sat : 9:30 AM – 6:30 PM")
// and the hours appear in the contact details. While it is null, nothing is shown.
const businessHours: string | null = null;

export default function ContactPage() {
  return (
    <MotionProvider>

      {/* Contact details and enquiry form */}
      <section id="enquiry-section" className="c-section c-main" aria-label="Contact details and enquiry form">
        <div className="container c-main-grid">
          <RevealGroup className="c-info" stagger={0.08}>
            <Reveal><p className="c-label"><span className="c-label-rule" aria-hidden="true" />Contact information</p></Reveal>
            <Reveal><h1 className="c-h2">Let’s build a business connection.</h1></Reveal>
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
                  <span className="c-method-text"><span className="c-method-label">Email</span><span className="c-method-value">{company.email.replace(/([@.])/g, '$1​')}</span></span>
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
              {businessHours && (
                <Reveal as="li">
                  <div className="c-method c-method-static">
                    <span className="c-method-icon"><Clock size={20} aria-hidden="true" /></span>
                    <span className="c-method-text"><span className="c-method-label">Business hours</span><span className="c-method-value">{businessHours}</span></span>
                  </div>
                </Reveal>
              )}
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
              <a href={company.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-accent c-map-btn">
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
