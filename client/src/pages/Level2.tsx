import { useState } from "react";
import { motion } from "framer-motion";
import { Leaf, Star, CheckCircle } from "lucide-react";
import QuestCard from "@/components/QuestCard";
import QuizModal from "@/components/QuizModal";
import QuestTextModal from "@/components/QuestTextModal";
import QuestDetailModal from "@/components/QuestDetailModal";
import ProgressBar from "@/components/ProgressBar";
import SuccessModal from "@/components/SuccessModal";
import OrganicShape from "@/components/OrganicShape";
import HamburgerMenu from "@/components/HamburgerMenu";
import LevelDropdown from "@/components/LevelDropdown";
import FullscreenToggle from "@/components/FullscreenToggle";
import FullscreenRestoreNotification from "@/components/FullscreenRestoreNotification";
import { useFullscreenSync } from "@/hooks/useFullscreenSync";
import { level2Data } from "@/lib/level2Data";
import { level2QuizData } from "@/lib/level2QuizData";
import { getLevel2Progress, saveLevel2Progress, QuestProgress } from "@/lib/progressStorage";
import logoImage from "@assets/logo_opt.png";
import bkkFirmusLogo from "@assets/Logo_BKK_firmus_high_quality.png";
import ziesLogo from "@assets/zies_logo_transparent_1751546047870.png";

// Load progress from persistent storage

export default function Level2() {
  // Initialize fullscreen sync to restore fullscreen if needed
  useFullscreenSync();
  
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showQuestText, setShowQuestText] = useState(false);
  const [showQuestDetail, setShowQuestDetail] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentQuizLesson, setCurrentQuizLesson] = useState<any>(null);
  const [progress, setProgress] = useState<QuestProgress[]>(() => getLevel2Progress());

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

  const handleQuestComplete = (questId: number) => {
    const newProgress = progress.map(p => 
      p.lessonId === questId 
        ? { ...p, isCompleted: true }
        : p
    );
    setProgress(newProgress);
    saveLevel2Progress(newProgress); // Persist to localStorage
    setShowSuccess(true);
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
      const newProgress = progress.map(p => 
        p.lessonId === currentQuizLesson.id 
          ? { ...p, isCompleted: true }
          : p
      );
      setProgress(newProgress);
      saveLevel2Progress(newProgress); // Persist to localStorage
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
    <div className="min-h-screen bg-structured text-white overflow-x-hidden">
      {/* Fullscreen Restore Notification */}
      <FullscreenRestoreNotification />
      
      {/* Header */}
      <header className="relative overflow-visible bg-black bg-opacity-30 z-10">
        <div className="container mx-auto px-4 py-6 relative z-10">
          {/* Mobile: Hamburger links, Modus-Switch rechts, Logo absolut zentriert */}
          <div className="sm:hidden relative flex items-center justify-between">
            <HamburgerMenu />
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center space-x-2 pointer-events-none">
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center">
                <img src={logoImage} alt="" className="w-10 h-10 object-cover rounded-full" />
              </div>
              <h1 className="text-lg font-bold whitespace-nowrap">NutriLern</h1>
            </div>
            <LevelDropdown />
          </div>
          {/* Desktop: unverändert */}
          <div className="hidden sm:flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center">
                <img src={logoImage} alt="" className="w-20 h-20 object-cover rounded-full" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">NutriLern</h1>
                <p className="text-gray-300 text-sm">Interaktive Lerneinheit zum Thema Ernährung</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <LevelDropdown />
              <FullscreenToggle />
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
            <h2 className="text-3xl font-bold">Gruppenmodus</h2>
          </div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Jetzt wird's praktisch: Wendet euer Wissen an und meistert die Quests als Gruppe!
          </p>
        </motion.div>

        {/* Progress Overview removed */}

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {lessons.map((lesson, index) => {
            const isCompleted = completedLessonIds.includes(lesson.id);
            const isAvailable = true; // All quests are available in Level 2
            
            return (
              <div key={lesson.id}>
                <QuestCard
                  lesson={lesson}
                  isCompleted={isCompleted}
                  isAvailable={isAvailable}
                  onQuizClick={() => handleLessonClick(lesson)}
                  isGroupMode={true}
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
          <div className="flex flex-col lg:flex-row lg:items-center gap-6 relative z-10">
            <p className="text-white text-base leading-relaxed flex-1 min-w-0">
              Die kostenfreie Nutzung dieser Maßnahme wird durch die Unterstützung der BKK firmus im Rahmen des Präventionsgesetzes möglich. Als Partner für innovative Gesundheitsförderung ermöglicht die BKK firmus den Zugang zu wissenschaftlich fundierten Präventionsprogrammen. Das Team der BKK firmus wünscht Ihnen bei der Absolvierung des Programms viel Spaß!
            </p>
            <div className="flex justify-start lg:justify-end flex-shrink-0 lg:pl-4">
              <img 
                src={bkkFirmusLogo} 
                alt="BKK firmus Logo" 
                className="h-24 w-auto object-contain" 
                style={{ maxWidth: '180px' }}
              />
            </div>
          </div>
        </div>

        {/* ZIES gGmbH Information Box */}
        <div className="bg-navy-light rounded-2xl p-6 relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6 relative z-10">
            <p className="text-white text-base leading-relaxed flex-1 min-w-0">
              Entwickler der Materialien ist das Zentrum für Forschung und Diagnostik bei Implantaten, Entzündungen und Schmerzen gemeinnützige GmbH. Die ZIES gGmbH setzt sich ein für Beratung und Diagnostik, Aufklärung und Prävention. Als gemeinnützige Initiative ist sie unabhängig von Firmen, Verbänden oder anderen Interessengruppen.
            </p>
            <div className="flex justify-start lg:justify-end flex-shrink-0 lg:pl-4">
              <img 
                src={ziesLogo} 
                alt="ZIES gGmbH Logo" 
                className="h-24 w-auto object-contain" 
                style={{ maxWidth: '180px' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showQuestDetail && selectedLesson && (
        <QuestDetailModal
          quest={selectedLesson}
          onClose={() => setShowQuestDetail(false)}
          onQuestComplete={handleQuestComplete}
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