'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Project {
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
  icon: string;
  color: string;
  accentColor: string;
  codeSnippet: string;
  category: string;
}

const projects: Project[] = [
  {
    title: 'Account Manager Dashboard',
    description: 'AI-powered customer management dashboard with interactive data views',
    longDescription:
      'Built a full-stack Account Manager Dashboard for managing and analyzing customer data. Frontend developed with React.js for an interactive and responsive UI. Backend built using Node.js serving structured data. Enabled the account manager to interact with an AI assistant within the dashboard for customer suggestions and insights.',
    techStack: ['React.js', 'Node.js', 'JavaScript', 'CSS', 'REST APIs', 'AI Assistant'],
    githubUrl: 'https://github.com/anushkulal',
    liveUrl: '#',
    icon: '📊',
    color: '#3B82F6',
    accentColor: '#60A5FA',
    category: 'Full-Stack',
    codeSnippet: `const fetchCustomer = async (id) => {
  const res = await api.get(\`/customers/\${id}\`);
  return { ...res.data, aiSuggestions:
    await getAISuggestions(res.data) };
}`,
  },
  {
    title: 'VPN Mobile App (Mockup)',
    description: 'Premium UI/UX mobile app mockup with interactive prototyping in Figma',
    longDescription:
      'Designed a complete mobile application mockup inspired by VPN apps. Created the entire frontend UI in Figma with a modern, intuitive layout. Included interactive prototyping to simulate real app navigation and functionality. Showcased features like viewing multiple servers, selecting a server, and connecting to it — focused entirely on UI/UX design with no backend development.',
    techStack: ['Figma', 'UI/UX Design', 'Prototyping', 'Interactive Design', 'Mobile Design'],
    githubUrl: 'https://github.com/anushkulal',
    liveUrl: '#',
    icon: '🔐',
    color: '#8B5CF6',
    accentColor: '#A78BFA',
    category: 'UI/UX Design',
    codeSnippet: `// Figma Auto-Layout Components
Frame: VPN_Server_Card
  ├─ Server_Icon (32×32)
  ├─ Server_Name (Bold/16)
  ├─ Server_Location (Regular/12)
  └─ Connect_Button (CTA/Blue)`,
  },
  {
    title: 'Talisma Customer Dashboard',
    description: 'Customer dashboard UI built during Talisma internship — Figma to React',
    longDescription:
      'Designed and developed a customer dashboard UI for Talisma during my 2-month internship. First designed the complete UI in Figma ensuring a clean, user-friendly layout. Then developed it using React.js for dynamic and responsive rendering. Displays detailed customer data including profile information, activities, and metrics — powered by simulated API data.',
    techStack: ['Figma', 'React.js', 'JavaScript', 'CSS', 'Static APIs', 'Responsive Design'],
    githubUrl: 'https://github.com/anushkulal',
    liveUrl: '#',
    icon: '🏢',
    color: '#06B6D4',
    accentColor: '#22D3EE',
    category: 'Internship Project',
    codeSnippet: `const CustomerDashboard = ({ customerId }) => {
  const [data] = useState(customers[customerId]);
  return (
    <Dashboard>
      <ProfileCard data={data.profile} />
      <ActivityFeed items={data.activities} />
    </Dashboard>
  );
}`,
  },
  {
    title: 'Fun Club Platform Prototype',
    description: 'Activity platform prototype built during Reg Vectors internship with QA',
    longDescription:
      'Built a working prototype of a fun club platform as part of a 3-month internship at Reg Vectors. The platform showcases various activities like sports, dance, music, and instruments. Also performed comprehensive QA work on the project — created and documented test cases for validating features and detecting issues across the platform.',
    techStack: ['UI/UX Design', 'Figma', 'Manual Testing', 'QA Documentation', 'Test Cases'],
    githubUrl: 'https://github.com/anushkulal',
    liveUrl: '#',
    icon: '🎭',
    color: '#10B981',
    accentColor: '#34D399',
    category: 'Design + QA',
    codeSnippet: `// Test Case: TC_001 - Activity Browse
Given: User is on /activities page
When: User clicks "Sports" category
Then: Sports activities display
  AND: Filter shows "Sports" active
  AND: Count badge updates correctly`,
  },
];

function CodeSnippetBg({ code }: { code: string }) {
  const lines = code.split('\n');
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ opacity: 0.07, fontFamily: 'monospace', fontSize: '9px' }}>
      {Array.from({ length: 6 }, (_, row) =>
        lines.map((line, i) => (
          <div
            key={`${row}-${i}`}
            className="whitespace-pre text-blue-300"
            style={{ transform: `translateY(${row * lines.length * 14 + i * 14}px)`, animation: `slide-up ${3 + row * 0.5}s linear infinite` }}
          >
            {line}
          </div>
        ))
      )}
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative group cursor-default"
      style={{ willChange: 'transform' }}
    >
      <motion.div
        animate={{ y: hovered ? -8 : 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="glass-card overflow-hidden h-full flex flex-col"
        style={{
          boxShadow: hovered ? `0 20px 60px ${project.color}30, 0 0 40px ${project.color}15` : '0 4px 20px rgba(0,0,0,0.2)',
          borderColor: hovered ? `${project.color}40` : undefined,
          transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
        }}
      >
        <CodeSnippetBg code={project.codeSnippet} />
        <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${project.color}, ${project.accentColor})` }} />

        <div className="p-6 flex flex-col gap-4 flex-1 relative z-10">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ background: `${project.color}20`, border: `1px solid ${project.color}40` }}
              >
                {project.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold text-white leading-tight" style={{ fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)' }}>
                  {project.title}
                </h3>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: `${project.color}20`, color: project.accentColor, border: `1px solid ${project.color}30` }}>
                  {project.category}
                </span>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <AnimatePresence mode="wait">
              <motion.p
                key={hovered ? 'long' : 'short'}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="text-slate-300 text-sm leading-relaxed"
              >
                {hovered ? project.longDescription : project.description}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span key={tech} className="tech-badge">{tech}</span>
            ))}
          </div>

          <div className="flex gap-3 mt-auto pt-2 border-t border-white/5">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer flex-1 py-2.5 rounded-lg text-sm font-semibold text-center glass neon-border-blue text-slate-300 hover:text-white transition-all duration-200"
              onClick={(e) => e.stopPropagation()}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = project.color;
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 0 15px ${project.color}40`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = '';
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = '';
              }}
            >
              GitHub
            </a>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer flex-1 py-2.5 rounded-lg text-sm font-semibold text-center text-white transition-all duration-200"
              style={{ background: `linear-gradient(135deg, ${project.color}, ${project.accentColor})` }}
              onClick={(e) => e.stopPropagation()}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 0 25px ${project.color}80`;
                (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.02)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = '';
                (e.currentTarget as HTMLAnchorElement).style.transform = '';
              }}
            >
              View Details
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section-base" style={{ background: 'linear-gradient(180deg, #0D1B2E 0%, var(--bg-primary) 100%)' }}>
      <div className="container-max relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-blue-400 mb-3 block">// Featured Projects</span>
          <h2 className="section-title gradient-text-static" style={{ fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)' }}>
            Things I&apos;ve Built
          </h2>
          <p className="section-subtitle text-slate-400 mx-auto mt-4">
            Real projects from internships and personal work — spanning UI/UX design, full-stack development, and quality assurance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/anushkulal"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer inline-flex items-center gap-2 px-8 py-3 rounded-xl glass neon-border-blue text-slate-300 hover:text-white transition-all duration-300 font-semibold hover-lift"
          >
            <span>🐙</span>
            View All on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
