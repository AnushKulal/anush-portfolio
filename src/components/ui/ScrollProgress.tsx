'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Thin neon gradient bar pinned to the top of the viewport that fills
 * left-to-right as the page scrolls. Purely decorative (aria-hidden).
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        transformOrigin: '0%',
        scaleX,
        zIndex: 200,
        background: 'linear-gradient(90deg, #7C3AED, #A78BFA, #06B6D4)',
        boxShadow: '0 0 12px rgba(124,58,237,0.7), 0 0 4px rgba(6,182,212,0.6)',
        pointerEvents: 'none',
      }}
    />
  );
}
