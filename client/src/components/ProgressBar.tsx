import { motion } from "framer-motion";
import OrganicShape from "./OrganicShape";

interface ProgressBarProps {
  completedLessons: number;
  totalLessons: number;
}

export default function ProgressBar({ completedLessons, totalLessons }: ProgressBarProps) {
  const progressPercentage = (completedLessons / totalLessons) * 100;
  
  return (
    <div className="mb-8">
      <div className="bg-navy-light rounded-2xl p-6 relative overflow-hidden">
        <OrganicShape
          className="absolute bottom-0 left-0 w-20 h-20 bg-teal-custom opacity-10"
          variant="default"
        />
        
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-2">Dein Lernfortschritt</h2>
          <div className="flex items-center justify-between mb-4">
            <div className="text-green-custom font-semibold text-lg">
              {completedLessons} von {totalLessons} Lektionen
            </div>
            <div className="text-green-custom font-medium text-lg">
              {Math.round(progressPercentage)}%
            </div>
          </div>
          <div className="w-full">
            <div className="bg-gray-700 rounded-full h-4 relative overflow-hidden">
              <motion.div
                className="bg-gradient-to-r from-green-custom to-green-light h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
