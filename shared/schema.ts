import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  currentLevel: integer("current_level").default(1),
  createdAt: timestamp("created_at").defaultNow(),
});

export const lessons = pgTable("lessons", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  videoUrl: text("video_url").notNull(),
  duration: integer("duration").notNull(), // in minutes
  thumbnailUrl: text("thumbnail_url").notNull(),
  order: integer("order").notNull(),
  isActive: boolean("is_active").default(true),
});

export const quizzes = pgTable("quizzes", {
  id: serial("id").primaryKey(),
  lessonId: integer("lesson_id").references(() => lessons.id).notNull(),
  questions: jsonb("questions").notNull(), // Array of question objects
});

export const userProgress = pgTable("user_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  lessonId: integer("lesson_id").references(() => lessons.id).notNull(),
  isCompleted: boolean("is_completed").default(false),
  quizScore: integer("quiz_score"),
  completedAt: timestamp("completed_at"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertLessonSchema = createInsertSchema(lessons).omit({
  id: true,
});

export const insertQuizSchema = createInsertSchema(quizzes).omit({
  id: true,
});

export const insertUserProgressSchema = createInsertSchema(userProgress).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Lesson = typeof lessons.$inferSelect;
export type Quiz = typeof quizzes.$inferSelect;
export type UserProgress = typeof userProgress.$inferSelect;
export type InsertLesson = z.infer<typeof insertLessonSchema>;
export type InsertQuiz = z.infer<typeof insertQuizSchema>;
export type InsertUserProgress = z.infer<typeof insertUserProgressSchema>;

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}
