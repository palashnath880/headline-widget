import type { Inputs } from "./HeadlineWIdget";

type HeadlineTextProps = {
  value: Inputs;
  onChange: (name: keyof Inputs, value: string) => void;
};

export default function HeadlineText({ value, onChange }: HeadlineTextProps) {
  // props destructuring
  const { fontSize, fontWeight, letterSpacing, lineHeight, text, fontFamily } =
    value;

  // fonts list
  const fontOptions = [
    "Inter",
    "Poppins",
    "Roboto",
    "Open Sans",
    "Montserrat",
    "Playfair Display",
    "Oswald",
    "Raleway",
    "Lato",
    "Source Sans Pro",
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* headline field */}
      <div className="form-item">
        <label>Headline Text</label>
        <textarea
          rows={2}
          value={text}
          placeholder="Enter your headline..."
          onChange={(e) => onChange("text", e.target.value)}
        />
      </div>

      {/* font family */}
      <div className="form-item">
        <label>Font Family</label>
        <select
          onChange={(e) => onChange("fontFamily", e.target.value)}
          value={fontFamily}
        >
          {fontOptions.map((font) => (
            <option key={font} value={font}>
              {font}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* font size */}
        <div className="form-item">
          <label>Font Size</label>
          <input
            type="range"
            min="16"
            max="120"
            onChange={(e) => onChange("fontSize", e.target.value)}
            value={fontSize}
          />
          <span>{fontSize}px</span>
        </div>

        {/* font weight */}
        <div className="form-item">
          <label>Font Weight</label>
          <select
            onChange={(e) => onChange("fontWeight", e.target.value)}
            value={fontWeight}
          >
            <option value={300}>Light</option>
            <option value={400}>Normal</option>
            <option value={500}>Medium</option>
            <option value={600}>Semi Bold</option>
            <option value={700}>Bold</option>
            <option value={800}>Extra Bold</option>
            <option value={900}>Black</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* letter spacing input */}
        <div className="form-item">
          <label>Letter Spacing</label>
          <input
            type="range"
            min="-2"
            max="10"
            onChange={(e) => onChange("letterSpacing", e.target.value)}
            value={letterSpacing}
          />
          <span>{letterSpacing}px</span>
        </div>

        {/* line height input */}
        <div className="form-item">
          <label>Line Height</label>
          <input
            type="range"
            min="0.8"
            max="2"
            step="0.1"
            onChange={(e) => onChange("lineHeight", e.target.value)}
            value={lineHeight}
          />
          <span>{lineHeight}</span>
        </div>
      </div>
    </div>
  );
}
