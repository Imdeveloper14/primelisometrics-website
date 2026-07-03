"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface HeroProps {
  onOpenConsult: () => void;
  isLoaded?: boolean;
}

// Stats Counter Sub-component
function StatCounter({ target, label, suffix = "" }: { target: number; label: string; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000; // 2 seconds
    const startTime = performance.now();

    const updateCount = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out quad formula
      const easeProgress = progress * (2 - progress);
      const currentVal = Math.floor(easeProgress * target);
      
      setCount(currentVal);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(updateCount);
  }, [target]);

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-black/40 border border-white/5 rounded-2xl backdrop-blur-md hover:border-accent/30 transition-all duration-300">
      <div className="text-3xl md:text-5xl font-black text-white tracking-tight font-mono mb-2">
        <span className="text-gradient-red">{count}</span>{suffix}
      </div>
      <div className="text-xs uppercase font-mono tracking-widest text-gray-400 font-bold text-center">
        {label}
      </div>
    </div>
  );
}

export default function Hero({ onOpenConsult, isLoaded = true }: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Handle canvas animation (wireframe ship hull, fluid flows, and floating equations)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // Flow particles
    const particles: Array<{ x: number; y: number; speed: number; size: number; alpha: number }> = [];
    const maxParticles = 60;
    for (let i = 0; i < maxParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        speed: 0.5 + Math.random() * 1.5,
        size: 1 + Math.random() * 2,
        alpha: 0.1 + Math.random() * 0.4,
      });
    }

    // Equations to render
    const equations = [
      'R_T = R_F(1 + k_1) + R_{APP} + R_W + R_B + R_{TR} + R_A',
      'F_n = \\frac{V}{\\sqrt{g L}}',
      'R_e = \\frac{V L}{\\nu}',
      'C_F = \\frac{0.075}{(\\log_{10} R_e - 2)^2}',
      'P_E = R_T V',
      '\\nabla = L B T C_B'
    ];
    const equationObjects = equations.map((eq) => ({
      text: eq,
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      alpha: 0.05 + Math.random() * 0.12,
      fontSize: 10 + Math.floor(Math.random() * 4)
    }));

    // Animation Loop
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw grid backdrop
      ctx.strokeStyle = 'rgba(255, 23, 68, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 60;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. Draw animated flow lines & particles (fluid dynamics simulation)
      particles.forEach((p) => {
        p.x += p.speed;
        if (p.x > width) {
          p.x = 0;
          p.y = Math.random() * height;
        }

        // Draw particle flow path
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 23, 68, ${p.alpha})`;
        ctx.lineWidth = p.size;
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x - 30, p.y);
        ctx.stroke();

        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * 1.5})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // 3. Draw wireframe ship hull contours in the center/right area
      ctx.strokeStyle = 'rgba(255, 23, 68, 0.08)';
      ctx.lineWidth = 1.2;
      const hullCenterX = width * 0.72;
      const hullCenterY = height * 0.45;
      const hullScale = Math.min(width, height) * 0.28;

      if (width > 768) {
        // Water line representing the free surface
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255, 23, 68, 0.12)';
        ctx.moveTo(hullCenterX - hullScale * 1.5, hullCenterY - hullScale * 0.1);
        ctx.quadraticCurveTo(hullCenterX, hullCenterY - hullScale * 0.2, hullCenterX + hullScale * 1.5, hullCenterY - hullScale * 0.15);
        ctx.stroke();

        // Hull transverse station lines
        for (let i = -6; i <= 6; i++) {
          const offsetX = (i / 6) * hullScale * 1.2;
          const shrinkY = 1 - Math.abs(i / 6) * 0.4;
          ctx.beginPath();
          ctx.moveTo(hullCenterX + offsetX, hullCenterY - hullScale * 0.3);
          ctx.quadraticCurveTo(
            hullCenterX + offsetX - (i * 4), 
            hullCenterY + hullScale * 0.6 * shrinkY, 
            hullCenterX + offsetX - (i * 8), 
            hullCenterY + hullScale * 0.8 * shrinkY
          );
          ctx.stroke();
        }

        // Buttock / longitudinal waterline contours
        for (let j = -2; j <= 3; j++) {
          const offsetY = (j / 3) * hullScale * 0.5;
          ctx.beginPath();
          ctx.moveTo(hullCenterX - hullScale * 1.2, hullCenterY + offsetY);
          ctx.quadraticCurveTo(
            hullCenterX, 
            hullCenterY + offsetY + (j * 14) + 20, 
            hullCenterX + hullScale * 1.2, 
            hullCenterY + offsetY - 10
          );
          ctx.stroke();
        }
      }

      // 4. Draw floating mathematical equations
      equationObjects.forEach((eq) => {
        eq.x += eq.vx;
        eq.y += eq.vy;

        if (eq.x < 0 || eq.x > width) eq.vx *= -1;
        if (eq.y < 0 || eq.y > height) eq.vy *= -1;

        ctx.fillStyle = `rgba(255, 255, 255, ${eq.alpha})`;
        ctx.font = `${eq.fontSize}px 'Courier New', monospace`;
        ctx.fillText(eq.text, eq.x, eq.y);
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1] as const
      }
    }
  };

  const cards = [
    {
      icon: "⚓",
      title: "Marine Engineering",
      desc: "Hydrodynamic calculations, powering predictions, stability analysis, and vessel optimization."
    },
    {
      icon: "🚢",
      title: "Resistance Calculators",
      desc: "Professional calculators based on Insel & Molland, Savitsky, Holtrop & Mennen, Hollenbach, Delft Series, ITTC and more."
    },
    {
      icon: "📐",
      title: "Structural Design",
      desc: "Steel structures, scantlings, finite element support, and production-ready engineering."
    },
    {
      icon: "⚡",
      title: "Fast Digital Delivery",
      desc: "Cloud-based engineering tools with professional reports and export capabilities."
    }
  ];

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex flex-col pt-32 pb-16 overflow-hidden select-none bg-[#050505]"
      onMouseMove={handleMouseMove}
    >
      {/* Background Interactive canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none z-0" 
      />

      {/* Metallic Spotlight follow-mouse hover effect */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20 transition-opacity duration-300 z-1"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 23, 68, 0.15) 0%, rgba(255, 23, 68, 0.02) 60%, transparent 100%)`
        }}
      />

      <div className="container mx-auto px-6 relative z-10 flex-1 flex flex-col justify-center">
        
        {/* Headline Section */}
        <motion.div 
          className="max-w-4xl mx-auto text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
        >
          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white mb-6 leading-[1.1] font-mono uppercase"
          >
            Engineering Intelligence <br />
            <span className="text-gradient-red font-mono">For Marine Design</span>
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-base sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed font-sans"
          >
            Advanced Naval Architecture, Hydrodynamic Analysis, Structural Engineering, and AI-powered Marine Design Tools—all in one professional platform.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a 
              href="/calculators" 
              className="w-full sm:w-auto px-8 py-4 bg-accent hover:bg-accent/80 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_25px_rgba(255,23,68,0.3)] hover:shadow-[0_4px_35px_rgba(255,23,68,0.6)] hover:-translate-y-0.5 font-mono"
            >
              Explore Resistance Calculators <i className="ph ph-arrow-right font-bold text-sm"></i>
            </a>
            <a 
              href="#services" 
              className="w-full sm:w-auto px-8 py-4 bg-transparent border border-border hover:border-accent text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all duration-300 hover:bg-white/5 cursor-pointer font-mono"
            >
              View Engineering Services
            </a>
          </motion.div>
        </motion.div>

        {/* Statistics Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto w-full mb-20">
          <StatCounter target={50} label="Engineering Projects" suffix="+" />
          <StatCounter target={10} label="Engineering Tools" suffix="+" />
          <StatCounter target={9} label="Resistance Calculators" />
          <StatCounter target={100} label="Engineering Accuracy" suffix="%" />
        </div>

        {/* Premium Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl mx-auto mb-20">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              className="group relative p-6 rounded-2xl border border-white/5 bg-black/40 backdrop-blur-md transition-all duration-500 hover:border-accent/40 hover:shadow-[0_0_30px_rgba(255,23,68,0.12)] flex flex-col justify-between"
              initial={{ opacity: 0, y: 40 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + idx * 0.1, duration: 0.8 }}
            >
              <div>
                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300 ease-out">{card.icon}</div>
                <h3 className="text-lg font-bold font-mono text-white mb-2 group-hover:text-accent transition-colors duration-300">
                  {card.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed font-sans">{card.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust & Industry Section */}
        <div className="text-center w-full max-w-4xl mx-auto border-t border-white/5 pt-8 mb-12">
          <p className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-gray-500 font-bold mb-0">
            Trusted by Marine Engineers • Naval Architects • Shipyards • Offshore Industry
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="flex flex-col items-center justify-center gap-2 text-gray-500 hover:text-white transition-colors duration-300">
          <span className="text-[10px] font-mono tracking-widest uppercase font-bold">Scroll to Explore</span>
          <motion.div 
            animate={{ y: [0, 6, 0] }} 
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-accent text-sm cursor-pointer"
          >
            <i className="ph ph-arrow-down font-bold"></i>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
