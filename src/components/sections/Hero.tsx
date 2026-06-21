'use client';

import { useEffect, useState } from 'react';
import SplineRobot from '@/components/three/SplineRobot';

const ROLES = ['QA Engineer', 'UI/UX Designer', 'Frontend Developer', 'Team Leader'];

function useTypewriter(texts: string[], speed = 80, pause = 2000) {
  const [display, setDisplay] = useState('');
  const [textIdx, setTextIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx(c => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx(c => c - 1), speed / 2);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setTextIdx(i => (i + 1) % texts.length);
    }

    setDisplay(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, textIdx, texts, speed, pause]);

  return display;
}

export default function Hero() {
  const role = useTypewriter(ROLES);

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        zIndex: 1,
        minHeight: '100svh',
        paddingTop: '100px',
        paddingBottom: '60px',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: 'transparent',
      }}
    >
      {/* Background nebula glow */}
      <div
        style={{
          position: 'absolute',
          top: '-20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'min(900px, 140vw)',
          height: '600px',
          background: 'radial-gradient(ellipse at center, rgba(124,58,237,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
          animation: 'nebula-pulse 6s ease-in-out infinite',
        }}
      />

      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 40px',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '60px',
          alignItems: 'center',
        }}
        className="hero-grid"
      >
        {/* LEFT: Text content */}
        <div style={{ animation: 'slide-up 0.8s ease forwards' }}>
          {/* Status tag */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 18px',
              background: 'rgba(124,58,237,0.1)',
              border: '1px solid rgba(124,58,237,0.3)',
              borderRadius: '30px',
              marginBottom: '28px',
              fontSize: '0.82rem',
              color: 'var(--purple-light)',
              fontFamily: 'var(--font-inter)',
              fontWeight: 500,
              backdropFilter: 'blur(10px)',
            }}
          >
            <span style={{ color: '#4ade80', fontSize: '0.7rem' }}>✦</span>
            QA Engineer @ Skypoint · MCA Graduate
          </div>

          {/* Name */}
          <h1
            style={{
              fontFamily: 'var(--font-space)',
              fontSize: 'clamp(2.25rem, 11vw, 6.5rem)',
              fontWeight: 700,
              lineHeight: 1.05,
              marginBottom: '16px',
              color: 'var(--white)',
            }}
          >
            <span style={{ display: 'block' }}>Anush</span>
            <span
              style={{
                display: 'block',
                background: 'linear-gradient(135deg, #fff 30%, rgba(167,139,250,0.7) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Kulal M.
            </span>
          </h1>

          {/* Typewriter role */}
          <div
            style={{
              fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)',
              fontFamily: 'var(--font-space)',
              fontWeight: 600,
              marginBottom: '20px',
              height: '2.2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '2px',
            }}
            className="hero-role"
          >
            <span
              style={{
                background: 'linear-gradient(135deg, #A78BFA, #06B6D4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {role}
            </span>
            <span
              style={{
                width: '2px',
                height: '1.4em',
                background: 'var(--purple-light)',
                display: 'inline-block',
                animation: 'blink-cursor 1s ease-in-out infinite',
                marginLeft: '2px',
                borderRadius: '1px',
              }}
            />
          </div>

          {/* Description */}
          <p
            className="hero-desc"
            style={{
              color: 'var(--gray)',
              fontSize: 'clamp(0.9rem, 3.5vw, 1rem)',
              lineHeight: 1.75,
              maxWidth: '500px',
              marginBottom: '36px',
              fontFamily: 'var(--font-inter)',
            }}
          >
            MCA graduate from Jain University, currently working as a QA Engineer (Intern) at
            Skypoint in Bengaluru. I have a passion for crafting beautiful interfaces, building
            seamless user experiences, and leading teams to deliver great products — bridging
            design and development with an eye for detail.
          </p>

          {/* CTA Buttons */}
          <div className="hero-cta" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '48px' }}>
            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                padding: '14px 32px',
                background: 'linear-gradient(135deg, #7C3AED, #A78BFA)',
                border: 'none',
                borderRadius: '12px',
                color: '#fff',
                fontFamily: 'var(--font-inter)',
                fontSize: '0.95rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 0 25px rgba(124,58,237,0.4)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-3px)';
                (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 40px rgba(124,58,237,0.6)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 25px rgba(124,58,237,0.4)';
              }}
            >
              View My Work →
            </button>
            <a
              href="/resume.pdf"
              download
              style={{
                padding: '14px 32px',
                background: 'rgba(124,58,237,0.1)',
                border: '1px solid rgba(124,58,237,0.4)',
                borderRadius: '12px',
                color: 'var(--purple-light)',
                fontFamily: 'var(--font-inter)',
                fontSize: '0.95rem',
                fontWeight: 600,
                cursor: 'pointer',
                textDecoration: 'none',
                display: 'inline-block',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)',
                textAlign: 'center',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(124,58,237,0.2)';
                (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(124,58,237,0.1)';
                (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
              }}
            >
              ↓ Download Resume
            </a>
          </div>

          {/* Scroll hint */}
          <div
            className="hero-scroll"
            style={{
              color: 'var(--gray)',
              fontSize: '0.82rem',
              fontFamily: 'var(--font-inter)',
              animation: 'bounce-hint 2s ease-in-out infinite',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span>Scroll to explore</span>
            <span>↓</span>
          </div>
        </div>

        {/* RIGHT: Cursor-tracking 3D robot */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
          <SplineRobot />
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
            text-align: center;
          }
          .hero-grid > div:last-child { justify-content: center !important; }
          .hero-desc { margin-left: auto !important; margin-right: auto !important; }
          .hero-role, .hero-cta, .hero-scroll { justify-content: center !important; }
        }
        @media (max-width: 480px) {
          .hero-grid { gap: 28px !important; }
          .hero-cta > button, .hero-cta > a { flex: 1 1 100%; text-align: center; }
          #hero { padding-top: 92px !important; padding-bottom: 40px !important; }
        }
      `}</style>
    </section>
  );
}
