'use client';

import { useState, useEffect, useCallback } from 'react';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks.map(l => l.href.replace('#', ''));
    const observers: IntersectionObserver[] = [];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  const scrollTo = useCallback((href: string) => {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  }, []);

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: '18px',
          left: 0,
          right: 0,
          zIndex: 100,
          display: 'flex',
          justifyContent: 'center',
          padding: '0 16px',
          pointerEvents: 'none',
        }}
      >
        {/* Floating glass bar */}
        <div
          style={{
            pointerEvents: 'auto',
            width: '100%',
            maxWidth: '1120px',
            height: '64px',
            padding: '0 14px 0 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderRadius: '18px',
            background: scrolled ? 'rgba(15,12,40,0.65)' : 'rgba(15,12,40,0.38)',
            backdropFilter: 'blur(18px) saturate(140%)',
            WebkitBackdropFilter: 'blur(18px) saturate(140%)',
            border: '1px solid rgba(255,255,255,0.10)',
            boxShadow: scrolled
              ? '0 8px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.08)'
              : '0 6px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.06)',
            transition: 'background 0.3s ease, box-shadow 0.3s ease',
          }}
        >
          {/* Logo */}
          <div
            style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '11px',
                background: 'linear-gradient(135deg, #7C3AED, #A78BFA)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-space)',
                fontWeight: 700,
                fontSize: '0.95rem',
                color: '#fff',
                boxShadow: '0 0 15px rgba(124,58,237,0.5)',
                flexShrink: 0,
              }}
            >
              AK
            </div>
            <span
              style={{
                fontFamily: 'var(--font-space)',
                fontWeight: 600,
                fontSize: '0.95rem',
                color: 'var(--white)',
              }}
              className="nav-brand"
            >
              Anush Kulal M
            </span>
          </div>

          {/* Center: glass link group */}
          <div
            className="nav-desktop"
            style={{
              display: 'flex',
              gap: '2px',
              alignItems: 'center',
              padding: '5px',
              borderRadius: '12px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            {navLinks.map(link => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  style={{
                    background: isActive ? 'rgba(124,58,237,0.28)' : 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '8px 16px',
                    borderRadius: '9px',
                    fontFamily: 'var(--font-inter)',
                    fontSize: '0.88rem',
                    fontWeight: 500,
                    color: isActive ? '#fff' : 'var(--gray)',
                    boxShadow: isActive ? '0 0 18px rgba(124,58,237,0.35)' : 'none',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#fff'; }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLButtonElement).style.color = isActive ? '#fff' : 'var(--gray)';
                  }}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Right side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <a
              href="mailto:anushkulalm@gmail.com"
              className="nav-desktop"
              style={{
                padding: '9px 20px',
                background: 'linear-gradient(135deg, #7C3AED, #A78BFA)',
                borderRadius: '11px',
                color: '#fff',
                fontFamily: 'var(--font-inter)',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                textDecoration: 'none',
                display: 'inline-block',
                boxShadow: '0 0 20px rgba(124,58,237,0.35)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)';
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 32px rgba(124,58,237,0.6)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 20px rgba(124,58,237,0.35)';
              }}
            >
              Hire Me
            </a>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="nav-mobile"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '10px',
                padding: '9px 13px',
                cursor: 'pointer',
                color: 'var(--white)',
                fontSize: '1.05rem',
                lineHeight: 1,
              }}
              aria-label="Toggle menu"
            >
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile dropdown (glass) */}
      {menuOpen && (
        <div
          className="nav-mobile"
          style={{
            position: 'fixed',
            top: '92px',
            left: '16px',
            right: '16px',
            zIndex: 99,
            background: 'rgba(15,12,40,0.92)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '16px',
            padding: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
          }}
        >
          {navLinks.map(link => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '13px 14px',
                textAlign: 'left',
                borderRadius: '10px',
                fontFamily: 'var(--font-inter)',
                fontSize: '1rem',
                color: 'var(--gray)',
              }}
            >
              {link.label}
            </button>
          ))}
          <a
            href="mailto:anushkulalm@gmail.com"
            style={{
              marginTop: '8px',
              padding: '13px 24px',
              background: 'linear-gradient(135deg, #7C3AED, #A78BFA)',
              borderRadius: '11px',
              color: '#fff',
              fontFamily: 'var(--font-inter)',
              fontSize: '0.95rem',
              fontWeight: 600,
              textDecoration: 'none',
              textAlign: 'center',
              display: 'block',
            }}
          >
            Hire Me
          </a>
        </div>
      )}

      <style>{`
        .nav-desktop { display: flex !important; }
        .nav-mobile { display: none !important; }
        @media (max-width: 860px) {
          .nav-desktop { display: none !important; }
          .nav-mobile { display: block !important; }
          .nav-brand { display: none !important; }
        }
      `}</style>
    </>
  );
}
