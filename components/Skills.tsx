import React from 'react';
import { SKILLS, CERTIFICATIONS } from '../constants';
import { Award, Zap, CheckCircle2 } from 'lucide-react';
import Reveal from './Reveal';

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 relative scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal variant="fade-up">
            <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Expertise & Skills</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                A comprehensive toolkit built over 9+ years of driving digital transformation.
            </p>
            </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {SKILLS.map((category, index) => (
            <Reveal 
              key={category.title} 
              variant="scale-in" 
              delay={index * 100} 
              className="h-full"
            >
              <div className="bg-white/40 backdrop-blur-lg p-6 rounded-2xl border border-white/50 shadow-lg hover:shadow-2xl hover:bg-white/60 transition-all duration-500 h-full group hover:-translate-y-2">
                <div className="flex items-center gap-3 mb-6 pb-2 border-b border-slate-200/50">
                  <div className="p-2.5 bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 rounded-xl group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:text-white transition-all duration-500 shadow-sm">
                    <Zap size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800">
                    {category.title}
                  </h3>
                </div>
                
                <div className="space-y-3">
                  {category.skills.map((skill) => (
                    <div key={skill} className="flex items-start gap-2.5">
                      <div className="mt-0.5 p-0.5 rounded-full bg-blue-100/50 text-blue-600">
                        <CheckCircle2 size={14} />
                      </div>
                      <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal variant="fade-up" delay={200}>
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden group">
            {/* Glossy overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            
            {/* Background Gradient inside card */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-800/90 -z-10"></div>
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                <div>
                <h3 className="text-2xl font-bold mb-3 flex items-center gap-3 text-white">
                    <Award className="text-yellow-400" /> Certifications
                </h3>
                <p className="text-slate-300">Continuous learning and professional development.</p>
                </div>
                <div className="flex flex-wrap justify-center md:justify-end gap-3">
                {CERTIFICATIONS.map((cert) => (
                    <span 
                    key={cert.name} 
                    className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/10 text-sm font-medium text-white hover:bg-white/20 hover:scale-105 transition-all cursor-default shadow-lg"
                    >
                    {cert.name}
                    </span>
                ))}
                </div>
            </div>
            </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Skills;