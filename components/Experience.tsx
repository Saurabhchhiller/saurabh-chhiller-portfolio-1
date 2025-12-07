import React from 'react';
import { EXPERIENCE } from '../constants';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import Reveal from './Reveal';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 relative scroll-mt-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal variant="fade-up">
            <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Professional Experience</h2>
            <p className="text-lg text-slate-600">
                A track record of delivering measurable impact across regulated industries.
            </p>
            </div>
        </Reveal>

        <div className="space-y-12 relative before:content-[''] before:absolute before:left-4 md:before:left-1/2 before:top-0 before:bottom-0 before:w-0.5 before:bg-gradient-to-b before:from-blue-200 before:via-blue-400 before:to-blue-200 before:-translate-x-1/2">
          {EXPERIENCE.map((job, index) => (
            <div key={job.id} className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
              
              {/* Timeline Dot */}
              <div className="absolute left-4 md:left-1/2 w-9 h-9 bg-blue-600 rounded-full border-4 border-white shadow-lg shadow-blue-500/30 transform -translate-x-1/2 flex items-center justify-center z-10 mt-1">
                <Briefcase size={14} className="text-white" />
              </div>

              {/* Content Spacer for Desktop */}
              <div className="hidden md:block md:w-1/2" />

              {/* Content Card */}
              <div className="pl-12 md:pl-0 md:w-1/2">
                <Reveal 
                    variant={index % 2 === 0 ? "slide-right" : "slide-left"} 
                    className={`bg-white/60 backdrop-blur-xl p-6 md:p-8 rounded-2xl shadow-lg border border-white/50 hover:shadow-2xl hover:bg-white/80 transition-all duration-500 hover:-translate-y-1 ${index % 2 === 0 ? 'md:mr-12' : 'md:ml-12'}`}
                >
                    <div className="mb-4">
                        <h3 className="text-xl font-bold text-slate-900 leading-tight">{job.role}</h3>
                        <div className="text-blue-700 font-semibold mb-1 text-lg">{job.company}</div>
                        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-500 mt-2 font-medium">
                            <span className="flex items-center gap-1 bg-white/50 px-2 py-1 rounded-md"><Calendar size={14} className="text-blue-500" /> {job.period}</span>
                            {job.location && <span className="flex items-center gap-1 bg-white/50 px-2 py-1 rounded-md"><MapPin size={14} className="text-blue-500" /> {job.location}</span>}
                        </div>
                    </div>
                    
                    <p className="text-slate-700 italic mb-5 text-sm border-l-4 border-blue-400/50 pl-4 py-1">
                        {job.description}
                    </p>

                    <ul className="space-y-3">
                        {job.achievements.slice(0, 3).map((achievement, i) => (
                            <li key={i} className="text-sm text-slate-700 flex items-start gap-3">
                                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0 shadow-sm shadow-blue-500" />
                                <span className="leading-relaxed">{achievement}</span>
                            </li>
                        ))}
                    </ul>
                </Reveal>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;