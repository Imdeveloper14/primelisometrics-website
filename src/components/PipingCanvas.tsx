"use client";

import React, { useRef, useState, Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Assembly: Circular Hatch 3D Model loaded dynamically
function HatchAssemblyMesh() {
  const groupRef = useRef<THREE.Group>(null);

  // Load GLTF model
  const { scene } = useGLTF('/models/circular_hatch.glb') as any;

  // Get model center and size
  const { center, size } = React.useMemo(() => {
    scene.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(scene);
    const centerVec = new THREE.Vector3();
    box.getCenter(centerVec);
    const sizeVec = new THREE.Vector3();
    box.getSize(sizeVec);
    return { center: centerVec, size: sizeVec };
  }, [scene]);

  // Clone scene
  const clonedScene = React.useMemo(() => {
    return scene.clone();
  }, [scene]);

  // Materials definitions
  const materials = React.useMemo(() => ({
    steel: new THREE.MeshStandardMaterial({ color: '#c0c0c0', roughness: 0.15, metalness: 0.85 }),
    darkIron: new THREE.MeshStandardMaterial({ color: '#555555', roughness: 0.3, metalness: 0.75 }),
    crimson: new THREE.MeshStandardMaterial({ color: '#DC143C', roughness: 0.2, metalness: 0.8 }),
  }), []);

  // Apply materials
  useEffect(() => {
    clonedScene.traverse((child: any) => {
      if (child.isMesh) {
        if (child.material) {
          const name = (child.name || '').toLowerCase();
          if (name.includes('red') || name.includes('joint') || name.includes('handle') || name.includes('bolt') || name.includes('accent')) {
            child.material = materials.crimson;
          } else if (name.includes('gear') || name.includes('pinion') || name.includes('bracket') || name.includes('plate')) {
            child.material = materials.darkIron;
          } else {
            child.material = materials.steel;
          }
        }
      }
    });
  }, [clonedScene, materials]);

  // Smooth automatic floating & slow auto-rotation
  useFrame((state) => {
    if (groupRef.current) {
      const elapsed = state.clock.getElapsedTime();
      groupRef.current.rotation.y = elapsed * 0.18;
      groupRef.current.rotation.x = Math.sin(elapsed * 0.4) * 0.06;
      groupRef.current.position.y = -0.1 + Math.sin(elapsed * 1.4) * 0.06;
    }
  });

  const scaleFactor = React.useMemo(() => {
    const maxHoriz = Math.max(size.x, size.z);
    return 1.8 / (maxHoriz || 1);
  }, [size]);

  return (
    <group ref={groupRef}>
      <group scale={scaleFactor} position={center.clone().multiplyScalar(-scaleFactor)}>
        <primitive object={clonedScene} />
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

            <HatchAssemblyMesh />
            
            <CustomGrid />
          </Canvas>
        </Suspense>
      )}
    </div>
  );
}
