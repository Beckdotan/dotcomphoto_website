import React, { useState } from 'react';
import Footer from '../components/Footer';

export default function AboutPage() {
  const [formStatus, setFormStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
    }).then(() => {
      setFormStatus('sent');
      form.reset();
    }).catch(() => setFormStatus('error'));
  };

  return (
    <div className="page-content">
      {/* Hero Section */}
      <section className="relative w-full h-screen overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            alt="Photographer with camera and tripod"
            className="w-full h-full object-contain object-bottom"
            src="https://res.cloudinary.com/diepbwdm5/image/upload/w_1400,q_auto,f_auto/v1775153988/download_10_cg5e6k.png"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-surface"></div>
        </div>
        <div className="relative z-10 h-full flex flex-col justify-end px-12 pb-24 max-w-[1920px] mx-auto">
          <span className="font-label text-tertiary tracking-[0.3em] uppercase text-xs mb-4">The Visionary</span>
          <h1 className="font-headline text-6xl md:text-8xl font-light tracking-tight text-on-surface max-w-4xl leading-tight">
            Chasing the <span className="italic">Quiet</span> Light.
          </h1>
        </div>
      </section>

      {/* My Journey + Mission & Ethics combined */}
      <section className="py-32 bg-surface-container-low">
        <div className="max-w-[1920px] mx-auto px-12 grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          <div className="relative group">
            <div className="absolute -top-12 -left-12 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
            <img
              alt="Photographer in the field"
              className="w-full aspect-[4/5] object-cover rounded-sm shadow-2xl"
              src="https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774637645/download_10_pukwoo.jpg"
            />
          </div>
          <div className="space-y-8 pr-0 md:pr-12">
            <h2 className="font-headline text-4xl md:text-5xl font-light">My Journey</h2>
            <div className="space-y-6 font-body text-on-surface-variant leading-relaxed text-lg">
              <p>I've been shooting for sixteen years, since I was fifteen. What started as a curiosity about light and darkness turned into a lifelong practice — and eventually, a profession.</p>
              <p>My focus is nature at night. Not just the Milky Way or star trails — but the full landscape after dark. The textures, the silence, the way familiar places become something entirely different under starlight. I also photograph people in nature, where neither dominates — both the human and the wild carry equal weight in the frame.</p>
              <p>I travel to shoot and I keep coming back. Some locations I've visited dozens of times across different seasons, learning how the light shifts and where the compositions hide. Other times I'm exploring somewhere completely new — a remote ridge, a local coastline at 3am. The best images usually come from places I know deeply, but the search for new ones never stops.</p>
              <p>Along the way, my work has been recognized by the Australian Government as among the best photography of Australia that year. I also teach workshops, give lectures, and work with people who want to develop their own eye for the wild. If you're looking to learn, collaborate, or just talk photography — I'd love to hear from you.</p>
            </div>

            {/* Mission & Ethics inline */}
            <div className="pt-12 border-t border-outline-variant/10">
              <h3 className="font-headline text-2xl mb-8">Mission &amp; Ethics</h3>
              <div className="space-y-8">
                {[
                  { num: '01', title: 'Leave No Trace', desc: 'My photography follows a strict non-interference policy. I do not bait wildlife, move natural elements for composition, or geotag sensitive locations.' },
                  { num: '02', title: 'Conservation Impact', desc: '15% of all print proceeds are donated directly to the Wilderness Society and local land conservancies to protect the habitats I document.' },
                  { num: '03', title: 'Educational Outreach', desc: 'Teaching the next generation of photographers that the story of the animal is more important than the quality of the shot.' },
                ].map((item) => (
                  <div key={item.num} className="flex gap-6">
                    <span className="font-headline text-3xl text-tertiary-fixed-dim/30 italic">{item.num}</span>
                    <div>
                      <h4 className="font-headline text-lg mb-2">{item.title}</h4>
                      <p className="font-body text-on-surface-variant text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact / Get in Touch */}
      <section className="py-32 border-t border-outline-variant/10 bg-background">
        <div className="max-w-3xl mx-auto px-12">
          <div className="text-center mb-16">
            <span className="font-label text-tertiary text-[10px] tracking-[0.4em] uppercase mb-3 block">Get in Touch</span>
            <h3 className="font-headline text-4xl md:text-5xl font-light mb-4">Let's Work Together</h3>
            <p className="font-body text-on-surface-variant text-lg">
              Whether it's a print for your wall, a workshop in the wild, a speaking engagement, or a creative collaboration — I'd love to hear from you.
            </p>
          </div>

          <form
            action="https://formsubmit.co/YOUR_EMAIL_HERE"
            method="POST"
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="font-label text-xs text-on-surface-variant uppercase tracking-widest mb-2 block">Name</label>
                <input
                  name="name"
                  required
                  className="w-full bg-surface-container border border-outline-variant/20 p-4 text-on-surface font-body text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="font-label text-xs text-on-surface-variant uppercase tracking-widest mb-2 block">Email</label>
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full bg-surface-container border border-outline-variant/20 p-4 text-on-surface font-body text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-colors"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label className="font-label text-xs text-on-surface-variant uppercase tracking-widest mb-2 block">I'm interested in</label>
              <select
                name="interest"
                required
                className="w-full bg-surface-container border border-outline-variant/20 p-4 text-on-surface font-body text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-colors"
              >
                <option value="">Select a topic...</option>
                <option value="prints">Prints &amp; Fine Art</option>
                <option value="workshop">Workshops &amp; Expeditions</option>
                <option value="lecture">Lectures &amp; Speaking</option>
                <option value="collaboration">Creative Collaboration</option>
                <option value="licensing">Photo Licensing &amp; Usage</option>
                <option value="job">Job Opportunity</option>
                <option value="other">Something Else</option>
              </select>
            </div>

            <div>
              <label className="font-label text-xs text-on-surface-variant uppercase tracking-widest mb-2 block">Message</label>
              <textarea
                name="message"
                required
                rows={5}
                className="w-full bg-surface-container border border-outline-variant/20 p-4 text-on-surface font-body text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-colors resize-none"
                placeholder="Tell me about what you have in mind..."
              />
            </div>

            <div className="text-center pt-4">
              <button
                type="submit"
                className="bg-primary text-on-primary px-12 py-4 font-label uppercase tracking-widest text-sm hover:bg-primary-fixed-dim transition-all"
              >
                Send Message
              </button>
              {formStatus === 'sent' && (
                <p className="mt-4 text-primary font-label text-sm">Message sent! I'll get back to you soon.</p>
              )}
              {formStatus === 'error' && (
                <p className="mt-4 text-red-400 font-label text-sm">Something went wrong. Please try again.</p>
              )}
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
