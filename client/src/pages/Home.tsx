import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, User, Star, Play, Lock, CheckCircle, RotateCcw, X, Search } from "lucide-react";

function FilledClosedLock({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 28" fill="currentColor" className={className}>
      <path d="M6 12h12a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-7a3 3 0 0 1 3-3z" />
      <rect x="10.5" y="17" width="3" height="5" rx="1.5" style={{ fill: 'var(--lock-hole, #1a1a2e)' }} />
      <path d="M7 12V8a5 5 0 0 1 10 0v4" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
}

function WideOpenLock({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="currentColor" className={className}>
      <path d="M9 13h12a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3v-7a3 3 0 0 1 3-3z" />
      <rect x="13.5" y="18" width="3" height="5" rx="1.5" style={{ fill: 'var(--lock-hole, #1a1a2e)' }} />
      <path d="M12 13V9a5 5 0 0 0-10 0" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
}
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
import type { Lesson, UserProgress } from "@shared/schema";
import { quizData } from "@/lib/quizData";
import { queryClient } from "@/lib/queryClient";
import { getVertiefendeFragenForLesson } from "@/lib/vertiefendeFragen";
import VertiefendeFragenModal from "@/components/VertiefendeFragenModal";
import logoImage from "@assets/logo_opt.png";
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
  const [showVertiefendeFragen, setShowVertiefendeFragen] = useState(false);
  const [vertiefendeLesson, setVertiefendeLesson] = useState<Lesson | null>(null);

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
            setTimeout(() => {
              player.exitFullscreen().catch(() => {
                if (document.fullscreenElement) {
                  document.exitFullscreen().catch(() => {});
                } else if ((document as any).webkitFullscreenElement) {
                  (document as any).webkitExitFullscreen();
                }
              });
              setIntroEnded(true);
            }, 1500);
          });
          player.ready().then(() => {
            player.requestFullscreen().catch(() => {});
          });
        } catch (e) {
          console.log('Failed to setup intro player:', e);
        }
      }
    };
    setupIntroPlayer();
  }, [showIntroOverlay, introPlaying]);

  const handleSkipIntro = async () => {
    localStorage.setItem('introSeen', 'true');
    setShowIntroOverlay(false);
    introPlayerRef.current = null;
    try {
      const response = await fetch('/api/lessons/1/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      if (response.ok) {
        refetchProgress();
      }
    } catch (error) {
      console.log('Failed to complete intro lesson:', error);
    }
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
      // Always directly mark lesson as completed and return to normal view
      try {
        const response = await fetch(`/api/lessons/${selectedLesson.id}/complete`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        });
        
        if (!response.ok) {
          throw new Error('Failed to complete lesson');
        }
        
        setSelectedLesson(null);
        refetchProgress();
      } catch (error) {
        console.error('Error completing lesson:', error);
        setSelectedLesson(null);
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
    <div className="min-h-screen bg-structured text-white overflow-x-hidden">
      {/* Intro Video Overlay */}
      <AnimatePresence>
        {showIntroOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className={`fixed inset-0 z-[100] flex flex-col items-center justify-center ${introPlaying ? 'bg-black bg-opacity-75' : 'bg-black bg-opacity-90'}`}
          >
            {!introPlaying ? (
              <>
                <h2 className="text-3xl font-bold text-white mb-10">Willkommen bei NutriLern</h2>
                <button
                  onClick={() => {
                    setIntroPlaying(true);
                  }}
                  className="w-24 h-24 rounded-full bg-green-custom hover:bg-green-600 flex items-center justify-center transition-colors shadow-2xl mb-6"
                >
                  <Play size={40} className="text-white ml-2" fill="white" />
                </button>
                <p className="text-white text-lg font-medium mb-24">Intro starten</p>
                <button
                  onClick={handleSkipIntro}
                  className="text-gray-400 hover:text-white transition-colors text-base"
                >
                  Intro überspringen
                </button>
              </>
            ) : (
              <div className="bg-navy-light rounded-xl p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-white">Intro</h2>
                  <button
                    onClick={handleSkipIntro}
                    className="text-gray-400 hover:text-white p-2"
                  >
                    <X size={24} />
                  </button>
                </div>
                <div className="relative rounded-xl overflow-hidden mb-6">
                  <div className="bg-gray-800 aspect-video relative">
                    <div style={{padding: '56.25% 0 0 0', position: 'relative'}}>
                      <iframe
                        ref={introIframeRef}
                        src="https://player.vimeo.com/video/1172528318?badge=0&autopause=0&autoplay=1"
                        frameBorder="0"
                        allowFullScreen
                        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                        title="Intro"
                      />
                    </div>
                    {introEnded && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
                        <button
                          onClick={handleReplayIntro}
                          className="bg-gray-800 hover:bg-gray-700 text-white rounded-lg px-6 py-3 transition-colors shadow-lg"
                        >
                          <span className="font-medium">Video wiederholen</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-center">
                  <button
                    onClick={handleSkipIntro}
                    className="px-8 py-3 text-lg bg-green-custom text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 mx-auto"
                  >
                    <CheckCircle size={24} />
                    Intro abschließen
                  </button>
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
              <div className="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center">
                <img 
                  src={logoImage} 
                  alt=""
                  className="w-20 h-20 object-cover rounded-full"
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
                
                {/* Vertiefende Fragen Card - between video and quiz */}
                {getVertiefendeFragenForLesson(lesson.order) && (
                  <motion.div
                    className={`bg-navy-light rounded-2xl p-4 cursor-pointer relative overflow-hidden transition-all duration-300 group border-2 border-purple-custom ${
                      isAvailable ? "hover:shadow-xl" : "opacity-60"
                    }`}
                    onClick={() => {
                      if (isAvailable) {
                        setVertiefendeLesson(lesson);
                        setShowVertiefendeFragen(true);
                      }
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: lesson.order * 0.1 + 0.15 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`${isAvailable ? "bg-purple-custom" : "bg-gray-600"} rounded-full w-8 h-8 flex items-center justify-center mr-3`}>
                          {isAvailable ? <WideOpenLock className="text-white" size={16} /> : <FilledClosedLock className="text-white" size={16} />}
                        </div>
                        <div>
                          <h4 className="text-white font-medium">Vertiefende Fragen</h4>
                        </div>
                      </div>
                      <div className={`text-sm ${isAvailable ? "text-white" : "text-gray-500"}`}>
                        {isAvailable ? "Öffnen" : "Gesperrt"}
                      </div>
                    </div>
                  </motion.div>
                )}

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

      {showVertiefendeFragen && vertiefendeLesson && getVertiefendeFragenForLesson(vertiefendeLesson.order) && (
        <VertiefendeFragenModal
          data={getVertiefendeFragenForLesson(vertiefendeLesson.order)!}
          onClose={() => setShowVertiefendeFragen(false)}
        />
      )}

    </div>
  );
}
