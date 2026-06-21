'use client';

import { Suspense, lazy, useEffect, useRef, useState, Component, ReactNode } from 'react';
import RobotFallback from './RobotFallback';

// Lazy so the Spline runtime stays out of the initial hero bundle.
const Spline = lazy(() => import('@splinetool/react-spline'));
const SCENE_URL = 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode';

// Spline is built on Three.js and needs a real WebGL context. When hardware
// acceleration is disabled the context can't be created, so we detect support
// up front and never mount Spline without it (prevents console spam + crashes).
function isWebGLAvailable(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    const gl =
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl');
    return !!gl;
  } catch {
    return false;
  }
}

// Catches any render-time throw from Spline so it can never crash the page.
class SplineErrorBoundary extends Component<{ children: ReactNode; onFail: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onFail(); }
  render() { return this.state.failed ? null : this.props.children; }
}

function GlowSpinner() {
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2, pointerEvents: 'none' }}>
      <div
        style={{
          width: 60,
          height: 60,
          borderRadius: '50%',
          border: '3px solid rgba(124,58,237,0.15)',
          borderTopColor: 'var(--purple-light)',
          boxShadow: '0 0 25px rgba(124,58,237,0.6), 0 0 50px rgba(124,58,237,0.3)',
          animation: 'spin-slow 0.9s linear infinite',
        }}
      />
    </div>
  );
}

export default function SplineRobot() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [webgl, setWebgl] = useState<boolean | null>(null);

  useEffect(() => {
    setWebgl(isWebGLAvailable());
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { rootMargin: '300px', threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Safety timeout: if the scene never loads, fall back.
  useEffect(() => {
    if (!inView || loaded || failed || webgl !== true) return;
    const t = setTimeout(() => { if (!loaded) setFailed(true); }, 15000);
    return () => clearTimeout(t);
  }, [inView, loaded, failed, webgl]);

  const canRenderSpline = inView && webgl === true && !failed;
  const showFallback = webgl === false || failed;

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: 'clamp(360px, 46vw, 560px)',
        minHeight: '340px',
        maxHeight: '620px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Spotlight glow behind the robot */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          background:
            'radial-gradient(circle at 50% 45%, rgba(124,58,237,0.35) 0%, rgba(6,182,212,0.12) 35%, rgba(3,0,20,0) 70%)',
          filter: 'blur(6px)',
          animation: 'nebula-pulse 6s ease-in-out infinite',
        }}
      />

      {canRenderSpline && (
        <SplineErrorBoundary onFail={() => setFailed(true)}>
          <Suspense fallback={<GlowSpinner />}>
            <Spline
              scene={SCENE_URL}
              onLoad={() => setLoaded(true)}
              onError={() => setFailed(true)}
              style={{ width: '100%', height: '100%' }}
            />
          </Suspense>
        </SplineErrorBoundary>
      )}

      {/* Spinner until the scene reports loaded */}
      {canRenderSpline && !loaded && <GlowSpinner />}

      {/* Cursor-tracking SVG robot when WebGL is unavailable or load fails */}
      {showFallback && <RobotFallback />}

      {/* Cover the "Built with Spline" watermark only while the scene is live */}
      {canRenderSpline && loaded && (
        <div
          aria-hidden
          style={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            width: 150,
            height: 48,
            zIndex: 3,
            background: 'linear-gradient(to top left, var(--bg) 45%, transparent)',
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  );
}
