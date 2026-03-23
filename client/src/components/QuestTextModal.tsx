import { motion } from "framer-motion";
import { X, CheckCircle, Target } from "lucide-react";
import type { Lesson } from "@shared/schema";

interface QuestTextModalProps {
  lesson: Lesson;
  onClose: () => void;
  onComplete: () => void;
  isPresentationDay?: boolean;
}

export default function QuestTextModal({ lesson, onClose, onComplete, isPresentationDay }: QuestTextModalProps) {
  const handleComplete = () => {
    onComplete();
    onClose();
  };

  const splitDescriptionByTag5 = (text: string) => {
    const tag5Marker = '**Tag 5**';
    const idx = text.indexOf(tag5Marker);
    if (idx === -1) return { days1to4: text, day5: null };
    return {
      days1to4: text.substring(0, idx).trimEnd(),
      day5: text.substring(idx + tag5Marker.length).trim()
    };
  };

  const formatDescription = (text: string) => {
    const parts = text.split('\n');
    const elements: JSX.Element[] = [];
    
    for (let i = 0; i < parts.length; i++) {
      const line = parts[i];
      
      if (line.trim() === '') {
        elements.push(<div key={i} className="h-4"></div>);
      } else if (line.startsWith('**') && line.endsWith('**')) {
        const text = line.replace(/\*\*/g, '');
        elements.push(
          <h4 key={i} className="text-lg font-bold text-yellow-400 mt-6 mb-3 first:mt-0">
            {text}
          </h4>
        );
      } else if (line.startsWith('• ')) {
        const text = line.substring(2);
        elements.push(
          <div key={i} className="flex items-start mb-2">
            <span className="text-green-custom mr-2 mt-1">•</span>
            <span className="text-gray-300">{text}</span>
          </div>
        );
      } else if (line.trim() !== '') {
        elements.push(
          <p key={i} className="text-gray-300 leading-relaxed mb-3">
            {line}
          </p>
        );
      }
    }
    
    return elements;
  };

  const fullText = (lesson as any).fullDescription || lesson.description;
  const { days1to4, day5 } = splitDescriptionByTag5(fullText);

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

        {isPresentationDay ? (
          <>
            <div className="mb-6 rounded-lg overflow-hidden">
              <img 
                src="/praesentation_tag5.jpg" 
                alt="Präsentation"
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="text-center mb-6">
              <h3 className="text-lg font-bold text-white mb-1">Tag 5</h3>
              <h2 className="text-2xl font-bold text-green-custom">Präsentation</h2>
            </div>
          </>
        ) : (
          <>
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Target className="text-purple-custom" size={24} />
                <h2 className="text-2xl font-bold text-white">{lesson.title}</h2>
              </div>
              
              <div className="mb-6">
                <img 
                  src={lesson.thumbnailUrl} 
                  alt={lesson.title}
                  className="w-full h-48 object-cover rounded-lg"
                  style={lesson.id === 12 ? { objectPosition: 'center 37%' } : undefined}
                />
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 mb-6 max-h-96 overflow-y-auto">
              <h3 className="text-lg font-semibold text-green-custom mb-4">Quest-Beschreibung:</h3>
              <div className="text-base">
                {formatDescription(days1to4)}
              </div>

              {day5 !== null && (
                <div className="mt-8 border-t border-gray-600 pt-6">
                  <img 
                    src="/praesentation_tag5.jpg" 
                    alt="Präsentation"
                    className="w-full h-96 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-2xl font-bold text-green-custom text-center">
                    Präsentation
                  </h3>
                </div>
              )}
            </div>
          </>
        )}

        <div className="flex flex-wrap gap-2 justify-between items-center">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Schließen
          </button>
          
          <button
            onClick={handleComplete}
            className="px-4 py-2 bg-green-custom text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <CheckCircle size={20} />
            Tag abschließen
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}