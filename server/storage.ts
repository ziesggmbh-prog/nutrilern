import { 
  users, 
  lessons, 
  quizzes, 
  userProgress,
  type User, 
  type Lesson,
  type Quiz,
  type UserProgress,
  type InsertUser, 
  type InsertLesson,
  type InsertQuiz,
  type InsertUserProgress,
  type QuizQuestion
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Lesson methods
  getAllLessons(): Promise<Lesson[]>;
  getLesson(id: number): Promise<Lesson | undefined>;
  createLesson(lesson: InsertLesson): Promise<Lesson>;
  
  // Quiz methods
  getQuizByLessonId(lessonId: number): Promise<Quiz | undefined>;
  createQuiz(quiz: InsertQuiz): Promise<Quiz>;
  
  // Progress methods
  getUserProgress(userId: number): Promise<UserProgress[]>;
  getUserProgressByLesson(userId: number, lessonId: number): Promise<UserProgress | undefined>;
  createUserProgress(progress: InsertUserProgress): Promise<UserProgress>;
  updateUserProgress(id: number, progress: Partial<UserProgress>): Promise<UserProgress>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private lessons: Map<number, Lesson>;
  private quizzes: Map<number, Quiz>;
  private userProgress: Map<number, UserProgress>;
  private currentUserId: number;
  private currentLessonId: number;
  private currentQuizId: number;
  private currentProgressId: number;

  constructor() {
    this.users = new Map();
    this.lessons = new Map();
    this.quizzes = new Map();
    this.userProgress = new Map();
    this.currentUserId = 1;
    this.currentLessonId = 1;
    this.currentQuizId = 1;
    this.currentProgressId = 1;
    
    this.seedData();
  }

  private seedData() {
    // Seed lessons
    const lessonData = [
      {
        title: "Intro",
        description: "Ein kurzer Überblick über das, was dich in dieser Videoreihe rund um Ernährung, Bewegung und Gesundheit erwartet.",
        videoUrl: "/assets/AI_Intro_X_1751549357807.mp4",
        duration: 8,
        thumbnailUrl: "/assets/1_1751542243605.png",
        order: 1,
        isActive: true
      },
      {
        title: "Kohlenhydrate",
        description: "Erfahre, welche Rolle Kohlenhydrate in deinem Körper spielen und warum sie mehr sind als nur Zucker.",
        videoUrl: "/assets/Kohlenhydrate_V5_1751550361289.mp4",
        duration: 10,
        thumbnailUrl: "/assets/6_1751542243606.png",
        order: 2,
        isActive: true
      },
      {
        title: "Proteine",
        description: "Warum Eiweiß für Muskeln, Immunsystem und Regeneration so wichtig ist - und wie du genug davon bekommst.",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        duration: 12,
        thumbnailUrl: "/assets/3_1751542243606.png",
        order: 3,
        isActive: true
      },
      {
        title: "Fette",
        description: "Gesunde vs. ungesunde Fette: Wir klären, warum Fett nicht dein Feind ist, sondern ein wichtiger Energielieferant.",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        duration: 9,
        thumbnailUrl: "/assets/4_1751549047993.png",
        order: 4,
        isActive: true
      },
      {
        title: "Mikronährstoffe",
        description: "Vitamine und Mineralstoffe im Fokus - klein, aber unverzichtbar für Gesundheit und Leistungsfähigkeit.",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        duration: 11,
        thumbnailUrl: "/assets/5_1751542243606.png",
        order: 5,
        isActive: true
      },
      {
        title: "Die Hölle",
        description: "Ein Blick auf ungesunde Ernährungsmuster und Lebensweisen - und wie du ihnen entkommst.",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        duration: 7,
        thumbnailUrl: "/assets/8_1751542243607.png",
        order: 6,
        isActive: true
      },
      {
        title: "Trinken",
        description: "Warum ausreichend Flüssigkeit entscheidend für Konzentration, Leistungsfähigkeit und Wohlbefinden ist.",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        duration: 13,
        thumbnailUrl: "/assets/7_1751542243606.png",
        order: 7,
        isActive: true
      },
      {
        title: "Bewegung - Teil 1",
        description: "Die Grundlagen körperlicher Aktivität: Warum Bewegung essenziell für deine Gesundheit ist.",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        duration: 10,
        thumbnailUrl: "/assets/2_1751542243605.png",
        order: 8,
        isActive: true
      },
      {
        title: "Bewegung - Teil 2",
        description: "Praktische Tipps, wie du mehr Bewegung in deinen Alltag integrierst - auch ohne Fitnessstudio.",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        duration: 8,
        thumbnailUrl: "/assets/9_1751542243607.png",
        order: 9,
        isActive: true
      }
    ];

    lessonData.forEach(lesson => {
      const id = this.currentLessonId++;
      this.lessons.set(id, { ...lesson, id });
    });

    // Seed quizzes
    const quizData = [
      {
        lessonId: 1,
        questions: [
          {
            id: "q1",
            question: "Welche Nährstoffe sind die Hauptenergielieferanten für den menschlichen Körper?",
            options: [
              "Vitamine und Mineralstoffe",
              "Kohlenhydrate, Fette und Proteine",
              "Wasser und Ballaststoffe",
              "Antioxidantien und Enzyme"
            ],
            correctAnswer: 1,
            explanation: "Kohlenhydrate, Fette und Proteine sind die drei Makronährstoffe, die unserem Körper Energie liefern."
          },
          {
            id: "q2",
            question: "Wie viele Kalorien liefert 1 Gramm Kohlenhydrate?",
            options: ["2 kcal", "4 kcal", "7 kcal", "9 kcal"],
            correctAnswer: 1,
            explanation: "Kohlenhydrate liefern 4 kcal pro Gramm, genau wie Proteine."
          },
          {
            id: "q3",
            question: "Was ist der empfohlene Anteil von Kohlenhydraten an der täglichen Energiezufuhr?",
            options: ["30-35%", "45-65%", "70-80%", "10-15%"],
            correctAnswer: 1,
            explanation: "45-65% der täglichen Energiezufuhr sollte aus Kohlenhydraten stammen."
          }
        ]
      },
      {
        lessonId: 2,
        questions: [
          {
            id: "q1",
            question: "Welche Kohlenhydrate sollten den größten Anteil in der Ernährung haben?",
            options: [
              "Einfachzucker wie Glucose",
              "Komplexe Kohlenhydrate wie Vollkornprodukte",
              "Fruktose aus Obst",
              "Raffinierte Zuckerarten"
            ],
            correctAnswer: 1,
            explanation: "Komplexe Kohlenhydrate aus Vollkornprodukten liefern langanhaltende Energie und wichtige Nährstoffe."
          },
          {
            id: "q2",
            question: "Was passiert mit überschüssigen Kohlenhydraten im Körper?",
            options: [
              "Sie werden ausgeschieden",
              "Sie werden als Fett gespeichert",
              "Sie werden in Proteine umgewandelt",
              "Sie bleiben im Blut"
            ],
            correctAnswer: 1,
            explanation: "Überschüssige Kohlenhydrate werden vom Körper in Fett umgewandelt und gespeichert."
          },
          {
            id: "q3",
            question: "Welche Funktion haben Ballaststoffe im Körper?",
            options: [
              "Sie liefern viel Energie",
              "Sie fördern die Verdauung und Darmgesundheit",
              "Sie werden zu Zucker abgebaut",
              "Sie ersetzen Vitamine"
            ],
            correctAnswer: 1,
            explanation: "Ballaststoffe fördern die Verdauung, unterstützen die Darmgesundheit und helfen bei der Blutzuckerregulation."
          }
        ]
      },
      {
        lessonId: 3,
        questions: [
          {
            id: "q1",
            question: "Wie viele essentielle Aminosäuren gibt es?",
            options: ["5", "8", "12", "20"],
            correctAnswer: 1,
            explanation: "Es gibt 8 essentielle Aminosäuren, die der Körper nicht selbst herstellen kann."
          },
          {
            id: "q2",
            question: "Was ist ein vollständiges Protein?",
            options: [
              "Ein Protein mit vielen Kalorien",
              "Ein Protein mit allen essentiellen Aminosäuren",
              "Ein Protein aus Pflanzen",
              "Ein Protein ohne Fett"
            ],
            correctAnswer: 1,
            explanation: "Ein vollständiges Protein enthält alle essentiellen Aminosäuren in ausreichender Menge."
          },
          {
            id: "q3",
            question: "Wie viel Protein sollte ein Erwachsener täglich zu sich nehmen?",
            options: ["0,4g pro kg Körpergewicht", "0,8g pro kg Körpergewicht", "1,5g pro kg Körpergewicht", "2,5g pro kg Körpergewicht"],
            correctAnswer: 1,
            explanation: "Die empfohlene Tagesmenge liegt bei etwa 0,8g Protein pro kg Körpergewicht für Erwachsene."
          }
        ]
      },
      {
        lessonId: 4,
        questions: [
          {
            id: "q1",
            question: "Welche Fette sind besonders gesund?",
            options: [
              "Gesättigte Fette",
              "Transfette",
              "Ungesättigte Fette",
              "Gehärtete Fette"
            ],
            correctAnswer: 2,
            explanation: "Ungesättigte Fette, besonders Omega-3-Fettsäuren, sind besonders gesund für Herz und Gehirn."
          },
          {
            id: "q2",
            question: "Wie viele Kalorien liefert 1 Gramm Fett?",
            options: ["4 kcal", "7 kcal", "9 kcal", "12 kcal"],
            correctAnswer: 2,
            explanation: "Fette liefern 9 kcal pro Gramm und sind damit der energiereichste Makronährstoff."
          },
          {
            id: "q3",
            question: "Welche Vitamine sind fettlöslich?",
            options: [
              "Vitamin B und C",
              "Vitamin A, D, E und K",
              "Alle B-Vitamine",
              "Vitamin C und Folsäure"
            ],
            correctAnswer: 1,
            explanation: "Die Vitamine A, D, E und K sind fettlöslich und benötigen Fett für die Aufnahme."
          }
        ]
      },
      {
        lessonId: 5,
        questions: [
          {
            id: "q1",
            question: "Was sind Mikronährstoffe?",
            options: [
              "Kohlenhydrate, Fette und Proteine",
              "Vitamine und Mineralstoffe",
              "Wasser und Ballaststoffe",
              "Zucker und Stärke"
            ],
            correctAnswer: 1,
            explanation: "Mikronährstoffe sind Vitamine und Mineralstoffe, die der Körper in kleinen Mengen benötigt."
          },
          {
            id: "q2",
            question: "Welches Vitamin wird durch Sonneneinstrahlung in der Haut gebildet?",
            options: ["Vitamin A", "Vitamin C", "Vitamin D", "Vitamin E"],
            correctAnswer: 2,
            explanation: "Vitamin D wird durch UV-Strahlung in der Haut gebildet und ist wichtig für Knochen und Immunsystem."
          },
          {
            id: "q3",
            question: "Welcher Mineralstoff ist wichtig für den Sauerstofftransport im Blut?",
            options: ["Calcium", "Eisen", "Magnesium", "Kalium"],
            correctAnswer: 1,
            explanation: "Eisen ist ein wichtiger Bestandteil des Hämoglobins und transportiert Sauerstoff im Blut."
          }
        ]
      },
      {
        lessonId: 6,
        questions: [
          {
            id: "q1",
            question: "Was charakterisiert ungesunde Ernährungsmuster?",
            options: [
              "Viel Gemüse und Obst",
              "Hoher Anteil an verarbeiteten Lebensmitteln",
              "Regelmäßige Mahlzeiten",
              "Ausreichend Wasser"
            ],
            correctAnswer: 1,
            explanation: "Ungesunde Ernährungsmuster sind geprägt von vielen verarbeiteten Lebensmitteln mit viel Zucker, Salz und ungesunden Fetten."
          },
          {
            id: "q2",
            question: "Welche Auswirkungen hat dauerhaft schlechte Ernährung?",
            options: [
              "Nur kurzfristige Müdigkeit",
              "Erhöhtes Risiko für chronische Krankheiten",
              "Bessere Konzentration",
              "Stärkeres Immunsystem"
            ],
            correctAnswer: 1,
            explanation: "Dauerhaft schlechte Ernährung erhöht das Risiko für Diabetes, Herzerkrankungen und andere chronische Leiden."
          },
          {
            id: "q3",
            question: "Wie kann man ungesunde Gewohnheiten durchbrechen?",
            options: [
              "Alles auf einmal ändern",
              "Schrittweise Umstellung mit realistischen Zielen",
              "Komplett auf Essen verzichten",
              "Nur Nahrungsergänzungsmittel nehmen"
            ],
            correctAnswer: 1,
            explanation: "Schrittweise Veränderungen mit realistischen Zielen sind nachhaltiger als radikale Diäten."
          }
        ]
      },
      {
        lessonId: 7,
        questions: [
          {
            id: "q1",
            question: "Wie viel Wasser sollte ein Erwachsener täglich trinken?",
            options: ["0,5 Liter", "1 Liter", "1,5-2 Liter", "4 Liter"],
            correctAnswer: 2,
            explanation: "Die empfohlene Trinkmenge liegt bei 1,5-2 Litern pro Tag, je nach Aktivität und Umgebung."
          },
          {
            id: "q2",
            question: "Was sind die ersten Anzeichen von Dehydration?",
            options: [
              "Übelkeit und Erbrechen",
              "Durst und dunkler Urin",
              "Fieber und Schüttelfrost",
              "Hautausschlag"
            ],
            correctAnswer: 1,
            explanation: "Durst und dunkler Urin sind frühe Warnsignale für Dehydration."
          },
          {
            id: "q3",
            question: "Welche Getränke sind für die tägliche Flüssigkeitszufuhr am besten geeignet?",
            options: [
              "Kaffee und Tee",
              "Wasser und ungesüßte Tees",
              "Limonaden und Säfte",
              "Energydrinks"
            ],
            correctAnswer: 1,
            explanation: "Wasser und ungesüßte Tees sind die besten Durstlöscher ohne zusätzliche Kalorien."
          }
        ]
      },
      {
        lessonId: 8,
        questions: [
          {
            id: "q1",
            question: "Wie viele Minuten Bewegung empfiehlt die WHO pro Woche?",
            options: ["75 Minuten", "150 Minuten", "300 Minuten", "500 Minuten"],
            correctAnswer: 1,
            explanation: "Die WHO empfiehlt mindestens 150 Minuten moderate Bewegung pro Woche."
          },
          {
            id: "q2",
            question: "Was zählt als moderate körperliche Aktivität?",
            options: [
              "Marathonlauf",
              "Zügiges Gehen oder Radfahren",
              "Gewichtheben",
              "Sprinting"
            ],
            correctAnswer: 1,
            explanation: "Zügiges Gehen, lockeres Radfahren oder Schwimmen sind Beispiele für moderate Aktivität."
          },
          {
            id: "q3",
            question: "Welche Auswirkungen hat regelmäßige Bewegung auf die Gesundheit?",
            options: [
              "Nur Muskelaufbau",
              "Stärkung von Herz, Immunsystem und mentaler Gesundheit",
              "Nur Gewichtsverlust",
              "Keine langfristigen Effekte"
            ],
            correctAnswer: 1,
            explanation: "Regelmäßige Bewegung stärkt Herz-Kreislauf-System, Immunsystem und verbessert die mentale Gesundheit."
          }
        ]
      },
      {
        lessonId: 9,
        questions: [
          {
            id: "q1",
            question: "Welche einfachen Bewegungen kann man in den Alltag integrieren?",
            options: [
              "Nur Fitnessstudio-Training",
              "Treppensteigen statt Aufzug, zu Fuß gehen",
              "Nur Hochleistungssport",
              "Lange Autofahrten"
            ],
            correctAnswer: 1,
            explanation: "Treppensteigen, zu Fuß gehen oder Rad fahren sind einfache Wege, mehr Bewegung in den Alltag zu bringen."
          },
          {
            id: "q2",
            question: "Wie oft sollte man längere Sitzphasen unterbrechen?",
            options: [
              "Alle 2-3 Stunden",
              "Alle 30-60 Minuten",
              "Nur am Ende des Arbeitstages",
              "Gar nicht"
            ],
            correctAnswer: 1,
            explanation: "Längere Sitzphasen sollten alle 30-60 Minuten durch kurze Bewegungspausen unterbrochen werden."
          },
          {
            id: "q3",
            question: "Was ist der wichtigste Schritt, um aktiver zu werden?",
            options: [
              "Sofort einen Marathon laufen",
              "Klein anfangen und Gewohnheiten aufbauen",
              "Teure Ausrüstung kaufen",
              "Nur am Wochenende aktiv sein"
            ],
            correctAnswer: 1,
            explanation: "Klein anfangen und schrittweise Bewegungsgewohnheiten aufbauen ist der nachhaltigste Weg zu mehr Aktivität."
          }
        ]
      }
    ];

    quizData.forEach(quiz => {
      const id = this.currentQuizId++;
      this.quizzes.set(id, { ...quiz, id });
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id, 
      currentLevel: 1,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  async getAllLessons(): Promise<Lesson[]> {
    return Array.from(this.lessons.values()).sort((a, b) => a.order - b.order);
  }

  async getLesson(id: number): Promise<Lesson | undefined> {
    return this.lessons.get(id);
  }

  async createLesson(insertLesson: InsertLesson): Promise<Lesson> {
    const id = this.currentLessonId++;
    const lesson: Lesson = { 
      ...insertLesson, 
      id,
      isActive: insertLesson.isActive ?? true
    };
    this.lessons.set(id, lesson);
    return lesson;
  }

  async getQuizByLessonId(lessonId: number): Promise<Quiz | undefined> {
    return Array.from(this.quizzes.values()).find(quiz => quiz.lessonId === lessonId);
  }

  async createQuiz(insertQuiz: InsertQuiz): Promise<Quiz> {
    const id = this.currentQuizId++;
    const quiz: Quiz = { ...insertQuiz, id };
    this.quizzes.set(id, quiz);
    return quiz;
  }

  async getUserProgress(userId: number): Promise<UserProgress[]> {
    return Array.from(this.userProgress.values()).filter(progress => progress.userId === userId);
  }

  async getUserProgressByLesson(userId: number, lessonId: number): Promise<UserProgress | undefined> {
    return Array.from(this.userProgress.values()).find(
      progress => progress.userId === userId && progress.lessonId === lessonId
    );
  }

  async createUserProgress(insertProgress: InsertUserProgress): Promise<UserProgress> {
    const id = this.currentProgressId++;
    const isCompleted = insertProgress.isCompleted ?? false;
    const progress: UserProgress = { 
      id,
      userId: insertProgress.userId,
      lessonId: insertProgress.lessonId,
      isCompleted,
      quizScore: insertProgress.quizScore ?? null,
      completedAt: isCompleted ? new Date() : null
    };
    this.userProgress.set(id, progress);
    return progress;
  }

  async updateUserProgress(id: number, updateData: Partial<UserProgress>): Promise<UserProgress> {
    const existing = this.userProgress.get(id);
    if (!existing) {
      throw new Error('Progress not found');
    }
    
    const updated: UserProgress = { 
      ...existing, 
      ...updateData,
      completedAt: updateData.isCompleted ? new Date() : existing.completedAt
    };
    this.userProgress.set(id, updated);
    return updated;
  }
}

export const storage = new MemStorage();
