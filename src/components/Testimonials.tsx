"use client";

import React from 'react';

export default function Testimonials() {
  const feedback = [
    {
      quote: "Excellent modeling accuracy and attention to detail.",
      author: "Aerospace Client",
    },
    {
      quote: "Delivered highly manufacturable CAD designs on time.",
      author: "Manufacturing Lead",
    },
    {
      quote: "Outstanding visualization and technical design understanding.",
      author: "Product Developer",
    },
  ];

  return (
    <section className="testimonials section bg-background-alt border-y border-[#151515] py-24 relative overflow-hidden">
      <div className="absolute inset-0 blueprint-grid opacity-5 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[11px] font-mono tracking-[0.25em] text-accent uppercase font-semibold block mb-2">Testimonials</span>
          <h2 className="text-3xl font-extrabold text-white mb-2 tracking-tight">Client Feedback</h2>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {feedback.map((item, idx) => (
            <div 
              key={idx}
              className="bg-card-bg border border-border p-8 rounded-lg backdrop-blur-md hover:border-accent/40 hover:shadow-[0_0_20px_rgba(220,20,60,0.1)] transition-all duration-300 relative flex flex-col justify-between"
            >
              <div>
                <i className="ph-fill ph-quotes text-accent text-3xl mb-4 block opacity-60"></i>
                <p className="text-sm text-gray-300 italic leading-relaxed mb-6">
                  "{item.quote}"
                </p>
              </div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-gray-500 font-bold border-t border-[#1a1a1a] pt-4">
                - {item.author}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
