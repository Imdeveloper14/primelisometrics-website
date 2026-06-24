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
  const [loaderPhase, setLoaderPhase] = useState(1); // 1 = Fade in logo, 2 = CAD drawings & laser scan, 3 = Wording swap & energy pulse
  const [showLoader, setShowLoader] = useState(true);
  const [fadeLoader, setFadeLoader] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [consultModalOpen, setConsultModalOpen] = useState(false);

  useEffect(() => {
    // Coordinated loading screen sequence (fast, total ~1.8s, never blocks page >2s)
    
    // Phase 2: Start CAD schematics and technical lines drawing
    const p2Timer = setTimeout(() => {
      setLoaderPhase(2);
    }, 500);

    // Phase 3: Technical text swap and energy pulse flash
    const p3Timer = setTimeout(() => {
      setLoaderPhase(3);
    }, 1200);

    // Fade out / Seamless Dissolve trigger
    const fadeTimer = setTimeout(() => {
      setFadeLoader(true);
      setIsLoaded(true); // Trigger hero stagged texts and navbar slide-in
    }, 1800);

    // Completely remove loader overlay from DOM once faded
    const removeTimer = setTimeout(() => {
      setShowLoader(false);
    }, 2500);

    return () => {
      clearTimeout(p2Timer);
      clearTimeout(p3Timer);
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  return (
    <>
       {/* 1. Loading Screen */}
      {showLoader && (
        <div 
          id="loader" 
          className={`fixed inset-0 w-full h-full bg-black z-[99999] flex flex-col items-center justify-center transition-all duration-700 ease-out ${
            fadeLoader ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100'
          }`}
        >
          {/* Background grid expanding into page background */}
          <div className={`absolute inset-0 blueprint-grid transition-all duration-1000 ease-out ${
            fadeLoader ? 'opacity-0 scale-110' : 'opacity-20'
          }`} />
          <div className="absolute inset-0 blueprint-grid-fine opacity-10" />

          <div className="text-center flex flex-col items-center justify-center gap-8 p-4 z-10 select-none">
            {/* Logo and Blueprint combined wrapper */}
            <div className={`relative flex items-center justify-center w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] md:w-[460px] md:h-[460px] mx-auto transition-all duration-1000 ease-out ${
              fadeLoader ? 'scale-75 -translate-y-[100px] md:-translate-y-[150px] opacity-0' : 'scale-100 translate-y-0 opacity-100'
            }`}>
              {/* Rotating SVG CAD blueprint circles */}
              <svg className="cad-blueprint absolute inset-0 w-full h-full z-0" viewBox="0 0 200 200">
                <defs>
                  <radialGradient id="center-mask" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#000000" stopOpacity="1" />
                    <stop offset="70%" stopColor="#000000" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Axis Grid Lines */}
                <line x1="10" y1="100" x2="190" y2="100" className="blueprint-line opacity-50" style={{ stroke: '#ff1744', strokeWidth: '1.5px' }} />
                <line x1="100" y1="10" x2="100" y2="190" className="blueprint-line opacity-50" style={{ stroke: '#ff1744', strokeWidth: '1.5px' }} />
                
                {/* Rotating circles - Phase 2 */}
                <circle 
                  cx="100" 
                  cy="100" 
                  r="60" 
                  className={`blueprint-circle transition-all duration-1000 ${
                    loaderPhase >= 2 ? 'draw-circle-animated rotate-animated' : 'opacity-0'
                  }`} 
                  style={{ stroke: '#ff1744', strokeWidth: '2.5px' }} 
                />
                <circle 
                  cx="100" 
                  cy="100" 
                  r="35" 
                  className={`blueprint-circle transition-all duration-1000 ${
                    loaderPhase >= 2 ? 'draw-circle-reverse' : 'opacity-0'
                  }`} 
                  style={{ stroke: '#ff1744', strokeWidth: '2px', animationDirection: 'reverse' }} 
                />
                <circle 
                  cx="100" 
                  cy="100" 
                  r="75" 
                  className={`blueprint-circle transition-all duration-1000 ${
                    loaderPhase >= 2 ? 'draw-circle-dashed' : 'opacity-0'
                  }`} 
                  style={{ stroke: '#ff1744', strokeWidth: '1.5px', strokeDasharray: '6 4' }} 
                />
                
                {/* Construction diagonal lines */}
                <path 
                  d="M 60,60 L 140,140 M 60,140 L 140,60" 
                  className={`blueprint-line transition-all duration-700 ${
                    loaderPhase >= 2 ? 'opacity-40' : 'opacity-0'
                  }`} 
                  style={{ stroke: '#ff1744', strokeWidth: '1.5px' }} 
                />
                
                {/* Structural polygon */}
                <polygon 
                  points="50,50 150,50 170,100 150,150 50,150 30,100" 
                  className={`blueprint-polygon transition-all duration-1000 ${
                    loaderPhase >= 2 ? 'draw-polygon hex-rotate-animated' : 'opacity-0'
                  }`} 
                  style={{ stroke: '#ff1744', fill: 'rgba(255,23,68,0.03)', strokeWidth: '2px' }} 
                />
                
                {/* Technical measurements and coordinates */}
                {loaderPhase >= 2 && (
                  <g className="animate-fade-in font-mono text-[6px]" style={{ fill: '#ff1744' }}>
                    <text x="12" y="94">LOC: 24.11</text>
                    <text x="12" y="112">SYS: RDY</text>
                    <text x="145" y="94">CAD: V3</text>
                    <text x="145" y="112">SCALE: 1:1</text>
                    
                    {/* Dimension lines */}
                    <path d="M 100,25 L 175,25" className="blueprint-line dim-line" style={{ stroke: '#ff1744', strokeWidth: '1.5px' }} />
                    <path d="M 175,22 L 175,28" className="blueprint-line dim-line" style={{ stroke: '#ff1744', strokeWidth: '1.5px' }} />
                    <path d="M 100,22 L 100,28" className="blueprint-line dim-line" style={{ stroke: '#ff1744', strokeWidth: '1.5px' }} />
                    <text x="125" y="18" className="blueprint-text font-bold text-[7px]" style={{ fill: '#ff1744' }}>R 75.0</text>
                  </g>
                )}

                {/* Central Mask to hide lines intersecting the logo */}
                <circle cx="100" cy="100" r="48" fill="url(#center-mask)" />
              </svg>

              {/* Glowing Ambient Backdrop */}
              <div className={`absolute w-[180px] h-[180px] rounded-full bg-accent/20 filter blur-[40px] z-5 transition-all duration-700 ${
                loaderPhase >= 3 ? 'scale-125 opacity-100' : 'scale-90 opacity-60'
              }`} />

              {/* Logo Icon Only - Center placed on top of blueprint with intense bloom glow */}
              <img
                src="images/logo_icon.png"
                alt="CK Symbol"
                className={`relative z-10 h-[190px] sm:h-[260px] md:h-[290px] w-auto object-contain mx-auto transition-all duration-500 filter drop-shadow-[0_0_40px_rgba(255,23,68,0.9)] ${
                  loaderPhase === 1 ? 'scale-90 opacity-0' : ''
                } ${
                  loaderPhase === 2 ? 'scale-100 opacity-100' : ''
                } ${
                  loaderPhase === 3 ? 'scale-110 logo-pulse-animated opacity-100' : ''
                }`}
              />

              {/* Laser scanning bar - Phase 2 */}
              {loaderPhase === 2 && (
                <div className="laser-scanner absolute left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#ff1744] to-transparent opacity-80 z-20 pointer-events-none" />
              )}
            </div>

            {/* Technical text caption */}
            <div className="h-8 flex items-center justify-center">
              <p 
                className="loader-text text-sm sm:text-base md:text-lg font-mono tracking-[0.4em] uppercase text-accent font-bold transition-all duration-500" 
                style={{ 
                  color: '#ff1744', 
                  textShadow: '0 0 15px rgba(255,23,68,0.7)',
                  opacity: loaderPhase === 3 ? 0.9 : 0.7 
                }}
              >
                {loaderPhase < 3 ? "PREPARING ENGINEERING WORKSPACE" : "Engineering Beyond Limits"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main App Content */}
      <div className="relative min-h-screen text-foreground selection:bg-accent selection:text-white">
        <Navbar isLoaded={isLoaded} />
        
        <main>
          {/* Hero with piping visualizer */}
          <Hero onOpenConsult={() => setConsultModalOpen(true)} isLoaded={isLoaded} />
          
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
