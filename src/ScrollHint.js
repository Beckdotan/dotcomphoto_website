import React, { useState, useEffect } from 'react';
import './ScrollHint.css';

export default function ScrollHint() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setHidden(true);
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={`scroll-hint ${hidden ? 'hidden' : ''}`}>
      <span>Scroll to play</span>
    </div>
  );
}
