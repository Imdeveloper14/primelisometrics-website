"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ThreeShowcase from '@/components/ThreeShowcase';
import About from '@/components/About';
import Services from '@/components/Services';
import Skills from '@/components/Skills';
import Portfolio from '@/components/Portfolio';
import CaseStudy from '@/components/CaseStudy';
import Workflow from '@/components/Workflow';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ConsultationModal from '@/components/ConsultationModal';

export default function Home() {
  const [showLoader, setShowLoader] = useState(true);
  const [fadeLoader, setFadeLoader] = useState(false);
  const [consultModalOpen, setConsultModalOpen] = useState(false);

  useEffect(() => {
    // 5-second minimum load time as specified in original scripts
    const timer = setTimeout(() => {
      setFadeLoader(true);
      const removeTimer = setTimeout(() => {
        setShowLoader(false);
      }, 800); // match globals.css transition duration
      return () => clearTimeout(removeTimer);
    }, 4000); // 4 seconds before fade, 4.8 total

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
       {/* 1. Loading Screen */}
      {showLoader && (
        <div 
          id="loader" 
          className="fixed inset-0 w-full h-full bg-black z-[99999] flex items-center justify-center transition-all duration-700 ease-out"
        >
          <div className="text-center flex flex-col items-center justify-center gap-8 p-4 max-w-full overflow-hidden">
            {/* Logo and Blueprint combined wrapper */}
            <div className="relative flex items-center justify-center w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] md:w-[460px] md:h-[460px] mx-auto">
              {/* Rotating SVG CAD blueprint circles */}
              <svg className="cad-blueprint absolute inset-0 w-full h-full z-0" viewBox="0 0 200 200">
                {/* Axis Grid Lines */}
                <line x1="10" y1="100" x2="190" y2="100" className="blueprint-line opacity-50" style={{ stroke: '#DC143C', strokeWidth: '2px' }} />
                <line x1="100" y1="10" x2="100" y2="190" className="blueprint-line opacity-50" style={{ stroke: '#DC143C', strokeWidth: '2px' }} />
                
                {/* Rotating circles */}
                <circle cx="100" cy="100" r="60" className="blueprint-circle main-circle" style={{ stroke: '#DC143C', strokeWidth: '3px' }} />
                <circle cx="100" cy="100" r="35" className="blueprint-circle main-circle" style={{ animationDirection: 'reverse', stroke: '#DC143C', strokeWidth: '3px' }} />
                <circle cx="100" cy="100" r="75" className="blueprint-circle construction-circle" style={{ stroke: '#DC143C', strokeWidth: '2px' }} />
                
                {/* Construction diagonal lines */}
                <path d="M 60,60 L 140,140 M 60,140 L 140,60" className="blueprint-line diagonal-line opacity-50" style={{ stroke: '#DC143C', strokeWidth: '2px' }} />
                
                {/* Structural polygon */}
                <polygon points="50,50 150,50 170,100 150,150 50,150 30,100" className="blueprint-polygon" style={{ stroke: '#DC143C', fill: 'rgba(220,20,60,0.08)', strokeWidth: '2.5px' }} />
                
                {/* Dimension lines */}
                <path d="M 100,25 L 175,25" className="blueprint-line dim-line" style={{ stroke: '#DC143C', strokeWidth: '2px' }} />
                <path d="M 175,22 L 175,28" className="blueprint-line dim-line" style={{ stroke: '#DC143C', strokeWidth: '2px' }} />
                <path d="M 100,22 L 100,28" className="blueprint-line dim-line" style={{ stroke: '#DC143C', strokeWidth: '2px' }} />
                <text x="125" y="18" className="blueprint-text" style={{ fill: '#DC143C', fontWeight: 'bold' }}>R 75.0</text>
              </svg>

              {/* Logo Icon Only - Center placed on top of blueprint with intense bloom glow */}
              <img
                src="images/logo_icon.png"
                alt="Primelisometrics Symbol"
                className="relative z-10 h-[190px] sm:h-[260px] md:h-[290px] w-auto object-contain mx-auto transition-all duration-300 filter drop-shadow-[0_0_40px_rgba(220,20,60,0.9)] brightness-150 contrast-125"
              />
            </div>

            {/* Preparing text - increased size */}
            <p className="loader-text text-sm sm:text-base md:text-lg font-mono tracking-[0.4em] uppercase text-accent animate-pulse font-bold" style={{ color: '#DC143C', textShadow: '0_0_15px_rgba(220,20,60,0.7)' }}>
              PREPARING ENGINEERING WORKSPACE
            </p>
          </div>
        </div>
      )}

      {/* Main App Content */}
      <div className="relative min-h-screen text-foreground selection:bg-accent selection:text-white">
        <Navbar />
        
        <main>
          {/* Hero with piping visualizer */}
          <Hero onOpenConsult={() => setConsultModalOpen(true)} />
          
          {/* ThreeJS Category Model Showcase */}
          <ThreeShowcase />
          
          {/* About Section with Stats */}
          <About />
          
          {/* Services offered panels */}
          <Services />
          
          {/* Core Software stack list */}
          <Skills />
          
          {/* Projects gallery and before/after slider */}
          <Portfolio />
          
          {/* Featured Case study */}
          <CaseStudy />
          
          {/* Workflow timeline progress tracker */}
          <Workflow />
          
          {/* Testimonial panels */}
          <Testimonials />
          
          {/* Formspree contact panel */}
          <Contact onOpenConsult={() => setConsultModalOpen(true)} />
        </main>
        
        <Footer />

        {/* Free Consultation scheduling modal overlay */}
        <ConsultationModal 
          isOpen={consultModalOpen} 
          onClose={() => setConsultModalOpen(false)} 
        />
      </div>
    </>
  );
}
