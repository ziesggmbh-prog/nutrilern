import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';

interface VideoPlayerProps {
  lesson: any;
  onClose: () => void;
  onComplete: () => void;
}

export default function VideoPlayer({ lesson, onClose, onComplete }: VideoPlayerProps) {
  console.log('VideoPlayer loaded for lesson:', lesson.title);
  
  // Handle video completion (auto-timer for Vimeo)
  useEffect(() => {
    // Auto-complete after 60 seconds (estimated video duration)
    const timer = setTimeout(() => {
      console.log('Video completed (auto-timer)');
      onComplete();
    }, 60000);
    
    return () => clearTimeout(timer);
  }, [onComplete]);
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{lesson.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-2"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="relative rounded-xl overflow-hidden mb-6">
          <div className="bg-gray-800 aspect-video relative">
            {/* Vimeo Embed for Video 1 */}
            {lesson.id === 1 ? (
              <div style={{padding: '56.25% 0 0 0', position: 'relative'}}>
                <iframe 
                  src="https://player.vimeo.com/video/1099334647?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1"
                  frameBorder="0" 
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}
                  title="Intro"
                  onLoad={() => {
                    console.log('✅ Vimeo video loaded successfully');
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
                  console.log('Video completed');
                  onComplete();
                }}
              >
                <source src={lesson.videoUrl} type="video/mp4" />
                Ihr Browser unterstützt das Video-Element nicht.
              </video>
            )}
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-gray-600 mb-4">{lesson.description}</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={onComplete}
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              ✅ Lektion abschließen
            </button>
            <button
              onClick={onClose}
              className="bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
            >
              Zurück
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}