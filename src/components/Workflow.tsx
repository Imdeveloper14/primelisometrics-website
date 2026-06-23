"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function Workflow() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll position inside this section for the vertical timeline progress bar
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const steps = [
    {
      num: '01',
      title: 'Requirement Study',
      desc: 'Understanding client needs, technical specifications, design standards, and project scope.',
      icon: 'ph-magnifying-glass',
    },
    {
      num: '02',
      title: 'Concept Development',
      desc: 'Creating initial design ideas, layouts, sketches, and system planning.',
      icon: 'ph-lightbulb',
    },
    {
      num: '03',
      title: 'CAD Modeling',
      desc: 'Building accurate 3D models, piping layouts, mechanical parts, and assemblies.',
      icon: 'ph-cube',
    },
    {
      num: '04',
      title: 'Design Review',
      desc: 'Checking design feasibility, routing, clearances, manufacturability, and system requirements.',
      icon: 'ph-wrench',
    },
    {
      num: '05',
      title: 'Rendering & Visualization',
      desc: 'Creating clean visual presentations, technical views, and model previews.',
      icon: 'ph-aperture',
    },
    {
      num: '06',
      title: 'Final Delivery',
      desc: 'Providing final CAD files, drawings, layouts, isometrics, and design documentation.',
      icon: 'ph-check-circle',
    },
  ];

  return (
    <section id="workflow" ref={containerRef} className="relative py-24 bg-black">
      <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="text-[11px] font-mono tracking-[0.25em] text-accent uppercase font-semibold block mb-2">Process</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">My Design Workflow</h2>
          <p className="text-sm md:text-base text-gray-400 max-w-xl mx-auto leading-relaxed">
            A structured process from concept to final production-ready delivery.
          </p>
        </div>

        {/* Timeline Path Container */}
        <div className="relative max-w-3xl mx-auto">
          
          {/* Background vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-[#222] -translate-x-1/2" />
          
          {/* Animated active progress line */}
          <motion.div 
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-accent -translate-x-1/2 origin-top"
            style={{ scaleY }}
          />

          {/* Timeline steps */}
          <div className="flex flex-col gap-12">
            {steps.map((step, i) => {
              const isEven = i % 2 === 0;
              return (
                <div 
                  key={i}
                  className={`flex flex-col md:flex-row relative items-start md:items-center ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Outer ring dot indicator on timeline line */}
                  <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full border-2 border-accent bg-[#000] -translate-x-1/2 flex items-center justify-center z-20 transition-all duration-300 group-hover:scale-110">
                    <span className="text-[9px] font-bold font-mono text-accent">{step.num}</span>
                  </div>

                  {/* Left / Right Card content */}
                  <div className={`w-full md:w-[45%] pl-12 md:pl-0 ${
                    isEven ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'
                  }`}>
                    <div 
                      className="bg-card-bg border border-border p-6 rounded-lg backdrop-blur-md hover:border-accent hover:shadow-[0_0_20px_rgba(220,20,60,0.15)] transition-all duration-300 relative overflow-hidden group"
                    >
                      {/* Micro interaction blueprint grid */}
                      <div className="absolute inset-0 blueprint-grid-fine opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none" />

                      <div className={`flex items-center gap-3 mb-2 ${
                        isEven ? 'md:justify-end' : 'justify-start'
                      }`}>
                        <div className="w-8 h-8 rounded bg-accent/10 flex items-center justify-center text-accent">
                          <i className={`ph ${step.icon} text-lg`}></i>
                        </div>
                        <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">
                          {step.title}
                        </h4>
                      </div>

                      <p className="text-xs text-gray-400 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>

                  {/* Spacer for structural grid matching layout */}
                  <div className="hidden md:block w-[45%]" />
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
