"use client";

import { motion, AnimatePresence } from "motion/react";
import { useThemeToggle, AnimationVariant, AnimationStart } from "@/hooks/use-theme-toggle";

interface ThemeToggleProps {
  variant?: AnimationVariant;
  start?: AnimationStart;
  blur?: boolean;
  gifUrl?: string;
}

export function ThemeToggle({ variant = "circle", start = "center", blur = false, gifUrl = "" }: ThemeToggleProps) {
  const { isDark, toggleTheme } = useThemeToggle({ variant, start, blur, gifUrl });

  return (
    <motion.button
      onClick={toggleTheme}
      whileTap={{ scale: 0.88 }}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      style={{
        position: "relative",
        width: "36px",
        height: "20px",
        borderRadius: "99px",
        border: "1px solid var(--border)",
        background: "var(--toggle-track)",
        cursor: "pointer",
        padding: 0,
        display: "flex",
        alignItems: "center",
        flexShrink: 0,
        overflow: "hidden",
      }}
    >
      {/* Track fill that slides */}
      <motion.span
        animate={{ x: isDark ? 0 : "100%" }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        style={{
          position: "absolute",
          inset: 0,
          background: "var(--toggle-active)",
          borderRadius: "99px",
          originX: isDark ? 0 : 1,
        }}
      />

      {/* Thumb — morphs between crescent and sun */}
      <motion.span
        animate={{ x: isDark ? 2 : 18 }}
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
        style={{
          position: "relative",
          zIndex: 1,
          width: "14px",
          height: "14px",
          borderRadius: "50%",
          background: "var(--toggle-thumb)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          overflow: "hidden",
        }}
      >
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.svg
              key="moon"
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 30 }}
              transition={{ duration: 0.18 }}
              width="8"
              height="8"
              viewBox="0 0 8 8"
              fill="var(--toggle-icon)"
            >
              <path d="M4.5 1a3.5 3.5 0 1 0 2.5 6A4 4 0 0 1 4.5 1z" />
            </motion.svg>
          ) : (
            <motion.svg
              key="sun"
              initial={{ scale: 0, rotate: 30 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: -30 }}
              transition={{ duration: 0.18 }}
              width="8"
              height="8"
              viewBox="0 0 8 8"
              fill="none"
              stroke="var(--toggle-icon)"
              strokeWidth="1.2"
              strokeLinecap="round"
            >
              <circle cx="4" cy="4" r="1.5" />
              <path d="M4 1v.7M4 6.3V7M1 4h.7M6.3 4H7M1.93 1.93l.5.5M5.57 5.57l.5.5M5.57 2.43l-.5.5M2.43 5.57l-.5.5" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.span>
    </motion.button>
  );
}
