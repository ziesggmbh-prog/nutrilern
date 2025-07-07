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
              <div className="w-full h-full">
                <video
                  controls
                  className="w-full h-full object-cover"
                  poster={lesson.thumbnailUrl}
                  preload="metadata"
                  onError={(e) => {
                    console.error('Video load error:', e);
                    console.error('Video URL:', lesson.videoUrl);
                    console.error('Error details:', e.target.error);
                    const video = e.target as HTMLVideoElement;
                    const statusEl = document.getElementById(`video-status-${lesson.id}`);
                    if (statusEl) statusEl.textContent = `Error: ${video.error?.code || 'Unknown'}`;
                    
                    // Try to fetch the video URL to test accessibility
                    fetch(lesson.videoUrl, { method: 'HEAD' })
                      .then(response => {
                        console.log('Video URL test:', response.status, response.headers.get('content-type'));
                        const sizeEl = document.getElementById(`video-size-${lesson.id}`);
                        if (sizeEl) sizeEl.textContent = `HTTP ${response.status}`;
                      })
                      .catch(fetchError => {
                        console.error('Video URL fetch error:', fetchError);
                        const sizeEl = document.getElementById(`video-size-${lesson.id}`);
                        if (sizeEl) sizeEl.textContent = 'Network Error';
                      });
                  }}
                  onLoadStart={() => {
                    console.log('Video loading started:', lesson.videoUrl);
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
                  Ihr Browser unterstützt das Video-Element nicht.
                </video>
                <div className="absolute bottom-2 left-2 bg-black bg-opacity-75 text-white text-xs p-2 rounded space-y-1">
                  <div>URL: {lesson.videoUrl}</div>
                  <div>Status: <span id={`video-status-${lesson.id}`}>Loading...</span></div>
                  <div>Size: <span id={`video-size-${lesson.id}`}>Unknown</span></div>
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
