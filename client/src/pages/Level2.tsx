import { useState } from "react";
import { motion } from "framer-motion";
import { Leaf, Star, Play, Lock, CheckCircle } from "lucide-react";
import LessonCard from "@/components/LessonCard";
import QuestCard from "@/components/QuestCard";
import VideoPlayer from "@/components/VideoPlayer";
import QuizModal from "@/components/QuizModal";
import QuestTextModal from "@/components/QuestTextModal";
import QuestDetailModal from "@/components/QuestDetailModal";
import ProgressBar from "@/components/ProgressBar";
import SuccessModal from "@/components/SuccessModal";
import OrganicShape from "@/components/OrganicShape";
import HamburgerMenu from "@/components/HamburgerMenu";
import LevelDropdown from "@/components/LevelDropdown";
import { level2Data } from "@/lib/level2Data";
import { level2QuizData } from "@/lib/level2QuizData";
import logoImage from "@assets/ziesggmbh_59072_a_simple_logo_consisting_of_a_vegetable_and_a_856abd27-b8ca-4aa9-9037-bcb5845c1f60_3_1751544974839.png";
import bkkFirmusLogo from "@assets/Logo_BKK_firmus_high_quality.png";
import ziesLogo from "@assets/zies_logo_transparent_1751546047870.png";

// Simulate progress - in real app this would come from API
const mockProgress = [
  { lessonId: 10, isCompleted: false },
  { lessonId: 11, isCompleted: false },
  { lessonId: 12, isCompleted: false },
  { lessonId: 13, isCompleted: false },
  { lessonId: 14, isCompleted: false },
  { lessonId: 15, isCompleted: false }
];

export default function Level2() {
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showQuestText, setShowQuestText] = useState(false);
  const [showQuestDetail, setShowQuestDetail] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentQuizLesson, setCurrentQuizLesson] = useState<any>(null);
  const [progress, setProgress] = useState(mockProgress);

  const lessons = level2Data;
  const quizData = level2QuizData;

  const completedLessonIds = progress.filter(p => p.isCompleted).map(p => p.lessonId);
  // All quests are available from start in Level 2
  const nextAvailableLesson = lessons.find(lesson => !completedLessonIds.includes(lesson.id));

  const handleLessonClick = (lesson: any) => {
    const isCompleted = completedLessonIds.includes(lesson.id);
    const isAvailable = true; // All quests are available in Level 2
    
    if (isAvailable) {
      setSelectedLesson(lesson);
      setShowQuestDetail(true);
    }
  };

  const handleQuestTextComplete = () => {
    setShowQuestText(false);
    // Auto-open quiz after quest text
    if (selectedLesson) {
      setCurrentQuizLesson(selectedLesson);
      setShowQuiz(true);
    }
  };

  const handleQuizClick = (lesson: any) => {
    const isCompleted = completedLessonIds.includes(lesson.id);
    const isAvailable = true; // All quests are available in Level 2
    
    if (isAvailable) {
      setCurrentQuizLesson(lesson);
      setShowQuiz(true);
    }
  };

  const handleQuizComplete = () => {
    setShowQuiz(false);
    setShowSuccess(true);
    
    // Mark lesson as completed
    if (currentQuizLesson) {
      setProgress(prev => 
        prev.map(p => 
          p.lessonId === currentQuizLesson.id 
            ? { ...p, isCompleted: true }
            : p
        )
      );
    }
  };

  const handleSuccessModalClose = () => {
    setShowSuccess(false);
    setSelectedLesson(null);
    setCurrentQuizLesson(null);
  };

  const handleSuccessModalContinue = () => {
    setShowSuccess(false);
    setSelectedLesson(null);
    setCurrentQuizLesson(null);
  };

  return (
    <div className="min-h-screen bg-structured text-white">
      {/* Header */}
      <header className="relative overflow-visible bg-black bg-opacity-30 z-10">
        <div className="container mx-auto px-4 py-6 relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center bg-white">
                <img 
                  src={logoImage} 
                  alt="Logo" 
                  className="w-24 h-24 object-cover"
                  style={{
                    filter: 'invert(1) hue-rotate(180deg) saturate(1.8) brightness(1.2) contrast(1.5)'
                  }}
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold">NutriLern</h1>
                <p className="text-gray-300 text-sm">Interaktive Lerneinheit zum Thema Ernährung & Bewegung</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <LevelDropdown />
              <HamburgerMenu />
            </div>
          </div>
        </div>

        {/* Organic shapes */}
        <OrganicShape className="absolute -top-10 -right-10 w-32 h-32 opacity-20" />
        <OrganicShape className="absolute -bottom-5 -left-5 w-24 h-24 opacity-15" variant="alt" />
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Level Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Star className="text-yellow-400" size={24} />
            <h2 className="text-3xl font-bold">Gruppenmodus</h2>
            <Star className="text-yellow-400" size={24} />
          </div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Jetzt wird's praktisch: Wendet euer Wissen an und knackt die Quests als Gruppe!
          </p>
        </motion.div>

        {/* Progress Overview */}
        <ProgressBar 
          completedLessons={completedLessonIds.length} 
          totalLessons={lessons.length}
          itemType="Quests"
        />

        {/* Lessons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {lessons.map((lesson, index) => {
            const isCompleted = completedLessonIds.includes(lesson.id);
            const isAvailable = true; // All quests are available in Level 2
            
            return (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <QuestCard
                  lesson={lesson}
                  isCompleted={isCompleted}
                  isAvailable={isAvailable}
                  onQuizClick={() => handleLessonClick(lesson)}
                />
              </motion.div>
            );
          })}
        </div>
      </main>

      {/* Modals */}
      {showQuestDetail && selectedLesson && (
        <QuestDetailModal
          quest={selectedLesson}
          onClose={() => setShowQuestDetail(false)}
        />
      )}

      {showQuestText && selectedLesson && (
        <QuestTextModal
          lesson={selectedLesson}
          onClose={() => setShowQuestText(false)}
          onComplete={handleQuestTextComplete}
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
          onClose={handleSuccessModalClose}
          onContinue={handleSuccessModalContinue}
        />
      )}
    </div>
  );
}