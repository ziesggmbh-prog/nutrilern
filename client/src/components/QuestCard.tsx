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
    <div
      className={`bg-navy-light rounded-xl cursor-pointer transition-all duration-300 border-2 border-dashed ${
        isCompleted ? "border-green-custom" : isAvailable ? "border-purple-custom" : "border-gray-600"
      } ${
        isAvailable ? "hover:transform hover:-translate-y-1 hover:shadow-lg" : "opacity-60"
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
        <div className={`${isCompleted ? "bg-green-custom" : isAvailable ? colorClass : "bg-gray-600"} rounded-full flex items-center justify-center`}
             style={{ width: '24px', height: '24px', flexShrink: 0 }}>
          {isCompleted ? (
            <CheckCircle className="text-white" size={12} />
          ) : isAvailable ? (
            <HelpCircle className="text-white" size={12} />
          ) : (
            <Lock className="text-white" size={12} />
          )}
        </div>
        
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="text-sm font-semibold text-white flex items-center" style={{ lineHeight: '1.2', marginBottom: '2px' }}>
            <Target className="mr-1" size={14} style={{ flexShrink: 0 }} />
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Quest: {lesson.title}</span>
          </div>
          <p className="text-xs text-gray-400" style={{ lineHeight: '1.2', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {isCompleted ? "Erfolgreich abgeschlossen" : isAvailable ? "Wissenstest verfügbar" : "Nach Video verfügbar"}
          </p>
        </div>
        
        <div style={{ flexShrink: 0, textAlign: 'right' }}>
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
    </div>
  );
}