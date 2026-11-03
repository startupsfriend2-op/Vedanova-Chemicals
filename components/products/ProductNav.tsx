'use client';

import { useEffect, useState } from 'react';
import { categories } from './data';

/**
 * Category links. `sticky` gives the compact bar that stays at the top of the showcase.
 * The active category is whichever section crosses the middle of the screen.
 */
export default function ProductNav({ sticky = false, label = 'Product categories' }: { sticky?: boolean; label?: string }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = categories.map((c) => document.getElementById(c.slug)).filter((el): el is HTMLElement => el !== null);
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <nav className={`p-nav${sticky ? ' p-nav-sticky' : ''}`} aria-label={label}>
      <ol>
        {categories.map((c) => (
          <li key={c.slug}>
            <a href={`#${c.slug}`} className="p-nav-link" aria-current={active === c.slug ? 'true' : undefined}>
              <span className="p-nav-no">{c.no}</span>
              <span className="p-nav-name">{c.title}</span>
              <span className="p-nav-rule" aria-hidden="true" />
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
