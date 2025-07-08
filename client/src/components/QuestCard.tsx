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

export default function QuestCard({ lesson, isCompleted, isAvailable, onQuizClick }: QuestCardProps) {
  const colorClass = questColors[(lesson.order - 1) % questColors.length];
  
  return (
    <div
      className={`bg-navy-light rounded-xl cursor-pointer transition-all duration-300 border-2 border-dashed ${
        isCompleted ? "border-green-custom" : isAvailable ? "border-purple-custom" : "border-gray-600"
      } ${
        isAvailable ? "hover:shadow-lg" : "opacity-60"
      }`}
      style={{ 
        height: '80px',
        width: '100%',
        boxSizing: 'border-box',
        padding: '16px',
        display: 'flex',
        alignItems: 'center'
      }}
      onClick={isAvailable ? onQuizClick : undefined}
    >
      <div className="flex items-center space-x-3 w-full">
        <div className={`${isCompleted ? "bg-gray-600" : colorClass} rounded-full flex items-center justify-center`}
             style={{ width: '24px', height: '24px', flexShrink: 0 }}>
          {isCompleted ? (
            <CheckCircle className="text-white" size={12} />
          ) : (
            <HelpCircle className="text-white" size={12} />
          )}
        </div>
        
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="text-sm font-semibold text-white flex items-center" style={{ lineHeight: '1.2', marginBottom: '2px' }}>
            <Target className="mr-1" size={14} style={{ flexShrink: 0 }} />
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Quest: {lesson.title}</span>
          </div>
          <p className="text-xs text-gray-400" style={{ lineHeight: '1.2', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {isCompleted ? "Erfolgreich abgeschlossen" : "Quest verfügbar"}
          </p>
        </div>
        
        <div style={{ flexShrink: 0, textAlign: 'right' }}>
          <div className="flex items-center space-x-1">
            {isCompleted ? (
              <Star className="text-green-custom" size={14} />
            ) : (
              <Star className="text-purple-custom" size={14} />
            )}
            <span className={`text-xs ${isCompleted ? "text-green-custom" : "text-purple-custom"}`}>
              {isCompleted ? "Bestanden" : "Starten"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}