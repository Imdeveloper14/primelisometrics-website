"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Grid, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Materials definitions (optimized for maximum visibility, bright metallic values, and bold highlights)
const materials = {
  steel: new THREE.MeshStandardMaterial({ color: '#c0c0c0', roughness: 0.15, metalness: 0.85 }), // Bright steel
  copper: new THREE.MeshStandardMaterial({ color: '#d08050', roughness: 0.2, metalness: 0.8 }), // Bright copper
  gold: new THREE.MeshStandardMaterial({ color: '#e0c060', roughness: 0.15, metalness: 0.9 }), // Bright gold/brass
  darkIron: new THREE.MeshStandardMaterial({ color: '#555555', roughness: 0.3, metalness: 0.75 }), // Medium grey contrast
  crimson: new THREE.MeshStandardMaterial({ color: '#DC143C', roughness: 0.2, metalness: 0.8 }), // Strong accent #DC143C
  structureGrey: new THREE.MeshStandardMaterial({ color: '#dcdcdc', roughness: 0.2, metalness: 0.85 }), // Very light structural steel
};

// Assembly 1: Marine Piping Loop with Filter Vessel (Large & Highly Visible)
function MarinePipingAssembly({ rotate }: { rotate: boolean }) {
  const ref = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  useFrame((state) => {
    if (ref.current) {
      if (rotate) {
        ref.current.rotation.y = state.clock.getElapsedTime() * 0.12;
        ref.current.rotation.x = 0.1;
      } else {
        ref.current.rotation.y = -0.5;
        ref.current.rotation.x = 0.2;
      }
    }
  });

  // Approximate dimensions when not exploded
  const size = { x: 1.6, y: 2.2, z: 0.7 };
  const center = { x: 0, y: -0.3, z: 0 };

  const scaleFactor = React.useMemo(() => {
    const maxHoriz = Math.max(size.x, size.z);
    const sizeY = size.y;
    const scaleX = (viewport.width * 0.85) / maxHoriz;
    const scaleY = (viewport.height * 0.85) / sizeY;
    return Math.min(scaleX, scaleY);
  }, [viewport.width, viewport.height]);

  return (
    <group ref={ref}>
      <group scale={scaleFactor} position={[0, -center.y * scaleFactor, 0]}>
        {/* Central filter vessel (cylinder + domes) */}
        <group position={[0, 0, 0]}>
          <mesh position={[0, 0, 0]} material={materials.darkIron}>
            <cylinderGeometry args={[0.45, 0.45, 1.6, 32]} />
          </mesh>
          {/* Top Dome */}
          <mesh position={[0, 0.8, 0]} material={materials.crimson}>
            <sphereGeometry args={[0.45, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          </mesh>
          <mesh position={[0, -0.8, 0]} material={materials.darkIron}>
            <sphereGeometry args={[0.45, 32, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2]} />
          </mesh>
        </group>
        
        {/* Vessel support structure legs */}
        <group position={[0, 0, 0]}>
          {[-0.35, 0.35].map((x, i) => (
            [-0.35, 0.35].map((z, j) => (
              <mesh key={`${i}-${j}`} position={[x, -1.1, z]} material={materials.steel}>
                <cylinderGeometry args={[0.04, 0.04, 0.6, 8]} />
              </mesh>
            ))
          ))}
        </group>

        {/* Piping networks branching out */}
        {/* Left piping */}
        <group position={[-0.4, -0.3, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <mesh material={materials.copper}>
            <cylinderGeometry args={[0.12, 0.12, 0.8, 16]} />
          </mesh>
          <mesh position={[0, 0.3, 0]} material={materials.steel}>
            <cylinderGeometry args={[0.18, 0.18, 0.06, 16]} />
          </mesh>
        </group>

        {/* Right piping */}
        <group position={[0.4, 0.3, 0]} rotation={[0, 0, Math.PI / 2]}>
          <mesh material={materials.steel}>
            <cylinderGeometry args={[0.12, 0.12, 0.8, 16]} />
          </mesh>
          <mesh position={[0, 0.3, 0]} material={materials.crimson}>
            <cylinderGeometry args={[0.18, 0.18, 0.06, 16]} />
          </mesh>
        </group>

        {/* Piping Loop elbow */}
        <group position={[0.7, -0.1, 0]} rotation={[0, 0, 0]}>
          <mesh material={materials.steel}>
            <torusGeometry args={[0.3, 0.1, 16, 32, Math.PI / 2]} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

// Assembly 2: Industrial Systems - Storage Tank Skid/Unit
function IndustrialAssembly({ rotate }: { rotate: boolean }) {
  const ref = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  useFrame((state) => {
    if (ref.current) {
      if (rotate) {
        ref.current.rotation.y = state.clock.getElapsedTime() * 0.1;
        ref.current.rotation.x = 0.1;
      } else {
        ref.current.rotation.y = 0.6;
        ref.current.rotation.x = 0.2;
      }
    }
  });

  // Approximate dimensions when not exploded
  const size = { x: 2.2, y: 2.3, z: 1.4 };
  const center = { x: 0, y: 0.1, z: 0 };

  const scaleFactor = React.useMemo(() => {
    const maxHoriz = Math.max(size.x, size.z);
    const sizeY = size.y;
    const scaleX = (viewport.width * 0.85) / maxHoriz;
    const scaleY = (viewport.height * 0.85) / sizeY;
    return Math.min(scaleX, scaleY);
  }, [viewport.width, viewport.height]);

  return (
    <group ref={ref}>
      <group scale={scaleFactor} position={[0, -center.y * scaleFactor, 0]}>
        {/* Platform Base */}
        <mesh position={[0, -1.0, 0]} material={materials.darkIron}>
          <boxGeometry args={[2.2, 0.08, 1.4]} />
        </mesh>

        {/* Main Storage Tank */}
        <group position={[-0.5, 0, 0]}>
          <mesh material={materials.steel}>
            <cylinderGeometry args={[0.5, 0.5, 1.5, 32]} />
          </mesh>
          {/* Tank Cap */}
          <mesh position={[0, 0.75, 0]} material={materials.crimson}>
            <sphereGeometry args={[0.5, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          </mesh>
        </group>

        {/* Auxiliary process column */}
        <group position={[0.5, -0.1, 0.2]}>
          <mesh material={materials.copper}>
            <cylinderGeometry args={[0.2, 0.2, 1.3, 24]} />
          </mesh>
          <mesh position={[0, 0.65, 0]} material={materials.steel}>
            <cylinderGeometry args={[0.25, 0.25, 0.08, 24]} />
          </mesh>
        </group>

        {/* Interconnecting Process Pipe */}
        <group position={[0, 0.4, 0.1]} rotation={[0, 0, Math.PI / 2]}>
          <mesh material={materials.steel}>
            <cylinderGeometry args={[0.06, 0.06, 1.0, 16]} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

// Assembly 3: Marine Structure GLB Model Loader
function StructuralAssembly({ rotate }: { rotate: boolean }) {
  const ref = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  
  // Load GLTF model
  const { scene } = useGLTF('/models/marine_structure.glb') as any;
  
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

  // Find all meshes and apply premium materials
  useEffect(() => {
    clonedScene.traverse((child: any) => {
      if (child.isMesh) {
        if (child.material) {
          const name = (child.name || '').toLowerCase();
          if (name.includes('gusset') || name.includes('joint') || name.includes('plate') || name.includes('red') || name.includes('pin')) {
            child.material = materials.crimson;
          } else {
            child.material = materials.structureGrey;
          }
        }
      }
    });
  }, [clonedScene]);

  useFrame((state) => {
    // Rotation of the whole assembly
    if (ref.current) {
      if (rotate) {
        ref.current.rotation.y = state.clock.getElapsedTime() * 0.08;
        ref.current.rotation.x = 0.15;
      } else {
        ref.current.rotation.y = 0.45;
        ref.current.rotation.x = 0.25;
      }
    }
  });

  // Calculate dynamic scale factor
  const scaleFactor = React.useMemo(() => {
    const maxHoriz = Math.max(size.x, size.z);
    const sizeY = size.y;
    const scaleX = (viewport.width * 0.85) / (maxHoriz || 1);
    const scaleY = (viewport.height * 0.85) / (sizeY || 1);
    return Math.min(scaleX, scaleY);
  }, [viewport.width, viewport.height, size]);

  return (
    <group ref={ref}>
      <group scale={scaleFactor} position={center.clone().multiplyScalar(-scaleFactor)}>
        <primitive object={clonedScene} />
      </group>
    </group>
  );
}

// Assembly 4: Exploded Marine Deck Component (Circular Hatch)
function MechanicalAssembly({ rotate }: { rotate: boolean }) {
  const ref = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  
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
  
  // Find all meshes and apply premium materials
  useEffect(() => {
    clonedScene.traverse((child: any) => {
      if (child.isMesh) {
        if (child.material) {
          const name = (child.name || '').toLowerCase();
          // Apply contrasting premium materials to parts
          if (name.includes('seal') || name.includes('gasket') || name.includes('rubber') || name.includes('handle') || name.includes('wheel') || name.includes('latch')) {
            child.material = materials.crimson;
          } else {
            child.material = materials.steel;
          }
        }
      }
    });
  }, [clonedScene]);

  useFrame((state) => {
    // Rotation of the whole assembly
    if (ref.current) {
      if (rotate) {
        ref.current.rotation.y = state.clock.getElapsedTime() * 0.1;
        ref.current.rotation.x = 0.35; // default tilt while rotating
      } else {
        // A nice, clear perspective angle when static
        ref.current.rotation.y = -0.45; // slightly turned to the side
        ref.current.rotation.x = 0.55; // tilted forward so we can see the top cover/wheel clearly
      }
    }
  });

  // Calculate dynamic scale factor
  const scaleFactor = React.useMemo(() => {
    const maxHoriz = Math.max(size.x, size.z);
    const sizeY = size.y;
    const scaleX = (viewport.width * 0.85) / (maxHoriz || 1);
    const scaleY = (viewport.height * 0.85) / (sizeY || 1);
    return Math.min(scaleX, scaleY);
  }, [viewport.width, viewport.height, size]);

  return (
    <group ref={ref}>
      <group scale={scaleFactor} position={center.clone().multiplyScalar(-scaleFactor)}>
        <primitive object={clonedScene} />
      </group>
    </group>
  );
}

export default function ThreeShowcase() {
  const [activeCategory, setActiveCategory] = useState<'marine' | 'industrial' | 'structural' | 'mechanical'>('marine');
  const [autoRotate, setAutoRotate] = useState<boolean>(false);

  const categories = [
    { id: 'marine', name: 'Marine Piping' },
    { id: 'industrial', name: 'Industrial Systems' },
    { id: 'structural', name: 'Marine Structure' },
    { id: 'mechanical', name: 'Circular Hatch' },
  ] as const;

  return (
    <section id="three-showcase" className="relative py-20 bg-gradient-to-b from-black to-background-alt border-y border-[#151515]">
      {/* Background design elements */}
      <div className="absolute inset-0 blueprint-grid opacity-30 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-[11px] font-mono tracking-[0.25em] text-accent uppercase font-semibold block mb-2">Interactive 3D Showcase</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">Technical Model Viewer</h2>
          <p className="text-sm md:text-base text-gray-400 max-w-xl mx-auto">
            Interact with our CAD rendering engine. Rotate, zoom, and inspect complex models to analyze system layouts.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
              }}
              className={`px-4 py-2 text-xs md:text-sm font-semibold border rounded transition-all duration-300 uppercase tracking-widest cursor-pointer ${
                activeCategory === cat.id
                  ? 'border-accent bg-accent/10 text-white shadow-[0_0_15px_rgba(220,20,60,0.2)]'
                  : 'border-[#222222] bg-black/40 text-gray-400 hover:text-white hover:border-gray-500'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Canvas & Controls Container */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-stretch">
          
          {/* Controls Panel (Left side on large screens) */}
          <div className="lg:col-span-1 bg-black/50 border border-[#222222] p-6 rounded-lg flex flex-col justify-between backdrop-blur-md">
            <div>
              <h3 className="font-mono text-xs text-accent uppercase tracking-wider mb-4 border-b border-[#222222] pb-2 font-bold">
                Assembly Controls
              </h3>
              
              <div className="flex flex-col gap-5">
                {/* Auto Rotate Control */}
                <div>
                  <span className="block text-[10px] font-mono text-gray-400 uppercase tracking-wider mb-2">Rotation Type</span>
                  <button
                    onClick={() => setAutoRotate(!autoRotate)}
                    className="w-full py-2 bg-black/60 border border-[#333333] hover:border-accent text-white text-xs font-mono uppercase tracking-widest rounded transition-all cursor-pointer"
                  >
                    {autoRotate ? '⏸ PAUSE ROTATION' : '▶ AUTO ROTATE'}
                  </button>
                </div>

                {/* Model Info Specs */}
                <div className="bg-black/60 p-4 border border-[#222222] rounded font-mono text-[9px] text-gray-400 leading-relaxed flex flex-col gap-2">
                  <div className="font-semibold text-white uppercase text-[10px]">Model Metadata</div>
                  <div>FILE_NAME: {activeCategory}_assembly.stp</div>
                  <div>POLY_COUNT: {activeCategory === 'marine' ? '12,500' : activeCategory === 'industrial' ? '8,200' : activeCategory === 'structural' ? '15,600' : '22,400'} tris</div>
                  <div>DRAFT_DATE: 2026.06.23</div>
                  <div>UNIT_SCALE: mm [1:1]</div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#222222] text-[9px] font-mono text-gray-500 leading-normal">
              SECURE CAD ACCESS AUTHORIZED FOR PRIMEL ISOMETRICS SYSTEM COMPLIANCE
            </div>
          </div>

          {/* Model Canvas (Right side) */}
          <div className="lg:col-span-3 h-[450px] lg:h-auto min-h-[450px] relative border border-[#222222] rounded-lg overflow-hidden bg-black">
            {/* Fine Blueprint grid */}
            <div className="absolute inset-0 blueprint-grid-fine opacity-35 pointer-events-none" />

            {/* Live Model Canvas */}
            <Canvas camera={{ position: [0, 1.2, 3.2], fov: 45 }} gl={{ antialias: true, alpha: false }}>
              {/* Rich lighting system for bright reflections and deep depth */}
              <ambientLight intensity={0.8} />
              <pointLight position={[8, 10, 8]} intensity={2.2} />
              <pointLight position={[-8, -8, -8]} intensity={0.5} />
              <directionalLight position={[0, 6, 2]} intensity={2.0} />
              
              {/* Rim lighting setup */}
              <directionalLight position={[4, 0, -4]} intensity={1.5} color="#ffffff" />
              <directionalLight position={[-4, 0, 4]} intensity={1.0} color="#DC143C" />
              
              {activeCategory === 'marine' && <MarinePipingAssembly rotate={autoRotate} />}
              {activeCategory === 'industrial' && <IndustrialAssembly rotate={autoRotate} />}
              {activeCategory === 'structural' && <StructuralAssembly rotate={autoRotate} />}
              {activeCategory === 'mechanical' && (
                <MechanicalAssembly rotate={autoRotate} />
              )}

              <OrbitControls enableZoom={true} enablePan={true} maxDistance={6} minDistance={1.8} />
              
              <Grid
                position={[0, -1.4, 0]}
                args={[10, 10]}
                cellSize={0.5}
                cellThickness={0.5}
                cellColor="rgba(220, 20, 60, 0.15)"
                sectionSize={2.0}
                sectionThickness={0.8}
                sectionColor="rgba(220, 20, 60, 0.35)"
                fadeDistance={20}
                infiniteGrid
              />
            </Canvas>

            {/* Corner bracket overlay borders */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-accent/40 m-3" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-accent/40 m-3" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-accent/40 m-3" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-accent/40 m-3" />
          </div>

        </div>

      </div>
    </section>
  );
}
