import { Lesson } from "@/shared/schema";
import OrganicShape from "./OrganicShape";

interface QuestCardProps {
  lesson: Lesson;
  isCompleted: boolean;
  isAvailable: boolean;
  onQuizClick: () => void;
}

export default function QuestCard({ lesson, isCompleted, isAvailable, onQuizClick }: QuestCardProps) {
  return (
    <div 
      className={`
        bg-gradient-to-br ${lesson.color} border-2 border-yellow-400/30 rounded-xl p-6 cursor-pointer 
        transition-all duration-300 hover:scale-105 hover:shadow-lg relative overflow-hidden
        ${!isAvailable ? 'opacity-50 cursor-not-allowed' : ''}
      `}
      onClick={isAvailable ? onQuizClick : undefined}
    >
      <OrganicShape className="absolute top-0 right-0 w-24 h-24 opacity-20" variant="alt" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
              <span className="text-yellow-800 font-bold">Q</span>
            </div>
            <h3 className="text-xl font-bold text-white">Quiz: {lesson.title}</h3>
          </div>
          {isCompleted && (
            <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
              <span className="text-green-800 font-bold">✓</span>
            </div>
          )}
        </div>
        
        <p className="text-gray-200 mb-4">Teste dein Wissen über {lesson.title.toLowerCase()}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-300">5 Fragen</span>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <span className="text-sm text-gray-300">Quest</span>
          </div>
        </div>
      </div>
      
      {!isAvailable && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="text-white text-lg font-bold">🔒</div>
        </div>
      )}
    </div>
  );
}