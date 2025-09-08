import { motion } from "framer-motion";
import { Play, Lock, CheckCircle, HelpCircle } from "lucide-react";
import type { Lesson } from "@shared/schema";
import OrganicShape from "./OrganicShape";

interface QuizCardProps {
  lesson: Lesson;
  isCompleted: boolean;
  isAvailable: boolean;
  onQuizClick: () => void;
}

const colorVariants = [
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

export default function QuizCard({ lesson, isCompleted, isAvailable, onQuizClick }: QuizCardProps) {
  const colorClass = colorVariants[(lesson.order - 1) % colorVariants.length];
  
  return (
    <motion.div
      className={`bg-navy-light rounded-xl p-4 cursor-pointer relative overflow-hidden transition-all duration-300 group ${
        isAvailable ? "hover:shadow-lg" : "opacity-60"
      }`}
      onClick={isAvailable ? onQuizClick : undefined}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: lesson.order * 0.1 + 0.2 }}
    >
      <OrganicShape
        className={`absolute top-0 right-0 w-12 h-12 ${colorClass} opacity-20`}
        variant="default"
      />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div className={`${isCompleted ? "bg-green-custom" : "bg-gray-600"} rounded-full w-6 h-6 flex items-center justify-center`}>
            <HelpCircle className="text-white" size={10} />
          </div>
          <div className={`${isCompleted ? "bg-green-custom" : "bg-gray-600"} rounded-full w-5 h-5 flex items-center justify-center`}>
            {isCompleted ? (
              <CheckCircle className="text-white" size={10} />
            ) : isAvailable ? (
              <Play className="text-white" size={10} />
            ) : (
              <Lock className="text-white" size={10} />
            )}
          </div>
        </div>
        
        <h4 className="text-sm font-semibold mb-2">
          Quiz zu {lesson.title}
        </h4>
        
        <div className="flex items-center justify-between">
          <span className={`text-xs font-medium ${isAvailable ? "text-green-custom" : "text-gray-500"}`}>
            Quiz
          </span>
          <div className="flex items-center space-x-1">
            <span className={`text-xs ${isCompleted ? "text-green-custom" : isAvailable ? "text-green-custom" : "text-gray-500"}`}>
              {isCompleted ? "Abgeschlossen" : isAvailable ? "Verfügbar" : "Gesperrt"}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}