"use client";

import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer bg-background-alt border-t border-border/80 py-16 relative">
      <div className="absolute inset-0 blueprint-grid opacity-5 pointer-events-none" />
      
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start justify-between">
          
          {/* Brand Info */}
          <div className="md:col-span-6 flex flex-col gap-4">
            <a href="#" className="flex items-center gap-3">
              <img 
                src="images/logo.png" 
                alt="PRIMELISOMETRICS Logo" 
                className="w-12 h-auto object-contain filter drop-shadow-[0_0_8px_rgba(220,20,60,0.1)]"
                loading="lazy"
              />
              <span className="text-lg md:text-xl font-bold font-mono text-white tracking-[0.2em] uppercase">
                PRIMELISOMETRICS
              </span>
            </a>
            <p className="text-white font-extrabold font-mono text-xs uppercase tracking-widest mt-2">
              Engineering Beyond Limits
            </p>
            <p className="text-xs text-gray-500 max-w-sm leading-relaxed">
              PRIMELISOMETRICS is an advanced engineering platform focused on design, simulation, manufacturing, innovation, and engineering excellence.
            </p>
          </div>

          {/* Columns */}
          <div className="md:col-span-6 grid grid-cols-2 gap-8 md:justify-items-end">
            {/* Navigation Column */}
            <div className="flex flex-col gap-4">
              <h4 className="text-[10px] font-mono text-accent uppercase tracking-widest font-bold">Navigation</h4>
              <ul className="flex flex-col gap-2">
                <li>
                  <a href="#portfolio" className="text-xs text-gray-400 hover:text-white transition-colors uppercase font-mono tracking-wider">
                    Portfolio
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-xs text-gray-400 hover:text-white transition-colors uppercase font-mono tracking-wider">
                    Services
                  </a>
                </li>
              </ul>
            </div>

            {/* Connect Column */}
            <div className="flex flex-col gap-4">
              <h4 className="text-[10px] font-mono text-accent uppercase tracking-widest font-bold">Connect</h4>
              <ul className="flex flex-col gap-2">
                <li>
                  <a 
                    href="https://www.linkedin.com/in/chandrasekar-kumar-03662214a/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs text-gray-400 hover:text-white transition-colors uppercase font-mono tracking-wider"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="#" className="text-xs text-gray-400 hover:text-white transition-colors uppercase font-mono tracking-wider">
                    Behance
                  </a>
                </li>
                <li>
                  <a href="mailto:chandrunavalarch@gmail.com" className="text-xs text-gray-400 hover:text-white transition-colors uppercase font-mono tracking-wider">
                    Email
                  </a>
                </li>
              </ul>
            </div>
          </div>

        </div>

        <div className="border-t border-[#111] mt-12 pt-8 text-center flex flex-col justify-center items-center gap-2">
          <p className="text-[11px] font-mono text-white font-bold uppercase tracking-widest">
            PRIMELISOMETRICS &copy; 2025
          </p>
          <p className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">
            Engineering Beyond Limits
          </p>
        </div>

      </div>
    </footer>
  );
}
