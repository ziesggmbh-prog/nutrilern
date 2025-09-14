import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, Calendar, Target, Star, ArrowRight, ArrowLeft, 
  Check, Trophy, Book, Lightbulb, MessageCircle, Globe, 
  Play, Award, ChevronRight, Home, X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  PHDResearchActivity, 
  FoodCategorizationGame, 
  ProteinMemoryGame, 
  SeasonalPlanningWheel,
  SimpleActivityComponent
} from "./PHDInteractiveElements";

// Virtual Group Members with distinct personalities
const groupMembers = [
  {
    id: 1,
    name: "Lisa",
    avatar: "🌱",
    personality: "eco-enthusiast",
    traits: ["environmental", "research-focused", "optimistic"],
    color: "text-green-custom"
  },
  {
    id: 2,
    name: "Max",
    avatar: "🧠",
    personality: "analytical",
    traits: ["data-driven", "critical", "thorough"],
    color: "text-purple-custom"
  },
  {
    id: 3,
    name: "Sophie",
    avatar: "👩‍🍳",
    personality: "practical",
    traits: ["cooking-focused", "solution-oriented", "collaborative"],
    color: "text-orange-custom"
  },
  {
    id: 4,
    name: "Tim",
    avatar: "🌍",
    personality: "global-thinker",
    traits: ["big-picture", "philosophical", "questioning"],
    color: "text-teal-custom"
  }
];

// Game Progress Structure
interface DayProgress {
  dayNumber: number;
  isCompleted: boolean;
  isUnlocked: boolean;
  activities: ActivityProgress[];
  discussions: Discussion[];
}

interface ActivityProgress {
  id: string;
  name: string;
  type: "research" | "interactive" | "discussion" | "quiz";
  isCompleted: boolean;
  points: number;
}

interface Discussion {
  id: string;
  speaker: string;
  avatar: string;
  message: string;
  timestamp: string;
  type: "question" | "insight" | "suggestion" | "concern";
}

interface GameState {
  currentDay: number;
  totalPoints: number;
  badges: string[];
  dayProgress: DayProgress[];
  currentActivity: string | null;
}

