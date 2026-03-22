import React from 'react';
import './Header.css';

export default function Header({ videos, activeVideo, onTabClick }) {
  return (
    <header className="header">
      <div className="tabs">
        {videos.map((video, idx) => (
          <button
            key={idx}
            className={`tab ${idx === activeVideo ? 'active' : ''}`}
            onClick={() => onTabClick(idx)}
          >
            {video.label}
          </button>
        ))}
      </div>
    </header>
  );
}
