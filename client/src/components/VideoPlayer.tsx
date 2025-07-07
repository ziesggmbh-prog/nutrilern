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
            <div className="w-full h-full bg-gray-900 flex items-center justify-center text-white">
              <div className="text-center">
                <div className="text-4xl mb-4">🎥</div>
                <h3 className="text-xl font-bold mb-4">{lesson.title}</h3>
                <p className="text-gray-300 mb-6">{lesson.description}</p>
                <div className="space-y-3">
                  <a 
                    href="http://localhost:8080/test-direct.html"
                    target="_blank"
                    className="inline-block bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-white font-medium transition-colors"
                  >
                    🎬 Video in neuem Tab öffnen
                  </a>
                  <br />
                  <button 
                    onClick={onComplete}
                    className="inline-block bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg text-white font-medium transition-colors"
                  >
                    ✅ Lektion abschließen
                  </button>
                </div>
                <p className="text-sm text-gray-400 mt-4">
                  Das Video wird in einem neuen Tab geöffnet
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