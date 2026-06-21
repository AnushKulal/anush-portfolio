'use client';

import { motion } from 'framer-motion';

interface Achievement {
  icon: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  type: 'certification' | 'award' | 'academic';
  color: string;
  badge: string;
}

const achievements: Achievement[] = [
  {
    icon: '🧪',
    title: 'QA Engineer (Intern) — Skypoint',
    issuer: 'Skypoint',
    date: 'Current',
    description:
      'Currently working as a QA Engineer at Skypoint in Bengaluru — writing and executing test cases, performing manual testing, logging and tracking defects, and collaborating with developers to ship quality releases.',
    type: 'award',
    color: '#4ade80',
    badge: 'Current Role',
  },
  {
    icon: '📜',
    title: 'Coursera Professional Certificate',
    issuer: 'Coursera',
    date: '2024',
    description:
      'Completed a professional certification course on Coursera, demonstrating commitment to continuous learning and upskilling in emerging technologies and professional development.',
    type: 'certification',
    color: '#3B82F6',
    badge: 'Verified',
  },
  {
    icon: '🎨',
    title: 'UI/UX Team Lead — Xthlete India',
    issuer: 'Xthlete India',
    date: '2024',
    description:
      'Promoted from UI/UX Designer to Team Lead after demonstrating exceptional design quality and consistency. Managed and supervised all interns within the domain, ensuring alignment with project requirements and deadlines.',
    type: 'award',
    color: '#F59E0B',
    badge: 'Leadership',
  },
  {
    icon: '🎓',
    title: 'BCA — CGPA 8.2',
    issuer: 'Jain (Deemed-to-be University)',
    date: 'Apr 2022',
    description:
      'Completed Bachelor of Computer Applications with a strong CGPA of 8.2. Focus areas included Web Development and Android Development, building a strong foundation in CS fundamentals.',
    type: 'academic',
    color: '#8B5CF6',
    badge: 'CGPA 8.2',
  },
  {
    icon: '🏗️',
    title: 'Full-Stack Dashboard — Talisma',
    issuer: 'Talisma Internship',
    date: '2024',
    description:
      'Successfully designed and developed a complete customer dashboard from Figma prototype to React.js implementation during a 2-month internship, demonstrating end-to-end product delivery skills.',
    type: 'award',
    color: '#06B6D4',
    badge: 'Project Win',
  },
  {
    icon: '🚀',
    title: 'MCA — Jain University',
    issuer: 'Jain (Deemed-to-be University)',
    date: 'Jul 2024 – 2026',
    description:
      'Completed Master of Computer Applications (CGPA 7.8) with focus areas in Data Structures, Networking, and Databases. Now applying these skills professionally as a QA Engineer (Intern) at Skypoint.',
    type: 'academic',
    color: '#EC4899',
    badge: 'CGPA 7.8',
  },
];

const typeConfig = {
  certification: { label: 'Certification', emoji: '📜' },
  award: { label: 'Achievement', emoji: '🏅' },
  academic: { label: 'Academic', emoji: '🎓' },
};

