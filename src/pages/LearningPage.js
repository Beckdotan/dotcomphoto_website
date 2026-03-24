import React, { useState } from 'react';
import Footer from '../components/Footer';
import ScrollReveal from '../components/ScrollReveal';

/* ─── Video data ─── */
const videos = [
  {
    id: 'EvT4xFsrSG8',
    title: 'Night Photography — How to Focus',
    tag: 'Night Photography',
    duration: '2:01',
  },
  {
    id: 'cIyZvpvzILU',
    title: 'What Lens Do You Need for Landscape?',
    tag: 'Gear',
    duration: '2:58',
  },
  {
    id: 't-H0h1Orj2g',
    title: 'Night Photo Editing — Full Webinar',
    tag: 'Photo Editing',
    duration: '4:15',
  },
  {
    id: 'LYLmUpYZ_e4',
    title: 'Milky Way Photography Tips',
    tag: 'General',
    duration: '1:10',
  },
  {
    id: 'OzRGINWmvH4',
    title: 'Landscape Photography in the Field',
    tag: 'Landscape Photography',
    duration: '3:00',
  },
  {
    id: 'olux54_C7zY',
    title: 'Landscape Composition Techniques',
    tag: 'Landscape Photography',
    duration: '2:30',
  },
  {
    id: '-mUIRmlXodU',
    title: 'Star Trails & Night Sky Techniques',
    tag: 'Night Photography',
    duration: '2:43',
  },
  {
    id: 'fCQ9lgDvO3I',
    title: 'Photo Editing Workflow',
    tag: 'Photo Editing',
    duration: '1:33',
  },
  {
    id: 'Id3njDopr2M',
    title: 'Gear Essentials for the Field',
    tag: 'Gear',
    duration: '2:00',
  },
];

const allTags = ['All', 'Night Photography', 'Landscape Photography', 'Photo Editing', 'Gear', 'General'];

/* ─── YouTube Video Card ─── */
function VideoCard({ video, index }) {
  return (
    <a
      href={`https://www.youtube.com/watch?v=${video.id}&t=0`}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
      style={{ animation: `gridFadeIn 0.4s ${index * 0.06}s both` }}
    >
      <div className="aspect-video relative overflow-hidden bg-surface-container">
        <img
          src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors duration-300">
          <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-90 group-hover:scale-100">
            <span className="material-symbols-outlined text-white text-2xl ml-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
          </div>
        </div>
        {/* Duration badge */}
        <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm px-2 py-0.5 text-[10px] font-bold text-white/80">
          {video.duration}
        </div>
      </div>
      <div className="mt-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-tertiary font-label text-[10px] uppercase tracking-widest">{video.tag}</span>
        </div>
        <h3 className="font-headline text-lg text-on-surface group-hover:text-tertiary transition-colors duration-300 leading-snug">
          {video.title}
        </h3>
      </div>
    </a>
  );
}

