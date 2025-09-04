import { AnimationTypes } from "../types/enum.type";
import type { WidgetValues } from "../types/headline-widget.type";

// animations
export const animations = {
  "fade-in": `
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}`,

  "slide-up": `
@keyframes slide-up {
  from { transform: translateY(30px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}`,

  bounce: `
@keyframes bounce {
  0% { transform: scale(0.3); opacity: 0; }
  50% { transform: scale(1.05); }
  70% { transform: scale(0.9); }
  100% { transform: scale(1); opacity: 1; }
}`,

  scale: `
@keyframes scale {
  from { transform: scale(0.5); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}`,

  typewriter: `
@keyframes typewriter {
  from { width: 0; }
  to { width: 100%; }
}`,
};

// get text style
export const getTextStyle = (values: WidgetValues) => {
  const {
    animationType,
    fontFamily,
    fontSize,
    fontWeight,
    gradientDir,
    gradientFrom,
    gradientTo,
    isGradient,
    letterSpacing,
    lineHeight,
    textGlow,
    textShadow,
  } = values;

  const direction = gradientDir?.replace("_", " ");
  let style = `
.headline {
  font-size: ${fontSize}px;
  font-family: '${fontFamily}', sans-serif;
  font-weight: ${fontWeight};
  letter-spacing: ${letterSpacing}px;
  line-height: ${lineHeight}; ${
    isGradient
      ? `
  background: linear-gradient(${direction}, ${gradientFrom}, ${gradientTo});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;`
      : ""
  }
  ${textShadow ? `text-shadow: 2px 2px 4px rgba(0,0,0,0.3);` : ""}
  ${textGlow ? `filter: drop-shadow(0 0 20px ${gradientFrom});` : ""}
  ${
    animationType
      ? animationType === AnimationTypes.TYPEWRITER
        ? `
  white-space: nowrap;
  overflow: hidden;
  animation: typewriter 1s ease;
  border-right: 3px solid;
        `
        : `animation: ${animationType} 0.3s ease;`
      : ""
  }
}`;

  // add animation
  if (animationType) {
    style += `
${animations[animationType]}
      `;
  }

  return style.replace(/\n\s*\n\s*\n/g, "\n").trim();
};

// get headline widget code
export const codePreview = (values: WidgetValues) => {
  const style = getTextStyle(values);

  return `                  
/** HTML */
<h1 class="headline">${values.text}</h1>

/** CSS */
${style}
`;
};

// copy preview code
export const copyCode = (value: string) => {
  window.navigator.clipboard.writeText(value);
  alert("Copied to clipboard!");
};
