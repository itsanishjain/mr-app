import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getUserStats = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const userStats = await ctx.db
      .query("userStats")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();
    
    return userStats;
  },
});

export const getLeaderboard = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 10;
    
    const leaderboard = await ctx.db
      .query("userStats")
      .order("desc")
      .take(limit);
    
    // Sort by best score descending
    return leaderboard.sort((a, b) => b.bestScore - a.bestScore);
  },
});

export const updateUserStats = mutation({
  args: {
    userId: v.string(),
    username: v.string(),
    responseTime: v.number(),
    score: v.number(),
    correctAnswers: v.number(),
    totalQuestions: v.number(),
  },
  handler: async (ctx, args) => {
    const existingStats = await ctx.db
      .query("userStats")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();

    if (existingStats) {
      // Update existing stats
      const newBestScore = Math.max(existingStats.bestScore, args.score);
      const newTotalGames = existingStats.totalGames + 1;
      const newAverageScore = Math.round(
        ((existingStats.averageScore * existingStats.totalGames) + args.score) / newTotalGames
      );
      
      // Update streak logic
      const isCorrectGame = args.correctAnswers === args.totalQuestions;
      const newCurrentStreak = isCorrectGame ? existingStats.currentStreak + 1 : 0;
      const newLongestStreak = Math.max(existingStats.longestStreak, newCurrentStreak);

      await ctx.db.patch(existingStats._id, {
        responseTime: args.responseTime,
        bestScore: newBestScore,
        currentStreak: newCurrentStreak,
        longestStreak: newLongestStreak,
        totalGames: newTotalGames,
        averageScore: newAverageScore,
        lastPlayed: new Date().toISOString(),
      });
    } else {
      // Create new user stats
      await ctx.db.insert("userStats", {
        userId: args.userId,
        username: args.username,
        responseTime: args.responseTime,
        bestScore: args.score,
        currentStreak: args.correctAnswers === args.totalQuestions ? 1 : 0,
        longestStreak: args.correctAnswers === args.totalQuestions ? 1 : 0,
        totalGames: 1,
        averageScore: args.score,
        lastPlayed: new Date().toISOString(),
      });
    }
  },
});

export const getRecentSessions = query({
  args: { userId: v.string(), limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 5;
    
    const sessions = await ctx.db
      .query("gameSessions")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .order("desc")
      .take(limit);
    
    return sessions;
  },
});

export const addGameSession = mutation({
  args: {
    userId: v.string(),
    sessionId: v.string(),
    score: v.number(),
    responseTime: v.number(),
    correctAnswers: v.number(),
    totalQuestions: v.number(),
    gameMode: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("gameSessions", {
      userId: args.userId,
      sessionId: args.sessionId,
      score: args.score,
      responseTime: args.responseTime,
      correctAnswers: args.correctAnswers,
      totalQuestions: args.totalQuestions,
      timestamp: new Date().toISOString(),
      gameMode: args.gameMode,
    });
  },
});
