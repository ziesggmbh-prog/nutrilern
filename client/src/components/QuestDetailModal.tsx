import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Star, Users, Lock, CheckCircle, Target, Calendar } from "lucide-react";
import ProgressBar from "./ProgressBar";
import OrganicShape from "./OrganicShape";
import QuestTextModal from "./QuestTextModal";
import { getCompletedDays, saveCompletedDays } from "@/lib/progressStorage";
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
  onQuestComplete?: (questId: number) => void;
}

// Parser function to split quest description into individual days
function parseQuestDays(fullDescription: string): QuestDay[] {
  const days: QuestDay[] = [];
  
  // Find all **Tag X** patterns with their positions
  const tagPattern = /\*\*Tag \d+[^*]*?\*\*/g;
  const matches: Array<{ header: string; startPos: number; endPos: number }> = [];
  let match;
  
  while ((match = tagPattern.exec(fullDescription)) !== null) {
    matches.push({
      header: match[0],
      startPos: match.index,
      endPos: match.index + match[0].length
    });
  }
  
  // Process each tag and extract content until the next tag
  matches.forEach((currentMatch, index) => {
    const nextMatch = matches[index + 1];
    
    // Extract content from end of current tag header to start of next tag header
    const contentStart = currentMatch.endPos;
    const contentEnd = nextMatch ? nextMatch.startPos : fullDescription.length;
    
    let rawContent = fullDescription.substring(contentStart, contentEnd).trim();
    
    // Check if this content contains a Genie-Aufgabe
    let hasGeniusTask = false;
    let geniusContent = '';
    
    const geniusPattern = /\*\*Genie-Aufgabe:\*\*([\s\S]*?)(?=\*\*Tag|\*\*Genie-Aufgabe:|$)/;
    const geniusMatch = rawContent.match(geniusPattern);
    
    if (geniusMatch) {
      hasGeniusTask = true;
      geniusContent = geniusMatch[1].trim();
      // Remove the Genie-Aufgabe section from the main content
      rawContent = rawContent.replace(/\*\*Genie-Aufgabe:\*\*[\s\S]*?(?=\*\*Tag|\*\*Genie-Aufgabe:|$)/, '').trim();
    }
    
    // Remove any remaining **Tag patterns that might have leaked through
    const cleanContent = rawContent.replace(/\*\*Tag \d+[^*]*?\*\*/g, '').trim();
    
    if (cleanContent || hasGeniusTask) {
      const cleanTitle = currentMatch.header.replace(/\*\*/g, '').trim();
      
      // Combine main content with genius task if present
      let finalContent = cleanContent;
      if (hasGeniusTask && geniusContent) {
        finalContent += (cleanContent ? '\n\n' : '') + '**Genie-Aufgabe:** ' + geniusContent;
      }
      
      days.push({
        id: `day-${index + 1}`,
        title: cleanTitle,
        content: finalContent,
        order: index + 1,
        isGeniusTask: hasGeniusTask
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

export default function QuestDetailModal({ quest, onClose, onQuestComplete }: QuestDetailModalProps) {
  const [selectedDay, setSelectedDay] = useState<QuestDay | null>(null);
  const [showDayDetail, setShowDayDetail] = useState(false);
  const [completedDays, setCompletedDays] = useState<string[]>(() => getCompletedDays(quest.id));

  // Load completed days from storage when quest changes
  useEffect(() => {
    const savedDays = getCompletedDays(quest.id);
    setCompletedDays(savedDays);
  }, [quest.id]);

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
      const newCompletedDays = [...completedDays, selectedDay.id];
      setCompletedDays(newCompletedDays);
      
      // Save completed days to persistent storage
      saveCompletedDays(quest.id, newCompletedDays);
      
      // Check if all days are completed
      if (newCompletedDays.length === days.length && onQuestComplete) {
        onQuestComplete(quest.id);
      }
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
            <div>
              {isCompleted ? (
                <div className="bg-green-custom rounded-full w-8 h-8 flex items-center justify-center">
                  <CheckCircle className="text-white" size={16} />
                </div>
              ) : isAvailable ? (
                <Users className="text-white" size={20} />
              ) : (
                <div className="bg-gray-600 rounded-full w-8 h-8 flex items-center justify-center">
                  <Lock className="text-white" size={16} />
                </div>
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
            
          </div>
        </div>

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
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-structured rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className={`${colorClass} p-6 relative overflow-hidden`}>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onClose();
              }}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-50 bg-black bg-opacity-20 rounded-full p-1 hover:bg-opacity-40"
              style={{ zIndex: 9999 }}
            >
              <X size={20} />
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
              isGroupMode={true}
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
            description: selectedDay.content,
            fullDescription: undefined // Ensure only the day-specific content is shown
          } as any}
          onClose={() => setShowDayDetail(false)}
          onComplete={handleDayComplete}
        />
      )}
    </>
  );
}