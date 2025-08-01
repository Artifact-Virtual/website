import React, { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import PatternLines from '../components/PatternLines';

function getSystemTheme() {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    return 'light';
  }
  return 'dark';
}

const Index = () => {
  const [theme, setTheme] = useState(getSystemTheme());

  useEffect(() => {
    const listener = (e) => setTheme(e.matches ? 'light' : 'dark');
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', listener);
    return () => window.matchMedia('(prefers-color-scheme: light)').removeEventListener('change', listener);
  }, []);

  return (
    <div className="min-h-screen relative overflow-y-auto font-precision bg-black text-white">
      {/* Subtle pattern lines background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
        <PatternLines />
      </div>
      {/* Main content */}
      <div className="relative z-10">
        <div id="hero">
          <HeroSection />
        </div>

        {/* Full-screen, responsive welcome section */}
        <section className="w-full min-h-screen flex items-center justify-center fade-in-section transition-all duration-700">
          <h1
            className="arc0-welcome text-5xl md:text-7xl font-light font-precision tracking-ultra-wide text-center text-white select-none"
            id="arc0-welcome"
          >
            WELCOME TO ARC:0
          </h1>
        </section>
      </div>
      <style>{`
        .fade-in-section {
          opacity: 0;
          transform: translateY(40px);
          animation: fadeInUp 1s cubic-bezier(0.23, 1, 0.32, 1) forwards;
        }
        .fade-in-section:nth-of-type(1) { animation-delay: 0.1s; }
        .fade-in-section:nth-of-type(2) { animation-delay: 0.2s; }
        .fade-in-section:nth-of-type(3) { animation-delay: 0.3s; }
        .fade-in-section:nth-of-type(4) { animation-delay: 0.4s; }
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: none;
          }
        }

        /* ARC:0 Welcome Section Custom Styles */
        .arc0-welcome {
          font-family: 'Inter', 'JetBrains Mono', 'SF Mono', 'monospace', system-ui, sans-serif;
          font-weight: 300;
          letter-spacing: 0.18em;
          background: linear-gradient(90deg, #fff 60%, #b3b3b3 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
          filter: blur(0.2px) brightness(1.08);
          text-shadow: 0 2px 24px rgba(255,255,255,0.08);
        }
      `}</style>
    </div>
  );
};

export default Index;
