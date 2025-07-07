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
            <div className="w-full h-full bg-gradient-to-br from-blue-900 to-purple-900 text-white flex items-center justify-center">
              <div className="text-center p-8">
                <div className="text-6xl mb-6">🎬</div>
                <h2 className="text-2xl font-bold mb-4">{lesson.title}</h2>
                <p className="text-blue-200 mb-8 max-w-md">
                  {lesson.description}
                </p>
                <div className="space-y-4">
                  <a 
                    href={lesson.videoUrl}
                    download
                    className="inline-block bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg text-white font-semibold transition-colors shadow-lg"
                  >
                    🎥 Video ansehen
                  </a>
                  <br />
                  <button 
                    onClick={onComplete}
                    className="inline-block bg-green-600 hover:bg-green-700 px-8 py-4 rounded-lg text-white font-semibold transition-colors shadow-lg"
                  >
                    ✅ Lektion abschließen
                  </button>
                </div>
                <p className="text-sm text-blue-300 mt-6">
                  Klicken Sie auf "Video ansehen" zum Download
                </p>
              </div>
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