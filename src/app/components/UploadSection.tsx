import { Upload, FileText, Sparkles, TrendingUp, Target } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Label } from '@/app/components/ui/label';

interface UploadSectionProps {
  onAnalyze: (file: File, role: string) => void;
  isAnalyzing: boolean;
}

export function UploadSection({ onAnalyze, isAnalyzing }: UploadSectionProps) {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [selectedRole, setSelectedRole] = React.useState<string>('Full Stack Developer');
  const [isDragging, setIsDragging] = React.useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    }
  };

  const handleAnalyze = () => {
    if (selectedFile) {
      onAnalyze(selectedFile, selectedRole);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
          <Sparkles className="w-4 h-4" />
          <span>Powered by Advanced AI Technology</span>
        </div>
        
        <h1 className="text-5xl font-bold">
          <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Analyze Your Resume
          </span>
        </h1>
        
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Get instant AI-powered insights on skill gaps and receive a personalized learning roadmap tailored to your career goals
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-purple-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Target className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Smart Analysis</h3>
          </div>
          <p className="text-sm text-gray-600">AI compares your skills against market demands</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Skill Gap Detection</h3>
          </div>
          <p className="text-sm text-gray-600">Identify exactly what you need to learn</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-indigo-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Sparkles className="w-5 h-5 text-indigo-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Learning Roadmap</h3>
          </div>
          <p className="text-sm text-gray-600">Get curated resources and study plans</p>
        </div>
      </div>

      {/* Upload Card */}
      <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
        {/* Drag and Drop Area */}
        <div
          className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${
            isDragging
              ? 'border-purple-500 bg-purple-50 scale-105'
              : selectedFile
              ? 'border-green-500 bg-green-50'
              : 'border-gray-300 hover:border-purple-400 hover:bg-gray-50'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          
          <label htmlFor="file-upload" className="cursor-pointer">
            <div className="space-y-4">
              {selectedFile ? (
                <>
                  <div className="inline-flex p-4 bg-green-100 rounded-full">
                    <FileText className="w-12 h-12 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xl font-semibold text-green-700">{selectedFile.name}</p>
                    <p className="text-sm text-gray-500 mt-1">File ready • Click to change</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="inline-flex p-4 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full">
                    <Upload className="w-12 h-12 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xl font-semibold text-gray-900">Drop your resume here</p>
                    <p className="text-sm text-gray-500 mt-2">or click to browse (PDF format only)</p>
                    <p className="text-xs text-gray-400 mt-1">Maximum file size: 10MB</p>
                  </div>
                </>
              )}
            </div>
          </label>
        </div>

        {/* Role Selector */}
        <div className="mt-6 space-y-3">
          <Label htmlFor="role-select" className="text-base font-semibold">
            Select Your Target Role
          </Label>
          <Select value={selectedRole} onValueChange={setSelectedRole}>
            <SelectTrigger id="role-select" className="h-12 text-base">
              <SelectValue placeholder="Select target role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Full Stack Developer">🚀 Full Stack Developer</SelectItem>
              <SelectItem value="Frontend Developer">🎨 Frontend Developer</SelectItem>
              <SelectItem value="Backend Developer">⚙️ Backend Developer</SelectItem>
              <SelectItem value="Data Scientist">📊 Data Scientist</SelectItem>
              <SelectItem value="DevOps Engineer">🔧 DevOps Engineer</SelectItem>
              <SelectItem value="Mobile Developer">📱 Mobile Developer</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Analyze Button */}
        <Button
          onClick={handleAnalyze}
          disabled={!selectedFile || isAnalyzing}
          className="w-full mt-6 h-14 text-lg bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 hover:from-purple-700 hover:via-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all"
        >
          {isAnalyzing ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Analyzing Your Resume...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 mr-2" />
              Analyze Resume with AI
            </>
          )}
        </Button>
      </div>

      {/* Trust Indicators */}
      <div className="text-center space-y-2">
        <p className="text-sm text-gray-500">Trusted by 10,000+ students and professionals</p>
        <div className="flex justify-center items-center gap-4 text-xs text-gray-400">
          <span>🔒 Secure & Private</span>
          <span>•</span>
          <span>⚡ Instant Results</span>
          <span>•</span>
          <span>🎯 100% Free</span>
        </div>
      </div>
    </div>
  );
}

import React from 'react';