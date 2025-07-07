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
            <div className="w-full h-full bg-gradient-to-br from-blue-900 to-purple-900 flex flex-col items-center justify-center text-white p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">Video: {lesson.title}</h3>
                <p className="text-gray-300 mb-6">{lesson.description}</p>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-6">
                  <p className="text-lg mb-4">📹 Zum Anschauen des Videos:</p>
                  <a
                    href={lesson.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
                  >
                    Video in neuem Tab öffnen
                  </a>
                </div>
                <p className="text-sm text-gray-400 mb-8">
                  Das Video öffnet sich in einem neuen Tab. Schaue es dir an und kehre dann hierher zurück.
                </p>
              </div>
              
              <button
                onClick={onComplete}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-200"
              >
                ✓ Video angeschaut - Weiter zum Quiz
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