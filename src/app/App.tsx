import { useState } from 'react';
import { AuthProvider, useAuth } from '@/app/context/AuthContext';
import { AuthPage } from '@/app/components/AuthPage';
import { Navbar } from '@/app/components/Navbar';
import { UploadSection } from '@/app/components/UploadSection';
import { StudyPlan } from '@/app/components/StudyPlan';
import { analyzeResume, type AnalysisResult } from '@/app/utils/mockAnalysis';
import { toast } from 'sonner';
import { Toaster } from '@/app/components/ui/sonner';

function AppContent() {
  const { user, isLoading } = useAuth();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = async (file: File, role: string) => {
    try {
      setIsAnalyzing(true);
      toast.info('Analyzing your resume...', {
        description: 'AI is extracting text and comparing skills',
      });

      const result = await analyzeResume(file, role);
      
      setAnalysisResult(result);
      toast.success('Analysis complete!', {
        description: `Found ${result.skill_gaps.length} skill gaps`,
      });
    } catch (error) {
      toast.error('Analysis failed', {
        description: 'Please try again with a different file',
      });
      console.error('Analysis error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setAnalysisResult(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <Toaster position="top-right" richColors />
      
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        {!analysisResult ? (
          <UploadSection onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
        ) : (
          <StudyPlan result={analysisResult} onReset={handleReset} />
        )}
      </div>

      {/* Footer */}
      <footer className="text-center py-8 text-sm text-gray-500 border-t border-gray-200 bg-white/50">
        <p>
          Powered by AI Analysis Engine • Skill-Bridge AI © 2026
        </p>
        <p className="mt-2">
          🚀 Helping 10,000+ students bridge their skill gaps and land dream jobs
        </p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
