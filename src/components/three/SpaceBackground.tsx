'use client';

import { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function StarField() {
  const meshRef = useRef<THREE.Points>(null!);

  const { positions, colors } = useMemo(() => {
    const count = 3000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 200;

      const rand = Math.random();
      if (rand < 0.33) {
        colors[i * 3] = 1; colors[i * 3 + 1] = 1; colors[i * 3 + 2] = 1;
      } else if (rand < 0.66) {
        colors[i * 3] = 0.6; colors[i * 3 + 1] = 0.7; colors[i * 3 + 2] = 1;
      } else {
        colors[i * 3] = 0.8; colors[i * 3 + 1] = 0.5; colors[i * 3 + 2] = 1;
      }
    }
    return { positions, colors };
  }, []);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.01;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.4}
        vertexColors
        sizeAttenuation
        transparent
        opacity={0.9}
      />
    </points>
  );
}

function NebulaGlow() {
  const mesh1Ref = useRef<THREE.Mesh>(null!);
  const mesh2Ref = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (mesh1Ref.current) {
      mesh1Ref.current.scale.setScalar(1 + Math.sin(t * 0.3) * 0.05);
      (mesh1Ref.current.material as THREE.MeshBasicMaterial).opacity =
        0.08 + Math.sin(t * 0.5) * 0.03;
    }
    if (mesh2Ref.current) {
      mesh2Ref.current.scale.setScalar(1 + Math.cos(t * 0.4) * 0.04);
      (mesh2Ref.current.material as THREE.MeshBasicMaterial).opacity =
        0.06 + Math.cos(t * 0.3) * 0.02;
    }
  });

  return (
    <>
      <mesh ref={mesh1Ref} position={[0, 2, -8]}>
        <sphereGeometry args={[6, 32, 32]} />
        <meshBasicMaterial
          color="#7C3AED"
          transparent
          opacity={0.08}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh ref={mesh2Ref} position={[-3, -1, -10]}>
        <sphereGeometry args={[5, 32, 32]} />
        <meshBasicMaterial
          color="#3B82F6"
          transparent
          opacity={0.06}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </>
  );
}

function PurpleArc() {
  const torusRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (torusRef.current) {
      const t = clock.getElapsedTime();
      (torusRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        0.5 + Math.sin(t * 0.5) * 0.3;
    }
  });

  return (
    <mesh ref={torusRef} position={[0, 5, -5]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[5, 0.06, 16, 100]} />
      <meshStandardMaterial
        color="#7C3AED"
        emissive="#A78BFA"
        emissiveIntensity={0.8}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

function ScrollReactiveGroup({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null!);
  const scrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollY.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += (scrollY.current * 0.0003 - groupRef.current.rotation.y) * 0.05;
    }
  });

  return <group ref={groupRef}>{children}</group>;
}

function SceneSetup() {
  const { gl } = useThree();
  useEffect(() => {
    gl.setClearColor(new THREE.Color('#030014'), 1);
  }, [gl]);
  return null;
}

export default function SpaceBackground() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60, near: 0.1, far: 500 }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        <SceneSetup />
        <ambientLight intensity={0.5} />
        <pointLight color="#7C3AED" intensity={2} position={[0, 5, 0]} />
        <ScrollReactiveGroup>
          <StarField />
          <NebulaGlow />
          <PurpleArc />
        </ScrollReactiveGroup>
      </Canvas>
    </div>
  );
}
