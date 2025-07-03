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
          className="absolute top-0 right-0 w-32 h-32 bg-teal-custom opacity-10"
          variant="default"
        />
        
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-4">Dein Lernfortschritt</h2>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="bg-gray-700 rounded-full h-3 relative overflow-hidden">
                <motion.div
                  className="bg-gradient-to-r from-green-custom to-green-light h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
            </div>
            <div className="text-right">
              <p className="text-green-custom font-semibold">
                {completedLessons} von {totalLessons}
              </p>
              <p className="text-gray-400 text-sm">Lektionen abgeschlossen</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
