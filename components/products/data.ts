import type { PhotoName } from '@/lib/photos';

// The three trading categories the company has provided. Nothing here describes grades, properties or stock.
export type Category = {
  slug: string;
  no: string;
  title: string;
  tag: string;
  text: string;
  support: string;
  photo: PhotoName;
  alt: string;
  side: 'left' | 'right';
};

export const categories: Category[] = [
  {
    slug: 'industrial-solvents',
    no: '01',
    title: 'Industrial Solvents',
    tag: 'Solvent trading',
    text: 'Trading and sourcing enquiries for solvent requirements across a range of industrial applications.',
    support: 'Share your required grade, specification, quantity and delivery location.',
    photo: 'solvents',
    alt: 'Stainless steel storage silos for solvent storage (illustrative photograph)',
    side: 'right',
  },
  {
    slug: 'recovered-solvents',
    no: '02',
    title: 'Recovered Solvents',
    tag: 'Recovered materials',
    text: 'Enquiries for recovered solvents suited to relevant industrial applications.',
    support: 'Provide your intended application, required specifications and quantity. Suitability and documentation should be checked before purchase.',
    photo: 'recovered',
    alt: 'Distillation column and process structure for solvent recovery (illustrative photograph)',
    side: 'left',
  },
  {
    slug: 'petrochemicals',
    no: '03',
    title: 'Petrochemicals',
    tag: 'Petrochemical trading',
    text: 'Trading and sourcing enquiries covering a range of petrochemical product requirements.',
    support: 'Send the material name, required grade, quantity and intended use to discuss sourcing options and availability.',
    photo: 'petrochemicals',
    alt: 'Refinery towers and process structures on a plant skyline (illustrative photograph)',
    side: 'right',
  },
];

export const categoryMeta = ['Grades & specifications on enquiry', 'Business quantities'];

export const requirementSteps = [
  { no: '01', title: 'Identify the Material', text: 'Chemical name or product category.' },
  { no: '02', title: 'Specify the Requirement', text: 'Grade, specification, approximate quantity and intended application.' },
  { no: '03', title: 'Send Your Enquiry', text: 'Share the delivery destination and contact details to begin the discussion.' },
];
