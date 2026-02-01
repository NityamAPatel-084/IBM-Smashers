import React, { useEffect } from 'react';
import { ExternalLink, CheckCircle, AlertTriangle, BookOpen, PlayCircle, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

const Results = ({ data }) => {
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

    return (
        <div className="max-w-4xl mx-auto px-6 py-12 space-y-10">

            {/* Header / Engine Status */}
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider">
                    <BookOpen size={14} />
                    <span>Skill-Bridge AI Analysis Engine</span>
                </div>
                <div className="text-slate-400 text-sm font-medium">
                    Analysis for: {data.student_name || "Candidate"}
                </div>
            </div>

            {/* 1. Candidate Summary Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden"
            >
                <div className="p-6 md:p-8 border-b border-slate-50 bg-slate-50/50 flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                        <CheckCircle size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-slate-800">Professional Summary</h2>
                        <p className="text-sm text-slate-500 font-medium">AI generated profile overview</p>
                    </div>
                </div>
                <div className="p-6 md:p-8">
                    <p className="text-lg text-slate-700 leading-relaxed font-medium italic">
                        "{data.candidate_summary || data.summary}"
                    </p>
                </div>
            </motion.div>

            {/* 2. Skill Gaps Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden"
            >
                <div className="p-6 md:p-8 border-b border-slate-50 bg-slate-50/50 flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-200">
                        <AlertTriangle size={22} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-slate-800">Critical Skill Gaps</h2>
                        <p className="text-sm text-slate-500 font-medium">Identified missing competencies</p>
                    </div>
                </div>
                <div className="p-6 md:p-8">
                    <div className="flex flex-wrap gap-3">
                        {(data.missing_skills || data.skill_gaps)?.map((skill, index) => (
                            <div key={index} className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 border border-red-100 rounded-xl text-sm font-bold shadow-sm">
                                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                                {skill}
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* 3. Study Plan Card */}
            <div className="space-y-6">
                <div className="flex items-center gap-3 ml-2">
                    <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-green-200">
                        <Calendar size={22} />
                    </div>
                    <h2 className="text-2xl font-black text-slate-800 tracking-tight">Personalized Upskilling Plan</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {data.study_plan?.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
                            className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden flex flex-col group hover:shadow-2xl hover:border-blue-200 transition-all cursor-default"
                        >
                            <div className="p-6 flex-1">
                                <div className="flex items-start justify-between mb-4">
                                    <span className="px-3 py-1 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-lg">
                                        {item.day || item.duration}
                                    </span>
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                        <PlayCircle size={20} className="text-red-500" />
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">
                                    {item.topic}
                                </h3>
                                <div className="space-y-3">
                                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Reason</p>
                                        <p className="text-sm text-slate-600 font-medium leading-relaxed">
                                            {item.description || item.reason}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <a
                                href={`https://www.youtube.com/results?search_query=${encodeURIComponent(item.youtube_query || item.youtube_search_term)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-red-600 hover:bg-black text-white py-4 px-6 flex items-center justify-center gap-2 font-bold transition-all group-hover:gap-3"
                            >
                                <PlayCircle size={20} />
                                <span>Watch on YouTube</span>
                                <ExternalLink size={16} className="opacity-70" />
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default Results;
