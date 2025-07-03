import { useState } from "react";
import { motion } from "framer-motion";
import { X, HelpCircle, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Lesson, Quiz, QuizQuestion } from "@shared/schema";
import OrganicShape from "./OrganicShape";

interface QuizModalProps {
  lesson: Lesson;
  onClose: () => void;
  onComplete: () => void;
}

export default function QuizModal({ lesson, onClose, onComplete }: QuizModalProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizResults, setQuizResults] = useState<any>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showError, setShowError] = useState(false);
  const { toast } = useToast();

  const { data: quiz, isLoading } = useQuery<Quiz>({
    queryKey: [`/api/lessons/${lesson.id}/quiz`],
  });

  const submitQuizMutation = useMutation({
    mutationFn: async (answers: number[]) => {
      const response = await apiRequest("POST", `/api/lessons/${lesson.id}/quiz/submit`, {
        lessonId: lesson.id,
        answers,
      });
      return response.json();
    },
    onSuccess: (data) => {
      setQuizResults(data);
      setShowResults(true);
      if (data.passed) {
        toast({
          title: "Quiz bestanden!",
          description: `Du hast ${data.score}% erreicht.`,
        });
      }
    },
    onError: () => {
      toast({
        title: "Fehler",
        description: "Beim Übermitteln des Quiz ist ein Fehler aufgetreten.",
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
        <div className="text-white text-xl">Quiz wird geladen...</div>
      </div>
    );
  }

  if (!quiz) {
    return null;
  }

  const questions = quiz.questions as QuizQuestion[];

  const handleAnswerSelect = (answerIndex: number) => {
    const question = questions[currentQuestion];
    const isCorrect = answerIndex === question.correctAnswer;
    
    if (isCorrect) {
      // Richtige Antwort - weiter zum nächsten Schritt
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = answerIndex;
      setAnswers(newAnswers);
      setSelectedAnswer(answerIndex);
      setShowError(false);
    } else {
      // Falsche Antwort - Fehlermeldung anzeigen
      setSelectedAnswer(answerIndex);
      setShowError(true);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowError(false);
    } else {
      submitQuizMutation.mutate(answers);
    }
  };

  const handleTryAgain = () => {
    setSelectedAnswer(null);
    setShowError(false);
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleComplete = () => {
    if (quizResults?.passed) {
      onComplete();
    } else {
      onClose();
    }
  };

  if (showResults) {
    return (
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="bg-navy-light rounded-2xl p-8 max-w-md w-full text-center relative overflow-hidden"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <OrganicShape
            className={`absolute top-0 right-0 w-24 h-24 ${
              quizResults.passed ? "bg-green-custom" : "bg-red-500"
            } opacity-20`}
            variant="default"
          />
          
          <div className="relative z-10">
            <div className={`w-16 h-16 ${
              quizResults.passed ? "bg-green-custom" : "bg-red-500"
            } rounded-full flex items-center justify-center mx-auto mb-4`}>
              {quizResults.passed ? (
                <CheckCircle className="text-white" size={32} />
              ) : (
                <XCircle className="text-white" size={32} />
              )}
            </div>
            
            <h2 className="text-2xl font-bold mb-2">
              {quizResults.passed ? "Gratulation!" : "Leider nicht bestanden"}
            </h2>
            
            <p className="text-gray-400 mb-4">
              Du hast {quizResults.correctAnswers} von {quizResults.totalQuestions} Fragen richtig beantwortet.
            </p>
            
            <div className="text-3xl font-bold text-green-custom mb-6">
              {quizResults.score}%
            </div>
            
            <p className="text-gray-400 mb-6">
              {quizResults.passed
                ? "Die nächste Lektion ist jetzt verfügbar!"
                : "Du benötigst mindestens 70% um fortzufahren. Versuche es erneut!"}
            </p>
            
            <Button
              onClick={handleComplete}
              className={`${
                quizResults.passed 
                  ? "bg-green-custom hover:bg-green-custom/90" 
                  : "bg-gray-600 hover:bg-gray-700"
              } text-white px-6 py-3 rounded-xl font-semibold`}
            >
              {quizResults.passed ? "Weiter zur nächsten Lektion" : "Zurück zur Übersicht"}
            </Button>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-navy-light rounded-2xl p-8 max-w-2xl w-full relative overflow-hidden"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
      >
        <OrganicShape
          className="absolute top-0 right-0 w-32 h-32 bg-purple-custom opacity-20"
          variant="default"
        />
        
        <div className="relative z-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-purple-custom rounded-full flex items-center justify-center mx-auto mb-4">
              <HelpCircle className="text-white" size={32} />
            </div>
            <h2 className="text-2xl font-bold mb-2">Quiz: {lesson.title}</h2>
            <p className="text-gray-400">Teste dein Wissen über {lesson.title}</p>
          </div>
          
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">
                Frage {currentQuestion + 1} von {questions.length}
              </h3>
              <div className="text-sm text-gray-400">
                {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
              </div>
            </div>
            
            <div className="w-full bg-gray-700 rounded-full h-2 mb-6">
              <div 
                className="bg-purple-custom h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              />
            </div>
            
            <p className="text-gray-300 mb-6 text-lg">
              {questions[currentQuestion].question}
            </p>
            
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <label
                  key={index}
                  className={`flex items-center p-4 rounded-xl cursor-pointer transition-colors ${
                    selectedAnswer === index && showError
                      ? "bg-red-500 text-white"
                      : answers[currentQuestion] === index
                      ? "bg-green-custom text-white"
                      : "bg-gray-800 hover:bg-gray-700"
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${currentQuestion}`}
                    value={index}
                    checked={selectedAnswer === index || answers[currentQuestion] === index}
                    onChange={() => handleAnswerSelect(index)}
                    className="mr-3"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
            
            {/* Fehlermeldung */}
            {showError && (
              <motion.div
                className="mt-4 p-4 bg-red-500/20 border border-red-500 rounded-xl"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center space-x-3">
                  <XCircle className="text-red-500" size={20} />
                  <div>
                    <p className="text-red-500 font-semibold">
                      Diese Antwort ist leider nicht korrekt – bitte versuche es noch einmal.
                    </p>
                    <p className="text-gray-400 text-sm mt-1">
                      {questions[currentQuestion].explanation}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={handleTryAgain}
                  className="mt-3 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Erneut versuchen
                </Button>
              </motion.div>
            )}
          </div>
          
          <div className="flex justify-between">
            <Button
              onClick={onClose}
              variant="outline"
              className="text-white border-gray-600 hover:bg-gray-700"
            >
              <X className="mr-2" size={16} />
              Abbrechen
            </Button>
            
            <div className="flex space-x-3">
              {currentQuestion > 0 && (
                <Button
                  onClick={handlePrevious}
                  variant="outline"
                  className="px-6 py-3"
                >
                  Zurück
                </Button>
              )}
              
              <Button
                onClick={handleNext}
                disabled={answers[currentQuestion] === undefined || submitQuizMutation.isPending}
                className="bg-purple-custom hover:bg-purple-custom/90 text-white px-6 py-3 font-semibold"
              >
                {submitQuizMutation.isPending
                  ? "Wird übermittelt..."
                  : currentQuestion === questions.length - 1
                  ? "Quiz abschließen"
                  : "Nächste Frage"}
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}