import { motion } from "framer-motion";
import OrganicShape from "./OrganicShape";

interface ProgressBarProps {
  completedLessons: number;
  totalLessons: number;
  itemType?: string;
  isGroupMode?: boolean;
}

export default function ProgressBar({ completedLessons, totalLessons, itemType = "Lektionen", isGroupMode = false }: ProgressBarProps) {
  const progressPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
  
  return (
    <div className="mb-8">
      <div className="bg-navy-light rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-2">{isGroupMode ? "Euer Fortschritt" : "Dein Fortschritt"}</h2>
        <div className="flex items-center justify-between mb-4">
          <div className="text-green-custom font-semibold text-lg">
            {completedLessons} von {totalLessons} {itemType}
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
  );
}
