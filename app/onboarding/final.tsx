import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { useSuperwall } from "@/hooks/useSuperwall";
import { SUPERWALL_TRIGGERS } from "@/superwall/config";
import { colors, spacing, borderRadius } from "@/theme";
import type { MaterialCommunityIcons as IconType } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FinalScreen() {
  const { showPaywall } = useSuperwall();
  const { setIsOnboarded } = useOnboarding();

  const handleGetStarted = async () => {
    try {
      await showPaywall(SUPERWALL_TRIGGERS.ONBOARDING);
      setIsOnboarded(true);
    } catch (error) {
      console.error("Failed to show paywall:", error);
    }
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
            <View style={styles.celebrationContainer}>
              <MaterialCommunityIcons
                name="trophy"
                size={64}
                color={colors.semantic.yellow}
              />
              <View style={styles.sparkles}>
                <MaterialCommunityIcons
                  name="star-four-points"
                  size={20}
                  color={colors.semantic.purple}
                  style={styles.sparkle1}
                />
                <MaterialCommunityIcons
                  name="star-four-points"
                  size={16}
                  color={colors.semantic.blue}
                  style={styles.sparkle2}
                />
                <MaterialCommunityIcons
                  name="star-four-points"
                  size={18}
                  color={colors.semantic.pink}
                  style={styles.sparkle3}
                />
              </View>
            </View>
            
            <ThemedText type="title" style={styles.title}>
              You're Ready to Play!
            </ThemedText>
            <ThemedText style={styles.subtitle}>
              Your color vision training journey starts now. Challenge yourself
              and discover how sharp your color perception can become!
            </ThemedText>
          </View>

          {/* Features Preview */}
          <View style={styles.featuresPreview}>
            <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
              What's waiting for you:
            </ThemedText>
            
            <View style={styles.featuresList}>
              <FeaturePreview 
                icon="gamepad-variant" 
                title="Adaptive Challenges"
                description="Games that evolve with your skills"
              />
              <FeaturePreview 
                icon="chart-line" 
                title="Progress Tracking"
                description="See your improvement over time"
              />
              <FeaturePreview 
                icon="palette-swatch" 
                title="Color Mastery"
                description="Train your eye for perfect color perception"
              />
            </View>
          </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
            <MaterialCommunityIcons
              name="play"
              size={20}
              color="white"
              style={styles.buttonIcon}
            />
            <ThemedText type="defaultSemiBold" style={styles.buttonText}>
              Start Playing Now!
            </ThemedText>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}

function FeaturePreview({
  icon,
  title,
  description,
}: {
  icon: keyof typeof IconType.glyphMap;
  title: string;
  description: string;
}) {
  return (
    <View style={styles.featureItem}>
      <View style={styles.featureIcon}>
        <MaterialCommunityIcons name={icon} size={24} color={colors.semantic.purple} />
      </View>
      <View style={styles.featureContent}>
        <ThemedText type="defaultSemiBold" style={styles.featureTitle}>
          {title}
        </ThemedText>
        <ThemedText style={styles.featureDescription}>
          {description}
        </ThemedText>
      </View>
    </View>
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
  celebrationContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.lg,
  },
  sparkles: {
    position: "absolute",
    width: 120,
    height: 120,
  },
  sparkle1: {
    position: "absolute",
    top: 10,
    right: 15,
  },
  sparkle2: {
    position: "absolute",
    bottom: 20,
    left: 10,
  },
  sparkle3: {
    position: "absolute",
    top: 25,
    left: 20,
  },
  title: {
    fontSize: 32,
    textAlign: "center",
    marginBottom: spacing.md,
    color: colors.semantic.purple,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    opacity: 0.7,
    paddingHorizontal: spacing.md,
  },
  
  // Features Preview Section
  featuresPreview: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: spacing.lg,
    textAlign: "center",
    color: colors.neutral.gray900,
  },
  featuresList: {
    gap: spacing.md,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    backgroundColor: `${colors.semantic.purple}08`,
    padding: spacing.md,
    borderRadius: borderRadius.md,
  },
  featureIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: `${colors.semantic.purple}20`,
    alignItems: "center",
    justifyContent: "center",
  },
  featureContent: {
    flex: 1,
    gap: 4,
  },
  featureTitle: {
    fontSize: 16,
    color: colors.neutral.gray900,
  },
  featureDescription: {
    fontSize: 14,
    opacity: 0.7,
    lineHeight: 20,
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
    flexDirection: "row",
    justifyContent: "center",
    gap: spacing.sm,
  },
  buttonIcon: {
    marginRight: spacing.xs,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});
