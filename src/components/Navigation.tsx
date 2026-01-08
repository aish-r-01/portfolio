
import React, { useState, useEffect } from 'react';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(currentProgress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'About', href: 'about' },
    { name: 'Work', href: 'experience' },
    { name: 'Projects', href: 'projects' },
    { name: 'Research', href: 'publications' },
    { name: 'Contact', href: 'contact-form' },
  ];

  const handleScrollTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setIsOpen(false);
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
    <>
      <div className="fixed top-0 left-0 h-[2px] bg-gradient-to-r from-indigo-500 to-cyan-400 z-[60] transition-all duration-300" style={{ width: `${scrollProgress}%` }} />
      
      <nav className={`fixed top-8 left-0 right-0 z-50 px-6 transition-all duration-700 ease-in-out`}>
        <div className={`mx-auto max-w-5xl flex items-center justify-between p-1 rounded-2xl border transition-all duration-700 ${
          scrolled 
            ? 'bg-white/80 backdrop-blur-xl border-zinc-200 shadow-[0_8px_32px_rgba(0,0,0,0.04)]' 
            : 'bg-white/30 backdrop-blur-sm border-white/20'
        }`}>
          {/* Logo */}
          <div className="flex items-center pl-3 cursor-pointer group" onClick={(e) => handleScrollTo(e, 'hero')}>
            <div className="w-9 h-9 bg-zinc-950 rounded-xl shadow-lg group-hover:rotate-[10deg] group-hover:scale-105 group-hover:bg-indigo-600 transition-all duration-500 flex items-center justify-center">
               <span className="text-[11px] text-white font-black tracking-tighter">AR</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={(e) => handleScrollTo(e, item.href)}
                className="px-4 py-2 text-[10px] font-bold text-zinc-400 hover:text-indigo-600 transition-all uppercase tracking-[0.2em] relative group"
              >
                {item.name}
                <span className="absolute bottom-1 left-4 right-4 h-[1.5px] bg-indigo-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1">
            <button
              onClick={(e) => handleScrollTo(e, 'chat')}
              className="px-5 py-2.5 text-[9px] font-black bg-gradient-to-br from-indigo-600 to-indigo-700 text-white rounded-xl hover:shadow-lg hover:shadow-indigo-200 transition-all uppercase tracking-widest active:scale-95 animate-breathe"
            >
              Ask AI
            </button>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-zinc-400 hover:text-zinc-950 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6" : "M4 6h16M4 12h16"} />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 transition-all duration-700 bg-white/95 backdrop-blur-2xl ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="h-full flex flex-col items-center justify-center gap-8">
          {navItems.map((item, i) => (
            <button
              key={item.name}
              onClick={(e) => handleScrollTo(e, item.href)}
              className={`text-3xl font-black text-zinc-950 uppercase tracking-tighter transition-all duration-500 ${isOpen ? 'translate-y-0 opacity-100 text-indigo-600' : 'translate-y-4 opacity-0'}`}
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {item.name}
            </button>
          ))}
          <button 
            onClick={() => setIsOpen(false)}
            className="mt-8 p-4 bg-zinc-100 rounded-full text-zinc-400 hover:bg-zinc-200 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default Navigation;