import React from 'react';
import './LoadingScreen.css';

export default function LoadingScreen({ progress, loaded }) {
  return (
    <div className={`loading ${loaded ? 'done' : ''}`}>
      <div className="loading-text">Loading frames</div>
      <div className="loading-bar">
        <div
          className="loading-bar-fill"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
}
