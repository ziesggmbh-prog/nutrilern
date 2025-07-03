import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { motion } from "framer-motion";
import { Leaf, User, Star, Play, Lock, CheckCircle } from "lucide-react";
import LessonCard from "@/components/LessonCard";
import QuestCard from "@/components/QuestCard";
import VideoPlayer from "@/components/VideoPlayer";
import QuizModal from "@/components/QuizModal";
import ProgressBar from "@/components/ProgressBar";
import SuccessModal from "@/components/SuccessModal";
import OrganicShape from "@/components/OrganicShape";
import type { Lesson, UserProgress } from "@shared/schema";

export default function Home() {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentQuizLesson, setCurrentQuizLesson] = useState<Lesson | null>(null);

  const { data: lessons = [], isLoading: lessonsLoading } = useQuery<Lesson[]>({
    queryKey: ["/api/lessons"],
  });

  const { data: progress = [], refetch: refetchProgress } = useQuery<UserProgress[]>({
    queryKey: ["/api/progress"],
  });

  const completedLessonIds = progress.filter(p => p.isCompleted).map(p => p.lessonId);
  const nextAvailableLesson = lessons.find(lesson => 
    !completedLessonIds.includes(lesson.id) && 
    (lesson.order === 1 || completedLessonIds.includes(lessons.find(l => l.order === lesson.order - 1)?.id || 0))
  );

  const handleLessonClick = (lesson: Lesson) => {
    const isCompleted = completedLessonIds.includes(lesson.id);
    const isAvailable = lesson.id === nextAvailableLesson?.id || isCompleted;
    
    if (isAvailable) {
      setSelectedLesson(lesson);
      setShowVideo(true);
    }
  };

  const handleVideoComplete = () => {
    setShowVideo(false);
    if (selectedLesson) {
      setCurrentQuizLesson(selectedLesson);
      setShowQuiz(true);
    }
  };

  const handleQuizComplete = () => {
    setShowQuiz(false);
    setShowSuccess(true);
    refetchProgress();
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    setSelectedLesson(null);
    setCurrentQuizLesson(null);
  };

  if (lessonsLoading) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-structured text-white">
      {/* Header */}
      <header className="relative overflow-hidden bg-black bg-opacity-30">
        
        <div className="container mx-auto px-4 py-6 relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <svg className="w-12 h-12" viewBox="0 0 100 100" fill="none">
                  {/* Dumbbell */}
                  <g fill="#333">
                    <rect x="8" y="38" width="12" height="24" rx="3"/>
                    <rect x="80" y="38" width="12" height="24" rx="3"/>
                    <rect x="20" y="44" width="60" height="12" rx="2"/>
                  </g>
                  
                  {/* Plant/Leaves */}
                  <g fill="#22c55e">
                    <path d="M50 28 Q38 12 32 18 Q38 24 50 28"/>
                    <path d="M50 28 Q58 12 68 18 Q62 24 50 28"/>
                    <path d="M50 28 Q44 8 50 2 Q56 8 50 28"/>
                    <line x1="50" y1="28" x2="50" y2="44" stroke="#22c55e" strokeWidth="3"/>
                  </g>
                  
                  {/* Carrot */}
                  <g>
                    <path d="M50 62 L42 88 Q44 94 50 92 Q56 94 58 88 Z" fill="#ff6b35"/>
                    <path d="M44 74 Q48 72 52 74" stroke="#333" strokeWidth="2" fill="none"/>
                    <path d="M45 80 Q49 78 53 80" stroke="#333" strokeWidth="2" fill="none"/>
                    <path d="M46 86 Q50 84 54 86" stroke="#333" strokeWidth="2" fill="none"/>
                  </g>
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold">NutriLern</h1>
                <p className="text-gray-300 text-sm">Interaktive Lerneinheit zum Thema Bewegung & Ernährung</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="bg-navy-light rounded-full px-4 py-2">
                <span className="text-green-custom font-semibold">Level 1</span>
              </div>
              <div className="w-10 h-10 bg-purple-custom rounded-full flex items-center justify-center">
                <User className="text-white" size={20} />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Progress Overview */}
        <ProgressBar completedLessons={completedLessonIds.length} totalLessons={lessons.length} />

        {/* Lesson Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {lessons.map((lesson) => {
            const isCompleted = completedLessonIds.includes(lesson.id);
            const isAvailable = lesson.id === nextAvailableLesson?.id || isCompleted;
            
            return (
              <div key={lesson.id} className="space-y-8 mb-12">
                <LessonCard
                  lesson={lesson}
                  isCompleted={isCompleted}
                  isAvailable={isAvailable}
                  onClick={() => handleLessonClick(lesson)}
                />
                <QuestCard
                  lesson={lesson}
                  isCompleted={isCompleted}
                  isAvailable={isAvailable}
                  onQuizClick={() => {
                    setCurrentQuizLesson(lesson);
                    setShowQuiz(true);
                  }}
                />
              </div>
            );
          })}
        </div>
      </main>

      {/* Modals */}
      {showVideo && selectedLesson && (
        <VideoPlayer
          lesson={selectedLesson}
          onClose={() => setShowVideo(false)}
          onComplete={handleVideoComplete}
        />
      )}

      {showQuiz && currentQuizLesson && (
        <QuizModal
          lesson={currentQuizLesson}
          onClose={() => setShowQuiz(false)}
          onComplete={handleQuizComplete}
        />
      )}

      {showSuccess && (
        <SuccessModal
          onClose={handleSuccessClose}
          onContinue={handleSuccessClose}
        />
      )}
    </div>
  );
}
