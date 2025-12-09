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
  const [uploadToken, setUploadToken] = useState<string>(() => localStorage.getItem('admin_upload_token') || '');
  const [tokenSaved, setTokenSaved] = useState(false);
  const [web3ApiKey, setWeb3ApiKey] = useState<string>(() => localStorage.getItem('web3forms_api_key') || '');
  const [web3Saved, setWeb3Saved] = useState(false);
  const [web3Status, setWeb3Status] = useState<'unknown' | 'checking' | 'valid' | 'invalid'>('unknown');

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

    // Client-side size check (limit 10MB here to allow reasonable resumes)
    if (file.size > 10 * 1024 * 1024) {
      setUploadStatus('error');
      setUploadMessage('File is too large. Please upload a file smaller than 10MB.');
      return;
    }

    setUploadStatus('uploading');

      try {
      const form = new FormData();
      form.append('resume', file, file.name);

      // Adjust server URL/port if hosted elsewhere
      const headers: Record<string,string> = {};
      const savedToken = localStorage.getItem('admin_upload_token');
      if (savedToken) headers['x-admin-token'] = savedToken;

      const resp = await fetch('/api/upload-resume', {
        method: 'POST',
        body: form,
        headers,
      });

      if (!resp.ok) {
        const errText = await resp.text();
        throw new Error(errText || 'Upload failed');
      }

      const data = await resp.json();
      // server returns { url, message }
      if (data && data.url) {
        onResumeUpdate(data.url, file.name);
        setUploadStatus('success');
        setUploadMessage(data.message || 'Resume uploaded and published.');
      } else {
        throw new Error(data?.message || 'No URL returned');
      }
    } catch (err: any) {
      console.error('Upload error', err);
      setUploadStatus('error');
      setUploadMessage(err.message || 'Upload failed.');
    } finally {
      setTimeout(() => {
        setUploadStatus('idle');
        setUploadMessage('');
      }, 4000);
    }
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
                    
                            <div className="mt-4 flex flex-col sm:flex-row gap-3 items-center">
                              <input
                                type="text"
                                placeholder="Upload token (kept locally)"
                                value={uploadToken}
                                onChange={(e) => { setUploadToken(e.target.value); setTokenSaved(false); }}
                                className="flex-1 px-4 py-3 border border-slate-300 rounded-xl outline-none"
                              />
                              <button
                                onClick={() => { localStorage.setItem('admin_upload_token', uploadToken); setTokenSaved(true); setTimeout(() => setTokenSaved(false), 2000); }}
                                className="px-4 py-3 bg-slate-900 text-white rounded-xl font-medium"
                              >
                                Save Token
                              </button>
                              {tokenSaved && <span className="text-green-600 text-sm">Saved</span>}
                            </div>
                          
                            <div className="mt-4 flex flex-col sm:flex-row gap-3 items-center">
                              <input
                                type="text"
                                placeholder="Web3Forms API Key (kept locally)"
                                value={web3ApiKey}
                                onChange={(e) => { setWeb3ApiKey(e.target.value); setWeb3Saved(false); setWeb3Status('unknown'); }}
                                className="flex-1 px-4 py-3 border border-slate-300 rounded-xl outline-none"
                              />
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => { localStorage.setItem('web3forms_api_key', web3ApiKey); setWeb3Saved(true); setTimeout(() => setWeb3Saved(false), 2000); }}
                                  className="px-4 py-3 bg-slate-900 text-white rounded-xl font-medium"
                                >
                                  Save API Key
                                </button>

                                <button
                                  onClick={async () => {
                                    if (!web3ApiKey) {
                                      setWeb3Status('invalid');
                                      return;
                                    }
                                    setWeb3Status('checking');
                                    try {
                                      const form = new FormData();
                                      form.append('access_key', web3ApiKey);
                                      form.append('name', 'Validation Test');
                                      form.append('email', 'no-reply@example.com');
                                      form.append('subject', 'API Key Validation');
                                      form.append('message', 'This is a validation check. Please ignore.');

                                      const resp = await fetch('https://api.web3forms.com/submit', {
                                        method: 'POST',
                                        body: form,
                                      });

                                      if (!resp.ok) {
                                        setWeb3Status('invalid');
                                      } else {
                                        const data = await resp.json();
                                        if (data?.success) setWeb3Status('valid');
                                        else setWeb3Status('invalid');
                                      }
                                    } catch (err) {
                                      console.error('Web3Forms validation error', err);
                                      setWeb3Status('invalid');
                                    }
                                    // Do not persist anything here beyond status; saving remains explicit
                                  }}
                                  className="px-4 py-3 bg-blue-600 text-white rounded-xl font-medium"
                                >
                                  Validate API Key
                                </button>
                              </div>

                              <div className="ml-2">
                                {web3Status === 'unknown' && <span className="text-slate-500 text-sm">Status: Unknown</span>}
                                {web3Status === 'checking' && <span className="text-slate-500 text-sm">Checking…</span>}
                                {web3Status === 'valid' && <span className="text-green-600 text-sm flex items-center gap-2"><Check size={14} /> Valid</span>}
                                {web3Status === 'invalid' && <span className="text-red-600 text-sm flex items-center gap-2"><AlertCircle size={14} /> Invalid</span>}
                              </div>
                              {web3Saved && <span className="text-green-600 text-sm">Saved</span>}
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