import { StyleSheet, View, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '@/theme';

export default function SolutionScreen() {
  const router = useRouter();

  const handleNext = () => {
    router.push('/onboarding/features');
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
            <MaterialCommunityIcons name="palette" size={48} color={colors.semantic.green} />
            <ThemedText type="title" style={styles.title}>
              Perfect Color Training
            </ThemedText>
          </View>

          <View style={styles.mainFeature}>
            <ThemedText type="defaultSemiBold" style={styles.mainTitle}>
              Train Your Color Vision
            </ThemedText>
            <ThemedText style={styles.mainDescription}>
              Progressive challenges that adapt to your skill level, helping you distinguish colors with confidence and precision.
            </ThemedText>
          </View>

          <View style={styles.benefits}>
            <View style={styles.benefit}>
              <MaterialCommunityIcons name="check-circle" size={24} color={colors.semantic.green} />
              <ThemedText style={styles.benefitText}>
                Adaptive difficulty that grows with your skills
              </ThemedText>
            </View>
            <View style={styles.benefit}>
              <MaterialCommunityIcons name="check-circle" size={24} color={colors.semantic.green} />
              <ThemedText style={styles.benefitText}>
                Beautiful, engaging interface that makes learning fun
              </ThemedText>
            </View>
            <View style={styles.benefit}>
              <MaterialCommunityIcons name="check-circle" size={24} color={colors.semantic.green} />
              <ThemedText style={styles.benefitText}>
                Track your progress and celebrate improvements
              </ThemedText>
            </View>
          </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <ThemedText type="defaultSemiBold" style={styles.buttonText}>
              See Features
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
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
    gap: 24,
  },
  header: {
    alignItems: 'center',
    gap: 16,
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
  },
  mainFeature: {
    backgroundColor: `${colors.semantic.green}20`,
    padding: 24,
    borderRadius: 20,
    gap: 8,
  },
  mainTitle: {
    fontSize: 22,
    textAlign: 'center',
  },
  mainDescription: {
    fontSize: 16,
    opacity: 0.7,
    textAlign: 'center',
    lineHeight: 22,
  },
  benefits: {
    gap: 12,
  },
  benefit: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: `${colors.semantic.green}10`,
    padding: 16,
    borderRadius: 12,
  },
  benefitText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 22,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  button: {
    backgroundColor: colors.semantic.purple,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
}); 