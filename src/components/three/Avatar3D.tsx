'use client';

import { Suspense, useRef, useEffect, useState, Component, ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import Image from 'next/image';
import { AVATAR_URL } from '@/lib/avatar';
import { isWebGLAvailable } from '@/lib/webgl';

// Shared, smoothed pointer target (-1..1). Updated on mousemove, read in useFrame.
const pointer = { x: 0, y: 0 };

function AvatarModel() {
  const { scene } = useGLTF(AVATAR_URL);
  const groupRef = useRef<THREE.Group>(null!);

  // Bones we steer toward the cursor.
  const bones = useRef<{ head?: THREE.Object3D; neck?: THREE.Object3D; leftEye?: THREE.Object3D; rightEye?: THREE.Object3D; spine?: THREE.Object3D }>({});
  const scrollRot = useRef(0);
  const smooth = useRef({ x: 0, y: 0 });

  useEffect(() => {
    scene.traverse((o) => {
      o.frustumCulled = false;
      if (o.name === 'Head') bones.current.head = o;
      else if (o.name === 'Neck') bones.current.neck = o;
      else if (o.name === 'LeftEye') bones.current.leftEye = o;
      else if (o.name === 'RightEye') bones.current.rightEye = o;
      else if (o.name === 'Spine2') bones.current.spine = o;
      if ((o as THREE.Mesh).isMesh) (o as THREE.Mesh).castShadow = false;
    });
  }, [scene]);

  useEffect(() => {
    const onScroll = () => { scrollRot.current = window.scrollY; };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useFrame(() => {
    // smooth the pointer for buttery motion
    smooth.current.x += (pointer.x - smooth.current.x) * 0.08;
    smooth.current.y += (pointer.y - smooth.current.y) * 0.08;
    const { x, y } = smooth.current;

    const { head, neck, leftEye, rightEye } = bones.current;
    if (head) {
      head.rotation.y = x * 0.5;
      head.rotation.x = y * 0.35;
    }
    if (neck) {
      neck.rotation.y = x * 0.25;
      neck.rotation.x = y * 0.15;
    }
    if (leftEye && rightEye) {
      // eyes lead the head slightly
      leftEye.rotation.y = rightEye.rotation.y = x * 0.4;
      leftEye.rotation.x = rightEye.rotation.x = y * 0.3;
    }

    if (groupRef.current) {
      // gentle idle sway + body turns toward cursor + rotates as you scroll
      const targetY = x * 0.25 + Math.sin(scrollRot.current * 0.0016);
      groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.06;
    }
  });

  // Offset so the head/upper-body sits in frame.
  return (
    <group ref={groupRef} position={[0, -1.5, 0]}>
      <primitive object={scene} />
    </group>
  );
}

function Loader() {
  return (
    <mesh>
      <sphereGeometry args={[0.25, 16, 16]} />
      <meshBasicMaterial color="#A78BFA" wireframe />
    </mesh>
  );
}

/** Falls back to the photo if the GLB fails to load. */
class AvatarErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

function PhotoFallback() {
  return (
    <div style={{
      width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden',
      border: '3px solid rgba(124,58,237,0.6)',
      boxShadow: '0 0 30px rgba(124,58,237,0.5)',
    }}>
      <Image src="/anush.jpeg" alt="Anush Kulal M" width={300} height={300} unoptimized
        style={{ objectFit: 'cover', objectPosition: 'center 18%', width: '100%', height: '100%' }} />
    </div>
  );
}

export default function Avatar3D() {
  const [ready, setReady] = useState<boolean | null>(null);

  useEffect(() => {
    setReady(isWebGLAvailable());
    const onMove = (e: MouseEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  if (ready === null) return null;
  if (!ready) return <PhotoFallback />;

  return (
    <AvatarErrorBoundary fallback={<PhotoFallback />}>
      <Canvas
        camera={{ position: [0, 0.05, 0.85], fov: 30 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.75]}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[2, 3, 2]} intensity={1.6} color="#ffffff" />
        <directionalLight position={[-2, 1, 1]} intensity={1.2} color="#A78BFA" />
        <pointLight position={[0, -1, 1]} intensity={0.8} color="#06B6D4" />
        <Suspense fallback={<Loader />}>
          <AvatarModel />
        </Suspense>
      </Canvas>
    </AvatarErrorBoundary>
  );
}

useGLTF.preload(AVATAR_URL);
