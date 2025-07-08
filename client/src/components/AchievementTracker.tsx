import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Star, Medal, Award, Target, Zap, Crown, Sparkles, BookOpen, CheckCircle } from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  category: 'progress' | 'quiz' | 'streak' | 'special';
  requirement: number;
  current: number;
  unlocked: boolean;
  points: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedDate?: Date;
}

interface AchievementTrackerProps {
  completedLessons: number;
  totalLessons: number;
  completedQuests: number;
  totalQuests: number;
  quizScore: number;
  streakDays: number;
  className?: string;
}

const rarityColors = {
  common: 'bg-gray-500',
  rare: 'bg-blue-500',
  epic: 'bg-purple-500',
  legendary: 'bg-yellow-500'
};

const rarityGlow = {
  common: 'shadow-gray-400/50',
  rare: 'shadow-blue-400/50',
  epic: 'shadow-purple-400/50',
  legendary: 'shadow-yellow-400/50'
};

export default function AchievementTracker({ 
  completedLessons, 
  totalLessons, 
  completedQuests, 
  totalQuests, 
  quizScore, 
  streakDays,
  className = "" 
}: AchievementTrackerProps) {
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: 'first_lesson',
      title: 'Erste Schritte',
      description: 'Deine erste Lektion abgeschlossen!',
      icon: BookOpen,
      category: 'progress',
      requirement: 1,
      current: completedLessons,
      unlocked: false,
      points: 10,
      rarity: 'common'
    },
    {
      id: 'lesson_master',
      title: 'Lektions-Meister',
      description: 'Alle Level 1 Lektionen abgeschlossen!',
      icon: Crown,
      category: 'progress',
      requirement: totalLessons,
      current: completedLessons,
      unlocked: false,
      points: 50,
      rarity: 'epic'
    },
    {
      id: 'quest_explorer',
      title: 'Quest-Entdecker',
      description: 'Erste Quest erfolgreich gemeistert!',
      icon: Target,
      category: 'progress',
      requirement: 1,
      current: completedQuests,
      unlocked: false,
      points: 15,
      rarity: 'common'
    },
    {
      id: 'quest_champion',
      title: 'Quest-Champion',
      description: 'Alle Level 2 Quests erfolgreich abgeschlossen!',
      icon: Medal,
      category: 'progress',
      requirement: totalQuests,
      current: completedQuests,
      unlocked: false,
      points: 75,
      rarity: 'legendary'
    },
    {
      id: 'quiz_ace',
      title: 'Quiz-Ass',
      description: 'Durchschnittliche Quiz-Punktzahl von 90% erreicht!',
      icon: Star,
      category: 'quiz',
      requirement: 90,
      current: quizScore,
      unlocked: false,
      points: 30,
      rarity: 'rare'
    },
    {
      id: 'perfect_score',
      title: 'Perfektionist',
      description: '100% in einem Quiz erreicht!',
      icon: Sparkles,
      category: 'quiz',
      requirement: 100,
      current: quizScore,
      unlocked: false,
      points: 40,
      rarity: 'epic'
    },
    {
      id: 'streak_warrior',
      title: 'Streak-Kämpfer',
      description: '7 Tage in Folge gelernt!',
      icon: Zap,
      category: 'streak',
      requirement: 7,
      current: streakDays,
      unlocked: false,
      points: 25,
      rarity: 'rare'
    },
    {
      id: 'nutrition_expert',
      title: 'Ernährungs-Experte',
      description: 'Alle Inhalte erfolgreich abgeschlossen!',
      icon: Award,
      category: 'special',
      requirement: 1,
      current: completedLessons === totalLessons && completedQuests === totalQuests ? 1 : 0,
      unlocked: false,
      points: 100,
      rarity: 'legendary'
    }
  ]);

  const [newlyUnlocked, setNewlyUnlocked] = useState<Achievement[]>([]);
  const [showTracker, setShowTracker] = useState(false);

  // Update achievements based on progress
  useEffect(() => {
    setAchievements(prev => prev.map(achievement => {
      const wasUnlocked = achievement.unlocked;
      const shouldUnlock = achievement.current >= achievement.requirement;
      
      if (!wasUnlocked && shouldUnlock) {
        const updated = { ...achievement, unlocked: true, unlockedDate: new Date() };
        setNewlyUnlocked(current => [...current, updated]);
        return updated;
      }
      
      return { ...achievement, current: getCurrentValue(achievement) };
    }));
  }, [completedLessons, completedQuests, quizScore, streakDays]);

  const getCurrentValue = (achievement: Achievement): number => {
    switch (achievement.id) {
      case 'first_lesson':
      case 'lesson_master':
        return completedLessons;
      case 'quest_explorer':
      case 'quest_champion':
        return completedQuests;
      case 'quiz_ace':
      case 'perfect_score':
        return quizScore;
      case 'streak_warrior':
        return streakDays;
      case 'nutrition_expert':
        return completedLessons === totalLessons && completedQuests === totalQuests ? 1 : 0;
      default:
        return 0;
    }
  };

  const totalPoints = achievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.points, 0);
  const unlockedCount = achievements.filter(a => a.unlocked).length;

  // Clear newly unlocked achievements after showing them
  useEffect(() => {
    if (newlyUnlocked.length > 0) {
      const timer = setTimeout(() => {
        setNewlyUnlocked([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [newlyUnlocked]);

  return (
    <>
      {/* Achievement Notification */}
      <AnimatePresence>
        {newlyUnlocked.map((achievement) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, y: -100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -100, scale: 0.8 }}
            className="fixed top-4 right-4 z-50 bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-4 rounded-lg shadow-lg max-w-sm"
          >
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 rounded-full p-2">
                <achievement.icon size={24} />
              </div>
              <div>
                <h3 className="font-bold text-sm">Achievement Unlocked!</h3>
                <p className="text-sm">{achievement.title}</p>
                <p className="text-xs opacity-90">+{achievement.points} Punkte</p>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Achievement Button */}
      <motion.button
        onClick={() => setShowTracker(!showTracker)}
        className={`fixed bottom-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="flex items-center space-x-2">
          <Trophy size={20} />
          <span className="text-sm font-semibold">{totalPoints}</span>
        </div>
        {unlockedCount > 0 && (
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
            {unlockedCount}
          </div>
        )}
      </motion.button>

      {/* Achievement Tracker Panel */}
      <AnimatePresence>
        {showTracker && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4"
            onClick={() => setShowTracker(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-navy-light rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white">Erfolge</h2>
                  <p className="text-gray-300">Euer Fortschritt: {unlockedCount}/{achievements.length} • {totalPoints} Punkte</p>
                </div>
                <button
                  onClick={() => setShowTracker(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <motion.div
                    key={achievement.id}
                    className={`bg-navy rounded-lg p-4 border-2 transition-all duration-300 ${
                      achievement.unlocked 
                        ? `border-${rarityColors[achievement.rarity].replace('bg-', '')} ${rarityGlow[achievement.rarity]} shadow-lg` 
                        : 'border-gray-600'
                    }`}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-full ${
                        achievement.unlocked 
                          ? `${rarityColors[achievement.rarity]} text-white` 
                          : 'bg-gray-600 text-gray-400'
                      }`}>
                        <achievement.icon size={20} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className={`font-semibold ${
                            achievement.unlocked ? 'text-white' : 'text-gray-400'
                          }`}>
                            {achievement.title}
                          </h3>
                          {achievement.unlocked && (
                            <CheckCircle className="text-green-400" size={16} />
                          )}
                        </div>
                        <p className="text-sm text-gray-300 mb-2">
                          {achievement.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className={`px-2 py-1 rounded text-xs font-medium ${
                              rarityColors[achievement.rarity]
                            } text-white`}>
                              {achievement.rarity.toUpperCase()}
                            </div>
                            <span className="text-xs text-gray-400">
                              +{achievement.points} Punkte
                            </span>
                          </div>
                          {!achievement.unlocked && (
                            <span className="text-xs text-gray-400">
                              {achievement.current}/{achievement.requirement}
                            </span>
                          )}
                        </div>
                        {achievement.unlockedDate && (
                          <p className="text-xs text-gray-500 mt-1">
                            Freigeschaltet: {achievement.unlockedDate.toLocaleDateString('de-DE')}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-navy rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-2">Fortschritts-Übersicht</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">{completedLessons}</div>
                    <div className="text-sm text-gray-300">Abgeschlossene Lektionen</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">{completedQuests}</div>
                    <div className="text-sm text-gray-300">Abgeschlossene Quests</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}