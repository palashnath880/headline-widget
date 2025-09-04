import { useState } from "react";
import { FaPalette } from "react-icons/fa";
import { IoSparklesSharp } from "react-icons/io5";
import { LuType } from "react-icons/lu";
import { motion } from "motion/react";
import {
  AnimationTypes,
  GradientDirection,
  TabIds,
} from "../../types/enum.type";
import HeadlineText from "./HeadlineText";
import HeadingStyle from "./HeadingStyle";
import HeadlineEffect from "./HeadlineEffect";
import { BiCopy, BiDownload } from "react-icons/bi";
import { FiRotateCcw } from "react-icons/fi";
import HeadlinePreview from "./HeadlinePreview";
import type { WidgetValues } from "../../types/headline-widget.type";

// default inputs
const defaultInputs: WidgetValues = {
  text: "Hello World!",
  fontFamily: "Inter",
  fontWeight: 700,
  fontSize: 40,
  letterSpacing: 0,
  lineHeight: 1.4,
  gradientFrom: "#fbc2eb",
  gradientDir: GradientDirection.TO_R,
  gradientTo: "#a6c1ee",
  isGradient: false,
  textGlow: false,
  textShadow: false,
  animationType: AnimationTypes.FADE_IN,
};

// animations
const animations = {
  "fade-in": `@keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }`,
  "slide-up": `@keyframes slide-up {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }`,
  bounce: `@keyframes bounce {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); opacity: 1; }
        }`,
  scale: `@keyframes scale {
          from { transform: scale(0.5); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }`,
  typewriter: `@keyframes typewriter {
          from { width: 0; }
          to { width: 100%; }
        }`,
};

/**
 * Headline Widget Component
 * @returns {React.JSX}
 */
export default function HeadlineWidget() {
  // tab active state
  const [activeTab, setActiveTab] = useState<TabIds>(TabIds.Text);
  // inputs
  const [inputs, setInputs] = useState<WidgetValues>(defaultInputs);

  // handle input function
  const handleInput = (
    name: keyof WidgetValues,
    value: string | number | boolean
  ) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  // tabs list
  const tabs = [
    {
      id: TabIds.Text,
      icon: LuType,
      label: "Text",
      content: <HeadlineText onChange={handleInput} value={inputs} />,
    },
    {
      id: TabIds.Style,
      icon: FaPalette,
      label: "Style",
      content: <HeadingStyle onChange={handleInput} value={inputs} />,
    },
    {
      id: TabIds.Effects,
      icon: IoSparklesSharp,
      label: "Effects",
      content: <HeadlineEffect onChange={handleInput} value={inputs} />,
    },
  ];

  // export json
  const exportJSON = () => {
    const dataStr = JSON.stringify(inputs, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    const exportFileDefaultName = "headline-settings.json";
    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  // action buttons
  const actionButtons = [
    {
      label: "Copy CSS",
      Icon: BiCopy,
      action: () => {},
      bg: "bg-purple-600",
    },
    {
      label: "Reset",
      Icon: FiRotateCcw,
      action: () => setInputs(defaultInputs),
      bg: "bg-gray-600",
    },
    {
      label: "Export JSON",
      Icon: BiDownload,
      action: exportJSON,
      bg: "bg-green-600",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8 py-10">
        <h1 className="text-4xl font-bold text-gray-700 mb-2">
          Advanced Headline Widget
        </h1>
        <p className="text-gray-600">
          Create stunning, customizable headlines with modern effects
        </p>
      </div>

      {/* animations style */}
      <style>{Object.values(animations).join(" ")}</style>

      {/* headline widget content */}
      <div className="grid lg:grid-cols-5 gap-6">
        {/* Controls Panel */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white shadow-lg border border-gray-100 overflow-hidden">
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200 relative">
              {/* animated border */}
              <motion.div
                className="absolute top-0 left-0 bg-blue-50 h-full w-1/3 border-b border-blue-500"
                initial={false}
                animate={{
                  left: `${(100 / tabs.length) * activeTab}%`,
                  width: `${100 / tabs.length}%`,
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                }}
              />

              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`z-10 flex items-center justify-center gap-2 p-4 font-medium transition-all cursor-pointer flex-1/3 ${
                    activeTab === tab.id
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  <tab.icon size={18} />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* tabs content */}
            <motion.div
              key={activeTab}
              className="px-4 py-8 min-h-[300px]"
              initial={{ opacity: 0, translateY: 100 }}
              animate={{ opacity: 1, translateY: 0 }}
              exit={{ opacity: 0, translateY: 100 }}
              transition={{ duration: 0.3 }}
            >
              {tabs[activeTab].content}
            </motion.div>
          </div>

          {/* Action Buttons */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="grid grid-cols-2 gap-3">
              {actionButtons.map(({ action, Icon, label, bg }, index) => (
                <motion.button
                  key={index}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md cursor-pointer last:col-span-full justify-center text-white ${bg}`}
                  onClick={() => typeof action === "function" && action()}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon fontSize={16} />
                  {label}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Preview Area */}
        <HeadlinePreview {...inputs} />
      </div>
    </div>
  );
}
