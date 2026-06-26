'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const infoRows = [
  { icon: '📍', label: 'Location', value: 'Bengaluru, Karnataka' },
  { icon: '📞', label: 'Phone', value: '+91 9480487257' },
  { icon: '✉️', label: 'Email', value: 'anushkulalm@gmail.com' },
  { icon: '🗣️', label: 'Languages', value: 'English, Kannada, Hindi' },
];

const education = [
  {
    degree: 'Master of Computer Applications (MCA)',
    institution: 'Jain (Deemed-to-be University)',
    period: 'Jul 2024 – 2026',
    cgpa: '7.8',
    color: '#7C3AED',
  },
  {
    degree: 'Bachelor of Computer Applications (BCA)',
    institution: 'Jain (Deemed-to-be University)',
    period: 'Apr 2022',
    cgpa: '8.2',
    color: '#06B6D4',
  },
];

export default function About() {
  return (
    <section
      id="about"
      style={{
        position: 'relative',
        zIndex: 1,
        background: 'transparent',
        padding: '120px 0',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 40px',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="section-label">// 01. About Me</span>
          <h2
            style={{
              fontFamily: 'var(--font-space)',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              color: 'var(--white)',
              marginBottom: '60px',
              lineHeight: 1.2,
            }}
          >
            The Developer{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #A78BFA, #06B6D4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Behind The Stars
            </span>
          </h2>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.4fr',
            gap: '60px',
            alignItems: 'start',
          }}
          className="about-grid"
        >
          {/* Photo Column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
            style={{ position: 'relative' }}
          >
            {/* Photo frame */}
            <div
              style={{
                position: 'relative',
                borderRadius: '20px',
                overflow: 'hidden',
                border: '1px solid rgba(124,58,237,0.3)',
                boxShadow: '0 0 40px rgba(124,58,237,0.15)',
              }}
            >
              {/* Corner accents */}
              <div style={{
                position: 'absolute', top: 0, left: 0, width: '30px', height: '30px',
                borderTop: '3px solid var(--purple-light)', borderLeft: '3px solid var(--purple-light)',
                borderRadius: '4px 0 0 0', zIndex: 2,
              }} />
              <div style={{
                position: 'absolute', top: 0, right: 0, width: '30px', height: '30px',
                borderTop: '3px solid var(--purple-light)', borderRight: '3px solid var(--purple-light)',
                borderRadius: '0 4px 0 0', zIndex: 2,
              }} />
              <div style={{
                position: 'absolute', bottom: 0, left: 0, width: '30px', height: '30px',
                borderBottom: '3px solid var(--cyan)', borderLeft: '3px solid var(--cyan)',
                borderRadius: '0 0 0 4px', zIndex: 2,
              }} />
              <div style={{
                position: 'absolute', bottom: 0, right: 0, width: '30px', height: '30px',
                borderBottom: '3px solid var(--cyan)', borderRight: '3px solid var(--cyan)',
                borderRadius: '0 0 4px 0', zIndex: 2,
              }} />

              {/* Scan line overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(124,58,237,0.03) 3px, rgba(124,58,237,0.03) 4px)',
                  zIndex: 1,
                  pointerEvents: 'none',
                }}
              />

              <Image
                src="/anush.jpeg"
                alt="Anush Kulal M"
                width={420}
                height={500}
                unoptimized
                style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover', objectPosition: 'center 15%' }}
              />
            </div>

            {/* Floating stat badges */}
            <div
              className="about-badge-l"
              style={{
                position: 'absolute',
                bottom: '20px',
                left: '-20px',
                background: 'rgba(10,10,26,0.95)',
                border: '1px solid rgba(124,58,237,0.4)',
                borderRadius: '12px',
                padding: '10px 16px',
                backdropFilter: 'blur(10px)',
                animation: 'float 4s ease-in-out infinite',
              }}
            >
              <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--purple-light)', fontFamily: 'var(--font-space)' }}>4</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--gray)', fontFamily: 'var(--font-inter)' }}>Internships</div>
            </div>

            <div
              className="about-badge-r"
              style={{
                position: 'absolute',
                top: '20px',
                right: '-20px',
                background: 'rgba(10,10,26,0.95)',
                border: '1px solid rgba(6,182,212,0.4)',
                borderRadius: '12px',
                padding: '10px 16px',
                backdropFilter: 'blur(10px)',
                animation: 'float 4s ease-in-out 2s infinite',
              }}
            >
              <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--cyan)', fontFamily: 'var(--font-space)' }}>8.2</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--gray)', fontFamily: 'var(--font-inter)' }}>BCA CGPA</div>
            </div>
          </motion.div>

          {/* Text Column */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* Current role badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 16px',
                background: 'rgba(124,58,237,0.1)',
                border: '1px solid rgba(124,58,237,0.3)',
                borderRadius: '20px',
                marginBottom: '24px',
                fontSize: '0.8rem',
                color: 'var(--purple-light)',
                fontFamily: 'var(--font-inter)',
              }}
            >
              <span style={{ color: '#4ade80' }}>●</span>
              Business QA Engineer (Intern) at Skypoint Cloud
            </div>

            {/* Bio */}
            <p
              style={{
                color: 'var(--gray)',
                fontSize: '1rem',
                lineHeight: 1.8,
                marginBottom: '32px',
                fontFamily: 'var(--font-inter)',
              }}
            >
              I&apos;m a passionate MCA graduate working across Business Analysis, Quality Assurance,
              Frontend Development, UI/UX Design, and Team Leadership. Currently a Business QA Engineer
              (Intern) at Skypoint Cloud, I work closely with cross-functional teams through the full
              software development lifecycle — contributing to both product planning and successful
              feature delivery.
            </p>
            <p
              style={{
                color: 'var(--gray)',
                fontSize: '1rem',
                lineHeight: 1.8,
                marginBottom: '32px',
                fontFamily: 'var(--font-inter)',
              }}
            >
              From prioritizing backlogs and writing acceptance criteria to end-to-end feature
              validation, regression, and security testing, I bridge the technical and business sides
              of product. I&apos;m looking to leverage this experience in a Business Analyst or Project
              Management role, building products that deliver real value to users and the business.
            </p>

            {/* Info rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '40px' }}>
              {infoRows.map((row, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '12px 16px',
                    background: 'rgba(124,58,237,0.05)',
                    border: '1px solid rgba(124,58,237,0.1)',
                    borderRadius: '10px',
                  }}
                >
                  <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{row.icon}</span>
                  <span style={{ color: 'var(--gray)', fontSize: '0.82rem', fontFamily: 'var(--font-inter)', width: '70px', flexShrink: 0 }}>{row.label}</span>
                  <span style={{ color: 'var(--white)', fontSize: '0.9rem', fontFamily: 'var(--font-inter)', fontWeight: 500 }}>{row.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Education cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          style={{ marginTop: '60px' }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-space)',
              fontSize: '1.3rem',
              fontWeight: 600,
              color: 'var(--white)',
              marginBottom: '24px',
            }}
          >
            🎓 Education
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '20px',
            }}
            className="edu-grid"
          >
            {education.map((edu, i) => (
              <div
                key={i}
                className="space-card"
                style={{
                  padding: '24px 28px',
                  borderLeft: `3px solid ${edu.color}`,
                  borderRadius: '16px',
                }}
              >
                <div style={{ fontSize: '0.75rem', color: edu.color, fontFamily: 'var(--font-inter)', marginBottom: '8px', fontWeight: 600 }}>
                  {edu.period}
                </div>
                <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--white)', fontFamily: 'var(--font-space)', marginBottom: '6px' }}>
                  {edu.degree}
                </div>
                <div style={{ color: 'var(--gray)', fontSize: '0.87rem', fontFamily: 'var(--font-inter)' }}>
                  {edu.institution}
                </div>
                {edu.cgpa && (
                  <div style={{
                    marginTop: '12px',
                    display: 'inline-block',
                    padding: '4px 12px',
                    background: `rgba(6,182,212,0.1)`,
                    border: `1px solid rgba(6,182,212,0.3)`,
                    borderRadius: '20px',
                    fontSize: '0.78rem',
                    color: 'var(--cyan)',
                    fontFamily: 'var(--font-inter)',
                    fontWeight: 600,
                  }}>
                    CGPA: {edu.cgpa}
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .edu-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .about-badge-l { left: 4px !important; }
          .about-badge-r { right: 4px !important; }
        }
      `}</style>
    </section>
  );
}
