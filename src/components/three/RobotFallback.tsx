'use client';

import { useEffect, useRef } from 'react';

/**
 * Pure-SVG robotic astronaut whose head + eyes follow the cursor. No WebGL,
 * so it renders everywhere — used as the SplineRobot fallback when WebGL is
 * unavailable (e.g. hardware acceleration disabled).
 */
export default function RobotFallback() {
  const rootRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<SVGGElement>(null);
  const leftPupilRef = useRef<SVGCircleElement>(null);
  const rightPupilRef = useRef<SVGCircleElement>(null);

  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!rootRef.current) return;
      const r = rootRef.current.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      target.current.x = Math.max(-1, Math.min(1, (e.clientX - cx) / (window.innerWidth / 2)));
      target.current.y = Math.max(-1, Math.min(1, (e.clientY - cy) / (window.innerHeight / 2)));
    };

    let raf = 0;
    const loop = () => {
      current.current.x += (target.current.x - current.current.x) * 0.08;
      current.current.y += (target.current.y - current.current.y) * 0.08;
      const { x, y } = current.current;
      if (headRef.current) {
        headRef.current.style.transform = `rotate(${x * 7}deg) translate(${x * 5}px, ${y * 4}px)`;
      }
      if (leftPupilRef.current && rightPupilRef.current) {
        const px = x * 5;
        const py = y * 4;
        leftPupilRef.current.style.transform = `translate(${px}px, ${py}px)`;
        rightPupilRef.current.style.transform = `translate(${px}px, ${py}px)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}
    >
      <div style={{ width: 'min(78%, 330px)', animation: 'float 5s ease-in-out infinite', filter: 'drop-shadow(0 0 26px rgba(124,58,237,0.5))' }}>
        <svg viewBox="0 0 200 240" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="rfBody" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1b1b3a" />
              <stop offset="100%" stopColor="#0a0a1a" />
            </linearGradient>
            <linearGradient id="rfHelmet" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#2a2a55" />
              <stop offset="100%" stopColor="#12122e" />
            </linearGradient>
            <radialGradient id="rfVisor" cx="0.5" cy="0.4" r="0.7">
              <stop offset="0%" stopColor="#1e3a5f" />
              <stop offset="60%" stopColor="#0b1a33" />
              <stop offset="100%" stopColor="#05080f" />
            </radialGradient>
            <radialGradient id="rfEye" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#A78BFA" />
              <stop offset="100%" stopColor="#06B6D4" />
            </radialGradient>
          </defs>

          {/* Body */}
          <g>
            <rect x="34" y="150" width="22" height="58" rx="11" fill="url(#rfBody)" stroke="#7C3AED" strokeOpacity="0.5" strokeWidth="1.5" />
            <rect x="144" y="150" width="22" height="58" rx="11" fill="url(#rfBody)" stroke="#7C3AED" strokeOpacity="0.5" strokeWidth="1.5" />
            <rect x="58" y="138" width="84" height="86" rx="26" fill="url(#rfBody)" stroke="#7C3AED" strokeOpacity="0.6" strokeWidth="2" />
            <circle cx="100" cy="178" r="15" fill="#0a0a1a" stroke="#06B6D4" strokeOpacity="0.7" strokeWidth="1.5" />
            <circle cx="100" cy="178" r="7" fill="url(#rfEye)">
              <animate attributeName="opacity" values="0.6;1;0.6" dur="2.4s" repeatCount="indefinite" />
            </circle>
          </g>

          {/* Head (tracks cursor) */}
          <g ref={headRef} style={{ transformOrigin: '100px 95px', transition: 'transform 0.05s linear' }}>
            <line x1="100" y1="34" x2="100" y2="16" stroke="#A78BFA" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="100" cy="13" r="5" fill="url(#rfEye)">
              <animate attributeName="r" values="4;6;4" dur="1.8s" repeatCount="indefinite" />
            </circle>

            <circle cx="100" cy="92" r="58" fill="url(#rfHelmet)" stroke="#7C3AED" strokeOpacity="0.7" strokeWidth="2.5" />
            <ellipse cx="100" cy="92" rx="44" ry="40" fill="url(#rfVisor)" stroke="#06B6D4" strokeOpacity="0.5" strokeWidth="1.5" />
            <ellipse cx="84" cy="74" rx="16" ry="10" fill="#ffffff" opacity="0.10" transform="rotate(-25 84 74)" />

            <g>
              <circle cx="84" cy="92" r="10" fill="#05080f" />
              <circle cx="116" cy="92" r="10" fill="#05080f" />
              <circle ref={leftPupilRef} cx="84" cy="92" r="5.5" fill="url(#rfEye)" style={{ transition: 'transform 0.05s linear' }}>
                <animate attributeName="opacity" values="0.85;1;0.85" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle ref={rightPupilRef} cx="116" cy="92" r="5.5" fill="url(#rfEye)" style={{ transition: 'transform 0.05s linear' }}>
                <animate attributeName="opacity" values="0.85;1;0.85" dur="2s" repeatCount="indefinite" />
              </circle>
            </g>

            <rect x="36" y="84" width="10" height="20" rx="4" fill="#1b1b3a" stroke="#7C3AED" strokeOpacity="0.5" strokeWidth="1.2" />
            <rect x="154" y="84" width="10" height="20" rx="4" fill="#1b1b3a" stroke="#7C3AED" strokeOpacity="0.5" strokeWidth="1.2" />
          </g>
        </svg>
      </div>
    </div>
  );
}
