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
        description: "Entdecke die Basics einer ausgewogenen Ernährung",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        duration: 8,
        thumbnailUrl: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
        order: 1,
        isActive: true
      },
      {
        title: "Vitamine & Mineralstoffe",
        description: "Wichtige Nährstoffe für deine Gesundheit",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        duration: 10,
        thumbnailUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
        order: 2,
        isActive: true
      },
      {
        title: "Mahlzeitenplanung",
        description: "Wie du ausgewogene Mahlzeiten planst",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        duration: 12,
        thumbnailUrl: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
        order: 3,
        isActive: true
      },
      {
        title: "Obst & Gemüse",
        description: "5 am Tag - so gelingt es dir!",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        duration: 9,
        thumbnailUrl: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
        order: 4,
        isActive: true
      },
      {
        title: "Proteine & Eiweiß",
        description: "Bausteine für deinen Körper",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        duration: 11,
        thumbnailUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
        order: 5,
        isActive: true
      },
      {
        title: "Flüssigkeitszufuhr",
        description: "Richtig trinken für optimale Gesundheit",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        duration: 7,
        thumbnailUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
        order: 6,
        isActive: true
      },
      {
        title: "Vollkorn & Ballaststoffe",
        description: "Langkettige Kohlenhydrate richtig nutzen",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        duration: 13,
        thumbnailUrl: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
        order: 7,
        isActive: true
      },
      {
        title: "Gesunde Fette",
        description: "Omega-3 und ungesättigte Fettsäuren",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        duration: 10,
        thumbnailUrl: "https://images.unsplash.com/photo-1587486913049-53fc88980cfc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
        order: 8,
        isActive: true
      },
      {
        title: "Achtsam essen",
        description: "Bewusste Nahrungsaufnahme praktizieren",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        duration: 8,
        thumbnailUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
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
