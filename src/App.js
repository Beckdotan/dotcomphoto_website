import React, { useState, useCallback, useEffect } from 'react';
import videos from './videos';
import useFrameLoader from './useFrameLoader';
import ScrollCanvas from './ScrollCanvas';
import Navigation from './components/Navigation';
import BackgroundSwitcher from './components/BackgroundSwitcher';
import FilmGrain from './components/FilmGrain';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import GalleryPage from './pages/GalleryPage';
import LearningPage from './pages/LearningPage';

export default function App() {
  const [activeVideo, setActiveVideo] = useState(0);
  const [activePage, setActivePage] = useState('home');
  const { progress, loaded, framesRef } = useFrameLoader(videos);

  const handleBgSwitch = useCallback((idx) => {
    if (idx === activeVideo) return;
    setActiveVideo(idx);
  }, [activeVideo]);

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

      {/* Navigation */}
      <Navigation activePage={activePage} onNavigate={handleNavigate} blurEnabled={navBlur} />

      {/* Page Content */}
      {renderPage()}

      {/* Film grain texture */}
      <FilmGrain />

      {/* Background Switcher — only on home */}
      {activePage === 'home' && (
        <BackgroundSwitcher
          videos={videos}
          activeVideo={activeVideo}
          onSwitch={handleBgSwitch}
        />
      )}
    </>
  );
}
