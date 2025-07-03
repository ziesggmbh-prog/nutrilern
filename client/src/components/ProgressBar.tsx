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
          className="absolute top-0 right-0 w-24 h-24 bg-teal-custom opacity-10"
          variant="default"
        />
        
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <h2 className="text-2xl font-bold">Dein Lernfortschritt</h2>
            <div className="text-right ml-4">
              <p className="text-green-custom font-semibold text-lg">
                {completedLessons} von {totalLessons}
              </p>
              <p className="text-gray-400 text-sm whitespace-nowrap">Lektionen abgeschlossen</p>
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
            <div className="mt-2 text-center">
              <span className="text-green-custom font-medium">
                {Math.round(progressPercentage)}% abgeschlossen
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
