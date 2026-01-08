
import React from 'react';
import { profile } from '../data';

const Hero: React.FC = () => {
  const handleScrollTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="hero" className="min-h-[90vh] flex flex-col items-center justify-center px-4 md:px-8 relative bg-transparent">
      {/* Localized soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-100/20 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl text-center z-10 px-4">
        <h1 className="text-[12vw] md:text-[7rem] font-black mb-8 tracking-tighter leading-[0.85] text-zinc-950 select-none pb-4 animate-reveal">
          Aishwarya<br />
          <span className="text-zinc-200 hover:text-indigo-600 transition-all duration-700 cursor-default">R.</span>
        </h1>
        <p className="text-[10px] md:text-xs text-zinc-500 font-bold uppercase tracking-[0.5em] mb-12 animate-reveal [animation-delay:200ms]">
          {profile.tagline}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-reveal [animation-delay:400ms]">
          <button
            onClick={(e) => handleScrollTo(e, 'projects')}
            className="px-10 py-5 bg-zinc-950 text-white font-black text-[11px] uppercase tracking-widest rounded-2xl hover:bg-indigo-600 transition-all active:scale-95 shadow-xl shadow-indigo-100/20"
          >
            Explore Projects
          </button>
          <button
            onClick={(e) => handleScrollTo(e, 'about')}
            className="px-10 py-5 border-2 border-zinc-100 text-zinc-950 font-black text-[11px] uppercase tracking-widest rounded-2xl hover:bg-white hover:border-zinc-950 transition-all active:scale-95"
          >
            Technical Bio
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
