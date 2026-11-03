// Six application areas. Titles and descriptions come from lib/site so the wording stays in one place.
// Photos are illustrative and are not Vedanova facilities.
import { applications } from '@/lib/site';

export type Industry = { no: string; title: string; text: string; src: string; alt: string; feature: boolean };

const media = [
  { src: '/images/photos/drums.jpg', alt: 'Stacked steel drums (illustrative photograph)' },
  { src: '/images/industries/printing.jpg', alt: 'Printing machinery in a print production hall (illustrative photograph)' },
  { src: '/images/industries/liquid.jpg', alt: 'Liquid being poured into a container during material handling (illustrative photograph)' },
  { src: '/images/industries/gears.jpg', alt: 'Close view of metal gears in industrial machinery (illustrative photograph)' },
  { src: '/images/photos/tank.jpg', alt: 'Stainless steel process tank with access stair and ladder (illustrative photograph)' },
  { src: '/images/industries/factory.jpg', alt: 'Factory floor with rows of production machinery (illustrative photograph)' },
];

export const industries: Industry[] = applications.map((a, i) => ({
  no: `0${i + 1}`,
  title: a.title,
  text: a.text,
  ...media[i],
  feature: i < 2,
}));

export const requirementSteps = [
  { no: '01', title: 'Application', text: 'Identify the intended industrial use.' },
  { no: '02', title: 'Material Requirements', text: 'Share the chemical category, grade, specifications and approximate quantity.' },
  { no: '03', title: 'Enquiry', text: 'Send your requirement and delivery destination for review.' },
];

export const productLinks = [
  { no: '01', title: 'Industrial Solvents', href: '/products#industrial-solvents' },
  { no: '02', title: 'Recovered Solvents', href: '/products#recovered-solvents' },
  { no: '03', title: 'Petrochemicals', href: '/products#petrochemicals' },
];
