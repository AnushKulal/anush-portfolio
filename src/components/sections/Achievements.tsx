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
    icon: '🔍',
    title: 'QA & Test Case Documentation',
    issuer: 'Reg Vectors Internship',
    date: '2024',
    description:
      'Created comprehensive test case documentation for a fun club platform prototype during a 3-month internship. Performed QA validation covering functional, edge-case, and regression testing.',
    type: 'academic',
    color: '#10B981',
    badge: 'QA Skills',
  },
  {
    icon: '🚀',
    title: 'MCA — Jain University',
    issuer: 'Jain (Deemed-to-be University)',
    date: 'Jul 2024 – Present',
    description:
      'Currently pursuing Master of Computer Applications (CGPA 7.8) with focus areas in Data Structures, Networking, and Databases. Actively applying skills through internships and personal projects.',
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
      className="group relative"
    >
      <div
        className="glass-card p-6 h-full flex flex-col gap-4 cursor-default hover-lift relative overflow-hidden"
        style={{ transition: 'box-shadow 0.3s ease, border-color 0.3s ease, transform 0.3s ease' }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.boxShadow = `0 20px 60px ${item.color}30, 0 0 30px ${item.color}15`;
          el.style.borderColor = `${item.color}40`;
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.boxShadow = '';
          el.style.borderColor = '';
        }}
      >
        <div
          className="absolute -top-12 -right-12 w-36 h-36 rounded-full pointer-events-none opacity-10 group-hover:opacity-25 transition-opacity duration-500"
          style={{ background: `radial-gradient(circle, ${item.color} 0%, transparent 70%)`, filter: 'blur(20px)' }}
        />

        <div className="flex items-center justify-between">
          <span
            className="text-xs font-semibold px-3 py-1 rounded-full"
            style={{ background: `${item.color}20`, border: `1px solid ${item.color}40`, color: item.color }}
          >
            {typeConfig[item.type].emoji} {typeConfig[item.type].label}
          </span>
          <span
            className="text-xs font-bold px-3 py-1 rounded-full"
            style={{ background: `${item.color}15`, color: `${item.color}cc`, border: `1px solid ${item.color}30` }}
          >
            {item.badge}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div
            className="text-3xl w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 animate-float"
            style={{ background: `${item.color}20`, border: `1px solid ${item.color}40`, boxShadow: `0 0 20px ${item.color}20`, animationDelay: `${index * 0.3}s` }}
          >
            {item.icon}
          </div>
          <div>
            <h3 className="font-bold text-white leading-tight" style={{ fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)' }}>
              {item.title}
            </h3>
            <p className="text-sm mt-0.5" style={{ color: item.color }}>{item.issuer}</p>
          </div>
        </div>

        <div className="text-xs text-slate-500 flex items-center gap-1">
          <span>📅</span>
          <span>{item.date}</span>
        </div>

        <div className="h-px" style={{ background: `linear-gradient(90deg, ${item.color}50, transparent)` }} />

        <p className="text-slate-300 text-sm leading-relaxed flex-1">{item.description}</p>

        {item.type === 'award' && (
          <div
            className="absolute bottom-0 left-0 right-0 h-0.5 opacity-60"
            style={{ background: `linear-gradient(90deg, transparent, ${item.color}, transparent)`, animation: 'shimmer 2s linear infinite' }}
          />
        )}
      </div>
    </motion.div>
  );
}

export default function Achievements() {
  return (
    <section id="achievements" className="section-base" style={{ background: 'var(--bg-primary)' }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute rounded-full opacity-10"
          style={{ width: 600, height: 600, background: 'radial-gradient(circle, #F59E0B 0%, transparent 70%)', top: '20%', right: '-20%', filter: 'blur(80px)' }}
        />
      </div>
      <div className="container-max relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-yellow-400 mb-3 block">// Achievements</span>
          <h2 className="section-title gradient-text-static" style={{ fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)' }}>
            Recognitions & Milestones
          </h2>
          <p className="section-subtitle text-slate-400 mx-auto mt-4">
            Certifications, leadership roles, and academic accomplishments that reflect my dedication to growth.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((item, i) => (
            <AchievementCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
