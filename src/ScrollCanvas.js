import React, { useRef, useEffect, useCallback } from 'react';
import './ScrollCanvas.css';

export default function ScrollCanvas({ framesRef, activeVideo, videoConfig }) {
  const canvasRef = useRef(null);
  const currentFrameRef = useRef(0);

  const drawFrame = useCallback((index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const frames = framesRef.current[activeVideo];
    if (!frames) return;

    const safeIndex = Math.min(index, videoConfig.totalFrames - 1);
    const img = frames[safeIndex];
    if (!img || !img.complete) return;

    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;
    let drawW, drawH, drawX, drawY;

    if (imgRatio > canvasRatio) {
      drawH = canvas.height;
      drawW = img.width * (canvas.height / img.height);
      drawX = (canvas.width - drawW) / 2;
      drawY = 0;
    } else {
      drawW = canvas.width;
      drawH = img.height * (canvas.width / img.width);
      drawX = 0;
      drawY = (canvas.height - drawH) / 2;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  }, [activeVideo, framesRef, videoConfig]);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawFrame(currentFrameRef.current);
  }, [drawFrame]);

  useEffect(() => {
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [resize]);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollFraction = scrollTop / maxScroll;
      const frameIndex = Math.min(
        Math.floor(scrollFraction * videoConfig.totalFrames),
        videoConfig.totalFrames - 1
      );

      if (frameIndex !== currentFrameRef.current) {
        currentFrameRef.current = frameIndex;
        requestAnimationFrame(() => drawFrame(frameIndex));
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [drawFrame, videoConfig]);

  // Redraw frame 0 when active video changes
  useEffect(() => {
    currentFrameRef.current = 0;
    drawFrame(0);
  }, [activeVideo, drawFrame]);

  return (
    <div className="scroll-container">
      <canvas ref={canvasRef} className="scroll-canvas" />
    </div>
  );
}
