"use client";

import React from 'react';

export default function Skills() {
  const softwareStack = [
    'Rhino 3D',
    'Grasshopper',
    'AutoCAD Plant 3D',
    'ShipConstructor',
    'Navisworks',
    'AutoCAD',
    'Maxsurf',
    'GHS',
    'Auto-Hydro',
    'Ansys Aqwa',
    'AutoCAD ReCap Pro',
  ];

  const coreServices = [
    '3D CAD Modeling',
    'Technical Drafting',
    'AutoCAD Plant 3D',
    'Pipe Design & Routing',
    'Marine System Design',
    'Ship Stability Support',
    'Civil Drafting',
    'Industrial Design Solutions',
    '3D Printable Models',
    'Production Drawings',
  ];

  return (
    <section id="skills" className="skills section bg-background-alt border-y border-[#151515] py-20 relative">
      <div className="absolute inset-0 blueprint-grid opacity-5 pointer-events-none" />
      
      <div className="container mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-[11px] font-mono tracking-[0.25em] text-accent uppercase font-semibold block mb-2">Capabilities</span>
          <h2 className="text-3xl font-extrabold text-white mb-2 tracking-tight">Technical Expertise</h2>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* Software Stack Card */}
          <div className="bg-card-bg border border-border p-6 rounded-lg backdrop-blur-md hover:border-accent/40 transition-all duration-300 group relative overflow-hidden">
            <div className="absolute inset-0 bg-radial from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded bg-accent/10 flex items-center justify-center text-accent">
                <i className="ph ph-cpu text-lg"></i>
              </div>
              <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">
                Software Stack
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {softwareStack.map((soft, idx) => (
                <span 
                  key={idx}
                  className="px-3 py-1 bg-black border border-border rounded text-[10px] font-mono text-gray-300 hover:border-accent hover:text-white transition-colors duration-300 cursor-default"
                >
                  {soft}
                </span>
              ))}
            </div>
          </div>

          {/* Core Services Card */}
          <div className="bg-card-bg border border-border p-6 rounded-lg backdrop-blur-md hover:border-accent/40 transition-all duration-300 group relative overflow-hidden">
            <div className="absolute inset-0 bg-radial from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded bg-accent/10 flex items-center justify-center text-accent">
                <i className="ph ph-pen-nib text-lg"></i>
              </div>
              <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">
                Core Services
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {coreServices.map((service, idx) => (
                <span 
                  key={idx}
                  className="px-3 py-1 bg-black border border-border rounded text-[10px] font-mono text-gray-300 hover:border-accent hover:text-white transition-colors duration-300 cursor-default"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
