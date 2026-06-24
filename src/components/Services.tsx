"use client";

import React from 'react';

export default function Services() {
  const servicesList = [
    {
      title: 'Engineering Design',
      desc: 'Comprehensive engineering design and stability assessments for marine, commercial, and industrial installations.',
      icon: 'ph-compass',
    },
    {
      title: 'CAD Modeling',
      desc: 'Accurate 3D CAD modeling and digital engineering for assemblies, prototypes, and complex equipment.',
      icon: 'ph-cube',
    },
    {
      title: 'Product Development',
      desc: 'Complete product development support, transitioning concepts into production-ready physical prototypes.',
      icon: 'ph-lightbulb',
    },
    {
      title: 'Simulation Engineering',
      desc: 'Advanced simulation engineering, FEA, and fluid dynamic assessments to validate structural design integrity.',
      icon: 'ph-cpu',
    },
    {
      title: 'Manufacturing Solutions',
      desc: 'Delivering detailed spool layouts, isometrics, and smart manufacturing solutions for fabrication shops.',
      icon: 'ph-flow-arrow',
    },
    {
      title: 'Industrial Engineering',
      desc: 'Industrial engineering design, workflow optimization, and system layouts for plants and workspaces.',
      icon: 'ph-factory',
    },
    {
      title: 'Design Optimization',
      desc: 'Strategic design optimization to minimize material usage, reduce drag, and improve structural efficiency.',
      icon: 'ph-chart-line-up',
    },
    {
      title: 'Digital Engineering',
      desc: 'High-fidelity digital engineering, 3D laser scan conversions, and reverse engineering modeling services.',
      icon: 'ph-graph',
    },
  ];

  return (
    <section id="services" className="relative py-24 bg-gradient-to-b from-background-alt to-black">
      <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[11px] font-mono tracking-[0.25em] text-accent uppercase font-semibold block mb-2">Services</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">What I Offer</h2>
          <p className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto leading-relaxed">
            As a Freelance CAD Specialist, I provide flexible and cost-effective design support for businesses, consultants, engineering teams, manufacturers, and project contractors.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesList.map((service, i) => (
            <div 
              key={i}
              className="bg-card-bg border border-border p-8 rounded-lg flex flex-col gap-4 hover:border-accent hover:shadow-[0_0_25px_rgba(220,20,60,0.2)] hover:-translate-y-1 transition-all duration-500 backdrop-blur-md relative overflow-hidden group"
            >
              {/* Technical Blueprint Overlay */}
              <div className="absolute inset-0 blueprint-grid-fine opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none" />
              
              {/* Red glow border animation */}
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

              {/* Service Icon */}
              <div className="w-12 h-12 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent transition-all duration-300 group-hover:bg-accent group-hover:text-white group-hover:shadow-[0_0_15px_rgba(220,20,60,0.4)]">
                <i className={`ph ${service.icon} text-2xl`}></i>
              </div>

              {/* Service Title */}
              <h3 className="text-lg font-bold text-white uppercase tracking-wider group-hover:text-accent transition-colors duration-300">
                {service.title}
              </h3>

              {/* Service Description */}
              <p className="text-xs text-gray-400 leading-relaxed">
                {service.desc}
              </p>

              {/* Small corner detail graphic */}
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-gray-700 m-4 group-hover:border-accent transition-colors duration-300" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
