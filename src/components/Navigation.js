import React from 'react';

const pages = [
  { id: 'gallery', label: 'Gallery' },
  { id: 'learning', label: 'Learning' },
  { id: 'about', label: 'About' },
];

export default function Navigation({ activePage, onNavigate, blurEnabled = true }) {
  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-500" style={{
      background: blurEnabled
        ? 'linear-gradient(to bottom, rgba(17,20,18,0.45) 0%, rgba(17,20,18,0.2) 70%, transparent 100%)'
        : 'linear-gradient(to bottom, rgba(17,20,18,0.3) 0%, transparent 100%)',
      backdropFilter: blurEnabled ? 'blur(10px)' : 'none',
      WebkitBackdropFilter: blurEnabled ? 'blur(10px)' : 'none',
      maskImage: blurEnabled ? 'linear-gradient(to bottom, black 60%, transparent 100%)' : 'none',
      WebkitMaskImage: blurEnabled ? 'linear-gradient(to bottom, black 60%, transparent 100%)' : 'none',
    }}>
      <div className="flex justify-between items-center px-8 py-4 w-full max-w-none">
        <button
          onClick={() => onNavigate('home')}
          className="text-lg font-headline italic text-primary/90 tracking-tight hover:text-primary transition-colors duration-300"
        >
          The Digital Gallery
        </button>
        <div className="hidden md:flex items-center gap-10 font-headline text-[13px] font-light tracking-wide">
          {pages.map((page) => (
            <button
              key={page.id}
              onClick={() => onNavigate(page.id)}
              className={`transition-colors duration-300 pb-0.5 ${
                activePage === page.id
                  ? 'text-tertiary border-b border-tertiary/40'
                  : 'text-on-surface-variant/70 hover:text-primary'
              }`}
            >
              {page.label}
            </button>
          ))}
        </div>
        {/* Spacer to keep nav centered */}
        <div className="w-[100px] hidden md:block" />
      </div>
    </nav>
  );
}
