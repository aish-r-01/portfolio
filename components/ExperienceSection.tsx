
import React from 'react';
import { experiences } from '../data';

const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-8 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="mb-12 reveal-on-scroll">
        <h2 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.5em] mb-4">Professional Path</h2>
        <p className="text-4xl md:text-5xl font-black text-zinc-950 tracking-tighter">Experience</p>
      </div>
      
      <div className="space-y-8 relative">
        {experiences.map((exp, idx) => (
          <div key={exp.id} className="grid grid-cols-1 md:grid-cols-4 gap-8 group reveal-on-scroll">
            <div className="md:col-span-1">
              <span className="text-[10px] font-black text-indigo-500 tracking-widest uppercase">{exp.period}</span>
            </div>
            <div className={`md:col-span-3 border-l-2 ${idx === 0 ? 'border-indigo-100' : 'border-zinc-50'} pl-8 pb-4 relative`}>
              {/* Animated node */}
              <div className={`absolute -left-[9px] top-2 w-4 h-4 rounded-full border-2 border-white bg-indigo-600 shadow-sm group-hover:scale-125 transition-transform`} />
              
              <h3 className="text-2xl font-black text-zinc-950 mb-1 transition-colors group-hover:text-indigo-600 leading-tight">{exp.role}</h3>
              <div className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-6 bg-indigo-50/50 inline-block px-2 py-1 rounded transition-all group-hover:bg-indigo-100">{exp.company}</div>
              <ul className="space-y-4">
                {exp.description.map((item, i) => (
                  <li key={i} className="flex gap-4 text-[13px] text-zinc-600 font-medium leading-relaxed transition-all duration-500 hover:translate-x-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-100 mt-1.5 flex-shrink-0 group-hover:bg-indigo-400 transition-colors" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExperienceSection;
