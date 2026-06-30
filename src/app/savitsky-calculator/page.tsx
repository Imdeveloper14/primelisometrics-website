"use client";

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

function CalculatorIframe() {
  const searchParams = useSearchParams();
  const success = searchParams.get('success');
  const canceled = searchParams.get('canceled');
  
  const query = success ? '?success=true' : (canceled ? '?canceled=true' : '');
  const iframeSrc = `/savitsky-calc-core.html${query}`;

  return (
    <iframe 
      src={iframeSrc} 
      className="w-full h-full min-h-[75vh] md:min-h-[85vh] border-0"
      title="Savitsky Planing-Hull Calculator"
    />
  );
}

export default function SavitskyCalculatorPage() {
  return (
    <>
      <Navbar isLoaded={true} />
      
      <main className="min-h-screen pt-32 pb-16 bg-background relative overflow-hidden flex flex-col items-center">
        {/* Blueprint background grid */}
        <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />
        <div className="absolute inset-0 blueprint-grid-fine opacity-5 pointer-events-none" />
        
        {/* Glowing ambient background element */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-accent/10 filter blur-[80px] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10 flex-1 flex flex-col">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h1 
              className="text-2xl sm:text-4xl md:text-5xl font-black tracking-widest uppercase text-white mb-4 drop-shadow-[0_0_15px_rgba(255,23,68,0.3)] font-mono"
            >
              Savitsky Planing Hull Calculator
            </h1>
            <div className="h-1 w-20 bg-accent mx-auto mb-4" />
            <p className="text-xs sm:text-sm text-gray-400 font-mono tracking-wide uppercase">
              Planing Hull Resistance & Propulsion-Engine Matching Tool
            </p>
          </div>

          {/* Calculator Embed Container */}
          <div className="w-full flex-1 min-h-[75vh] md:min-h-[85vh] rounded-2xl border border-border/80 overflow-hidden bg-white shadow-[0_0_40px_rgba(0,0,0,0.5)]">
            <Suspense fallback={<div className="w-full h-full bg-white flex items-center justify-center text-gray-500 font-mono">Loading Calculator...</div>}>
              <CalculatorIframe />
            </Suspense>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
