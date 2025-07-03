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
              <div className="w-16 h-16 bg-orange-custom rounded-full flex items-center justify-center">
                <svg className="w-12 h-12" viewBox="0 0 100 100" fill="none">
                  {/* Carrot body */}
                  <path d="M50 35 L40 85 Q45 88 50 85 Q55 88 60 85 L50 35 Z" fill="#000"/>
                  
                  {/* Carrot lines */}
                  <rect x="45" y="50" width="10" height="2" fill="#ff6b35"/>
                  <rect x="43" y="58" width="14" height="2" fill="#ff6b35"/>
                  <rect x="41" y="66" width="18" height="2" fill="#ff6b35"/>
                  <rect x="42" y="74" width="16" height="2" fill="#ff6b35"/>
                  
                  {/* Carrot leaves */}
                  <path d="M44 35 Q38 20 42 15 Q46 20 50 35" fill="#000"/>
                  <path d="M56 35 Q62 20 58 15 Q54 20 50 35" fill="#000"/>
                  
                  {/* Dumbbell left */}
                  <rect x="8" y="40" width="12" height="20" rx="6" fill="#000"/>
                  <rect x="2" y="45" width="8" height="10" rx="4" fill="#000"/>
                  
                  {/* Dumbbell right */}
                  <rect x="80" y="40" width="12" height="20" rx="6" fill="#000"/>
                  <rect x="90" y="45" width="8" height="10" rx="4" fill="#000"/>
                  
                  {/* Dumbbell bar */}
                  <rect x="20" y="47" width="60" height="6" rx="3" fill="#000"/>
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
