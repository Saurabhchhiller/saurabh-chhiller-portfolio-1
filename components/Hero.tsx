import React from 'react';
import { ArrowRight, Download, Github, Linkedin, Mail } from 'lucide-react';
import { SOCIAL_LINKS } from '../constants';
import Reveal from './Reveal';

interface HeroProps {
  resumeUrl: string;
  resumeName?: string;
}

const Hero: React.FC<HeroProps> = ({ resumeUrl, resumeName }) => {
  // Determine if we should force download (for custom uploads) or just open (for the default HTML)
  const isCustomResume = resumeUrl.startsWith('data:');
  const downloadAttr = isCustomResume ? (resumeName || "Resume") : undefined;

  return (
    <section id="about" className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden scroll-mt-28">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070&auto=format&fit=crop" 
            alt="Abstract Background" 
            className="w-full h-full object-cover"
          />
          {/* Subtle glass overlay */}
          <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px]"></div>
          {/* Gradient to blend bottom edge */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-slate-50/90"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 text-center">
        <Reveal variant="fade-up" delay={200}>
            <div className="inline-block px-5 py-2 bg-white/30 backdrop-blur-md text-slate-900 rounded-full text-sm font-bold tracking-wide border border-white/40 shadow-sm mb-6 hover:scale-105 transition-transform cursor-default">
                Product Manager | Senior BA
            </div>
        </Reveal>

        <Reveal variant="blur-in" delay={400}>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight mb-6 tracking-tight drop-shadow-sm">
            Hi, I'm <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-700">
                Saurabh Chhiller
            </span>
            </h1>
        </Reveal>

        <Reveal variant="fade-up" delay={600}>
            <div className="flex justify-center mb-10">
                <p className="text-xl text-slate-800 leading-relaxed max-w-2xl font-medium drop-shadow-sm">
                I help organizations turn complex business processes into simple, scalable, and user-friendly digital solutions. 
                With 9+ years of experience, I bridge the gap between ambiguity and measurable results.
                </p>
            </div>
        </Reveal>

        <Reveal variant="fade-up" delay={800}>
                        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
                        <a 
                                href="#contact"
                                onClick={(e) => {
                                    e.preventDefault();
                                    const el = document.getElementById('contact');
                                    if (el) {
                                        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                    }
                                }}
                                className="flex items-center justify-center gap-2 bg-slate-900/90 text-white px-8 py-4 rounded-full font-medium hover:bg-slate-800 transition-all hover:shadow-xl hover:shadow-slate-500/20 hover:-translate-y-1 active:scale-95 active:translate-y-0 backdrop-blur-sm"
                        >
                                Let's Connect <ArrowRight size={20} />
                        </a>
            <a 
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                download={downloadAttr}
                className="flex items-center justify-center gap-2 bg-white/40 backdrop-blur-md text-slate-900 border border-white/50 px-8 py-4 rounded-full font-medium hover:bg-white hover:text-blue-700 transition-all hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 active:scale-95 active:translate-y-0"
            >
                <Download size={20} /> Download Resume
            </a>
            </div>
        </Reveal>

        <Reveal variant="fade-in" delay={1000}>
            <div className="flex items-center justify-center gap-8 pt-12">
                <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/30 backdrop-blur-md rounded-full border border-white/40 text-slate-800 hover:text-black hover:bg-white hover:scale-110 hover:shadow-lg transition-all duration-300">
                    <Github size={24} />
                </a>
                <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/30 backdrop-blur-md rounded-full border border-white/40 text-slate-800 hover:text-blue-700 hover:bg-white hover:scale-110 hover:shadow-lg transition-all duration-300">
                    <Linkedin size={24} />
                </a>
                <a href={`mailto:${SOCIAL_LINKS.email}`} className="p-3 bg-white/30 backdrop-blur-md rounded-full border border-white/40 text-slate-800 hover:text-red-600 hover:bg-white hover:scale-110 hover:shadow-lg transition-all duration-300">
                    <Mail size={24} />
                </a>
            </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Hero;