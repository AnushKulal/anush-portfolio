'use client';

import { useRef, MouseEvent, ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover3d?: boolean;
  onClick?: () => void;
}

export default function GlassCard({
  children,
  className = '',
  hover3d = false,
  onClick,
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!hover3d || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    cardRef.current.style.boxShadow = `
      ${rotateY * -1}px ${rotateX}px 30px rgba(59, 130, 246, 0.15),
      0 20px 60px rgba(0, 0, 0, 0.3)
    `;
  }

  function handleMouseLeave() {
    if (!hover3d || !cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    cardRef.current.style.boxShadow = '';
  }

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={hover3d ? handleMouseMove : undefined}
      onMouseLeave={hover3d ? handleMouseLeave : undefined}
      className={`glass-card ${className}`}
      style={{
        transition: hover3d ? 'transform 0.1s ease, box-shadow 0.1s ease' : undefined,
        willChange: hover3d ? 'transform' : undefined,
        cursor: onClick ? 'pointer' : undefined,
      }}
    >
      {children}
    </div>
  );
}
