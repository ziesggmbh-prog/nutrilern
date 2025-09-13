import React, { useState, useRef, useEffect } from 'react';
import { X, CheckCircle } from 'lucide-react';
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
  
  // Check if this lesson has a quiz or should show dual buttons (lessons 2 and 3)
  const hasQuiz = quizData.some(quiz => quiz.lessonId === lesson.id);
  const showDualButtons = lesson.id === 2 || lesson.id === 3;
  
  // Refs for Vimeo iframes
  const vimeoRef1 = useRef<HTMLIFrameElement>(null);
  const vimeoRef2 = useRef<HTMLIFrameElement>(null);
  const vimeoRef3 = useRef<HTMLIFrameElement>(null);
  
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
            
            player.on('ended', async () => {
              console.log(`🎬 Vimeo video ${lessonId} ended - exiting fullscreen via Player API`);
              try {
                await player.exitFullscreen();
                console.log('✅ Successfully exited fullscreen via Player API');
              } catch (err) {
                console.log('⚠️ Player.exitFullscreen failed, trying fallback:', err);
                await fallbackExitFullscreen();
              }
            });
            
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
    };
    
    setupVimeoPlayer();
  }, [lesson.id]);
  
  // No auto-completion for Vimeo videos - only manual completion via button
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-navy-light rounded-xl p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">{lesson.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-2"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="relative rounded-xl overflow-hidden mb-6">
          <div className="bg-gray-800 aspect-video relative">
            {/* Vimeo Embed for Videos 1, 2 & 3 with Player API */}
            {lesson.id === 1 ? (
              <div style={{padding: '56.25% 0 0 0', position: 'relative'}}>
                <iframe 
                  ref={vimeoRef1}
                  src="https://player.vimeo.com/video/1100816490?badge=0&autopause=0&autoplay=1"
                  frameBorder="0"
                  allowFullScreen
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
                  src="https://player.vimeo.com/video/1099335411?badge=0&autopause=0&autoplay=1"
                  frameBorder="0"
                  allowFullScreen
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
                  src="https://player.vimeo.com/video/1117810836?badge=0&autopause=0&autoplay=1"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}
                  title="Fette"
                  onLoad={() => {
                    console.log('✅ Vimeo video 3 loaded successfully');
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
                  console.log('🎬 HTML5 video ended - attempting to exit fullscreen');
                  // Add small delay to ensure video has fully ended
                  setTimeout(fallbackExitFullscreen, 500);
                  // No automatic completion - user must manually click the button
                }}
              >
                <source src={lesson.videoUrl} type="video/mp4" />
                Ihr Browser unterstützt das Video-Element nicht.
              </video>
            )}
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-gray-300 mb-4">{lesson.description}</p>
          <div className="flex justify-between items-center">
            {/* Show left "Schließen" button for lessons 2 and 3 */}
            {showDualButtons && (
              <button
                onClick={onClose}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Schließen
              </button>
            )}
            
            <button
              onClick={onComplete}
              className={`px-6 py-2 bg-green-custom text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 ${!showDualButtons ? 'mx-auto' : ''}`}
            >
              <CheckCircle size={20} />
              {showDualButtons ? "Quiz starten" : (lesson.id === 1 ? "Zur ersten Lektion" : "Video schließen")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}