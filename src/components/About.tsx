
import React from 'react';
import { profile, skills, achievements } from '../../data';
import { 
  Code2, 
  Terminal, 
  Wrench, 
  BrainCircuit,
  Award
} from 'lucide-react';
import profileImg from "../assets/profile.jpg";

const About: React.FC = () => {
  const categories = Array.from(new Set(skills.map(s => s.category)));

  const getCategoryStyles = (cat: string) => {
    switch (cat) {
      case 'Languages': return { icon: <Terminal size={14} className="text-indigo-500" />, border: 'hover:border-indigo-200', text: 'text-indigo-600' };
      case 'AI/ML': return { icon: <BrainCircuit size={14} className="text-rose-500" />, border: 'hover:border-rose-200', text: 'text-rose-600' };
      case 'Tools': return { icon: <Wrench size={14} className="text-emerald-500" />, border: 'hover:border-emerald-200', text: 'text-emerald-600' };
      default: return { icon: <Code2 size={14} className="text-zinc-500" />, border: 'hover:border-zinc-200', text: 'text-zinc-600' };
    }
  };

  return (
    <section id="about" className="py-8 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Column - Bento Main (Visual) */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          <div className="bg-zinc-50/50 backdrop-blur-md p-6 rounded-[2.5rem] border border-zinc-100 reveal-on-scroll">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-zinc-200 shadow-inner group border border-white">
              <img 
                src={profileImg}
                alt={profile.name}
                className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            </div>
          </div>
          
          <div className="bg-indigo-50/50 backdrop-blur-md p-10 rounded-[2.5rem] border border-indigo-100/50 reveal-on-scroll shadow-sm">
            <div className="flex items-center gap-4 mb-6">
               <Award size={18} className="text-indigo-600" />
               <h2 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em]">Milestones</h2>
            </div>
            <div className="space-y-5">
              {achievements.map((ach) => (
                <div key={ach.id} className="flex gap-4 group">
                  <div className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-200 group-hover:bg-indigo-600 transition-all duration-500 flex-shrink-0" />
                  <p className="text-[14px] font-bold text-zinc-600 leading-snug group-hover:text-zinc-950 transition-colors">
                    {ach.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Bento Detailed (Content) */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          <div className="bg-white/40 backdrop-blur-md p-10 md:p-14 rounded-[3rem] border border-zinc-100 flex flex-col shadow-sm reveal-on-scroll h-full">
            <div className="space-y-10 mb-14">
              <div className="flex items-center gap-4">
                <h2 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.4em]">Philosophy</h2>
                <div className="h-[1px] flex-1 bg-zinc-100" />
              </div>
              <div className="space-y-4">
                {profile.bio.split('.').map((sentence, i) => sentence && (
                  <p 
                    key={i} 
                    className="text-lg md:text-2xl font-bold tracking-tight text-zinc-300 hover:text-zinc-950 transition-all duration-700 leading-tight cursor-default"
                  >
                    {sentence.trim()}.
                  </p>
                ))}
              </div>
            </div>

            <div className="flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.4em]">Technical Arsenal</h2>
                <div className="flex gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-200" />
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-200" />
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-200" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
                {categories.map(category => {
                  const styles = getCategoryStyles(category);
                  return (
                    <div key={category} className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-xl bg-white border border-zinc-100 flex items-center justify-center shadow-sm">
                          {styles.icon}
                        </div>
                        <h4 className="text-[10px] font-black uppercase text-zinc-950 tracking-[0.2em]">{category}</h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {skills.filter(s => s.category === category).map(skill => (
                          <div 
                            key={skill.name} 
                            className={`group bg-white/80 backdrop-blur-md border border-zinc-100/60 px-4 py-2 rounded-2xl ${styles.border} transition-all duration-500 hover:shadow-xl hover:shadow-zinc-100 hover:-translate-y-1 cursor-default`}
                          >
                            <span className="text-[12px] font-bold text-zinc-500 group-hover:text-zinc-950 transition-colors">
                              {skill.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
