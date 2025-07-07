import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Star, 
  Trophy, 
  Target, 
  Utensils, 
  Apple, 
  Zap, 
  Award,
  ChefHat,
  Heart,
  TrendingUp
} from 'lucide-react';

interface MealPlan {
  id: number;
  day: string;
  meals: {
    breakfast: string;
    lunch: string;
    dinner: string;
    snacks: string[];
  };
  nutritionScore: number;
  completed: boolean;
  points: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType;
  unlocked: boolean;
  points: number;
}

export default function MealPlanningCompanion() {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [userPoints, setUserPoints] = useState(125);
  const [currentStreak, setCurrentStreak] = useState(3);
  const [showAchievement, setShowAchievement] = useState<Achievement | null>(null);

  // Sample meal plans with German nutrition focus
  const mealPlans: MealPlan[] = [
    {
      id: 1,
      day: "Montag",
      meals: {
        breakfast: "Vollkorn-Haferflocken mit Beeren",
        lunch: "Quinoa-Salat mit Gemüse",
        dinner: "Gegrillter Lachs mit Brokkoli",
        snacks: ["Mandeln", "Griechischer Joghurt"]
      },
      nutritionScore: 95,
      completed: true,
      points: 20
    },
    {
      id: 2,
      day: "Dienstag", 
      meals: {
        breakfast: "Avocado-Toast mit Ei",
        lunch: "Linsensuppe mit Vollkornbrot",
        dinner: "Hähnchen mit Süßkartoffeln",
        snacks: ["Nüsse", "Obst"]
      },
      nutritionScore: 88,
      completed: true,
      points: 18
    },
    {
      id: 3,
      day: "Mittwoch",
      meals: {
        breakfast: "Smoothie Bowl mit Protein",
        lunch: "Buddha Bowl",
        dinner: "Vollkorn-Pasta mit Gemüse",
        snacks: ["Hummus mit Gemüse"]
      },
      nutritionScore: 92,
      completed: false,
      points: 19
    }
  ];

  const achievements: Achievement[] = [
    {
      id: "first_week",
      title: "Erste Woche geschafft!",
      description: "7 Tage gesunde Ernährung",
      icon: Calendar,
      unlocked: true,
      points: 50
    },
    {
      id: "streak_master",
      title: "Streak Master",
      description: "3 Tage in Folge optimal gegessen",
      icon: Zap,
      unlocked: true,
      points: 30
    },
    {
      id: "nutrition_expert",
      title: "Ernährungs-Experte",
      description: "90+ Nutrition Score erreicht",
      icon: Award,
      unlocked: false,
      points: 40
    }
  ];

  const weeklyChallenge = {
    title: "Gemüse-Champion",
    description: "Iss 5 verschiedene Gemüsesorten diese Woche",
    progress: 3,
    target: 5,
    reward: 25
  };

  const handleMealComplete = (mealId: number) => {
    // Simulate meal completion
    setUserPoints(prev => prev + 20);
    setCurrentStreak(prev => prev + 1);
    
    // Check for achievement unlock
    if (currentStreak + 1 >= 5) {
      const streakAchievement = achievements.find(a => a.id === "streak_master");
      if (streakAchievement && !streakAchievement.unlocked) {
        setShowAchievement(streakAchievement);
        setTimeout(() => setShowAchievement(null), 3000);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header with Points and Streak */}
      <div className="bg-gradient-to-r from-green-custom to-teal-custom rounded-xl p-6 mb-6">
        <div className="flex justify-between items-center text-white">
          <div>
            <h2 className="text-2xl font-bold mb-2">Meal Planning Companion</h2>
            <p className="opacity-90">Dein gamifizierter Ernährungsbegleiter</p>
          </div>
          <div className="flex gap-6">
            <div className="text-center">
              <div className="flex items-center gap-2 mb-1">
                <Star className="text-yellow-300" size={20} />
                <span className="text-2xl font-bold">{userPoints}</span>
              </div>
              <p className="text-sm opacity-80">Punkte</p>
            </div>
            <div className="text-center">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="text-orange-300" size={20} />
                <span className="text-2xl font-bold">{currentStreak}</span>
              </div>
              <p className="text-sm opacity-80">Tage Streak</p>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Challenge */}
      <div className="bg-purple-custom bg-opacity-10 border border-purple-custom rounded-xl p-4 mb-6">
        <div className="flex items-center gap-3 mb-3">
          <Target className="text-purple-custom" size={24} />
          <div>
            <h3 className="font-bold text-purple-custom">{weeklyChallenge.title}</h3>
            <p className="text-sm text-gray-600">{weeklyChallenge.description}</p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex-1 bg-gray-200 rounded-full h-3 mr-4">
            <motion.div 
              className="bg-purple-custom h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(weeklyChallenge.progress / weeklyChallenge.target) * 100}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>
          <span className="text-sm font-semibold">
            {weeklyChallenge.progress}/{weeklyChallenge.target}
          </span>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Belohnung: +{weeklyChallenge.reward} Punkte
        </p>
      </div>

      {/* Meal Plans Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {mealPlans.map((plan) => (
          <motion.div
            key={plan.id}
            className={`border rounded-xl p-4 cursor-pointer transition-all ${
              plan.completed 
                ? 'bg-green-50 border-green-200' 
                : 'bg-white border-gray-200 hover:border-green-300'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => !plan.completed && handleMealComplete(plan.id)}
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-lg">{plan.day}</h3>
              {plan.completed && (
                <div className="bg-green-500 text-white rounded-full p-1">
                  <Trophy size={16} />
                </div>
              )}
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <ChefHat size={14} className="text-orange-500" />
                <span>{plan.meals.breakfast}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Utensils size={14} className="text-blue-500" />
                <span>{plan.meals.lunch}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Heart size={14} className="text-red-500" />
                <span>{plan.meals.dinner}</span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <TrendingUp size={16} className="text-green-600" />
                <span className="text-sm font-semibold">{plan.nutritionScore}%</span>
              </div>
              <div className="flex items-center gap-1">
                <Star size={14} className="text-yellow-500" />
                <span className="text-sm">+{plan.points}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Achievements Section */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Award className="text-yellow-500" />
          Erfolge
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`p-4 rounded-lg border ${
                achievement.unlocked
                  ? 'bg-yellow-50 border-yellow-200'
                  : 'bg-gray-50 border-gray-200 opacity-60'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <achievement.icon 
                  size={24} 
                  className={achievement.unlocked ? 'text-yellow-600' : 'text-gray-400'}
                />
                <h4 className="font-semibold">{achievement.title}</h4>
              </div>
              <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
              <p className="text-xs font-semibold">+{achievement.points} Punkte</p>
            </div>
          ))}
        </div>
      </div>

      {/* Achievement Notification */}
      <AnimatePresence>
        {showAchievement && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.8 }}
            className="fixed top-20 right-4 bg-yellow-400 text-black rounded-xl p-4 shadow-xl z-50"
          >
            <div className="flex items-center gap-3">
              <Trophy size={24} />
              <div>
                <h4 className="font-bold">Erfolg freigeschaltet!</h4>
                <p className="text-sm">{showAchievement.title}</p>
                <p className="text-xs">+{showAchievement.points} Punkte</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}