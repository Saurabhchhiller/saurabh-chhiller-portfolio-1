import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { SOCIAL_LINKS } from '../constants';
import Reveal from './Reveal';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    subject: false,
    message: false
  });

  const [status, setStatus] = useState<'idle' | 'success' | 'submitting'>('idle');

  const validate = (name: string, value: string) => {
    switch (name) {
      case 'name':
        return !value.trim() ? 'Name is required' : '';
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address';
        return '';
      case 'subject':
        return !value.trim() ? 'Subject is required' : '';
      case 'message':
        return !value.trim() ? 'Message is required' : '';
      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (touched[name as keyof typeof touched]) {
      setErrors(prev => ({
        ...prev,
        [name]: validate(name, value)
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({
      ...prev,
      [name]: validate(name, value)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      name: validate('name', formData.name),
      email: validate('email', formData.email),
      subject: validate('subject', formData.subject),
      message: validate('message', formData.message)
    };

    setErrors(newErrors);
    setTouched({
      name: true,
      email: true,
      subject: true,
      message: true
    });

    if (Object.values(newErrors).some(error => error)) {
      return;
    }

    setStatus('submitting');
    
    setTimeout(() => {
        const messages = JSON.parse(localStorage.getItem('contact_messages') || '[]');
        messages.push({ ...formData, date: new Date().toISOString() });
        localStorage.setItem('contact_messages', JSON.stringify(messages));
        
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTouched({ name: false, email: false, subject: false, message: false });
        setErrors({ name: '', email: '', subject: '', message: '' });
        
        setTimeout(() => setStatus('idle'), 5000);
    }, 1000);
  };

  const getInputClassName = (fieldName: keyof typeof errors) => {
    const hasError = touched[fieldName] && errors[fieldName];
    return `w-full px-4 py-3 rounded-xl border ${
      hasError 
        ? 'border-red-300 bg-red-50/50 focus:border-red-500' 
        : 'border-white/40 bg-white/50 focus:border-blue-500 focus:bg-white'
    } backdrop-blur-sm focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300`;
  };

  return (
    <section id="contact" className="py-24 bg-slate-900 text-white relative overflow-hidden scroll-mt-28">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600 rounded-full blur-[120px] opacity-20 pointer-events-none animate-blob"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600 rounded-full blur-[120px] opacity-20 pointer-events-none animate-blob animation-delay-2000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <Reveal variant="fade-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">Let's Work Together</h2>
            <p className="text-slate-300 text-lg mb-12 max-w-md leading-relaxed">
              I'm always interested in discussing new opportunities, product challenges, and innovative solutions.
            </p>

            <div className="space-y-8">
                <div className="flex items-center gap-5 group">
                    <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/10 group-hover:bg-white/20 transition-colors">
                        <Mail size={24} className="text-blue-400" />
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold text-white/90">Email</h4>
                        <a href={`mailto:${SOCIAL_LINKS.email}`} className="text-slate-400 hover:text-white transition-colors">
                            {SOCIAL_LINKS.email}
                        </a>
                    </div>
                </div>
                
                <div className="flex items-center gap-5 group">
                    <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/10 group-hover:bg-white/20 transition-colors">
                        <Phone size={24} className="text-blue-400" />
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold text-white/90">Phone</h4>
                        <p className="text-slate-400">{SOCIAL_LINKS.phone}</p>
                    </div>
                </div>

                <div className="flex items-center gap-5 group">
                    <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/10 group-hover:bg-white/20 transition-colors">
                        <MapPin size={24} className="text-blue-400" />
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold text-white/90">Location</h4>
                        <p className="text-slate-400">San Francisco Bay Area</p>
                    </div>
                </div>
            </div>
          </Reveal>

          <Reveal variant="scale-in" delay={200}>
            <div className="bg-white/80 backdrop-blur-2xl rounded-3xl p-8 md:p-10 text-slate-900 shadow-2xl border border-white/40">
                <h3 className="text-2xl font-bold mb-8">Send a Message</h3>
                
                {status === 'success' ? (
                    <div className="bg-green-50/80 backdrop-blur-sm border border-green-200 rounded-2xl p-8 text-center animate-fade-in">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full text-green-600 mb-6 shadow-sm">
                            <CheckCircle size={40} />
                        </div>
                        <h4 className="text-2xl font-bold text-green-800 mb-2">Message Sent!</h4>
                        <p className="text-green-700">Thank you for reaching out. I'll get back to you as soon as possible.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-semibold text-slate-700 ml-1">Name</label>
                                <div className="relative">
                                    <input 
                                        type="text" 
                                        id="name" 
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={getInputClassName('name')}
                                        placeholder="Your Name"
                                    />
                                    {touched.name && errors.name && (
                                        <div className="absolute right-3 top-3.5 text-red-500 pointer-events-none">
                                            <AlertCircle size={18} />
                                        </div>
                                    )}
                                </div>
                                {touched.name && errors.name && (
                                    <p className="text-xs text-red-500 ml-1">{errors.name}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-semibold text-slate-700 ml-1">Email</label>
                                <div className="relative">
                                    <input 
                                        type="email" 
                                        id="email" 
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={getInputClassName('email')}
                                        placeholder="your@email.com"
                                    />
                                    {touched.email && errors.email && (
                                        <div className="absolute right-3 top-3.5 text-red-500 pointer-events-none">
                                            <AlertCircle size={18} />
                                        </div>
                                    )}
                                </div>
                                {touched.email && errors.email && (
                                    <p className="text-xs text-red-500 ml-1">{errors.email}</p>
                                )}
                            </div>
                        </div>
                        
                        <div className="space-y-2">
                            <label htmlFor="subject" className="text-sm font-semibold text-slate-700 ml-1">Subject</label>
                            <div className="relative">
                                <input 
                                    type="text" 
                                    id="subject" 
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={getInputClassName('subject')}
                                    placeholder="Project Inquiry"
                                />
                                {touched.subject && errors.subject && (
                                    <div className="absolute right-3 top-3.5 text-red-500 pointer-events-none">
                                        <AlertCircle size={18} />
                                    </div>
                                )}
                            </div>
                            {touched.subject && errors.subject && (
                                <p className="text-xs text-red-500 ml-1">{errors.subject}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-semibold text-slate-700 ml-1">Message</label>
                            <div className="relative">
                                <textarea 
                                    id="message" 
                                    name="message"
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`${getInputClassName('message')} resize-none`}
                                    placeholder="How can I help you?"
                                ></textarea>
                                {touched.message && errors.message && (
                                    <div className="absolute right-3 top-3 text-red-500 pointer-events-none">
                                        <AlertCircle size={18} />
                                    </div>
                                )}
                            </div>
                            {touched.message && errors.message && (
                                <p className="text-xs text-red-500 ml-1">{errors.message}</p>
                            )}
                        </div>

                        <button 
                            type="submit"
                            disabled={status === 'submitting'}
                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-blue-500/30 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {status === 'submitting' ? 'Sending...' : (
                                <>
                                    Send Message <Send size={18} />
                                </>
                            )}
                        </button>
                    </form>
                )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;