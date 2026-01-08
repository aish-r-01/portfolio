
import React from 'react';
import { projects } from '../../data';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-8 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-12 reveal-on-scroll">
        <div>
          <h2 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.4em] mb-4">Portfolio</h2>
          <p className="text-4xl md:text-5xl font-black text-zinc-950 tracking-tighter">Case Studies</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, idx) => (
          <div 
            key={project.id}
            className={`group flex flex-col bg-white border border-zinc-100 rounded-[2rem] overflow-hidden hover:shadow-2xl hover:shadow-indigo-50 transition-all duration-500 reveal-on-scroll`}
            style={{ transitionDelay: `${idx * 100}ms` }}
          >
            <div className="aspect-[1.4/1] overflow-hidden bg-zinc-100 relative">
              <img 
                src={project.id === "2" ? "https://images.unsplash.com/photo-1542296332-2e4473faf563?q=80&w=800&auto=format&fit=crop" : project.image} 
                alt={project.title}
                className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />
            </div>
            
            <div className="p-8 flex-1 flex flex-col">
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg bg-gradient-to-br from-zinc-50 to-white border border-zinc-100 group-hover:border-indigo-200 group-hover:bg-indigo-50/30 transition-all duration-500 text-zinc-500 group-hover:text-indigo-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <h3 className="text-xl font-black text-zinc-950 mb-3 group-hover:text-indigo-600 transition-colors">{project.title}</h3>
              <p className="text-[13px] font-bold text-zinc-500 leading-relaxed mb-8">{project.description}</p>
              
              <div className="mt-auto">
                <a 
                  href={project.github} 
                  target="_blank"
                  className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-indigo-600 transition-colors flex items-center gap-2 group/link"
                >
                  Source <span className="text-lg transition-transform group-hover/link:translate-x-1">→</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
