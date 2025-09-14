import { motion } from "framer-motion";
import { Star, Play, Lock, CheckCircle } from "lucide-react";
import { Link, useLocation } from "wouter";

interface LevelSelectorProps {
  className?: string;
}

export default function LevelSelector({ className = "" }: LevelSelectorProps) {
  const [location] = useLocation();
  
  // Mock data for level completion status
  const levels = [
    {
      id: 1,
      title: "Lernmodus",
      subtitle: "Grundlagen der Ernährung",
      description: "Lerne die Basics durch Videos und Quizzes",
      href: "/",
      isCompleted: false,
      isAvailable: true,
      lessonsCompleted: 2,
      totalLessons: 9,
      color: "from-green-custom to-teal-custom"
    },
    {
      id: 2,
      title: "Gruppenmodus", 
      subtitle: "Kohlenhydrate Quests",
      description: "Interaktive Aufgaben rund um Kohlenhydrate",
      href: "/level2",
      isCompleted: false,
      isAvailable: true, // Always available for now
      lessonsCompleted: 0,
      totalLessons: 9,
      color: "from-purple-custom to-navy-custom"
    }
  ];

  return (
    <div className={`${className}`}>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center justify-center gap-2">
          <Star className="text-yellow-400" />
          Modus Auswahl
        </h2>
        <p className="text-gray-300">
          Wähle deinen Lernmodus und starte deine Ernährungs-Reise
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {levels.map((level, index) => (
          <motion.div
            key={level.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            {level.isAvailable ? (
              <Link href={level.href}>
                <motion.div
                  className={`relative p-6 rounded-xl bg-gradient-to-br ${level.color} text-white cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                    location === level.href ? 'ring-4 ring-white ring-opacity-50' : ''
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Level number badge */}
                  <div className="absolute -top-3 -right-3 w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <span className="text-xl font-bold">{level.id}</span>
                  </div>

                  {/* Completion status */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      {level.isCompleted ? (
                        <CheckCircle className="text-green-300" size={24} />
                      ) : (
                        <Play className="text-white" size={24} />
                      )}
                      <span className="text-sm opacity-80">
                        {level.isCompleted ? 'Abgeschlossen' : 'Verfügbar'}
                      </span>
                    </div>
                  </div>

                  {/* Level info */}
                  <h3 className="text-2xl font-bold mb-2">{level.title}</h3>
                  <h4 className="text-lg mb-3 opacity-90">{level.subtitle}</h4>
                  <p className="text-sm mb-4 opacity-80">{level.description}</p>

                  {/* Progress bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Fortschritt</span>
                      <span>{level.lessonsCompleted}/{level.totalLessons}</span>
                    </div>
                    <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
                      <motion.div 
                        className="bg-white h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(level.lessonsCompleted / level.totalLessons) * 100}%` }}
                        transition={{ duration: 0.8, delay: index * 0.2 + 0.5 }}
                      />
                    </div>
                  </div>

                  {/* Action button */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm opacity-80">
                      {level.isCompleted ? 'Wiederholen' : 'Starten'}
                    </span>
                    <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                      <Play size={16} />
                    </div>
                  </div>
                </motion.div>
              </Link>
            ) : (
              <motion.div
                className="relative p-6 rounded-xl bg-gray-600 bg-opacity-50 text-gray-400 cursor-not-allowed"
              >
                <div className="absolute -top-3 -right-3 w-12 h-12 bg-gray-500 bg-opacity-50 rounded-full flex items-center justify-center">
                  <Lock size={20} />
                </div>
                
                <div className="flex items-center gap-2 mb-4">
                  <Lock size={20} />
                  <span className="text-sm">Gesperrt</span>
                </div>

                <h3 className="text-2xl font-bold mb-2">{level.title}</h3>
                <h4 className="text-lg mb-3">{level.subtitle}</h4>
                <p className="text-sm mb-4">{level.description}</p>
                
                <p className="text-xs">
                  Schließe das vorherige Level ab, um dieses freizuschalten
                </p>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}