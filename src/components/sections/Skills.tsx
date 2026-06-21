'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface Skill {
  name: string;
  icon: string;
  level: number;
  color: string;
}

interface SkillGroup {
  category: string;
  icon: string;
  color: string;
  skills: Skill[];
}

const skillGroups: SkillGroup[] = [
  {
    category: 'Programming Languages',
    icon: '{ }',
    color: '#3B82F6',
    skills: [
      { name: 'Java (OOPs)', icon: '☕', level: 70, color: '#F89820' },
      { name: 'JavaScript', icon: '⚡', level: 78, color: '#F7DF1E' },
      { name: 'Python', icon: '🐍', level: 50, color: '#3776AB' },
      { name: 'C++', icon: '⚙️', level: 60, color: '#00599C' },
      { name: 'C#', icon: '#️⃣', level: 55, color: '#9B4F96' },
      { name: 'HTML & CSS', icon: '🌐', level: 85, color: '#E34C26' },
    ],
  },
  {
    category: 'Frontend & Design',
    icon: '🎨',
    color: '#8B5CF6',
    skills: [
      { name: 'React.js', icon: '⚛️', level: 75, color: '#61DAFB' },
      { name: 'Figma', icon: '🎯', level: 85, color: '#F24E1E' },
      { name: 'Canva', icon: '🖌️', level: 80, color: '#00C4CC' },
      { name: 'UI/UX Design', icon: '✏️', level: 82, color: '#8B5CF6' },
    ],
  },
  {
    category: 'Backend & Database',
    icon: '⚙️',
    color: '#06B6D4',
    skills: [
      { name: 'Node.js', icon: '🟢', level: 55, color: '#68A063' },
      { name: 'SQL', icon: '🗄️', level: 65, color: '#F29111' },
      { name: 'NoSQL', icon: '🌿', level: 40, color: '#4DB33D' },
      { name: 'REST APIs', icon: '🔗', level: 72, color: '#FF6B6B' },
    ],
  },
  {
    category: 'Tools & Technologies',
    icon: '🛠️',
    color: '#10B981',
    skills: [
      { name: 'Android Studio', icon: '📱', level: 40, color: '#3DDC84' },
      { name: 'Cisco Packet Tracer', icon: '🌐', level: 45, color: '#1BA0D7' },
      { name: 'MS Word', icon: '📄', level: 75, color: '#2B579A' },
      { name: 'Git & GitHub', icon: '🐙', level: 70, color: '#F05032' },
    ],
  },
];

function SkillCard({ skill, delay }: { skill: Skill; delay: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ scale: 1.08, rotateY: 8, rotateX: -4 }}
      className="glass-card p-4 flex flex-col items-center gap-3 cursor-default group"
      style={{
        willChange: 'transform',
        transition: 'box-shadow 0.3s ease',
        boxShadow: hovered ? `0 10px 30px ${skill.color}30, 0 0 20px ${skill.color}20` : undefined,
        borderColor: hovered ? `${skill.color}40` : undefined,
      }}
    >
      <motion.div
        animate={hovered ? { y: [-2, 2, -2], transition: { repeat: Infinity, duration: 1 } } : { y: 0 }}
        className="text-3xl w-14 h-14 rounded-xl flex items-center justify-center"
        style={{
          background: `${skill.color}15`,
          border: `1px solid ${skill.color}30`,
          boxShadow: hovered ? `0 0 20px ${skill.color}40` : 'none',
          transition: 'box-shadow 0.3s',
        }}
      >
        {skill.icon}
      </motion.div>
      <p className="text-sm font-semibold text-slate-200 text-center leading-tight">{skill.name}</p>
      <div className="w-full">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-slate-500">Level</span>
          <span className="text-xs font-semibold" style={{ color: skill.color }}>{skill.level}%</span>
        </div>
        <div className="h-1 w-full rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }}>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.level}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: delay + 0.3, ease: 'easeOut' }}
            className="h-full rounded-full"
            style={{ background: `linear-gradient(90deg, ${skill.color}, ${skill.color}99)` }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="section-base" style={{ background: 'linear-gradient(180deg, var(--bg-primary) 0%, #0D1B2E 100%)' }}>
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: 'linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      <div className="container-max relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-purple-400 mb-3 block">// Skills & Expertise</span>
          <h2 className="section-title gradient-text-static" style={{ fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)' }}>
            My Tech Arsenal
          </h2>
          <p className="section-subtitle text-slate-400 mx-auto mt-4">
            A versatile toolkit spanning development, design, and testing — built for end-to-end product creation.
          </p>
        </motion.div>

        <div className="flex flex-col gap-12">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, x: gi % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm"
                  style={{ background: `${group.color}20`, border: `1px solid ${group.color}40`, color: group.color, fontFamily: 'monospace' }}
                >
                  {group.icon}
                </div>
                <h3 className="text-lg font-semibold text-white" style={{ fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)' }}>
                  {group.category}
                </h3>
                <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${group.color}40, transparent)` }} />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {group.skills.map((skill, si) => (
                  <SkillCard key={skill.name} skill={skill} delay={si * 0.07} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-center text-slate-500 text-sm mt-12"
        >
          Always learning · Currently pursuing{' '}
          <span className="text-blue-400">Python</span>,{' '}
          <span className="text-purple-400">NoSQL</span>,{' '}
          <span className="text-cyan-400">Android Studio</span>
        </motion.p>
      </div>
    </section>
  );
}
