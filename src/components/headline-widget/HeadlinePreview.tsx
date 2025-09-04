import { useState } from "react";
import type { WidgetValues } from "../../types/headline-widget.type";
import { BsEye } from "react-icons/bs";
import { FaCode } from "react-icons/fa6";
import { BiCopy } from "react-icons/bi";
import { motion } from "motion/react";
import { codePreview, copyCode, getTextStyle } from "../../lib/utils";

/**
 * Headline widget preview component
 * @param WidgetValues
 * @returns
 */
export default function HeadlinePreview(props: WidgetValues) {
  // props destructuring
  const { text } = props;

  // tab state
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <div className="lg:col-span-3">
      <div className=" bg-white rounded-2xl shadow-lg border border-gray-100">
        <div className="flex flex-col gap-5 overflow-hidden">
          {/* tabs button*/}
          <div className="flex items-center border-b border-gray-400 relative">
            {/* animated border */}
            <motion.div
              className="absolute top-0 left-0 bg-blue-50 h-full w-1/3 border-b border-blue-500"
              initial={false}
              animate={{
                left: `${activeTab * 50}%`,
                width: `50%`,
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 30,
              }}
            />

            <button
              onClick={() => setActiveTab(0)}
              className={`z-10 flex-1/2 px-10 py-3 flex items-center justify-center cursor-pointer gap-3 font-medium  ${
                activeTab === 0 ? "text-blue-600" : "text-gray-700"
              }`}
            >
              <BsEye />
              Preview
            </button>
            <button
              onClick={() => setActiveTab(1)}
              className={`z-10 flex-1/2 px-10 py-3 flex items-center justify-center cursor-pointer gap-3 font-medium  ${
                activeTab === 1 ? "text-blue-600" : "text-gray-700"
              }`}
            >
              <FaCode />
              Code
            </button>
          </div>

          {/* style */}
          <style>{getTextStyle(props)}</style>

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
                    <h2 className="headline">{text}</h2>
                  </div>
                </div>
              </div>

              {/* code */}
              <div className="w-1/2">
                <div className="mt-6 bg-gray-900 rounded-2xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white font-semibold">Generated CSS</h3>
                    <button
                      onClick={() => copyCode(codePreview(props))}
                      className="flex items-center gap-2 px-3 py-1.5 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
                    >
                      <BiCopy size={14} />
                      Copy
                    </button>
                  </div>
                  <pre className="text-green-400 text-sm overflow-x-auto">
                    {codePreview(props)}
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
