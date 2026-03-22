import { useState, useEffect, useRef } from 'react';

export default function useFrameLoader(videos) {
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const framesRef = useRef([]);

  useEffect(() => {
    const totalFrames = videos.reduce((sum, v) => sum + v.totalFrames, 0);
    let loadedCount = 0;

    framesRef.current = videos.map(() => []);

    videos.forEach((video, vIdx) => {
      for (let i = 1; i <= video.totalFrames; i++) {
        const img = new Image();
        img.onload = () => {
          loadedCount++;
          setProgress(loadedCount / totalFrames);
          if (loadedCount === totalFrames) {
            setLoaded(true);
          }
        };
        img.src = `${process.env.PUBLIC_URL}/${video.folder}/frame_${String(i).padStart(4, '0')}.jpg`;
        framesRef.current[vIdx][i - 1] = img;
      }
    });
  }, [videos]);

  return { progress, loaded, framesRef };
}
