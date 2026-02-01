import React, { useEffect } from 'react';
import { ArrowLeft, Trophy, Target, AlertCircle, Layers, Youtube, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

const Results = ({ data, onReset, session }) => {
    useEffect(() => {
        if (data) {
            // Trigger confetti on load
            confetti({
                particleCount: 150,
                spread: 100,
                origin: { y: 0.6 },
                colors: ['#3b82f6', '#f97316', '#10b981', '#ef4444']
            });
        }
    }, [data]);

    if (!data) return null;

    // Determine number of gaps for progress
    const totalGaps = data.missing_skills?.length || 0;
    const studyItems = data.study_plan?.length || 0;

    return (
        <div className="max-w-5xl mx-auto px-6 py-12">

            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                    <h2 className="text-4xl md:text-5xl font-black text-purple-600 mb-3 tracking-tight">Your Personalized Study Plan</h2>
                    <p className="text-slate-500 font-medium text-lg">AI-powered skill gap analysis and learning roadmap</p>
                </div>
                <button
                    onClick={onReset}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl text-slate-700 font-bold hover:bg-slate-50 transition-all shadow-sm"
                >
                    <ArrowLeft size={18} />
                    <span>New Analysis</span>
                </button>
            </div>

            <div className="space-y-8">

                {/* Progress Card (Image 5) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-[2rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden"
                >
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-200 flex-shrink-0">
                        <Trophy size={32} className="text-white" />
                    </div>
                    <div className="flex-1 w-full">
                        <div className="flex justify-between items-end mb-4">
                            <div>
                                <h3 className="text-2xl font-black text-slate-800">Your Progress</h3>
                                <p className="text-slate-400 font-bold text-sm">Keep learning to reach your goals!</p>
                            </div>
                            <div className="text-right">
                                <span className="text-3xl font-black text-purple-600">0/{studyItems}</span>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Topics Completed</p>
                            </div>
                        </div>
                        <div className="h-4 bg-slate-100 rounded-full overflow-hidden mb-3 border border-slate-50">
                            <div className="h-full w-0 bg-gradient-to-r from-purple-500 to-indigo-600 transition-all duration-1000"></div>
                        </div>
                        <p className="text-xs font-bold text-slate-400">0% complete - Keep going!</p>
                    </div>
                </motion.div>

                {/* Analysis Summary (Image 5) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-blue-50/50 border border-blue-100 rounded-[1.5rem] p-6 flex flex-col items-start gap-4"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-200/50 flex items-center justify-center">
                            <Target size={18} className="text-slate-600" />
                        </div>
                        <h4 className="text-blue-700 font-black uppercase text-xs tracking-widest">Analysis Summary</h4>
                    </div>
                    <p className="text-blue-800 font-bold leading-relaxed ml-1">
                        {data.candidate_summary || "Based on our AI analysis, we have identified several key areas for improvement to reach your target role."}
                    </p>
                </motion.div>

                {/* Critical Skill Gaps (Image 5) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-red-50/50 border border-red-100 rounded-[1.5rem] p-6"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                            <AlertCircle size={18} className="text-red-600" />
                        </div>
                        <h4 className="text-red-700 font-black uppercase text-xs tracking-widest">Critical Skill Gaps</h4>
                    </div>
                    <p className="text-red-600 font-bold text-sm mb-6 ml-1">These skills are missing from your resume but essential for your target role</p>

                    <div className="flex flex-wrap gap-3 ml-1">
                        {data.missing_skills?.map((skill, i) => (
                            <span key={i} className="bg-white px-4 py-2 rounded-xl text-slate-700 text-sm font-bold border border-red-100 shadow-sm flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                                {skill}
                            </span>
                        ))}
                    </div>
                </motion.div>

                {/* Study Plan Roadmap */}
                <div className="pt-10">
                    <h3 className="text-2xl font-black text-slate-800 mb-8 flex items-center gap-3">
                        <Layers size={24} className="text-indigo-600" />
                        Interactive Roadmap
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data.study_plan?.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 + (i * 0.1) }}
                                className="bg-white rounded-[2rem] p-6 shadow-xl shadow-slate-200/50 border border-slate-50 flex flex-col group hover:-translate-y-2 transition-all duration-300"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <span className="bg-indigo-50 text-indigo-700 text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-widest">
                                        {step.day || `Step ${i + 1}`}
                                    </span>
                                    <BookOpen size={20} className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
                                </div>
                                <h4 className="text-lg font-black text-slate-900 mb-3 leading-tight">{step.topic}</h4>
                                <p className="text-slate-500 text-sm font-medium leading-relaxed mb-6 flex-1">
                                    {step.description}
                                </p>
                                <a
                                    href={`https://www.youtube.com/results?search_query=${encodeURIComponent(step.youtube_query)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full flex items-center justify-center gap-2 py-3 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition-all active:scale-95"
                                >
                                    <Youtube size={16} />
                                    Watch Tutorial
                                </a>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Results;
