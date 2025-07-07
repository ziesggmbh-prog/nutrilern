import { Lesson } from "@/shared/schema";
import OrganicShape from "./OrganicShape";

interface LessonCardProps {
  lesson: Lesson;
  isCompleted: boolean;
  isAvailable: boolean;
  onClick: () => void;
}

export default function LessonCard({ lesson, isCompleted, isAvailable, onClick }: LessonCardProps) {
  return (
    <div 
      className={`
        bg-gradient-to-br ${lesson.color} border-2 border-white/20 rounded-xl p-6 cursor-pointer 
        transition-all duration-300 hover:scale-105 hover:shadow-lg relative overflow-hidden
        ${!isAvailable ? 'opacity-50 cursor-not-allowed' : ''}
      `}
      onClick={isAvailable ? onClick : undefined}
    >
      <OrganicShape className="absolute top-0 right-0 w-24 h-24 opacity-20" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white">{lesson.title}</h3>
          {isCompleted && (
            <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
              <span className="text-green-800 font-bold">✓</span>
            </div>
          )}
        </div>
        
        <p className="text-gray-200 mb-4">{lesson.description}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-300">Dauer: {lesson.duration}</span>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-white rounded-full opacity-60"></div>
            <span className="text-sm text-gray-300">Video</span>
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