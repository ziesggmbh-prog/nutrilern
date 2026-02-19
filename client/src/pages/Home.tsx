import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, User, Star, Play, Lock, CheckCircle, RotateCcw, X } from "lucide-react";
import LessonCard from "@/components/LessonCard";
import QuestCard from "@/components/QuestCard";
import VideoPlayer from "@/components/VideoPlayer";
import QuizModal from "@/components/QuizModal";
import ProgressBar from "@/components/ProgressBar";
import OrganicShape from "@/components/OrganicShape";
import HamburgerMenu from "@/components/HamburgerMenu";
import LevelDropdown from "@/components/LevelDropdown";
import FullscreenToggle from "@/components/FullscreenToggle";
import FullscreenRestoreNotification from "@/components/FullscreenRestoreNotification";
import { useFullscreenSync } from "@/hooks/useFullscreenSync";
import { useImagePreloader } from "@/hooks/useImagePreloader";
import type { Lesson, UserProgress } from "@shared/schema";
import { quizData } from "@/lib/quizData";
import { queryClient } from "@/lib/queryClient";
import logoImage from "@assets/ziesggmbh_59072_a_simple_logo_consisting_of_a_vegetable_and_a_856abd27-b8ca-4aa9-9037-bcb5845c1f60_3_1751544974839.png";
import bkkFirmusLogo from "@assets/bkk_firmus_logo.svg";
import ziesLogo from "@assets/zies_logo_official.svg";

declare global {
  interface Window {
    Vimeo: {
      Player: any;
    };
  }
}

