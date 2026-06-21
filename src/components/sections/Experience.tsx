'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';

interface ExperienceItem {
  company: string;
  role: string;
  duration: string;
  type: string;
  icon: string;
  color: string;
  location: string;
  achievements: string[];
  techStack: string[];
}

const experiences: ExperienceItem[] = [
  {
    company: 'Xthlete India',
    role: 'UI/UX Designer & Team Lead',
    duration: 'Most Recent Internship',
    type: 'Internship',
    icon: '🏅',
    color: '#3B82F6',
    location: 'Bengaluru, Karnataka',
    achievements: [
      'Initially worked as UI/UX Designer using Figma, creating structured and user-friendly design layouts.',
      'Demonstrated consistency and design quality, which led to being assigned a Team Lead role.',
      'Managed and supervised all interns within the UI/UX domain, ensuring alignment with project requirements.',
      'Monitored daily work progress, collected updates, and maintained detailed documentation.',
      'Ensured consistency and quality across all UI/UX designs through regular reviews and feedback.',
      'Acted as primary point of coordination for task allocation, follow-ups, and team communication.',
    ],
    techStack: ['Figma', 'UI/UX Design', 'Team Leadership', 'Prototyping', 'Design Review'],
  },
  {
    company: 'Talisma',
    role: 'UI/UX Designer & Frontend Developer',
    duration: '2-Month Internship',
    type: 'Internship',
    icon: '💻',
    color: '#8B5CF6',
    location: 'Bengaluru, Karnataka',
    achievements: [
      'Designed and developed a customer dashboard UI for Talisma using Figma and React.js.',
      'First designed the UI in Figma, ensuring a clean and user-friendly layout for customer data.',
      'Developed the UI using React.js for dynamic and responsive rendering.',
      'Displayed detailed data of a target customer including profile, activities, and relevant metrics.',
      'Used static APIs (arrays) to simulate sample data fetched from a backend API.',
      'Built the frontend interface to dynamically display fetched sample data.',
    ],
    techStack: ['Figma', 'React.js', 'Node.js', 'JavaScript', 'CSS', 'REST APIs'],
  },
  {
    company: 'Reg Vectors',
    role: 'UI/UX Designer & QA Engineer',
    duration: '3-Month Internship',
    type: 'Internship',
    icon: '🎨',
    color: '#06B6D4',
    location: 'Bengaluru, Karnataka',
    achievements: [
      'Built a working prototype of a fun club platform showcasing activities like sports, dance, music, and instruments.',
      'Performed Quality Assurance (QA) work on the project to ensure functionality and reliability.',
      'Created and documented detailed test cases for validating features and detecting issues.',
      'Collaborated closely with developers to report bugs and verify fixes across the platform.',
    ],
    techStack: ['Figma', 'UI/UX Design', 'Manual Testing', 'Test Case Design', 'QA Documentation'],
  },
];

function TimelineDot({ color, active }: { color: string; active: boolean }) {
  return (
    <div className="relative z-10 flex items-center justify-center">
      <div
        className="w-5 h-5 rounded-full border-2 transition-all duration-500"
        style={{
          background: active ? color : 'var(--bg-secondary)',
          borderColor: color,
          boxShadow: active ? `0 0 15px ${color}, 0 0 30px ${color}60` : 'none',
        }}
      >
        {active && (
          <div className="absolute inset-0 rounded-full animate-ping opacity-40" style={{ background: color }} />
        )}
      </div>
    </div>
  );
}

function ExperienceCard({ item, index }: { item: ExperienceItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const isLeft = index % 2 === 0;

  return (
    <div className={`relative flex items-center gap-6 lg:gap-10 ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'} flex-col`}>
      {/* Card */}
      <div ref={ref} className="w-full lg:w-[calc(50%-40px)]">
        <motion.div
          initial={{ opacity: 0, rotateY: isLeft ? -90 : 90, x: isLeft ? -60 : 60 }}
          animate={isInView ? { opacity: 1, rotateY: 0, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ perspective: '1000px', willChange: 'transform' }}
        >
          <GlassCard hover3d className="p-6 group relative overflow-hidden">
            {/* Ambient glow */}
            <div
              className="absolute -top-10 -right-10 w-32 h-32 rounded-full pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity duration-500"
              style={{ background: `radial-gradient(circle, ${item.color} 0%, transparent 70%)`, filter: 'blur(20px)' }}
            />

            {/* Header */}
            <div className="flex items-start gap-4 mb-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ background: `${item.color}20`, border: `1px solid ${item.color}40`, boxShadow: `0 0 15px ${item.color}20` }}
              >
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-white leading-tight" style={{ fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)' }}>
                  {item.role}
                </h3>
                <p className="font-semibold text-sm mt-0.5" style={{ color: item.color }}>{item.company}</p>
              </div>
            </div>

            {/* Meta */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="tech-badge" style={{ borderColor: `${item.color}40`, color: `${item.color}cc`, background: `${item.color}15` }}>
                📅 {item.duration}
              </span>
              <span className="tech-badge">📍 {item.location}</span>
              <span className="tech-badge">{item.type}</span>
            </div>

            {/* Divider */}
            <div className="h-px mb-4" style={{ background: `linear-gradient(90deg, ${item.color}50, transparent)` }} />

            {/* Achievements */}
            <ul className="flex flex-col gap-2 mb-4">
              {item.achievements.map((a, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                  <span className="mt-1 flex-shrink-0" style={{ color: item.color }}>▸</span>
                  <span className="leading-relaxed">{a}</span>
                </li>
              ))}
            </ul>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mt-3">
              {item.techStack.map((t) => (
                <span key={t} className="tech-badge">{t}</span>
              ))}
            </div>

            {/* Bottom glow line */}
            <div
              className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: `linear-gradient(90deg, transparent, ${item.color}, transparent)` }}
            />
          </GlassCard>
        </motion.div>
      </div>

      {/* Timeline center (desktop only) */}
      <div className="hidden lg:flex flex-col items-center justify-center flex-shrink-0">
        <TimelineDot color={item.color} active={isInView} />
      </div>

      {/* Spacer */}
      <div className="hidden lg:block w-[calc(50%-40px)]" />
    </div>
  );
}

export default function Experience() {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initGSAP = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      if (!timelineRef.current) return;
      const line = timelineRef.current.querySelector('.timeline-glow-line');
      if (!line) return;
      gsap.fromTo(
        line,
        { scaleY: 0, transformOrigin: 'top center' },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 70%',
            end: 'bottom 30%',
            scrub: 1,
          },
        }
      );
    };
    initGSAP();
  }, []);

  return (
    <section id="experience" className="section-base" style={{ background: 'var(--bg-primary)' }}>
      <div className="container-max relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-cyan-400 mb-3 block">// Work Experience</span>
          <h2 className="section-title gradient-text-static" style={{ fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)' }}>
            Where I&apos;ve Worked
          </h2>
          <p className="section-subtitle text-slate-400 mx-auto mt-4">
            Real-world internships spanning UI/UX design, full-stack development, and quality assurance.
          </p>
        </motion.div>

        <div ref={timelineRef} className="relative">
          <div
            className="timeline-glow-line hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2"
            style={{ background: 'linear-gradient(180deg, transparent, #3B82F6, #8B5CF6, #06B6D4, transparent)' }}
          />
          <div className="flex flex-col gap-12 lg:gap-16">
            {experiences.map((item, i) => (
              <ExperienceCard key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
