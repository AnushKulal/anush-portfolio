'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const projects = [
  {
    id: 1,
    category: 'Full Stack',
    icon: '🖥️',
    title: 'Account Manager Dashboard',
    description:
      'A feature-rich account management dashboard with an integrated AI assistant. Built with React.js frontend, Node.js backend, and AI-powered insights for enhanced productivity.',
    tech: ['React.js', 'Node.js', 'AI Integration', 'REST APIs', 'CSS Modules'],
    featured: true,
    color: '#A78BFA',
    codeSnippet: `const dashboard = {
  users: await fetchAccounts(),
  ai: new AIAssistant({ model: 'gpt-4' }),
  analytics: initCharts(data),
};

dashboard.ai.on('query', async (q) => {
  const context = await dashboard
    .users.getContext();
  return ai.respond(q, context);
});`,
  },
  {
    id: 2,
    category: 'UI/UX Design',
    icon: '📱',
    title: 'VPN Mobile App',
    description:
      'Interactive Figma prototype for a VPN mobile app featuring a clean, modern UI with server selection, connection status, and settings screens.',
    tech: ['Figma', 'UI/UX', 'Prototyping', 'Mobile Design'],
    featured: false,
    color: '#06B6D4',
    codeSnippet: null,
  },
  {
    id: 3,
    category: 'Design → Dev',
    icon: '📊',
    title: 'Talisma Customer Dashboard',
    description:
      'End-to-end build from Figma design to React.js implementation. Customer data dashboard with dynamic rendering and static API integration.',
    tech: ['Figma', 'React.js', 'JavaScript', 'APIs'],
    featured: false,
    color: '#3B82F6',
    codeSnippet: null,
  },
  {
    id: 4,
    category: 'Prototype + QA',
    icon: '🎭',
    title: 'Fun Club Platform',
    description:
      'Interactive prototype of a multi-activity platform (sports, dance, music) with full QA documentation including test cases and bug reports.',
    tech: ['Figma', 'Prototyping', 'QA', 'Test Cases'],
    featured: false,
    color: '#F59E0B',
    codeSnippet: null,
  },
];

