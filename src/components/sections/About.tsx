'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import GlassCard from '@/components/ui/GlassCard';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
};

export default function About() {
  return (
    <section id="about" className="section-base" style={{ background: 'var(--bg-primary)' }}>
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute rounded-full opacity-20"
          style={{
            width: 500, height: 500,
            background: 'radial-gradient(circle, #3B82F6 0%, transparent 70%)',
            top: '-10%', left: '-15%',
            animation: 'orb-move 8s ease-in-out infinite',
            filter: 'blur(60px)',
          }}
        />
        <div
          className="absolute rounded-full opacity-15"
          style={{
            width: 400, height: 400,
            background: 'radial-gradient(circle, #8B5CF6 0%, transparent 70%)',
            bottom: '-10%', right: '-10%',
            animation: 'orb-move 10s ease-in-out infinite reverse',
            filter: 'blur(60px)',
          }}
        />
      </div>

      <div className="container-max relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-blue-400 mb-3 block">// About Me</span>
          <h2 className="section-title gradient-text-static" style={{ fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)' }}>
            The Person Behind the Code
          </h2>
          <p className="section-subtitle text-slate-400 mx-auto mt-4">
            A curious mind that codes, designs, and leads — always chasing the perfect user experience.
          </p>
        </motion.div>

        {/* Two-col: Photo + Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-16">
          {/* Photo card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center"
          >
            <div className="relative">
              {/* Glow rings */}
              <div className="absolute inset-0 rounded-3xl" style={{ boxShadow: '0 0 60px rgba(59,130,246,0.3), 0 0 120px rgba(139,92,246,0.15)', transform: 'scale(1.05)' }} />
              <div className="absolute -inset-1 rounded-3xl" style={{ background: 'linear-gradient(135deg, #3B82F6, #8B5CF6, #06B6D4)', padding: '2px', borderRadius: '24px' }}>
                <div className="w-full h-full rounded-3xl" style={{ background: 'var(--bg-primary)' }} />
              </div>
              <div className="relative w-64 h-72 sm:w-72 sm:h-80 rounded-3xl overflow-hidden" style={{ border: '2px solid rgba(59,130,246,0.4)' }}>
                <Image
                  src="/anush.jpeg"
                  alt="Anush Kulal M"
                  fill
                  className="object-cover object-top"
                  priority
                />
                {/* Holographic overlay */}
                <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.1) 0%, transparent 50%, rgba(139,92,246,0.1) 100%)' }} />
              </div>
              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                className="absolute -bottom-4 -right-4 glass px-3 py-2 rounded-xl"
                style={{ border: '1px solid rgba(59,130,246,0.4)', backdropFilter: 'blur(12px)' }}
              >
                <span className="text-xs font-semibold text-blue-300">Available for hire</span>
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block ml-2 animate-pulse" />
              </motion.div>
            </div>
          </motion.div>

          {/* Info side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)' }}>
                Hi, I&apos;m Anush Kulal M
              </h3>
              <p className="text-slate-300 leading-relaxed text-base">
                I am pursuing my MCA at Jain (Deemed-to-be University), Bengaluru. I have a strong
                foundation in computer science, programming, and software development. I explore
                different AI tools to enhance my knowledge and productivity, and I thrive at the
                intersection of beautiful design and robust engineering.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Location', value: 'Bengaluru, Karnataka', icon: '📍' },
                { label: 'Phone', value: '+91 9480487257', icon: '📱' },
                { label: 'Email', value: 'anushkulalm@gmail.com', icon: '✉️' },
                { label: 'Languages', value: 'English · Hindi · Kannada · Tulu', icon: '🌐' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <span className="text-lg">{item.icon}</span>
                  <div>
                    <span className="text-xs text-slate-500 uppercase tracking-wide">{item.label}</span>
                    <p className="text-sm text-slate-200 font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Education + Career cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* Education card */}
          <motion.div variants={cardVariants}>
            <GlassCard hover3d className="h-full p-6 flex flex-col gap-4 group hover-lift">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: '#8B5CF620', border: '1px solid #8B5CF640', boxShadow: '0 0 20px #8B5CF620' }}>
                  🎓
                </div>
                <h3 className="text-xl font-semibold text-white" style={{ fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)' }}>Education</h3>
              </div>
              <div className="h-px w-full rounded-full" style={{ background: 'linear-gradient(90deg, #8B5CF660, transparent)' }} />
              <div className="flex flex-col gap-5 flex-1">
                <div className="p-3 rounded-xl" style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.15)' }}>
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-white font-semibold text-sm leading-tight">Master of Computer Applications</p>
                    <span className="text-xs text-purple-400 font-bold ml-2 flex-shrink-0">7.8 CGPA</span>
                  </div>
                  <p className="text-blue-400 text-xs">Jain (Deemed-to-be University)</p>
                  <p className="text-slate-500 text-xs mt-1">Jul 2024 – Present</p>
                </div>
                <div className="p-3 rounded-xl" style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.15)' }}>
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-white font-semibold text-sm leading-tight">Bachelor of Computer Applications</p>
                    <span className="text-xs text-blue-400 font-bold ml-2 flex-shrink-0">8.2 CGPA</span>
                  </div>
                  <p className="text-blue-400 text-xs">Jain (Deemed-to-be University)</p>
                  <p className="text-slate-500 text-xs mt-1">Apr 2022</p>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(90deg, transparent, #8B5CF6, transparent)' }} />
            </GlassCard>
          </motion.div>

          {/* Career Objective card */}
          <motion.div variants={cardVariants}>
            <GlassCard hover3d className="h-full p-6 flex flex-col gap-4 group hover-lift">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: '#06B6D420', border: '1px solid #06B6D440', boxShadow: '0 0 20px #06B6D420' }}>
                  🚀
                </div>
                <h3 className="text-xl font-semibold text-white" style={{ fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)' }}>Career Objective</h3>
              </div>
              <div className="h-px w-full rounded-full" style={{ background: 'linear-gradient(90deg, #06B6D460, transparent)' }} />
              <p className="text-slate-300 text-sm leading-relaxed flex-1">
                Looking for an opportunity to work with a dynamic and robust team where I can learn
                and grow. I am eager to upskill and stay updated with the latest technological trends
                while contributing meaningfully to high-impact products through software development,
                UI/UX design, and quality assurance.
              </p>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(90deg, transparent, #06B6D4, transparent)' }} />
            </GlassCard>
          </motion.div>

          {/* Quick facts card */}
          <motion.div variants={cardVariants}>
            <GlassCard hover3d className="h-full p-6 flex flex-col gap-4 group hover-lift">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: '#3B82F620', border: '1px solid #3B82F640', boxShadow: '0 0 20px #3B82F620' }}>
                  ⚡
                </div>
                <h3 className="text-xl font-semibold text-white" style={{ fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)' }}>Quick Facts</h3>
              </div>
              <div className="h-px w-full rounded-full" style={{ background: 'linear-gradient(90deg, #3B82F660, transparent)' }} />
              <ul className="flex flex-col gap-3 flex-1">
                {[
                  '3 real-world internships across design, dev & QA',
                  'UI/UX designs built in Figma & developed in React.js',
                  'Team Lead experience managing interns at Xthlete India',
                  'Built full-stack dashboards with AI assistant integration',
                  'Exploring AI tools to enhance productivity daily',
                ].map((fact, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="text-blue-400 mt-0.5 flex-shrink-0">▸</span>
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(90deg, transparent, #3B82F6, transparent)' }} />
            </GlassCard>
          </motion.div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: 'Internships Completed', value: '3', icon: '💼' },
            { label: 'Projects Built', value: '5+', icon: '📦' },
            { label: 'Technologies Used', value: '12+', icon: '⚙️' },
            { label: 'BCA CGPA', value: '8.2', icon: '🏅' },
          ].map((stat, i) => (
            <div key={i} className="glass-card p-5 text-center glass-hover flex flex-col items-center gap-2 cursor-default">
              <span className="text-2xl">{stat.icon}</span>
              <p className="text-3xl font-bold gradient-text-static" style={{ fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)' }}>{stat.value}</p>
              <p className="text-xs text-slate-400 font-medium">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
