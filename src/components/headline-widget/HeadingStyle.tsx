import { GradientDirection } from "../../types/enum.type";
import type { WidgetValues } from "../../types/headline-widget.type";

// HeadingStyle component props types
type HeadingStyleProps = {
  value: WidgetValues;
  onChange: (name: keyof WidgetValues, value: string | boolean) => void;
};

/**
 * Headline widget style inputs
 * @param HeadingStyleProps
 * @returns
 */
export default function HeadingStyle({ value, onChange }: HeadingStyleProps) {
  // value destructuring
  const { isGradient, gradientDir, gradientFrom, gradientTo } = value;

  // gradient direction list
  const gradientDirections = [
    { value: GradientDirection.TO_R, label: "→", name: "Left to Right" },
    { value: GradientDirection.TO_L, label: "←", name: "Right to Left" },
    { value: GradientDirection.TO_B, label: "↓", name: "Top to Bottom" },
    { value: GradientDirection.TO_T, label: "↑", name: "Bottom to Top" },
    {
      value: GradientDirection.TO_BR,
      label: "↘",
      name: "Top-Left to Bottom-Right",
    },
    {
      value: GradientDirection.TO_BL,
      label: "↙",
      name: "Top-Right to Bottom-Left",
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      {/* gradient on off button  */}
      <div className="flex items-center justify-between">
        <label className="form-label">Gradient</label>
        <input
          type="checkbox"
          checked={isGradient}
          className="w-4 h-4 cursor-pointer"
          onChange={(e) => onChange("isGradient", e.target.checked)}
        />
      </div>

      {isGradient && (
        <>
          {/* gradient direction */}
          <div className="form-item">
            <label>Gradient Direction</label>
            <div className="grid grid-cols-3 gap-2">
              {gradientDirections.map((dir) => (
                <button
                  key={dir.value}
                  onClick={() => onChange("gradientDir", dir.value)}
                  className={`p-3 text-center cursor-pointer border rounded-lg transition-colors ${
                    gradientDir === dir.value
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <div className="text-lg font-bold">{dir.label}</div>
                  <div className="text-xs text-gray-500">{dir.name}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* gradient from color */}
            <div className="flex items-center gap-2">
              <label className="form-label">From Color</label>
              <input
                type="color"
                value={gradientFrom}
                onChange={(e) => onChange("gradientFrom", e.target.value)}
                className="w-12 h-7 rounded border border-gray-300 cursor-pointer"
              />
            </div>

            {/* gradient to color */}
            <div className="flex items-center gap-2">
              <label className="form-label">To Color</label>
              <input
                type="color"
                value={gradientTo}
                onChange={(e) => onChange("gradientTo", e.target.value)}
                className="w-12 h-7 rounded border border-gray-300 cursor-pointer"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
