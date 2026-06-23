"use client";

import React, { useRef, useState, Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Procedural 3D Pipe Assembly (Acts as immediate, reliable fallback rendering or default visible model)
function PipeAssemblyMesh() {
  const groupRef = useRef<THREE.Group>(null);

  // Smooth automatic floating (gentle vertical bobbing) & slow auto-rotation
  useFrame((state) => {
    if (groupRef.current) {
      const elapsed = state.clock.getElapsedTime();
      groupRef.current.rotation.y = elapsed * 0.18;
      groupRef.current.rotation.x = Math.sin(elapsed * 0.4) * 0.06;
      groupRef.current.position.y = -0.15 + Math.sin(elapsed * 1.4) * 0.08;
    }
  });

  // Harmonious metallic material setup
  const metalMaterial = new THREE.MeshStandardMaterial({
    color: '#a0a0a0', // Bright silver-grey
    roughness: 0.15,
    metalness: 0.85,
  });

  const valveBodyMaterial = new THREE.MeshStandardMaterial({
    color: '#333333', // Contrast dark grey
    roughness: 0.25,
    metalness: 0.8,
  });

  const neonRedMaterial = new THREE.MeshBasicMaterial({
    color: '#DC143C', // Accent red branding
  });

  const redAccentMaterial = new THREE.MeshStandardMaterial({
    color: '#DC143C',
    roughness: 0.2,
    metalness: 0.8,
  });

  return (
    <group ref={groupRef}>
      {/* 1. Main horizontal pipe */}
      <mesh rotation={[0, 0, Math.PI / 2]} material={metalMaterial} position={[0, 0, 0]}>
        <cylinderGeometry args={[0.25, 0.25, 3.2, 32]} />
      </mesh>

      {/* 2. Connection Flanges (rings) */}
      <mesh rotation={[0, 0, Math.PI / 2]} material={metalMaterial} position={[-1.2, 0, 0]}>
        <cylinderGeometry args={[0.38, 0.38, 0.12, 32]} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]} material={metalMaterial} position={[1.2, 0, 0]}>
        <cylinderGeometry args={[0.38, 0.38, 0.12, 32]} />
      </mesh>

      {/* 3. Central Valve body */}
      <group position={[0, 0, 0]}>
        <mesh material={valveBodyMaterial}>
          <sphereGeometry args={[0.48, 32, 32]} />
        </mesh>

        {/* Valve neck stem */}
        <mesh position={[0, 0.6, 0]} material={metalMaterial}>
          <cylinderGeometry args={[0.1, 0.1, 0.5, 16]} />
        </mesh>

        {/* Valve Wheel hand ring */}
        <group position={[0, 0.85, 0]}>
          <mesh rotation={[Math.PI / 2, 0, 0]} material={redAccentMaterial}>
            <torusGeometry args={[0.42, 0.08, 16, 64]} />
          </mesh>
          {/* Wheel spokes */}
          <mesh material={redAccentMaterial}>
            <cylinderGeometry args={[0.03, 0.03, 0.8, 16]} />
          </mesh>
          <mesh rotation={[0, Math.PI / 2, 0]} material={redAccentMaterial}>
            <cylinderGeometry args={[0.03, 0.03, 0.8, 16]} />
          </mesh>
        </group>
      </group>

      {/* 4. Branch pipe going downwards */}
      <group position={[-0.6, -0.75, 0]}>
        <mesh material={metalMaterial}>
          <cylinderGeometry args={[0.16, 0.16, 1.5, 32]} />
        </mesh>
        <mesh position={[0, -0.7, 0]} material={metalMaterial}>
          <cylinderGeometry args={[0.26, 0.26, 0.1, 32]} />
        </mesh>
      </group>

      {/* Elbow connection for branch */}
      <mesh position={[-0.6, 0, 0]} material={metalMaterial}>
        <sphereGeometry args={[0.26, 32, 16]} />
      </mesh>

      {/* 5. Isometric support structural frame */}
      <group position={[0, -1.1, -0.4]}>
        <mesh material={valveBodyMaterial}>
          <boxGeometry args={[1.8, 0.08, 0.8]} />
        </mesh>
        <mesh position={[-0.8, -0.4, 0]} material={metalMaterial}>
          <cylinderGeometry args={[0.04, 0.04, 0.8, 8]} />
        </mesh>
        <mesh position={[0.8, -0.4, 0]} material={metalMaterial}>
          <cylinderGeometry args={[0.04, 0.04, 0.8, 8]} />
        </mesh>
      </group>

      {/* 6. Glowing Red Highlights/Hotspots attached specifically to visual nodes */}
      <group position={[0, 0.85, 0]}>
        <mesh scale={[1.8, 1.8, 1.8]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshBasicMaterial color="#DC143C" transparent opacity={0.3} />
        </mesh>
        <mesh material={neonRedMaterial}>
          <sphereGeometry args={[0.04, 16, 16]} />
        </mesh>
      </group>

      <group position={[-1.2, 0.4, 0]}>
        <mesh scale={[1.8, 1.8, 1.8]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshBasicMaterial color="#DC143C" transparent opacity={0.3} />
        </mesh>
        <mesh material={neonRedMaterial}>
          <sphereGeometry args={[0.04, 16, 16]} />
        </mesh>
      </group>
    </group>
  );
}

// Custom Grid component to render grid behind the model
function CustomGrid() {
  return (
    <gridHelper
      args={[10, 20, 0xDC143C, 0x333333]}
      position={[0, -1.6, 0]}
    />
  );
}

// Flat SVG/CSS isometric fall-back display
function StaticBlueprintFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/60 p-8 z-10">
      <svg className="w-4/5 max-w-[340px] aspect-square text-[#DC143C] opacity-40 animate-pulse" viewBox="0 0 200 200" fill="none" stroke="currentColor">
        <circle cx="100" cy="100" r="75" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="100" cy="100" r="45" strokeWidth="1.5" />
        <line x1="100" y1="15" x2="100" y2="185" strokeWidth="0.8" strokeDasharray="5 5" />
        <line x1="15" y1="100" x2="185" y2="100" strokeWidth="0.8" strokeDasharray="5 5" />
        <polygon points="40,60 160,60 180,100 160,140 40,140 20,100" strokeWidth="1.2" />
        <path d="M 60 60 L 140 140 M 60 140 L 140 60" strokeWidth="0.8" />
        <circle cx="100" cy="100" r="8" fill="#DC143C" />
      </svg>
    </div>
  );
}

