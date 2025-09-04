import React, { useState } from "react";
import type { WidgetValues } from "../../types/headline-widget.type";
import { BsEye } from "react-icons/bs";
import { FaCode } from "react-icons/fa6";
import { BiCopy } from "react-icons/bi";
import { motion } from "motion/react";
import { AnimationTypes } from "../../types/enum.type";

/**
 * Headline widget preview component
 * @param WidgetValues
 * @returns
 */
export default function HeadlinePreview(props: WidgetValues) {
  // props destructuring
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
    text,
    textGlow,
    textShadow,
  } = props;

  // tab state
  const [activeTab, setActiveTab] = useState<number>(0);

  // get text style
  const getTextStyle = () => {
    const baseStyle: React.HTMLAttributes<HTMLHeadingElement>["style"] = {
      fontSize: `${fontSize}px`,
      fontFamily: fontFamily,
      fontWeight: fontWeight,
      letterSpacing: `${letterSpacing}px`,
      lineHeight: lineHeight,
    };

    if (isGradient) {
      baseStyle.backgroundImage = `linear-gradient(${gradientDir?.replace(
        "_",
        " "
      )}, ${gradientFrom}, ${gradientTo})`;
      baseStyle.WebkitBackgroundClip = "text";
      baseStyle.WebkitTextFillColor = "transparent";
      baseStyle.backgroundClip = "text";
    }

    if (textShadow) {
      baseStyle.textShadow = "2px 2px 4px rgba(0,0,0,0.3)";
    }

    if (textGlow) {
      baseStyle.filter = `drop-shadow(0 0 20px ${gradientFrom})`;
    }

    if (animationType) {
      if (animationType === AnimationTypes.TYPEWRITER) {
        baseStyle.whiteSpace = "nowrap";
        baseStyle.overflow = "hidden";
        baseStyle.animation = `typewriter 1s ease`;
        baseStyle.borderRight = "3px solid";
      } else {
        baseStyle.animation = `${animationType} 0.3s ease`;
      }
    }

    return baseStyle;
  };

  return (
    <div className="lg:col-span-3">
      <div className=" bg-white rounded-2xl shadow-lg border border-gray-100">
        <div className="flex flex-col gap-5 overflow-hidden">
          {/* tabs button*/}
          <div className="flex items-center border-b border-gray-400">
            <button
              onClick={() => setActiveTab(0)}
              className="flex-1/2 px-10 py-3 flex items-center justify-center cursor-pointer gap-3 font-medium text-gray-700"
            >
              <BsEye />
              Preview
            </button>
            <button
              onClick={() => setActiveTab(1)}
              className="flex-1/2 px-10 py-3 flex items-center justify-center cursor-pointer gap-3 font-medium text-gray-700"
            >
              <FaCode />
              Code
            </button>
          </div>

          {/* content */}
          <div className="overflow-hidden">
            <motion.div
              className="w-[200%] flex"
              initial={false}
              animate={{ translateX: `-${activeTab * 50}%` }}
              transition={{
                duration: 0.3,
                type: "spring",
                stiffness: 400,
                damping: 30,
              }}
            >
              {/* preview */}
              <div className="w-1/2">
                <div className="text-center min-h-[400px] grid place-items-center">
                  <div>
                    <h2 style={getTextStyle()}>{text}</h2>
                  </div>
                </div>
              </div>

              {/* code */}
              <div className="w-1/2">
                <div className="mt-6 bg-gray-900 rounded-2xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white font-semibold">Generated CSS</h3>
                    <button
                      //   onClick={copyCSS}
                      className="flex items-center gap-2 px-3 py-1.5 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
                    >
                      <BiCopy size={14} />
                      Copy
                    </button>
                  </div>
                  <pre className="text-green-400 text-sm overflow-x-auto">
                    {`
<h1 class="headline">${text}</h1>

.headline ${JSON.stringify(getTextStyle())
                      .replaceAll('":', ": ")
                      .replaceAll('"', "")
                      .replaceAll(",", "\n   ")}
`}
                  </pre>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
