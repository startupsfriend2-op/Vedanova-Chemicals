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
