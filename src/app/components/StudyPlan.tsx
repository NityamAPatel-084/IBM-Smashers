import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/app/components/ui/alert';
import { Progress } from '@/app/components/ui/progress';
import { 
  Youtube, 
  AlertCircle, 
  BookOpen, 
  Clock, 
  Target,
  CheckCircle2,
  ArrowLeft,
  Trophy,
  Zap
} from 'lucide-react';
import React from 'react';

interface StudyPlanItem {
  topic: string;
  duration: string;
  youtube_search_term: string;
  reason: string;
}

interface AnalysisResult {
  summary: string;
  skill_gaps: string[];
  study_plan: StudyPlanItem[];
}

interface StudyPlanProps {
  result: AnalysisResult;
  onReset: () => void;
}

export function StudyPlan({ result, onReset }: StudyPlanProps) {
  const [completedItems, setCompletedItems] = React.useState<Set<number>>(new Set());

  const handleWatchNow = (searchTerm: string) => {
    const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchTerm)}`;
    window.open(searchUrl, '_blank');
  };

  const toggleComplete = (index: number) => {
    const newCompleted = new Set(completedItems);
    if (newCompleted.has(index)) {
      newCompleted.delete(index);
    } else {
      newCompleted.add(index);
    }
    setCompletedItems(newCompleted);
  };

  const progressPercentage = (completedItems.size / result.study_plan.length) * 100;

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Your Personalized Study Plan
          </h1>
          <p className="text-gray-600 mt-2">AI-powered skill gap analysis and learning roadmap</p>
        </div>
        <Button onClick={onReset} variant="outline" size="lg" className="shadow-md">
          <ArrowLeft className="w-4 h-4 mr-2" />
          New Analysis
        </Button>
      </div>

      {/* Progress Card */}
      <Card className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 border-purple-200 shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl">Your Progress</CardTitle>
                <CardDescription>Keep learning to reach your goals!</CardDescription>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-purple-600">
                {completedItems.size}/{result.study_plan.length}
              </p>
              <p className="text-sm text-gray-600">Topics Completed</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={progressPercentage} className="h-3" />
          <p className="text-sm text-gray-600 mt-2">
            {progressPercentage === 100 
              ? '🎉 Congratulations! You completed your study plan!' 
              : `${Math.round(progressPercentage)}% complete - Keep going!`}
          </p>
        </CardContent>
      </Card>

      {/* Summary Alert */}
      <Alert className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-300 shadow-lg">
        <Target className="h-6 w-6 text-blue-600" />
        <AlertTitle className="text-blue-900 text-lg">Analysis Summary</AlertTitle>
        <AlertDescription className="text-blue-800 text-base">
          {result.summary}
        </AlertDescription>
      </Alert>

      {/* Skill Gaps */}
      <Card className="border-red-200 bg-gradient-to-br from-red-50 to-orange-50 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-red-900 text-2xl">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            Critical Skill Gaps
          </CardTitle>
          <CardDescription className="text-red-700 text-base">
            These skills are missing from your resume but essential for your target role
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {result.skill_gaps.map((skill, index) => (
              <Badge 
                key={index} 
                variant="destructive"
                className="px-4 py-2 text-base font-medium shadow-md"
              >
                <Zap className="w-4 h-4 mr-1" />
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Study Plan Timeline */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl font-bold">Your Learning Roadmap</h2>
        </div>

        <div className="grid gap-6">
          {result.study_plan.map((item, index) => {
            const isCompleted = completedItems.has(index);
            
            return (
              <Card 
                key={index}
                className={`hover:shadow-2xl transition-all border-l-4 ${
                  isCompleted 
                    ? 'border-l-green-500 bg-green-50/50' 
                    : 'border-l-purple-500 bg-white'
                }`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-3 flex-wrap">
                        <Badge 
                          variant="secondary" 
                          className="bg-purple-100 text-purple-800 px-3 py-1 text-sm font-semibold"
                        >
                          <Clock className="w-3 h-3 mr-1" />
                          {item.duration}
                        </Badge>
                        <Badge 
                          variant="outline" 
                          className="px-3 py-1 text-sm"
                        >
                          Day {index + 1}
                        </Badge>
                      </div>
                      <CardTitle className="text-2xl flex items-center gap-2">
                        {item.topic}
                      </CardTitle>
                      <CardDescription className="text-base leading-relaxed">
                        {item.reason}
                      </CardDescription>
                    </div>
                    <Button
                      variant={isCompleted ? "default" : "outline"}
                      size="icon"
                      className={`flex-shrink-0 h-12 w-12 rounded-full ${
                        isCompleted ? 'bg-green-600 hover:bg-green-700' : ''
                      }`}
                      onClick={() => toggleComplete(index)}
                    >
                      <CheckCircle2 className={`w-6 h-6 ${isCompleted ? 'text-white' : 'text-gray-400'}`} />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex-1 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl px-5 py-4 border border-gray-200">
                      <p className="text-xs text-gray-600 mb-2 font-semibold uppercase tracking-wide">
                        Recommended YouTube Search
                      </p>
                      <p className="font-mono text-sm text-gray-800">{item.youtube_search_term}</p>
                    </div>
                    <Button
                      onClick={() => handleWatchNow(item.youtube_search_term)}
                      className="bg-red-600 hover:bg-red-700 shadow-lg hover:shadow-xl transition-all h-12 px-6"
                      size="lg"
                    >
                      <Youtube className="w-5 h-5 mr-2" />
                      Watch Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Timeline Summary */}
      <Card className="bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 border-green-200 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="p-2 bg-green-100 rounded-lg">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
            Estimated Timeline & Commitment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm">
              <span className="text-gray-600 font-medium">Total Study Duration</span>
              <span className="font-bold text-2xl text-green-600">
                {result.study_plan.reduce((total, item) => {
                  const days = parseInt(item.duration.match(/\d+/)?.[0] || '0');
                  return total + days;
                }, 0)} Days
              </span>
            </div>
            <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm">
              <span className="text-gray-600 font-medium">Topics to Master</span>
              <span className="font-bold text-2xl text-purple-600">
                {result.study_plan.length} Skills
              </span>
            </div>
            <p className="text-gray-700 text-center p-4 bg-white rounded-lg">
              💪 <strong>Pro Tip:</strong> Consistent daily practice (2-3 hours) will help you master these skills and become job-ready faster!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}