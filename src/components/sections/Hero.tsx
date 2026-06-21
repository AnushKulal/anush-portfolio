'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const Scene = dynamic(() => import('@/components/three/Scene'), {
  ssr: false,
  loading: () => null,
});

const ROLES = [
  'UI/UX Designer',
  'Frontend Developer',
  'QA Engineer',
  'Team Leader',
  'Problem Solver',
];

function TypewriterText() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) {
      const t = setTimeout(() => setPaused(false), 1200);
      return () => clearTimeout(t);
    }
    const current = ROLES[roleIndex];
    if (!deleting) {
      if (displayed.length < current.length) {
        const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
        return () => clearTimeout(t);
      } else {
        setPaused(true);
        const t = setTimeout(() => setDeleting(true), 100);
        return () => clearTimeout(t);
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 45);
        return () => clearTimeout(t);
      } else {
        setDeleting(false);
        setRoleIndex((i) => (i + 1) % ROLES.length);
      }
    }
  }, [displayed, deleting, roleIndex, paused]);

  return (
    <span className="inline-flex items-center">
      <span className="gradient-text font-semibold">{displayed}</span>
      <span className="ml-1 inline-block w-0.5 h-7 bg-blue-400 rounded-full" style={{ animation: 'glow-pulse 1s ease-in-out infinite' }} />
    </span>
  );
}

export default function Hero() {
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full grain-overlay"
      style={{ height: '100svh', minHeight: '680px', background: 'var(--bg-primary)' }}
    >
      {/* 3D Scene Background */}
      <div className="absolute inset-0 z-0">
        <Scene mousePosition={mousePosition} />
      </div>

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 z-[1] pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 50%, transparent 30%, rgba(15,23,42,0.7) 100%)' }} />
      <div className="absolute inset-0 z-[1] pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 60% at 20% 50%, rgba(59,130,246,0.07) 0%, transparent 70%)' }} />

      {/* Content */}
      <div className="relative z-[2] h-full flex items-center px-6 lg:px-12 xl:px-20">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center pt-20">

          {/* LEFT — Text */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Available badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-5"
            >
              <span className="px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase text-blue-300 glass neon-border-blue">
                ✦ Available for Opportunities
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="gradient-text font-bold leading-none mb-3"
              style={{ fontFamily: 'var(--font-space-grotesk, Space Grotesk, sans-serif)', fontSize: 'clamp(2.8rem, 8vw, 5.5rem)', letterSpacing: '-0.02em' }}
            >
              Anush Kulal M
            </motion.h1>

            {/* Role typewriter */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mb-5"
              style={{ fontSize: 'clamp(1rem, 2.5vw, 1.4rem)' }}
            >
              <TypewriterText />
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="max-w-lg text-slate-400 text-base sm:text-lg mb-8 leading-relaxed"
            >
              MCA Student at Jain University, Bengaluru. Crafting exceptional digital experiences
              through clean design, solid code, and rigorous testing.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="cursor-pointer px-8 py-3 rounded-xl text-white font-semibold text-sm sm:text-base transition-all duration-300"
                style={{ background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)', boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)', willChange: 'transform' }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.05) translateY(-2px)';
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 40px rgba(59, 130, 246, 0.8), 0 0 80px rgba(139, 92, 246, 0.4)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = '';
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.5)';
                }}
              >
                View My Work
              </button>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="cursor-pointer px-8 py-3 rounded-xl text-slate-300 font-semibold text-sm sm:text-base glass neon-border-blue hover:text-white transition-all duration-300"
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.05) translateY(-2px)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = ''; }}
              >
                Get In Touch
              </button>
            </motion.div>
          </div>

          {/* RIGHT — Profile Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotateY: 20 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Outer glow ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
                className="absolute -inset-3 rounded-full"
                style={{
                  background: 'conic-gradient(from 0deg, #3B82F6, #8B5CF6, #06B6D4, #3B82F6)',
                  padding: '2px',
                  borderRadius: '50%',
                  opacity: 0.6,
                  filter: 'blur(4px)',
                }}
              />
              {/* Pulsing glow */}
              <div
                className="absolute -inset-6 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, rgba(139,92,246,0.1) 50%, transparent 70%)', animation: 'glow-pulse 3s ease-in-out infinite' }}
              />

              {/* Gradient border */}
              <div
                className="relative rounded-full p-0.5"
                style={{ background: 'linear-gradient(135deg, #3B82F6, #8B5CF6, #06B6D4)' }}
              >
                {/* Photo */}
                <div className="w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-full overflow-hidden relative" style={{ background: 'var(--bg-primary)' }}>
                  <Image
                    src="/anush.jpeg"
                    alt="Anush Kulal M"
                    fill
                    className="object-cover object-top scale-110"
                    priority
                  />
                  {/* Holographic sheen */}
                  <div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.12) 0%, transparent 40%, rgba(139,92,246,0.12) 100%)' }}
                  />
                </div>
              </div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                className="absolute -left-6 top-8 glass px-3 py-2 rounded-xl text-xs font-semibold text-blue-300"
                style={{ border: '1px solid rgba(59,130,246,0.4)', backdropFilter: 'blur(12px)', whiteSpace: 'nowrap' }}
              >
                🎨 UI/UX Designer
              </motion.div>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -right-4 bottom-12 glass px-3 py-2 rounded-xl text-xs font-semibold text-purple-300"
                style={{ border: '1px solid rgba(139,92,246,0.4)', backdropFilter: 'blur(12px)', whiteSpace: 'nowrap' }}
              >
                💻 Developer
              </motion.div>
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 glass px-3 py-2 rounded-xl text-xs font-semibold text-green-300"
                style={{ border: '1px solid rgba(16,185,129,0.4)', backdropFilter: 'blur(12px)', whiteSpace: 'nowrap' }}
              >
                🧪 QA Engineer
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="cursor-pointer absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 hover:text-slate-300 transition-colors z-[3]"
      >
        <span className="text-xs tracking-widest uppercase font-medium">Scroll to Explore</span>
        <span className="text-lg animate-bounce-y">↓</span>
      </motion.button>
    </section>
  );
}
