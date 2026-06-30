"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface CalculatorInfo {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'coming-soon';
  path?: string;
  category: string;
}

export default function CalculatorsHubPage() {
  const calculators: CalculatorInfo[] = [
    {
      id: 'insel-molland',
      name: 'Insel & Molland Catamaran Calculator',
      description: 'Resistance, EHP, BHP, and propulsion-engine matching for catamaran hulls using an Insel & Molland-style interference structure.',
      status: 'active',
      path: '/calculator',
      category: 'Hull Resistance'
    },
    {
      id: 'savitsky',
      name: 'Savitsky Planing Hull Calculator',
      description: 'Resistance, EHP, BHP, required power, and marine diesel engine matching for planing hulls using the Daniel Savitsky method.',
      status: 'active',
      path: '/savitsky-calculator',
      category: 'Planing Hull'
    },
    {
      id: 'holtrop-mennen',
      name: 'Holtrop & Mennen Resistance Calculator',
      description: 'Power prediction method for displacement ships based on regression analysis of model test results and full-scale data.',
      status: 'coming-soon',
      category: 'Displacement Hull'
    },
    {
      id: 'hollenbach',
      name: 'Hollenbach Resistance Calculator',
      description: 'Modern regression-based estimation method for single-screw cargo vessels and tankers.',
      status: 'coming-soon',
      category: 'Merchant Ships'
    },
    {
      id: 'delft-series',
      name: 'Delft Series Resistance Calculator',
      description: 'Systematic yacht hull series analysis for sailing vessels and keel resistance profiles.',
      status: 'coming-soon',
      category: 'Sailing Yachts'
    },
    {
      id: 'ittc-friction',
      name: 'ITTC Frictional Resistance Calculator',
      description: 'Calculates the frictional resistance coefficient using standard ITTC-57 correlation line formulation.',
      status: 'coming-soon',
      category: 'Frictional Drag'
    },
    {
      id: 'total-resistance',
      name: 'Total Resistance Calculator',
      description: 'Combines frictional, wave-making, appendage, air, and correlation allowance components to compute total resistance.',
      status: 'coming-soon',
      category: 'Integrated Analysis'
    },
    {
      id: 'residuary',
      name: 'Residuary Resistance Calculator',
      description: 'Extracts viscous/wave residuary resistance elements from physical basin scaling tests.',
      status: 'coming-soon',
      category: 'Hydrodynamics'
    },
    {
      id: 'wave-resistance',
      name: 'Wave Resistance Calculator',
      description: 'Estimates wave-making and wave-breaking resistance utilizing Michell integral and slender-body theories.',
      status: 'coming-soon',
      category: 'Hydrodynamics'
    },
    {
      id: 'air-resistance',
      name: 'Air Resistance Calculator',
      description: 'Evaluates wind drag and superstructure aerodynamic resistance based on projected frontal area.',
      status: 'coming-soon',
      category: 'Aerodynamics'
    },
    {
      id: 'appendage',
      name: 'Appendage Resistance Calculator',
      description: 'Calculates additional drag penalties caused by rudders, shafting brackets, thrusters, and stabilizing fins.',
      status: 'coming-soon',
      category: 'Appendages'
    },
    {
      id: 'correlation',
      name: 'Correlation Allowance Calculator',
      description: 'Determines the model-ship correlation factor (CA) for surface roughness and scale adjustments.',
      status: 'coming-soon',
      category: 'Frictional Drag'
    },
    {
      id: 'form-factor',
      name: 'Form Factor (k) Calculator',
      description: 'Determines the Prohaska form factor coefficient (k) representing three-dimensional viscous pressure drag.',
      status: 'coming-soon',
      category: 'Viscous Drag'
    },
    {
      id: 'ehp-calc',
      name: 'Effective Horsepower (EHP) Calculator',
      description: 'Converts total hydrodynamic resistance drag directly into towing power outputs.',
      status: 'coming-soon',
      category: 'Power Sizing'
    }
  ];

  return (
    <>
      <Navbar isLoaded={true} />
      
      <main className="min-h-screen pt-32 pb-16 bg-background relative overflow-hidden flex flex-col items-center">
        {/* Blueprint background grid */}
        <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />
        <div className="absolute inset-0 blueprint-grid-fine opacity-5 pointer-events-none" />
        
        {/* Glowing ambient background elements */}
        <div className="absolute top-1/4 left-1/4 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-accent/10 filter blur-[90px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-accent/5 filter blur-[90px] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10 flex-1 flex flex-col">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 
              className="text-3xl sm:text-5xl md:text-6xl font-black tracking-widest uppercase text-white mb-4 drop-shadow-[0_0_15px_rgba(255,23,68,0.3)] font-mono"
            >
              Resistance Calculators
            </h1>
            <div className="h-1 w-24 bg-accent mx-auto mb-6" />
            <p className="text-xs sm:text-sm text-gray-400 font-mono tracking-wide uppercase">
              Hydrodynamic Resistance & Propulsion Sizing Suite
            </p>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {calculators.map((calc) => (
              <div 
                key={calc.id} 
                className="group relative rounded-2xl border border-border/80 bg-black/60 p-6 backdrop-blur-sm transition-all duration-300 hover:border-accent/50 hover:shadow-[0_0_30px_rgba(255,23,68,0.15)] flex flex-col justify-between"
              >
                {/* Category and Status Badge */}
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-gray-500 font-bold">
                    {calc.category}
                  </span>
                  {calc.status === 'active' ? (
                    <span className="text-[9px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                      Active
                    </span>
                  ) : (
                    <span className="text-[9px] uppercase font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold">
                      Coming Soon
                    </span>
                  )}
                </div>

                {/* Calculator Name & Description */}
                <div>
                  <h3 className="text-lg font-bold text-white mb-3 tracking-wide group-hover:text-accent transition-colors duration-300 font-mono">
                    {calc.name}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed mb-6">
                    {calc.description}
                  </p>
                </div>

                {/* Call to Action */}
                <div className="mt-auto">
                  {calc.status === 'active' && calc.path ? (
                    <a 
                      href={calc.path}
                      className="inline-flex w-full items-center justify-center py-2.5 rounded-xl bg-accent text-white font-mono text-xs uppercase tracking-widest font-bold border border-accent hover:bg-transparent hover:text-accent transition-all duration-300 cursor-pointer"
                    >
                      Open Calculator
                    </a>
                  ) : (
                    <button 
                      disabled
                      className="inline-flex w-full items-center justify-center py-2.5 rounded-xl bg-white/5 text-gray-600 font-mono text-xs uppercase tracking-widest font-bold border border-white/5 cursor-not-allowed"
                    >
                      Under Development
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
