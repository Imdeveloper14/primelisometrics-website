"use client";

import React, { useState } from 'react';

interface ContactProps {
  onOpenConsult: () => void;
}

export default function Contact({ onOpenConsult }: ContactProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 border-t border-[#111] overflow-hidden">
      <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-5xl mx-auto">
          
          {/* Left Column: Info & Details */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div>
              <span className="text-[11px] font-mono tracking-[0.25em] text-accent uppercase font-semibold block mb-2">Connect</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">Start a Project</h2>
              <p className="text-sm text-gray-400 leading-relaxed">
                Ready to partner with <strong>PRIMELISOMETRICS</strong>? Fill out the form to request a quote or schedule a design consultation.
              </p>
            </div>

            <div className="flex flex-col gap-4 mt-4">
              <a href="mailto:chandrunavalarch@gmail.com" className="flex items-center gap-4 bg-card-bg border border-border p-4 rounded-lg hover:border-accent/40 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                  <i className="ph ph-envelope text-lg"></i>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">Email</span>
                  <span className="text-xs font-bold text-white">chandrunavalarch@gmail.com</span>
                </div>
              </a>
              
              <a href="tel:+918072294717" className="flex items-center gap-4 bg-card-bg border border-border p-4 rounded-lg hover:border-accent/40 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                  <i className="ph ph-phone text-lg"></i>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">Phone</span>
                  <span className="text-xs font-bold text-white">+91 8072294717</span>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: Form Panel */}
          <div className="lg:col-span-7 bg-card-bg border border-border p-8 rounded-lg backdrop-blur-md relative overflow-hidden">
            
            {status === 'success' ? (
              <div className="text-center py-10 flex flex-col items-center gap-4">
                <i className="ph-fill ph-check-circle text-5xl text-green-500 shadow-[0_0_20px_rgba(34,197,94,0.3)] rounded-full"></i>
                <h4 className="text-lg font-bold text-white uppercase tracking-wider">Thank you!</h4>
                <p className="text-xs text-gray-400">Your quote request has been sent successfully.</p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="mt-4 px-6 py-2 border border-border hover:border-accent text-white text-xs font-mono uppercase tracking-widest rounded transition-all cursor-pointer"
                >
                  Submit Another
                </button>
              </div>
            ) : status === 'error' ? (
              <div className="text-center py-10 flex flex-col items-center gap-4">
                <i className="ph-fill ph-warning-circle text-5xl text-accent shadow-[0_0_20px_rgba(220,20,60,0.3)] rounded-full"></i>
                <h4 className="text-lg font-bold text-white uppercase tracking-wider">Something went wrong.</h4>
                <p className="text-xs text-gray-400">We couldn't send your request. Please contact me directly on WhatsApp.</p>
                <div className="flex flex-col gap-3 w-full max-w-xs mt-4">
                  <a 
                    href="https://wa.me/918072294717" 
                    target="_blank"
                    className="py-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs uppercase tracking-widest rounded transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_15px_rgba(37,211,102,0.25)]"
                  >
                    <i className="ph ph-whatsapp-logo text-base"></i> Connect on WhatsApp
                  </a>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="py-2 border border-border hover:border-white text-white text-xs font-mono uppercase tracking-widest rounded transition-all cursor-pointer"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            ) : (
              <form 
                id="contactForm"
                action="https://formspree.io/f/xykqyzna" 
                method="POST"
                onSubmit={handleSubmit}
                className="flex flex-col gap-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-[9px] font-mono text-gray-400 uppercase tracking-widest">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="Name" 
                      required 
                      placeholder="John Doe"
                      className="w-full px-4 py-3 bg-black border border-border focus:border-accent text-xs text-white rounded outline-none transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-[9px] font-mono text-gray-400 uppercase tracking-widest">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="Email" 
                      required 
                      placeholder="john@company.com"
                      className="w-full px-4 py-3 bg-black border border-border focus:border-accent text-xs text-white rounded outline-none transition-colors"
                    />
                  </div>
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="phone" className="text-[9px] font-mono text-gray-400 uppercase tracking-widest">Phone</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="Phone" 
                    required 
                    placeholder="+91 8072294717"
                    className="w-full px-4 py-3 bg-black border border-border focus:border-accent text-xs text-white rounded outline-none transition-colors"
                  />
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="projectType" className="text-[9px] font-mono text-gray-400 uppercase tracking-widest">Project Type</label>
                  <select 
                    id="projectType" 
                    name="Project_Type" 
                    required
                    defaultValue=""
                    className="w-full px-4 py-3 bg-black border border-border focus:border-accent text-xs text-white rounded outline-none transition-colors cursor-pointer"
                  >
                    <option value="" disabled>Select...</option>
                    <option value="mechanical-3d-modelling">Mechanical 3D Modelling</option>
                    <option value="marine-structure-design">Marine Structure Design</option>
                    <option value="marine-piping-design">Marine Piping Design</option>
                    <option value="civil-piping-design">Civil Piping Design</option>
                    <option value="civil-structure-modelling">Civil Structure Modelling</option>
                    <option value="barge-loadout-calculations">Barge Loadout Calculations</option>
                  </select>
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-[9px] font-mono text-gray-400 uppercase tracking-widest">Message</label>
                  <textarea 
                    id="message" 
                    name="Message" 
                    rows={4} 
                    required 
                    placeholder="Describe your project requirements..."
                    className="w-full px-4 py-3 bg-black border border-border focus:border-accent text-xs text-white rounded outline-none transition-colors resize-none"
                  ></textarea>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 mt-2">
                  <button 
                    type="submit" 
                    id="quoteSubmitBtn"
                    disabled={isSubmitting}
                    className="px-8 py-3.5 bg-accent hover:bg-accent-hover text-white font-bold text-xs uppercase tracking-widest rounded transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_15px_rgba(220,20,60,0.2)]"
                  >
                    {isSubmitting ? (
                      <>
                        <i className="ph ph-spinner ph-spin text-sm"></i> Sending...
                      </>
                    ) : (
                      'Request Quote'
                    )}
                  </button>
                  <button 
                    type="button" 
                    onClick={onOpenConsult}
                    className="px-8 py-3.5 bg-transparent border border-border hover:border-gray-500 text-white font-bold text-xs uppercase tracking-widest rounded transition-all duration-300 hover:bg-white/5 cursor-pointer"
                  >
                    Schedule Consultation
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}
