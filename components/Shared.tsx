import Link from 'next/link';
import { ArrowRight, ArrowUpRight, ChevronRight } from 'lucide-react';

export function PageHero({ eyebrow, title, intro, breadcrumb }: { eyebrow: string; title: string; intro: string; breadcrumb: string }) {
  return <section className="pagehero"><div className="pagehero-lines" aria-hidden="true"/><div className="container pagehero-inner">
    <div className="breadcrumbs"><Link href="/">Home</Link><ChevronRight size={14}/><span>{breadcrumb}</span></div>
    <span className="eyebrow light"><span className="eyebrow-line"/>{eyebrow}</span>
    <h1>{title}</h1><p>{intro}</p>
  </div></section>;
}
export function InquiryBand({ title = 'Have a chemical requirement in mind?', text = 'Tell us what you need. Our team can review your enquiry and discuss the next step.' }: { title?: string; text?: string }) {
  return <section className="inquiry-wrap"><div className="container"><div className="inquiry-band"><div className="inquiry-dots" aria-hidden="true"/><div><span className="eyebrow light">LET’S WORK TOGETHER</span><h2>{title}</h2><p>{text}</p></div><Link href="/contact#enquiry" className="btn btn-white">Send Your Enquiry <ArrowUpRight size={17}/></Link></div></div></section>;
}
export function SectionHeading({ eyebrow, title, body, link, linkText }: { eyebrow: string; title: string; body?: string; link?: string; linkText?: string }) {
  return <div className="section-heading"><div><span className="eyebrow"><span className="eyebrow-line"/>{eyebrow}</span><h2>{title}</h2>{body && <p>{body}</p>}</div>{link && <Link href={link} className="text-link">{linkText || 'Explore more'} <ArrowRight size={17}/></Link>}</div>;
}
