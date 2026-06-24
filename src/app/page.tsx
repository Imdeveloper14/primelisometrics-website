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

function TypewriterTagline({ startDelay, isLoaded, loaderPhase }: { startDelay: number; isLoaded: boolean; loaderPhase: number }) {
  const fullText = "ENGINEERING BEYOND LIMITS";
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [typingComplete, setTypingComplete] = useState(false);
  const [showSecondary, setShowSecondary] = useState(false);

  useEffect(() => {
    // Typing animation
    let index = 0;
    let typingInterval: NodeJS.Timeout;

    const startTimer = setTimeout(() => {
      typingInterval = setInterval(() => {
        if (index <= fullText.length) {
          setDisplayedText(fullText.slice(0, index));
          index++;
        } else {
          clearInterval(typingInterval);
          setTypingComplete(true);
          // Show secondary subtitle after 400ms pause
          setTimeout(() => {
            setShowSecondary(true);
          }, 400);
        }
      }, 70); // 70ms per character
    }, startDelay);

    // Blinking cursor
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 450);

    return () => {
      clearTimeout(startTimer);
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, [startDelay]);

  return (
    <div className={`mt-10 sm:mt-12 flex flex-col items-center justify-center select-none font-mono text-center transition-all duration-700 ${
      isLoaded ? 'opacity-0 scale-95 translate-y-[-20px]' : 'opacity-100'
    }`}>
      {/* Main Tagline */}
      <h2 
        className={`text-lg sm:text-2xl md:text-3xl font-extrabold tracking-[0.25em] uppercase text-white flex items-center justify-center min-h-[40px] px-4 transition-all duration-300 ${
          typingComplete ? (loaderPhase === 3 ? 'tagline-pulse-glow-intense font-black' : 'tagline-pulse-glow font-black') : 'text-flicker-animated'
        }`}
        style={{
          textShadow: loaderPhase === 3 
            ? '0 0 25px rgba(255,23,68,1), 0 0 8px rgba(255,255,255,1)' 
            : '0 0 10px rgba(255,23,68,0.5), 0 0 2px rgba(255,255,255,0.8)'
        }}
      >
        <span>{displayedText}</span>
        <span className={`text-[#ff1744] font-normal transition-opacity duration-100 ${
          showCursor ? 'opacity-100' : 'opacity-0'
        }`}>|</span>
      </h2>

      {/* Secondary Line */}
      <p 
        className={`text-[9px] sm:text-xs tracking-[0.3em] uppercase mt-3 font-medium transition-all duration-[800ms] ease-out ${
          showSecondary ? 'opacity-85 translate-y-0 scale-100' : 'opacity-0 translate-y-3 scale-95'
        }`}
        style={{
          textShadow: loaderPhase === 3 
            ? '0 0 15px rgba(255, 23, 68, 0.8)' 
            : '0 0 8px rgba(255, 23, 68, 0.4)',
          color: loaderPhase === 3 
            ? 'rgba(255, 255, 255, 1)' 
            : 'rgba(255, 255, 255, 0.8)'
        }}
      >
        Advanced Design • Simulation • Manufacturing
      </p>
    </div>
  );
}

export default function Home() {
  const [loaderPhase, setLoaderPhase] = useState(2); // Start at Phase 2 to animate all graphics immediately
  const [showLoader, setShowLoader] = useState(true);
  const [fadeLoader, setFadeLoader] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [consultModalOpen, setConsultModalOpen] = useState(false);

  useEffect(() => {
    // Synchronized loading screen sequence (total ~7.5s)

    // Phase 3: Final logo energy pulse flash (at 6.5s)
    const p3Timer = setTimeout(() => {
      setLoaderPhase(3);
    }, 6500);

    // Fade out / Seamless Dissolve trigger (at 6.8s)
    const fadeTimer = setTimeout(() => {
      setFadeLoader(true);
      setIsLoaded(true); // Trigger hero staged texts and navbar slide-in
    }, 6800);

    // Completely remove loader overlay from DOM once faded (at 7.5s)
    const removeTimer = setTimeout(() => {
      setShowLoader(false);
    }, 7500);

    return () => {
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

                {/* Axis Grid Lines (softly pulsing crosshairs) */}
                <g className="crosshair-pulse-animated">
                  <line x1="10" y1="100" x2="190" y2="100" className="blueprint-line opacity-50" style={{ stroke: '#ff1744', strokeWidth: '1.5px' }} />
                  <line x1="100" y1="10" x2="100" y2="190" className="blueprint-line opacity-50" style={{ stroke: '#ff1744', strokeWidth: '1.5px' }} />
                </g>
                
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
                
                {/* Structural polygon (subtly pulsing hexagon) */}
                <g className="hex-pulse-animated">
                  <polygon 
                    points="50,50 150,50 170,100 150,150 50,150 30,100" 
                    className={`blueprint-polygon transition-all duration-1000 ${
                      loaderPhase >= 2 ? 'draw-polygon hex-rotate-animated' : 'opacity-0'
                    }`} 
                    style={{ stroke: '#ff1744', fill: 'rgba(255,23,68,0.03)', strokeWidth: '2px' }} 
                  />
                </g>
                
                {/* Technical measurements and coordinates (flickering HUD) */}
                {loaderPhase >= 2 && (
                  <g className="hud-flicker-animated animate-fade-in font-mono text-[6px]" style={{ fill: '#ff1744' }}>
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

              {/* Glowing Ambient Backdrop (slowly breathing glow) */}
              <div className={`absolute w-[180px] h-[180px] rounded-full bg-accent/20 filter blur-[40px] z-5 glow-breathe-animated`} />

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

              {/* Laser scanning bar */}
              {!fadeLoader && (
                <div className="laser-scanner absolute left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#ff1744] to-transparent opacity-80 z-20 pointer-events-none" />
              )}
            </div>

            {/* Typewriter Tagline (types concurrently starting at 0.3s) */}
            <TypewriterTagline startDelay={300} isLoaded={fadeLoader} loaderPhase={loaderPhase} />
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
