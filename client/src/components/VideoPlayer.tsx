import React from 'react';
import { X } from 'lucide-react';

interface VideoPlayerProps {
  lesson: any;
  onClose: () => void;
  onComplete: () => void;
}

export default function VideoPlayer({ lesson, onClose, onComplete }: VideoPlayerProps) {
  console.log('NEW VideoPlayer component loaded for lesson:', lesson.title);
  
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
            {lesson.videoUrl.includes('youtube.com') || lesson.videoUrl.includes('youtu.be') ? (
              <iframe
                src={lesson.videoUrl}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onLoad={() => {
                  console.log('YouTube video loaded successfully');
                  // Auto-complete after 30 seconds for demo
                  setTimeout(() => onComplete(), 30000);
                }}
              />
            ) : (
              <video
                controls
                className="w-full h-full object-cover"
                poster={lesson.thumbnailUrl}
                preload="metadata"
                playsInline
                autoPlay
                onCanPlay={() => console.log('Video can play')}
                onLoadedData={() => console.log('Video loaded successfully:', lesson.videoUrl)}
                onError={() => console.error('Video error')}
                onEnded={() => onComplete()}
              >
                <source src={lesson.videoUrl} type="video/mp4" />
                Video kann nicht geladen werden.
              </video>
            )}
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-4">{lesson.description}</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Schließen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}