import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Mail, Phone } from 'lucide-react';
import { MotionProvider, Reveal, RevealGroup } from '@/components/motion';
import { company } from '@/lib/site';
import { photo } from '@/lib/photos';
import './EnquiryBand.css';

type Props = { title?: string; text?: string; buttonLabel?: string; href?: string };

/** Closing enquiry band. Used on the Home page and on the inner pages. */
export default function EnquiryBand({
  title = 'Looking for the right chemical supply partner?',
  text = 'Connect with Vedanova Chemicals to discuss your industrial solvent or petrochemical requirements.',
  buttonLabel = 'Send Your Enquiry',
  href = '/contact#enquiry',
}: Props) {
  return (
    <MotionProvider>
      <section className="h-cta on-dark" aria-labelledby="cta-title">
        <Image {...photo('aerial')} alt="" fill sizes="100vw" className="h-cta-bg" aria-hidden="true" />
        <div className="h-cta-shade" aria-hidden="true" />
        <div className="container h-cta-inner">
          <RevealGroup className="h-cta-copy">
            <Reveal><p className="label"><i className="label-rule" />Let’s work together</p></Reveal>
            <Reveal as="h2"><span id="cta-title">{title}</span></Reveal>
            <Reveal as="p">{text}</Reveal>
          </RevealGroup>
          <Reveal className="h-cta-actions" delay={0.3}>
            <Link href={href} className="btn btn-accent">{buttonLabel} <ArrowUpRight className="arrow" size={18} aria-hidden="true" /></Link>
            <a className="h-cta-link" href={`tel:${company.phone}`}><Phone size={16} aria-hidden="true" />{company.phoneDisplay}</a>
            <a className="h-cta-link" href={`mailto:${company.email}`}><Mail size={16} aria-hidden="true" />{company.email}</a>
          </Reveal>
        </div>
      </section>
    </MotionProvider>
  );
}
