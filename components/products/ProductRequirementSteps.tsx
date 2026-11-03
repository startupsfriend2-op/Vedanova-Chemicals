import { Reveal, RevealGroup } from '@/components/motion';
import { requirementSteps } from './data';

export default function ProductRequirementSteps() {
  return (
    <section className="p-section p-steps-section" aria-labelledby="steps-title">
      <div className="container">
        <RevealGroup className="p-steps-head">
          <Reveal><p className="label"><i className="label-rule" />02 / Product enquiries</p></Reveal>
          <Reveal as="h2"><span id="steps-title" className="p-h2">Every Requirement Starts With the Right Details.</span></Reveal>
          <Reveal as="p" className="p-body">Share your chemical requirements so the team can review the product scope and discuss potential sourcing options.</Reveal>
        </RevealGroup>
        <RevealGroup as="ol" className="p-steps" stagger={0.12}>
          {requirementSteps.map((s) => (
            <Reveal as="li" key={s.no} className="p-step">
              <span className="p-step-no">{s.no}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </Reveal>
          ))}
        </RevealGroup>
        <p className="p-steps-note">Product grades, specifications and availability are confirmed through the enquiry. Nothing on this page is a stock or specification guarantee.</p>
      </div>
    </section>
  );
}
