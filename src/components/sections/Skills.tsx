'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const techGrid = [
  { emoji: '🎨', name: 'Figma', level: 90, color: '#A78BFA' },
  { emoji: '⚛️', name: 'React.js', level: 70, color: '#06B6D4' },
  { emoji: '🟨', name: 'JavaScript', level: 75, color: '#F59E0B' },
  { emoji: '🌐', name: 'HTML/CSS', level: 90, color: '#F97316' },
  { emoji: '☕', name: 'Java', level: 65, color: '#EF4444' },
  { emoji: '🐍', name: 'Python', level: 50, color: '#84CC16' },
  { emoji: '🟢', name: 'Node.js', level: 55, color: '#22C55E' },
  { emoji: '🐙', name: 'Git/GitHub', level: 80, color: '#EC4899' },
  { emoji: '🗄️', name: 'SQL', level: 65, color: '#3B82F6' },
  { emoji: '🖌️', name: 'Canva', level: 85, color: '#8B5CF6' },
  { emoji: 'Ⓒ', name: 'C++/C#', level: 60, color: '#06B6D4' },
  { emoji: '📱', name: 'UI/UX Design', level: 88, color: '#A78BFA' },
];

const skillBars = [
  {
    category: 'Design',
    color: '#A78BFA',
    items: [
      { name: 'Figma', pct: 90 },
      { name: 'UI/UX Design', pct: 88 },
      { name: 'Canva', pct: 85 },
      { name: 'Prototyping', pct: 80 },
    ],
  },
  {
    category: 'Frontend',
    color: '#06B6D4',
    items: [
      { name: 'HTML/CSS', pct: 90 },
      { name: 'JavaScript', pct: 75 },
      { name: 'React.js', pct: 70 },
    ],
  },
  {
    category: 'Backend & Tools',
    color: '#3B82F6',
    items: [
      { name: 'Git/GitHub', pct: 80 },
      { name: 'Node.js', pct: 55 },
      { name: 'SQL', pct: 65 },
      { name: 'Java (OOPs)', pct: 65 },
    ],
  },
];

