import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const ParticleSwarm = () => {
  const ref = useRef();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let ticking = false;
    const handleMouseMove = (event) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
          mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Optimized particle count for high frame rate
  const count = 1200;
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 12 * Math.cbrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      p[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      p[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      p[i * 3 + 2] = r * Math.cos(phi);
    }
    return p;
  }, [count]);

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta * 0.04;
      ref.current.rotation.y -= delta * 0.05;

      // Gentle mouse tilt
      ref.current.rotation.x += (mouse.current.y * 0.15 - ref.current.rotation.x) * 0.03;
      ref.current.rotation.y += (mouse.current.x * 0.15 - ref.current.rotation.y) * 0.03;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.035}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.65}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
};

const ThreeDBackground = () => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, pointerEvents: 'none', background: '#020202' }}>
      <Canvas 
        dpr={1} 
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ powerPreference: 'high-performance', antialias: false, stencil: false, depth: false }}
      >
        <ParticleSwarm />
      </Canvas>
    </div>
  );
};

export default ThreeDBackground;
