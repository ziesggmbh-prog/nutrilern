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

export default function QuestCard({ lesson, isCompleted, isAvailable, onQuizClick, showImage = true }: QuestCardProps) {
  const colorClass = questColors[(lesson.order - 1) % questColors.length];
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(cardRef);
  
  return (
    <motion.div
      ref={cardRef}
      className={`bg-navy-light ${showImage ? 'rounded-2xl p-6' : 'rounded-xl p-4'} cursor-pointer relative overflow-hidden transition-all duration-300 group ${
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
        className={`absolute top-0 right-0 ${showImage ? 'w-20 h-20' : 'w-12 h-12'} ${colorClass} opacity-20`}
        variant="default"
      />
      
      <div className="relative z-10">
        <div className={`flex items-center justify-between ${showImage ? 'mb-4' : 'mb-3'}`}>
          <div className={`${isCompleted ? "bg-green-custom" : colorClass} rounded-full ${showImage ? 'w-8 h-8' : 'w-6 h-6'} flex items-center justify-center`}>
            <Target className="text-white" size={showImage ? 16 : 12} />
          </div>
          <div className={`${isCompleted ? "bg-green-custom" : colorClass} rounded-full ${showImage ? 'w-6 h-6' : 'w-5 h-5'} flex items-center justify-center`}>
            {isCompleted ? (
              <CheckCircle className="text-white" size={showImage ? 12 : 10} />
            ) : !isAvailable ? (
              <Lock className="text-white" size={showImage ? 12 : 10} />
            ) : null}
          </div>
        </div>
        
        {showImage && (
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
        )}
        
        <h3 className={`${showImage ? 'text-lg' : 'text-sm'} font-semibold ${showImage ? 'mb-2' : 'mb-1'} flex items-center`}>
          <Target className={`mr-2 text-purple-custom`} size={showImage ? 18 : 14} />
          Quest: {lesson.title}
        </h3>
        <p className={`text-gray-400 text-sm ${showImage ? 'mb-4 h-16' : 'mb-3 h-8'} overflow-hidden leading-relaxed`}>
          {showImage ? lesson.description : 'Beantworte Fragen zu diesem Thema'}
        </p>
        
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
      </div>
    </motion.div>
  );
}