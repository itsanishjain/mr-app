import { superwallService } from "@/superwall/service";
import { useEffect, useState } from "react";
import { Platform } from "react-native";

export function useSuperwall() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (Platform.OS === "web") {
      setIsLoading(false);
      return;
    }

    superwallService.initialize();
    checkSubscription();
  }, []);

  const checkSubscription = async () => {
    try {
      const status = await superwallService.getSubscriptionStatus();
      console.log("[Superwall] Hook subscription check:", { status });

      // Compare with the actual string value, not the type
      setIsSubscribed(status.status === "ACTIVE");
    } catch (error) {
      console.error("[Superwall] Hook subscription check failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const showPaywall = async (triggerId: string) => {
    if (isLoading || Platform.OS === "web") return;

    console.log("[Superwall] Hook showPaywall called for trigger:", triggerId);

    try {
      const bbb = await superwallService.presentPaywall(triggerId);
      console.log("[Superwall] Hook showPaywall called for trigger:", { bbb });
      // Refresh subscription status after paywall interaction
      await checkSubscription();
    } catch (error) {
      console.error("[Superwall] Hook failed to show paywall:", error);
    }
  };

  return {
    isSubscribed,
    isLoading,
    showPaywall,
    checkSubscription,
  };
}
