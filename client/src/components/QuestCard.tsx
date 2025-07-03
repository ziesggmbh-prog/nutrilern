import { motion } from "framer-motion";
import { Target, Lock, CheckCircle, Star, HelpCircle } from "lucide-react";
import type { Lesson } from "@shared/schema";
import OrganicShape from "./OrganicShape";

interface QuestCardProps {
  lesson: Lesson;
  isCompleted: boolean;
  isAvailable: boolean;
  onQuizClick: () => void;
}

const questColors = [
  "bg-purple-custom",
  "bg-orange-custom", 
  "bg-teal-custom",
  "bg-green-light",
  "bg-purple-light",
  "bg-orange-light",
  "bg-teal-light",
  "bg-green-custom"
];

export default function QuestCard({ lesson, isCompleted, isAvailable, onQuizClick }: QuestCardProps) {
  const colorClass = questColors[(lesson.order - 1) % questColors.length];
  
  return (
    <motion.div
      className={`bg-navy-light rounded-xl cursor-pointer transition-all duration-300 border-2 border-dashed ${
        isCompleted ? "border-green-custom" : isAvailable ? "border-purple-custom" : "border-gray-600"
      } ${
        isAvailable ? "hover:transform hover:-translate-y-1 hover:shadow-lg" : "opacity-60"
      }`}
      style={{ height: '80px' }}
      onClick={isAvailable ? onQuizClick : undefined}
      whileHover={isAvailable ? { y: -2 } : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: (lesson.order * 0.1) + 0.1 }}
    >
      <div className="flex items-center space-x-3 h-full px-4 py-3">
        <div className={`${isCompleted ? "bg-green-custom" : isAvailable ? colorClass : "bg-gray-600"} rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0`}>
          {isCompleted ? (
            <CheckCircle className="text-white" size={12} />
          ) : isAvailable ? (
            <HelpCircle className="text-white" size={12} />
          ) : (
            <Lock className="text-white" size={12} />
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-white flex items-center truncate">
            <Target className="mr-1 flex-shrink-0" size={14} />
            <span className="truncate">Quest: {lesson.title}</span>
          </h4>
          <p className="text-xs text-gray-400 truncate">
            {isCompleted ? "Erfolgreich abgeschlossen" : isAvailable ? "Wissenstest verfügbar" : "Nach Video verfügbar"}
          </p>
        </div>
        
        <div className="text-right flex-shrink-0">
          <div className="flex items-center space-x-1">
            {isCompleted ? (
              <Star className="text-green-custom" size={14} />
            ) : isAvailable ? (
              <Star className="text-purple-custom" size={14} />
            ) : (
              <Lock className="text-gray-500" size={14} />
            )}
            <span className={`text-xs ${isCompleted ? "text-green-custom" : isAvailable ? "text-purple-custom" : "text-gray-500"}`}>
              {isCompleted ? "Bestanden" : isAvailable ? "Starten" : "Gesperrt"}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}