function TechTile({ emoji, name, level, color, delay }: { emoji: string; name: string; level: number; color: string; delay: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay }}
      viewport={{ once: true }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? `rgba(${parseInt(color.slice(1, 3), 16)},${parseInt(color.slice(3, 5), 16)},${parseInt(color.slice(5, 7), 16)},0.12)` : 'rgba(10,10,26,0.8)',
        border: `1px solid ${hovered ? color : 'rgba(124,58,237,0.2)'}`,
        borderRadius: '16px',
        padding: '20px 12px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        cursor: 'default',
        transition: 'all 0.3s ease',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered ? `0 10px 30px rgba(${parseInt(color.slice(1, 3), 16)},${parseInt(color.slice(3, 5), 16)},${parseInt(color.slice(5, 7), 16)},0.25)` : 'none',
        backdropFilter: 'blur(10px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <span style={{ fontSize: '2rem', lineHeight: 1 }}>{emoji}</span>
      <span style={{ fontSize: '0.8rem', color: hovered ? '#fff' : 'var(--gray)', fontFamily: 'var(--font-inter)', fontWeight: 500, textAlign: 'center' }}>
        {name}
      </span>
      {hovered && (
        <span style={{
          fontSize: '0.72rem',
          color: color,
          fontWeight: 700,
          fontFamily: 'var(--font-space)',
        }}>
          {level}%
        </span>
      )}

      {/* radial glow */}
      {hovered && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse at 50% 0%, ${color}22 0%, transparent 70%)`,
          pointerEvents: 'none',
        }} />
      )}
    </motion.div>
  );
}

function SkillBar({ name, pct, color, delay }: { name: string; pct: number; color: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      style={{ marginBottom: '16px' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
        <span style={{ fontSize: '0.87rem', color: 'var(--white)', fontFamily: 'var(--font-inter)', fontWeight: 500 }}>{name}</span>
        <span style={{ fontSize: '0.8rem', color, fontFamily: 'var(--font-inter)', fontWeight: 600 }}>{pct}%</span>
      </div>
      <div style={{
        height: '6px',
        background: 'rgba(255,255,255,0.06)',
        borderRadius: '3px',
        overflow: 'hidden',
      }}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          transition={{ duration: 1, delay: delay + 0.2, ease: 'easeOut' }}
          viewport={{ once: true }}
          style={{
            height: '100%',
            background: `linear-gradient(90deg, ${color}, ${color}99)`,
            borderRadius: '3px',
            boxShadow: `0 0 8px ${color}80`,
          }}
        />
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section
      id="skills"
      style={{
        position: 'relative',
        zIndex: 1,
        background: 'transparent',
        padding: '120px 0',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{ marginBottom: '60px' }}
        >
          <span className="section-label">// 02. Skills</span>
          <h2
            style={{
              fontFamily: 'var(--font-space)',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              color: 'var(--white)',
              lineHeight: 1.2,
            }}
          >
            Tech Stack &{' '}
            <span style={{
              background: 'linear-gradient(135deg, #A78BFA, #06B6D4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Expertise
            </span>
          </h2>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: '60px',
            alignItems: 'start',
          }}
          className="skills-grid"
        >
          {/* Tech grid + supporting content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '12px',
              position: 'relative',
            }}
            className="tech-tiles-grid"
            >
              {/* Radial center gradient overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(ellipse at 50% 50%, rgba(124,58,237,0.08) 0%, transparent 70%)',
                pointerEvents: 'none',
                zIndex: 0,
              }} />
              {techGrid.map((tech, i) => (
                <TechTile key={i} {...tech} delay={i * 0.05} />
              ))}
            </div>

            {/* Quick stats row */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '12px',
            }}>
              {[
                { value: '3', label: 'Internships' },
                { value: '5+', label: 'Projects' },
                { value: '4', label: 'Languages' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                  viewport={{ once: true }}
                  className="space-card"
                  style={{ padding: '18px 12px', textAlign: 'center', borderRadius: '16px' }}
                >
                  <div style={{
                    fontFamily: 'var(--font-space)',
                    fontSize: '1.7rem',
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #A78BFA, #06B6D4)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    lineHeight: 1,
                  }}>
                    {stat.value}
                  </div>
                  <div style={{
                    marginTop: '6px',
                    fontSize: '0.72rem',
                    color: 'var(--gray)',
                    fontFamily: 'var(--font-inter)',
                    letterSpacing: '0.04em',
                  }}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Currently leveling up */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-card"
              style={{ padding: '22px 22px', borderRadius: '18px' }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '14px',
              }}>
                <div style={{
                  height: '2px',
                  width: '24px',
                  background: '#06B6D4',
                  boxShadow: '0 0 8px #06B6D4',
                  borderRadius: '2px',
                }} />
                <span style={{
                  fontSize: '0.75rem',
                  color: '#06B6D4',
                  fontFamily: 'var(--font-inter)',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}>
                  Currently Leveling Up
                </span>
              </div>
              <p style={{
                fontSize: '0.86rem',
                color: 'var(--gray)',
                fontFamily: 'var(--font-inter)',
                lineHeight: 1.7,
                marginBottom: '14px',
              }}>
                Always exploring new tools and AI workflows to sharpen my craft across design,
                development, and QA.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {['Python', 'NoSQL', 'Android Studio', 'AI Tools', 'API Testing'].map((s, i) => (
                  <span key={i} className="tech-badge">{s}</span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Skill bars */}
          <div>
            {skillBars.map((group, gi) => (
              <div key={gi} style={{ marginBottom: '36px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '16px',
                }}>
                  <div style={{
                    height: '2px',
                    width: '24px',
                    background: group.color,
                    boxShadow: `0 0 8px ${group.color}`,
                    borderRadius: '2px',
                  }} />
                  <span style={{
                    fontSize: '0.75rem',
                    color: group.color,
                    fontFamily: 'var(--font-inter)',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}>
                    {group.category}
                  </span>
                </div>
                {group.items.map((item, ii) => (
                  <SkillBar key={ii} name={item.name} pct={item.pct} color={group.color} delay={gi * 0.1 + ii * 0.08} />
                ))}
              </div>
            ))}

            {/* Soft skills */}
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '16px',
              }}>
                <div style={{
                  height: '2px',
                  width: '24px',
                  background: '#F59E0B',
                  borderRadius: '2px',
                  boxShadow: '0 0 8px #F59E0B80',
                }} />
                <span style={{
                  fontSize: '0.75rem',
                  color: '#F59E0B',
                  fontFamily: 'var(--font-inter)',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}>
                  Soft Skills
                </span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {['Team Leadership', 'Communication', 'Problem Solving', 'Time Management', 'QA & Testing', 'Collaboration'].map((s, i) => (
                  <span key={i} className="tech-badge">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .skills-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .tech-tiles-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .tech-tiles-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