function AchievementCard({ item, index }: { item: Achievement; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      style={{ position: 'relative' }}
    >
      <div
        className="space-card"
        style={{
          padding: '24px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          position: 'relative',
          overflow: 'hidden',
          cursor: 'default',
          transition: 'box-shadow 0.3s ease, border-color 0.3s ease, transform 0.3s ease',
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.boxShadow = `0 20px 60px ${item.color}30, 0 0 30px ${item.color}15`;
          el.style.borderColor = `${item.color}55`;
          el.style.transform = 'translateY(-4px)';
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.boxShadow = '';
          el.style.borderColor = '';
          el.style.transform = 'translateY(0)';
        }}
      >
        {/* glow blob */}
        <div
          style={{
            position: 'absolute',
            top: '-48px',
            right: '-48px',
            width: '144px',
            height: '144px',
            borderRadius: '50%',
            pointerEvents: 'none',
            background: `radial-gradient(circle, ${item.color} 0%, transparent 70%)`,
            filter: 'blur(20px)',
            opacity: 0.12,
          }}
        />

        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', position: 'relative', zIndex: 1 }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 600, padding: '4px 12px', borderRadius: '20px', background: `${item.color}20`, border: `1px solid ${item.color}40`, color: item.color, fontFamily: 'var(--font-inter)' }}>
            {typeConfig[item.type].emoji} {typeConfig[item.type].label}
          </span>
          <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '4px 12px', borderRadius: '20px', background: `${item.color}15`, color: `${item.color}cc`, border: `1px solid ${item.color}30`, fontFamily: 'var(--font-inter)', whiteSpace: 'nowrap' }}>
            {item.badge}
          </span>
        </div>

        {/* Icon + title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', position: 'relative', zIndex: 1 }}>
          <div
            style={{
              fontSize: '1.7rem',
              width: '54px',
              height: '54px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              background: `${item.color}20`,
              border: `1px solid ${item.color}40`,
              boxShadow: `0 0 20px ${item.color}20`,
              animation: 'float 4s ease-in-out infinite',
              animationDelay: `${index * 0.3}s`,
            }}
          >
            {item.icon}
          </div>
          <div>
            <h3 style={{ fontFamily: 'var(--font-space)', fontWeight: 700, color: 'var(--white)', lineHeight: 1.3, fontSize: '1rem' }}>
              {item.title}
            </h3>
            <p style={{ fontSize: '0.85rem', marginTop: '2px', color: item.color, fontFamily: 'var(--font-inter)' }}>{item.issuer}</p>
          </div>
        </div>

        {/* Date */}
        <div style={{ fontSize: '0.75rem', color: 'var(--gray)', display: 'flex', alignItems: 'center', gap: '6px', position: 'relative', zIndex: 1, fontFamily: 'var(--font-inter)' }}>
          <span>📅</span>
          <span>{item.date}</span>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: `linear-gradient(90deg, ${item.color}50, transparent)` }} />

        {/* Description */}
        <p style={{ color: 'var(--gray)', fontSize: '0.85rem', lineHeight: 1.7, flex: 1, position: 'relative', zIndex: 1, fontFamily: 'var(--font-inter)' }}>
          {item.description}
        </p>

        {item.type === 'award' && (
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '2px',
              opacity: 0.6,
              background: `linear-gradient(90deg, transparent, ${item.color}, transparent)`,
              backgroundSize: '200% 100%',
              animation: 'shimmer 2s linear infinite',
            }}
          />
        )}
      </div>
    </motion.div>
  );
}

export default function Achievements() {
  return (
    <section
      id="achievements"
      style={{
        position: 'relative',
        zIndex: 1,
        background: 'transparent',
        padding: '120px 0',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div
          style={{ position: 'absolute', width: 600, height: 600, borderRadius: '50%', opacity: 0.1, background: 'radial-gradient(circle, #F59E0B 0%, transparent 70%)', top: '20%', right: '-20%', filter: 'blur(80px)' }}
        />
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px', position: 'relative', zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '60px' }}
        >
          <span className="section-label" style={{ color: '#F59E0B', textAlign: 'center' }}>// Achievements</span>
          <h2
            style={{
              fontFamily: 'var(--font-space)',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              color: 'var(--white)',
              lineHeight: 1.2,
            }}
          >
            Recognitions &{' '}
            <span style={{
              background: 'linear-gradient(135deg, #A78BFA, #06B6D4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Milestones
            </span>
          </h2>
          <p style={{ color: 'var(--gray)', fontSize: 'clamp(0.9rem, 2.5vw, 1.05rem)', maxWidth: '600px', margin: '16px auto 0', fontFamily: 'var(--font-inter)', lineHeight: 1.7 }}>
            Certifications, leadership roles, and academic accomplishments that reflect my dedication to growth.
          </p>
        </motion.div>

        <div className="ach-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {achievements.map((item, i) => (
            <AchievementCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .ach-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 600px) { .ach-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
