'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type KeyboardEvent } from 'react';
import { ArrowRight, ArrowUpRight, Mail, MapPin, Menu, Phone, X } from 'lucide-react';
import { company, nav } from '@/lib/site';

const SCROLL_AT = 34;
const subscribeScroll = (cb: () => void) => {
  window.addEventListener('scroll', cb, { passive: true });
  return () => window.removeEventListener('scroll', cb);
};
const isActive = (pathname: string, href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

export default function Header() {
  const pathname = usePathname();
  // The sheet is "open" only for the path it was opened on, so navigating closes it without an effect.
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const open = openedOn === pathname;
  const scrolled = useSyncExternalStore(subscribeScroll, () => window.scrollY > SCROLL_AT, () => false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => { setOpenedOn(null); toggleRef.current?.focus(); }, []);

  useEffect(() => {
    if (!open) return;
    const { body, documentElement } = document;
    const gap = window.innerWidth - documentElement.clientWidth;
    const prev = { overflow: body.style.overflow, paddingRight: body.style.paddingRight };
    body.style.overflow = 'hidden';
    if (gap > 0) body.style.paddingRight = `${gap}px`;
    const raf = requestAnimationFrame(() => closeRef.current?.focus());
    return () => { cancelAnimationFrame(raf); body.style.overflow = prev.overflow; body.style.paddingRight = prev.paddingRight; };
  }, [open]);

  const onSheetKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') { e.stopPropagation(); close(); return; }
    if (e.key !== 'Tab' || !sheetRef.current) return;
    const items = Array.from(sheetRef.current.querySelectorAll<HTMLElement>('a[href],button:not([disabled])'));
    if (!items.length) return;
    const first = items[0], last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  };

  return <header className="site-header" data-scrolled={scrolled}>
    <div className="topbar">
      <div className="container topbar-inner">
        <span><MapPin size={13} aria-hidden="true" /> Vadodara, Gujarat, India</span>
        <div className="topbar-contact">
          <a href={`tel:${company.phone}`}><Phone size={13} aria-hidden="true" /> {company.phoneDisplay}</a>
          <a href={`mailto:${company.email}`}><Mail size={13} aria-hidden="true" /> {company.email}</a>
        </div>
      </div>
    </div>
    <div className="header-bar">
      <div className="container header-inner">
        <Link href="/" className="brand" aria-label="Vedanova Chemicals – Home"><Image src="/images/vedanova-logo.png" alt="Vedanova Chemicals" width={212} height={50} priority /></Link>
        <nav className="nav" aria-label="Main navigation">
          {nav.map((item) => <Link key={item.href} href={item.href} aria-current={isActive(pathname, item.href) ? 'page' : undefined}>{item.label}</Link>)}
        </nav>
        <Link className="btn btn-primary header-cta" href="/contact#enquiry">Get a Quote <ArrowUpRight className="arrow" size={17} aria-hidden="true" /></Link>
        <button ref={toggleRef} type="button" className="menu-button" aria-label="Open menu" aria-haspopup="dialog" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpenedOn(pathname)}><Menu size={26} aria-hidden="true" /></button>
      </div>
    </div>
    <div ref={sheetRef} id="mobile-navigation" className="sheet on-dark" role="dialog" aria-modal="true" aria-label="Site navigation" data-lenis-prevent data-open={open} inert={!open} onKeyDown={onSheetKey}>
      <div className="container sheet-top">
        <Link href="/" className="brand brand-plate" aria-label="Vedanova Chemicals – Home"><Image src="/images/vedanova-logo.png" alt="" width={212} height={50} /></Link>
        <button ref={closeRef} type="button" className="menu-button" aria-label="Close menu" onClick={close}><X size={26} aria-hidden="true" /></button>
      </div>
      <nav className="container sheet-nav" aria-label="Mobile navigation">
        {nav.map((item, i) => <Link key={item.href} href={item.href} aria-current={isActive(pathname, item.href) ? 'page' : undefined}><span className="sheet-idx">0{i + 1}</span><span className="sheet-label">{item.label}</span><ArrowRight size={20} aria-hidden="true" /></Link>)}
      </nav>
      <div className="container sheet-foot">
        <a className="sheet-contact" href={`tel:${company.phone}`}><Phone size={15} aria-hidden="true" /> {company.phoneDisplay}</a>
        <Link href="/contact#enquiry" className="btn btn-accent sheet-cta">Request a Quote <ArrowUpRight className="arrow" size={18} aria-hidden="true" /></Link>
      </div>
    </div>
  </header>;
}
