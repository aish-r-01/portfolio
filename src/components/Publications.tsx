
import React from 'react';
import { publications } from '../../data';

const Publications: React.FC = () => {
  return (
    <section id="publications" className="py-8 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="mb-12 reveal-on-scroll">
        <h2 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.5em] mb-4">Research</h2>
        <p className="text-4xl md:text-5xl font-black text-zinc-950 tracking-tighter">Selected Publications</p>
      </div>
      
      <div className="space-y-4 border-t border-zinc-100 pt-8">
        {publications.map((pub, idx) => (
          <div 
            key={idx}
            className="group py-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-zinc-50 last:border-0 hover:bg-zinc-50/50 transition-all px-8 rounded-[2rem] reveal-on-scroll"
            style={{ transitionDelay: `${idx * 100}ms` }}
          >
            <div className="max-w-3xl">
              <h3 className="text-xl font-black text-zinc-950 transition-colors mb-3">
                {pub.title}
              </h3>
              <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">
                {pub.journal}
              </p>
            </div>
            <div className="flex items-center gap-6 whitespace-nowrap">
              {pub.title.includes("Bail Prediction") && (
                <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-full uppercase tracking-tighter">
                  Best Paper Award
                </span>
              )}
              <span className="text-sm font-black text-zinc-300 group-hover:text-zinc-500 transition-colors">
                {pub.year}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Publications;
