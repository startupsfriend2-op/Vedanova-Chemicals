import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Reveal, RevealGroup, ScrollReveal } from '@/components/motion';
import { requirementSteps } from './data';

/** Dark navy: a sticky heading on the left and three steps that reveal on the right as you scroll. */
export default function RequirementProcess() {
  return (
    <section className="i-req" aria-labelledby="req-title">
      <div className="container i-req-grid">
        <RevealGroup className="i-req-head">
          <Reveal><p className="i-label">02 / Requirement-led sourcing</p></Reveal>
          <Reveal as="h2"><span id="req-title" className="i-h2">The Right Conversation Starts With Your Requirement.</span></Reveal>
          <Reveal as="p" className="i-body">Share your intended industrial application, material requirements, specifications and quantity to begin a focused sourcing discussion.</Reveal>
        </RevealGroup>
        <ol className="i-req-steps">
          {requirementSteps.map((s) => (
            <ScrollReveal as="li" key={s.no} className="i-req-step">
              <span className="i-req-no">{s.no}</span>
              <div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </ScrollReveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function TechnicalNote() {
  return (
    <p className="i-note">
      Product suitability, handling requirements, regulatory considerations and technical documentation must be confirmed for each specific chemical and application.
      <Link href="/contact#enquiry" className="i-note-link">Send your requirement <ArrowRight size={15} aria-hidden="true" /></Link>
    </p>
  );
}
