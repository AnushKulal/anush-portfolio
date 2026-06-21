'use client';

import { useRef, useMemo } from 'react';
import { motion } from 'framer-motion';

interface ContactButton {
  label: string;
  icon: string;
  href: string;
  color: string;
  hoverColor: string;
  download?: boolean;
  description: string;
}

const contactButtons: ContactButton[] = [
  {
    label: 'Send Email',
    icon: '✉️',
    href: 'mailto:anushkulalm@gmail.com',
    color: '#3B82F6',
    hoverColor: '#2563EB',
    description: 'anushkulalm@gmail.com',
  },
  {
    label: 'LinkedIn',
    icon: '💼',
    href: 'https://linkedin.com/in/anush-kulal',
    color: '#0A66C2',
    hoverColor: '#004182',
    description: 'linkedin.com/in/anush-kulal',
  },
  {
    label: 'GitHub',
    icon: '🐙',
    href: 'https://github.com/anushkulal',
    color: '#6E40C9',
    hoverColor: '#8B5CF6',
    description: 'github.com/anushkulal',
  },
  {
    label: 'Download Resume',
    icon: '📄',
    href: '/resume.pdf',
    color: '#10B981',
    hoverColor: '#059669',
    download: true,
    description: 'Download PDF Resume',
  },
];

function MiniParticle({ x, y, size, delay }: { x: number; y: number; size: number; delay: number }) {
  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        background: Math.random() > 0.5 ? '#3B82F620' : '#8B5CF620',
        animation: `float ${3 + Math.random() * 3}s ease-in-out ${delay}s infinite`,
        willChange: 'transform',
      }}
    />
  );
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  const particles = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 6 + 2,
        delay: i * 0.2,
      })),
    []
  );

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-base"
      style={{ background: 'linear-gradient(180deg, var(--bg-primary) 0%, #060D1A 100%)' }}
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p, i) => (
          <MiniParticle key={i} {...p} />
        ))}
        <div
          className="absolute rounded-full opacity-15"
          style={{
            width: 700,
            height: 700,
            background: 'radial-gradient(circle, #3B82F6 0%, transparent 70%)',
            bottom: '-30%',
            left: '50%',
            transform: 'translateX(-50%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      <div className="container-max relative z-10 text-center">
        {/* Label */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-xs font-semibold tracking-widest uppercase text-blue-400 mb-4 block"
        >
          // Get In Touch
        </motion.span>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-bold leading-tight mb-6 gradient-text"
          style={{
            fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)',
            fontSize: 'clamp(2rem, 6vw, 4rem)',
          }}
        >
          Let&apos;s Build Something<br />
          <span className="text-white">Amazing Together.</span>
        </motion.h2>

        {/* Sub text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-400 text-lg max-w-xl mx-auto mb-12 leading-relaxed"
        >
          I&apos;m open to full-time roles, freelance projects, and exciting collaborations.
          Whether you have a startup idea, a QA challenge, or a design problem — let&apos;s talk.
        </motion.p>

        {/* Contact Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16"
        >
          {contactButtons.map((btn, i) => (
            <motion.a
              key={btn.label}
              href={btn.href}
              target={btn.download ? '_blank' : btn.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              download={btn.download}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
              whileHover={{
                scale: 1.05,
                y: -4,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.97 }}
              className="cursor-pointer glass-card p-5 flex flex-col items-center gap-3 group relative overflow-hidden"
              style={{
                willChange: 'transform',
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = `${btn.color}60`;
                el.style.boxShadow = `0 10px 40px ${btn.color}30, 0 0 20px ${btn.color}20`;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = '';
                el.style.boxShadow = '';
              }}
            >
              {/* Glow bg */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: `radial-gradient(circle at 50% 50%, ${btn.color}15 0%, transparent 70%)` }}
              />

              {/* Icon */}
              <div
                className="text-3xl w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                style={{
                  background: `${btn.color}20`,
                  border: `1px solid ${btn.color}40`,
                  boxShadow: `0 0 0 0 ${btn.color}`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 20px ${btn.color}60`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '';
                }}
              >
                {btn.icon}
              </div>

              <div className="relative z-10">
                <p
                  className="font-semibold text-white text-sm"
                  style={{ fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)' }}
                >
                  {btn.label}
                </p>
                <p className="text-xs text-slate-500 mt-0.5 truncate max-w-[160px]">{btn.description}</p>
              </div>

              {/* Bottom glow */}
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, transparent, ${btn.color}, transparent)` }}
              />
            </motion.a>
          ))}
        </motion.div>

        {/* Status indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex items-center justify-center gap-2 mb-16"
        >
          <div
            className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse"
            style={{ boxShadow: '0 0 8px #4ADE80' }}
          />
          <span className="text-slate-400 text-sm">
            Currently open to new opportunities
          </span>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-2">
            <span
              className="text-xl font-bold gradient-text-static"
              style={{ fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)' }}
            >
              AK
            </span>
            <span className="text-slate-500 text-sm">— Anush Kulal M</span>
          </div>

          <p className="text-slate-600 text-sm text-center">
            © {new Date().getFullYear()} Anush Kulal M. Designed & Built with ❤️
          </p>

          <div className="flex items-center gap-4">
            {[
              { href: 'mailto:anushkulalm@gmail.com', label: '✉️' },
              { href: 'https://linkedin.com/in/anush-kulal', label: '💼' },
              { href: 'https://github.com/anushkulal', label: '🐙' },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="cursor-pointer text-slate-500 hover:text-slate-200 transition-colors text-lg"
              >
                {link.label}
              </a>
            ))}
          </div>
        </motion.footer>
      </div>
    </section>
  );
}
