import type { AnimationTypes, GradientDirection } from "./enum.type";

// headline widget values types
export type WidgetValues = {
  text: string;
  fontSize: number;
  fontFamily: string;
  fontWeight: number;
  lineHeight: number;
  letterSpacing: number;
  isGradient: boolean;
  gradientDir: GradientDirection;
  gradientFrom: string;
  gradientTo: string;
  animationType: AnimationTypes;
  textShadow: boolean;
  textGlow: boolean;
};
