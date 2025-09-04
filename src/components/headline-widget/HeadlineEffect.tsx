import { AnimationTypes } from "../../types/enum.type";
import type { WidgetValues } from "../../types/headline-widget.type";

// HeadlineEffect component props types
type HeadlineEffectProps = {
  value: WidgetValues;
  onChange: (name: keyof WidgetValues, value: string | boolean) => void;
};

/**
 * Headline widget effect inputs props
 * @param HeadlineEffectProps
 * @returns
 */
export default function HeadlineEffect({
  onChange,
  value,
}: HeadlineEffectProps) {
  // props destructuring
  const { animationType, textShadow, textGlow } = value;

  // animation list
  const animationTypes = [
    { value: AnimationTypes.FADE_IN, label: "Fade In" },
    { value: AnimationTypes.SLIDE_UP, label: "Slide Up" },
    { value: AnimationTypes.BOUNCE, label: "Bounce" },
    { value: AnimationTypes.SCALE, label: "Scale" },
    { value: AnimationTypes.TYPEWRITER, label: "Typewriter" },
  ];

  return (
    <div className="flex flex-col gap-5">
      {/* animation input */}
      <div className="form-item">
        <label>Animation</label>
        <select
          value={animationType}
          onChange={(e) => onChange("animationType", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          {animationTypes.map((anim) => (
            <option key={anim.value} value={anim.value}>
              {anim.label}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-4">
        {/* shadow input */}
        <div className="flex items-center justify-between">
          <label className="form-label">Text Shadow</label>
          <input
            type="checkbox"
            checked={textShadow}
            className="w-4 h-4 cursor-pointer"
            onChange={(e) => onChange("textShadow", e.target.checked)}
          />
        </div>

        {/* glow effect */}
        <div className="flex items-center justify-between">
          <label className="form-label">Glow Effect</label>
          <input
            type="checkbox"
            checked={textGlow}
            className="w-4 h-4 cursor-pointer"
            onChange={(e) => onChange("textGlow", e.target.checked)}
          />
        </div>
      </div>
    </div>
  );
}
