import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, ClipboardList, Droplets, FileCheck2, FlaskConical, Recycle } from 'lucide-react';
import { PageHero, SectionHeading } from '@/components/Shared';
import EnquiryBand from '@/components/home/EnquiryBand';
import { offerings } from '@/lib/site';
export const metadata: Metadata = { title: 'Products & Solutions', description: 'Explore solvent trading, recovered solvent sourcing and petrochemical requirements with Vedanova Chemicals.' };
const icons = [FlaskConical, Recycle, Droplets];
export default function ProductsPage() {
  return <><PageHero eyebrow="PRODUCTS & SOLUTIONS" title="Your requirements. Our product focus." intro="Explore our core trading categories and share your specific chemical requirements for a tailored discussion." breadcrumb="Products"/>
    <section className="section"><div className="container"><SectionHeading eyebrow="WHAT WE OFFER" title="Focused on essential industrial chemistry." body="The categories below describe our trading interests, not a live inventory. Product grades, quantities, specifications and availability are confirmed by enquiry."/>
    <div className="product-detail-list">{offerings.map((product, idx)=> { const Icon=icons[idx]; return <article className="product-detail-card" id={product.slug} key={product.slug}><div className={`product-detail-art product-detail-art-${idx+1}`}><Icon size={66} strokeWidth={1.1}/><span>V / {product.no}</span></div><div className="product-detail-text"><span className="eyebrow"><span className="eyebrow-line"/>{product.tag}</span><h2>{product.title}</h2><p>{product.details}</p><div className="product-meta"><span><FileCheck2 size={16}/> Grades & specs on enquiry</span><span><ClipboardList size={16}/> Business quantities</span></div><Link className="btn btn-dark" href={`/contact?product=${encodeURIComponent(product.title)}#enquiry`}>Enquire About This Category <ArrowUpRight size={17}/></Link></div></article>; })}</div>
    <div className="product-note"><strong>Need a specific product not listed?</strong><p>Contact the team with the chemical name, specification, required quantity and delivery destination. We can review the enquiry without making unsupported stock or specification claims.</p><Link href="/contact#enquiry">Send your requirement <ArrowUpRight size={17}/></Link></div>
    </div></section><EnquiryBand title="Not sure where your requirement fits?" text="Send us the details of the material you're looking for, and we can take the discussion forward."/></>;
}
