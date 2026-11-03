import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Brush, Factory, FlaskConical, Layers3, PackageCheck, Paintbrush2, Settings2, Waves } from 'lucide-react';
import { PageHero, SectionHeading } from '@/components/Shared';
import EnquiryBand from '@/components/home/EnquiryBand';
import { applications } from '@/lib/site';
export const metadata: Metadata = { title: 'Industrial Applications', description: 'Explore industrial applications relevant to solvent and petrochemical requirements, including coatings, inks and chemical processing.' };
const icons = [Paintbrush2, Layers3, FlaskConical, Waves, Settings2, Factory];
export default function IndustriesPage() {
 return <><PageHero eyebrow="INDUSTRIAL APPLICATIONS" title="The right materials matter in every industry." intro="Solvents and petrochemicals support a wide variety of industrial processes. Explore common application areas below." breadcrumb="Industries"/>
 <section className="section"><div className="container"><SectionHeading eyebrow="APPLICATION AREAS" title="Built around diverse requirements." body="These are illustrative application sectors for the product categories we discuss. Suitability, regulatory requirements and availability vary by chemical and grade."/><div className="application-grid">{applications.map((item,i)=>{const Icon=icons[i];return <article className="application-card" key={item.title}><div className="app-top"><span>0{i+1}</span><Icon size={30} strokeWidth={1.45}/></div><h3>{item.title}</h3><p>{item.text}</p><Link href="/contact#enquiry" aria-label={`Discuss ${item.title} requirements`}>Discuss a requirement <ArrowUpRight size={17}/></Link></article>})}</div><div className="application-disclaimer"><PackageCheck size={22}/><span>Material handling, suitability, technical documentation and applicable safety requirements should be confirmed for each specific product. The site does not substitute for technical or safety guidance.</span></div></div></section>
 <EnquiryBand title="Have an application-specific enquiry?" text="Share the intended use and specifications, and we can discuss the relevant product category."/></>;
}
