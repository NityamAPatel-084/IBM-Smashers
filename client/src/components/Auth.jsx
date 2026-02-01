import React, { useState } from 'react';
import { supabase } from '../supabase';
import { Mail, Lock, Loader2, ArrowRight } from 'lucide-react';

const Auth = ({ onLogin }) => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [authMode, setAuthMode] = useState('signin'); // default to signin as per image
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    const handleAuth = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setMessage(null);

        // Simulation for Demo Mode as per footer in image
        if (email && password) {
            setTimeout(() => {
                onLogin({
                    email,
                    user_metadata: { full_name: fullName || email.split('@')[0] }
                });
                setLoading(false);
            }, 1000);
            return;
        }

        try {
            if (authMode === 'signup') {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: { full_name: fullName },
                    },
                });
                if (error) throw error;
                setMessage("Sign up successful! Check your email for confirmation.");
            } else if (authMode === 'signin') {
                const { data, error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
                if (data.user) onLogin(data.user);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-slate-100 relative overflow-hidden">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-slate-900 mb-2">Get Started</h2>
                    <p className="text-slate-500 text-sm">Create an account or sign in to continue</p>
                </div>

                {/* Toggle Buttons */}
                <div className="flex bg-slate-100 p-1 rounded-2xl mb-8">
                    <button
                        onClick={() => setAuthMode('signin')}
                        className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all ${authMode === 'signin' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        Sign In
                    </button>
                    <button
                        onClick={() => setAuthMode('signup')}
                        className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all ${authMode === 'signup' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        Sign Up
                    </button>
                </div>

                <form onSubmit={handleAuth} className="space-y-6">
                    {authMode === 'signup' && (
                        <div>
                            <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 ml-1">Full Name</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="w-full p-4 pl-12 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:bg-white outline-none transition-all placeholder:text-slate-400 text-sm"
                                    placeholder="John Doe"
                                    required
                                />
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                    <Mail size={18} />
                                </div>
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 ml-1">Email</label>
                        <div className="relative">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-4 pl-12 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:bg-white outline-none transition-all placeholder:text-slate-400 text-sm"
                                placeholder="you@example.com"
                                required
                            />
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                <Mail size={18} />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 ml-1">Password</label>
                        <div className="relative">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-4 pl-12 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:bg-white outline-none transition-all placeholder:text-slate-400 text-sm"
                                placeholder="••••••••"
                                required
                            />
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                <Lock size={18} />
                            </div>
                        </div>
                    </div>

                    {error && <p className="text-red-500 text-xs font-medium text-center">{error}</p>}
                    {message && <p className="text-green-600 text-xs font-medium text-center">{message}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 rounded-2xl shadow-xl shadow-purple-600/20 transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader2 size={24} className="animate-spin" /> : (authMode === 'signup' ? "Sign Up" : "Sign In")}
                    </button>

                    <p className="text-center text-[10px] text-slate-400 font-medium">
                        Demo Mode: Use any credentials to continue
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Auth;

