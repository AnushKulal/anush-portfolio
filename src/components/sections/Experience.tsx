'use client';

import { motion } from 'framer-motion';

const missions = [
  {
    id: '01',
    company: 'Skypoint Cloud',
    role: 'Business QA Engineer (Intern)',
    period: 'Apr 2026 – Present',
    color: '#4ade80',
    gradient: 'linear-gradient(135deg, rgba(74,222,128,0.15), rgba(74,222,128,0.05))',
    achievements: [
      'Performed functional, regression, integration, UI, and end-to-end testing for SaaS applications, ensuring high-quality releases and stability across multiple modules',
      'Collaborated with Product Managers, Developers, and Designers to refine requirements, prioritize backlogs, define acceptance criteria, and validate features against business needs',
      'Executed regression, sanity, security, and release testing — including weekly vulnerability scans, analysis of findings, and security assessment reports',
      'Created and maintained test cases, test documentation, and detailed defect reports with reproducible steps, expected results, and supporting evidence',
      'Participated in Agile ceremonies, tracked sprint progress, resolved blockers with cross-functional teams, and supported production deployments and release sign-offs',
      'Assisted in defect triaging and root-cause analysis, validated fixes, performed retesting, and ensured issues were fully resolved before release',
    ],
    tech: ['Manual Testing', 'Regression', 'Security Testing', 'Agile', 'Acceptance Criteria', 'Root-Cause Analysis'],
  },
  {
    id: '02',
    company: 'Xthlete India',
    role: 'UI/UX Designer → Team Lead',
    period: 'Oct 2025 – Jan 2026',
    color: '#A78BFA',
    gradient: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(167,139,250,0.05))',
    achievements: [
      'Started as UI/UX Designer, promoted to Team Lead based on performance and initiative',
      'Managed and supervised a team of interns, tracking daily progress and deliverables',
      'Maintained design consistency and quality across all project deliverables in Figma',
      'Led design reviews and provided constructive feedback to ensure brand alignment',
    ],
    tech: ['Figma', 'Team Leadership', 'UI/UX Design', 'Project Management'],
  },
  {
    id: '03',
    company: 'Talisma',
    role: 'Development Intern',
    period: 'Jun 2025 – Aug 2025',
    color: '#06B6D4',
    gradient: 'linear-gradient(135deg, rgba(6,182,212,0.12), rgba(6,182,212,0.03))',
    achievements: [
      'Designed a comprehensive customer dashboard UI in Figma with modern UX principles',
      'Developed the full interface with React.js, enabling dynamic data rendering',
      'Integrated static APIs to simulate realistic customer data flows',
      'Collaborated directly with the product team to translate wireframes into working code',
    ],
    tech: ['Figma', 'React.js', 'JavaScript', 'REST APIs', 'CSS'],
  },
  {
    id: '04',
    company: 'Reg Vectors',
    role: 'UI/UX Designer & QA Engineer',
    period: 'Mar 2024 – Sep 2024',
    color: '#3B82F6',
    gradient: 'linear-gradient(135deg, rgba(59,130,246,0.12), rgba(59,130,246,0.03))',
    achievements: [
      'Built an interactive prototype of a fun club platform encompassing sports, dance, and music',
      'Conducted thorough QA testing and created comprehensive test case documentation',
      'Identified and documented UI/UX inconsistencies and functional bugs',
      'Collaborated with developers to resolve issues and ensure quality standards',
    ],
    tech: ['Figma', 'Prototyping', 'QA Testing', 'Test Documentation', 'UI/UX'],
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
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
          style={{ marginBottom: '70px' }}
        >
          <span className="section-label">// 03. Experience</span>
          <h2
            style={{
              fontFamily: 'var(--font-space)',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              color: 'var(--white)',
              lineHeight: 1.2,
            }}
          >
            Mission{' '}
            <span style={{
              background: 'linear-gradient(135deg, #A78BFA, #06B6D4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Log
            </span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          {/* Vertical line */}
          <div
            style={{
              position: 'absolute',
              left: '22px',
              top: 0,
              bottom: 0,
              width: '2px',
              background: 'linear-gradient(180deg, #7C3AED, #06B6D4, #3B82F6)',
              boxShadow: '0 0 10px rgba(124,58,237,0.3)',
            }}
          />

          {missions.map((mission, i) => (
            <motion.div
              key={i}
              className="mission-item"
              initial={{ opacity: 0, x: -30, rotateY: 15 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              viewport={{ once: true }}
              style={{
                position: 'relative',
                paddingLeft: '70px',
                marginBottom: i < missions.length - 1 ? '50px' : 0,
              }}
            >
              {/* Timeline dot */}
              <div
                style={{
                  position: 'absolute',
                  left: '10px',
                  top: '24px',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: mission.color,
                  border: '3px solid var(--bg)',
                  boxShadow: `0 0 15px ${mission.color}80`,
                  zIndex: 1,
                }}
              />

              {/* Mission card */}
              <div
                className="space-card hover-lift mission-card"
                style={{
                  padding: '28px 32px',
                  background: mission.gradient,
                  borderLeft: `3px solid ${mission.color}`,
                }}
              >
                {/* Mission header */}
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '12px',
                  marginBottom: '16px',
                }}>
                  <div>
                    <div style={{
                      fontSize: '0.72rem',
                      color: mission.color,
                      fontFamily: 'Courier New, monospace',
                      fontWeight: 700,
                      letterSpacing: '0.15em',
                      marginBottom: '6px',
                    }}>
                      MISSION {mission.id}
                    </div>
                    <h3 style={{
                      fontFamily: 'var(--font-space)',
                      fontSize: '1.4rem',
                      fontWeight: 700,
                      color: 'var(--white)',
                      marginBottom: '4px',
                    }}>
                      {mission.company}
                    </h3>
                    <div style={{
                      color: 'var(--gray)',
                      fontSize: '0.9rem',
                      fontFamily: 'var(--font-inter)',
                      fontStyle: 'italic',
                    }}>
                      {mission.role}
                    </div>
                  </div>
                  <div style={{
                    padding: '6px 14px',
                    background: `${mission.color}22`,
                    border: `1px solid ${mission.color}44`,
                    borderRadius: '20px',
                    fontSize: '0.78rem',
                    color: mission.color,
                    fontFamily: 'var(--font-inter)',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                  }}>
                    {mission.period}
                  </div>
                </div>

                {/* Achievements */}
                <ul style={{ listStyle: 'none', marginBottom: '20px' }}>
                  {mission.achievements.map((a, ai) => (
                    <li
                      key={ai}
                      style={{
                        display: 'flex',
                        gap: '10px',
                        alignItems: 'flex-start',
                        marginBottom: '10px',
                        color: 'var(--gray)',
                        fontSize: '0.9rem',
                        fontFamily: 'var(--font-inter)',
                        lineHeight: 1.6,
                      }}
                    >
                      <span style={{ color: mission.color, flexShrink: 0, marginTop: '2px' }}>▹</span>
                      {a}
                    </li>
                  ))}
                </ul>

                {/* Tech tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {mission.tech.map((t, ti) => (
                    <span
                      key={ti}
                      style={{
                        padding: '4px 12px',
                        background: `${mission.color}18`,
                        border: `1px solid ${mission.color}44`,
                        borderRadius: '20px',
                        fontSize: '0.75rem',
                        color: mission.color,
                        fontFamily: 'var(--font-inter)',
                        fontWeight: 500,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 480px) {
          .mission-item { padding-left: 48px !important; }
          .mission-card { padding: 20px 18px !important; }
        }
      `}</style>
    </section>
  );
}
