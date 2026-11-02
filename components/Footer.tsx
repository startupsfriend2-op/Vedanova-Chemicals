import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import { company, nav, offerings } from '@/lib/site';

export default function Footer() {
  return <footer className="footer">
    <div className="container footer-main">
      <div className="footer-col footer-brand-col">
        <Link href="/" className="footer-logo" aria-label="Vedanova Chemicals – Home"><Image src="/images/vedanova-logo.png" alt="Vedanova Chemicals" width={225} height={53}/></Link>
        <p>Industrial chemical trading and sourcing, built around the needs of your business.</p>
        <p className="footer-legal">{company.legalName}</p>
      </div>
      <nav className="footer-col" aria-label="Explore"><h2 className="footer-title">Explore</h2><ul>{nav.map(x => <li key={x.href}><Link className="f-link" href={x.href}>{x.label}</Link></li>)}</ul></nav>
      <nav className="footer-col" aria-label="Our offerings"><h2 className="footer-title">Our Offerings</h2><ul>{offerings.map(x => <li key={x.slug}><Link className="f-link" href={`/products#${x.slug}`}>{x.title}</Link></li>)}<li><Link className="f-link" href="/contact#enquiry">Product Enquiries</Link></li></ul></nav>
      <address className="footer-col footer-contact"><h2 className="footer-title">Reach Our Team</h2>
        <a className="f-contact" href={`tel:${company.phone}`}><Phone size={16} aria-hidden="true"/><span>{company.phoneDisplay}</span></a>
        <a className="f-contact" href={`mailto:${company.email}`}><Mail size={16} aria-hidden="true"/><span>{company.email}</span></a>
        <a className="f-contact" href={company.mapsUrl} target="_blank" rel="noopener noreferrer"><MapPin size={16} aria-hidden="true"/><span>{company.addressLine1}<br/>{company.addressLine2}</span><ArrowUpRight size={14} aria-label="Opens in Google Maps"/></a>
      </address>
    </div>
    <div className="container footer-bottom"><span>© {new Date().getFullYear()} {company.legalName}. All rights reserved.</span><span className="footer-cin">CIN: {company.cin}</span><Link className="f-link" href="/privacy">Privacy Policy</Link></div>
  </footer>;
}
