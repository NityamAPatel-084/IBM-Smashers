import React, { useState } from 'react';
import { supabase } from '../supabase';
import { Mail, Lock, Loader2, ArrowRight } from 'lucide-react';

const Auth = ({ onLogin }) => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [authMode, setAuthMode] = useState('signup'); // 'signup' | 'signin' | 'forgot'
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    const handleAuth = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setMessage(null);

        try {
            if (authMode === 'signup') {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            full_name: fullName,
                        },
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
            } else if (authMode === 'forgot') {
                const { error } = await supabase.auth.resetPasswordForEmail(email, {
                    redirectTo: window.location.origin,
                });
                if (error) throw error;
                setMessage("Password reset link sent to your email.");
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto px-4">
            <div className="bg-white rounded-2xl shadow-xl w-full p-8 border border-slate-100 relative overflow-hidden">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-slate-900">
                        {authMode === 'signup' ? "Create Your Account" : (authMode === 'signin' ? "Welcome Back" : "Reset Password")}
                    </h2>
                    <p className="text-slate-500 mt-1">
                        {authMode === 'signup' ? "Start your multilingual AI career journey." : (authMode === 'signin' ? "Sign in to access your customized plan." : "Enter your email to receive a reset link.")}
                    </p>
                </div>

                <form onSubmit={handleAuth} className="space-y-5">

                    {authMode === 'signup' && (
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
                            <input
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
                                placeholder="e.g. Rahul Sharma"
                                required
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
                        <div className="relative">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-3 pl-10 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
                                placeholder="name@example.com"
                                required
                            />
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                <Mail size={18} />
                            </div>
                        </div>
                    </div>

                    {authMode !== 'forgot' && (
                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label className="block text-sm font-semibold text-slate-700">Password</label>
                                {authMode === 'signin' && (
                                    <button
                                        type="button"
                                        onClick={() => setAuthMode('forgot')}
                                        className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                                    >
                                        Forgot Password?
                                    </button>
                                )}
                            </div>
                            <div className="relative">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full p-3 pl-10 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
                                    placeholder="••••••••"
                                    required
                                />
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                    <Lock size={18} />
                                </div>
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 flex items-start gap-2">
                            <div className="mt-0.5 min-w-[4px] h-[4px] rounded-full bg-red-500" />
                            {error}
                        </div>
                    )}

                    {message && (
                        <div className="p-3 bg-green-50 text-green-700 text-sm rounded-lg border border-green-100 font-medium">
                            {message}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-600/20 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
                    >
                        {loading ? (
                            <Loader2 size={22} className="animate-spin" />
                        ) : (
                            <>
                                {authMode === 'signup' ? "Sign Up" : (authMode === 'signin' ? "Log In" : "Send Reset Link")}
                                {authMode !== 'forgot' && <ArrowRight size={20} />}
                            </>
                        )}
                    </button>

                    {/* Demo Login Option */}
                    <div className="relative flex items-center justify-center py-2">
                        <div className="border-t border-slate-200 w-full absolute"></div>
                        <span className="bg-white px-4 text-xs font-bold text-slate-400 relative uppercase tracking-widest">Or</span>
                    </div>

                    <button
                        type="button"
                        onClick={() => onLogin({ email: 'demo@kaushal.ai', user_metadata: { full_name: 'Demo User' } })}
                        className="w-full bg-white border-2 border-slate-100 hover:border-blue-100 hover:bg-blue-50/30 text-slate-600 font-bold py-3 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                        <span>Continue as Guest / Demo</span>
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <div className="text-sm text-slate-500">
                        {authMode === 'signup'
                            ? "Already have an account? "
                            : (authMode === 'signin' ? "Don't have an account? " : "Remember your password? ")}

                        <button
                            onClick={() => setAuthMode(authMode === 'signup' ? 'signin' : 'signup')}
                            className="text-blue-600 font-bold hover:underline"
                        >
                            {authMode === 'signup'
                                ? "Log in"
                                : (authMode === 'signin' ? "Sign up" : "Log in")}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;
