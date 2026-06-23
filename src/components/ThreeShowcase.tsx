"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
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
function MarinePipingAssembly({ rotate, explodeFactor }: { rotate: boolean; explodeFactor: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (rotate && ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.12;
    }
  });

  const offset = explodeFactor * 0.8;

  return (
    <group ref={ref} scale={1.3} position={[0, -0.2, 0]}>
      {/* Central filter vessel (cylinder + domes) - moves slightly back/down */}
      <group position={[0, -offset * 0.2, 0]}>
        <mesh position={[0, 0, 0]} material={materials.darkIron}>
          <cylinderGeometry args={[0.45, 0.45, 1.6, 32]} />
        </mesh>
        {/* Top Dome - explodes upward */}
        <mesh position={[0, 0.8 + offset * 0.6, 0]} material={materials.crimson}>
          <sphereGeometry args={[0.45, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        </mesh>
        <mesh position={[0, -0.8, 0]} material={materials.darkIron}>
          <sphereGeometry args={[0.45, 32, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2]} />
        </mesh>
      </group>
      
      {/* Vessel support structure legs - moves downward */}
      <group position={[0, -offset * 0.5, 0]}>
        {[-0.35, 0.35].map((x, i) => (
          [-0.35, 0.35].map((z, j) => (
            <mesh key={`${i}-${j}`} position={[x, -1.1, z]} material={materials.steel}>
              <cylinderGeometry args={[0.04, 0.04, 0.6, 8]} />
            </mesh>
          ))
        ))}
      </group>

      {/* Piping networks branching out - left/right explosion */}
      {/* Left piping moves left */}
      <group position={[-0.4 - offset, -0.3, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <mesh material={materials.copper}>
          <cylinderGeometry args={[0.12, 0.12, 0.8, 16]} />
        </mesh>
        <mesh position={[0, 0.3, 0]} material={materials.steel}>
          <cylinderGeometry args={[0.18, 0.18, 0.06, 16]} />
        </mesh>
      </group>

      {/* Right piping moves right */}
      <group position={[0.4 + offset, 0.3, 0]} rotation={[0, 0, Math.PI / 2]}>
        <mesh material={materials.steel}>
          <cylinderGeometry args={[0.12, 0.12, 0.8, 16]} />
        </mesh>
        <mesh position={[0, 0.3, 0]} material={materials.crimson}>
          <cylinderGeometry args={[0.18, 0.18, 0.06, 16]} />
        </mesh>
      </group>

      {/* Piping Loop elbow - moves forward and right */}
      <group position={[0.7 + offset * 1.2, -0.1, offset * 0.5]} rotation={[0, 0, 0]}>
        <mesh material={materials.steel}>
          <torusGeometry args={[0.3, 0.1, 16, 32, Math.PI / 2]} />
        </mesh>
      </group>
    </group>
  );
}

// Assembly 2: Industrial Systems - Storage Tank Skid/Unit
function IndustrialAssembly({ rotate, explodeFactor }: { rotate: boolean; explodeFactor: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (rotate && ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  const offset = explodeFactor * 0.8;

  return (
    <group ref={ref} scale={1.2} position={[0, -0.2, 0]}>
      {/* Platform Base - moves downward */}
      <mesh position={[0, -1.0 - offset * 0.4, 0]} material={materials.darkIron}>
        <boxGeometry args={[2.2, 0.08, 1.4]} />
      </mesh>

      {/* Main Storage Tank - moves left */}
      <group position={[-0.5 - offset * 0.8, 0, 0]}>
        <mesh material={materials.steel}>
          <cylinderGeometry args={[0.5, 0.5, 1.5, 32]} />
        </mesh>
        {/* Tank Cap - explodes upward relative to tank */}
        <mesh position={[0, 0.75 + offset * 0.5, 0]} material={materials.crimson}>
          <sphereGeometry args={[0.5, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        </mesh>
      </group>

      {/* Auxiliary process column - moves right */}
      <group position={[0.5 + offset * 0.8, -0.1, 0.2]}>
        <mesh material={materials.copper}>
          <cylinderGeometry args={[0.2, 0.2, 1.3, 24]} />
        </mesh>
        <mesh position={[0, 0.65 + offset * 0.5, 0]} material={materials.steel}>
          <cylinderGeometry args={[0.25, 0.25, 0.08, 24]} />
        </mesh>
      </group>

      {/* Interconnecting Process Pipe - explodes upward/forward */}
      <group position={[0, 0.4 + offset * 0.9, 0.1 + offset * 0.3]} rotation={[0, 0, Math.PI / 2]}>
        <mesh material={materials.steel}>
          <cylinderGeometry args={[0.06, 0.06, 1.0, 16]} />
        </mesh>
      </group>
    </group>
  );
}

// Assembly 3: Structural Engineering Frame & Connection Joints
function StructuralAssembly({ rotate, explodeFactor }: { rotate: boolean; explodeFactor: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (rotate && ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.08;
    }
  });

  const offset = explodeFactor * 0.8;

  const members = [
    // Bottom Horizontal Chord - moves downward
    { start: [-1.4, -0.8, 0], end: [1.4, -0.8, 0], dirOffset: [0, -1, 0] },
    // Top Horizontal Chord - moves upward
    { start: [-1.0, 0.6, 0], end: [1.0, 0.6, 0], dirOffset: [0, 1, 0] },
    // Vertical Beams - moves outwards
    { start: [-1.0, -0.8, 0], end: [-1.0, 0.6, 0], dirOffset: [-1, 0, 0] },
    { start: [0, -0.8, 0], end: [0, 0.6, 0], dirOffset: [0, 0.2, 1] },
    { start: [1.0, -0.8, 0], end: [1.0, 0.6, 0], dirOffset: [1, 0, 0] },
    // Diagonal structural braces - moves outward diagonally
    { start: [-1.4, -0.8, 0], end: [-1.0, 0.6, 0], dirOffset: [-0.6, 0.5, 0] },
    { start: [-1.0, 0.6, 0], end: [0, -0.8, 0], dirOffset: [-0.3, -0.5, 0] },
    { start: [0, -0.8, 0], end: [1.0, 0.6, 0], dirOffset: [0.3, -0.5, 0] },
    { start: [1.0, 0.6, 0], end: [1.4, -0.8, 0], dirOffset: [0.6, 0.5, 0] }
  ];

  return (
    <group ref={ref} scale={1.2} position={[0, 0.1, 0]}>
      {members.map((member, i) => {
        const p1 = new THREE.Vector3(...member.start);
        const p2 = new THREE.Vector3(...member.end);
        const distance = p1.distanceTo(p2);
        
        // Base centered position
        const basePosition = p1.clone().add(p2).multiplyScalar(0.5);
        // Exploded position adjustment
        const position = new THREE.Vector3(
          basePosition.x + member.dirOffset[0] * offset,
          basePosition.y + member.dirOffset[1] * offset,
          basePosition.z + member.dirOffset[2] * offset
        );

        const direction = new THREE.Vector3().subVectors(p2, p1).normalize();
        const orientation = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);

        return (
          <mesh key={i} position={position} quaternion={orientation} material={materials.structureGrey}>
            <boxGeometry args={[0.07, distance, 0.07]} />
          </mesh>
        );
      })}

      {/* Red Highlight connection joint plates (Gussets) - explodes outward from center */}
      {[-1.0, 0, 1.0].map((x, idx) => {
        const xOffset = x * offset * 1.4;
        return (
          <group key={idx}>
            <mesh position={[x + xOffset, -0.8 - offset * 0.4, 0]} material={materials.crimson}>
              <boxGeometry args={[0.15, 0.15, 0.09]} />
            </mesh>
            <mesh position={[x + xOffset, 0.6 + offset * 0.4, 0]} material={materials.crimson}>
              <boxGeometry args={[0.15, 0.15, 0.09]} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

// Assembly 4: Exploded Marine Deck Component (Circular Hatch)
function MechanicalAssembly({ rotate, explodeFactor }: { rotate: boolean; explodeFactor: number }) {
  const ref = useRef<THREE.Group>(null);
  
  // Load GLTF model
  const { scene } = useGLTF('/models/circular_hatch.glb') as any;
  const clonedScene = React.useMemo(() => scene.clone(), [scene]);
  
  const meshesRef = useRef<THREE.Mesh[]>([]);
  const originalPositions = useRef<THREE.Vector3[]>([]);
  const explodeDirections = useRef<THREE.Vector3[]>([]);

  // Find all meshes and set up their explode paths
  useEffect(() => {
    const meshes: THREE.Mesh[] = [];
    clonedScene.traverse((child: any) => {
      if (child.isMesh) {
        meshes.push(child);
        // Optimize material visibility for premium crimson/steel design
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
    meshesRef.current = meshes;
    originalPositions.current = meshes.map(m => m.position.clone());

    // Calculate scene center
    const box = new THREE.Box3().setFromObject(clonedScene);
    const center = new THREE.Vector3();
    box.getCenter(center);

    explodeDirections.current = meshes.map((mesh) => {
      const meshBox = new THREE.Box3().setFromObject(mesh);
      const meshCenter = new THREE.Vector3();
      meshBox.getCenter(meshCenter);
      
      // Explode direction: cover & wheel move UP, base stays down/moves down
      const dir = new THREE.Vector3().subVectors(meshCenter, center);
      
      // Since it is a circular deck hatch:
      if (meshCenter.y > center.y) {
        dir.y = Math.max(dir.y, 1.2); // force strong upward push for cover/handle
        dir.x *= 0.15; // keep it tight to vertical axis
        dir.z *= 0.15;
      } else {
        dir.y = Math.min(dir.y, -0.6); // force base/frame down
        dir.x *= 0.4;
        dir.z *= 0.4;
      }
      
      return dir.normalize();
    });
  }, [clonedScene]);

  useFrame((state) => {
    // Rotation of the whole assembly
    if (rotate && ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }

    // Apply explode displacement to children
    if (meshesRef.current.length > 0) {
      meshesRef.current.forEach((mesh, index) => {
        const origPos = originalPositions.current[index];
        const dir = explodeDirections.current[index];
        if (origPos && dir) {
          const displacement = explodeFactor * 1.6; // Scale displacement appropriately
          mesh.position.copy(origPos).addScaledVector(dir, displacement);
        }
      });
    }
  });

  return (
    <group ref={ref} scale={1.8} position={[0, -0.2, 0]}>
      <primitive object={clonedScene} />
    </group>
  );
}

export default function ThreeShowcase() {
  const [activeCategory, setActiveCategory] = useState<'marine' | 'industrial' | 'structural' | 'mechanical'>('marine');
  const [explodeFactor, setExplodeFactor] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);

  const categories = [
    { id: 'marine', name: 'Marine Piping' },
    { id: 'industrial', name: 'Industrial Systems' },
    { id: 'structural', name: 'Structural Engineering' },
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
            Interact with our CAD rendering engine. Rotate, zoom, and explode complex models to inspect system layouts.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setExplodeFactor(0); // Reset explode view when swapping model
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

                {/* Explode Slider - Now applicable to ALL Categories */}
                <div>
                  <div className="flex justify-between text-[10px] font-mono text-gray-400 uppercase tracking-wider mb-2">
                    <span>Exploded View</span>
                    <span className="text-accent">{Math.round(explodeFactor * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={explodeFactor}
                    onChange={(e) => setExplodeFactor(parseFloat(e.target.value))}
                    className="w-full accent-accent h-1 bg-black rounded-lg cursor-pointer appearance-none"
                  />
                  <span className="block text-[9px] text-gray-500 font-mono mt-1 leading-normal">
                    Slide to split the assembly and view inner mechanics
                  </span>
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
              
              {activeCategory === 'marine' && <MarinePipingAssembly rotate={autoRotate} explodeFactor={explodeFactor} />}
              {activeCategory === 'industrial' && <IndustrialAssembly rotate={autoRotate} explodeFactor={explodeFactor} />}
              {activeCategory === 'structural' && <StructuralAssembly rotate={autoRotate} explodeFactor={explodeFactor} />}
              {activeCategory === 'mechanical' && (
                <MechanicalAssembly rotate={autoRotate} explodeFactor={explodeFactor} />
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
