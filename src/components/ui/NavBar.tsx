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
    const handleScroll = () => setScrolled(window.scrollY > 50);
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
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: 'all 0.3s ease',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          background: scrolled ? 'rgba(3,0,20,0.85)' : 'transparent',
          borderBottom: scrolled ? '1px solid rgba(124,58,237,0.15)' : '1px solid transparent',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 40px',
            height: '70px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #7C3AED, #A78BFA)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-space)',
                fontWeight: 700,
                fontSize: '1rem',
                color: '#fff',
                boxShadow: '0 0 15px rgba(124,58,237,0.4)',
                flexShrink: 0,
              }}
            >
              AK
            </div>
            <span
              style={{
                fontFamily: 'var(--font-space)',
                fontWeight: 500,
                fontSize: '0.95rem',
                color: 'var(--gray)',
                opacity: scrolled ? 1 : 0,
                transition: 'opacity 0.3s ease',
              }}
            >
              Anush Kulal M
            </span>
          </div>

          {/* Desktop Nav Links */}
          <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }} className="nav-desktop">
            {navLinks.map(link => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  style={{
                    background: isActive ? 'rgba(124,58,237,0.12)' : 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontFamily: 'var(--font-inter)',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    color: isActive ? 'var(--purple-light)' : 'var(--gray)',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--white)'; }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLButtonElement).style.color = isActive ? 'var(--purple-light)' : 'var(--gray)';
                  }}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Right side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <a
              href="mailto:anushkulalm@gmail.com"
              className="nav-desktop"
              style={{
                padding: '9px 22px',
                background: 'linear-gradient(135deg, #7C3AED, #A78BFA)',
                borderRadius: '10px',
                color: '#fff',
                fontFamily: 'var(--font-inter)',
                fontSize: '0.875rem',
                fontWeight: 600,
                cursor: 'pointer',
                textDecoration: 'none',
                display: 'inline-block',
                transition: 'all 0.2s ease',
                boxShadow: '0 0 20px rgba(124,58,237,0.3)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)';
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 30px rgba(124,58,237,0.5)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 20px rgba(124,58,237,0.3)';
              }}
            >
              Hire Me
            </a>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="nav-mobile"
              style={{
                background: 'none',
                border: '1px solid rgba(124,58,237,0.4)',
                borderRadius: '8px',
                padding: '8px 12px',
                cursor: 'pointer',
                color: 'var(--white)',
                fontSize: '1.1rem',
                lineHeight: 1,
              }}
              aria-label="Toggle menu"
            >
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div
            style={{
              background: 'rgba(3,0,20,0.97)',
              backdropFilter: 'blur(20px)',
              borderTop: '1px solid rgba(124,58,237,0.2)',
              padding: '20px 40px 30px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
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
                  padding: '14px 0',
                  textAlign: 'left',
                  fontFamily: 'var(--font-inter)',
                  fontSize: '1rem',
                  color: 'var(--gray)',
                  borderBottom: '1px solid rgba(124,58,237,0.1)',
                }}
              >
                {link.label}
              </button>
            ))}
            <a
              href="mailto:anushkulalm@gmail.com"
              style={{
                marginTop: '16px',
                padding: '12px 24px',
                background: 'linear-gradient(135deg, #7C3AED, #A78BFA)',
                borderRadius: '10px',
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
      </nav>

      <style>{`
        .nav-desktop { display: flex !important; }
        .nav-mobile { display: none !important; }
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile { display: block !important; }
        }
      `}</style>
    </>
  );
}
