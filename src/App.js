import React, { useState, useCallback } from 'react';
import videos from './videos';
import useFrameLoader from './useFrameLoader';
import LoadingScreen from './LoadingScreen';
import Header from './Header';
import ScrollCanvas from './ScrollCanvas';
import ScrollHint from './ScrollHint';

export default function App() {
  const [activeVideo, setActiveVideo] = useState(0);
  const { progress, loaded, framesRef } = useFrameLoader(videos);

  const handleTabClick = useCallback((idx) => {
    if (idx === activeVideo) return;
    setActiveVideo(idx);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeVideo]);

  return (
    <>
      <LoadingScreen progress={progress} loaded={loaded} />
      <Header
        videos={videos}
        activeVideo={activeVideo}
        onTabClick={handleTabClick}
      />
      <ScrollCanvas
        framesRef={framesRef}
        activeVideo={activeVideo}
        videoConfig={videos[activeVideo]}
      />
      <ScrollHint />
    </>
  );
}
