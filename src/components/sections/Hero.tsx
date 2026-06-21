'use client';

import { useRef, useEffect, useState } from 'react';
import Avatar3D from '@/components/three/Avatar3D';

const ROLES = ['UI/UX Designer', 'Frontend Developer', 'QA Engineer', 'Team Leader'];

const ORBIT_SKILLS = [
  { emoji: '🎨', label: 'Figma', angle: 0 },
  { emoji: '⚛️', label: 'React', angle: 45 },
  { emoji: '🟨', label: 'JavaScript', angle: 90 },
  { emoji: '🟢', label: 'Node.js', angle: 135 },
  { emoji: '🐍', label: 'Python', angle: 180 },
  { emoji: '☕', label: 'Java', angle: 225 },
  { emoji: '🖌️', label: 'Canva', angle: 270 },
  { emoji: '🐙', label: 'Git', angle: 315 },
];

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
  const orbitalRef = useRef<HTMLDivElement>(null);
  const role = useTypewriter(ROLES);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!orbitalRef.current) return;
      const rect = orbitalRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / window.innerWidth;
      const dy = (e.clientY - cy) / window.innerHeight;
      orbitalRef.current.style.transform = `perspective(800px) rotateY(${dx * 12}deg) rotateX(${-dy * 8}deg)`;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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
      {/* Background elements */}
      <div
        style={{
          position: 'absolute',
          top: '-20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '900px',
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
          {/* Available tag */}
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
            MCA Student · Available for Work
          </div>

          {/* Name */}
          <h1
            style={{
              fontFamily: 'var(--font-space)',
              fontSize: 'clamp(3.5rem, 8vw, 6.5rem)',
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
              fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
              fontFamily: 'var(--font-space)',
              fontWeight: 600,
              marginBottom: '20px',
              height: '2.2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '2px',
            }}
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
            style={{
              color: 'var(--gray)',
              fontSize: '1rem',
              lineHeight: 1.75,
              maxWidth: '500px',
              marginBottom: '36px',
              fontFamily: 'var(--font-inter)',
            }}
          >
            MCA student at Jain University with a passion for crafting beautiful interfaces,
            building seamless user experiences, and leading teams to deliver great products.
            Bridging design and development with an eye for detail.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '48px' }}>
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

        {/* RIGHT: Orbital skill showcase */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div className="orbital-scale">
          <div
            ref={orbitalRef}
            style={{
              position: 'relative',
              width: '420px',
              height: '420px',
              transition: 'transform 0.1s ease',
              flexShrink: 0,
            }}
          >
            {/* Outer orbital ring */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                border: '1px dashed rgba(124,58,237,0.4)',
                animation: 'orbit 25s linear infinite',
              }}
            >
              {/* 8 dots on outer ring */}
              {Array.from({ length: 8 }).map((_, i) => {
                const a = (i * 360) / 8;
                const rad = (a * Math.PI) / 180;
                const r = 209;
                const x = 210 + r * Math.cos(rad);
                const y = 210 + r * Math.sin(rad);
                return (
                  <div
                    key={i}
                    style={{
                      position: 'absolute',
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: 'var(--purple-light)',
                      boxShadow: '0 0 8px rgba(167,139,250,0.8)',
                      left: `${x}px`,
                      top: `${y}px`,
                      transform: 'translate(-50%,-50%)',
                    }}
                  />
                );
              })}
            </div>

            {/* Inner orbital ring */}
            <div
              style={{
                position: 'absolute',
                top: '60px',
                left: '60px',
                right: '60px',
                bottom: '60px',
                borderRadius: '50%',
                border: '1px dashed rgba(167,139,250,0.3)',
                animation: 'orbit 18s linear infinite reverse',
              }}
            />

            {/* Center: Live 3D avatar (follows cursor + rotates on scroll) */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%,-50%)',
                width: '260px',
                height: '300px',
                zIndex: 10,
              }}
            >
              {/* glow halo behind the avatar */}
              <div
                style={{
                  position: 'absolute',
                  inset: '10%',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(124,58,237,0.35) 0%, transparent 65%)',
                  filter: 'blur(8px)',
                  animation: 'glow-pulse 4s ease-in-out infinite',
                }}
              />
              <Avatar3D />
            </div>

            {/* Orbiting skill icons */}
            {ORBIT_SKILLS.map((skill, i) => {
              const rad = (skill.angle * Math.PI) / 180;
              const radius = 188;
              const x = 210 + radius * Math.cos(rad);
              const y = 210 + radius * Math.sin(rad);
              return (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    left: `${x}px`,
                    top: `${y}px`,
                    transform: 'translate(-50%,-50%)',
                    zIndex: 5,
                  }}
                >
                  <div
                    style={{
                      width: '54px',
                      height: '54px',
                      background: 'rgba(10,10,26,0.9)',
                      border: '1px solid rgba(124,58,237,0.4)',
                      borderRadius: '12px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backdropFilter: 'blur(10px)',
                      animation: `glow-pulse ${3 + i * 0.3}s ease-in-out ${i * 0.2}s infinite`,
                      cursor: 'default',
                      transition: 'transform 0.2s ease, border-color 0.2s ease',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.2)';
                      (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(167,139,250,0.8)';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)';
                      (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(124,58,237,0.4)';
                    }}
                  >
                    <span style={{ fontSize: '1.4rem', lineHeight: 1 }}>{skill.emoji}</span>
                    <span
                      style={{
                        fontSize: '0.52rem',
                        color: 'var(--gray)',
                        fontFamily: 'var(--font-inter)',
                        marginTop: '3px',
                        fontWeight: 500,
                      }}
                    >
                      {skill.label}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Glow orb behind orbital */}
            <div
              style={{
                position: 'absolute',
                inset: '-40px',
                borderRadius: '50%',
                background: 'radial-gradient(ellipse, rgba(124,58,237,0.06) 0%, transparent 70%)',
                pointerEvents: 'none',
                animation: 'nebula-pulse 4s ease-in-out infinite',
              }}
            />
          </div>
          </div>
        </div>
      </div>

      <style>{`
        .orbital-scale { transform: scale(1); transform-origin: center; }
        @media (max-width: 1100px) {
          .orbital-scale { transform: scale(0.88); }
        }
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
            text-align: center;
          }
          .hero-grid > div:last-child {
            justify-content: center !important;
          }
          .orbital-scale { transform: scale(0.92); }
        }
        @media (max-width: 480px) {
          .orbital-scale { transform: scale(0.74); }
        }
        @media (max-width: 360px) {
          .orbital-scale { transform: scale(0.62); }
        }
      `}</style>
    </section>
  );
}
