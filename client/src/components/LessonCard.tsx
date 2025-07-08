import { motion } from "framer-motion";
import { Play, Lock, CheckCircle, Star } from "lucide-react";
import type { Lesson } from "@shared/schema";
import OrganicShape from "./OrganicShape";

interface LessonCardProps {
  lesson: Lesson;
  isCompleted: boolean;
  isAvailable: boolean;
  onClick: () => void;
}

const colorVariants = [
  "bg-lavender",
  "bg-dark-navy", 
  "bg-royal-purple",
  "bg-warm-orange",
  "bg-deep-purple",
  "bg-bright-purple",
  "bg-terracotta",
  "bg-soft-lavender",
  "bg-teal-blue"
];

export default function LessonCard({ lesson, isCompleted, isAvailable, onClick }: LessonCardProps) {
  const colorClass = colorVariants[(lesson.order - 1) % colorVariants.length];
  
  return (
    <motion.div
      className={`bg-navy-light rounded-2xl p-6 cursor-pointer relative overflow-hidden transition-all duration-300 group ${
        isAvailable ? "hover:shadow-xl" : "opacity-60"
      }`}
      onClick={isAvailable ? onClick : undefined}
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
          <div className={`${isCompleted ? "bg-green-custom" : "bg-gray-600"} rounded-full w-8 h-8 flex items-center justify-center`}>
            <span className="text-white font-bold text-sm">{lesson.order}</span>
          </div>
          <div className={`${isCompleted ? "bg-green-custom" : "bg-gray-600"} rounded-full w-6 h-6 flex items-center justify-center`}>
            {isCompleted ? (
              <CheckCircle className="text-white" size={12} />
            ) : isAvailable ? (
              <Play className="text-white" size={12} />
            ) : (
              <Lock className="text-white" size={12} />
            )}
          </div>
        </div>
        
        <div className="relative">
          <img
            src={lesson.thumbnailUrl}
            alt={lesson.title}
            className="rounded-xl mb-4 w-full h-48 object-cover transition-all duration-300"
            style={{}}
          />
          {!isAvailable && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 rounded-xl transition-opacity duration-300">
              <Lock className="text-white opacity-40" size={32} />
            </div>
          )}

        </div>
        
        <h3 className="text-lg font-semibold mb-2">{lesson.title}</h3>
        <p className="text-gray-400 text-sm mb-4 h-16 overflow-hidden leading-relaxed">{lesson.description}</p>
        
        <div className="flex items-center justify-between">
          <span className={`text-sm font-medium ${isAvailable ? "text-green-custom" : "text-gray-500"}`}>
            {lesson.duration} min
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
