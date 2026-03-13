import React, { useState, useRef, useEffect } from 'react';
import { X, CheckCircle, RotateCcw } from 'lucide-react';
import { quizData } from '@/lib/quizData';

// Declare Vimeo Player for TypeScript
declare global {
  interface Window {
    Vimeo: {
      Player: any;
    };
  }
}

interface VideoPlayerProps {
  lesson: any;
  onClose: () => void;
  onComplete: () => void;
}

export default function VideoPlayer({ lesson, onClose, onComplete }: VideoPlayerProps) {
  console.log('VideoPlayer loaded for lesson:', lesson.title);
  
  // Check if this lesson has a quiz
  const hasQuiz = quizData.some(quiz => quiz.lessonId === lesson.id);
  
  // State for replay functionality
  const [videoEnded, setVideoEnded] = useState(false);
  const [vimeoPlayer, setVimeoPlayer] = useState<any>(null);
  
  const hasEndedRef = useRef(false);
  const outerRef = useRef<HTMLDivElement>(null);

  const exitFs = () => {
    try {
      if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
      else if ((document as any).webkitFullscreenElement) (document as any).webkitExitFullscreen();
    } catch (_) {}
  };

  // Exit fullscreen when modal closes
  useEffect(() => () => exitFs(), []);

  // Refs for Vimeo iframes and HTML5 video
  const vimeoRef1 = useRef<HTMLIFrameElement>(null);
  const vimeoRef2 = useRef<HTMLIFrameElement>(null);
  const vimeoRef3 = useRef<HTMLIFrameElement>(null);
  const vimeoRef4 = useRef<HTMLIFrameElement>(null);
  const htmlVideoRef = useRef<HTMLVideoElement>(null);
  
  // Setup Vimeo Player API when component mounts
  useEffect(() => {
    const setupVimeoPlayer = async () => {
      // Wait for Vimeo Player API to be available
      if (typeof window.Vimeo === 'undefined') {
        console.log('⏳ Waiting for Vimeo Player API...');
        setTimeout(setupVimeoPlayer, 100);
        return;
      }
      
      console.log('🎬 Setting up Vimeo Player API...');
      
      // Setup player for each lesson
      const setupPlayer = (ref: React.RefObject<HTMLIFrameElement>, lessonId: number) => {
        if (ref.current && lesson.id === lessonId) {
          try {
            const player = new window.Vimeo.Player(ref.current);
            
            const handleVideoEnd = () => {
              if (hasEndedRef.current) return;
              hasEndedRef.current = true;
              console.log(`🎬 Vimeo video ${lessonId} ended`);
              setVideoEnded(true);
            };
            
            player.on('ended', handleVideoEnd);
            
            player.on('timeupdate', async (data: any) => {
              if (data.percent >= 0.99 && !hasEndedRef.current) {
                const duration = await player.getDuration();
                const currentTime = await player.getCurrentTime();
                if (duration - currentTime < 1) {
                  handleVideoEnd();
                }
              }
            });
            
            // Store player reference for replay functionality
            setVimeoPlayer(player);
            
            console.log(`✅ Vimeo Player ${lessonId} setup complete`);
          } catch (error) {
            console.log(`❌ Failed to setup Vimeo Player ${lessonId}:`, error);
          }
        }
      };
      
      // Setup players for different lessons
      setupPlayer(vimeoRef1, 1);
      setupPlayer(vimeoRef2, 2);
      setupPlayer(vimeoRef3, 3);
      setupPlayer(vimeoRef4, 4);
    };
    
    setupVimeoPlayer();
  }, [lesson.id]);
  
  // Replay functionality
  const handleReplay = async () => {
    console.log('🔁 Replaying video...');
    setVideoEnded(false);
    hasEndedRef.current = false;
    
    if (lesson.id <= 4 && vimeoPlayer) {
      // Vimeo player replay
      try {
        await vimeoPlayer.setCurrentTime(0);
        await vimeoPlayer.play();
        console.log('✅ Vimeo video restarted successfully');
      } catch (error) {
        console.log('⚠️ Failed to restart Vimeo video:', error);
      }
    } else if (htmlVideoRef.current) {
      // HTML5 video replay
      const video = htmlVideoRef.current;
      video.currentTime = 0;
      video.play();
      console.log('✅ HTML5 video restarted successfully');
    }
  };
  
  // No auto-completion for Vimeo videos - only manual completion via button
  
  return (
    <div ref={outerRef} className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center">

      {/* ✕ – always visible, floating top-right */}
      <button
        onClick={() => { exitFs(); onClose(); }}
        className="absolute top-4 right-4 z-30 bg-black bg-opacity-70 border-2 border-white border-opacity-50 text-white rounded-full w-12 h-12 flex items-center justify-center"
        aria-label="Schließen"
      >
        <X size={26} />
      </button>

      {/* Video – fills width, centered */}
      <div className="w-full relative">
        <div className="aspect-video w-full relative bg-black">
          {lesson.id === 1 ? (
            <iframe ref={vimeoRef1}
              src="https://player.vimeo.com/video/1172528318?badge=0&autopause=0&autoplay=1"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
              style={{position:'absolute',top:0,left:0,width:'100%',height:'100%'}}
              title="Intro" />
          ) : lesson.id === 2 ? (
            <iframe ref={vimeoRef2}
              src="https://player.vimeo.com/video/1172528646?badge=0&autopause=0&autoplay=1"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
              style={{position:'absolute',top:0,left:0,width:'100%',height:'100%'}}
              title="Kohlenhydrate" />
          ) : lesson.id === 3 ? (
            <iframe ref={vimeoRef3}
              src="https://player.vimeo.com/video/1172530056?badge=0&autopause=0&autoplay=1"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
              style={{position:'absolute',top:0,left:0,width:'100%',height:'100%'}}
              title="Fette" />
          ) : lesson.id === 4 ? (
            <iframe ref={vimeoRef4}
              src="https://player.vimeo.com/video/1148007412?badge=0&autopause=0&autoplay=1"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
              style={{position:'absolute',top:0,left:0,width:'100%',height:'100%'}}
              title="Proteine" />
          ) : (
            <video controls className="absolute inset-0 w-full h-full" preload="auto" autoPlay
              onEnded={() => setVideoEnded(true)} ref={htmlVideoRef}>
              <source src={lesson.videoUrl} type="video/mp4" />
            </video>
          )}

          {/* Replay overlay */}
          {videoEnded && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 z-10">
              <button onClick={handleReplay}
                className="bg-white bg-opacity-20 border border-white border-opacity-40 text-white rounded-lg px-6 py-3">
                <RotateCcw size={20} className="inline mr-2" />
                <span>Video wiederholen</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Film abschließen */}
      <div className="mt-6 px-4">
        <button onClick={onComplete}
          className="px-8 py-3 text-lg bg-green-custom text-white rounded-lg flex items-center gap-2">
          <CheckCircle size={24} />
          {lesson.id === 1 ? "Intro abschließen" : "Film abschließen"}
        </button>
      </div>
    </div>
  );
}