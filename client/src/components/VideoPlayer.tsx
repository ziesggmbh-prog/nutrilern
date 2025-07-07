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
              width="100%"
              height="100%"
              style={{ backgroundColor: '#000' }}
              onEnded={onComplete}
              preload="metadata"
            >
              <source src={lesson.videoUrl} type="video/mp4" />
              Dein Browser unterstützt dieses Video nicht.
            </video>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <button
                onClick={onComplete}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#16a34a',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  cursor: 'pointer'
                }}
              >
                Video angesehen - Weiter zum Quiz
              </button>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-4">{lesson.description}</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Zurück
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}