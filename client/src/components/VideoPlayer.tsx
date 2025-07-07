import React from 'react';
import { X } from 'lucide-react';

interface VideoPlayerProps {
  lesson: any;
  onClose: () => void;
  onComplete: () => void;
}

export default function VideoPlayer({ lesson, onClose, onComplete }: VideoPlayerProps) {
  console.log('NEW VideoPlayer component loaded for lesson:', lesson.title);
  console.log('Video URL being used:', lesson.videoUrl);
  
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
              onCanPlay={(e) => {
                console.log('Video can play');
                // Video is ready, no fallback needed
              }}
              onLoadedData={(e) => {
                console.log('Video loaded successfully:', lesson.videoUrl);
                console.log('Video current src:', e.currentTarget.currentSrc);
                console.log('Video duration:', e.currentTarget.duration);
              }}
              onError={(e) => {
                console.error('❌ CRITICAL VIDEO ERROR:', e);
                console.error('Video URL:', lesson.videoUrl);
                console.error('Video current src:', e.currentTarget.currentSrc);
                console.error('Network state:', e.currentTarget.networkState);
                console.error('Ready state:', e.currentTarget.readyState);
                console.error('Error code:', e.currentTarget.error?.code);
                console.error('Error message:', e.currentTarget.error?.message);
                
                // Test if video file actually exists
                fetch(lesson.videoUrl)
                  .then(response => {
                    console.log('Video file fetch test:', response.status, response.statusText);
                    console.log('Content-Type:', response.headers.get('Content-Type'));
                    console.log('Content-Length:', response.headers.get('Content-Length'));
                  })
                  .catch(fetchError => {
                    console.error('Video file fetch failed:', fetchError);
                  });
                
                const video = e.currentTarget;
                const fallback = video.parentElement?.querySelector('.fallback-ui') as HTMLElement;
                if (fallback) {
                  video.style.display = 'none';
                  fallback.style.display = 'flex';
                }
              }}
              onEnded={() => {
                console.log('Video completed');
                onComplete();
              }}
            >
              <source src={lesson.videoUrl} type="video/mp4; codecs=avc1.42E01E,mp4a.40.2" />
              <source src={lesson.videoUrl} type="video/mp4" />
              <source src={lesson.videoUrl} type="video/webm" />
              Ihr Browser unterstützt das Video-Element nicht.
            </video>
            
            {/* Fallback UI - hidden by default, only shown on video error */}
            <div className="fallback-ui absolute inset-0 bg-gradient-to-br from-blue-900 to-purple-900 text-white flex-col items-center justify-center" style={{display: 'none'}}>
              <div className="text-center p-6 max-w-md">
                <div className="text-4xl mb-4">🎥</div>
                <h3 className="text-xl font-bold mb-3">{lesson.title}</h3>
                <p className="text-sm text-blue-200 mb-6">
                  Video kann nicht abgespielt werden
                </p>
                <div className="space-y-3">
                  <a 
                    href={lesson.videoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-white font-medium transition-colors"
                  >
                    Video herunterladen
                  </a>
                  <button 
                    onClick={() => onComplete()}
                    className="block w-full bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg text-white font-medium transition-colors"
                  >
                    Lektion als abgeschlossen markieren
                  </button>
                </div>
                <p className="text-xs text-blue-300 mt-4">
                  Falls das Video nicht funktioniert, verwenden Sie den Download-Button.
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
              Schließen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}