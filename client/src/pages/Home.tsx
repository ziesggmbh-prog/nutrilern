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
                  {/* Carrot body - tapered triangle shape */}
                  <path d="M50 30 L35 85 Q40 90 50 88 Q60 90 65 85 L50 30 Z" fill="#000"/>
                  
                  {/* Carrot horizontal lines - different widths */}
                  <ellipse cx="50" cy="45" rx="6" ry="1.5" fill="#ff6b35"/>
                  <ellipse cx="50" cy="55" rx="8" ry="1.5" fill="#ff6b35"/>
                  <ellipse cx="50" cy="65" rx="10" ry="1.5" fill="#ff6b35"/>
                  <ellipse cx="50" cy="75" rx="12" ry="1.5" fill="#ff6b35"/>
                  
                  {/* Carrot leaves - more organic shapes */}
                  <path d="M42 30 Q35 15 40 10 Q45 15 48 25 Q46 28 42 30" fill="#000"/>
                  <path d="M58 30 Q65 15 60 10 Q55 15 52 25 Q54 28 58 30" fill="#000"/>
                  <line x1="45" y1="28" x2="50" y2="30" stroke="#000" strokeWidth="2"/>
                  <line x1="55" y1="28" x2="50" y2="30" stroke="#000" strokeWidth="2"/>
                  
                  {/* Dumbbell - more rounded, integrated design */}
                  <g fill="#000">
                    {/* Left weight */}
                    <ellipse cx="15" cy="50" rx="8" ry="12"/>
                    <rect x="7" y="46" width="5" height="8" rx="2"/>
                    
                    {/* Right weight */}
                    <ellipse cx="85" cy="50" rx="8" ry="12"/>
                    <rect x="88" y="46" width="5" height="8" rx="2"/>
                    
                    {/* Center bar through carrot */}
                    <rect x="23" y="48" width="54" height="4" rx="2"/>
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
