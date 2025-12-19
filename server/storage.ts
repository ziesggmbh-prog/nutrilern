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
    // Seed lessons - NEUE REIHENFOLGE
    const lessonData = [
      {
        title: "Intro",
        description: "Eine kurze Einführung in die Bild- und Gedankenwelt der Videoreihe.",
        videoUrl: "https://player.vimeo.com/video/1100816490",
        duration: 2,
        thumbnailUrl: "/assets/1_1751542243605_optimized.jpg",
        order: 1,
        isActive: true
      },
      {
        title: "Kohlenhydrate",
        description: "Erfahre, warum Kohlenhydrate ein wichtiger Bestandteil deiner Ernährung sind und wie sie dir am meisten nützen.",
        videoUrl: "https://player.vimeo.com/video/1099335411",
        duration: 5,
        thumbnailUrl: "/assets/6_1751542243606_optimized.jpg",
        order: 2,
        isActive: true
      },
      {
        title: "Fette",
        description: "Wir klären, welche Rolle Fette in deinem Körper spielen und was es mit ‚guten' und ‚schlechten' Fetten auf sich hat.",
        videoUrl: "https://player.vimeo.com/video/1117810836",
        duration: 5,
        thumbnailUrl: "/assets/ziesggmbh_59072_people_in_pink_lab_coats_construct_an_oversiz_431d5cd8-1fd6-49bb-ab81-53f245fa746c_0_1757676310861.png",
        order: 3,
        isActive: true
      },
      {
        title: "Proteine",
        description: "Wofür Eiweiß wichtig ist, wie du ausreichend davon bekommst und wie das Thema mit den Fetten zusammenhängt.",
        videoUrl: "https://player.vimeo.com/video/1148007412",
        duration: 5,
        thumbnailUrl: "/assets/ziesggmbh_59072_Millions_of_giant_organic_looking_delicately___1766145889343.png",
        order: 4,
        isActive: true
      },
      {
        title: "Mikronährstoffe",
        description: "Ein Einblick in die faszinierende Welt der Mikronährstoffe und ihre Bedeutung für die Ernährung.",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        duration: 5,
        thumbnailUrl: "/assets/5_1751542243606_optimized.jpg",
        order: 5,
        isActive: true
      },
      {
        title: "Unterwelt",
        description: "Welche Stoffe wirklich ungesund sind und wie du ihnen entkommst.",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        duration: 5,
        thumbnailUrl: "/assets/8_1751542243607_optimized.jpg",
        order: 6,
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
        lessonId: 2,
        questions: [
          {
            id: "q1",
            question: "Welcher Makronährstoff ist der wichtigste Energielieferant für das Gehirn?",
            options: [
              "Proteine",
              "Fette",
              "Ballaststoffe",
              "Kohlenhydrate"
            ],
            correctAnswer: 3,
            explanation: "Das Gehirn ist auf Kohlenhydrate als Hauptenergiequelle angewiesen und verbraucht etwa 20% unseres täglichen Energiebedarfs."
          },
          {
            id: "q2",
            question: "Warum sind komplexe Kohlenhydrate gesünder als einfache?",
            options: [
              "Sie schmecken besser",
              "Sie sind schneller verdaut",
              "Sie liefern gleichmäßig Energie über längere Zeit",
              "Sie enthalten mehr Wasser"
            ],
            correctAnswer: 2,
            explanation: "Komplexe Kohlenhydrate werden langsamer abgebaut und sorgen für einen gleichmäßigeren Blutzuckerspiegel ohne starke Schwankungen."
          },
          {
            id: "q3",
            question: "In welchen Lebensmitteln finden sich überwiegend 'gute' Kohlenhydrate?",
            options: [
              "Süßigkeiten, Weißbrot und Limonade",
              "Chips, Käse und Wurst",
              "Obst, Gemüse und Vollkornprodukte",
              "Fruchtsäfte, Honig und Kekse"
            ],
            correctAnswer: 2,
            explanation: "Obst, Gemüse und Vollkornprodukte enthalten komplexe Kohlenhydrate, Ballaststoffe und wichtige Nährstoffe."
          },
          {
            id: "q4",
            question: "Warum ist Traubenzucker vor einer Prüfung keine gute Wahl?",
            options: [
              "Weil er zu teuer ist",
              "Weil er zu lange braucht, um Energie zu liefern",
              "Weil er den Blutzuckerspiegel langfristig stabilisiert",
              "Weil er nur kurzzeitig Energie liefert und danach müde macht"
            ],
            correctAnswer: 3,
            explanation: "Traubenzucker führt zu einem schnellen Anstieg des Blutzuckers, gefolgt von einem starken Abfall, was Müdigkeit und Konzentrationsprobleme verursacht."
          }
        ]
      },
      {
        lessonId: 3,
        questions: [
          {
            id: "f1",
            question: "Welche Funktion haben Fette im Körper neben der Energielieferung?",
            options: [
              "Sie dienen dem Muskelaufbau",
              "Sie sind Bestandteil der Zellmembran",
              "Sie speichern Wasser",
              "Sie bauen Kohlenhydrate ab"
            ],
            correctAnswer: 1,
            explanation: "Fette sind wichtige Bestandteile der Zellmembranen und haben strukturelle Funktionen im Körper. Muskelaufbau erfolgt durch Proteine, nicht durch Fette."
          },
          {
            id: "f2",
            question: "Wie viel Energie liefert 1 Gramm Fett im Vergleich zu 1 Gramm Kohlenhydrate oder Proteine?",
            options: [
              "Gleich viel",
              "Weniger", 
              "Mehr als doppelt so viel",
              "Viermal so viel"
            ],
            correctAnswer: 2,
            explanation: "Fette liefern etwa doppelt so viel Energie wie Kohlenhydrate oder Proteine - das macht sie zum energiereichsten Nährstoff."
          },
          {
            id: "f3", 
            question: "Welche Fettsäuren kann der Körper nicht selbst herstellen?",
            options: [
              "Gesättigte Fettsäuren",
              "Einfach ungesättigte Fettsäuren",
              "Mehrfach ungesättigte Fettsäuren", 
              "Alle Fettsäuren"
            ],
            correctAnswer: 2,
            explanation: "Nur die mehrfach ungesättigten (essentiellen) Fettsäuren müssen wir über die Nahrung aufnehmen, da der Körper sie nicht selbst bilden kann."
          },
          {
            id: "f4",
            question: "Wo kommen vor allem gesättigte Fettsäuren vor?",
            options: [
              "In Nüssen und Samen",
              "In pflanzlichen Ölen wie Olivenöl",
              "In Milchprodukten, Fleisch und Palmöl",
              "In fettem Seefisch"
            ],
            correctAnswer: 2,
            explanation: "Gesättigte Fettsäuren finden sich hauptsächlich in tierischen Produkten wie Milchprodukten und Fleisch sowie in Palmöl."
          },
          {
            id: "f5",
            question: "Welcher Anteil der täglichen Ernährung sollte maximal aus Fetten bestehen?",
            options: [
              "50 %",
              "Ein Drittel",
              "25 %", 
              "10 %"
            ],
            correctAnswer: 1,
            explanation: "Ein Drittel der täglichen Energiezufuhr sollte maximal aus Fetten bestehen, um eine ausgewogene Ernährung zu gewährleisten."
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
