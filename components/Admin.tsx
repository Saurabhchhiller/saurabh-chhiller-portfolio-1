import React, { useState } from 'react';
import { Lock, Upload, FileText, LogOut, Check, AlertCircle } from 'lucide-react';

interface AdminProps {
  onLogout: () => void;
  currentResumeUrl: string;
  onResumeUpdate: (url: string, name?: string) => void;
}

const Admin: React.FC<AdminProps> = ({ onLogout, currentResumeUrl, onResumeUpdate }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [uploadMessage, setUploadMessage] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid credentials');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setUploadStatus('idle');
      setUploadMessage('');
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    
    // Client-side size check (approx 4.5MB limit for Base64 in LocalStorage)
    if (file.size > 4.5 * 1024 * 1024) {
      setUploadStatus('error');
      setUploadMessage('File is too large. Please upload a file smaller than 4.5MB.');
      return;
    }

    setUploadStatus('uploading');
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const result = e.target?.result as string;
        localStorage.setItem('custom_resume_url', result);
        localStorage.setItem('custom_resume_name', file.name);
        
        onResumeUpdate(result, file.name);
        
        setUploadStatus('success');
        setUploadMessage('Resume updated successfully! Changes are live.');
        setTimeout(() => {
            setUploadStatus('idle');
            setUploadMessage('');
        }, 3000);
      } catch (err) {
        console.error("Storage failed", err);
        setUploadStatus('error');
        setUploadMessage('Failed to save file. It might be too large for browser storage.');
      }
    };
    reader.onerror = () => {
        setUploadStatus('error');
        setUploadMessage('Error reading file.');
    };
    
    // Simulate network delay for UX
    setTimeout(() => {
        reader.readAsDataURL(file);
    }, 1000);
  };

  const handleReset = () => {
      localStorage.removeItem('custom_resume_url');
      localStorage.removeItem('custom_resume_name');
      onResumeUpdate("/resume.html", undefined); // Reset to default
      setUploadStatus('success');
      setUploadMessage('Reset to default resume.');
      setTimeout(() => {
          setUploadStatus('idle');
          setUploadMessage('');
      }, 3000);
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4 font-sans">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-200">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-slate-900 text-white rounded-full shadow-lg">
              <Lock size={32} />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center text-slate-800 mb-2">Admin Portal</h2>
          <p className="text-center text-slate-500 mb-8">Please sign in to continue</p>
          
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="Enter username"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="Enter password"
              />
            </div>
            {error && (
                <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-100">
                    <AlertCircle size={16} /> {error}
                </div>
            )}
            <button type="submit" className="w-full bg-slate-900 text-white py-3.5 rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-lg hover:shadow-xl transform active:scale-95">
              Sign In
            </button>
          </form>
          <button onClick={onLogout} className="mt-6 text-sm text-slate-500 w-full text-center hover:text-blue-600 font-medium transition-colors">
            ← Back to Portfolio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <nav className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
                <div className="bg-slate-900 text-white p-2 rounded-lg">
                    <Lock size={20} />
                </div>
                <h1 className="text-xl font-bold text-slate-800">Admin Dashboard</h1>
            </div>
            <button onClick={onLogout} className="flex items-center gap-2 text-slate-600 hover:text-red-600 transition-colors px-4 py-2 hover:bg-red-50 rounded-lg font-medium">
                <LogOut size={18} /> <span className="hidden sm:inline">Logout</span>
            </button>
        </div>
      </nav>
      
      <main className="max-w-4xl mx-auto p-6 md:p-10">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 md:p-8 border-b border-slate-100">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <FileText className="text-blue-600" /> Resume Management
                </h2>
                <p className="text-slate-500 mt-1">Update or reset the resume file displayed on your portfolio.</p>
            </div>
          
            <div className="p-6 md:p-8 space-y-8">
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">Current Resume Configuration</label>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="flex-1 p-3 bg-slate-50 rounded-lg border border-slate-200 font-mono text-xs text-slate-600 break-all flex items-center overflow-hidden">
                            <span className="truncate w-full">
                                {currentResumeUrl.startsWith('data:') ? 'Custom Uploaded File (Stored Locally)' : currentResumeUrl}
                            </span>
                        </div>
                        <button 
                            onClick={handleReset}
                            className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 hover:text-slate-900 transition-colors whitespace-nowrap"
                        >
                            Reset to Default
                        </button>
                    </div>
                </div>

                <div className="space-y-4">
                    <label className="block text-sm font-semibold text-slate-700">Upload New Resume</label>
                    <div className="group relative border-2 border-dashed border-slate-300 rounded-2xl p-8 hover:bg-blue-50/50 hover:border-blue-400 transition-all text-center cursor-pointer">
                        <input 
                            type="file" 
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                            accept=".pdf,.doc,.docx" 
                            onChange={handleFileChange} 
                        />
                        <div className="flex flex-col items-center justify-center pointer-events-none">
                            <div className="p-4 bg-blue-100 text-blue-600 rounded-full mb-4 group-hover:scale-110 transition-transform">
                                <Upload size={24} />
                            </div>
                            <p className="text-slate-900 font-medium mb-1">
                                {file ? file.name : "Click or Drag to Upload Resume"}
                            </p>
                            <p className="text-slate-500 text-sm">Supported formats: PDF, DOC, DOCX (Max 4.5MB)</p>
                        </div>
                    </div>

                    {file && (
                        <div className="animate-fade-in">
                            <button 
                                onClick={handleUpload}
                                disabled={uploadStatus === 'uploading'}
                                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/20 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                            >
                                {uploadStatus === 'uploading' ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                                        Uploading...
                                    </>
                                ) : (
                                    <>
                                        Confirm Upload
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                    
                    {uploadStatus === 'success' && (
                        <div className="flex items-center gap-2 text-green-700 bg-green-50 p-4 rounded-xl border border-green-100 animate-fade-in">
                            <Check size={20} />
                            <span className="font-medium">{uploadMessage}</span>
                        </div>
                    )}
                    
                    {uploadStatus === 'error' && (
                        <div className="flex items-center gap-2 text-red-700 bg-red-50 p-4 rounded-xl border border-red-100 animate-fade-in">
                            <AlertCircle size={20} />
                            <span className="font-medium">{uploadMessage}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;