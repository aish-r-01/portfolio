
import React from 'react';
import { profile } from '../data';
import { Linkedin, Github, ArrowRight, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const handleResumeDownload = (e: React.MouseEvent<HTMLAnchorElement>) => {
    console.log("Initiating resume download...");
  };

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
    <footer id="contact" className="pt-12 pb-12 bg-white border-t border-zinc-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Compact CTA Section */}
        <div className="mb-16">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-12">
            <div className="space-y-4 reveal-on-scroll">
              <span className="text-[11px] font-black uppercase tracking-[0.5em] text-zinc-400">Collaborations</span>
              <h2 className="text-4xl lg:text-6xl font-black tracking-tighter text-zinc-950 leading-[0.85]">
                Let's <br /><span className="text-zinc-200">Connect.</span>
              </h2>
            </div>
            
            <button 
              onClick={(e) => handleScrollTo(e, 'contact-form')}
              className="group flex flex-col items-start gap-6 text-left reveal-on-scroll"
            >
              <div className="w-20 h-20 rounded-[2rem] bg-zinc-950 flex items-center justify-center group-hover:bg-indigo-600 transition-all duration-700 shadow-lg shadow-zinc-100 group-hover:rotate-6 group-hover:scale-105">
                <ArrowRight size={28} className="text-white transition-transform group-hover:translate-x-2" />
              </div>
              <div>
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-950">Initiate Contact</span>
                <div className="h-[2px] w-full bg-zinc-950 mt-2 scale-x-100 transition-colors group-hover:bg-indigo-600" />
              </div>
            </button>
          </div>

          {/* Upgraded Connect Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 reveal-on-scroll">
            <a 
              href={profile.socials.linkedin} 
              target="_blank" 
              className="group relative h-48 bg-white border-2 border-zinc-50 rounded-[2.5rem] p-8 flex flex-col justify-between hover:border-zinc-950 transition-all duration-700 shadow-sm hover:shadow-lg hover:shadow-zinc-100"
            >
              <div className="flex justify-between items-start">
                <div className="p-3 bg-zinc-50 text-zinc-950 rounded-xl group-hover:bg-zinc-950 group-hover:text-white transition-all duration-500">
                  <Linkedin size={20} />
                </div>
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-300 block mb-1">Platform</span>
                <span className="text-xl font-black text-zinc-950 uppercase tracking-tighter">LinkedIn</span>
              </div>
            </a>
            
            <a 
              href={profile.socials.github} 
              target="_blank" 
              className="group relative h-48 bg-white border-2 border-zinc-50 rounded-[2.5rem] p-8 flex flex-col justify-between hover:border-zinc-950 transition-all duration-700 shadow-sm hover:shadow-lg hover:shadow-zinc-100"
            >
              <div className="flex justify-between items-start">
                <div className="p-3 bg-zinc-50 text-zinc-950 rounded-xl group-hover:bg-zinc-950 group-hover:text-white transition-all duration-500">
                  <Github size={20} />
                </div>
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-300 block mb-1">Development</span>
                <span className="text-xl font-black text-zinc-950 uppercase tracking-tighter">GitHub</span>
              </div>
            </a>

            <div className="group relative h-48 bg-zinc-50 border-2 border-transparent rounded-[2.5rem] p-8 flex flex-col justify-between transition-all duration-700">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-white text-zinc-950 rounded-xl shadow-sm">
                  <MapPin size={20} />
                </div>
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-300 block mb-1">Location</span>
                <span className="text-xl font-black text-zinc-950 uppercase tracking-tighter">{profile.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-10 pt-12 border-t-2 border-zinc-50">
          <div className="flex items-center gap-8">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-200">© 2025</span>
            <div className="flex items-center gap-4 group cursor-pointer" onClick={(e) => handleScrollTo(e, 'hero')}>
               <div className="w-8 h-8 bg-zinc-950 rounded-lg flex items-center justify-center transition-all group-hover:bg-indigo-600">
                  <span className="text-[9px] font-black text-white">AR</span>
               </div>
               <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-950 group-hover:text-indigo-600 transition-colors">{profile.name}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-10">
            <a 
              href="/resume.pdf" 
              download="Aishwarya_R_Resume.pdf"
              onClick={handleResumeDownload}
              className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-950 hover:text-indigo-600 transition-colors relative group"
            >
              Resume
              <span className="absolute -bottom-2 left-0 w-full h-[1.5px] bg-indigo-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </a>
            <div className="h-5 w-[1.5px] bg-zinc-100 hidden md:block"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-300 hidden lg:block">Chennai, India</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
