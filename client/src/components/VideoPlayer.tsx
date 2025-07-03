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
              <video
                controls
                className="w-full h-full object-cover"
                poster={lesson.thumbnailUrl}
                preload="metadata"
              >
                <source src={lesson.videoUrl} type="video/mp4" />
                Ihr Browser unterstützt das Video-Element nicht.
              </video>
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
