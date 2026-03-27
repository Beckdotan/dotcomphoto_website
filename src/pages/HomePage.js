import React, { useRef, useEffect, useState } from 'react';
import Footer from '../components/Footer';
import ScrollReveal from '../components/ScrollReveal';
import AnimatedCounter from '../components/AnimatedCounter';

/* ─── Cinematic hero with layered scroll-driven text reveals ─── */
function CinematicHero({ onNavigate }) {
  const heroRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = heroRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      setScrollProgress(Math.max(0, Math.min(1, -rect.top / total)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll phases — only text transitions, buttons stay put
  const p = scrollProgress;

  const titleOpacity = p < 0.3 ? 1 : p < 0.5 ? 1 - (p - 0.3) / 0.2 : 0;
  const titleY = p < 0.3 ? 0 : -(p - 0.3) * 100;

  const taglineOpacity = p < 0.35 ? 0 : p < 0.5 ? (p - 0.35) / 0.15 : p < 0.75 ? 1 : 1 - (p - 0.75) / 0.15;
  const taglineY = p < 0.35 ? 25 : p < 0.5 ? 25 - ((p - 0.35) / 0.15) * 25 : 0;

  // Buttons: always visible, fade out together with the tagline at the end
  const ctaOpacity = p < 0.75 ? 1 : 1 - (p - 0.75) / 0.15;

  const overlayDarken = Math.min(0.55, 0.35 + p * 0.35);

  return (
    <header ref={heroRef} className="relative w-full" style={{ height: '300vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden" style={{ zIndex: 1 }}>
        {/* Dynamic darkening overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 130% 70% at 50% 40%, rgba(0,0,0,${overlayDarken * 0.6}) 0%, rgba(0,0,0,${overlayDarken * 0.2}) 60%, rgba(0,0,0,${overlayDarken}) 100%)`,
          }}
        />

        {/* Text + buttons — all in one centered container so they move together */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pb-36 md:pb-24">
          {/* Phase 1: Main Title + Buttons */}
          <div
            className="text-center px-6 max-w-5xl"
            style={{ opacity: titleOpacity, transform: `translateY(${titleY}px)` }}
          >
            <span
              className="font-label text-tertiary text-xs tracking-[0.5em] uppercase mb-6 block"
              style={{ textShadow: '0 1px 12px rgba(0,0,0,0.6)' }}
            >
              Landscape Art Photography
            </span>
            <h1
              className="font-headline text-4xl md:text-6xl lg:text-[5rem] text-on-surface font-light tracking-tight leading-[1.08]"
              style={{ textShadow: '0 2px 40px rgba(0,0,0,0.7), 0 0 80px rgba(0,0,0,0.3)' }}
            >
              What the Eye Sees.<br />What the Heart <span className="italic">Remembers</span>.<br />What the Art Becomes.
            </h1>
            {/* Buttons — inside the title block */}
            <div
              className="mt-10"
              style={{ opacity: ctaOpacity, pointerEvents: ctaOpacity < 0.1 ? 'none' : 'auto' }}
            >
              <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                <button
                  onClick={() => onNavigate('gallery')}
                  className="px-10 py-4 bg-primary/90 text-on-primary font-label text-xs uppercase tracking-[0.2em] hover:bg-primary transition-colors duration-300 backdrop-blur-sm"
                >
                  Enter the Gallery
                </button>
                <button
                  onClick={() => onNavigate('learning')}
                  className="px-10 py-4 bg-white/5 border border-white/15 text-primary font-label text-xs uppercase tracking-[0.2em] hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                >
                  Learning Center
                </button>
              </div>
            </div>
          </div>

          {/* Phase 2: Quote — sits in the same centered space */}
          <div
            className="absolute text-center px-6 max-w-3xl pointer-events-none mt-6"
            style={{ opacity: taglineOpacity, transform: `translateY(${taglineY}px)` }}
          >
            <div className="w-16 h-[1px] bg-tertiary/40 mx-auto mb-8" />
            <p
              className="font-headline text-2xl md:text-4xl text-on-surface/90 font-light italic leading-relaxed"
              style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}
            >
              "Night photography is a conversation with time. You open the shutter, and for thirty seconds, the universe paints itself onto your sensor."
            </p>
            <div className="w-16 h-[1px] bg-tertiary/40 mx-auto mt-8" />
          </div>
        </div>

        {/* Scroll indicator — only visible at start */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          style={{ opacity: Math.max(0, 1 - p * 5) }}
        >
          <span
            className="font-label text-[9px] text-on-surface-variant/50 uppercase tracking-[0.3em]"
            style={{ textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}
          >
            Scroll to explore
          </span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-tertiary/40 to-transparent animate-pulse" />
        </div>
      </div>
    </header>
  );
}

/* ─── Peek-through glass transition zone with stats ─── */
function GlassTransition() {
  const stats = [
    { value: 290, suffix: '+', label: 'Sunrises Chased', sub: 'and every one was worth it' },
    { value: 200, suffix: '+', label: 'Night Sessions', sub: 'under the stars' },
    { value: 340, suffix: '+', label: 'Students Taught', sub: 'workshops & private sessions' },
    { value: 9, suffix: '.5k', label: 'Followers', sub: 'Instagram & YouTube' },
  ];

  return (
    <section className="relative -mt-[1px]" style={{ zIndex: 2 }}>
      <div
        className="py-32 px-8 md:px-24"
        style={{
          background: 'linear-gradient(to bottom, rgba(17,20,18,0.6) 0%, rgba(17,20,18,0.92) 40%, #111412 100%)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Stats header */}
          <ScrollReveal className="mb-16">
            <span className="font-label text-tertiary text-[10px] tracking-[0.4em] uppercase mb-3 block">The Numbers</span>
            <h3 className="font-headline text-3xl text-on-surface font-light">It started with one sunrise. Now we chase them together.</h3>
          </ScrollReveal>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
            {stats.map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 0.1}>
                <div className="text-4xl md:text-5xl font-headline text-primary font-light">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-3 font-label text-xs uppercase tracking-[0.15em] text-on-surface">
                  {stat.label}
                </div>
                <div className="mt-1 font-label text-[10px] text-on-surface-variant/50 italic">
                  {stat.sub}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Behind the Scenes — the photographer in the field ─── */
function BehindTheScenes() {
  return (
    <section className="px-8 md:px-24 py-32 bg-background">
      <ScrollReveal className="mb-16 max-w-3xl">
        <span className="font-label text-tertiary text-[10px] tracking-[0.4em] uppercase mb-3 block">Behind the Lens</span>
        <h2 className="font-headline text-4xl md:text-5xl text-on-surface font-light">Where the Work Happens</h2>
        <p className="font-body text-on-surface-variant text-lg mt-4 leading-relaxed">
          Early mornings, remote ridgelines, and the patience to wait for the perfect light.
        </p>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
        {/* Hero — epic mountaintop panorama */}
        <ScrollReveal className="md:col-span-12 group" delay={0}>
          <div className="overflow-hidden relative">
            <img
              alt="Photographer with tripod on a mountaintop overlooking lakes and ranges"
              className="w-full group-hover:scale-[1.02] transition-transform duration-1000"
              src="https://res.cloudinary.com/diepbwdm5/image/upload/w_1400,q_auto,f_auto,g_north,c_fill,ar_21:9/v1774524793/untitled-6627_skvoi5.jpg"
            />
          </div>
        </ScrollReveal>

        {/* Volcano reflection — vertical */}
        <ScrollReveal className="md:col-span-5 group" delay={0.1}>
          <div className="overflow-hidden relative">
            <img
              alt="Camera on tripod with volcano reflection in still water"
              className="w-full group-hover:scale-[1.03] transition-transform duration-1000"
              src="https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774524528/untitled-4740_nbxn9k.jpg"
            />
          </div>
        </ScrollReveal>

        {/* Mountain lake sunset — horizontal */}
        <ScrollReveal className="md:col-span-7 md:mt-16 group" delay={0.15}>
          <div className="overflow-hidden relative">
            <img
              alt="Camera facing a glacial mountain lake at sunset"
              className="w-full group-hover:scale-[1.02] transition-transform duration-1000"
              src="https://res.cloudinary.com/diepbwdm5/image/upload/w_1200,q_auto,f_auto/v1774263516/untitled-6182_Large_n1evll.jpg"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ─── Full Homepage ─── */
export default function HomePage({ onNavigate }) {
  return (
    <div className="page-content">
      <CinematicHero onNavigate={onNavigate} />
      <GlassTransition />
      <BehindTheScenes />
      <Footer />
    </div>
  );
}
