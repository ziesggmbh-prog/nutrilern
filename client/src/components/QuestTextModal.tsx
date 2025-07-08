import { motion } from "framer-motion";
import { X, CheckCircle, Target } from "lucide-react";
import type { Lesson } from "@shared/schema";

interface QuestTextModalProps {
  lesson: Lesson;
  onClose: () => void;
  onComplete: () => void;
}

export default function QuestTextModal({ lesson, onClose, onComplete }: QuestTextModalProps) {
  const handleComplete = () => {
    onComplete();
    onClose();
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-navy-light rounded-xl p-8 max-w-2xl w-full mx-4 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Target className="text-purple-custom" size={24} />
            <h2 className="text-2xl font-bold text-white">{lesson.title}</h2>
          </div>
          
          <div className="mb-6">
            <img 
              src={lesson.thumbnailUrl} 
              alt={lesson.title}
              className="w-full h-48 object-contain bg-gray-100 rounded-lg"
            />
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-green-custom mb-3">Quest-Beschreibung:</h3>
          <p className="text-gray-300 leading-relaxed text-base">
            {(lesson as any).fullDescription || lesson.description}
          </p>
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Schließen
          </button>
          
          <button
            onClick={handleComplete}
            className="px-6 py-2 bg-green-custom text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <CheckCircle size={20} />
            Quest abschließen
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}