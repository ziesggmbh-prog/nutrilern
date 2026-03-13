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
  
  // Ref for the outer container – used to request fullscreen on open
  const outerRef = useRef<HTMLDivElement>(null);

  // Enter fullscreen when the modal opens, exit when it closes
  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    const tryFs = async () => {
      try {
        if (el.requestFullscreen) {
          await el.requestFullscreen();
        } else if ((el as any).webkitRequestFullscreen) {
          (el as any).webkitRequestFullscreen();
        }
      } catch (_) { /* fullscreen blocked – continue in windowed mode */ }
    };
    tryFs();
    return () => {
      try {
        if (document.fullscreenElement) document.exitFullscreen();
        else if ((document as any).webkitFullscreenElement) (document as any).webkitExitFullscreen();
      } catch (_) {}
    };
  }, []);

  // Refs for Vimeo iframes and HTML5 video
  const vimeoRef1 = useRef<HTMLIFrameElement>(null);
  const vimeoRef2 = useRef<HTMLIFrameElement>(null);
  const vimeoRef3 = useRef<HTMLIFrameElement>(null);
  const vimeoRef4 = useRef<HTMLIFrameElement>(null);
  const htmlVideoRef = useRef<HTMLVideoElement>(null);
  
  // Fallback function to exit fullscreen mode
  const fallbackExitFullscreen = async () => {
    console.log('🔄 Fallback: Attempting to exit fullscreen mode...');
    
    const isFullscreen = document.fullscreenElement || 
                        (document as any).webkitFullscreenElement || 
                        (document as any).mozFullScreenElement || 
                        (document as any).msFullscreenElement;
    
    if (isFullscreen) {
      try {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
          console.log('✅ Fallback: Successfully exited fullscreen');
        } else if ((document as any).webkitExitFullscreen) {
          (document as any).webkitExitFullscreen();
          console.log('✅ Fallback: Used webkit exitFullscreen');
        }
      } catch (err) {
        console.log('❌ Fallback: Failed to exit fullscreen:', err);
      }
    } else {
      console.log('ℹ️ Fallback: No fullscreen mode detected');
    }
  };
  
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
            
            const handleVideoEnd = async () => {
              if (hasEndedRef.current) return;
              hasEndedRef.current = true;
              console.log(`🎬 Vimeo video ${lessonId} ended - exiting fullscreen in 1.5s`);
              setTimeout(async () => {
                try {
                  await player.exitFullscreen();
                  console.log('✅ Successfully exited fullscreen via Player API');
                } catch (err) {
                  console.log('⚠️ Player.exitFullscreen failed, trying fallback:', err);
                  await fallbackExitFullscreen();
                }
                setVideoEnded(true);
              }, 1500);
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
    <div ref={outerRef} className="fixed inset-0 bg-black z-50 flex flex-col sm:bg-opacity-80 sm:items-center sm:justify-center">
      {/* Desktop only: tappable backdrop */}
      <div className="absolute inset-0 hidden sm:block" onClick={onClose} />

      {/* Modal card: full-screen on mobile, centered card on desktop */}
      <div className="relative z-10 w-full h-full flex flex-col bg-navy-light sm:h-auto sm:max-h-[90vh] sm:max-w-4xl sm:mx-4 sm:rounded-xl">
        {/* Header – always visible, never scrolls away */}
        <div className="flex justify-between items-center px-4 py-3 sm:px-6 sm:pt-5 sm:pb-4 flex-shrink-0 border-b border-white border-opacity-10 sm:border-0">
          <h2 className="text-lg sm:text-2xl font-bold text-white truncate pr-4">{lesson.title}</h2>
          <button
            onClick={onClose}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full w-11 h-11 flex items-center justify-center flex-shrink-0"
            aria-label="Schließen"
          >
            <X size={22} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto px-4 pb-4 sm:px-6 sm:pb-6">
        <div className="relative rounded-xl overflow-hidden mb-6">
          <div className="bg-gray-800 aspect-video relative">
            {/* Vimeo Embed for Videos 1, 2 & 3 with Player API */}
            {lesson.id === 1 ? (
              <div style={{padding: '56.25% 0 0 0', position: 'relative'}}>
                <iframe 
                  ref={vimeoRef1}
                  src="https://player.vimeo.com/video/1172528318?badge=0&autopause=0&autoplay=1&playsinline=1"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}
                  title="Intro"
                  onLoad={() => {
                    console.log('✅ Vimeo video 1 loaded successfully');
                  }}
                />
              </div>
            ) : lesson.id === 2 ? (
              <div style={{padding: '56.25% 0 0 0', position: 'relative'}}>
                <iframe 
                  ref={vimeoRef2}
                  src="https://player.vimeo.com/video/1172528646?badge=0&autopause=0&autoplay=1&playsinline=1"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}
                  title="Kohlenhydrate"
                  onLoad={() => {
                    console.log('✅ Vimeo video 2 loaded successfully');
                  }}
                />
              </div>
            ) : lesson.id === 3 ? (
              <div style={{padding: '56.25% 0 0 0', position: 'relative'}}>
                <iframe 
                  ref={vimeoRef3}
                  src="https://player.vimeo.com/video/1172530056?badge=0&autopause=0&autoplay=1&playsinline=1"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}
                  title="Fette"
                  onLoad={() => {
                    console.log('✅ Vimeo video 3 loaded successfully');
                  }}
                />
              </div>
            ) : lesson.id === 4 ? (
              <div style={{padding: '56.25% 0 0 0', position: 'relative'}}>
                <iframe 
                  ref={vimeoRef4}
                  src="https://player.vimeo.com/video/1148007412?badge=0&autopause=0&autoplay=1&playsinline=1"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}
                  title="Proteine"
                  onLoad={() => {
                    console.log('✅ Vimeo video 4 loaded successfully');
                  }}
                />
              </div>
            ) : (
              /* Local video fallback for other lessons */
              <video
                controls
                className="w-full h-full object-cover"
                preload="auto"
                playsInline
                autoPlay
                muted={false}
                onEnded={() => {
                  console.log('🎬 HTML5 video ended - showing replay button');
                  setVideoEnded(true);
                  // Add 2.5 second delay to ensure video has fully ended
                  setTimeout(fallbackExitFullscreen, 2500);
                  // No automatic completion - user must manually click the button
                }}
                ref={htmlVideoRef}
              >
                <source src={lesson.videoUrl} type="video/mp4" />
                Ihr Browser unterstützt das Video-Element nicht.
              </video>
            )}
            
            {/* Replay Button Overlay */}
            {videoEnded && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
                <button
                  onClick={handleReplay}
                  className="bg-gray-800 hover:bg-gray-700 text-white rounded-lg px-6 py-3 transition-colors shadow-lg"
                  data-testid="button-replay"
                >
                  <span className="font-medium">Video wiederholen</span>
                </button>
              </div>
            )}
          </div>
        </div>
        
        <div className="text-center">
          <button
            onClick={onComplete}
            className="px-8 py-3 text-lg bg-green-custom text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 mx-auto"
          >
            <CheckCircle size={24} />
            {lesson.id === 1 ? "Intro abschließen" : "Film abschließen"}
          </button>
        </div>
        </div>{/* end scrollable body */}
      </div>{/* end modal */}
    </div>
  );
}