import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: { absolute: 'Vedanova Chemicals: Solvent & Petrochemical Trading' },
  description: 'Vedanova Chemicals, Vadodara, Gujarat: trading and sourcing of industrial solvents, recovered solvents and petrochemicals. Send your enquiry today.',
  alternates: { canonical: '/' },
  openGraph: { title: 'Vedanova Chemicals: Solvent & Petrochemical Trading', description: 'Vedanova Chemicals, Vadodara, Gujarat: trading and sourcing of industrial solvents, recovered solvents and petrochemicals. Send your enquiry today.', url: '/', type: 'website', siteName: 'Vedanova Chemicals', locale: 'en_IN' },
  twitter: { card: 'summary', title: 'Vedanova Chemicals: Solvent & Petrochemical Trading', description: 'Vedanova Chemicals, Vadodara, Gujarat: trading and sourcing of industrial solvents, recovered solvents and petrochemicals. Send your enquiry today.' },
};
import { MotionProvider, SmoothScroll } from '@/components/motion';
import Hero from '@/components/home/Hero';
import WorkStrip from '@/components/home/WorkStrip';
import Offerings from '@/components/home/Offerings';
import AboutTeaser from '@/components/home/AboutTeaser';
import ApplicationAreas from '@/components/home/ApplicationAreas';
import Process from '@/components/home/Process';
import EnquiryBand from '@/components/home/EnquiryBand';
import './home.css';

export default function HomePage() {
  return (
    <MotionProvider>
      <SmoothScroll />
      <Hero />
      <WorkStrip />
      <Offerings />
      <AboutTeaser />
      <ApplicationAreas />
      <Process />
      <EnquiryBand />
    </MotionProvider>
  );
}
