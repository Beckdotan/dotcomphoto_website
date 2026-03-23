import { useEffect, useState, useRef } from 'react';

export default function useScrollProgress() {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const totalHeight = el.offsetHeight - window.innerHeight;
      if (totalHeight <= 0) { setProgress(0); return; }
      const scrolled = -rect.top;
      setProgress(Math.max(0, Math.min(1, scrolled / totalHeight)));
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return [ref, progress];
}
