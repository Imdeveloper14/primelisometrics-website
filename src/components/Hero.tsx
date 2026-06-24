"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

// Load Three.js Canvas dynamically to prevent SSR failures
const PipingCanvas = dynamic(() => import('./PipingCanvas'), { ssr: false });

interface HeroProps {
  onOpenConsult: () => void;
  isLoaded?: boolean;
}

export default function Hero({ onOpenConsult, isLoaded = true }: HeroProps) {
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = React.useState(false);

  // Mouse move handler for spotlight parallax
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Motion settings for staggered text entrance
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const
      }
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden select-none"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background blueprint grids (scales up slightly on loader dissolve) */}
      <div className={`absolute inset-0 blueprint-grid transition-all duration-1000 ease-out ${
        isLoaded ? 'opacity-20 scale-100' : 'opacity-10 scale-95'
      }`} />
      <div className="absolute inset-0 blueprint-grid-fine opacity-25" />
      
      {/* Interactive mouse spotlight grid overlay */}
      {isLoaded && isHovered && (
        <div 
          className="absolute inset-0 pointer-events-none opacity-40 transition-opacity duration-500"
          style={{
            background: `radial-gradient(450px circle at ${mousePos.x}px ${mousePos.y}px, rgba(220, 20, 60, 0.12) 0%, rgba(220, 20, 60, 0.03) 60%, transparent 100%)`
          }}
        />
      )}

      {/* Radial red ambient glow behind content */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Side: Exact Text copy */}
        <motion.div 
          className="lg:col-span-6"
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
        >

          {/* Title */}
          <motion.h1 
            variants={itemVariants}
            className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-4 leading-tight"
          >
            <span className="text-gradient-red">PRIMELISOMETRICS</span>
          </motion.h1>

          {/* Tagline */}
          <motion.h2 
            variants={itemVariants}
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-3"
          >
            Engineering Beyond Limits
          </motion.h2>

          {/* Subheading */}
          <motion.h3 
            variants={itemVariants}
            className="text-xs sm:text-sm font-mono text-accent uppercase tracking-[0.25em] font-bold mb-6"
          >
            Advanced Design • Simulation • Manufacturing
          </motion.h3>

          {/* Description */}
          <motion.p 
            variants={itemVariants}
            className="text-sm md:text-base text-gray-400 mb-8 max-w-xl leading-relaxed"
          >
            PRIMELISOMETRICS is an engineering workspace dedicated to advanced design, simulation, manufacturing, product development, and innovative engineering solutions.
          </motion.p>

          {/* CTAs */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a 
              href="#contact" 
              className="px-8 py-3.5 bg-accent hover:bg-accent-hover text-white font-bold text-xs uppercase tracking-widest rounded transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_25px_rgba(255,23,68,0.3)] hover:shadow-[0_4px_35px_rgba(255,23,68,0.55)] hover:-translate-y-0.5"
            >
              Request Quote <i className="ph ph-arrow-right font-bold text-sm"></i>
            </a>
            <button 
              onClick={onOpenConsult}
              className="px-8 py-3.5 bg-transparent border border-border hover:border-gray-500 text-white font-bold text-xs uppercase tracking-widest rounded transition-all duration-300 hover:bg-white/5 cursor-pointer"
            >
              Schedule Consultation
            </button>
          </motion.div>
        </motion.div>

        {/* Right Side: 3D Piping Canvas */}
        <motion.div 
          className="lg:col-span-6 w-full"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isLoaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <PipingCanvas />
        </motion.div>

      </div>
    </section>
  );
}
