import { useState } from "react";
import { motion } from "framer-motion";
import { X, Star, Play, Lock, CheckCircle, Target, Calendar } from "lucide-react";
import ProgressBar from "./ProgressBar";
import OrganicShape from "./OrganicShape";
import QuestTextModal from "./QuestTextModal";
import type { Lesson } from "@shared/schema";

interface QuestDay {
  id: string;
  title: string;
  content: string;
  order: number;
  isGeniusTask?: boolean;
}

interface QuestWithDescription extends Lesson {
  fullDescription?: string;
}

interface QuestDetailModalProps {
  quest: QuestWithDescription;
  onClose: () => void;
}

// Parser function to split quest description into individual days
function parseQuestDays(fullDescription: string): QuestDay[] {
  const days: QuestDay[] = [];
  
  // Find all tag headers and their positions
  const tagRegex = /\*\*Tag \d+[^*]*\*\*/g;
  const matches: { title: string; start: number; fullMatch: string }[] = [];
  let match;
  
  while ((match = tagRegex.exec(fullDescription)) !== null) {
    matches.push({
      title: match[0].replace(/\*\*/g, '').trim(),
      start: match.index + match[0].length,
      fullMatch: match[0]
    });
  }
  
  // Process each tag and extract its specific content
  matches.forEach((currentMatch, index) => {
    const dayNumber = index + 1;
    const nextMatch = matches[index + 1];
    
    // Extract content from current tag start to next tag start (or end of string)
    const contentStart = currentMatch.start;
    const contentEnd = nextMatch ? nextMatch.fullMatch ? fullDescription.indexOf(nextMatch.fullMatch) : fullDescription.length : fullDescription.length;
    
    const content = fullDescription.substring(contentStart, contentEnd).trim();
    
    if (content) {
      const isPresentation = currentMatch.title.includes('Präsentation') || 
                             currentMatch.title.toLowerCase().includes('presentation');
      
      days.push({
        id: `day-${dayNumber}`,
        title: currentMatch.title,
        content: content,
        order: dayNumber,
        isGeniusTask: false
      });
    }
  });
  
  return days;
}

// Quest colors matching the main quest cards
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

export default function QuestDetailModal({ quest, onClose }: QuestDetailModalProps) {
  const [selectedDay, setSelectedDay] = useState<QuestDay | null>(null);
  const [showDayDetail, setShowDayDetail] = useState(false);
  const [completedDays, setCompletedDays] = useState<string[]>([]);

  const days = parseQuestDays(quest.fullDescription || "");
  const colorClass = questColors[(quest.order - 1) % questColors.length];

  const handleDayClick = (day: QuestDay) => {
    const dayIndex = day.order - 1;
    const isCompleted = completedDays.includes(day.id);
    const isAvailable = dayIndex === 0 || completedDays.includes(days[dayIndex - 1]?.id);

    if (isAvailable) {
      setSelectedDay(day);
      setShowDayDetail(true);
    }
  };

  const handleDayComplete = () => {
    if (selectedDay && !completedDays.includes(selectedDay.id)) {
      setCompletedDays(prev => [...prev, selectedDay.id]);
    }
    setShowDayDetail(false);
    setSelectedDay(null);
  };

  const DayCard = ({ day }: { day: QuestDay }) => {
    const dayIndex = day.order - 1;
    const isCompleted = completedDays.includes(day.id);
    const isAvailable = dayIndex === 0 || completedDays.includes(days[dayIndex - 1]?.id);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: dayIndex * 0.1 }}
        className={`relative rounded-xl p-6 cursor-pointer transition-all duration-300 border-2 ${
          isCompleted 
            ? "bg-navy-light border-green-custom shadow-lg" 
            : isAvailable 
              ? `bg-navy-light border-purple-custom hover:shadow-lg` 
              : "bg-gray-800 border-gray-600 opacity-60"
        }`}
        onClick={() => handleDayClick(day)}
      >
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className={`${isCompleted ? "bg-green-custom" : isAvailable ? colorClass : "bg-gray-600"} rounded-full w-10 h-10 flex items-center justify-center`}>
              <Calendar className="text-white" size={16} />
            </div>
            <div className={`${isCompleted ? "bg-green-custom" : isAvailable ? colorClass : "bg-gray-600"} rounded-full w-8 h-8 flex items-center justify-center`}>
              {isCompleted ? (
                <CheckCircle className="text-white" size={16} />
              ) : isAvailable ? (
                <Play className="text-white" size={16} />
              ) : (
                <Lock className="text-white" size={16} />
              )}
            </div>
          </div>

          <h3 className={`text-lg font-bold mb-2 ${isAvailable ? "text-white" : "text-gray-500"}`}>
            {day.title}
          </h3>

          <p className={`text-sm mb-4 ${isAvailable ? "text-gray-300" : "text-gray-500"}`}>
            {day.content.substring(0, 100)}...
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Target className={isCompleted ? "text-green-custom" : isAvailable ? "text-purple-custom" : "text-gray-500"} size={16} />
              <span className={`text-sm font-medium ${
                isCompleted ? "text-green-custom" : isAvailable ? "text-purple-custom" : "text-gray-500"
              }`}>
                {isCompleted ? "Abgeschlossen" : isAvailable ? "Verfügbar" : "Gesperrt"}
              </span>
            </div>
            
            {isCompleted && (
              <div className="flex items-center space-x-1">
                <Star className="text-yellow-400" size={16} />
                <span className="text-yellow-400 text-sm font-bold">+10 XP</span>
              </div>
            )}
          </div>
        </div>

        {/* Decorative organic shape */}
        <OrganicShape className={`absolute -top-2 -right-2 w-16 h-16 ${colorClass} opacity-20`} />

        {/* Lock overlay for unavailable days */}
        {!isAvailable && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 rounded-xl">
            <Lock className="text-white opacity-40" size={32} />
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <>
      {/* Main Quest Detail Modal */}
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-structured rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden relative"
        >
          {/* Header */}
          <div className={`${colorClass} p-6 relative overflow-hidden`}>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            >
              <X size={24} />
            </button>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <Target className="text-white" size={28} />
                <h2 className="text-2xl font-bold text-white">Quest: {quest.title}</h2>
              </div>
              <p className="text-gray-200 mb-4">{quest.description}</p>
              
              {/* Quest Stats */}
              <div className="flex items-center gap-6 text-white">
                <div className="flex items-center gap-2">
                  <Calendar size={18} />
                  <span>{days.length} Tage</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star size={18} />
                  <span>{completedDays.length * 10} / {days.length * 10} XP</span>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <OrganicShape className="absolute -top-5 -right-5 w-24 h-24 opacity-30" />
            <OrganicShape className="absolute -bottom-3 -left-3 w-20 h-20 opacity-20" variant="alt" />
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
            {/* Progress Bar */}
            <ProgressBar 
              completedLessons={completedDays.length}
              totalLessons={days.length}
              itemType="Tage"
            />

            {/* Days Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {days.map((day) => (
                <DayCard key={day.id} day={day} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Day Detail Modal */}
      {showDayDetail && selectedDay && (
        <QuestTextModal
          lesson={{
            ...quest,
            title: selectedDay.title,
            description: selectedDay.content
          } as any}
          onClose={() => setShowDayDetail(false)}
          onComplete={handleDayComplete}
        />
      )}
    </>
  );
}