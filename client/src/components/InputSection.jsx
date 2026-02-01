import React from 'react';
import { Upload, FileText, Type, ArrowRight, Loader2, Languages } from 'lucide-react';

const InputSection = ({
    inputType,
    setInputType,
    file,
    setFile,
    text,
    setText,
    language,
    setLanguage,
    onAnalyze,
    isLoading
}) => {

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-6 -mt-8 relative z-10">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 md:p-8">

                {/* Top Bar: Language Selector */}
                <div className="flex justify-end mb-6">
                    <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                        <Type size={16} className="text-slate-500" /> {/* Using Type as a placeholder for language icon if Languages isn't imported, or I can import Languages */}
                        <span className="text-sm font-medium text-slate-600">Response Language</span>
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="bg-transparent text-slate-900 text-sm font-semibold outline-none cursor-pointer"
                        >
                            <option value="Hindi">हिंदी (Hindi)</option>
                            <option value="Gujarati">ગુજરાતી (Gujarati)</option>
                            <option value="English">English</option>
                        </select>
                    </div>
                </div>

                {/* Toggle Input Type */}
                <div className="flex gap-4 mb-6">
                    <button
                        onClick={() => setInputType('file')}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border transition-all ${inputType === 'file'
                            ? 'bg-slate-50 border-slate-300 text-slate-800 shadow-sm font-semibold'
                            : 'border-slate-100 text-slate-500 hover:bg-slate-50'
                            }`}
                    >
                        <Upload size={18} />
                        <span>Upload Resume</span>
                    </button>

                    <button
                        onClick={() => setInputType('text')}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border transition-all ${inputType === 'text'
                            ? 'bg-slate-50 border-slate-300 text-slate-800 shadow-sm font-semibold'
                            : 'border-slate-100 text-slate-500 hover:bg-slate-50'
                            }`}
                    >
                        <Type size={18} />
                        <span>Type Skills</span>
                    </button>
                </div>

                {/* Input Area */}
                <div className="min-h-[200px] mb-8">
                    {inputType === 'file' ? (
                        <div className="relative border-2 border-dashed border-blue-200 rounded-xl p-8 hover:bg-blue-50/30 transition-colors text-center cursor-pointer group h-full flex flex-col items-center justify-center">
                            <input
                                type="file"
                                accept=".pdf"
                                onChange={handleFileChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform mb-4">
                                <Upload size={28} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-800 mb-1">
                                    {file ? file.name : "Drop your resume here"}
                                </h3>
                                <p className="text-slate-500">
                                    {file ? "Click to change" : "or click to browse (PDF, max 5MB)"}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="e.g. I know HTML, CSS and a bit of Python..."
                            className="w-full h-[200px] p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none text-slate-700 placeholder:text-slate-400 bg-slate-50"
                        />
                    )}
                </div>

                {/* Action Button */}
                <button
                    onClick={onAnalyze}
                    disabled={isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/20 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
                >
                    {isLoading ? (
                        <>
                            <Loader2 size={24} className="animate-spin" />
                            <span>Analyzing...</span>
                        </>
                    ) : (
                        <>
                            <ArrowRight size={24} />
                            <span>Analyze & Generate Study Plan</span>
                        </>
                    )}
                </button>

            </div>
        </div>
    );
};

export default InputSection;
