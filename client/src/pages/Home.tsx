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
import logoImage from "@assets/ziesggmbh_59072_a_simple_logo_consisting_of_a_vegetable_and_a_856abd27-b8ca-4aa9-9037-bcb5845c1f60_3_1751544974839.png";
import bkkFirmusLogo from "@assets/Logo_BKK_firmus_5C_300dpi-removebg_1751546007429.png";
import ziesLogo from "@assets/zies_logo_transparent_1751546047870.png";

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
              <div className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center relative">
                <div className="relative w-24 h-24">
                  <div className="absolute inset-0 bg-white"></div>
                  <img 
                    src={logoImage} 
                    alt="Logo" 
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                      filter: 'invert(1) hue-rotate(158deg) saturate(5) brightness(0.6)',
                      mixBlendMode: 'multiply'
                    }}
                  />
                </div>
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

      {/* Footer Information Boxes */}
      <div className="container mx-auto px-4 py-8 space-y-4">
        {/* BKK firmus Support Box */}
        <div className="bg-navy-light rounded-2xl p-6 relative overflow-hidden">
          <div className="grid grid-cols-[1fr_128px] gap-4 items-start relative z-10">
            <p className="text-white text-sm leading-relaxed">
              Die kostenfreie Nutzung dieser Maßnahme wird durch die Unterstützung der BKK firmus im Rahmen des Präventionsgesetzes möglich. Als Partner für innovative Gesundheitsförderung ermöglicht die BKK firmus den Zugang zu wissenschaftlich fundierten Präventionsprogrammen. Das Team der BKK firmus wünscht Ihnen bei der Absolvierung dieses Programms viel Spaß!
            </p>
            <div className="flex justify-center">
              <img 
                src={bkkFirmusLogo} 
                alt="BKK firmus Logo" 
                className="h-8 w-auto max-w-full object-contain"
              />
            </div>
          </div>
        </div>

        {/* ZIES gGmbH Information Box */}
        <div className="bg-navy-light rounded-2xl p-6 relative overflow-hidden">
          <div className="grid grid-cols-[1fr_128px] gap-4 items-start relative z-10">
            <p className="text-white text-sm leading-relaxed">
              Entwickler der Materialien ist das Zentrum für Forschung und Diagnostik bei Implantaten, Entzündungen und Schmerzen gemeinnützige GmbH – kurz: ZIES gGmbH. Die ZIES gGmbH setzt sich ein für Beratung, Diagnostik sowie Aufklärung und Prävention. Die ZIES gGmbH ist eine gemeinnützige Initiative. Es ist unabhängig von Firmen, Verbänden oder anderen Interessengruppen.
            </p>
            <div className="flex justify-center">
              <img 
                src={ziesLogo} 
                alt="ZIES gGmbH Logo" 
                className="h-8 w-auto max-w-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>

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
