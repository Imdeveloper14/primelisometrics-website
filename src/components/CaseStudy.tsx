"use client";

import React from 'react';

export default function CaseStudy() {
  return (
    <section className="featured-project section bg-background-alt py-24 border-t border-[#111] relative overflow-hidden">
      <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 left-3/4 -translate-y-1/2 w-80 h-80 bg-accent/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6">
        <div className="bg-card-bg border border-border p-8 md:p-12 rounded-xl backdrop-blur-md relative overflow-hidden max-w-5xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Image side */}
            <div className="lg:col-span-6 relative aspect-video rounded-lg overflow-hidden border border-[#222]">
              <img 
                src="images/drone1.png" 
                alt="UAV Hero" 
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute bottom-4 left-4 flex gap-4 backdrop-blur-md bg-black/60 border border-[#333] p-3 rounded shadow-lg">
                <div className="flex flex-col">
                  <span className="text-[8px] font-mono text-gray-500 uppercase tracking-widest">Weight</span>
                  <span className="text-xs font-bold text-white">1.2 kg</span>
                </div>
                <div className="w-[1px] bg-[#333] self-stretch" />
                <div className="flex flex-col">
                  <span className="text-[8px] font-mono text-gray-500 uppercase tracking-widest">Material</span>
                  <span className="text-xs font-bold text-white">Carbon Fiber</span>
                </div>
              </div>
            </div>

            {/* Content side */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              <div>
                <span className="text-[11px] font-mono tracking-[0.25em] text-accent uppercase font-semibold block mb-2">Featured Case Study</span>
                <h2 className="text-3xl font-extrabold text-white mb-4 tracking-tight">UAV Development Concept</h2>
                <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
                  A deep dive into the design process of a high-performance, modular UAV system built for challenging environments.
                </p>
              </div>

              <div className="bg-black/60 border border-border p-5 rounded-lg flex items-start gap-4 hover:border-accent/40 transition-colors duration-300">
                <div className="w-8 h-8 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0 mt-1">
                  <i className="ph ph-warning-circle text-lg"></i>
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">
                    Design Challenge
                  </h4>
                  <p className="text-[11px] text-gray-400 leading-relaxed">
                    Optimizing thrust-to-weight ratio while maintaining structural rigidity for payload mounting.
                  </p>
                </div>
              </div>

              <div className="flex justify-start">
                <a 
                  href="#" 
                  className="px-6 py-3 border border-border hover:border-accent text-white font-bold text-xs uppercase tracking-widest rounded transition-all duration-300 hover:bg-accent/5 cursor-pointer shadow-[0_4px_15px_rgba(0,0,0,0.3)] hover:-translate-y-0.5"
                >
                  View Full Case Study
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
