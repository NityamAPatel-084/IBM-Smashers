import React, { useEffect } from 'react';
import { ExternalLink, CheckCircle, AlertTriangle, BookOpen, PlayCircle, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

const Results = ({ data }) => {
    useEffect(() => {
        if (data) {
            // Trigger confetti on load
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#3b82f6', '#f97316', '#10b981']
            });
        }
    }, [data]);

    if (!data) return null;

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemAnim = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">

            {/* 1. Candidate Summary Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-blue-600 overflow-hidden"
            >
                <div className="p-6 md:p-8 border-b border-slate-100 flex items-center gap-3">
                    <CheckCircle className="text-green-500" size={28} />
                    <h2 className="text-xl font-bold text-slate-800">Candidate Summary</h2>
                </div>
                <div className="p-6 md:p-8">
                    <p className="text-lg text-slate-600 leading-relaxed">
                        {data.candidate_summary}
                    </p>
                </div>
            </motion.div>

            {/* 2. Skill Gaps Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-orange-500 overflow-hidden"
            >
                <div className="p-6 md:p-8 border-b border-slate-100 flex items-center gap-3">
                    <AlertTriangle className="text-orange-500" size={28} />
                    <h2 className="text-xl font-bold text-slate-800">Skill Gaps Identified</h2>
                </div>
                <div className="p-6 md:p-8">
                    <div className="flex flex-wrap gap-3">
                        {data.missing_skills?.map((skill, index) => (
                            <span key={index} className="px-4 py-2 bg-red-50 text-red-600 border border-red-100 rounded-full text-sm font-medium">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* 3. Study Plan Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-blue-600 overflow-hidden"
            >
                <div className="p-6 md:p-8 border-b border-slate-100 flex items-center gap-3">
                    <Calendar className="text-blue-600" size={28} />
                    <h2 className="text-2xl font-bold text-slate-800">2-Week Study Plan</h2>
                </div>

                <div className="divide-y divide-slate-100">
                    {data.study_plan?.map((item, index) => (
                        <div key={index} className="p-6 md:p-8 hover:bg-slate-50 transition-colors">
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                                <div className="flex-1">
                                    <div className="inline-block bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                                        {item.day}
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">
                                        {item.topic}
                                    </h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>

                                <div className="flex-shrink-0 pt-2">
                                    <a
                                        href={`https://www.youtube.com/results?search_query=${encodeURIComponent(item.youtube_query)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-white text-red-600 border border-red-200 hover:bg-red-50 rounded-lg font-medium transition-colors text-sm"
                                    >
                                        <PlayCircle size={18} />
                                        <span>Watch Tutorial</span>
                                        <ExternalLink size={14} className="ml-1 opacity-50" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

        </div>
    );
};

export default Results;
