"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate, useMotionValueEvent } from 'framer-motion';

// Scroll-triggered counter using Framer Motion
function Counter({ value, decimals = 0 }: { value: number; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => latest.toFixed(decimals));
  const [displayValue, setDisplayValue] = useState('0');
  const inView = useInView(ref, { once: true, margin: '-50px' });

  useMotionValueEvent(rounded, "change", (latest) => {
    setDisplayValue(latest);
  });

  useEffect(() => {
    if (inView) {
      const controls = animate(count, value, { duration: 1.5, ease: 'easeOut' });
      return () => controls.stop();
    }
  }, [inView, value, count]);

  return <span ref={ref}>{displayValue}</span>;
}

export default function About() {
  const stats = [
    { type: 'number', val: 3.5, label: 'Years Experience', suffix: '+', decimals: 1, icon: 'ph-calendar' },
    { type: 'number', val: 15, label: 'Projects Delivered', suffix: '+', decimals: 0, icon: 'ph-folder-open' },
    { type: 'text', val: 'Plant 3D', label: 'AutoCAD Plant 3D Specialist', icon: 'ph-cpu' },
    { type: 'text', val: 'Design', label: 'Marine, Civil & Industrial Design Support', icon: 'ph-compass' },
    { type: 'text', val: 'Freelance', label: 'Freelance Engineering Design Consultancy', full: true, icon: 'ph-briefcase' },
  ];

  const capabilities = [
    {
      title: 'Naval Architecture & Ship Stability',
      desc: 'Vessel design support, stability assessments, and class-approval ready documentation for builders and owners.',
      icon: 'ph-compass',
    },
    {
      title: '3D Modeling & Advanced CAD',
      desc: 'Delivering precise, production-ready 3D CAD models optimized for fabrication and manufacturing.',
      icon: 'ph-cube',
    },
    {
      title: 'Piping & Production Design',
      desc: 'Custom routing, general arrangement layouts, accurate isometric spool drawings, and complete BOM lists using AutoCAD Plant 3D.',
      icon: 'ph-flow-arrow',
    },
    {
      title: 'Specialized Marine Retrofits (BWTS)',
      desc: 'End-to-end BWTS retrofit design, including structural integration, pipe routing, and on-site alignment scans.',
      icon: 'ph-drop',
    },
    {
      title: '3D Printable Models',
      desc: 'Optimizing 3D models specifically for additive manufacturing, prototyping, and rapid product development.',
      icon: 'ph-printer',
    },
  ];

  return (
    <section id="about" className="relative py-24 overflow-hidden border-t border-[#111]">
      <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-accent/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Wording Summary & Stats */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div>
              <span className="text-[11px] font-mono tracking-[0.25em] text-accent uppercase font-semibold block mb-2">About</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">
                About <span className="text-gradient-red">Primelisometrics</span>
              </h2>
              <p className="text-sm md:text-base font-semibold text-gray-200">
                Delivering production-ready engineering and design solutions for marine, civil, and industrial projects.
              </p>
            </div>

            <div className="bg-card-bg border border-border p-6 rounded-lg backdrop-blur-md relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <p className="text-sm text-gray-400 leading-relaxed">
                Primelisometrics is a freelance engineering design consultancy providing professional CAD design, 3D modeling, piping design, marine systems design, technical drafting, and production-ready engineering solutions for marine, civil, industrial, and manufacturing sectors.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {stats.map((stat, i) => (
                <div 
                  key={i} 
                  className={`bg-card-bg border border-border p-5 rounded-lg flex flex-col gap-2 hover:border-accent/40 hover:shadow-[0_0_20px_rgba(220,20,60,0.1)] transition-all duration-300 backdrop-blur-md ${
                    stat.full ? 'sm:col-span-2' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                      <i className={`ph ${stat.icon} text-base`}></i>
                    </div>
                    {stat.type === 'number' ? (
                      <div className="text-2xl font-bold text-white tracking-tight">
                        <Counter value={stat.val as number} decimals={stat.decimals} />
                        {stat.suffix}
                      </div>
                    ) : (
                      <div className="text-lg font-bold text-white tracking-tight">
                        {stat.val}
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-gray-400">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Expertise Capability stack */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div>
              <span className="text-[11px] font-mono tracking-[0.25em] text-accent uppercase font-semibold block mb-2">Capabilities</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">
                Core Capabilities
              </h2>
            </div>

            <div className="flex flex-col gap-4">
              {capabilities.map((cap, i) => (
                <div 
                  key={i}
                  className="bg-card-bg border border-border p-5 rounded-lg flex items-start gap-4 hover:border-accent/40 hover:translate-x-1 hover:shadow-[0_0_20px_rgba(220,20,60,0.1)] transition-all duration-300 backdrop-blur-md relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-radial from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0 mt-1">
                    <i className={`ph ${cap.icon} text-lg`}></i>
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">
                      {cap.title}
                    </h4>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      {cap.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
