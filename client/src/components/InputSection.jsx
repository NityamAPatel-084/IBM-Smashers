import { Upload, FileText, Type, ArrowRight, Loader2, Languages, Briefcase, Search } from 'lucide-react';

const InputSection = ({
    inputType,
    setInputType,
    file,
    setFile,
    text,
    setText,
    language,
    setLanguage,
    targetRole,
    setTargetRole,
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

                {/* Top Bar: Target Role & Language Selector */}
                <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                    <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 flex-1">
                        <Briefcase size={16} className="text-slate-500" />
                        <span className="text-sm font-medium text-slate-600">Target Role</span>
                        <select
                            value={targetRole}
                            onChange={(e) => setTargetRole(e.target.value)}
                            className="bg-transparent text-slate-900 text-sm font-semibold outline-none cursor-pointer flex-1"
                        >
                            <option value="Full Stack Developer">Full Stack Developer</option>
                            <option value="Backend Developer">Backend Developer</option>
                            <option value="Frontend Developer">Frontend Developer</option>
                            <option value="Data Scientist">Data Scientist</option>
                            <option value="DevOps Engineer">DevOps Engineer</option>
                            <option value="Mobile App Developer">Mobile App Developer</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                        <Languages size={16} className="text-slate-500" />
                        <span className="text-sm font-medium text-slate-600">Language</span>
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

                {/* AI Model Status */}
                <div className="flex items-center gap-2 mb-6 px-4 py-2 bg-slate-50 rounded-lg border border-slate-100">
                    <div className="flex -space-x-2">
                        <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center border-2 border-white">
                            <Search size={12} className="text-white" />
                        </div>
                        <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center border-2 border-white">
                            <FileText size={12} className="text-white" />
                        </div>
                    </div>
                    <div className="flex-1">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Analysis Engine</p>
                        <p className="text-xs font-bold text-slate-600">Hybrid ML/AI Expert Model Trained & Ready</p>
                    </div>
                    <div className="flex items-center gap-1.5 bg-green-100 px-2 py-0.5 rounded-full">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-[10px] font-bold text-green-700 uppercase">Live</span>
                    </div>
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
                            <span>Analyzing with Skill-Bridge Engine...</span>
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
