import React from 'react';

export default function BackgroundSwitcher({ videos, activeVideo, onSwitch }) {
  return (
    <div className="bg-switcher">
      <span className="bg-switcher-label">BG</span>
      {videos.map((_, idx) => (
        <button
          key={idx}
          className={`bg-dot ${idx === activeVideo ? 'active' : ''}`}
          onClick={() => onSwitch(idx)}
          aria-label={`Background ${idx + 1}`}
        />
      ))}
    </div>
  );
}
