import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

const submitQuizSchema = z.object({
  lessonId: z.number(),
  answers: z.array(z.number()),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all lessons
  app.get("/api/lessons", async (req, res) => {
    try {
      const lessons = await storage.getAllLessons();
      res.json(lessons);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch lessons" });
    }
  });

  // Get lesson by ID
  app.get("/api/lessons/:id", async (req, res) => {
    try {
      const lessonId = parseInt(req.params.id);
      const lesson = await storage.getLesson(lessonId);
      
      if (!lesson) {
        return res.status(404).json({ error: "Lesson not found" });
      }
      
      res.json(lesson);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch lesson" });
    }
  });

  // Get quiz by lesson ID
  app.get("/api/lessons/:id/quiz", async (req, res) => {
    try {
      const lessonId = parseInt(req.params.id);
      const quiz = await storage.getQuizByLessonId(lessonId);
      
      if (!quiz) {
        return res.status(404).json({ error: "Quiz not found" });
      }
      
      res.json(quiz);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch quiz" });
    }
  });

  // Submit quiz answers
  app.post("/api/lessons/:id/quiz/submit", async (req, res) => {
    try {
      const lessonId = parseInt(req.params.id);
      const { answers } = submitQuizSchema.parse(req.body);
      
      const quiz = await storage.getQuizByLessonId(lessonId);
      if (!quiz) {
        return res.status(404).json({ error: "Quiz not found" });
      }

      const questions = quiz.questions as any[];
      let score = 0;
      
      answers.forEach((answer, index) => {
        if (questions[index] && questions[index].correctAnswer === answer) {
          score++;
        }
      });

      const percentage = Math.round((score / questions.length) * 100);
      const passed = percentage >= 70; // 70% to pass

      // For demo purposes, we'll use userId = 1
      const userId = 1;
      
      // Check if progress already exists
      let progress = await storage.getUserProgressByLesson(userId, lessonId);
      
      if (progress) {
        // Update existing progress
        progress = await storage.updateUserProgress(progress.id, {
          quizScore: percentage,
          isCompleted: passed,
        });
      } else {
        // Create new progress
        progress = await storage.createUserProgress({
          userId,
          lessonId,
          quizScore: percentage,
          isCompleted: passed,
        });
      }

      res.json({
        score: percentage,
        passed,
        correctAnswers: score,
        totalQuestions: questions.length,
        progress
      });
    } catch (error) {
      console.error("Quiz submission error:", error);
      res.status(500).json({ error: "Failed to submit quiz" });
    }
  });

  // Get user progress
  app.get("/api/progress", async (req, res) => {
    try {
      // For demo purposes, we'll use userId = 1
      const userId = 1;
      const progress = await storage.getUserProgress(userId);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch progress" });
    }
  });

  // Mark lesson as completed (for video completion)
  app.post("/api/lessons/:id/complete", async (req, res) => {
    try {
      const lessonId = parseInt(req.params.id);
      const userId = 1; // Demo user ID
      
      let progress = await storage.getUserProgressByLesson(userId, lessonId);
      
      if (progress) {
        progress = await storage.updateUserProgress(progress.id, {
          isCompleted: true,
        });
      } else {
        progress = await storage.createUserProgress({
          userId,
          lessonId,
          isCompleted: true,
        });
      }
      
      res.json(progress);
    } catch (error) {
      res.status(500).json({ error: "Failed to mark lesson as completed" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
