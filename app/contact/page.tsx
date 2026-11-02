import type { Metadata } from 'next';
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from 'lucide-react';
import { PageHero } from '@/components/Shared';
import ContactForm from '@/components/ContactForm';
import { company } from '@/lib/site';
export const metadata: Metadata = { title: 'Contact Us & Request a Quote', description: 'Contact Vedanova Chemicals in Vadodara to discuss industrial solvent, recovered solvent and petrochemical sourcing requirements.' };
export default function ContactPage() {
 return <><PageHero eyebrow="GET IN TOUCH" title="Let's discuss your requirements." intro="Looking for a chemical product or sourcing conversation? Reach our team directly or send an enquiry below." breadcrumb="Contact Us"/>
 <section className="section contact-section"><div className="container contact-grid"><div className="contact-info"><span className="eyebrow"><span className="eyebrow-line"/>CONTACT INFORMATION</span><h2>Let's build a better business connection.</h2><p>Share your product requirements with the Vedanova Chemicals team. The contact details below are taken from the supplied company information.</p><div className="contact-method"><span><Phone size={22}/></span><div><small>CALL US</small><a href={`tel:${company.phone}`}>{company.phoneDisplay}</a></div></div><div className="contact-method"><span><Mail size={22}/></span><div><small>EMAIL US</small><a href={`mailto:${company.email}`}>{company.email}</a></div></div><div className="contact-method"><span><MapPin size={22}/></span><div><small>OUR OFFICE</small><strong>{company.addressLine1}<br/>{company.addressLine2}</strong><a className="location-link" href={company.mapsUrl} target="_blank" rel="noopener noreferrer">View on Google Maps <ArrowUpRight size={16}/></a></div></div><div className="contact-company"><span>REGISTERED COMPANY</span><strong>{company.legalName}</strong><small>CIN: {company.cin}</small></div></div><ContactForm/></div></section>
 </>;
}
