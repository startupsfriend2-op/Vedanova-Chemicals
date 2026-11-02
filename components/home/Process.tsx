import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { DrawLine, Reveal, RevealGroup } from '@/components/motion';

const steps = [
  ['01', 'Share your requirement', 'Tell us the material, grade and intended application.'],
  ['02', 'Specify the details', 'Include approximate quantity and delivery location.'],
  ['03', 'Discuss sourcing', 'Our team can review the request and respond with next steps.'],
];

export default function Process() {
  return (
    <section className="h-section h-process" id="process" aria-labelledby="process-title">
      <div className="container">
        <RevealGroup className="h-sechead">
          <div>
            <Reveal><p className="label"><i className="label-rule" />How to get started</p></Reveal>
            <Reveal as="h2"><span id="process-title">A straightforward way to work together.</span></Reveal>
          </div>
          <div className="h-sechead-side">
            <Reveal as="p">From the first enquiry to the next conversation, we keep the focus on your actual requirements.</Reveal>
            <Reveal><Link href="/contact#enquiry" className="h-textlink">Start an enquiry <ArrowRight className="arrow-r" size={16} aria-hidden="true" /></Link></Reveal>
          </div>
        </RevealGroup>
        <RevealGroup className="h-timeline">
          <span className="h-track" aria-hidden="true" />
          <DrawLine className="h-progress" />
          <RevealGroup as="ol" className="h-steps" stagger={0.28} delay={0.2}>
            {steps.map(([no, title, text]) => (
              <Reveal as="li" key={no}><span className="h-node" aria-hidden="true" /><span className="h-idx">{no}</span><h3>{title}</h3><p>{text}</p></Reveal>
            ))}
          </RevealGroup>
        </RevealGroup>
      </div>
    </section>
  );
}
