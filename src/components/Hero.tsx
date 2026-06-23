"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

// Load Three.js Canvas dynamically to prevent SSR failures
const PipingCanvas = dynamic(() => import('./PipingCanvas'), { ssr: false });

interface HeroProps {
  onOpenConsult: () => void;
}

export default function Hero({ onOpenConsult }: HeroProps) {
  // Motion settings for staggered text entrance
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
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
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      {/* Background blueprint grids */}
      <div className="absolute inset-0 blueprint-grid opacity-20" />
      <div className="absolute inset-0 blueprint-grid-fine opacity-30" />
      
      {/* Radial red ambient glow behind content */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Side: Exact Text copy */}
        <motion.div 
          className="lg:col-span-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div 
            variants={itemVariants}
            className="inline-block px-4 py-1 border border-border/80 rounded-full text-[10px] uppercase font-mono tracking-widest text-gray-400 bg-black/40 mb-6"
          >
            Freelance Engineering Design Consultancy
          </motion.div>

          {/* Title */}
          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight flex flex-col"
          >
            <span>Engineering</span>
            <span>Ideas into</span>
            <span className="text-gradient-red">Reality.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl font-medium text-gray-200 mb-4 max-w-xl"
          >
            Freelance CAD Design Services for Marine, Civil & Industrial Projects
          </motion.p>

          {/* Description */}
          <motion.p 
            variants={itemVariants}
            className="text-sm md:text-base text-gray-400 mb-8 max-w-xl leading-relaxed"
          >
            Primelisometrics provides professional 3D CAD modeling, technical drafting, piping design, and production-ready engineering solutions for clients across marine, civil, industrial, and manufacturing sectors. We help transform concepts into accurate, practical, and implementation-ready designs.
          </motion.p>

          {/* CTAs */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a 
              href="#contact" 
              className="px-8 py-3.5 bg-accent hover:bg-accent-hover text-white font-bold text-xs uppercase tracking-widest rounded transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_20px_rgba(220,20,60,0.25)] hover:-translate-y-0.5"
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
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <PipingCanvas />
        </motion.div>

      </div>
    </section>
  );
}
