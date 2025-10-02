import { useState } from "react";
import { motion } from "framer-motion";

const tabs = ["Home", "Projects", "About", "Contact"];

export default function AnimatedNavbar() {
  const [selected, setSelected] = useState<string>(tabs[0]);
  const [hovered, setHovered] = useState<string | null>(null);

  // whichever tab is “active” visually: hover overrides selection
  const active = hovered ?? selected;

  return (
    <nav className="relative flex items-center justify-center space-x-6 bg-white p-2 rounded-full shadow-md">
      {tabs.map((tab) => (
        <div
          key={tab}
          className="relative px-4 py-2 cursor-pointer"
          onClick={() => setSelected(tab)}
          onMouseEnter={() => setHovered(tab)}
          onMouseLeave={() => setHovered(null)}
        >
          {active === tab && (
            <motion.div
              layoutId="pill"
              className="absolute inset-0 bg-blue-500 rounded-full"
              initial={false}
              transition={{ type: "spring", stiffness: 400, damping: 32 }}
            />
          )}
          <span
            className={`relative z-10 text-sm font-medium transition-colors duration-200 ${
              active === tab ? "text-white" : "text-gray-700 hover:text-gray-900"
            }`}
          >
            {tab}
          </span>
        </div>
      ))}
    </nav>
  );
}
