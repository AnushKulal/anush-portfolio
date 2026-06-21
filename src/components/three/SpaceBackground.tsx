'use client';

import { useEffect, useRef } from 'react';

/**
 * Performant space background — a canvas-2D galaxy starfield + a CSS black hole
 * (accretion disk) at the top. No WebGL, so it stays at 60fps and never fights
 * the avatar's WebGL canvas for the GPU.
 */
function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0, h = 0, dpr = 1;
    let stars: { x: number; y: number; z: number; r: number; tw: number; ph: number; hue: number }[] = [];

    const build = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(220, Math.floor((w * h) / 9000));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: Math.random() * 0.8 + 0.2,
        r: Math.random() * 1.4 + 0.3,
        tw: Math.random() * Math.PI * 2,
        ph: 0.4 + Math.random() * 0.6,
        hue: Math.random(),
      }));
    };
    build();

    let raf = 0;
    let scrollY = window.scrollY;
    const onScroll = () => { scrollY = window.scrollY; };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', build);

    let t = 0;
    const render = () => {
      t += 0.016;
      ctx.clearRect(0, 0, w, h);
      const par = scrollY * 0.04;
      for (const s of stars) {
        const tw = reduced ? 1 : 0.55 + Math.sin(t * s.ph + s.tw) * 0.45;
        const y = (s.y - par * s.z) % h;
        const yy = y < 0 ? y + h : y;
        ctx.globalAlpha = tw * s.z;
        ctx.fillStyle =
          s.hue < 0.7 ? '#ffffff' : s.hue < 0.88 ? '#A78BFA' : '#60A5FA';
        ctx.beginPath();
        ctx.arc(s.x, yy, s.r * s.z, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', build);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0 }} />;
}

export default function SpaceBackground() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        background:
          'radial-gradient(ellipse 120% 80% at 50% -10%, rgba(124,58,237,0.18) 0%, transparent 45%),' +
          'radial-gradient(ellipse at 85% 70%, rgba(59,130,246,0.10) 0%, transparent 40%),' +
          'radial-gradient(ellipse at 15% 85%, rgba(168,85,247,0.08) 0%, transparent 40%),' +
          '#030014',
        overflow: 'hidden',
      }}
    >
      <Starfield />

      {/* ── Black hole at top center ── */}
      <div className="blackhole">
        {/* outer purple glow */}
        <div className="bh-glow" />
        {/* rotating accretion disk */}
        <div className="bh-disk" />
        {/* second disk, slower / opposite */}
        <div className="bh-disk bh-disk-2" />
        {/* dark event horizon */}
        <div className="bh-core" />
        {/* bright lensing arc */}
        <div className="bh-lens" />
      </div>

      <style>{`
        .blackhole {
          position: absolute;
          top: -240px;
          left: 50%;
          transform: translateX(-50%);
          width: 760px;
          height: 760px;
          max-width: 130vw;
          pointer-events: none;
        }
        .bh-glow {
          position: absolute; inset: 0;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(124,58,237,0.30) 0%, rgba(59,130,246,0.10) 35%, transparent 60%);
          filter: blur(20px);
          animation: nebula-pulse 7s ease-in-out infinite;
        }
        .bh-disk {
          position: absolute; inset: 130px;
          border-radius: 50%;
          background: conic-gradient(from 0deg,
            transparent 0deg, rgba(167,139,250,0.0) 20deg,
            rgba(167,139,250,0.85) 70deg, rgba(96,165,250,0.95) 120deg,
            rgba(255,255,255,0.95) 175deg, rgba(124,58,237,0.85) 210deg,
            rgba(96,165,250,0.5) 260deg, transparent 320deg, transparent 360deg);
          -webkit-mask: radial-gradient(circle, transparent 38%, #000 44%, #000 60%, transparent 70%);
          mask: radial-gradient(circle, transparent 38%, #000 44%, #000 60%, transparent 70%);
          filter: blur(3px);
          animation: bh-spin 14s linear infinite;
        }
        .bh-disk-2 {
          inset: 150px;
          filter: blur(8px);
          opacity: 0.6;
          animation: bh-spin 22s linear infinite reverse;
        }
        .bh-core {
          position: absolute; inset: 0;
          margin: auto;
          width: 230px; height: 230px;
          border-radius: 50%;
          background: radial-gradient(circle, #000 52%, rgba(10,5,30,0.6) 66%, transparent 75%);
          box-shadow: inset 0 0 60px rgba(124,58,237,0.5), 0 0 70px rgba(124,58,237,0.35);
        }
        .bh-lens {
          position: absolute;
          left: 50%; top: 50%;
          transform: translate(-50%, -50%);
          width: 360px; height: 360px;
          border-radius: 50%;
          border: 2px solid transparent;
          border-bottom-color: rgba(255,255,255,0.9);
          border-left-color: rgba(167,139,250,0.55);
          border-right-color: rgba(96,165,250,0.55);
          filter: blur(1.5px) drop-shadow(0 0 12px rgba(167,139,250,0.8));
          animation: bh-spin 9s linear infinite;
        }
        @keyframes bh-spin { from { transform: rotate(0deg);} to { transform: rotate(360deg);} }
        .bh-disk, .bh-disk-2 { transform-origin: center; }
        @media (max-width: 768px) {
          .blackhole { width: 520px; height: 520px; top: -180px; }
          .bh-disk { inset: 90px; } .bh-disk-2 { inset: 105px; }
          .bh-core { width: 150px; height: 150px; }
          .bh-lens { width: 240px; height: 240px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .bh-disk, .bh-disk-2, .bh-lens, .bh-glow { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