/* ─── Free Learning Section ─── */
function FreeLearning() {
  const [activeTag, setActiveTag] = useState('All');

  const filtered = activeTag === 'All' ? videos : videos.filter(v => v.tag === activeTag);

  return (
    <section className="px-8 md:px-12 lg:px-24 mb-32">
      <style>{`
        @keyframes gridFadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <ScrollReveal>
            <span className="text-tertiary font-label text-[10px] tracking-[0.4em] uppercase mb-3 block">Free Learning</span>
            <h2 className="font-headline text-4xl md:text-5xl text-on-surface font-light">YouTube</h2>
            <p className="text-on-surface-variant font-body text-base mt-4 max-w-lg leading-relaxed">
              Photography techniques, gear insights, and behind-the-scenes of life in the wild. New content regularly.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <a
              href="https://www.youtube.com/@dotcomphoto7347"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 group/yt transition-all duration-300"
            >
              <span className="text-tertiary font-label text-xs uppercase tracking-widest">
                Visit Channel
              </span>
              <div className="w-8 h-8 rounded-full bg-tertiary/20 flex items-center justify-center group-hover/yt:bg-tertiary transition-all">
                <span className="material-symbols-outlined text-tertiary text-base group-hover/yt:text-on-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
              </div>
            </a>
          </ScrollReveal>
        </div>

        {/* Tag filters */}
        <ScrollReveal className="mb-10">
          <div className="flex gap-2 flex-wrap">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-4 py-2 font-label text-[11px] uppercase tracking-widest transition-all duration-300 ${
                  activeTag === tag
                    ? 'bg-tertiary/15 text-tertiary'
                    : 'text-on-surface-variant/40 hover:text-on-surface-variant'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Video grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12" key={activeTag}>
          {filtered.map((video, i) => (
            <VideoCard key={video.id} video={video} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-on-surface-variant/40 font-label text-sm text-center py-20">
            More videos coming soon.
          </p>
        )}
      </div>
    </section>
  );
}

/* ─── Workshops & Guiding ─── */
function Workshops() {
  const tours = [
    {
      img: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774263576/IMG_20180818_174217_527_smh8ff.jpg',
      badge: 'Workshop',
      title: 'Night Photography Workshop',
      desc: 'Learn to capture the night sky, star trails, and the Milky Way in hands-on sessions under dark skies.',
      date: 'Upcoming',
      slots: 'Open',
    },
    {
      img: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774263516/untitled-6182_Large_n1evll.jpg',
      badge: 'Workshop',
      title: 'Nature Photography Workshop',
      desc: 'From composition to field craft — immerse yourself in nature and develop your landscape photography skills.',
      date: 'Upcoming',
      slots: 'Open',
    },
    {
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjyUOaxwtIwO91h6jGqpqEw9bZ4TII5m2zFZp3pWcYvFktFrumPGUqfzgEbFYIEGrEUPpGmGNyH6HsTRwLEElxaJr6pa17ywFG2caBRRIAggqCWPpbschsUHMJTbeCGsfRkceYFhTnx4dA50dvioEfwHb9lCfl12U1F6wPQ2-hVUpJRxGMzOT2JOBFmVTvMzAVql7hCrxehQik1e88djWCIGA7X03h7okqp9ct1INgoj-NihAgBaSCEY_cnx7baU6JsQsH5GxPmP7U',
      badge: 'Online',
      title: 'Online Photography & Editing Classes',
      desc: 'Master photography and post-processing techniques from anywhere — live sessions and recorded content.',
      date: 'Upcoming',
      slots: 'Open',
    },
  ];

  return (
    <section className="bg-surface-container-low py-32 px-8 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <ScrollReveal>
            <span className="text-tertiary font-label text-[10px] tracking-[0.4em] uppercase mb-3 block">Expeditions</span>
            <h2 className="font-headline text-4xl md:text-5xl text-on-surface font-light">Guiding &amp; Workshops</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-on-surface-variant font-label text-sm uppercase tracking-widest">View the wilderness first-hand</p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {tours.map((tour, i) => (
            <ScrollReveal key={tour.title} delay={i * 0.08}>
              <div className="group flex flex-col">
                <div className="aspect-[4/5] overflow-hidden mb-6 relative">
                  <img
                    alt={tour.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    src={tour.img}
                  />
                  <div className="absolute top-5 left-5">
                    <span className="bg-background/70 backdrop-blur-md px-3 py-1 text-[10px] font-label text-tertiary uppercase tracking-widest">
                      {tour.badge}
                    </span>
                  </div>
                </div>
                <span className="text-tertiary font-label text-[10px] uppercase tracking-[0.2em] mb-2">{tour.date} &middot; {tour.slots}</span>
                <h3 className="font-headline text-xl text-on-surface mb-3 group-hover:text-primary transition-colors">{tour.title}</h3>
                <p className="text-on-surface-variant font-body text-sm leading-relaxed">{tour.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Contact Form (Formsubmit) ─── */
function ContactForm() {
  return (
    <section className="py-32 px-8 md:px-12 lg:px-24 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {/* Left — editorial text */}
          <ScrollReveal>
            <span className="text-tertiary font-label text-[10px] tracking-[0.4em] uppercase mb-3 block">Private Inquiry</span>
            <h2 className="font-headline text-4xl md:text-5xl text-on-surface font-light mb-8 leading-[1.15]">
              Commission a<br />Private <span className="italic text-primary">Expedition</span>
            </h2>
            <p className="text-on-surface-variant font-body text-base leading-relaxed mb-8 max-w-md">
              Looking for a bespoke photography workshop, private guiding in a specific location, or a corporate team expedition? Let's design something together.
            </p>
            <div className="space-y-6">
              {[
                { icon: 'photo_camera', text: '1-on-1 or small group workshops' },
                { icon: 'map', text: 'Custom routes and location scouting' },
                { icon: 'night_sight_auto', text: 'Specialized night photography sessions' },
              ].map((item) => (
                <div key={item.icon} className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-tertiary/60 text-xl">{item.icon}</span>
                  <span className="font-body text-on-surface-variant text-sm">{item.text}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Right — form */}
          <ScrollReveal delay={0.15}>
            <form
              action="https://formsubmit.co/YOUR_EMAIL_HERE"
              method="POST"
              className="space-y-5"
            >
              {/* Formsubmit config */}
              <input type="hidden" name="_subject" value="Private Workshop Inquiry — The Curated Wilderness" />
              <input type="hidden" name="_captcha" value="true" />
              <input type="hidden" name="_template" value="table" />
              <input type="text" name="_honey" style={{ display: 'none' }} />

              <div>
                <label className="font-label text-[10px] text-on-surface-variant/50 uppercase tracking-widest block mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full bg-surface-container border-none text-on-surface px-5 py-3.5 font-body text-sm focus:ring-1 focus:ring-tertiary/50 placeholder:text-on-surface-variant/25"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label className="font-label text-[10px] text-on-surface-variant/50 uppercase tracking-widest block mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full bg-surface-container border-none text-on-surface px-5 py-3.5 font-body text-sm focus:ring-1 focus:ring-tertiary/50 placeholder:text-on-surface-variant/25"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="font-label text-[10px] text-on-surface-variant/50 uppercase tracking-widest block mb-2">Type of Workshop</label>
                <select
                  name="workshop_type"
                  required
                  className="w-full bg-surface-container border-none text-on-surface px-5 py-3.5 font-body text-sm focus:ring-1 focus:ring-tertiary/50"
                >
                  <option value="">Select...</option>
                  <option value="private_1on1">Private 1-on-1 Session</option>
                  <option value="small_group">Small Group Workshop</option>
                  <option value="night_photography">Night Photography Session</option>
                  <option value="corporate">Corporate Team Expedition</option>
                  <option value="custom">Custom / Other</option>
                </select>
              </div>

              <div>
                <label className="font-label text-[10px] text-on-surface-variant/50 uppercase tracking-widest block mb-2">Message</label>
                <textarea
                  name="message"
                  rows="4"
                  required
                  className="w-full bg-surface-container border-none text-on-surface px-5 py-3.5 font-body text-sm focus:ring-1 focus:ring-tertiary/50 resize-none placeholder:text-on-surface-variant/25"
                  placeholder="Tell me about your vision — preferred dates, locations, group size, what you'd like to learn..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-on-primary py-4 font-label text-xs uppercase tracking-[0.2em] hover:bg-primary-fixed-dim transition-colors duration-300"
              >
                Send Inquiry
              </button>

              <p className="text-on-surface-variant/30 font-label text-[10px] text-center mt-4">
                I'll respond within 48 hours. No spam, ever.
              </p>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/* ─── Learning Page ─── */
export default function LearningPage() {
  return (
    <div className="page-content">
      <main className="pt-28 pb-0 bg-background">
        {/* Hero */}
        <header className="px-8 md:px-12 lg:px-24 mb-20 max-w-7xl">
          <ScrollReveal>
            <div className="inline-block px-3 py-1 mb-6 border border-outline-variant/20 rounded-full">
              <span className="text-tertiary font-label text-xs uppercase tracking-widest">Learning Hub</span>
            </div>
            <h1 className="font-headline text-6xl md:text-8xl text-on-surface tracking-tighter mb-8 leading-[0.9]">
              Cultivating <br />the <span className="italic text-tertiary">Observant Eye</span>.
            </h1>
            <p className="max-w-2xl text-on-surface-variant text-lg leading-relaxed">
              From night photography fundamentals to advanced field techniques — learn the craft through free videos, guided workshops, and private expeditions.
            </p>
          </ScrollReveal>
        </header>

        <FreeLearning />
        <Workshops />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