export default function PHDGame() {
  // Initialize game state with default values
  const getInitialGameState = (): GameState => {
    const savedState = localStorage.getItem('phdGameState');
    if (savedState) {
      try {
        return JSON.parse(savedState);
      } catch (error) {
        console.warn('Failed to parse saved game state, using defaults');
      }
    }
    
    return {
      currentDay: 1,
      totalPoints: 0,
      badges: [],
      dayProgress: [
        {
          dayNumber: 1,
          isCompleted: false,
          isUnlocked: true,
          activities: [
            { id: "research-phd", name: "PHD Konzept erforschen", type: "research", isCompleted: false, points: 50 },
            { id: "history-discussion", name: "Historische Wurzeln diskutieren", type: "discussion", isCompleted: false, points: 30 },
            { id: "synthesis", name: "Ergebnisse zusammenfassen", type: "interactive", isCompleted: false, points: 40 }
          ],
          discussions: []
        },
        {
          dayNumber: 2,
          isCompleted: false,
          isUnlocked: false,
          activities: [
            { id: "carb-collection", name: "Komplexe Kohlenhydrate sammeln", type: "interactive", isCompleted: false, points: 60 },
            { id: "fat-analysis", name: "Ungesättigte Fette analysieren", type: "interactive", isCompleted: false, points: 60 },
            { id: "phd-sorting", name: "PHD-Konformität bewerten", type: "quiz", isCompleted: false, points: 50 }
          ],
          discussions: []
        },
        {
          dayNumber: 3,
          isCompleted: false,
          isUnlocked: false,
          activities: [
            { id: "protein-debate", name: "Proteinquellen debattieren", type: "discussion", isCompleted: false, points: 70 },
            { id: "regional-check", name: "Regionalitätsprüfung", type: "interactive", isCompleted: false, points: 60 },
            { id: "local-sources", name: "Lokale Bezugsquellen finden", type: "research", isCompleted: false, points: 40 }
          ],
          discussions: []
        },
        {
          dayNumber: 4,
          isCompleted: false,
          isUnlocked: false,
          activities: [
            { id: "seasonal-mapping", name: "Saisonale Zuordnung", type: "interactive", isCompleted: false, points: 80 },
            { id: "year-round-planning", name: "Ganzjahresplanung", type: "quiz", isCompleted: false, points: 70 },
            { id: "presentation-prep", name: "Präsentation vorbereiten", type: "interactive", isCompleted: false, points: 60 }
          ],
          discussions: []
        },
        {
          dayNumber: 5,
          isCompleted: false,
          isUnlocked: false,
          activities: [
            { id: "final-presentation", name: "Finalpräsentation", type: "interactive", isCompleted: false, points: 100 },
            { id: "peer-review", name: "Gruppenfeedback", type: "discussion", isCompleted: false, points: 50 },
            { id: "reflection", name: "Reflektion", type: "quiz", isCompleted: false, points: 40 }
          ],
          discussions: []
        }
      ],
      currentActivity: null
    };
  };

  const [gameState, setGameState] = useState<GameState>(getInitialGameState());

  const [showWelcome, setShowWelcome] = useState(true);
  const [currentDiscussion, setCurrentDiscussion] = useState<Discussion[]>([]);
  const [activeActivity, setActiveActivity] = useState<string | null>(null);

  // Save game state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('phdGameState', JSON.stringify(gameState));
  }, [gameState]);

  // Initialize discussions for each day
  useEffect(() => {
    initializeDayDiscussions();
  }, [gameState.currentDay]);

  const initializeDayDiscussions = () => {
    const day = gameState.currentDay;
    const discussions = generateDiscussionsForDay(day);
    setCurrentDiscussion(discussions);
  };

  const generateDiscussionsForDay = (day: number): Discussion[] => {
    const baseDiscussions = {
      1: [
        {
          id: "welcome-lisa",
          speaker: "Lisa",
          avatar: "🌱", 
          message: "Hi alle! Ich bin total gespannt auf die Planetary Health Diet. Das klingt nach einer super nachhaltigen Sache!",
          timestamp: "09:00",
          type: "insight" as const
        },
        {
          id: "analysis-max",
          speaker: "Max",
          avatar: "🧠",
          message: "Wir sollten systematisch vorgehen. Erst die WHO-Entwicklung verstehen, dann die Ziele analysieren.",
          timestamp: "09:02", 
          type: "suggestion" as const
        },
        {
          id: "practical-sophie",
          speaker: "Sophie", 
          avatar: "👩‍🍳",
          message: "Ja, und dabei direkt überlegen: Was bedeutet das konkret für unseren Speiseplan?",
          timestamp: "09:03",
          type: "question" as const
        },
        {
          id: "global-tim",
          speaker: "Tim",
          avatar: "🌍", 
          message: "Mich interessiert besonders der globale Aspekt. Wie hängt das mit dem Klimawandel zusammen?",
          timestamp: "09:05",
          type: "question" as const
        }
      ],
      2: [
        {
          id: "carb-focus-sophie",
          speaker: "Sophie",
          avatar: "👩‍🍳",
          message: "Heute geht's um die praktische Umsetzung! Ich hab schon eine Liste mit Vollkornprodukten vorbereitet.",
          timestamp: "09:00",
          type: "insight" as const
        },
        {
          id: "fat-analysis-max", 
          speaker: "Max",
          avatar: "🧠",
          message: "Bei den Fetten müssen wir genau auf Omega-3 und Omega-6 Fettsäuren achten. Das Verhältnis ist entscheidend.",
          timestamp: "09:03",
          type: "suggestion" as const
        }
      ],
      3: [
        {
          id: "protein-debate-lisa",
          speaker: "Lisa",
          avatar: "🌱",
          message: "Pflanzliche Proteine sind definitiv nachhaltiger! Bohnen, Linsen, Quinoa - da gibt's so viele Optionen.",
          timestamp: "09:00", 
          type: "insight" as const
        },
        {
          id: "fish-perspective-tim",
          speaker: "Tim",
          avatar: "🌍",
          message: "Aber Fisch ist auch wichtig für Omega-3. Wie balancieren wir das mit der Überfischung?",
          timestamp: "09:02",
          type: "concern" as const
        }
      ],
      4: [
        {
          id: "seasonal-challenge-sophie",
          speaker: "Sophie",
          avatar: "👩‍🍳", 
          message: "Winter wird die größte Herausforderung. Wie bekommen wir genug Vitamine ohne Südfrüchte?",
          timestamp: "09:00",
          type: "concern" as const
        },
        {
          id: "preservation-max",
          speaker: "Max",
          avatar: "🧠",
          message: "Fermentation und Konservierung waren schon immer Teil regionaler Ernährung. Das sollten wir einbeziehen.",
          timestamp: "09:03",
          type: "suggestion" as const
        }
      ],
      5: [
        {
          id: "presentation-lisa",
          speaker: "Lisa",
          avatar: "🌱",
          message: "Wow, was für eine Reise! Wir haben ein komplettes nachhaltiges Ernährungskonzept entwickelt.",
          timestamp: "09:00",
          type: "insight" as const
        },
        {
          id: "reflection-tim",
          speaker: "Tim", 
          avatar: "🌍",
          message: "Das Projekt hat mir gezeigt, wie komplex aber auch machbar nachhaltige Ernährung ist.",
          timestamp: "09:05",
          type: "insight" as const
        }
      ]
    };

    return baseDiscussions[day as keyof typeof baseDiscussions] || [];
  };

  const completeActivity = (activityId: string) => {
    setGameState(prev => {
      const newState = { ...prev };
      const currentDayData = newState.dayProgress[prev.currentDay - 1];
      const activity = currentDayData.activities.find(a => a.id === activityId);
      
      if (activity && !activity.isCompleted) {
        activity.isCompleted = true;
        newState.totalPoints += activity.points;
        
        // Check if day is completed
        const allActivitiesCompleted = currentDayData.activities.every(a => a.isCompleted);
        if (allActivitiesCompleted) {
          currentDayData.isCompleted = true;
          // Unlock next day
          if (prev.currentDay < 5) {
            newState.dayProgress[prev.currentDay].isUnlocked = true;
          }
          // Award day completion badge
          const dayBadge = `Tag ${prev.currentDay} Meister`;
          if (!newState.badges.includes(dayBadge)) {
            newState.badges.push(dayBadge);
          }
        }
      }
      
      return newState;
    });
    
    // Close the activity modal after completion
    setTimeout(() => {
      setActiveActivity(null);
    }, 1000);
  };

  const renderActivityComponent = (activity: ActivityProgress) => {
    switch (activity.id) {
      case "research-phd":
        return <PHDResearchActivity onComplete={() => completeActivity(activity.id)} />;
      case "carb-collection":
      case "fat-analysis":
      case "phd-sorting":
        return <FoodCategorizationGame onComplete={() => completeActivity(activity.id)} />;
      case "protein-debate":
        return <ProteinMemoryGame onComplete={() => completeActivity(activity.id)} />;
      case "seasonal-mapping":
      case "year-round-planning":
        return <SeasonalPlanningWheel onComplete={() => completeActivity(activity.id)} />;
      case "history-discussion":
      case "synthesis":
      case "regional-check":
      case "local-sources":
      case "presentation-prep":
      case "final-presentation":
      case "peer-review":
      case "reflection":
        return <SimpleActivityComponent activity={activity} onComplete={() => completeActivity(activity.id)} />;
      default:
        return null;
    }
  };

  const navigateToDay = (day: number) => {
    if (gameState.dayProgress[day - 1].isUnlocked) {
      setGameState(prev => ({ ...prev, currentDay: day }));
    }
  };

  const progressPercentage = (gameState.dayProgress[gameState.currentDay - 1].activities.filter(a => a.isCompleted).length / gameState.dayProgress[gameState.currentDay - 1].activities.length) * 100;

  if (showWelcome) {
    return (
      <div className="min-h-screen bg-structured text-white flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-navy-light rounded-3xl p-8 max-w-2xl mx-auto text-center"
        >
          <div className="mb-6">
            <div className="text-6xl mb-4">🌍🍎</div>
            <h1 className="text-3xl font-bold mb-2">Planetary Health Diet</h1>
            <h2 className="text-xl text-gray-300">Interaktives Gruppenlernspiel</h2>
          </div>
          
          <div className="bg-navy rounded-2xl p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center justify-center">
              <Users className="mr-2" size={20} />
              Deine virtuelle Lerngruppe
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {groupMembers.map(member => (
                <div key={member.id} className="flex items-center space-x-3">
                  <span className="text-2xl">{member.avatar}</span>
                  <div>
                    <div className={`font-medium ${member.color}`}>{member.name}</div>
                    <div className="text-xs text-gray-400 capitalize">{member.personality}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-sm text-gray-300 mb-6">
            In diesem 5-tägigen Projekt erforscht ihr gemeinsam die Planetary Health Diet und entwickelt einen nachhaltigen Speiseplan für das ganze Jahr.
          </div>

          <Button 
            onClick={() => setShowWelcome(false)}
            className="bg-green-custom hover:bg-green-light text-white px-8 py-3 text-lg"
            data-testid="button-start-game"
          >
            Spiel starten
            <ArrowRight className="ml-2" size={20} />
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-structured text-white">
      {/* Header */}
      <header className="bg-navy-light p-4 border-b border-gray-700">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="text-2xl">🌍</div>
              <div>
                <h1 className="text-xl font-bold">Planetary Health Diet Projekt</h1>
                <p className="text-sm text-gray-300">Tag {gameState.currentDay} von 5</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-purple-custom text-white">
                <Trophy className="w-4 h-4 mr-1" />
                {gameState.totalPoints} Punkte
              </Badge>
              <Badge variant="secondary" className="bg-orange-custom text-white">
                {gameState.badges.length} Badges
              </Badge>
              <Button
                variant="outline"
                size="sm"
                asChild
                className="border-gray-600 text-gray-300 hover:bg-navy"
                data-testid="button-home"
              >
                <Link href="/">
                  <Home className="w-4 h-4 mr-1" />
                  Zurück
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Day Navigation */}
          <div className="flex space-x-2">
            {gameState.dayProgress.map((day, index) => (
              <Button
                key={day.dayNumber}
                variant={gameState.currentDay === day.dayNumber ? "default" : "outline"}
                size="sm"
                disabled={!day.isUnlocked}
                onClick={() => navigateToDay(day.dayNumber)}
                className={`${
                  day.isCompleted 
                    ? "bg-green-custom text-white border-green-custom" 
                    : gameState.currentDay === day.dayNumber
                    ? "bg-purple-custom text-white"
                    : day.isUnlocked
                    ? "border-gray-500 text-gray-300"
                    : "border-gray-700 text-gray-500"
                }`}
                data-testid={`button-day-${day.dayNumber}`}
              >
                {day.isCompleted && <Check className="w-4 h-4 mr-1" />}
                Tag {day.dayNumber}
              </Button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4">
        <div className="grid lg:grid-cols-3 gap-4 lg:gap-6">
          {/* Left Column - Activities */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <Card className="bg-navy-light border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Calendar className="mr-2" size={20} />
                  Tag {gameState.currentDay} Aktivitäten
                </CardTitle>
                <Progress value={progressPercentage} className="mt-2" />
                <CardDescription className="text-gray-300">
                  {Math.round(progressPercentage)}% abgeschlossen
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {gameState.dayProgress[gameState.currentDay - 1].activities.map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-4 rounded-lg border ${
                        activity.isCompleted 
                          ? "bg-green-custom/20 border-green-custom" 
                          : "bg-navy border-gray-600"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            activity.isCompleted ? "bg-green-custom" : "bg-purple-custom"
                          }`}>
                            {activity.isCompleted ? (
                              <Check className="w-4 h-4 text-white" />
                            ) : (
                              <Target className="w-4 h-4 text-white" />
                            )}
                          </div>
                          <div>
                            <h4 className="text-white font-medium">{activity.name}</h4>
                            <p className="text-sm text-gray-400 capitalize">{activity.type}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-300">{activity.points} Punkte</div>
                          {!activity.isCompleted && (
                            <Button
                              size="sm"
                              onClick={() => setActiveActivity(activity.id)}
                              className="mt-1 bg-purple-custom hover:bg-purple-light"
                              data-testid={`button-complete-${activity.id}`}
                            >
                              Starten
                            </Button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Group Chat */}
          <div className="order-1 lg:order-2">
            <Card className="bg-navy-light border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <MessageCircle className="mr-2" size={20} />
                  Gruppenchat
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Live-Diskussion mit der Gruppe
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 h-64 overflow-y-auto">
                  <AnimatePresence>
                    {currentDiscussion.map((msg, index) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2 }}
                        className="bg-navy p-3 rounded-lg"
                      >
                        <div className="flex items-start space-x-2">
                          <span className="text-lg">{msg.avatar}</span>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-medium text-white text-sm">{msg.speaker}</span>
                              <span className="text-xs text-gray-400">{msg.timestamp}</span>
                            </div>
                            <p className="text-sm text-gray-300 leading-relaxed">{msg.message}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </CardContent>
            </Card>

            {/* Badges Display */}
            {gameState.badges.length > 0 && (
              <Card className="bg-navy-light border-gray-700 mt-4">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Trophy className="mr-2" size={20} />
                    Errungene Badges
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {gameState.badges.map((badge, index) => (
                      <Badge key={index} variant="secondary" className="bg-yellow-custom text-black">
                        <Star className="w-3 h-3 mr-1" />
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      {/* Activity Modal */}
      {activeActivity && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-navy-light rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">
                  {gameState.dayProgress[gameState.currentDay - 1].activities.find(a => a.id === activeActivity)?.name}
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveActivity(null)}
                  className="border-gray-600 text-gray-300"
                  data-testid="button-close-activity"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="mb-6">
                {activeActivity && renderActivityComponent(
                  gameState.dayProgress[gameState.currentDay - 1].activities.find(a => a.id === activeActivity)!
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}