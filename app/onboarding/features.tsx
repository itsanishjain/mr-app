import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { colors } from "@/theme";
import type { MaterialCommunityIcons as IconType } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FeaturesScreen() {
  const router = useRouter();

  const handleNext = () => {
    router.push("/onboarding/final");
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <MaterialCommunityIcons
              name="palette"
              size={48}
              color={colors.semantic.purple}
            />
            <ThemedText type="title" style={styles.title}>
              Color Game Ready
            </ThemedText>
          </View>

          <View style={styles.features}>
            <Feature
              icon="palette-swatch"
              title="Color Challenges"
              description="Test your color perception with fun and engaging puzzles"
            />
            <Feature
              icon="trophy-variant"
              title="Score Tracking"
              description="Track your progress and compare with friends"
            />
            <Feature
              icon="palette-advanced"
              title="Color Spectrum"
              description="Experience the full spectrum of colors in various game modes"
            />
          </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <ThemedText type="defaultSemiBold" style={styles.buttonText}>
              Let's Play!
            </ThemedText>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}

function Feature({
  icon,
  title,
  description,
}: {
  icon: keyof typeof IconType.glyphMap;
  title: string;
  description: string;
}) {
  return (
    <View style={styles.feature}>
      <View style={styles.featureHeader}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name={icon}
            size={24}
            color={colors.semantic.purple}
          />
        </View>
        <View style={styles.featureText}>
          <ThemedText type="defaultSemiBold" style={styles.featureTitle}>
            {title}
          </ThemedText>
          <ThemedText style={styles.featureDescription}>
            {description}
          </ThemedText>
        </View>
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
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
    gap: 24,
  },
  header: {
    alignItems: "center",
    gap: 16,
  },
  title: {
    fontSize: 32,
    textAlign: "center",
  },
  features: {
    gap: 16,
  },
  feature: {
    backgroundColor: `${colors.semantic.purple}20`,
    padding: 16,
    borderRadius: 12,
  },
  featureHeader: {
    flexDirection: "row",
    gap: 16,
    alignItems: "flex-start",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${colors.semantic.purple}30`,
    alignItems: "center",
    justifyContent: "center",
  },
  featureText: {
    flex: 1,
    gap: 4,
  },
  featureTitle: {
    fontSize: 17,
  },
  featureDescription: {
    fontSize: 15,
    opacity: 0.7,
    lineHeight: 20,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  button: {
    backgroundColor: colors.semantic.purple,
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});
