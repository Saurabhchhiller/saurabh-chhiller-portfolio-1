import React from 'react';
import { EDUCATION } from '../constants';
import { GraduationCap } from 'lucide-react';
import Reveal from './Reveal';

const Education: React.FC = () => {
  return (
    <section className="py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal variant="fade-up">
            <h2 className="text-3xl font-bold text-center text-slate-900 mb-12 tracking-tight">Education</h2>
        </Reveal>
        
        <div className="space-y-6">
            {EDUCATION.map((edu, index) => (
                <Reveal key={index} variant="scale-in" delay={index * 100}>
                    <div className="flex items-center gap-6 p-8 bg-white/50 backdrop-blur-xl rounded-2xl border border-white/60 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 group">
                        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-4 rounded-xl shadow-lg shadow-blue-500/30 text-white group-hover:scale-110 transition-transform duration-500">
                            <GraduationCap size={32} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-900">{edu.institution}</h3>
                            <p className="text-blue-700 font-medium text-lg">{edu.degree}</p>
                            <p className="text-slate-500 text-sm mt-1 font-medium bg-white/40 inline-block px-3 py-1 rounded-full">{edu.year}</p>
                        </div>
                    </div>
                </Reveal>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Education;