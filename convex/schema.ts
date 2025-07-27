import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

export default defineSchema({
  ...authTables,
  gameSessions: defineTable({
    correctAnswers: v.float64(),
    gameMode: v.string(),
    responseTime: v.float64(),
    score: v.float64(),
    sessionId: v.string(),
    timestamp: v.string(),
    totalQuestions: v.float64(),
    userId: v.string(),
  }),

  userStats: defineTable({
    averageScore: v.float64(),
    bestScore: v.float64(),
    currentStreak: v.float64(),
    lastPlayed: v.string(),
    longestStreak: v.float64(),
    responseTime: v.float64(),
    totalGames: v.float64(),
    userId: v.string(),
    username: v.string(),
  }),
});
