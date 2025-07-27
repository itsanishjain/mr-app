import Superwall, {
  SubscriptionStatus,
} from "@superwall/react-native-superwall";
import { Platform } from "react-native";
import { createSuperwallConfig } from "./config";

class SuperwallService {
  private static instance: SuperwallService;
  private initialized = false;

  private constructor() {}

  static getInstance(): SuperwallService {
    if (!SuperwallService.instance) {
      SuperwallService.instance = new SuperwallService();
    }
    return SuperwallService.instance;
  }

  initialize() {
    if (this.initialized) return;

    const apiKey = Platform.select({
      ios: process.env.EXPO_PUBLIC_SUPERWALL_API_KEY_IOS,
      android: process.env.EXPO_PUBLIC_SUPERWALL_API_KEY_ANDROID,
      default: undefined,
    });

    if (!apiKey) {
      console.warn("[Superwall] No API key found for platform:", Platform.OS);
      return;
    }

    console.log("[Superwall] Initializing with API key:", apiKey);

    try {
      const options = createSuperwallConfig();
      Superwall.configure({ apiKey, options });
      this.initialized = true;
      console.log("[Superwall] Initialized successfully");
    } catch (error) {
      console.error("[Superwall] Initialization failed:", error);
    }
  }

  async presentPaywall(triggerId: string): Promise<void> {
    try {
      console.log("[Superwall] Presenting paywall for trigger:", triggerId);
      await Superwall.shared.register({ placement: triggerId });
    } catch (error) {
      console.error("[Superwall] Failed to present paywall:", error);
      throw error;
    }
  }

  async getSubscriptionStatus(): Promise<SubscriptionStatus> {
    try {
      const status = await Superwall.shared.getSubscriptionStatus();
      console.log("[Superwall] Subscription status:", status);
      return status;
    } catch (error) {
      console.error("[Superwall] Failed to get subscription status:", error);
      throw error;
    }
  }
}

export const superwallService = SuperwallService.getInstance();
