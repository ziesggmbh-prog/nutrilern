import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  DragDropContext, Droppable, Draggable, DropResult 
} from "@hello-pangea/dnd";
import { 
  Check, X, ArrowRight, ArrowLeft, Target, Lightbulb, 
  Apple, Wheat, Fish, Leaf, Globe, Clock, Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// Day 1: Research Interactive Element
export function PHDResearchActivity({ onComplete }: { onComplete: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  
  const researchSteps = [
    {
      question: "Wer hat die Planetary Health Diet entwickelt?",
      options: [
        "WHO (Weltgesundheitsorganisation)",
        "EAT-Lancet Commission", 
        "UN-Klimagruppe",
        "Greenpeace"
      ],
      correct: 1,
      explanation: "Die EAT-Lancet Commission entwickelte 2019 die Planetary Health Diet als Konzept für gesunde und nachhaltige Ernährung."
    },
    {
      question: "Was ist das Hauptziel der Planetary Health Diet?",
      options: [
        "Nur die menschliche Gesundheit zu verbessern",
        "Nur den Klimaschutz zu fördern", 
        "Gesundheit UND Umweltschutz zu vereinen",
        "Vegetarismus durchzusetzen"
      ],
      correct: 2,
      explanation: "Die PHD zielt darauf ab, sowohl die menschliche Gesundheit als auch den Umweltschutz in einem integrierten Ansatz zu fördern."
    },
    {
      question: "Welche Rolle spielt Regionalität in der PHD?",
      options: [
        "Ist unwichtig für das Konzept",
        "Reduziert Transportwege und CO2-Emissionen",
        "Macht das Essen teurer",
        "Ist nur im Winter relevant"
      ],
      correct: 1,
      explanation: "Regionale Lebensmittel reduzieren Transportwege, CO2-Emissionen und unterstützen lokale Wirtschaftskreisläufe."
    }
  ];

  const handleAnswer = (answerIndex: number) => {
    setAnswers(prev => ({ ...prev, [currentStep]: answerIndex.toString() }));
    
    setTimeout(() => {
      if (currentStep < researchSteps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        onComplete();
      }
    }, 2000);
  };

  return (
    <div className="bg-navy-light rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white flex items-center">
          <Lightbulb className="mr-2 text-yellow-custom" size={24} />
          PHD Grundlagen erforschen
        </h3>
        <Progress value={(currentStep / researchSteps.length) * 100} className="w-32" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mb-6">
            <h4 className="text-lg text-white mb-4">{researchSteps[currentStep].question}</h4>
            <div className="grid gap-3">
              {researchSteps[currentStep].options.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className={`text-left justify-start p-4 h-auto border-gray-600 text-gray-300 hover:bg-purple-custom hover:text-white transition-all ${
                    answers[currentStep] && parseInt(answers[currentStep]) === index
                      ? index === researchSteps[currentStep].correct 
                        ? "bg-green-custom text-white border-green-custom"
                        : "bg-red-500 text-white border-red-500"
                      : ""
                  }`}
                  onClick={() => handleAnswer(index)}
                  disabled={!!answers[currentStep]}
                  data-testid={`option-${index}`}
                >
                  {option}
                  {answers[currentStep] && parseInt(answers[currentStep]) === index && (
                    <span className="ml-auto">
                      {index === researchSteps[currentStep].correct ? <Check size={20} /> : <X size={20} />}
                    </span>
                  )}
                </Button>
              ))}
            </div>
            
            {answers[currentStep] && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-navy rounded-lg"
              >
                <p className="text-gray-300 text-sm">{researchSteps[currentStep].explanation}</p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// Day 2: Drag & Drop Food Categorization
export function FoodCategorizationGame({ onComplete }: { onComplete: () => void }) {
  const [foodItems, setFoodItems] = useState([
    { id: "quinoa", name: "Quinoa", category: "unassigned", type: "carb-good" },
    { id: "white-bread", name: "Weißbrot", category: "unassigned", type: "carb-bad" },
    { id: "oats", name: "Haferflocken", category: "unassigned", type: "carb-good" },
    { id: "pasta-white", name: "Weiße Nudeln", category: "unassigned", type: "carb-bad" },
    { id: "avocado", name: "Avocado", category: "unassigned", type: "fat-good" },
    { id: "olive-oil", name: "Olivenöl", category: "unassigned", type: "fat-good" },
    { id: "butter", name: "Butter", category: "unassigned", type: "fat-bad" },
    { id: "margarine", name: "Margarine", category: "unassigned", type: "fat-bad" }
  ]);

  const [gameCompleted, setGameCompleted] = useState(false);

  const categories = {
    "phd-friendly": "PHD-konform",
    "phd-avoid": "PHD-vermeiden"
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const item = foodItems.find(item => item.id === result.draggableId);
    if (!item) return;

    const newCategory = result.destination.droppableId;
    
    // Create the updated array first
    const updatedFoodItems = foodItems.map(food => 
      food.id === item.id 
        ? { ...food, category: newCategory }
        : food
    );
    
    setFoodItems(updatedFoodItems);

    // Check if game is completed using the updated array
    const allAssigned = updatedFoodItems.every(food => food.category !== "unassigned");
    if (allAssigned) {
      setTimeout(() => {
        setGameCompleted(true);
        onComplete();
      }, 1000);
    }
  };

  const getCorrectCategory = (type: string) => {
    return type.includes("good") ? "phd-friendly" : "phd-avoid";
  };

  return (
    <div className="bg-navy-light rounded-2xl p-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-white flex items-center mb-2">
          <Apple className="mr-2 text-green-custom" size={24} />
          Lebensmittel einordnen
        </h3>
        <p className="text-gray-300 text-sm">
          Ziehe die Lebensmittel in die richtige Kategorie: PHD-konform oder zu vermeiden
        </p>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Unassigned Items */}
          <div>
            <h4 className="text-white font-medium mb-3">Zu sortieren:</h4>
            <Droppable droppableId="unassigned">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="bg-navy rounded-lg p-4 min-h-[200px]"
                >
                  {foodItems
                    .filter(item => item.category === "unassigned")
                    .map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-purple-custom text-white p-3 rounded-lg mb-2 cursor-grab active:cursor-grabbing hover:bg-purple-light transition-colors"
                          >
                            {item.name}
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>

          {/* Categories */}
          {Object.entries(categories).map(([categoryId, categoryName]) => (
            <div key={categoryId}>
              <h4 className={`font-medium mb-3 ${categoryId === "phd-friendly" ? "text-green-custom" : "text-orange-custom"}`}>
                {categoryName}
              </h4>
              <Droppable droppableId={categoryId}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`rounded-lg p-4 min-h-[200px] border-2 border-dashed ${
                      categoryId === "phd-friendly" 
                        ? "border-green-custom bg-green-custom/10" 
                        : "border-orange-custom bg-orange-custom/10"
                    }`}
                  >
                    {foodItems
                      .filter(item => item.category === categoryId)
                      .map((item, index) => (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`p-3 rounded-lg mb-2 cursor-grab active:cursor-grabbing transition-colors ${
                                getCorrectCategory(item.type) === categoryId
                                  ? "bg-green-custom text-white"
                                  : "bg-red-500 text-white"
                              }`}
                            >
                              {item.name}
                              {getCorrectCategory(item.type) === categoryId ? (
                                <Check className="inline ml-2" size={16} />
                              ) : (
                                <X className="inline ml-2" size={16} />
                              )}
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>

      {gameCompleted && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-green-custom/20 border border-green-custom rounded-lg"
        >
          <div className="flex items-center">
            <Award className="text-green-custom mr-2" size={20} />
            <span className="text-white font-medium">Perfekt! Alle Lebensmittel richtig eingeordnet!</span>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// Day 3: Protein Source Memory Game
export function ProteinMemoryGame({ onComplete }: { onComplete: () => void }) {
  const [cards, setCards] = useState([
    { id: 1, content: "Linsen", type: "plant", isFlipped: false, isMatched: false },
    { id: 2, content: "Pflanzlich", type: "plant", isFlipped: false, isMatched: false },
    { id: 3, content: "Lachs", type: "fish", isFlipped: false, isMatched: false },
    { id: 4, content: "Omega-3", type: "fish", isFlipped: false, isMatched: false },
    { id: 5, content: "Quinoa", type: "complete", isFlipped: false, isMatched: false },
    { id: 6, content: "Vollständig", type: "complete", isFlipped: false, isMatched: false },
    { id: 7, content: "Tofu", type: "soy", isFlipped: false, isMatched: false },
    { id: 8, content: "Soja", type: "soy", isFlipped: false, isMatched: false }
  ].sort(() => Math.random() - 0.5));

  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);

  const handleCardClick = (cardId: number) => {
    if (flippedCards.length === 2) return;
    if (cards.find(c => c.id === cardId)?.isFlipped) return;

    const newFlipped = [...flippedCards, cardId];
    setFlippedCards(newFlipped);

    setCards(prev => 
      prev.map(card => 
        card.id === cardId ? { ...card, isFlipped: true } : card
      )
    );

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      const firstCard = cards.find(c => c.id === first);
      const secondCard = cards.find(c => c.id === second);

      if (firstCard && secondCard && firstCard.type === secondCard.type) {
        // Match found
        setTimeout(() => {
          setCards(prev => 
            prev.map(card => 
              card.id === first || card.id === second 
                ? { ...card, isMatched: true }
                : card
            )
          );
          setMatches(prev => prev + 1);
          setFlippedCards([]);
          
          if (matches + 1 === 4) {
            onComplete();
          }
        }, 1000);
      } else {
        // No match
        setTimeout(() => {
          setCards(prev => 
            prev.map(card => 
              card.id === first || card.id === second 
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedCards([]);
        }, 1500);
      }
    }
  };

  return (
    <div className="bg-navy-light rounded-2xl p-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-white flex items-center mb-2">
          <Fish className="mr-2 text-teal-custom" size={24} />
          Protein-Memory
        </h3>
        <p className="text-gray-300 text-sm">
          Finde die passenden Paare! Ordne Proteinquellen ihren Eigenschaften zu.
        </p>
        <div className="flex items-center mt-2">
          <span className="text-sm text-gray-300">Matches: {matches}/4</span>
          <Progress value={(matches / 4) * 100} className="ml-4 flex-1" />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {cards.map((card) => (
          <motion.div
            key={card.id}
            className={`aspect-square rounded-lg cursor-pointer transition-all duration-300 ${
              card.isMatched 
                ? "bg-green-custom" 
                : card.isFlipped 
                ? "bg-purple-custom" 
                : "bg-navy hover:bg-navy-light"
            }`}
            onClick={() => handleCardClick(card.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-testid={`memory-card-${card.id}`}
          >
            <div className="h-full flex items-center justify-center p-2">
              {card.isFlipped || card.isMatched ? (
                <span className="text-white text-sm font-medium text-center">
                  {card.content}
                </span>
              ) : (
                <div className="w-8 h-8 bg-gray-600 rounded"></div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Day 4: Seasonal Planning Wheel
export function SeasonalPlanningWheel({ onComplete }: { onComplete: () => void }) {
  const [selectedSeason, setSelectedSeason] = useState<string>("spring");
  const [seasonalFoods, setSeasonalFoods] = useState<{ [key: string]: string[] }>({
    spring: [],
    summer: [],
    autumn: [],
    winter: []
  });

  const seasons = {
    spring: { name: "Frühling", color: "bg-green-custom", icon: "🌱" },
    summer: { name: "Sommer", color: "bg-yellow-custom", icon: "☀️" },
    autumn: { name: "Herbst", color: "bg-orange-custom", icon: "🍂" },
    winter: { name: "Winter", color: "bg-teal-custom", icon: "❄️" }
  };

  const foods = [
    "Äpfel", "Spinat", "Kartoffeln", "Karotten", "Kohl", "Rüben", 
    "Tomaten", "Gurken", "Erdbeeren", "Spargel", "Radieschen", "Salat"
  ];

  const assignFood = (food: string) => {
    setSeasonalFoods(prev => ({
      ...prev,
      [selectedSeason]: [...prev[selectedSeason], food]
    }));
  };

  const removeFood = (food: string) => {
    setSeasonalFoods(prev => ({
      ...prev,
      [selectedSeason]: prev[selectedSeason].filter(f => f !== food)
    }));
  };

  const totalAssigned = Object.values(seasonalFoods).flat().length;
  const isCompleted = totalAssigned >= 8; // At least 2 foods per season

  if (isCompleted && totalAssigned === 8) {
    setTimeout(() => onComplete(), 1000);
  }

  return (
    <div className="bg-navy-light rounded-2xl p-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-white flex items-center mb-2">
          <Globe className="mr-2 text-green-custom" size={24} />
          Saisonaler Ernährungsplaner
        </h3>
        <p className="text-gray-300 text-sm">
          Ordne die Lebensmittel den Jahreszeiten zu, in denen sie regional verfügbar sind.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Season Selector */}
        <div>
          <h4 className="text-white font-medium mb-3">Jahreszeit wählen:</h4>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {Object.entries(seasons).map(([seasonKey, season]) => (
              <Button
                key={seasonKey}
                variant={selectedSeason === seasonKey ? "default" : "outline"}
                className={`${season.color} text-white border-none`}
                onClick={() => setSelectedSeason(seasonKey)}
                data-testid={`season-${seasonKey}`}
              >
                <span className="mr-2">{season.icon}</span>
                {season.name}
              </Button>
            ))}
          </div>

          {/* Available Foods */}
          <div className="bg-navy rounded-lg p-4">
            <h5 className="text-white text-sm font-medium mb-3">Verfügbare Lebensmittel:</h5>
            <div className="grid grid-cols-2 gap-2">
              {foods
                .filter(food => !Object.values(seasonalFoods).flat().includes(food))
                .map(food => (
                  <Button
                    key={food}
                    variant="outline"
                    size="sm"
                    onClick={() => assignFood(food)}
                    className="text-xs border-gray-600 text-gray-300 hover:bg-purple-custom"
                    data-testid={`food-${food}`}
                  >
                    {food}
                  </Button>
                ))}
            </div>
          </div>
        </div>

        {/* Season Overview */}
        <div>
          <h4 className="text-white font-medium mb-3">Zugeordnete Lebensmittel:</h4>
          <div className="space-y-3">
            {Object.entries(seasons).map(([seasonKey, season]) => (
              <div key={seasonKey} className="bg-navy rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white text-sm font-medium">
                    {season.icon} {season.name}
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    {seasonalFoods[seasonKey].length}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-1">
                  {seasonalFoods[seasonKey].map(food => (
                    <Badge
                      key={food}
                      variant="secondary"
                      className="text-xs cursor-pointer hover:bg-red-500"
                      onClick={() => removeFood(food)}
                    >
                      {food} ×
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4">
        <Progress value={(totalAssigned / 12) * 100} />
        <p className="text-gray-300 text-sm mt-2">
          {totalAssigned}/12 Lebensmittel zugeordnet
        </p>
      </div>
    </div>
  );
}

// Simple Activity Component for missing activities
export function SimpleActivityComponent({ activity, onComplete }: { activity: { id: string; name: string; type: string; points: number }; onComplete: () => void }) {
  const [isCompleted, setIsCompleted] = useState(false);

  const handleComplete = () => {
    setIsCompleted(true);
    setTimeout(() => {
      onComplete();
    }, 1500);
  };

  const getActivityContent = () => {
    switch (activity.id) {
      case "history-discussion":
        return {
          title: "Diskussion: Historische Wurzeln",
          description: "Diskutiert über die historischen Entwicklungen, die zur Planetary Health Diet geführt haben.",
          content: "Die Planetary Health Diet basiert auf jahrzehntelanger Forschung zur Verbindung zwischen Ernährung, menschlicher Gesundheit und Umweltauswirkungen. Schon in den 1970ern erkannten Wissenschaftler den Zusammenhang zwischen industrieller Landwirtschaft und Klimawandel."
        };
      case "synthesis":
        return {
          title: "Ergebnisse zusammenfassen",
          description: "Fasst die wichtigsten Erkenntnisse des Tages zusammen.",
          content: "Heute haben wir gelernt: Die PHD wurde von der EAT-Lancet Commission entwickelt, zielt auf die Balance zwischen Gesundheit und Umweltschutz ab, und Regionalität spielt eine wichtige Rolle bei der CO2-Reduktion."
        };
      case "regional-check":
        return {
          title: "Regionalitätsprüfung",
          description: "Prüft die Herkunft von Lebensmitteln und deren CO2-Bilanz.",
          content: "Regionale Lebensmittel haben oft eine bessere CO2-Bilanz durch kürzere Transportwege. Aber Achtung: Manchmal können Gewächshäuser vor Ort mehr Energie verbrauchen als Transport aus wärmeren Regionen."
        };
      case "local-sources":
        return {
          title: "Lokale Bezugsquellen finden",
          description: "Recherchiert lokale Produzenten und Märkte in der Region.",
          content: "Wochenmärkte, Hofläden, CSA (Community Supported Agriculture) und regionale Online-Plattformen bieten oft frische, saisonale Produkte direkt vom Erzeuger. Apps wie 'Marktschwärmer' helfen beim Finden lokaler Anbieter."
        };
      case "presentation-prep":
        return {
          title: "Präsentation vorbereiten",
          description: "Bereitet die Abschlusspräsentation vor.",
          content: "Strukturiert eure Erkenntnisse: 1. Was ist PHD? 2. Warum ist sie wichtig? 3. Wie setzt man sie praktisch um? 4. Welche Herausforderungen gibt es? 5. Euer Fazit und Empfehlungen."
        };
      case "final-presentation":
        return {
          title: "Finalpräsentation",
          description: "Präsentiert eure Ergebnisse vor der Klasse.",
          content: "Herzlichen Glückwunsch! Ihr habt erfolgreich ein umfassendes Verständnis der Planetary Health Diet entwickelt und könnt nun andere über nachhaltige Ernährung informieren."
        };
      case "peer-review":
        return {
          title: "Gruppenfeedback",
          description: "Gebt einander konstruktives Feedback zu den Präsentationen.",
          content: "Feedback-Struktur: Was war besonders gut? Was könnte verbessert werden? Welche neuen Erkenntnisse habt ihr gewonnen? Wie würdet ihr das Projekt weiterentwickeln?"
        };
      case "reflection":
        return {
          title: "Reflektion",
          description: "Reflektiert über das gesamte Projekt und eure Lernreise.",
          content: "Denkt zurück: Was waren die wichtigsten Erkenntnisse? Wie hat sich euer Verständnis von nachhaltiger Ernährung verändert? Welche Aspekte möchtet ihr in eurem Leben umsetzen?"
        };
      default:
        return {
          title: activity.name,
          description: "Bearbeitet diese Aktivität.",
          content: "Diese Aktivität hilft euch dabei, euer Verständnis der Planetary Health Diet zu vertiefen."
        };
    }
  };

  const activityContent = getActivityContent();

  return (
    <div className="bg-navy-light rounded-2xl p-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-white flex items-center mb-2">
          <Lightbulb className="mr-2 text-yellow-custom" size={24} />
          {activityContent.title}
        </h3>
        <p className="text-gray-300 text-sm mb-4">
          {activityContent.description}
        </p>
      </div>

      <div className="bg-navy rounded-lg p-4 mb-6">
        <p className="text-gray-300 leading-relaxed">
          {activityContent.content}
        </p>
      </div>

      {!isCompleted ? (
        <Button
          onClick={handleComplete}
          className="bg-green-custom hover:bg-green-light text-white w-full"
          data-testid={`complete-${activity.id}`}
        >
          <Check className="mr-2" size={20} />
          Aktivität abschließen ({activity.points} Punkte)
        </Button>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-custom/20 border border-green-custom rounded-lg p-4 text-center"
        >
          <Award className="text-green-custom mx-auto mb-2" size={24} />
          <span className="text-white font-medium">Aktivität erfolgreich abgeschlossen!</span>
        </motion.div>
      )}
    </div>
  );
}