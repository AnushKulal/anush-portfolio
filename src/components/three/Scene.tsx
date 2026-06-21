'use client';

import { useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import FloatingCharacter from './FloatingCharacter';
import ParticleField from './ParticleField';

function CameraController({ mousePosition }: { mousePosition: React.RefObject<{ x: number; y: number }> }) {
  const { camera } = useThree();

  useFrame(() => {
    if (!mousePosition.current) return;
    const targetX = mousePosition.current.x * 0.5;
    const targetY = mousePosition.current.y * 0.3;
    camera.position.x += (targetX - camera.position.x) * 0.05;
    camera.position.y += (targetY - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function Lights() {
  const pointLightBlue = useRef<THREE.PointLight>(null!);
  const pointLightPurple = useRef<THREE.PointLight>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (pointLightBlue.current) {
      pointLightBlue.current.position.x = Math.sin(t * 0.5) * 5;
      pointLightBlue.current.position.z = Math.cos(t * 0.5) * 3;
    }
    if (pointLightPurple.current) {
      pointLightPurple.current.position.x = -Math.sin(t * 0.4) * 5;
      pointLightPurple.current.position.z = -Math.cos(t * 0.4) * 3;
    }
  });

  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight ref={pointLightBlue} color="#3B82F6" intensity={3} position={[5, 3, 2]} distance={15} />
      <pointLight ref={pointLightPurple} color="#8B5CF6" intensity={2} position={[-5, -2, 2]} distance={12} />
      <pointLight color="#06B6D4" intensity={1} position={[0, 5, -3]} distance={10} />
    </>
  );
}

interface SceneProps {
  mousePosition: React.RefObject<{ x: number; y: number }>;
}

function SceneContent({ mousePosition }: SceneProps) {
  return (
    <>
      <CameraController mousePosition={mousePosition} />
      <Lights />

      {/* Stars background */}
      <Stars
        radius={80}
        depth={60}
        count={3000}
        factor={3}
        saturation={0.8}
        fade
        speed={0.5}
      />

      {/* Particle field */}
      <Suspense fallback={null}>
        <ParticleField />
      </Suspense>

      {/* Floating hologram character */}
      <Suspense fallback={null}>
        <FloatingCharacter />
      </Suspense>

      {/* Post-processing */}
      <EffectComposer>
        <Bloom
          intensity={0.8}
          luminanceThreshold={0.1}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
      </EffectComposer>
    </>
  );
}

export default function Scene({ mousePosition }: SceneProps) {
  return (
    <Canvas
      style={{ position: 'absolute', inset: 0 }}
      camera={{ position: [0, 0, 6], fov: 75, near: 0.1, far: 200 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      dpr={[1, 2]}
    >
      <SceneContent mousePosition={mousePosition} />
    </Canvas>
  );
}
