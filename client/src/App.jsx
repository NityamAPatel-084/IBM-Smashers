import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Hero from './components/Hero';
import InputSection from './components/InputSection';
import Results from './components/Results';
import Auth from './components/Auth';
import { supabase } from './supabase';
import { AlertTriangle, LogOut } from 'lucide-react';

function App() {
  const [session, setSession] = useState(null);
  const [inputType, setInputType] = useState('file'); // 'file' or 'text'
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');
  const [language, setLanguage] = useState('Hindi');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAuth, setShowAuth] = useState(false);

  // Check if Supabase keys are configured
  const isSupabaseConfigured = import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_URL !== 'your_supabase_url';

  useEffect(() => {
    // If not configured, bypass auth (Demo Mode)
    if (!isSupabaseConfigured) {
      console.warn("Supabase keys missing. Entering Demo Mode.");
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, [isSupabaseConfigured]);

  const handleAnalyze = async () => {
    setError(null);
    setResult(null);

    // Validation
    if (inputType === 'file' && !file) {
      setError("Please upload a resume PDF.");
      return;
    }
    if (inputType === 'text' && !text.trim()) {
      setError("Please enter your skills.");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    if (inputType === 'file') {
      formData.append('file', file);
    } else {
      formData.append('text', text);
    }
    formData.append('language', language);

    try {
      const response = await axios.post('http://localhost:5000/analyze', formData);
      setResult(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to analyze. Please try again or use text input.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  // Updated Auth Logic: Always show Hero.
  // If !session, show "Sign In" button top right.
  // If clicked, show <Auth /> below Hero.
  // If session, show <InputSection /> (Dashboard).

  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-sans relative">

      {/* Top Right Navigation */}
      <div className="absolute top-4 right-6 z-50 flex items-center gap-3">
        {session ? (
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-slate-600 hidden md:block">
              Welcome, {session.user.user_metadata?.full_name || session.user.email}
            </span>
            <button
              onClick={handleLogout}
              className="text-slate-500 hover:text-red-500 transition-colors flex items-center gap-1 text-sm font-medium bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-200 shadow-sm hover:shadow-md"
            >
              <LogOut size={16} />
              <span>Sign Out</span>
            </button>
          </div>
        ) : (
          isSupabaseConfigured && !showAuth && (
            <button
              onClick={() => setShowAuth(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white transition-colors flex items-center gap-2 text-sm font-bold px-6 py-2.5 rounded-full shadow-lg shadow-blue-600/20 active:scale-95"
            >
              <span>Sign In / Sign Up</span>
            </button>
          )
        )}
      </div>

      <Hero />

      {/* Main Content Area */}
      {(!session && showAuth) ? (
        <div className="container mx-auto -mt-8 relative z-20">
          <Auth onLogin={(user) => {
            setSession({ user });
            setShowAuth(false);
          }} />
          <div className="text-center mt-6">
            <button
              onClick={() => setShowAuth(false)}
              className="text-slate-500 hover:text-slate-800 text-sm font-medium underline underline-offset-4"
            >
              Back to Home
            </button>
          </div>
        </div>
      ) : (
        <>
          <InputSection
            inputType={inputType}
            setInputType={setInputType}
            file={file}
            setFile={setFile}
            text={text}
            setText={setText}
            language={language}
            setLanguage={setLanguage}
            onAnalyze={handleAnalyze}
            isLoading={isLoading}
          />

          {error && (
            <div className="max-w-3xl mx-auto mt-6 px-6">
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
                <AlertTriangle size={20} />
                {error}
              </div>
            </div>
          )}

          {result && <Results data={result} />}
        </>
      )}

      {/* Footer */}
      <footer className="py-8 text-center text-slate-400 text-sm font-medium">
        <p>
          Built with <span className="text-red-500">❤️</span> for Indian Students | Powered by AI
        </p>
      </footer>

    </div>
  );
}

export default App;
