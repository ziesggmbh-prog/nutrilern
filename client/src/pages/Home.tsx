import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Leaf, User, Star, Play, Lock, CheckCircle } from "lucide-react";
import LessonCard from "@/components/LessonCard";
import QuestCard from "@/components/QuestCard";
import VideoPlayer from "@/components/VideoPlayer";
import QuizModal from "@/components/QuizModal";
import ProgressBar from "@/components/ProgressBar";
import OrganicShape from "@/components/OrganicShape";
import HamburgerMenu from "@/components/HamburgerMenu";
import LevelDropdown from "@/components/LevelDropdown";
import { useImagePreloader } from "@/hooks/useImagePreloader";
import type { Lesson, UserProgress } from "@shared/schema";
import { quizData } from "@/lib/quizData";
import { queryClient } from "@/lib/queryClient";
import logoImage from "@assets/ziesggmbh_59072_a_simple_logo_consisting_of_a_vegetable_and_a_856abd27-b8ca-4aa9-9037-bcb5845c1f60_3_1751544974839.png";
import bkkFirmusLogo from "@assets/Logo_BKK_firmus_high_quality.png";
import ziesLogo from "@assets/zies_logo_transparent_1751546047870.png";

export default function Home() {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuizLesson, setCurrentQuizLesson] = useState<Lesson | null>(null);

  


  // FINAL SOLUTION: Correct lesson order with Fette/Proteine swap
  const hardcodedLessons = [
    {
      id: 1,
      title: "Intro",
      description: "Ein kurzer Überblick über das, was dich in dieser Videoreihe rund um Ernährung, Bewegung und Gesundheit erwartet.",
      videoUrl: "https://player.vimeo.com/video/1100816490",
      duration: 2,
      thumbnailUrl: "/assets/1_1751542243605_optimized.jpg",
      order: 1,
      isActive: true
    },
    {
      id: 2,
      title: "Kohlenhydrate",
      description: "Erfahre, welche Rolle Kohlenhydrate in deinem Körper spielen und warum sie mehr sind als nur Zucker.",
      videoUrl: "https://player.vimeo.com/video/1099335411",
      duration: 5,
      thumbnailUrl: "/assets/6_1751542243606_optimized.jpg",
      order: 2,
      isActive: true
    },
    {
      id: 3,
      title: "Fette",
      description: "Gesunde vs. ungesunde Fette: Wir klären, warum Fett nicht dein Feind ist, sondern ein wichtiger Energielieferant.",
      videoUrl: "https://player.vimeo.com/video/1117810836",
      duration: 5,
      thumbnailUrl: "/assets/3_1751542243606_optimized.jpg",
      order: 3,
      isActive: true
    },
    {
      id: 4,
      title: "Proteine",
      description: "Warum Eiweiß für Muskeln, Immunsystem und Regeneration so wichtig ist - und wie du genug davon bekommst.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      duration: 5,
      thumbnailUrl: "/assets/4_1751549047993_optimized.jpg",
      order: 4,
      isActive: true
    },
    {
      id: 5,
      title: "Mikronährstoffe",
      description: "Vitamine und Mineralstoffe im Fokus - klein, aber unverzichtbar für Gesundheit und Leistungsfähigkeit.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      duration: 5,
      thumbnailUrl: "/assets/5_1751542243606_optimized.jpg",
      order: 5,
      isActive: true
    },
    {
      id: 6,
      title: "Unterwelt",
      description: "Ein Blick auf ungesunde Ernährungsmuster und Lebensweisen - und wie du ihnen entkommst.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      duration: 5,
      thumbnailUrl: "/assets/8_1751542243607_optimized.jpg",
      order: 6,
      isActive: true
    },
    {
      id: 7,
      title: "Trinken",
      description: "Warum ausreichend Flüssigkeit entscheidend für Konzentration, Leistungsfähigkeit und Wohlbefinden ist.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      duration: 5,
      thumbnailUrl: "/assets/7_1751542243606_optimized.jpg",
      order: 7,
      isActive: true
    },
    {
      id: 8,
      title: "Bewegung - Teil 1",
      description: "Die Grundlagen körperlicher Aktivität: Warum Bewegung essenziell für deine Gesundheit ist.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      duration: 5,
      thumbnailUrl: "/assets/2_1751542243605_optimized.jpg",
      order: 8,
      isActive: true
    },
    {
      id: 9,
      title: "Bewegung - Teil 2",
      description: "Praktische Tipps, wie du mehr Bewegung in deinen Alltag integrierst - auch ohne Fitnessstudio.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      duration: 5,
      thumbnailUrl: "/assets/9_1751542243607_optimized.jpg",
      order: 9,
      isActive: true
    }
  ];

  // FORCE IMMEDIATE RENDER - NO API CALLS
  const lessons = hardcodedLessons;
  const lessonsLoading = false;
  


  const { data: progress = [], refetch: refetchProgress } = useQuery<UserProgress[]>({
    queryKey: ["/api/progress"],
  });

  // Preload thumbnail images for faster loading
  const thumbnailUrls = lessons.map(lesson => lesson.thumbnailUrl).filter(Boolean);
  const { isLoaded, loadedCount } = useImagePreloader(thumbnailUrls);

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
                {lesson.id !== 1 && (
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
            <p className="text-white text-sm leading-relaxed flex-1">
              Die kostenfreie Nutzung dieser Maßnahme wird durch die Unterstützung der BKK firmus im Rahmen des Präventionsgesetzes möglich. Als Partner für innovative Gesundheitsförderung ermöglicht die BKK firmus den Zugang zu wissenschaftlich fundierten Präventionsprogrammen. Das Team der BKK firmus wünscht Ihnen bei der Absolvierung dieses Programms viel Spaß!
            </p>
            <div className="flex justify-center md:justify-end md:w-32 md:flex-shrink-0">
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
          <div className="flex flex-col md:flex-row md:items-start gap-6 relative z-10">
            <p className="text-white text-sm leading-relaxed flex-1">
              Entwickler der Materialien ist das Zentrum für Forschung und Diagnostik bei Implantaten, Entzündungen und Schmerzen gemeinnützige GmbH – kurz: ZIES gGmbH. Die ZIES gGmbH setzt sich ein für Beratung, Diagnostik sowie Aufklärung und Prävention. Die ZIES gGmbH ist eine gemeinnützige Initiative. Es ist unabhängig von Firmen, Verbänden oder anderen Interessengruppen.
            </p>
            <div className="flex justify-center md:justify-end md:w-32 md:flex-shrink-0">
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

    </div>
  );
}
