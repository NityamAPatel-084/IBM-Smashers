import React from 'react';
import { Sparkles, Bot, Search, CheckCircle, BookOpen, Target, Layers, Video, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = ({ isDashboard }) => {
    if (isDashboard) {
        return (
            <div className="bg-[#f8faff] py-16 px-6">
                <div className="max-w-6xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 bg-purple-50 text-purple-600 rounded-full text-xs font-black uppercase tracking-widest mb-6 border border-purple-100"
                    >
                        <Sparkles size={14} />
                        <span>Powered by Advanced AI Technology</span>
                    </motion.div>

                    <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
                        <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                            Analyze Your Resume
                        </span>
                    </h1>

                    <p className="max-w-2xl mx-auto text-slate-500 text-lg md:text-xl font-medium leading-relaxed mb-12">
                        Get instant AI-powered insights on skill gaps and receive a personalized learning roadmap tailored to your career goals
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {[
                            { icon: <Search size={20} />, title: "Smart Analysis", desc: "AI compares your skills against market demands", color: "purple" },
                            { icon: <CheckCircle size={20} />, title: "Skill Gap Detection", desc: "Identify exactly what you need to learn", color: "blue" },
                            { icon: <BookOpen size={20} />, title: "Learning Roadmap", desc: "Get curated resources and study plans", color: "indigo" }
                        ].map((card, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-50 flex flex-col items-start text-left"
                            >
                                <div className={`w-12 h-12 rounded-2xl ${card.color === 'purple' ? 'bg-purple-50 text-purple-600' : card.color === 'blue' ? 'bg-blue-50 text-blue-600' : 'bg-indigo-50 text-indigo-600'} flex items-center justify-center mb-4`}>
                                    {card.icon}
                                </div>
                                <h3 className="font-bold text-slate-900 mb-2">{card.title}</h3>
                                <p className="text-sm text-slate-500 leading-relaxed font-medium">{card.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // Landing Page Layout (Image 1)
    return (
        <div className="min-h-screen flex items-center px-6 md:px-20 py-12 bg-[#fcfdff]">
            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* Left Side: Branding & Features */}
                <div className="space-y-10">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-purple-600/30">
                            <Bot size={36} className="text-white" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-blue-600 italic">
                            Skill-Bridge AI
                        </h1>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight">
                            Transform Your Career with <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">AI-Powered Learning</span>
                        </h2>
                        <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-xl">
                            Upload your resume, discover skill gaps, and get personalized learning paths to land your dream job.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                        {[
                            { icon: <Target className="text-purple-500" />, text: "AI-Powered Skill Analysis" },
                            { icon: <Layers className="text-blue-500" />, text: "Personalized Study Plans" },
                            { icon: <Video className="text-indigo-500" />, text: "Curated Learning Resources" },
                            { icon: <Star className="text-orange-500" />, text: "Track Your Progress" }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-center gap-4"
                            >
                                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shadow-sm border border-slate-100">
                                    <Sparkles size={20} className="text-purple-600" />
                                </div>
                                <span className="font-bold text-slate-600 text-sm whitespace-nowrap">{item.text}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Placeholder for Auth (will be injected in App.jsx) */}
                <div id="auth-slot"></div>
            </div>
        </div>
    );
};

export default Hero;
