import React from 'react';
import { Github, Linkedin, Mail, ArrowUp, Send, Lock } from 'lucide-react';
import { SOCIAL_LINKS } from '../constants';

interface FooterProps {
  onAdminClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onAdminClick }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">Saurabh Chhiller</h2>
            <p className="text-sm mb-4 font-medium opacity-80">Product Manager & Senior Business Analyst</p>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-full text-sm font-semibold transition-all transform hover:scale-105 shadow-lg shadow-blue-900/50"
            >
              Contact Me <Send size={14} />
            </a>

            <a
              href="https://drive.google.com/u/0/uc?id=1gxQU6IagLnNwmt5sM8cstxMlapcW0pTF&export=download"
              download="resume.pdf"
              className="ml-3 inline-flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-full text-sm font-semibold transition-all transform hover:scale-105 shadow-md"
            >
              Download Resume
            </a>
          </div>

          <div className="flex flex-col items-center md:items-end gap-5">
            <div className="flex gap-6">
              <a href={SOCIAL_LINKS.github} className="hover:text-white transition-colors transform hover:scale-110"><Github size={20} /></a>
              <a href={SOCIAL_LINKS.linkedin} className="hover:text-white transition-colors transform hover:scale-110"><Linkedin size={20} /></a>
              <a href={`mailto:${SOCIAL_LINKS.email}`} className="hover:text-white transition-colors transform hover:scale-110"><Mail size={20} /></a>
            </div>

            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 text-sm font-medium hover:text-white transition-colors"
            >
              Back to Top
              <div className="p-2 bg-slate-900 rounded-full group-hover:bg-slate-800 transition-colors border border-slate-800">
                <ArrowUp size={16} />
              </div>
            </button>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-600 font-medium">
          <p>&copy; {new Date().getFullYear()} Saurabh Chhiller. All rights reserved.</p>
          <button onClick={onAdminClick} className="flex items-center gap-1 hover:text-slate-400 transition-colors">
            <Lock size={10} /> Admin
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;