export default function Home() {
  // Initialize fullscreen sync to restore fullscreen if needed
  useFullscreenSync();
  
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuizLesson, setCurrentQuizLesson] = useState<Lesson | null>(null);

  const [showIntroOverlay, setShowIntroOverlay] = useState(() => {
    return !localStorage.getItem('introSeen');
  });
  const [introPlaying, setIntroPlaying] = useState(false);
  const [introEnded, setIntroEnded] = useState(false);
  const introIframeRef = useRef<HTMLIFrameElement>(null);
  const introPlayerRef = useRef<any>(null);

  useEffect(() => {
    if (!showIntroOverlay || !introPlaying) return;
    
    const setupIntroPlayer = () => {
      if (typeof window.Vimeo === 'undefined') {
        setTimeout(setupIntroPlayer, 100);
        return;
      }
      if (introIframeRef.current && !introPlayerRef.current) {
        try {
          const player = new window.Vimeo.Player(introIframeRef.current);
          introPlayerRef.current = player;
          player.on('ended', () => {
            setIntroEnded(true);
          });
        } catch (e) {
          console.log('Failed to setup intro player:', e);
        }
      }
    };
    setupIntroPlayer();
  }, [showIntroOverlay, introPlaying]);

  const handleSkipIntro = () => {
    localStorage.setItem('introSeen', 'true');
    setShowIntroOverlay(false);
    introPlayerRef.current = null;
  };

  const handleReplayIntro = async () => {
    setIntroEnded(false);
    if (introPlayerRef.current) {
      try {
        await introPlayerRef.current.setCurrentTime(0);
        await introPlayerRef.current.play();
      } catch (e) {
        console.log('Failed to replay intro:', e);
      }
    }
  };

  


  // Load lessons from API
  const { data: lessons = [], isLoading: lessonsLoading } = useQuery<Lesson[]>({
    queryKey: ["/api/lessons"],
  });
  


  const { data: progress = [], refetch: refetchProgress } = useQuery<UserProgress[]>({
    queryKey: ["/api/progress"],
  });

  // Preload thumbnail images for faster loading
  const thumbnailUrls = lessons.map(lesson => lesson.thumbnailUrl).filter(Boolean);
  const { isLoaded, loadedCount } = useImagePreloader(thumbnailUrls);

  // Show loading state while lessons are being fetched
  if (lessonsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-lg text-gray-600">Lade Lektionen...</div>
      </div>
    );
  }

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

  const handleVideoComplete = async () => {
    setShowVideo(false);
    if (selectedLesson) {
      // Check if this lesson has a quiz
      const hasQuiz = quizData.some(quiz => quiz.lessonId === selectedLesson.id);
      
      if (hasQuiz) {
        // Show quiz modal
        setCurrentQuizLesson(selectedLesson);
        setShowQuiz(true);
      } else {
        // No quiz - directly mark lesson as completed (for Intro)
        try {
          const response = await fetch(`/api/lessons/${selectedLesson.id}/complete`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
          });
          
          if (!response.ok) {
            throw new Error('Failed to complete lesson');
          }
          
          // Reset states and refresh progress
          setSelectedLesson(null);
          refetchProgress();
        } catch (error) {
          console.error('Error completing lesson:', error);
          // Fallback - just reset states
          setSelectedLesson(null);
        }
      }
    }
  };

  const handleQuizClick = (lesson: any) => {
    setCurrentQuizLesson(lesson);
    setShowQuiz(true);
  };

  const handleQuizComplete = () => {
    setShowQuiz(false);
    setSelectedLesson(null);
    setCurrentQuizLesson(null);
    refetchProgress();
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
      {/* Intro Video Overlay */}
      <AnimatePresence>
        {showIntroOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 bg-black bg-opacity-90 z-[100] flex flex-col items-center justify-center"
          >
            {!introPlaying ? (
              <>
                <h2 className="text-3xl font-bold text-white mb-10">Willkommen bei Nutri-Lern</h2>
                <button
                  onClick={() => setIntroPlaying(true)}
                  className="w-24 h-24 rounded-full bg-green-custom hover:bg-green-600 flex items-center justify-center transition-colors shadow-2xl mb-6"
                >
                  <Play size={40} className="text-white ml-2" fill="white" />
                </button>
                <p className="text-white text-lg font-medium mb-4">Intro starten</p>
                <button
                  onClick={handleSkipIntro}
                  className="text-gray-400 hover:text-white transition-colors text-base"
                >
                  Intro überspringen
                </button>
              </>
            ) : (
              <div className="relative w-full max-w-5xl px-4" style={{ height: '75vh' }}>
                <button
                  onClick={handleSkipIntro}
                  className="absolute -top-10 right-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors z-10"
                  aria-label="Schließen"
                >
                  <X size={24} />
                </button>
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gray-900">
                  <iframe
                    ref={introIframeRef}
                    src="https://player.vimeo.com/video/1100816490?badge=0&autopause=0&autoplay=1"
                    frameBorder="0"
                    allowFullScreen
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                    title="Intro"
                  />
                  {introEnded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 z-10">
                      <button
                        onClick={handleReplayIntro}
                        className="flex items-center gap-3 px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white rounded-xl transition-colors shadow-lg text-lg"
                      >
                        <RotateCcw size={24} />
                        Video wiederholen
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Restore Notification */}
      <FullscreenRestoreNotification />
      
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
              <div key={lesson.id} className="space-y-4">
                {/* Video Lesson Card (with image) */}
                <LessonCard
                  lesson={lesson}
                  isCompleted={isCompleted}
                  isAvailable={isAvailable}
                  onClick={() => handleLessonClick(lesson)}
                />
                
                {/* Quest Card (smaller, without image) - but NOT for Intro */}
                {lesson.id !== 1 && lesson.id !== 7 && (
                  <QuestCard
                    lesson={lesson}
                    isCompleted={isCompleted}
                    isAvailable={isAvailable}
                    onQuizClick={() => handleQuizClick(lesson)}
                    showImage={false}
                  />
                )}
              </div>
            );
          })}
        </div>
      </main>

      {/* Footer Information Boxes */}
      <div className="container mx-auto px-4 py-8 space-y-4">
        {/* BKK firmus Support Box */}
        <div className="bg-navy-light rounded-2xl p-6 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-start gap-6 relative z-10">
            <p className="text-white text-base leading-relaxed md:w-[85%] md:flex-shrink-0">
              Die kostenfreie Nutzung dieser Maßnahme wird durch die Unterstützung der BKK firmus im Rahmen des Präventionsgesetzes möglich. Als Partner für innovative Gesundheitsförderung ermöglicht die BKK firmus den Zugang zu wissenschaftlich fundierten Präventionsprogrammen. Das Team der BKK firmus wünscht Ihnen bei der Absolvierung des Programms viel Spaß!
            </p>
            <div className="flex justify-end md:w-[15%] md:flex-shrink-0 p-4">
              <img 
                src={bkkFirmusLogo} 
                alt="BKK firmus Logo" 
                className="h-24 w-auto max-w-full object-contain" 
                style={{ maxWidth: '200px' }}
              />
            </div>
          </div>
        </div>

        {/* ZIES gGmbH Information Box */}
        <div className="bg-navy-light rounded-2xl p-6 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-start gap-6 relative z-10">
            <p className="text-white text-base leading-relaxed md:w-[85%] md:flex-shrink-0">
              Entwickler der Materialien ist das Zentrum für Forschung und Diagnostik bei Implantaten, Entzündungen und Schmerzen gemeinnützige GmbH. Die ZIES gGmbH setzt sich ein für Beratung und Diagnostik, Aufklärung und Prävention. Als gemeinnützige Initiative ist sie unabhängig von Firmen, Verbänden oder anderen Interessengruppen.
            </p>
            <div className="flex justify-end md:w-[15%] md:flex-shrink-0 p-4">
              <img 
                src={ziesLogo} 
                alt="ZIES gGmbH Logo" 
                className="h-24 w-auto max-w-full object-contain" 
                style={{ maxWidth: '200px' }}
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

    </div>
  );
}
