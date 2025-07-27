import { StyleSheet, View, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors, spacing, borderRadius } from "@/theme";

export default function ProblemScreen() {
  const router = useRouter();

  const handleNext = () => {
    router.push("/onboarding/solution");
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero Section */}
          <View style={styles.hero}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons
                name="eye-off"
                size={56}
                color={colors.semantic.red}
              />
            </View>
            <ThemedText type="title" style={styles.title}>
              Color Vision Challenge
            </ThemedText>
            <ThemedText style={styles.subtitle}>
              Many people struggle to distinguish between similar colors, making
              color-based tasks difficult and frustrating.
            </ThemedText>
          </View>

          {/* Quote Section */}
          <View style={styles.quoteSection}>
            <View style={styles.quoteCard}>
              <View style={styles.quoteIcon}>
                <MaterialCommunityIcons
                  name="format-quote-open"
                  size={24}
                  color={colors.semantic.orange}
                />
              </View>
              <ThemedText style={styles.quoteText}>
                I can never tell if these two colors are the same or different.
                It's so frustrating when playing color games!
              </ThemedText>
            </View>
          </View>

          {/* Problems Section */}
          <View style={styles.problemsSection}>
            <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
              Common Challenges
            </ThemedText>
            
            <View style={styles.problemsList}>
              <View style={styles.problemItem}>
                <View style={styles.problemIcon}>
                  <MaterialCommunityIcons
                    name="close-circle"
                    size={20}
                    color={colors.semantic.red}
                  />
                </View>
                <ThemedText style={styles.problemText}>
                  Color games are too easy or impossibly hard
                </ThemedText>
              </View>
              
              <View style={styles.problemItem}>
                <View style={styles.problemIcon}>
                  <MaterialCommunityIcons
                    name="close-circle"
                    size={20}
                    color={colors.semantic.red}
                  />
                </View>
                <ThemedText style={styles.problemText}>
                  No way to track color perception improvement
                </ThemedText>
              </View>
              
              <View style={styles.problemItem}>
                <View style={styles.problemIcon}>
                  <MaterialCommunityIcons
                    name="close-circle"
                    size={20}
                    color={colors.semantic.red}
                  />
                </View>
                <ThemedText style={styles.problemText}>
                  Boring interfaces that don't engage users
                </ThemedText>
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <ThemedText type="defaultSemiBold" style={styles.buttonText}>
              See Our Solution
            </ThemedText>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.md,
  },
  
  // Hero Section
  hero: {
    alignItems: "center",
    marginBottom: spacing.xxl,
  },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: `${colors.semantic.red}15`,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: 28,
    textAlign: "center",
    marginBottom: spacing.md,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
    lineHeight: 24,
    textAlign: "center",
    paddingHorizontal: spacing.md,
  },
  
  // Quote Section
  quoteSection: {
    marginBottom: spacing.xxl,
  },
  quoteCard: {
    backgroundColor: `${colors.semantic.orange}08`,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    borderLeftWidth: 4,
    borderLeftColor: colors.semantic.orange,
  },
  quoteIcon: {
    marginBottom: spacing.sm,
  },
  quoteText: {
    fontSize: 16,
    fontStyle: "italic",
    lineHeight: 24,
    color: colors.neutral.gray600,
  },
  
  // Problems Section
  problemsSection: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: spacing.lg,
    color: colors.neutral.gray900,
  },
  problemsList: {
    gap: spacing.md,
  },
  problemItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.md,
    paddingVertical: spacing.sm,
  },
  problemIcon: {
    marginTop: 2,
  },
  problemText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
    color: colors.neutral.gray600,
  },
  
  // Button
  buttonContainer: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  button: {
    backgroundColor: colors.semantic.purple,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.md,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "600",
  },
});
