"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Project {
  id: number;
  title: string;
  desc: string;
  img: string;
  category: 'naval-architecture' | 'piping' | 'structural' | 'hydrodynamics';
  tags: string[];
  specs: { label: string; val: string }[];
}

export default function Portfolio() {
  const [filter, setFilter] = useState<'all' | 'naval-architecture' | 'piping' | 'structural' | 'hydrodynamics'>('all');
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage for before/after slider
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const beforeAfterContainerRef = useRef<HTMLDivElement>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: "New Build Q3 Barge",
      desc: "Executed intact and probabilistic damage stability calculations, structural designs, and full midship 3D models.",
      img: "images/drone1.png",
      category: "naval-architecture",
      tags: ["Naval Architecture", "Stability"],
      specs: [
        { label: "Class Approval", val: "IACS Compliant" },
        { label: "Vessel Type", val: "Flat Top Barge" },
        { label: "Calculations", val: "Probabilistic Damage" }
      ]
    },
    {
      id: 2,
      title: "27ft Speed Boat",
      desc: "Designed a hydrodynamically streamlined 3D hull for a 27ft speed boat using Rhino 3D for MKEL Projects.",
      img: "images/drone2.png",
      category: "hydrodynamics",
      tags: ["Hydrodynamics", "Rhino 3D"],
      specs: [
        { label: "Software", val: "Rhino 3D" },
        { label: "Length Over All", val: "27 feet" },
        { label: "Optimization", val: "Resistance Minimization" }
      ]
    },
    {
      id: 3,
      title: "Marine Piping Systems",
      desc: "Delivered high-accuracy pipe routing, piping general arrangements, isometric drawings, and spool drawings.",
      img: "images/pill.png",
      category: "piping",
      tags: ["Pipe Routing", "Isometrics"],
      specs: [
        { label: "System", val: "BWTS Bypass Loop" },
        { label: "Software", val: "AutoCAD Plant 3D" },
        { label: "Spool count", val: "45 distinct spools" }
      ]
    },
    {
      id: 4,
      title: "Indian Navy RIB",
      desc: "Maintained structural and system integrity through critical console modifications and 3D reverse engineering.",
      img: "images/valve.png",
      category: "structural",
      tags: ["Structural", "Reverse Engineering"],
      specs: [
        { label: "Client", val: "Indian Navy" },
        { label: "Method", val: "Reverse Engineering" },
        { label: "Material", val: "Marine Grade Alu" }
      ]
    },
    {
      id: 5,
      title: "BWTS Retrofits",
      desc: "Led 3D modeling and structural integration for major Ballast Water Treatment System retrofits.",
      img: "images/structure.png",
      category: "piping",
      tags: ["Retrofit", "Point Cloud"],
      specs: [
        { label: "Input Data", val: "3D Laser Scan" },
        { label: "Piping Specs", val: "DN 250 CuNi" },
        { label: "Clash check", val: "Zero tolerances" }
      ]
    }
  ];

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!beforeAfterContainerRef.current) return;
    const rect = beforeAfterContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!beforeAfterContainerRef.current) return;
    const rect = beforeAfterContainerRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section id="portfolio" className="relative py-24 border-t border-[#111] overflow-hidden">
      <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />
      
      <div className="container mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[11px] font-mono tracking-[0.25em] text-accent uppercase font-semibold block mb-2">Portfolio</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">Selected Projects</h2>
          <p className="text-sm md:text-base text-gray-400 max-w-xl mx-auto leading-relaxed">
            Advanced concepts designed for performance and manufacturability.
          </p>
        </div>

        {/* Before / After Slider Section (New Visual Feature) */}
        <div className="mb-20 max-w-4xl mx-auto border border-[#222222] rounded-xl overflow-hidden bg-black/40 backdrop-blur-md">
          <div className="p-4 border-b border-[#222222] flex justify-between items-center bg-black/60">
            <span className="text-[10px] font-mono text-accent uppercase tracking-widest font-bold">Interactive CAD Render Analysis</span>
            <span className="text-[9px] text-gray-400 font-mono hidden sm:inline">HOVER & DRAG SLIDER LEFT/RIGHT</span>
          </div>
          
          <div 
            ref={beforeAfterContainerRef}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            className="relative h-[250px] sm:h-[400px] w-full cursor-ew-resize select-none overflow-hidden"
          >
            {/* Background: Final Render (Speed Boat Hull) */}
            <img 
              src="images/drone2.png" 
              alt="Final CAD Render" 
              className="absolute inset-0 h-full w-full object-cover pointer-events-none"
            />
            
            {/* Label Right */}
            <div className="absolute bottom-4 right-4 z-10 font-mono text-[9px] text-white bg-black/80 px-2 py-1 border border-[#333] rounded">
              3D FINISHED MODEL
            </div>

            {/* Foreground: Wireframe (Barge Hull) */}
            <div 
              className="absolute inset-0 h-full w-full pointer-events-none"
              style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
            >
              <img 
                src="images/drone1.png" 
                alt="Wireframe Layout" 
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            
            {/* Label Left */}
            <div className="absolute bottom-4 left-4 z-10 font-mono text-[9px] text-accent bg-black/80 px-2 py-1 border border-accent/30 rounded">
              DRAFT BLUEPRINT
            </div>

            {/* Slider separator bar */}
            <div 
              className="absolute top-0 bottom-0 w-[2px] bg-accent z-20 pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              {/* Slider selector handle icon */}
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center shadow-[0_0_10px_rgba(220,20,60,0.5)]">
                <i className="ph ph-arrows-left-right text-xs"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Portfolio Tabs / Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {(['all', 'naval-architecture', 'piping', 'structural', 'hydrodynamics'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 text-[10px] md:text-xs font-semibold font-mono border rounded uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                filter === cat
                  ? 'border-accent bg-accent/10 text-white shadow-[0_0_10px_rgba(220,20,60,0.15)]'
                  : 'border-[#222222] bg-black/40 text-gray-400 hover:text-white hover:border-gray-500'
              }`}
            >
              {cat.replace('-', ' ')}
            </button>
          ))}
        </div>

        {/* Project grid with AnimatePresence */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                onClick={() => setActiveProject(project)}
                className="bg-card-bg border border-border rounded-lg overflow-hidden group hover:border-accent hover:shadow-[0_0_20px_rgba(220,20,60,0.15)] transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div className="relative overflow-hidden aspect-video">
                  {/* Image overlay */}
                  <div className="absolute inset-0 bg-[#000]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-accent/20 border border-accent flex items-center justify-center text-accent shadow-[0_0_15px_rgba(220,20,60,0.4)]">
                      <i className="ph ph-magnifying-glass-plus text-lg"></i>
                    </div>
                  </div>
                  <img 
                    src={project.img} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-5 flex flex-col gap-3">
                  <h3 className="text-base font-bold text-white uppercase tracking-wider group-hover:text-accent transition-colors duration-300">
                    {project.title}
                  </h3>
                  <div className="flex gap-2">
                    {project.tags.map((t, idx) => (
                      <span key={idx} className="text-[8px] font-mono tracking-wider font-semibold uppercase px-2 py-0.5 border border-border bg-black/60 rounded text-gray-400">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Lightbox / Detail view Popup Modal */}
      <AnimatePresence>
        {activeProject && (
          <div 
            onClick={() => setActiveProject(null)}
            className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-4 backdrop-blur-md"
          >
            <motion.div 
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#050505] border border-[#222] w-full max-w-3xl rounded-lg overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)]"
            >
              {/* Close Button */}
              <div className="flex justify-between items-center border-b border-[#222] p-4 bg-black/60">
                <span className="text-[10px] font-mono text-accent uppercase tracking-widest font-bold">Project Details</span>
                <button 
                  onClick={() => setActiveProject(null)}
                  className="text-gray-400 hover:text-white cursor-pointer"
                >
                  <i className="ph ph-x text-lg"></i>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Visual Image */}
                <div className="relative aspect-video md:aspect-auto md:h-full min-h-[220px]">
                  <img 
                    src={activeProject.img} 
                    alt={activeProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details list */}
                <div className="p-6 flex flex-col justify-between gap-6">
                  <div>
                    <h3 className="text-xl font-bold text-white uppercase tracking-wider mb-2">{activeProject.title}</h3>
                    <p className="text-xs text-gray-400 leading-relaxed mb-4">{activeProject.desc}</p>
                    
                    {/* Specifications stats table */}
                    <div className="flex flex-col gap-2">
                      <span className="text-[9px] font-mono text-accent uppercase tracking-wider font-semibold">Technical Specifications</span>
                      <div className="border border-[#222] rounded overflow-hidden">
                        {activeProject.specs.map((spec, sidx) => (
                          <div key={sidx} className="grid grid-cols-2 border-b border-[#111] last:border-0 p-2 font-mono text-[9px]">
                            <span className="text-gray-500 uppercase">{spec.label}</span>
                            <span className="text-white text-right">{spec.val}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => setActiveProject(null)}
                    className="w-full py-2 bg-accent hover:bg-accent-hover text-white text-xs font-mono uppercase tracking-widest rounded transition-all duration-300 cursor-pointer"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
