export const colors = {
  primary: {
    main: "#0A84FF", // Refined iOS blue
    light: "#5AC8FA",
    dark: "#0062CC",
  },
  secondary: {
    main: "#FF2D55", // iOS pink
    light: "#FF6482",
    dark: "#CC0029",
  },
  system: {
    gray: "#8E8E93",
    gray2: "#AEAEB2",
    gray3: "#C7C7CC",
    gray4: "#D1D1D6",
    gray5: "#E5E5EA",
    gray6: "#F2F2F7",
  },
  neutral: {
    white: "#FFFFFF",
    background: "#F5F5F7", // Apple light background
    black: "#000000",
    gray200: "#EEEEEE",
    gray300: "#DDDDDD",
    gray400: "#CCCCCC",
    gray500: "#AAAAAA",
    gray600: "#888888",
    gray900: "#333333",
  },
  semantic: {
    red: "#FF3B30", // iOS red
    orange: "#FF9500", // iOS orange
    yellow: "#FFCC00", // iOS yellow
    green: "#34C759", // iOS green
    teal: "#5AC8FA", // iOS teal
    blue: "#0A84FF", // Refined iOS blue
    indigo: "#5E5CE6", // Refined iOS indigo
    purple: "#BF5AF2", // Refined iOS purple
    pink: "#FF2D55", // iOS pink
    gray: "#8E8E93",
  },
  status: {
    success: "#34C759", // iOS green
    warning: "#FF9500", // iOS orange
    error: "#FF3B30", // iOS red
    info: "#0A84FF", // Refined iOS blue
  },
  dark: {
    elevated1: "rgba(28, 28, 30, 0.95)",
    elevated2: "rgba(44, 44, 46, 0.95)",
    elevated3: "rgba(58, 58, 60, 0.95)",
  },
};

export const typography = {
  largeTitle: {
    fontSize: 34,
    fontWeight: "700" as "700",
    lineHeight: 41,
    letterSpacing: 0.37,
  },
  title1: {
    fontSize: 28,
    fontWeight: "600" as "600",
    lineHeight: 34,
    letterSpacing: 0.36,
  },
  title2: {
    fontSize: 22,
    fontWeight: "600" as "600",
    lineHeight: 28,
    letterSpacing: 0.35,
  },
  title3: {
    fontSize: 20,
    fontWeight: "600" as "600",
    lineHeight: 25,
    letterSpacing: 0.38,
  },
  headline: {
    fontSize: 17,
    fontWeight: "600" as "600",
    lineHeight: 22,
    letterSpacing: -0.41,
  },
  body: {
    fontSize: 17,
    fontWeight: "400" as "400",
    lineHeight: 22,
    letterSpacing: -0.41,
  },
  callout: {
    fontSize: 16,
    fontWeight: "400" as "400",
    lineHeight: 21,
    letterSpacing: -0.32,
  },
  subheadline: {
    fontSize: 15,
    fontWeight: "400" as "400",
    lineHeight: 20,
    letterSpacing: -0.24,
  },
  footnote: {
    fontSize: 13,
    fontWeight: "400" as "400",
    lineHeight: 18,
    letterSpacing: -0.08,
  },
  caption1: {
    fontSize: 12,
    fontWeight: "400" as "400",
    lineHeight: 16,
    letterSpacing: 0,
  },
  caption2: {
    fontSize: 11,
    fontWeight: "400" as "400",
    lineHeight: 13,
    letterSpacing: 0.07,
  },
};

export const spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  // Additional spacings for more precise control
  "2xs": 6,
  "2sm": 12,
  "2md": 20,
  "2lg": 28,
  "2xl": 40,
  "3xl": 64,
};

export const shadow = {
  // Very subtle shadow for cards and surfaces
  ultraThin: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 0.05,
    shadowRadius: 0.5,
    elevation: 1,
  },
  // Subtle shadow for slightly elevated content
  thin: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  // Standard shadow for cards and buttons
  regular: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  // More prominent shadow for floating elements
  thick: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  // Strong shadow for modals and dialogs
  heavy: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 8,
  },
};

export const borderRadius = {
  xs: 6,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 28,
  round: 9999,
  // Special radius for different components
  button: 12,
  card: 16,
  modal: 12,
  input: 10,
};

export default {
  colors,
  typography,
  spacing,
  shadow,
  borderRadius,
};
