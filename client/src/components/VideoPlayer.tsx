import { motion } from "framer-motion";
import { X, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Lesson } from "@shared/schema";

interface VideoPlayerProps {
  lesson: Lesson;
  onClose: () => void;
  onComplete: () => void;
}

export default function VideoPlayer({ lesson, onClose, onComplete }: VideoPlayerProps) {
  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-navy-light rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">{lesson.title}</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X size={24} />
          </Button>
        </div>
        
        <div className="relative rounded-xl overflow-hidden mb-6">
          <div className="bg-gray-800 aspect-video relative">
            {lesson.videoUrl.includes('.mp4') ? (
              <div className="w-full h-full relative">
                <video
                  controls
                  className="w-full h-full object-cover"
                  poster={lesson.thumbnailUrl}
                  preload="metadata"
                  playsInline
                  controlsList="nodownload"
                  onError={(e) => {
                    console.error('Video load error:', e);
                    const video = e.target as HTMLVideoElement;
                    const error = video.error;
                    const statusEl = document.getElementById(`video-status-${lesson.id}`);
                    
                    let errorMsg = 'Unknown';
                    if (error) {
                      switch (error.code) {
                        case 1: errorMsg = 'MEDIA_ERR_ABORTED'; break;
                        case 2: errorMsg = 'MEDIA_ERR_NETWORK'; break;
                        case 3: errorMsg = 'MEDIA_ERR_DECODE'; break;
                        case 4: errorMsg = 'MEDIA_ERR_SRC_NOT_SUPPORTED'; break;
                      }
                    }
                    
                    if (statusEl) statusEl.textContent = `Error: ${errorMsg}`;
                    console.error('Error code:', error?.code, 'Message:', error?.message);
                    
                    // Show fallback interface for codec errors
                    if (error?.code === 3 || error?.code === 4) {
                      const fallback = document.getElementById(`video-fallback-${lesson.id}`);
                      if (fallback) fallback.style.display = 'flex';
                    }
                  }}
                  onLoadStart={() => {
                    console.log('Video loading started:', lesson.videoUrl);
                    const statusEl = document.getElementById(`video-status-${lesson.id}`);
                    if (statusEl) statusEl.textContent = 'Loading Started';
                    
                    // Test URL accessibility immediately
                    fetch(lesson.videoUrl, { method: 'HEAD' })
                      .then(response => {
                        console.log('URL test response:', response.status, response.headers.get('content-type'));
                        const networkEl = document.getElementById(`video-network-${lesson.id}`);
                        if (networkEl) networkEl.textContent = `${response.status} ${response.statusText}`;
                      })
                      .catch(error => {
                        console.error('URL test failed:', error);
                        const networkEl = document.getElementById(`video-network-${lesson.id}`);
                        if (networkEl) networkEl.textContent = `Error: ${error.message}`;
                      });
                  }}
                  onCanPlay={() => {
                    console.log('Video can play:', lesson.videoUrl);
                  }}
                  onLoadedData={(e) => {
                    console.log('Video data loaded:', lesson.videoUrl);
                    const video = e.target as HTMLVideoElement;
                    const statusEl = document.getElementById(`video-status-${lesson.id}`);
                    const sizeEl = document.getElementById(`video-size-${lesson.id}`);
                    if (statusEl) statusEl.textContent = 'Data Loaded';
                    if (sizeEl) sizeEl.textContent = `${video.duration?.toFixed(1)}s`;
                  }}
                >
                  <source src={lesson.videoUrl} type="video/mp4" />
                  Video kann nicht geladen werden.
                </video>
                
                {/* Fallback für Codec-Probleme */}
                <div className="absolute inset-0 bg-gray-900 text-white flex flex-col items-center justify-center" 
                     id={`video-fallback-${lesson.id}`} style={{display: 'none'}}>
                  <div className="text-center p-4">
                    <h3 className="text-lg font-bold mb-4">Video nicht verfügbar</h3>
                    <p className="mb-4">Das Video kann in diesem Browser nicht wiedergegeben werden.</p>
                    <a href={lesson.videoUrl} target="_blank" rel="noopener noreferrer" 
                       className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white">
                      Video herunterladen
                    </a>
                  </div>
                </div>
                <div className="absolute bottom-2 left-2 bg-black bg-opacity-75 text-white text-xs p-2 rounded space-y-1">
                  <div>URL: {lesson.videoUrl}</div>
                  <div>Status: <span id={`video-status-${lesson.id}`}>Testing URL...</span></div>
                  <div>Size: <span id={`video-size-${lesson.id}`}>Unknown</span></div>
                  <div>Network: <span id={`video-network-${lesson.id}`}>Checking...</span></div>
                </div>
              </div>
            ) : (
              <iframe
                src={lesson.videoUrl}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        </div>
        
        <div className="text-center">
          <Button
            onClick={onComplete}
            className="bg-green-custom hover:bg-green-custom/90 text-white px-8 py-3 rounded-xl font-semibold"
          >
            Schließen
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
