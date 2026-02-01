import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Hero from './components/Hero';
import InputSection from './components/InputSection';
import Results from './components/Results';
import Auth from './components/Auth';
import { supabase } from './supabase';
import { AlertTriangle, LogOut, Bot } from 'lucide-react';

const Navbar = ({ session, onLogout }) => (
  <nav className="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-200">
        <Bot size={24} className="text-white" />
      </div>
      <div>
        <h1 className="text-xl font-bold text-blue-600 leading-tight italic">Skill-Bridge AI</h1>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">AI Career Advisor</p>
      </div>
    </div>

    <div className="flex items-center gap-6">
      <div className="hidden md:flex flex-col items-end">
        <p className="text-xs font-bold text-slate-400 uppercase">Welcome back,</p>
        <p className="text-sm font-black text-purple-600">
          {session?.user.user_metadata?.full_name || session?.user.email.split('@')[0]}
        </p>
      </div>
      <button
        onClick={onLogout}
        className="flex items-center gap-2 px-4 py-2 border border-red-100 text-red-500 rounded-xl text-sm font-bold hover:bg-red-50 transition-all uppercase tracking-wider"
      >
        <LogOut size={16} />
        Sign Out
      </button>
      <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 overflow-hidden">
        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${session?.user.email}`} alt="Avatar" />
      </div>
    </div>
  </nav>
);

function App() {
  const [session, setSession] = useState(null);
  const [inputType, setInputType] = useState('file');
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');
  const [language, setLanguage] = useState('Hindi');
  const [targetRole, setTargetRole] = useState('Full Stack Developer');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const isSupabaseConfigured = import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_URL !== 'your_supabase_url';

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => subscription.unsubscribe();
  }, [isSupabaseConfigured]);

  const handleAnalyze = async () => {
    setError(null);
    setResult(null);
    if (inputType === 'file' && !file) { setError("Please upload a resume PDF."); return; }
    if (inputType === 'text' && !text.trim()) { setError("Please enter your skills."); return; }
    setIsLoading(true);
    const formData = new FormData();
    if (inputType === 'file') formData.append('file', file);
    else formData.append('text', text);
    formData.append('language', language);
    formData.append('role', targetRole);
    try {
      const resp = await axios.post('http://localhost:5000/analyze', formData);
      setResult(resp.data);
    } catch (err) {
      setError("Analysis failed. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => supabase.auth.signOut();

  if (!session) {
    return (
      <div className="min-h-screen bg-white font-sans">
        <div className="relative">
          <Hero isDashboard={false} />
          <div className="lg:absolute lg:top-1/2 lg:right-20 lg:-translate-y-1/2 w-full lg:max-w-md px-6 pb-20 lg:pb-0">
            <Auth onLogin={(u) => setSession({ user: u })} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8faff] pb-20 font-sans">
      <Navbar session={session} onLogout={handleLogout} />

      {!result ? (
        <>
          <Hero isDashboard={true} />
          <div className="max-w-4xl mx-auto -mt-10 px-6">
            <InputSection
              inputType={inputType} setInputType={setInputType}
              file={file} setFile={setFile}
              text={text} setText={setText}
              language={language} setLanguage={setLanguage}
              targetRole={targetRole} setTargetRole={setTargetRole}
              onAnalyze={handleAnalyze} isLoading={isLoading}
            />
            {error && (
              <div className="mt-6 bg-red-50 border border-red-100 p-4 rounded-2xl flex items-center gap-3 text-red-600 font-bold">
                <AlertTriangle size={20} />
                {error}
              </div>
            )}
          </div>
        </>
      ) : (
        <Results data={result} onReset={() => setResult(null)} session={session} />
      )}

      <footer className="mt-20 py-8 text-center text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">
        Skill-Bridge AI • Empowering Careers with Intelligence
      </footer>
    </div>
  );
}

export default App;
