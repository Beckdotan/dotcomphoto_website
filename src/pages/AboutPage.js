import React from 'react';
import Footer from '../components/Footer';

export default function AboutPage() {
  return (
    <div className="page-content">
      {/* Hero Section */}
      <section className="relative w-full h-screen overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            alt="Photographer in misty mountain landscape"
            className="w-full h-full object-cover grayscale opacity-60"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUjaqzpiCSr2f4VwkReApzYUaxoF0cQbPuon8HhwqCxBLrZNKS2c0tdWQ85OoybBGI-Z1G0R3t18-w9NDhRjkuQDr0w14pcCU25ddjJG2XQaFD-Dmuupn823DmBahxWhsVT29OFPYZyo0nXjMkhOLCfBGfSZLDxWuQET7dWbQL6CN_dXWd4PiARJKcKDyD2kMpNiuFfZ5i7YycfuKlZsalgMz_502WyOKurgcPrSDb-WPqqAuFTcaDTt8rv17vb0VWdNud9fMc3oFz"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-surface/20 via-transparent to-surface"></div>
        </div>
        <div className="relative z-10 h-full flex flex-col justify-end px-12 pb-24 max-w-[1920px] mx-auto">
          <span className="font-label text-tertiary tracking-[0.3em] uppercase text-xs mb-4">The Visionary</span>
          <h1 className="font-headline text-6xl md:text-8xl font-light tracking-tight text-on-surface max-w-4xl leading-tight">
            Chasing the <span className="italic">Quiet</span> Light.
          </h1>
        </div>
      </section>

      {/* Philosophy Quote */}
      <section className="py-32 px-12 max-w-[1920px] mx-auto bg-background">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-8 md:col-start-3 text-center">
            <span className="material-symbols-outlined text-tertiary text-4xl mb-8" style={{ fontVariationSettings: "'FILL' 1" }}>
              format_quote
            </span>
            <blockquote className="font-headline text-3xl md:text-5xl italic leading-relaxed text-on-surface-variant font-light">
              "Nature is not a place to visit. It is home. My lens is not a tool for capture, but a vessel for reverence. I wait for the moments where the earth breathes, and the light speaks in whispers."
            </blockquote>
            <cite className="block mt-12 font-label text-sm tracking-[0.2em] uppercase text-tertiary not-italic">
              Photography Philosophy — Est. 2014
            </cite>
          </div>
        </div>
      </section>

      {/* My Journey Section */}
      <section className="py-32 bg-surface-container-low">
        <div className="max-w-[1920px] mx-auto px-12 grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          <div className="relative group">
            <div className="absolute -top-12 -left-12 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
            <img
              alt="Moody forest landscape"
              className="w-full aspect-[4/5] object-cover rounded-sm shadow-2xl"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSPXtyLCFyprxcqZ5Wb-AOhVDivgqwywKRm5-fWYDFiW6isYVdZkELioTwdbw1Xwh8OY6zvStPZXrcryGogM4B401o1JiWlAUBNXRtd5JbBIKtHBNv8h7lNZWNPqWsWjZSX_K_zOZ_QM7x7kQmjfZlUTudBbm5eS-SSUPY2WSULRwRUlVGjm4DblLptsAeX2EBqHt2JXWhADtCgd-UDc6dP3z94-4veplFMjYjavkym-YMhg4XnCZTSB5D1t_fJKCNnSwmGrKOGDnt"
            />
            <div className="absolute bottom-12 -right-8 bg-surface-container-highest p-8 max-w-xs backdrop-blur-xl border border-outline-variant/10">
              <span className="font-label text-xs text-tertiary uppercase tracking-widest block mb-2">Transition</span>
              <p className="font-body text-sm text-on-surface-variant italic">From glass towers to granite peaks.</p>
            </div>
          </div>
          <div className="space-y-8 pr-12">
            <h2 className="font-headline text-4xl md:text-5xl font-light">My Journey</h2>
            <div className="space-y-6 font-body text-on-surface-variant leading-relaxed text-lg">
              <p>For a decade, my horizon was framed by the steel and glass of the corporate world. The rhythmic hum of servers replaced the sound of wind through pines. Success was measured in spreadsheets, not sunsets.</p>
              <p>The shift wasn't a single moment, but a slow erosion of the artificial. A weekend trip to the High Sierras turned into a month, then a sabbatical, and finally, a permanent departure. I traded a steady desk for the unpredictable wild.</p>
              <p>Today, my office has no walls. I track wolves in the snow and wait days for a specific quality of golden hour light. This transition wasn't just about changing careers—it was about reclaiming a sense of awe that the modern world so often suppresses.</p>
            </div>
            <div className="pt-8 flex gap-12">
              <div>
                <div className="text-3xl font-headline text-primary">12+</div>
                <div className="text-xs font-label uppercase tracking-widest text-on-surface-variant">Expeditions</div>
              </div>
              <div>
                <div className="text-3xl font-headline text-primary">40k</div>
                <div className="text-xs font-label uppercase tracking-widest text-on-surface-variant">Miles Traveled</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Gear Section */}
      <section className="py-32 px-12 max-w-[1920px] mx-auto bg-background">
        <div className="mb-20">
          <h2 className="font-headline text-4xl md:text-5xl font-light mb-4">The Gear</h2>
          <p className="font-label text-tertiary uppercase tracking-[0.2em] text-sm">Precision tools for unpredictable environments</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Camera Body */}
          <div className="bg-surface-container border border-outline-variant/10 p-10 flex flex-col justify-between">
            <div>
              <span className="material-symbols-outlined text-primary mb-6">photo_camera</span>
              <h3 className="font-headline text-2xl mb-4">Primary Bodies</h3>
              <ul className="space-y-4 font-body text-on-surface-variant">
                <li className="flex justify-between items-end border-b border-outline-variant/20 pb-2">
                  <span>Phase One XF IQ4</span>
                  <span className="text-xs text-tertiary">150MP</span>
                </li>
                <li className="flex justify-between items-end border-b border-outline-variant/20 pb-2">
                  <span>Sony a1</span>
                  <span className="text-xs text-tertiary">High-Speed Wildlife</span>
                </li>
              </ul>
            </div>
            <p className="text-xs text-on-surface-variant/60 mt-12 italic">Built to withstand -40C Arctic winters.</p>
          </div>

          {/* Lenses Grid */}
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-surface-container-high p-8">
              <h4 className="font-label text-tertiary uppercase tracking-widest text-xs mb-6">Landscape Favorites</h4>
              <div className="space-y-4">
                {['35mm f/1.4 G Master', '12-24mm f/2.8 Ultra-Wide', '90mm Macro f/2.8'].map((lens) => (
                  <div key={lens} className="flex gap-4 items-center">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span className="font-body text-on-surface">{lens}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-surface-container-high p-8">
              <h4 className="font-label text-tertiary uppercase tracking-widest text-xs mb-6">Wildlife &amp; Reach</h4>
              <div className="space-y-4">
                {['600mm f/4 Prime', '100-400mm Telephoto', '1.4x Teleconverter'].map((lens) => (
                  <div key={lens} className="flex gap-4 items-center">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span className="font-body text-on-surface">{lens}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Essential Kit */}
            <div className="md:col-span-2 bg-primary-container/20 p-8 flex items-center justify-between border-l-4 border-primary">
              <div className="flex items-center gap-6">
                <span className="material-symbols-outlined text-3xl text-primary">backpack</span>
                <div>
                  <h5 className="font-headline text-xl">The Essential Kit</h5>
                  <p className="font-body text-sm text-on-surface-variant">Carbon fiber tripods, ND filters, and silent weather-sealing.</p>
                </div>
              </div>
              <button className="px-6 py-2 bg-primary text-on-primary text-xs font-label uppercase tracking-widest hover:bg-primary-fixed-dim transition-colors">
                Full List
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-40 bg-surface-container-lowest">
        <div className="max-w-[1920px] mx-auto px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-5">
              <h2 className="font-headline text-5xl font-light mb-8">Mission &amp; Ethics</h2>
              <div className="w-24 h-px bg-tertiary mb-8"></div>
              <p className="font-body text-xl text-on-surface-variant leading-relaxed">
                A photograph is a record, but it is also a responsibility. In an era of digital oversaturation, the wilderness faces unprecedented pressure.
              </p>
            </div>
            <div className="md:col-span-6 md:col-start-7 space-y-12">
              {[
                { num: '01', title: 'Leave No Trace', desc: 'My photography follows a strict non-interference policy. I do not bait wildlife, move natural elements for composition, or geotag sensitive locations.' },
                { num: '02', title: 'Conservation Impact', desc: '15% of all print proceeds are donated directly to the Wilderness Society and local land conservancies to protect the habitats I document.' },
                { num: '03', title: 'Educational Outreach', desc: 'Teaching the next generation of photographers that the story of the animal is more important than the quality of the shot.' },
              ].map((item) => (
                <div key={item.num} className="flex gap-8">
                  <span className="font-headline text-4xl text-tertiary-fixed-dim/30 italic">{item.num}</span>
                  <div>
                    <h4 className="font-headline text-2xl mb-4">{item.title}</h4>
                    <p className="font-body text-on-surface-variant">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-24 border-t border-outline-variant/10 bg-background">
        <div className="max-w-4xl mx-auto text-center px-12">
          <h3 className="font-headline text-4xl mb-6">Join the Expedition</h3>
          <p className="font-body text-on-surface-variant mb-12">
            Receive monthly stories from the field, technical insights, and early access to print releases.
          </p>
          <form className="flex flex-col md:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              className="bg-surface-container border-none p-4 w-full focus:ring-1 focus:ring-primary text-sm font-body"
              placeholder="Email Address"
              type="email"
            />
            <button className="bg-primary text-on-primary px-8 py-4 font-label uppercase tracking-widest text-sm hover:bg-primary-fixed-dim transition-all">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
