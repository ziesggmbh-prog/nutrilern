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
        videoUrl: "https://player.vimeo.com/video/1172528318",
        duration: 2,
        thumbnailUrl: "/assets/0_Intro_1773233463712_opt.jpg",
        order: 1,
        isActive: true
      },
      {
        title: "Kohlenhydrate",
        description: "Erfahre, warum Kohlenhydrate ein wichtiger Bestandteil deiner Ernährung sind und wie sie dir am meisten nützen.",
        videoUrl: "https://player.vimeo.com/video/1172528646",
        duration: 5,
        thumbnailUrl: "/assets/kohlenhydrate_thumbnail_1773233685393_opt.jpg",
        order: 2,
        isActive: true
      },
      {
        title: "Fette",
        description: "Wir klären, welche Rolle Fette in deinem Körper spielen und was es mit ‚guten' und ‚schlechten' Fetten auf sich hat.",
        videoUrl: "https://player.vimeo.com/video/1172530056",
        duration: 5,
        thumbnailUrl: "/assets/fette_thumbnail_1773234114265_opt.jpg",
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
        thumbnailUrl: "/assets/mikronaehrstoffe_thumbnail_1773234148860_opt.jpg",
        order: 5,
        isActive: true
      },
      {
        title: "Unterwelt",
        description: "Welche Stoffe wirklich ungesund sind und wie du ihnen entkommst.",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        duration: 5,
        thumbnailUrl: "/assets/unterwelt_thumbnail_1773234316303_opt.jpg",
        order: 6,
        isActive: true
      },
      {
        title: "Outro",
        description: "Die Umsetzung des Ernährungswissens im Alltag.",
        videoUrl: "",
        duration: 3,
        thumbnailUrl: "/assets/outro_thumbnail_1773234406911_opt.jpg",
        order: 7,
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
            id: "c1",
            question: "Was liefern Makronährstoffe dem Körper?",
            options: [
              "Vitamine",
              "Energie",
              "Wasser",
              "Ballaststoffe"
            ],
            correctAnswer: 1,
            explanation: "Makronährstoffe – Kohlenhydrate, Fette und Proteine – sind die wichtigsten Energielieferanten des Körpers."
          },
          {
            id: "c2",
            question: "Warum sind komplexe Kohlenhydrate gesünder als einfache?",
            options: [
              "Sie schmecken besser",
              "Sie enthalten mehr Wasser",
              "Sie sind schneller verdaut",
              "Sie liefern gleichmäßig Energie über längere Zeit"
            ],
            correctAnswer: 3,
            explanation: "Komplexe Kohlenhydrate werden langsamer abgebaut und sorgen für einen gleichmäßigeren Blutzuckerspiegel ohne starke Schwankungen."
          },
          {
            id: "c3",
            question: "In welchen Lebensmitteln finden sich überwiegend 'gute' Kohlenhydrate?",
            options: [
              "Süßigkeiten, Weißbrot, Limonade",
              "Milch, Joghurt, Käse",
              "Obst, Gemüse, Vollkornprodukte, Hülsenfrüchte",
              "Energieriegel, Trockenfrüchte, weißer Reis"
            ],
            correctAnswer: 2,
            explanation: "Obst, Gemüse, Vollkornprodukte und Hülsenfrüchte enthalten komplexe Kohlenhydrate, Ballaststoffe und wichtige Nährstoffe."
          },
          {
            id: "c4",
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
            id: "f2",
            question: "Wie viel Energie liefert 1 Gramm Fett im Vergleich zu 1 Gramm Kohlenhydrate oder Proteine?",
            options: [
              "Gleich viel",
              "Weniger",
              "Mehr als doppelt so viel",
              "Viermal so viel"
            ],
            correctAnswer: 2,
            explanation: "Fette liefern etwa doppelt so viel Energie wie Kohlenhydrate oder Proteine – das macht sie zum energiereichsten Nährstoff."
          },
          {
            id: "f4",
            question: "Worin kommen vor allem 'schlechte' Fette (gesättigte Fettsäuren) vor?",
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
            id: "f5",
            question: "Welcher Anteil der täglichen Ernährung sollte maximal aus Fetten bestehen?",
            options: [
              "50 %",
              "10 %",
              "Ein Drittel",
              "Zwei Drittel"
            ],
            correctAnswer: 2,
            explanation: "Ein Drittel der täglichen Energiezufuhr sollte maximal aus Fetten bestehen, um eine ausgewogene Ernährung zu gewährleisten."
          }
        ]
      },
      {
        lessonId: 4,
        questions: [
          {
            id: "p1",
            question: "Woraus bestehen Proteine?",
            options: [
              "Aus Fettsäuren",
              "Aus Zuckermolekülen",
              "Aus Aminosäuren",
              "Aus Mineralstoffen"
            ],
            correctAnswer: 2,
            explanation: "Proteine sind aus Aminosäuren aufgebaut, die der Körper für viele lebenswichtige Funktionen benötigt."
          },
          {
            id: "p2",
            question: "Was ist der Vorteil von tierischem Protein?",
            options: [
              "Es enthält besonders viele Vitamine",
              "Es enthält alle essentiellen Aminosäuren in günstiger Zusammensetzung",
              "Es enthält keine Fette",
              "Es kann vom Körper nicht zerlegt werden"
            ],
            correctAnswer: 1,
            explanation: "Tierisches Protein enthält alle essentiellen Aminosäuren in einer Zusammensetzung, die der Körper gut verwerten kann."
          },
          {
            id: "p3",
            question: "Warum ist pflanzliches Protein dennoch vorzuziehen (Ausnahme: fetter Seefisch)?",
            options: [
              "Es ist noch energiereicher",
              "Es wird schneller verdaut",
              "Es enthält meist Ballaststoffe und weniger gesättigte Fettsäuren",
              "Es enthält keine nicht-essentiellen Aminosäuren"
            ],
            correctAnswer: 2,
            explanation: "Pflanzliche Proteinquellen liefern meist auch Ballaststoffe und kommen mit weniger gesättigten Fettsäuren, was sie insgesamt gesünder macht."
          },
          {
            id: "p4",
            question: "Wie lassen sich fehlende Aminosäuren bei pflanzlicher Ernährung am besten ausgleichen?",
            options: [
              "Durch Verzicht auf Kohlenhydrate",
              "Durch Kombination verschiedener pflanzlicher Proteinquellen",
              "Durch erhöhte Salzzufuhr",
              "Durch Proteinshakes und Nahrungsergänzungsmittel"
            ],
            correctAnswer: 1,
            explanation: "Durch die Kombination verschiedener pflanzlicher Quellen (z. B. Hülsenfrüchte + Getreide) lassen sich alle essentiellen Aminosäuren abdecken."
          }
        ]
      },
      {
        lessonId: 5,
        questions: [
          {
            id: "m1",
            question: "Wodurch unterscheiden sich Mikronährstoffe von Makronährstoffen?",
            options: [
              "Sie liefern wenig Energie",
              "Sie werden in großen Mengen benötigt",
              "Sie liefern keine Energie, sondern haben eine steuernde Funktion",
              "Sie dienen als Baustoff für Muskeln und Gewebe"
            ],
            correctAnswer: 2,
            explanation: "Anders als Makronährstoffe liefern Mikronährstoffe keine Energie, sondern steuern und regulieren wichtige Körperfunktionen."
          },
          {
            id: "m2",
            question: "Was sollte man bei Verdacht auf Nährstoffmangel tun?",
            options: [
              "Verschiedene Nahrungsergänzungsmittel ausprobieren",
              "Mit einem Arzt:einer Ärztin sprechen",
              "Täglich einen Apfel und ausschließlich Vollkornbrot essen",
              "Gar nichts, ein Mangel an Mikronährstoffen schadet der Gesundheit nicht"
            ],
            correctAnswer: 1,
            explanation: "Ein Nährstoffmangel sollte immer ärztlich diagnostiziert werden, bevor Nahrungsergänzungsmittel eingenommen werden."
          },
          {
            id: "m3",
            question: "Warum ist zu viel Salz problematisch?",
            options: [
              "Es blockiert die Aufnahme von Vitaminen",
              "Natrium gelangt ins Blut und bindet Wasser",
              "Es stört den Prozess der Fettverbrennung",
              "Es entzieht dem Körper direkt Mineralstoffe"
            ],
            correctAnswer: 1,
            explanation: "Zu viel Natrium im Blut bindet Wasser und führt zu Wassereinlagerungen im Gewebe, was Erkrankungen wie Herzinfarkt begünstigen kann."
          },
          {
            id: "m4",
            question: "Wie kann man sich die empfohlene Höchstmenge Salz von 5 Gramm am Tag vorstellen?",
            options: [
              "Ein nicht zu voller Teelöffel",
              "Ein nicht zu voller Esslöffel",
              "Eine Hand voll",
              "Was auf einer Fingerspitze stehen bleibt"
            ],
            correctAnswer: 0,
            explanation: "5 Gramm Salz entsprechen etwa einem nicht zu vollen Teelöffel – die Empfehlung der Weltgesundheitsorganisation (WHO)."
          }
        ]
      },
      {
        lessonId: 6,
        questions: [
          {
            id: "u1",
            question: "Was kann das Problem an zuckerfreien Süßstoffen sein?",
            options: [
              "Sie enthalten mehr Kalorien als Zucker",
              "Sie erhöhen unmittelbar den Blutzuckerspiegel",
              "Sie verändern das Süßeverlangen langfristig",
              "Sie enthalten Transfette"
            ],
            correctAnswer: 2,
            explanation: "Zuckerfreie Süßstoffe können das Süßeverlangen langfristig verstärken, was den Umstieg auf eine weniger süße Ernährung erschwert."
          },
          {
            id: "u2",
            question: "Wie entstehen Transfettsäuren häufig industriell?",
            options: [
              "Durch Gefrieren von Zucker",
              "Durch Erhitzen pflanzlicher Proteine",
              "Durch Teilhärtung pflanzlicher Öle",
              "Durch Salzen von Fleisch zur Haltbarmachung"
            ],
            correctAnswer: 2,
            explanation: "Industrielle Transfettsäuren entstehen vor allem bei der Teilhärtung pflanzlicher Öle, einem Verfahren zur Verlängerung der Haltbarkeit."
          },
          {
            id: "u3",
            question: "Worin vor allem findet man heute Transfette?",
            options: [
              "In Bio-Produkten und Superfood",
              "In Backwaren, Süßigkeiten, Snacks und Fertigprodukten",
              "In unbehandeltem Olivenöl und Rapsöl",
              "Jedes Lebensmittel enthält einen kleinen Anteil"
            ],
            correctAnswer: 1,
            explanation: "Transfette stecken vor allem in industriell verarbeiteten Lebensmitteln wie Backwaren, Süßigkeiten, Snacks und Fertigprodukten."
          },
          {
            id: "u4",
            question: "Warum sind Proteinshakes letztlich unnötig?",
            options: [
              "Sie enthalten keine essentiellen Aminosäuren",
              "Protein ist für den Muskelaufbau irrelevant",
              "Sportler:innen brauchen vor allem Kohlenhydrate",
              "Eine ausgewogene Ernährung deckt den Bedarf meist vollständig"
            ],
            correctAnswer: 3,
            explanation: "Wer sich ausgewogen ernährt, nimmt in der Regel genug Protein über natürliche Lebensmittel auf – Proteinshakes sind für die meisten Menschen überflüssig."
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