function FeaturedCard({ project }: { project: typeof projects[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        gridColumn: '1 / -1',
        background: 'rgba(10,10,26,0.9)',
        border: `1px solid ${hovered ? project.color + '80' : 'rgba(124,58,237,0.2)'}`,
        borderRadius: '20px',
        padding: '40px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '40px',
        alignItems: 'center',
        transition: 'all 0.3s ease',
        boxShadow: hovered ? `0 0 50px ${project.color}20` : 'none',
        backdropFilter: 'blur(20px)',
        position: 'relative',
        overflow: 'hidden',
      }}
      className="featured-card-inner"
    >
      {/* Grid pattern background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `linear-gradient(rgba(124,58,237,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.04) 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
        pointerEvents: 'none',
      }} />

      {/* Left: info */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <span style={{ fontSize: '1.5rem' }}>{project.icon}</span>
          <span style={{
            padding: '4px 12px',
            background: `${project.color}20`,
            border: `1px solid ${project.color}50`,
            borderRadius: '20px',
            fontSize: '0.75rem',
            color: project.color,
            fontFamily: 'var(--font-inter)',
            fontWeight: 600,
          }}>
            {project.category}
          </span>
          <span style={{
            padding: '4px 12px',
            background: 'rgba(167,139,250,0.1)',
            border: '1px solid rgba(167,139,250,0.3)',
            borderRadius: '20px',
            fontSize: '0.7rem',
            color: 'var(--purple-light)',
            fontFamily: 'var(--font-inter)',
          }}>
            ⭐ Featured
          </span>
        </div>

        <h3 style={{
          fontFamily: 'var(--font-space)',
          fontSize: '1.8rem',
          fontWeight: 700,
          color: 'var(--white)',
          marginBottom: '14px',
          lineHeight: 1.2,
        }}>
          {project.title}
        </h3>

        <p style={{
          color: 'var(--gray)',
          fontSize: '0.95rem',
          lineHeight: 1.75,
          marginBottom: '24px',
          fontFamily: 'var(--font-inter)',
        }}>
          {project.description}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '28px' }}>
          {project.tech.map((t, i) => (
            <span key={i} className="tech-badge">{t}</span>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            style={{
              padding: '10px 22px',
              background: `linear-gradient(135deg, ${project.color}, ${project.color}aa)`,
              border: 'none',
              borderRadius: '10px',
              color: '#fff',
              fontFamily: 'var(--font-inter)',
              fontSize: '0.875rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'; }}
          >
            View Project
          </button>
        </div>
      </div>

      {/* Right: code snippet */}
      <div style={{
        background: 'rgba(0,0,0,0.5)',
        border: '1px solid rgba(124,58,237,0.2)',
        borderRadius: '12px',
        padding: '24px',
        position: 'relative',
        zIndex: 1,
        overflow: 'hidden',
      }}>
        <div style={{ display: 'flex', gap: '6px', marginBottom: '16px' }}>
          {['#ff5f57', '#febc2e', '#28c840'].map((c, i) => (
            <div key={i} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c }} />
          ))}
        </div>
        <pre style={{
          fontFamily: 'Courier New, monospace',
          fontSize: '0.78rem',
          color: 'var(--gray)',
          lineHeight: 1.7,
          overflowX: 'auto',
          whiteSpace: 'pre-wrap',
        }}>
          <code>{project.codeSnippet}</code>
        </pre>

        {/* Animated code stream lines */}
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              bottom: `${20 + i * 20}px`,
              left: '0',
              height: '1px',
              width: '100%',
              background: `linear-gradient(90deg, transparent, ${project.color}40, transparent)`,
              animation: `shimmer ${2 + i * 0.5}s ease-in-out ${i * 0.3}s infinite`,
              backgroundSize: '200% 100%',
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

function ProjectCard({ project, delay }: { project: typeof projects[0]; delay: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'rgba(10,10,26,0.85)',
        border: `1px solid ${hovered ? project.color + '70' : 'rgba(124,58,237,0.2)'}`,
        borderRadius: '16px',
        padding: '28px',
        transition: 'all 0.3s ease',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered ? `0 20px 40px ${project.color}20` : 'none',
        backdropFilter: 'blur(20px)',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
      }}
    >
      {/* Grid background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `linear-gradient(rgba(124,58,237,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.04) 1px, transparent 1px)`,
        backgroundSize: '30px 30px',
        pointerEvents: 'none',
      }} />

      {/* Top accent line */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: `linear-gradient(90deg, transparent, ${project.color}, transparent)`,
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
          <span style={{ fontSize: '1.3rem' }}>{project.icon}</span>
          <span style={{
            padding: '3px 10px',
            background: `${project.color}20`,
            border: `1px solid ${project.color}50`,
            borderRadius: '20px',
            fontSize: '0.7rem',
            color: project.color,
            fontFamily: 'var(--font-inter)',
            fontWeight: 600,
          }}>
            {project.category}
          </span>
        </div>

        <h3 style={{
          fontFamily: 'var(--font-space)',
          fontSize: '1.1rem',
          fontWeight: 700,
          color: 'var(--white)',
          marginBottom: '10px',
          lineHeight: 1.3,
        }}>
          {project.title}
        </h3>

        <p style={{
          color: 'var(--gray)',
          fontSize: '0.85rem',
          lineHeight: 1.7,
          marginBottom: '18px',
          fontFamily: 'var(--font-inter)',
        }}>
          {project.description}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
          {project.tech.map((t, i) => (
            <span key={i} style={{
              padding: '3px 10px',
              background: 'rgba(124,58,237,0.08)',
              border: '1px solid rgba(124,58,237,0.2)',
              borderRadius: '20px',
              fontSize: '0.7rem',
              color: 'var(--gray)',
              fontFamily: 'var(--font-inter)',
            }}>
              {t}
            </span>
          ))}
        </div>

        <button
          style={{
            padding: '8px 18px',
            background: 'none',
            border: `1px solid ${project.color}60`,
            borderRadius: '8px',
            color: project.color,
            fontFamily: 'var(--font-inter)',
            fontSize: '0.8rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.background = `${project.color}20`;
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.background = 'none';
          }}
        >
          View Details →
        </button>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [featured, ...rest] = projects;

  return (
    <section
      id="projects"
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
          <span className="section-label">// 04. Projects</span>
          <h2
            style={{
              fontFamily: 'var(--font-space)',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              color: 'var(--white)',
              lineHeight: 1.2,
            }}
          >
            Things I&apos;ve{' '}
            <span style={{
              background: 'linear-gradient(135deg, #A78BFA, #06B6D4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Built
            </span>
          </h2>
        </motion.div>

        {/* Bento grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '20px',
        }} className="projects-bento">
          <FeaturedCard project={featured} />
          {rest.map((project, i) => (
            <ProjectCard key={project.id} project={project} delay={i * 0.1} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .projects-bento { grid-template-columns: 1fr !important; }
          .featured-card-inner { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
