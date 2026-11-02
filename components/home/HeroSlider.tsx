'use client';

import { createContext, useContext, useEffect, useMemo, useState, type ComponentProps, type ReactNode } from 'react';
import { Pause, Play } from 'lucide-react';
import { Parallax } from '@/components/motion';

const INTERVAL = 3000;

type Ctx = { i: number; total: number; playing: boolean; auto: boolean; go: (n: number) => void; toggle: () => void; armed: boolean };
const SliderCtx = createContext<Ctx | null>(null);
const useSlider = () => {
  const c = useContext(SliderCtx);
  if (!c) throw new Error('Hero slider parts must sit inside <HeroShell>');
  return c;
};

/** The hero <section>. Owns which slide is showing and the autoplay timer. */
export function HeroShell({ total, children }: { total: number; children: ReactNode }) {
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [armed, setArmed] = useState(false);
  // `armed` is false on the server and on the first client render, so the first render always matches the server.
  // Slides advance on their own (a plain fade, instant under reduced motion) and the pause button stops them.
  const auto = armed && playing;

  // Slides after the first are mounted once the page has settled, so they never compete with the LCP image.
  useEffect(() => {
    const t = window.setTimeout(() => setArmed(true), 1200);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!auto) return;
    const t = window.setTimeout(() => setI((v) => (v + 1) % total), INTERVAL);
    return () => window.clearTimeout(t);
  }, [auto, i, total]);

  const value = useMemo<Ctx>(() => ({ i, total, playing, auto, armed, go: setI, toggle: () => setPlaying((p) => !p) }), [i, total, playing, auto, armed]);
  return (
    <SliderCtx.Provider value={value}>
      <section className="h-hero on-dark" aria-label="Introduction" data-slide={i}>
        {children}
      </section>
    </SliderCtx.Provider>
  );
}

type Img = Omit<ComponentProps<'img'>, 'ref'>;

/** Full-bleed background: the LCP picture (children) plus cross-fading follow-up slides. */
export function HeroBackground({ extra, children }: { extra: Img[]; children: ReactNode }) {
  const { i, armed } = useSlider();
  return (
    <Parallax className="h-hero-bg" distance={40} introScale={1.06}>
      <div className="h-slide" data-active={i === 0} aria-hidden={i !== 0}>{children}</div>
      {armed && extra.map((img, k) => (
        <div className="h-slide" key={k} data-active={i === k + 1} aria-hidden={i !== k + 1}>
          {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text -- props come from next/image getImageProps, alt included */}
          <img {...img} className="h-cover" loading="lazy" decoding="async" />
        </div>
      ))}
    </Parallax>
  );
}

/** Counter, segment progress and pause control, shown in the hero foot. */
export function HeroControls({ captions }: { captions: string[] }) {
  const { i, total, playing, auto, toggle } = useSlider();
  const pad = (n: number) => String(n).padStart(2, '0');
  return (
    <div className="h-slidectl">
      <p className="h-slidecount"><b>{pad(i + 1)}</b> / {pad(total)}</p>
      <p className="h-slidecap">{captions[i]}<span> · Illustrative photography</span></p>
      <div className="h-segs" aria-hidden="true">
        {captions.map((c, k) => (
          <span key={c} className="h-seg">
            <span className="h-seg-bar" data-auto={auto} data-done={k < i} {...(k === i ? { 'data-active': true } : {})} key={k === i ? `${i}-${playing}` : k} />
          </span>
        ))}
      </div>
      <button type="button" className="h-pause" onClick={toggle} aria-label={playing ? 'Pause slideshow' : 'Play slideshow'}>
        {playing ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
      </button>
    </div>
  );
}
