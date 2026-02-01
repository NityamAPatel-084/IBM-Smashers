import React from 'react';
import { Sparkles, GraduationCap, ArrowRight, Bot } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <div className="relative overflow-hidden bg-white border-b border-slate-100">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50/50 to-transparent pointer-events-none"></div>

            <div className="max-w-5xl mx-auto px-6 py-20 text-center relative z-10">

                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mx-auto w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-600/20 mb-8 rotate-3 hover:rotate-6 transition-transform"
                >
                    <Bot size={40} className="text-white" />
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-6xl md:text-8xl font-black tracking-tighter text-slate-900 mb-6"
                >
                    <span className="text-blue-700">Kaushal</span>
                    <span className="text-slate-800">-Bot</span>
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="space-y-2 mb-10"
                >
                    <p className="text-2xl md:text-3xl text-slate-600 font-medium">
                        AI Career Guidance in Your Language
                    </p>
                    <p className="text-xl md:text-2xl text-slate-400 font-normal">
                        आपकी भाषा में AI करियर मार्गदर्शन
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-wrap items-center justify-center gap-4"
                >
                    <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full font-semibold border border-blue-100">
                        <GraduationCap size={18} />
                        <span>Resume Analysis</span>
                    </div>

                    <div className="flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-700 rounded-full font-semibold border border-orange-100">
                        <Sparkles size={18} />
                        <span>AI-Powered</span>
                    </div>

                    <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full font-semibold border border-green-100">
                        <span className="text-xs font-bold bg-green-200 px-1.5 rounded">IN</span>
                        <span>Hindi / Gujarati</span>
                    </div>
                </motion.div>

            </div>
        </div>
    );
};

export default Hero;
