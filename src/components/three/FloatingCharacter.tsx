'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function OrbitParticles({ count = 80, radius = 2.2 }: { count?: number; radius?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null!);

  const data = useMemo(() => {
    const angles = Array.from({ length: count }, (_, i) => (i / count) * Math.PI * 2);
    const offsets = Array.from({ length: count }, () => Math.random() * Math.PI * 2);
    const speeds = Array.from({ length: count }, () => 0.3 + Math.random() * 0.5);
    const radii = Array.from({ length: count }, () => radius + (Math.random() - 0.5) * 0.8);
    const yOffsets = Array.from({ length: count }, () => (Math.random() - 0.5) * 1.5);
    return { angles, offsets, speeds, radii, yOffsets };
  }, [count, radius]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    const dummy = new THREE.Object3D();

    for (let i = 0; i < count; i++) {
      const angle = data.angles[i] + t * data.speeds[i];
      dummy.position.set(
        Math.cos(angle + data.offsets[i]) * data.radii[i],
        data.yOffsets[i] + Math.sin(t * 0.5 + i) * 0.3,
        Math.sin(angle + data.offsets[i]) * data.radii[i]
      );
      const s = 0.03 + Math.sin(t * 2 + i) * 0.01;
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 4, 4]} />
      <meshBasicMaterial color="#60A5FA" transparent opacity={0.8} />
    </instancedMesh>
  );
}

function HologramCard() {
  const groupRef = useRef<THREE.Group>(null!);
  const innerRef = useRef<THREE.Mesh>(null!);
  const wireRef = useRef<THREE.Mesh>(null!);
  const glowRef = useRef<THREE.PointLight>(null!);
  const glowRef2 = useRef<THREE.PointLight>(null!);

  const holographicMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        colorA: { value: new THREE.Color('#3B82F6') },
        colorB: { value: new THREE.Color('#8B5CF6') },
        colorC: { value: new THREE.Color('#06B6D4') },
      },
      vertexShader: `
        varying vec3 vPosition;
        varying vec3 vNormal;
        varying vec2 vUv;
        uniform float time;

        void main() {
          vPosition = position;
          vNormal = normal;
          vUv = uv;
          vec3 pos = position;
          pos.y += sin(pos.x * 3.0 + time) * 0.02;
          pos.x += cos(pos.y * 3.0 + time * 0.8) * 0.02;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 colorA;
        uniform vec3 colorB;
        uniform vec3 colorC;
        varying vec3 vPosition;
        varying vec3 vNormal;
        varying vec2 vUv;

        void main() {
          float t = sin(time * 0.5) * 0.5 + 0.5;
          float t2 = sin(time * 0.3 + 1.0) * 0.5 + 0.5;

          // Iridescent color mixing
          vec3 col = mix(colorA, colorB, t);
          col = mix(col, colorC, t2 * 0.5);

          // Scan lines
          float scanLine = sin(vUv.y * 40.0 + time * 2.0) * 0.5 + 0.5;
          col = mix(col, col * 1.3, scanLine * 0.15);

          // Edge glow
          float edgeDist = min(min(vUv.x, 1.0 - vUv.x), min(vUv.y, 1.0 - vUv.y));
          float edgeGlow = 1.0 - smoothstep(0.0, 0.08, edgeDist);
          col += mix(colorA, colorB, t) * edgeGlow * 2.0;

          // Fresnel
          vec3 viewDir = normalize(vec3(0.0, 0.0, 1.0) - vPosition);
          float fresnel = pow(1.0 - max(dot(vNormal, viewDir), 0.0), 3.0);
          col += colorC * fresnel * 0.5;

          float alpha = 0.75 + edgeGlow * 0.25 + fresnel * 0.2;
          gl_FragColor = vec4(col, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    holographicMaterial.uniforms.time.value = t;

    if (groupRef.current) {
      // Float
      groupRef.current.position.y = Math.sin(t * 0.8) * 0.3;
      // Gentle rotation
      groupRef.current.rotation.y = Math.sin(t * 0.4) * 0.15;
      groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.08;
    }

    if (innerRef.current) {
      // Breathing scale
      const breathe = 1 + Math.sin(t * 1.5) * 0.03;
      innerRef.current.scale.setScalar(breathe);
    }

    if (wireRef.current) {
      wireRef.current.rotation.y = t * 0.5;
      wireRef.current.rotation.z = t * 0.3;
    }

    if (glowRef.current) {
      glowRef.current.intensity = 2 + Math.sin(t * 2) * 0.5;
      glowRef.current.position.x = Math.sin(t * 0.7) * 1.5;
      glowRef.current.position.y = Math.cos(t * 0.5) * 1.0;
    }

    if (glowRef2.current) {
      glowRef2.current.intensity = 1.5 + Math.cos(t * 1.8) * 0.5;
      glowRef2.current.position.x = -Math.sin(t * 0.6) * 1.5;
      glowRef2.current.position.y = -Math.cos(t * 0.7) * 1.0;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main holographic box */}
      <mesh ref={innerRef} material={holographicMaterial}>
        <boxGeometry args={[2.0, 2.8, 0.12]} />
      </mesh>

      {/* Wireframe overlay */}
      <mesh ref={wireRef}>
        <boxGeometry args={[2.05, 2.85, 0.13]} />
        <meshBasicMaterial
          color="#60A5FA"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Inner glow sphere */}
      <mesh>
        <sphereGeometry args={[0.9, 16, 16]} />
        <meshBasicMaterial
          color="#3B82F6"
          transparent
          opacity={0.05}
          wireframe={false}
        />
      </mesh>

      {/* Corner accent spheres */}
      {[
        [-1.05, 1.45, 0.07],
        [1.05, 1.45, 0.07],
        [-1.05, -1.45, 0.07],
        [1.05, -1.45, 0.07],
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshBasicMaterial color={i % 2 === 0 ? '#60A5FA' : '#A78BFA'} />
        </mesh>
      ))}

      {/* Dynamic point lights */}
      <pointLight ref={glowRef} color="#3B82F6" intensity={2} distance={8} />
      <pointLight ref={glowRef2} color="#8B5CF6" intensity={1.5} distance={6} />

      {/* Orbiting particles */}
      <OrbitParticles count={60} radius={2.2} />
    </group>
  );
}

export default function FloatingCharacter() {
  return <HologramCard />;
}
