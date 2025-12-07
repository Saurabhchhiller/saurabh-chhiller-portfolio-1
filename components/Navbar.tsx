import React, { useState, useEffect } from 'react';
import { Menu, X, Download, Github, Linkedin, Mail } from 'lucide-react';
import { SOCIAL_LINKS } from '../constants';

interface NavbarProps {
  resumeUrl: string;
  resumeName?: string;
}

const Navbar: React.FC<NavbarProps> = ({ resumeUrl, resumeName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];
  
  // Determine if we should force download (for custom uploads) or just open (for the default HTML)
  const isCustomResume = resumeUrl.startsWith('data:');
  const downloadAttr = isCustomResume ? (resumeName || "Resume") : undefined;

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-500 border-b ${
        isScrolled || isOpen 
          ? 'bg-white/70 backdrop-blur-xl border-white/20 shadow-lg shadow-slate-200/5 py-3' 
          : 'bg-transparent border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0 flex items-center">
            <a href="#" className="font-bold text-2xl tracking-tighter text-slate-800 relative group">
              SC<span className="text-blue-600">.</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-slate-600 hover:text-blue-600 font-medium transition-colors relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-blue-600 after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.name}
              </a>
            ))}
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              download={downloadAttr}
              className="flex items-center gap-2 bg-slate-900/90 hover:bg-slate-800 text-white px-5 py-2.5 rounded-full font-medium transition-all hover:scale-105 hover:shadow-lg backdrop-blur-sm"
            >
              <Download size={18} />
              <span>Resume</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-700 hover:text-blue-600 focus:outline-none p-2 rounded-lg hover:bg-white/50 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden absolute w-full bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-xl transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pt-4 pb-8 space-y-4 flex flex-col">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block px-3 py-2 text-lg font-medium text-slate-700 hover:text-blue-600 hover:bg-white/60 rounded-xl transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <div className="pt-4 border-t border-slate-200/50">
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              download={downloadAttr}
              className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white px-5 py-3 rounded-xl font-medium hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-500/20"
              onClick={() => setIsOpen(false)}
            >
              <Download size={20} />
              <span>Download Resume</span>
            </a>
          </div>
          <div className="flex justify-center space-x-6 pt-2">
            <a href={SOCIAL_LINKS.github} className="text-slate-400 hover:text-slate-800 transition-colors">
                <Github size={24} />
            </a>
            <a href={SOCIAL_LINKS.linkedin} className="text-slate-400 hover:text-blue-700 transition-colors">
                <Linkedin size={24} />
            </a>
            <a href={`mailto:${SOCIAL_LINKS.email}`} className="text-slate-400 hover:text-red-500 transition-colors">
                <Mail size={24} />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;