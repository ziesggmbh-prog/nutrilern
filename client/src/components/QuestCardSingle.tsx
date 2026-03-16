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
  "bg-deep-purple",
  "bg-dark-navy", 
  "bg-royal-purple",
  "bg-warm-orange",
  "bg-lavender",
  "bg-bright-purple",
  "bg-terracotta",
  "bg-soft-lavender",
  "bg-teal-blue"
];

export default function QuestCard({ lesson, isCompleted, isAvailable, onQuizClick }: QuestCardProps) {
  const colorClass = questColors[(lesson.order - 1) % questColors.length];
  
  return (
    <motion.div
      className={`bg-navy-light rounded-2xl p-6 cursor-pointer relative overflow-hidden transition-all duration-300 group ${
        isCompleted ? "border-2 border-green-custom" : isAvailable ? "border-2 border-purple-custom" : "opacity-60 border-2 border-gray-600"
      } ${
        isAvailable ? "hover:shadow-xl" : ""
      }`}
      onClick={isAvailable ? onQuizClick : undefined}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: lesson.order * 0.1 }}
    >
      <OrganicShape
        className={`absolute top-0 right-0 w-20 h-20 ${colorClass} opacity-20`}
        variant="default"
      />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`${isCompleted ? "bg-green-custom" : colorClass} rounded-full w-8 h-8 flex items-center justify-center`}>
            <Target className="text-white" size={16} />
          </div>
          <div className={`${isCompleted ? "bg-green-custom" : colorClass} rounded-full w-6 h-6 flex items-center justify-center`}>
            {isCompleted ? (
              <CheckCircle className="text-white" size={12} />
            ) : !isAvailable ? (
              <Lock className="text-white" size={12} />
            ) : null}
          </div>
        </div>
        
        {/* NO IMAGE - this is the key difference for single player mode */}
        
        <h3 className="text-lg font-semibold mb-2">
          Quiz zu {lesson.title}
        </h3>
        <p className="text-gray-400 text-sm mb-4 h-16 overflow-hidden leading-relaxed">
          Beantworte Fragen zu diesem Thema und teste dein Wissen.
        </p>
        
        <div className="flex items-center justify-between">
          <span className={`text-sm font-medium ${isAvailable ? "text-green-custom" : "text-gray-500"}`}>
            Quiz
          </span>
          <div className="flex items-center space-x-1">
            {isCompleted ? (
              <Star className="text-green-custom" size={16} />
            ) : isAvailable ? (
              <Star className="text-green-custom" size={16} />
            ) : (
              <Lock className="text-gray-500" size={16} />
            )}
            <span className={`text-sm ${isCompleted ? "text-green-custom" : isAvailable ? "text-green-custom" : "text-gray-500"}`}>
              {isCompleted ? "Abgeschlossen" : isAvailable ? "Verfügbar" : "Gesperrt"}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}