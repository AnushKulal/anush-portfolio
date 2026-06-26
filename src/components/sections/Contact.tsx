'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const orbitContacts = [
  { emoji: '✉️', label: 'Email', href: 'mailto:anushkulalm@gmail.com', angle: 0, color: '#A78BFA' },
  { emoji: '💼', label: 'LinkedIn', href: 'https://www.linkedin.com/in/anush-kulal-015b21130', angle: 90, color: '#06B6D4' },
  { emoji: '🐙', label: 'GitHub', href: 'https://github.com/AnushKulal', angle: 180, color: '#3B82F6' },
  { emoji: '📄', label: 'Resume', href: '/resume.pdf', angle: 270, color: '#F59E0B' },
];

function ContactOrbit() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="contact-orbit"
      style={{
        position: 'relative',
        width: 'min(320px, 78vw)',
        aspectRatio: '1 / 1',
        margin: '0 auto 50px',
      }}
    >
      {/* Outer ring */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          border: '1px dashed rgba(124,58,237,0.3)',
          animation: hoveredIdx !== null ? 'none' : 'orbit 20s linear infinite',
        }}
      />

      {/* Inner ring */}
      <div
        style={{
          position: 'absolute',
          top: '12.5%',
          left: '12.5%',
          right: '12.5%',
          bottom: '12.5%',
          borderRadius: '50%',
          border: '1px dashed rgba(167,139,250,0.2)',
          animation: hoveredIdx !== null ? 'none' : 'orbit 15s linear infinite reverse',
        }}
      />

      {/* Center AK monogram */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          width: '90px',
          height: '90px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #7C3AED, #A78BFA)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-space)',
          fontSize: '1.8rem',
          fontWeight: 700,
          color: '#fff',
          boxShadow: '0 0 30px rgba(124,58,237,0.5), 0 0 60px rgba(124,58,237,0.2)',
          animation: 'glow-pulse 3s ease-in-out infinite',
          zIndex: 10,
        }}
      >
        AK
      </div>

      {/* Orbiting contact icons */}
      {orbitContacts.map((contact, i) => {
        const rad = (contact.angle * Math.PI) / 180;
        const radiusPct = 40.6; // 130 / 320, expressed as % so positions scale with the container
        const x = 50 + radiusPct * Math.cos(rad);
        const y = 50 + radiusPct * Math.sin(rad);
        const isHovered = hoveredIdx === i;

        return (
          <a
            key={i}
            href={contact.href}
            target={contact.href.startsWith('http') ? '_blank' : undefined}
            rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            download={contact.href === '/resume.pdf' ? true : undefined}
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
            style={{
              position: 'absolute',
              left: `${x}%`,
              top: `${y}%`,
              transform: `translate(-50%,-50%) ${isHovered ? 'scale(1.3)' : 'scale(1)'}`,
              zIndex: 5,
              textDecoration: 'none',
              transition: 'transform 0.3s ease',
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: isHovered ? `${contact.color}30` : 'rgba(10,10,26,0.9)',
                border: `2px solid ${isHovered ? contact.color : contact.color + '60'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.4rem',
                boxShadow: isHovered ? `0 0 20px ${contact.color}80` : 'none',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)',
                flexDirection: 'column',
              }}
            >
              <span style={{ lineHeight: 1 }}>{contact.emoji}</span>
            </div>
            {isHovered && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                marginTop: '6px',
                padding: '4px 10px',
                background: contact.color,
                borderRadius: '6px',
                fontSize: '0.7rem',
                color: '#fff',
                fontFamily: 'var(--font-inter)',
                fontWeight: 600,
                whiteSpace: 'nowrap',
              }}>
                {contact.label}
              </div>
            )}
          </a>
        );
      })}
    </div>
  );
}

export default function Contact() {
  return (
    <section
      id="contact"
      style={{
        position: 'relative',
        zIndex: 1,
        background: 'transparent',
        padding: '120px 0 80px',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '60px' }}
        >
          <span className="section-label" style={{ display: 'block', textAlign: 'center' }}>// 05. Contact</span>
          <h2
            style={{
              fontFamily: 'var(--font-space)',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              color: 'var(--white)',
              lineHeight: 1.2,
              marginBottom: '20px',
            }}
          >
            Let&apos;s Build Something{' '}
            <span style={{
              background: 'linear-gradient(135deg, #A78BFA, #06B6D4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Amazing
            </span>{' '}
            Together
          </h2>
          <p style={{
            color: 'var(--gray)',
            fontSize: '1rem',
            fontFamily: 'var(--font-inter)',
            maxWidth: '540px',
            margin: '0 auto',
            lineHeight: 1.7,
          }}>
            I&apos;m open to opportunities, collaborations, and exciting ideas. Whether you have a
            project in mind or just want to say hi — let&apos;s connect.
          </p>
        </motion.div>

        {/* Orbital contact center */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <ContactOrbit />
        </motion.div>

        {/* Status pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '60px' }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 24px',
              background: 'rgba(74,222,128,0.08)',
              border: '1px solid rgba(74,222,128,0.25)',
              borderRadius: '30px',
              fontSize: '0.9rem',
              color: 'var(--white)',
              fontFamily: 'var(--font-inter)',
              fontWeight: 500,
            }}
          >
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#4ade80',
              boxShadow: '0 0 8px #4ade80',
              display: 'inline-block',
              animation: 'glow-pulse 2s ease-in-out infinite',
            }} />
            Available for hire · Bengaluru, India
          </div>
        </motion.div>

        {/* Direct contact info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            flexWrap: 'wrap',
            marginBottom: '80px',
          }}
        >
          <a
            href="mailto:anushkulalm@gmail.com"
            style={{
              padding: '14px 30px',
              background: 'linear-gradient(135deg, #7C3AED, #A78BFA)',
              border: 'none',
              borderRadius: '12px',
              color: '#fff',
              fontFamily: 'var(--font-inter)',
              fontSize: '0.95rem',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              boxShadow: '0 0 25px rgba(124,58,237,0.4)',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-3px)';
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 40px rgba(124,58,237,0.6)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 25px rgba(124,58,237,0.4)';
            }}
          >
            ✉️ Send Email
          </a>
          <a
            href="/resume.pdf"
            download
            style={{
              padding: '14px 30px',
              background: 'rgba(124,58,237,0.1)',
              border: '1px solid rgba(124,58,237,0.4)',
              borderRadius: '12px',
              color: 'var(--purple-light)',
              fontFamily: 'var(--font-inter)',
              fontSize: '0.95rem',
              fontWeight: 600,
              textDecoration: 'none',
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
            📄 Download Resume
          </a>
        </motion.div>

        {/* Footer */}
        <div
          style={{
            borderTop: '1px solid rgba(124,58,237,0.15)',
            paddingTop: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div style={{
            color: 'var(--gray)',
            fontSize: '0.85rem',
            fontFamily: 'var(--font-inter)',
          }}>
            © 2026 Anush Kulal M — Crafted with ✦ and lots of ☕
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            {[
              { label: 'Email', href: 'mailto:anushkulalm@gmail.com' },
              { label: 'LinkedIn', href: 'https://www.linkedin.com/in/anush-kulal-015b21130' },
              { label: 'GitHub', href: 'https://github.com/AnushKulal' },
            ].map(link => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                style={{
                  color: 'var(--gray)',
                  fontSize: '0.85rem',
                  fontFamily: 'var(--font-inter)',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--purple-light)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--gray)'; }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
