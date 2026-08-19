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
  version?: string;
  vesselType?: string;
  speedRange?: string;
  accuracy?: string;
  guideUrl?: string;
}

export default function CalculatorsHubPage() {
  const calculators: CalculatorInfo[] = [
    {
      id: 'william-froude',
      name: 'William Froude Resistance & Powering Calculator',
      description: 'Auditable model-to-ship resistance extrapolation and effective/installed power prediction based on Froude scaling and ITTC protocols.',
      status: 'active',
      path: '/william-froude-calculator',
      category: 'General Displacement',
      version: 'v2.0.0',
      vesselType: 'Displacement Ships & Models',
      speedRange: 'All speeds (Fn < 0.45 recommended)',
      accuracy: 'Empirical Extrapolation Baseline'
    },
    {
      id: 'holtrop-mennen',
      name: 'Holtrop & Mennen Resistance Calculator',
      description: 'Power prediction method for displacement ships based on regression analysis of model test results and full-scale data.',
      status: 'active',
      path: '/holtrop-calculator',
      category: 'Displacement Hull',
      version: 'v1.0.0',
      vesselType: 'Displacement Vessels',
      speedRange: 'Displacement / Moderate (Fn < 0.45)',
      accuracy: 'Statistical Regression Baseline'
    },
    {
      id: 'savitsky',
      name: 'Savitsky Planing Hull Calculator',
      description: 'Resistance, EHP, BHP, required power, and marine diesel engine matching for planing hulls using the Daniel Savitsky method.',
      status: 'active',
      path: '/savitsky-calculator',
      category: 'Planing Hulls',
      version: 'v1.0.0',
      vesselType: 'High-Speed Planing',
      speedRange: 'Planing (Fn > 1.0)',
      accuracy: 'Empirical Planing Standard'
    },
    {
      id: 'insel-molland',
      name: 'Insel & Molland Catamaran Calculator',
      description: 'Resistance, EHP, BHP, and propulsion-engine matching for catamaran hulls using an Insel & Molland-style interference structure.',
      status: 'active',
      path: '/calculator',
      category: 'Catamarans',
      version: 'v1.0.0',
      vesselType: 'Catamarans & Multi-hulls',
      speedRange: 'Subcritical–Supercritical',
      accuracy: 'Semi-Empirical (Interference)'
    },
    {
      id: 'michell-theory',
      name: 'John H. Michell Theory',
      description: 'Theoretical wave resistance calculations based on thin-ship theory, integrated with empirical friction coefficients.',
      status: 'coming-soon',
      category: 'Slender Ships',
      version: 'v1.0.0',
      vesselType: 'Slender Ships',
      speedRange: 'Low–Moderate',
      accuracy: 'Analytical'
    },
    {
      id: 'lazauskas-michell',
      name: 'Leo Lazauskas / Michell-based',
      description: 'Advanced numerical wave resistance and trim evaluation tailored for slender monohulls and catamaran designs.',
      status: 'coming-soon',
      category: 'Slender Hulls',
      version: 'v1.0.0',
      vesselType: 'Slender Hulls',
      speedRange: 'Moderate–High',
      accuracy: 'Numerical High-Fi'
    },
    {
      id: 'hollenbach',
      name: 'Hollenbach Resistance Calculator',
      description: 'Modern regression-based estimation method for single-screw cargo vessels and tankers.',
      status: 'coming-soon',
      category: 'Merchant Ships',
      version: 'v1.0.0',
      vesselType: 'Cargo Vessels & Tankers',
      speedRange: 'Moderate',
      accuracy: 'Statistical Regression'
    },
    {
      id: 'delft-series',
      name: 'Delft Series Resistance Calculator',
      description: 'Systematic yacht hull series analysis for sailing vessels and keel resistance profiles.',
      status: 'coming-soon',
      category: 'Sailing Yachts',
      version: 'v1.0.0',
      vesselType: 'Sailing Yachts',
      speedRange: 'Low–Moderate',
      accuracy: 'Series Regression'
    },
    {
      id: 'ittc-friction',
      name: 'ITTC Frictional Resistance Calculator',
      description: 'Calculates the frictional resistance coefficient using standard ITTC-57 correlation line formulation.',
      status: 'coming-soon',
      category: 'Frictional Drag',
      version: 'v1.0.0',
      vesselType: 'All Hulls',
      speedRange: 'All speeds',
      accuracy: 'Standard ITTC-57'
    },
    {
      id: 'total-resistance',
      name: 'Total Resistance Calculator',
      description: 'Combines frictional, wave-making, appendage, air, and correlation allowance components to compute total resistance.',
      status: 'coming-soon',
      category: 'Integrated Analysis',
      version: 'v1.0.0',
      vesselType: 'Generic Vessels',
      speedRange: 'All speeds',
      accuracy: 'Multi-Component'
    },
    {
      id: 'residuary',
      name: 'Residuary Resistance Calculator',
      description: 'Extracts viscous/wave residuary resistance elements from physical basin scaling tests.',
      status: 'coming-soon',
      category: 'Hydrodynamics',
      version: 'v1.0.0',
      vesselType: 'Towing Tank Models',
      speedRange: 'Tank Test Speeds',
      accuracy: 'Froude Decomposition'
    },
    {
      id: 'wave-resistance',
      name: 'Wave Resistance Calculator',
      description: 'Estimates wave-making and wave-breaking resistance utilizing Michell integral and slender-body theories.',
      status: 'coming-soon',
      category: 'Hydrodynamics',
      version: 'v1.0.0',
      vesselType: 'Slender & Fine Forms',
      speedRange: 'Fn 0.15 - 0.60',
      accuracy: 'Wave Pattern Integral'
    },
    {
      id: 'air-resistance',
      name: 'Air Resistance Calculator',
      description: 'Evaluates wind drag and superstructure aerodynamic resistance based on projected frontal area.',
      status: 'coming-soon',
      category: 'Aerodynamics',
      version: 'v1.0.0',
      vesselType: 'All Vessels with Superstructure',
      speedRange: 'All speeds & winds',
      accuracy: 'Aerodynamic Drag'
    },
    {
      id: 'appendage',
      name: 'Appendage Resistance Calculator',
      description: 'Calculates additional drag penalties caused by rudders, shafting brackets, thrusters, and stabilizing fins.',
      status: 'coming-soon',
      category: 'Appendages',
      version: 'v1.0.0',
      vesselType: 'All Appendaged Ships',
      speedRange: 'All speeds',
      accuracy: 'Empirical ITTC / Holtrop'
    },
    {
      id: 'correlation',
      name: 'Correlation Allowance Calculator',
      description: 'Determines the model-ship correlation factor (CA) for surface roughness and scale adjustments.',
      status: 'coming-soon',
      category: 'Frictional Drag',
      version: 'v1.0.0',
      vesselType: 'Full Scale Ships',
      speedRange: 'Design speeds',
      accuracy: 'ITTC-78 / Bowden-Davison'
    },
    {
      id: 'form-factor',
      name: 'Form Factor (k) Calculator',
      description: 'Determines the Prohaska form factor coefficient (k) representing three-dimensional viscous pressure drag.',
      status: 'coming-soon',
      category: 'Viscous Drag',
      version: 'v1.0.0',
      vesselType: '3D Ship Hulls',
      speedRange: 'Low Fn (0.10 - 0.22)',
      accuracy: 'Prohaska Method'
    },
    {
      id: 'ehp-calc',
      name: 'Effective Horsepower (EHP) Calculator',
      description: 'Converts total hydrodynamic resistance drag directly into towing power outputs.',
      status: 'coming-soon',
      category: 'Power Sizing',
      version: 'v1.0.0',
      vesselType: 'All Marine Craft',
      speedRange: 'All operational speeds',
      accuracy: 'Direct Mechanical EHP'
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
                {/* Category, Version and Status Badge */}
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-gray-500 font-bold">
                      {calc.category}
                    </span>
                    {calc.version && (
                      <span className="text-[9px] font-mono text-gray-600">
                        {calc.version}
                      </span>
                    )}
                  </div>
                  {calc.status === 'active' ? (
                    <span className="text-[9px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold tracking-wider">
                      Active
                    </span>
                  ) : (
                    <span className="text-[9px] uppercase font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold tracking-wider">
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

                  {/* Metadata Specs (Vessel Type, Speed Range, Accuracy) */}
                  {(calc.vesselType || calc.speedRange || calc.accuracy) && (
                    <div className="mb-6 space-y-2 border-t border-white/5 pt-4 text-[11px] font-mono">
                      {calc.vesselType && (
                        <div className="flex justify-between items-center text-gray-400">
                          <span className="text-gray-500">Vessel Type</span>
                          <span className="text-gray-300 text-right">{calc.vesselType}</span>
                        </div>
                      )}
                      {calc.speedRange && (
                        <div className="flex justify-between items-center text-gray-400">
                          <span className="text-gray-500">Speed Range</span>
                          <span className="text-gray-300 text-right">{calc.speedRange}</span>
                        </div>
                      )}
                      {calc.accuracy && (
                        <div className="flex justify-between items-center text-gray-400">
                          <span className="text-gray-500">Accuracy</span>
                          <span className="text-gray-300 text-right">{calc.accuracy}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Call to Action & Technical Guide */}
                <div className="mt-auto pt-2 flex flex-col items-center gap-2">
                  {calc.status === 'active' && calc.path ? (
                    <>
                      <a 
                        href={calc.path}
                        className="inline-flex w-full items-center justify-center py-2.5 rounded-xl bg-accent text-white font-mono text-xs uppercase tracking-widest font-bold border border-accent hover:bg-transparent hover:text-accent transition-all duration-300 cursor-pointer shadow-[0_0_15px_rgba(255,23,68,0.2)]"
                      >
                        Open Calculator &rarr;
                      </a>
                      <a 
                        href={calc.path} 
                        className="text-[11px] font-mono text-gray-500 hover:text-gray-300 transition-colors flex items-center gap-1.5 py-1"
                      >
                        <i className="ph ph-book-open"></i> Technical Guide
                      </a>
                    </>
                  ) : (
                    <>
                      <button 
                        disabled
                        className="inline-flex w-full items-center justify-center py-2.5 rounded-xl bg-white/5 text-gray-600 font-mono text-xs uppercase tracking-widest font-bold border border-white/5 cursor-not-allowed"
                      >
                        Under Development
                      </button>
                      <span className="text-[11px] font-mono text-gray-600 flex items-center gap-1.5 py-1 select-none">
                        <i className="ph ph-book-open"></i> Technical Guide
                      </span>
                    </>
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
