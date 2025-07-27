import { api } from "@/convex/_generated/api";
import { colors, shadow, spacing, typography } from "@/theme";
import { useMutation } from "convex/react";
import Storage from "expo-sqlite/kv-store";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface GameColors {
  name: string;
  color: string;
}

const TIMER_DURATION = 10;
const GAME_COLORS: GameColors[] = [
  { name: "RED", color: "#FF4444" },
  { name: "BLUE", color: "#4444FF" },
  { name: "GREEN", color: "#44FF44" },
  { name: "YELLOW", color: "#FFFF44" },
];

export default function ColorGameScreen() {
  const [score, setScore] = useState(0);
  const [targetColor, setTargetColor] = useState("RED");
  const [gameStarted, setGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [gameStartTime, setGameStartTime] = useState<number>(0);

  const updateUserStats = useMutation(api.userStats.updateUserStats);
  const addGameSession = useMutation(api.userStats.addGameSession);

  // Generate a funny username
  const generateFunnyUsername = () => {
    const adjectives = [
      "Speedy",
      "Dizzy",
      "Bouncy",
      "Giggly",
      "Wacky",
      "Silly",
      "Crazy",
      "Funky",
      "Zany",
      "Quirky",
      "Peppy",
      "Snappy",
      "Zippy",
      "Bubbly",
      "Jolly",
      "Goofy",
    ];
    const nouns = [
      "Banana",
      "Pickle",
      "Noodle",
      "Waffle",
      "Muffin",
      "Taco",
      "Burrito",
      "Donut",
      "Pancake",
      "Cookie",
      "Pretzel",
      "Bagel",
      "Cupcake",
      "Sandwich",
      "Pizza",
      "Cheese",
    ];
    const numbers = Math.floor(Math.random() * 999) + 1;

    const randomAdjective =
      adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

    return `${randomAdjective}${randomNoun}${numbers}`;
  };

  // Get or create username
  const getUsername = () => {
    let username = Storage.getItemSync("username") as string;
    if (!username) {
      username = generateFunnyUsername();
      Storage.setItemSync("username", username);
    }
    return username;
  };

  // Handle game completion and send data to database
  const handleGameCompletion = async () => {
    const userId = Storage.getItemSync("user_id") as string;

    if (!userId) {
      console.log("No userId found, skipping database update");
      return;
    }

    const username = getUsername();
    const gameEndTime = Date.now();
    const totalGameTime = gameEndTime - gameStartTime;
    const averageResponseTime =
      totalQuestions > 0 ? totalGameTime / totalQuestions : 0;

    try {
      // Update user stats
      await updateUserStats({
        userId,
        username,
        responseTime: averageResponseTime,
        score,
        correctAnswers,
        totalQuestions,
      });

      // Add game session
      await addGameSession({
        userId,
        sessionId: `${userId}-${Date.now()}`,
        score,
        responseTime: averageResponseTime,
        correctAnswers,
        totalQuestions,
        gameMode: "color-tap",
      });

      console.log("Game data saved successfully!");
    } catch (error) {
      console.error("Failed to save game data:", error);
    }
  };

  // Generate random target color
  const generateTargetColor = () => {
    const randomIndex = Math.floor(Math.random() * GAME_COLORS.length);
    setTargetColor(GAME_COLORS[randomIndex].name);
  };

  // Handle color circle tap
  const handleColorTap = (colorName: string) => {
    if (!gameStarted) return;

    setTotalQuestions((prev) => prev + 1);

    if (colorName === targetColor) {
      setScore(score + 1);
      setCorrectAnswers((prev) => prev + 1);
      generateTargetColor();
    } else {
      // Wrong color - just generate new target
      generateTargetColor();
    }
  };

  // Timer effect
  useEffect(() => {
    let interval: number;

    if (gameStarted && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setGameStarted(false);
            handleGameCompletion();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [gameStarted, timeLeft]);

  // Start game
  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setCorrectAnswers(0);
    setTotalQuestions(0);
    setTimeLeft(TIMER_DURATION);
    setGameStartTime(Date.now());
    generateTargetColor();
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, typography.title1]}>Tap the Color</Text>
          <Text style={[styles.subtitle, typography.body]}>Score: {score}</Text>
          {gameStarted && (
            <Text style={[styles.timer, typography.body]}>
              Time: {timeLeft}s
            </Text>
          )}
        </View>

        {/* Game Area */}
        <View style={styles.gameArea}>
          {!gameStarted ? (
            <View style={styles.startScreen}>
              <Text style={[styles.instructions, typography.title2]}>
                Tap the circle that matches the color name!
              </Text>
              <TouchableOpacity style={styles.startButton} onPress={startGame}>
                <Text style={[styles.startButtonText, typography.title2]}>
                  Start Game
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              {/* Target Color Display */}
              <View style={styles.targetContainer}>
                <Text style={[styles.targetLabel, typography.body]}>Tap:</Text>
                <Text style={[styles.targetColor, typography.title1]}>
                  {targetColor}
                </Text>
              </View>

              {/* Color Circles */}
              <View style={styles.circlesContainer}>
                {GAME_COLORS.map((gameColor) => (
                  <TouchableOpacity
                    key={gameColor.name}
                    style={[
                      styles.colorCircle,
                      { backgroundColor: gameColor.color },
                    ]}
                    onPress={() => handleColorTap(gameColor.name)}
                    activeOpacity={0.8}
                  />
                ))}
              </View>
            </>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral.background,
  },
  header: {
    padding: spacing.lg,
    paddingTop: spacing.xxl + spacing.md,
    backgroundColor: colors.primary.main,
    alignItems: "center",
  },
  title: {
    color: colors.neutral.white,
    marginBottom: spacing.sm,
    ...typography.title1,
  },
  subtitle: {
    color: colors.neutral.white,
    marginBottom: spacing.xs,
    ...typography.body,
  },
  timer: {
    color: colors.neutral.white,
    ...typography.headline,
  },
  gameArea: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: "center",
    alignItems: "center",
  },
  startScreen: {
    alignItems: "center",
    justifyContent: "center",
  },
  instructions: {
    textAlign: "center",
    marginBottom: spacing.xl,
    color: colors.neutral.black,
    paddingHorizontal: spacing.md,
    ...typography.title2,
  },
  startButton: {
    backgroundColor: colors.primary.main,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: spacing.lg + spacing.xs,
    ...shadow.regular,
  },
  startButtonText: {
    color: colors.neutral.white,
    ...typography.title2,
  },
  targetContainer: {
    alignItems: "center",
    marginBottom: spacing.xxl - spacing.sm,
    backgroundColor: colors.neutral.white,
    padding: spacing.md + spacing.xs,
    borderRadius: spacing.md - spacing.xxs,
    ...shadow.thin,
  },
  targetLabel: {
    color: colors.system.gray,
    marginBottom: spacing.sm,
    ...typography.body,
  },
  targetColor: {
    color: colors.primary.main,
    ...typography.largeTitle,
  },
  circlesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: spacing.md + spacing.xs,
  },
  colorCircle: {
    width: spacing.xxl + spacing.xxl + spacing.xl,
    height: spacing.xxl + spacing.xxl + spacing.xl,
    borderRadius: spacing.xxl + spacing.lg,
    ...shadow.regular,
    borderWidth: spacing.xxs + spacing.xxs,
    borderColor: colors.neutral.white,
  },
});
