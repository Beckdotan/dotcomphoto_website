import React, { useState, useCallback, useEffect } from 'react';
import videos from './videos';
import useFrameLoader from './useFrameLoader';
import ScrollCanvas from './ScrollCanvas';
import Navigation from './components/Navigation';
import FilmGrain from './components/FilmGrain';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import GalleryPage from './pages/GalleryPage';
import LearningPage from './pages/LearningPage';

// Video assignment per page: home = video 0, about = video 1
const PAGE_VIDEO = { home: 0, about: 1 };

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const activeVideo = PAGE_VIDEO[activePage] ?? 0;
  const { progress, loaded, framesRef } = useFrameLoader(videos);

  const handleNavigate = useCallback((page) => {
    if (page === activePage) return;
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activePage]);

  // Fade out loading screen
  const [showLoading, setShowLoading] = useState(true);
  useEffect(() => {
    if (loaded) {
      const timer = setTimeout(() => setShowLoading(false), 600);
      return () => clearTimeout(timer);
    }
  }, [loaded]);

  // Nav blur: disabled on home page until scrolled past hero
  const [navBlur, setNavBlur] = useState(false);
  useEffect(() => {
    if (activePage !== 'home') {
      setNavBlur(true);
      return;
    }
    setNavBlur(false);
    const onScroll = () => {
      setNavBlur(window.scrollY > window.innerHeight * 2.5);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [activePage]);

  const renderPage = () => {
    switch (activePage) {
      case 'about':
        return <AboutPage />;
      case 'gallery':
        return <GalleryPage />;
      case 'learning':
        return <LearningPage />;
      case 'home':
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <>
      {/* Loading Screen */}
      {showLoading && (
        <div className={`loading-overlay ${loaded ? 'done' : ''}`}>
          <div className="loading-text">Loading Experience</div>
          <div className="loading-bar">
            <div className="loading-bar-fill" style={{ width: `${progress * 100}%` }} />
          </div>
        </div>
      )}

      {/* Fixed video canvas background */}
      <ScrollCanvas
        framesRef={framesRef}
        activeVideo={activeVideo}
        videoConfig={videos[activeVideo]}
        loaded={loaded}
      />

      {/* Darken video background on About page using site's darkest color */}
      {activePage === 'about' && (
        <div
          className="fixed inset-0 pointer-events-none"
          style={{ zIndex: 0, backgroundColor: 'rgba(17, 20, 18, 0.35)' }}
        />
      )}


      {/* Navigation */}
      <Navigation activePage={activePage} onNavigate={handleNavigate} blurEnabled={navBlur} />

      {/* Page Content */}
      {renderPage()}

      {/* Film grain texture */}
      <FilmGrain />
    </>
  );
}
