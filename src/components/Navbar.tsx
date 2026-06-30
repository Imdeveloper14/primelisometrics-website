"use client";

import React, { useState, useEffect } from 'react';

interface NavbarProps {
  isLoaded?: boolean;
}

export default function Navbar({ isLoaded = true }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    let lastScrollTop = 0;

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Background transparency scrolled past 50px
      if (scrollTop > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide/Show navbar based on scroll direction
      if (!isOpen) {
        if (scrollTop <= 0) {
          setIsHidden(false);
        } else if (scrollTop > lastScrollTop && scrollTop > 80) {
          setIsHidden(true);
        } else if (scrollTop < lastScrollTop) {
          setIsHidden(false);
        }
      }
      lastScrollTop = scrollTop;

      // Scroll Spy for active navigation link
      const sections = ['home', 'about', 'services', 'portfolio', 'workflow', 'contact'];
      let current = 'home';
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const sectionTop = element.offsetTop;
          if (window.scrollY >= (sectionTop - 180)) {
            current = sectionId;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);

    // Detect when footer enters the viewport to hide the header
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsFooterVisible(entry.isIntersecting);
        });
      },
      { root: null, threshold: 0 }
    );

    const footer = document.querySelector('footer');
    if (footer) {
      observer.observe(footer);
    }

    // Set initial active section based on current path
    const path = window.location.pathname;
    if (path.includes('/calculators') || path.includes('/calculator') || path.includes('/savitsky-calculator')) {
      setActiveSection('calculators');
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (footer) {
        observer.unobserve(footer);
      }
    };
  }, [isOpen]);

  const navLinks = [
    { href: '/#home', label: 'Home', id: 'home' },
    { href: '/#about', label: 'About', id: 'about' },
    { href: '/#services', label: 'Services', id: 'services' },
    { href: '/#portfolio', label: 'Portfolio', id: 'portfolio' },
    { href: '/#workflow', label: 'Workflow', id: 'workflow' },
    { href: '/#contact', label: 'Contact', id: 'contact' },
    { href: '/calculators', label: 'Resistance Calculators', id: 'calculators' },
  ];

  return (
    <header 
      id="navbar"
      className={`fixed top-0 left-0 w-full py-4 z-50 transition-all duration-500 border-b ${
        isScrolled 
          ? 'bg-black/85 backdrop-blur-md border-border/80 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' 
          : 'bg-transparent border-transparent'
      } ${
        isHidden ? '-translate-y-full' : 'translate-y-0'
      } ${
        !isLoaded ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
      } ${
        isFooterVisible ? 'header-hidden' : ''
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a href="/#home" className="flex items-center">
          <img 
            src="/images/logo.png" 
            alt="Primelisometrics Logo" 
            className="h-16 md:h-[96px] w-auto max-w-[420px] object-contain transition-all duration-300 filter drop-shadow-[0_0_10px_rgba(220,20,60,0.15)]"
          />
        </a>

        {/* Desktop Menu */}
        <nav className="hidden md:block" aria-label="Main Navigation">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a 
                  href={link.href}
                  className={`text-xs uppercase tracking-widest font-semibold font-mono hover:text-white transition-colors duration-300 ${
                    activeSection === link.id ? 'text-accent border-b border-accent pb-1' : 'text-gray-400'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Toggle Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white hover:text-accent transition-colors cursor-pointer z-[1002]"
          aria-label="Toggle navigation"
        >
          <i className={`ph font-bold text-2xl ${isOpen ? 'ph-x' : 'ph-list'}`}></i>
        </button>

        {/* Mobile Menu Overlay Drawer */}
        <nav 
          id="nav-links"
          className={`fixed top-0 right-0 w-4/5 max-w-[320px] h-screen bg-[#050505] border-l border-border p-8 pt-24 transition-all duration-300 z-[1001] shadow-[0_0_40px_rgba(0,0,0,0.8)] ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          aria-label="Mobile Navigation"
        >
          <div className="mb-10 flex justify-start">
            <img 
              src="/images/logo.png" 
              alt="Primelisometrics Logo" 
              className="h-20 w-auto object-contain filter drop-shadow-[0_0_10px_rgba(220,20,60,0.15)]"
            />
          </div>
          <ul className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a 
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-sm uppercase tracking-widest font-bold font-mono block py-2 hover:text-white border-b border-[#111] ${
                    activeSection === link.id ? 'text-accent' : 'text-gray-400'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
