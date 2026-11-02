import type { Metadata, Viewport } from 'next';
import { DM_Sans, Manrope } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { company } from '@/lib/site';
import './globals.css';
import './tokens.css';
import './chrome.css';
const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope', display: 'swap' });
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans', display: 'swap' });
const domain = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
export const metadata: Metadata = {
  metadataBase: new URL(domain),
  title: { default: 'Vedanova Chemicals | Industrial Solvents & Petrochemical Trading', template: '%s | Vedanova Chemicals' },
  description: 'Vedanova Chemicals Private Limited, Vadodara — enquiries for industrial solvents, recovered solvents and petrochemical trading and sourcing.',
  robots: { index: true, follow: true },
  openGraph: { title: 'Vedanova Chemicals', description: 'Industrial solvent and petrochemical trading and sourcing in Vadodara, Gujarat.', type: 'website', siteName: company.brand },
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#0a1030' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${manrope.variable} ${dmSans.variable}`}>
    <head><noscript><style>{'[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}'}</style></noscript></head>
    <body><a className="skip-link" href="#main-content">Skip to content</a><Header/><main id="main-content">{children}</main><Footer/></body>
  </html>;
}
