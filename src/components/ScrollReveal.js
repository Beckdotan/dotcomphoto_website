import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up', // 'up' | 'left' | 'right' | 'none'
  threshold = 0.15,
}) {
  const [ref, isVisible] = useScrollReveal(threshold);

  const transforms = {
    up: 'translateY(40px)',
    left: 'translateX(-40px)',
    right: 'translateX(40px)',
    none: 'none',
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'none' : transforms[direction],
        transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
}