export default function PipingCanvas() {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Shorter loading placeholder to maintain snappy response
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-[520px] border border-[#222222]/80 rounded-lg overflow-hidden bg-black flex items-center justify-center">
      {/* Background blueprint lines */}
      <div className="absolute inset-0 blueprint-grid-fine opacity-25 pointer-events-none" />

      {/* Red ambient layout glow */}
      <div className="absolute w-[300px] h-[300px] bg-[#DC143C]/5 rounded-full filter blur-[70px] pointer-events-none" />

      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black z-20 font-mono text-[#DC143C]">
          <div className="w-8 h-8 border-2 border-[#DC143C] border-t-transparent rounded-full animate-spin"></div>
          <span className="text-[10px] tracking-widest uppercase animate-pulse">Initializing CAD Render...</span>
        </div>
      )}

      {hasError ? (
        <StaticBlueprintFallback />
      ) : (
        <Suspense fallback={<StaticBlueprintFallback />}>
          <Canvas
            camera={{ position: [0, 1.2, 3.4], fov: 45 }}
            gl={{ antialias: true, alpha: false }}
            onCreated={({ gl }) => {
              gl.setClearColor('#000000', 1);
              setIsLoading(false);
            }}
            onError={() => setHasError(true)}
            style={{ pointerEvents: 'none', width: '100%', height: '100%' }} // Completely locks manual interaction
          >
            {/* Rich Lights Setup for High Definition Metallic reflection */}
            <ambientLight intensity={0.9} />
            <pointLight position={[6, 8, 6]} intensity={2.5} />
            <pointLight position={[-6, -6, -6]} intensity={0.6} />
            <directionalLight position={[0, 5, 2]} intensity={2.0} />
            <directionalLight position={[0, -5, -2]} intensity={0.5} />

            {/* Custom Rim lighting for outer contour highlights */}
            <directionalLight position={[4, 0, -4]} intensity={1.5} color="#ffffff" />
            <directionalLight position={[-4, 0, 4]} intensity={1.2} color="#DC143C" />

            <PipeAssemblyMesh />
            
            <CustomGrid />
          </Canvas>
        </Suspense>
      )}
    </div>
  );
}
