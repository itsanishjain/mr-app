import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { format } from "date-fns";
import Storage from "expo-sqlite/kv-store";
import React from "react";
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { BarChart, LineChart } from "react-native-chart-kit";

import { borderRadius, colors, spacing, typography } from "@/theme";

const screenWidth = Dimensions.get("window").width;

function StatCard({
  title,
  value,
  subtitle,
  color = "#007AFF",
}: {
  title: string;
  value: string | number;
  subtitle?: string;
  color?: string;
}) {
  return (
    <View style={styles.statCard}>
      <View style={styles.statHeader}>
        <Text style={styles.statTitle}>{title}</Text>
      </View>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      {subtitle && <Text style={styles.statSubtitle}>{subtitle}</Text>}
    </View>
  );
}

function LeaderboardRow({
  item,
  index,
}: {
  item: Doc<"userStats">;
  index: number;
}) {
  const getRankEmoji = (rank: number) => {
    switch (rank) {
      case 0:
        return "🥇";
      case 1:
        return "🥈";
      case 2:
        return "🥉";
      default:
        return `${rank + 1}`;
    }
  };

  const getRankStyle = (rank: number) => {
    if (rank < 3) {
      return [styles.rank, styles.medalRank];
    }
    return [styles.rank, styles.numberRank];
  };

  return (
    <View style={styles.leaderboardRow}>
      <View style={styles.rankContainer}>
        <Text style={getRankStyle(index)}>{getRankEmoji(index)}</Text>
      </View>
      <View style={styles.playerInfo}>
        <Text style={styles.playerName}>{item.username}</Text>
        <View style={styles.playerStatsContainer}>
          <View style={styles.statBadge}>
            <Text style={styles.statBadgeText}>
              {item.bestScore.toLocaleString()}
            </Text>
          </View>
          <View style={styles.statBadge}>
            <Text style={styles.statBadgeText}>
              {item.currentStreak} streak
            </Text>
          </View>
          <View style={styles.statBadge}>
            <Text style={styles.statBadgeText}>
              {item.responseTime.toFixed(1)}s
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default function ProfileScreen() {
  const userId = Storage.getItemSync("user_id") as string;
  console.log("User ID: ", userId);
  const userStats = useQuery(api.userStats.getUserStats, {
    userId: userId ? userId : "skip",
  });
  const leaderboard = useQuery(api.userStats.getLeaderboard, { limit: 10 });
  const recentSessions = useQuery(api.userStats.getRecentSessions, {
    userId: userId ? userId : "skip",
    limit: 7,
  });

  if (!userStats) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <View style={styles.loadingContent}>
          <View style={styles.loadingSpinner} />
          <Text style={styles.loadingText}>Loading your stats...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Prepare chart data with fallback values
  const responseTimeData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data:
          recentSessions && recentSessions.length > 0
            ? recentSessions
                .slice(0, 7)
                .reverse()
                .map((session) => session.responseTime || 1.2)
            : [1.2, 1.1, 0.9, 1.3, 1.0, 0.8, 1.2],
        color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
        strokeWidth: 3,
      },
    ],
  };

  const scoreData = {
    labels: [
      "Game 1",
      "Game 2",
      "Game 3",
      "Game 4",
      "Game 5",
      "Game 6",
      "Game 7",
    ],
    datasets: [
      {
        data:
          recentSessions && recentSessions.length > 0
            ? recentSessions
                .slice(0, 7)
                .reverse()
                .map((session) => session.score || 2000)
            : [1800, 2100, 1950, 2200, 2050, 2300, 2150],
      },
    ],
  };

  const chartConfig = {
    backgroundColor: "transparent",
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
    strokeWidth: 3,
    barPercentage: 0.7,
    useShadowColorFromDataset: false,
    decimalPlaces: 1,
    propsForLabels: {
      fontSize: 12,
      fontFamily: "System",
      fontWeight: "500",
    },
    propsForVerticalLabels: {
      fontSize: 10,
      fontFamily: "System",
      fontWeight: "400",
    },
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.profileSection}>
            <View style={styles.profileImageContainer}>
              <View style={styles.profileImage}>
                <Text style={styles.profileImageText}>
                  {(userStats.username || "P").charAt(0).toUpperCase()}
                </Text>
              </View>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.welcomeText}>Welcome back</Text>
              <Text style={styles.usernameText}>
                {userStats.username || "Player"}
              </Text>
            </View>
          </View>
        </View>

        {/* Quick Stats Grid */}
        <View style={styles.statsSection}>
          <View style={styles.statsGrid}>
            <StatCard
              title="Best Score"
              value={userStats.bestScore.toLocaleString()}
              subtitle="Personal record"
              color="#34C759"
            />
            <StatCard
              title="Current Streak"
              value={userStats.currentStreak}
              subtitle="games in a row"
              color="#FF9500"
            />
            <StatCard
              title="Avg Response"
              value={`${userStats.responseTime.toFixed(1)}s`}
              subtitle="reaction time"
              color="#007AFF"
            />
            <StatCard
              title="Total Games"
              value={userStats.totalGames}
              subtitle="played"
              color="#5856D6"
            />
          </View>
        </View>

        {/* Response Time Chart */}
        <View style={styles.chartSection}>
          <View style={styles.chartContainer}>
            <View style={styles.chartHeader}>
              <Text style={styles.chartTitle}>Response Time</Text>
              <Text style={styles.chartSubtitle}>Last 7 days</Text>
            </View>
            <View style={styles.chartWrapper}>
              <LineChart
                data={responseTimeData}
                width={screenWidth - 60}
                height={200}
                chartConfig={chartConfig}
                bezier
                style={styles.chart}
                withDots={true}
                withInnerLines={false}
                withOuterLines={false}
                withVerticalLines={false}
                withHorizontalLines={true}
                segments={4}
              />
            </View>
          </View>
        </View>

        {/* Score History Chart */}
        <View style={styles.chartSection}>
          <View style={styles.chartContainer}>
            <View style={styles.chartHeader}>
              <Text style={styles.chartTitle}>Recent Scores</Text>
              <Text style={styles.chartSubtitle}>Last 7 games</Text>
            </View>
            <View style={styles.chartWrapper}>
              <BarChart
                data={scoreData}
                width={screenWidth - 60}
                height={200}
                chartConfig={chartConfig}
                style={styles.chart}
                yAxisLabel=""
                yAxisSuffix=""
                withInnerLines={false}
                segments={4}
                showBarTops={false}
              />
            </View>
          </View>
        </View>

        {/* Additional Stats */}
        <View style={styles.additionalStatsSection}>
          <View style={styles.additionalStatsContainer}>
            <Text style={styles.sectionTitle}>Performance</Text>
            <View style={styles.statsList}>
              <View style={styles.statRow}>
                <View style={styles.statRowLeft}>
                  <View
                    style={[styles.statIcon, { backgroundColor: "#FF3B30" }]}
                  >
                    <Text style={styles.statIconText}>🔥</Text>
                  </View>
                  <Text style={styles.statLabel}>Longest Streak</Text>
                </View>
                <Text style={styles.statRowValue}>
                  {userStats.longestStreak} games
                </Text>
              </View>

              <View style={styles.statRow}>
                <View style={styles.statRowLeft}>
                  <View
                    style={[styles.statIcon, { backgroundColor: "#34C759" }]}
                  >
                    <Text style={styles.statIconText}>📊</Text>
                  </View>
                  <Text style={styles.statLabel}>Average Score</Text>
                </View>
                <Text style={styles.statRowValue}>
                  {userStats.averageScore.toLocaleString()} pts
                </Text>
              </View>

              <View style={styles.statRow}>
                <View style={styles.statRowLeft}>
                  <View
                    style={[styles.statIcon, { backgroundColor: "#007AFF" }]}
                  >
                    <Text style={styles.statIconText}>📅</Text>
                  </View>
                  <Text style={styles.statLabel}>Last Played</Text>
                </View>
                <Text style={styles.statRowValue}>
                  {format(userStats.lastPlayed, "dd MMMM yyyy")}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Leaderboard */}
        <View style={styles.leaderboardSection}>
          <View style={styles.leaderboardContainer}>
            <View style={styles.leaderboardHeader}>
              <Text style={styles.sectionTitle}>Leaderboard</Text>
              <Text style={styles.leaderboardSubtitle}>
                Top players this week
              </Text>
            </View>
            {leaderboard && leaderboard.length > 0 ? (
              <FlatList
                data={leaderboard}
                keyExtractor={(item) => item._id}
                renderItem={({ item, index }) => (
                  <LeaderboardRow item={item} index={index} />
                )}
                scrollEnabled={false}
                style={styles.leaderboardList}
                showsVerticalScrollIndicator={false}
              />
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>
                  Loading leaderboard...
                </Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral.background,
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: colors.neutral.background,
  },
  loadingContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingSpinner: {
    width: spacing.md,
    height: spacing.md,
    borderRadius: borderRadius.button,
    backgroundColor: colors.primary.main,
    marginBottom: 16,
    opacity: 0.8,
  },
  loadingText: {
    fontSize: typography.body.fontSize,
    color: colors.semantic.gray,
    fontWeight: "400",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImageContainer: {
    marginRight: spacing.md,
  },
  profileImage: {
    width: spacing.xxl,
    height: spacing.xxl,
    borderRadius: borderRadius.xxl,
    backgroundColor: colors.primary.main,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImageText: {
    fontSize: typography.title1.fontSize,
    fontWeight: typography.title1.fontWeight,
    color: colors.neutral.white,
  },
  profileInfo: {
    flex: 1,
  },
  welcomeText: {
    fontSize: typography.body.fontSize,
    color: colors.semantic.gray,
    fontWeight: typography.body.fontWeight,
    marginBottom: 2,
  },
  usernameText: {
    fontSize: typography.title1.fontSize,
    fontWeight: typography.title1.fontWeight,
    color: colors.neutral.black,
  },
  statsSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  statCard: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 16,
    width: "48%",
    marginBottom: 12,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  statHeader: {
    marginBottom: 8,
  },
  statTitle: {
    fontSize: 13,
    color: "#8E8E93",
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  statValue: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 4,
  },
  statSubtitle: {
    fontSize: 13,
    color: colors.semantic.gray,
    fontWeight: "400",
  },
  chartSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  chartContainer: {
    backgroundColor: colors.neutral.white,
    borderRadius: 16,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    overflow: "hidden",
  },
  chartHeader: {
    padding: 20,
    paddingBottom: 10,
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.neutral.black,
    marginBottom: 2,
  },
  chartSubtitle: {
    fontSize: 13,
    color: colors.neutral.black,
    fontWeight: "400",
  },
  chartWrapper: {
    alignItems: "center",
    paddingBottom: 10,
  },
  chart: {
    borderRadius: 0,
  },
  additionalStatsSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  additionalStatsContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#000000",
    marginBottom: 16,
  },
  statsList: {
    gap: 16,
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 4,
  },
  statRowLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  statIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  statIconText: {
    fontSize: 16,
  },
  statLabel: {
    fontSize: 17,
    color: "#000000",
    fontWeight: "400",
    flex: 1,
  },
  statRowValue: {
    fontSize: 17,
    color: "#8E8E93",
    fontWeight: "500",
  },
  leaderboardSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  leaderboardContainer: {
    backgroundColor: colors.neutral.white,
    borderRadius: borderRadius.xl,
    padding: 20,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  leaderboardHeader: {
    marginBottom: 20,
  },
  leaderboardSubtitle: {
    fontSize: 13,
    color: "#8E8E93",
    fontWeight: "400",
    marginTop: 2,
  },
  leaderboardList: {
    maxHeight: 400,
  },
  leaderboardRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E5E5EA",
  },
  rankContainer: {
    width: 40,
    alignItems: "center",
    marginRight: 16,
  },
  rank: {
    fontSize: 18,
    fontWeight: "600",
  },
  medalRank: {
    fontSize: 24,
  },
  numberRank: {
    color: "#8E8E93",
    fontSize: 18,
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    fontSize: 17,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 8,
  },
  playerStatsContainer: {
    flexDirection: "row",
    gap: 8,
  },
  statBadge: {
    backgroundColor: colors.neutral.gray200,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
  },
  statBadgeText: {
    fontSize: typography.caption1.fontSize,
    color: colors.semantic.gray,
    fontWeight: typography.caption1.fontWeight,
  },
  emptyState: {
    paddingVertical: 40,
    alignItems: "center",
  },
  emptyStateText: {
    fontSize: typography.body.fontSize,
    color: colors.semantic.gray,
    fontWeight: typography.body.fontWeight,
  },
  bottomPadding: {
    height: 20,
  },
});
