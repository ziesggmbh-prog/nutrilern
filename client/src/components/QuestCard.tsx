import { motion } from "framer-motion";
import { Target, Lock, CheckCircle, Star, HelpCircle } from "lucide-react";
import type { Lesson } from "@shared/schema";
import OrganicShape from "./OrganicShape";
import { useState, useRef } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

interface QuestCardProps {
  lesson: Lesson;
  isCompleted: boolean;
  isAvailable: boolean;
  onQuizClick: () => void;
  showImage?: boolean; // Add option to show/hide image
  isGroupMode?: boolean; // Add option for group mode (Level 2)
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

export default function QuestCard({ lesson, isCompleted, isAvailable, onQuizClick, showImage = true, isGroupMode = false }: QuestCardProps) {
  const colorClass = questColors[(lesson.order - 1) % questColors.length];
  
  // If showImage is false (single player mode), render deployed version style
  if (!showImage) {
    return (
      <motion.div
        className={`bg-navy-light rounded-2xl p-4 cursor-pointer relative overflow-hidden transition-all duration-300 group border-2 ${
          isCompleted ? "border-green-custom" : "border-purple-custom"
        } ${
          isAvailable ? "hover:shadow-xl" : "opacity-60"
        }`}
        onClick={isAvailable ? onQuizClick : undefined}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: lesson.order * 0.1 + 0.2 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className={`${isCompleted ? "bg-green-custom" : isAvailable ? "bg-purple-custom" : "bg-gray-600"} rounded-full w-8 h-8 flex items-center justify-center mr-3`}>
              {isCompleted ? (
                <CheckCircle className="text-white" size={16} />
              ) : isAvailable ? (
                <Target className="text-white" size={16} />
              ) : (
                <Lock className="text-white" size={16} />
              )}
            </div>
            <div>
              <h4 className="text-white font-medium">{isGroupMode ? lesson.title : `Quiz: ${lesson.title}`}</h4>
            </div>
          </div>
          <div className={`text-sm ${isCompleted ? "text-green-custom" : isAvailable ? "text-white" : "text-gray-500"}`}>
            {isCompleted ? "✓" : isAvailable ? "Starten" : "Gesperrt"}
          </div>
        </div>
      </motion.div>
    );
  }

  // Full version for group mode with images
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(cardRef);
  
  return (
    <motion.div
      ref={cardRef}
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
            <span className="text-white font-bold text-sm">{lesson.order}</span>
          </div>
          <div className={`${isCompleted ? "bg-green-custom" : colorClass} rounded-full w-6 h-6 flex items-center justify-center`}>
            {isCompleted ? (
              <CheckCircle className="text-white" size={12} />
            ) : !isAvailable ? (
              <Lock className="text-white" size={12} />
            ) : null}
          </div>
        </div>
        
        <div className="relative">
          {/* Loading skeleton */}
          {!imageLoaded && !imageError && (
            <div className="rounded-xl mb-4 w-full h-48 bg-gray-700 animate-pulse flex items-center justify-center">
              <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
            </div>
          )}
          
          {/* Image */}
          {!imageError && isVisible && (
            <img
              src={lesson.thumbnailUrl}
              alt={lesson.title}
              className={`rounded-xl mb-4 w-full h-48 object-cover transition-all duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              loading={lesson.order <= 6 ? "eager" : "lazy"}
            />
          )}
          
          {/* Fallback gradient for failed images */}
          {imageError && (
            <div className={`rounded-xl mb-4 w-full h-48 ${colorClass} opacity-20 flex items-center justify-center`}>
              <div className="text-white opacity-60 text-sm">Bild nicht verfügbar</div>
            </div>
          )}
          
          {!isAvailable && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 rounded-xl transition-opacity duration-300">
              <Lock className="text-white opacity-40" size={32} />
            </div>
          )}
        </div>
        
        <h3 className="text-lg font-semibold mb-2 flex items-center">
          <Target className="mr-2 text-purple-custom" size={18} />
          {isGroupMode ? lesson.title : `Quiz: ${lesson.title}`}
        </h3>
        <p className="text-gray-400 text-sm mb-4 leading-relaxed min-h-[4rem]">
          {lesson.description}
        </p>
        
        {!isGroupMode && (
          <div className="flex items-center justify-between">
            <span className={`text-sm font-medium ${isAvailable ? "text-purple-custom" : "text-gray-500"}`}>
              {lesson.duration} min
            </span>
            <div className="flex items-center space-x-1">
              {isCompleted ? (
                <Star className="text-green-custom" size={16} />
              ) : isAvailable ? (
                <Star className="text-purple-custom" size={16} />
              ) : (
                <Lock className="text-gray-500" size={16} />
              )}
              <span className={`text-sm ${isCompleted ? "text-green-custom" : isAvailable ? "text-purple-custom" : "text-gray-500"}`}>
                {isCompleted ? "Abgeschlossen" : isAvailable ? "Verfügbar" : "Gesperrt"}
              </span>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}