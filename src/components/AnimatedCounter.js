import React, { useState, useEffect } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

export default function AnimatedCounter({ end, suffix = '', duration = 2000 }) {
  const [ref, isVisible] = useScrollReveal(0.3);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const startTime = performance.now();

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * end);
      setCount(current);
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [isVisible, end, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  );
}
