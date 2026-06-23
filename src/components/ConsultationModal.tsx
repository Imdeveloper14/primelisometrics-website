"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate network submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  const handleClose = () => {
    onClose();
    // Reset submission state after fade-out transition delay
    setTimeout(() => {
      setSubmitted(false);
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          onClick={handleClose}
          className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center p-4 backdrop-blur-md overflow-y-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#050505] border border-[#222] w-full max-w-lg rounded-lg overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.85)] max-h-[90vh] flex flex-col"
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b border-[#222] p-5 bg-black/60 shrink-0">
              <div className="flex flex-col gap-0.5 text-left">
                <h3 className="text-base font-bold text-white uppercase tracking-wider">Schedule a Free Consultation</h3>
                <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest leading-none">Discuss your project requirements</p>
              </div>
              <button 
                onClick={handleClose}
                className="text-gray-400 hover:text-white cursor-pointer"
              >
                <i className="ph ph-x text-lg"></i>
              </button>
            </div>

            {/* Scrollable Modal Content */}
            <div className="p-6 overflow-y-auto flex-1">
              {submitted ? (
                <div className="text-center py-10 flex flex-col items-center gap-4">
                  <i className="ph-fill ph-check-circle text-5xl text-green-500 shadow-[0_0_20px_rgba(34,197,94,0.3)] rounded-full"></i>
                  <h4 className="text-base font-bold text-white uppercase tracking-wider">Thank you!</h4>
                  <p className="text-xs text-gray-400 max-w-sm mx-auto leading-relaxed">
                    Your consultation request has been received. I will contact you shortly with a Google Meet link to confirm our meeting.
                  </p>
                  <button 
                    onClick={handleClose}
                    className="mt-6 px-6 py-2.5 bg-accent hover:bg-accent-hover text-white text-xs font-mono uppercase tracking-widest rounded transition-all cursor-pointer"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[9px] font-mono text-gray-400 uppercase tracking-widest">Full Name</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="John Doe"
                        className="w-full px-4 py-2.5 bg-black border border-border focus:border-accent text-xs text-white rounded outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[9px] font-mono text-gray-400 uppercase tracking-widest">Email Address</label>
                      <input 
                        type="email" 
                        required 
                        placeholder="john@company.com"
                        className="w-full px-4 py-2.5 bg-black border border-border focus:border-accent text-xs text-white rounded outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[9px] font-mono text-gray-400 uppercase tracking-widest">Company (Optional)</label>
                      <input 
                        type="text" 
                        placeholder="Acme Corp"
                        className="w-full px-4 py-2.5 bg-black border border-border focus:border-accent text-xs text-white rounded outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[9px] font-mono text-gray-400 uppercase tracking-widest">Project Type</label>
                      <select 
                        required
                        defaultValue=""
                        className="w-full px-4 py-2.5 bg-black border border-border focus:border-accent text-xs text-white rounded outline-none cursor-pointer"
                      >
                        <option value="" disabled>Select...</option>
                        <option value="product">Product Design</option>
                        <option value="cad">CAD Modeling</option>
                        <option value="drone">Drone/UAV Design</option>
                        <option value="mechanical">Mechanical Design</option>
                        <option value="rendering">3D Rendering</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[9px] font-mono text-gray-400 uppercase tracking-widest">Preferred Date</label>
                      <input 
                        type="date" 
                        required 
                        className="w-full px-4 py-2.5 bg-black border border-border focus:border-accent text-xs text-white rounded outline-none cursor-pointer"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[9px] font-mono text-gray-400 uppercase tracking-widest">Preferred Time</label>
                      <input 
                        type="time" 
                        required 
                        className="w-full px-4 py-2.5 bg-black border border-border focus:border-accent text-xs text-white rounded outline-none cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] font-mono text-gray-400 uppercase tracking-widest">Project Budget</label>
                    <select 
                      required
                      defaultValue=""
                      className="w-full px-4 py-2.5 bg-black border border-border focus:border-accent text-xs text-white rounded outline-none cursor-pointer"
                    >
                      <option value="" disabled>Select budget range...</option>
                      <option value="small">&lt; $1,000</option>
                      <option value="medium">$1,000 - $5,000</option>
                      <option value="large">$5,000+</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] font-mono text-gray-400 uppercase tracking-widest">Project Description</label>
                    <textarea 
                      rows={3} 
                      required 
                      placeholder="Briefly describe what you're trying to build..."
                      className="w-full px-4 py-2.5 bg-black border border-border focus:border-accent text-xs text-white rounded outline-none resize-none"
                    ></textarea>
                  </div>

                  <div className="flex flex-col gap-2 mt-4">
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full py-3 bg-accent hover:bg-accent-hover text-white text-xs font-mono font-bold uppercase tracking-widest rounded transition-all duration-300 cursor-pointer shadow-[0_4px_15px_rgba(220,20,60,0.2)]"
                    >
                      {isSubmitting ? (
                        <>
                          <i className="ph ph-spinner ph-spin text-sm"></i> Booking...
                        </>
                      ) : (
                        'Book Consultation'
                      )}
                    </button>
                    <button 
                      type="button" 
                      onClick={handleClose}
                      className="w-full py-3 bg-transparent border border-border hover:border-gray-500 text-white text-xs font-mono font-bold uppercase tracking-widest rounded transition-all duration-300 hover:bg-white/5 cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                  
                  {/* WhatsApp instant connect link */}
                  <div className="mt-4 pt-4 border-t border-[#111] text-center">
                    <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-3">Or connect instantly via</p>
                    <a 
                      href="https://wa.me/918072294717?text=Hello,%20I%20would%20like%20to%20discuss%20a%20project." 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs uppercase tracking-widest rounded transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_15px_rgba(37,211,102,0.15)]"
                    >
                      <i className="ph ph-whatsapp-logo text-base"></i> WhatsApp
                    </a>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
