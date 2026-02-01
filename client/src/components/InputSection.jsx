import React from 'react';
import { Upload, Type, Sparkles, Loader2 } from 'lucide-react';

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
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/60 border border-slate-50 p-8 md:p-12 relative overflow-hidden">
            {/* Input Toggle */}
            <div className="flex gap-4 mb-10 bg-slate-50 p-1.5 rounded-2xl w-fit mx-auto">
                <button
                    onClick={() => setInputType('file')}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all text-sm font-bold ${inputType === 'file'
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-slate-400 hover:text-slate-600'
                        }`}
                >
                    <Upload size={18} />
                    <span>Upload Resume</span>
                </button>
                <button
                    onClick={() => setInputType('text')}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all text-sm font-bold ${inputType === 'text'
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-slate-400 hover:text-slate-600'
                        }`}
                >
                    <Type size={18} />
                    <span>Type Skills</span>
                </button>
            </div>

            {/* Upload Area */}
            <div className="mb-10">
                {inputType === 'file' ? (
                    <div className="relative border-4 border-dashed border-slate-100 rounded-[2rem] p-12 hover:bg-slate-50/50 transition-colors text-center cursor-pointer group">
                        <input
                            type="file"
                            accept=".pdf"
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        <div className="w-20 h-20 bg-purple-100/50 rounded-full flex items-center justify-center text-purple-600 mx-auto mb-6 group-hover:scale-110 transition-transform">
                            <Upload size={32} />
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-slate-800 mb-2">
                                {file ? file.name : "Drop your resume here"}
                            </h3>
                            <p className="text-slate-400 font-medium">
                                {file ? "Click to change" : "or click to browse (PDF format only)"}
                            </p>
                            <p className="text-[10px] text-slate-300 font-bold uppercase mt-2">Maximum file size: 10MB</p>
                        </div>
                    </div>
                ) : (
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="e.g. I know HTML, CSS and a bit of Python..."
                        className="w-full h-[200px] p-6 rounded-[2rem] border-4 border-dashed border-slate-100 focus:border-blue-100 outline-none resize-none text-slate-700 placeholder:text-slate-300 bg-white font-medium shadow-inner shadow-slate-50"
                    />
                )}
            </div>

            {/* Target Role & Lang */}
            <div className="space-y-6 mb-10 max-w-2xl mx-auto">
                <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3 ml-2 text-left">Select Your Target Role</label>
                    <div className="relative flex items-center bg-slate-50 px-4 py-4 rounded-2xl border border-slate-100">
                        <div className="absolute left-4">🚀</div>
                        <select
                            value={targetRole}
                            onChange={(e) => setTargetRole(e.target.value)}
                            className="w-full bg-transparent text-slate-700 text-sm font-bold outline-none cursor-pointer pl-8"
                        >
                            <option value="Full Stack Developer">Full Stack Developer</option>
                            <option value="Backend Developer">Backend Developer</option>
                            <option value="Frontend Developer">Frontend Developer</option>
                            <option value="Data Scientist">Data Scientist</option>
                            <option value="DevOps Engineer">DevOps Engineer</option>
                            <option value="Mobile App Developer">Mobile App Developer</option>
                        </select>
                    </div>
                </div>

                <div className="flex items-center gap-2 mb-6 px-5 py-3 bg-purple-50/40 rounded-2xl border border-purple-50">
                    <Sparkles size={16} className="text-purple-400" />
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.05em] flex-1 text-left">Hybrid AI Expert Engine Ready</p>
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-slate-400 uppercase">Input:</span>
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="bg-purple-100 text-purple-700 text-[10px] font-black outline-none cursor-pointer uppercase py-1 px-3 rounded-full"
                        >
                            <option value="Hindi">Hindi</option>
                            <option value="Gujarati">Gujarati</option>
                            <option value="English">English</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Action Button */}
            <div className="max-w-2xl mx-auto">
                <button
                    onClick={onAnalyze}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-purple-400 to-blue-500 hover:from-purple-500 hover:to-blue-600 text-white font-black py-5 rounded-[1.5rem] shadow-xl shadow-blue-200/50 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg"
                >
                    {isLoading ? (
                        <>
                            <Loader2 size={24} className="animate-spin" />
                            <span>Analyzing Resume with AI...</span>
                        </>
                    ) : (
                        <>
                            <Sparkles size={20} />
                            <span>Analyze Resume with AI</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default InputSection;
