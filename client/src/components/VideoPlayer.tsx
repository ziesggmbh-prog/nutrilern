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
            <video
              controls
              className="w-full h-full object-cover"
              poster={lesson.thumbnailUrl}
              preload="metadata"
              playsInline
              autoPlay
              muted={false}
              onCanPlay={() => {
                console.log('Video can play:', lesson.videoUrl);
              }}
              onLoadedData={() => {
                console.log('Video loaded successfully:', lesson.videoUrl);
              }}
              onError={(e) => {
                console.error('Video error:', e);
              }}
              onEnded={() => {
                console.log('Video completed');
                onComplete();
              }}
            >
              <source src={lesson.videoUrl} type="video/mp4" />
              <p>Ihr Browser unterstützt das Video-Element nicht.</p>
            </video>
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