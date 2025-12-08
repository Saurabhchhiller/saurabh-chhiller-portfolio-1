import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Admin from './components/Admin';
import { RESUME_LINK } from './constants';

// Portfolio App - Blog section removed
function App() {
  const [view, setView] = useState<'portfolio' | 'admin'>('portfolio');
  const [resumeUrl, setResumeUrl] = useState(RESUME_LINK);
  const [resumeName, setResumeName] = useState<string | undefined>(undefined);

  useEffect(() => {
    // Check for custom resume in local storage on load
    const storedResume = localStorage.getItem('custom_resume_url');
    const storedName = localStorage.getItem('custom_resume_name');
    
    if (storedResume) {
      setResumeUrl(storedResume);
    }
    if (storedName) {
      setResumeName(storedName);
    }
  }, []);

  const handleResumeUpdate = (url: string, name?: string) => {
    setResumeUrl(url);
    setResumeName(name);
  };

  if (view === 'admin') {
    return (
      <Admin 
        onLogout={() => setView('portfolio')} 
        currentResumeUrl={resumeUrl}
        onResumeUpdate={handleResumeUpdate}
      />
    );
  }

  return (
    <div className="relative min-h-screen bg-slate-50 selection:bg-blue-200 selection:text-blue-900 overflow-x-hidden">
      
      {/* Animated Background Mesh */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
      </div>

      <div className="relative z-10">
        <Navbar resumeUrl={resumeUrl} resumeName={resumeName} />
        <main>
          <Hero resumeUrl={resumeUrl} resumeName={resumeName} />
          <Skills />
          <Experience />
          <Education />
          <Contact />
        </main>
        <Footer onAdminClick={() => setView('admin')} />
        <ScrollToTop />
      </div>
    </div>
  );
}

export default App;