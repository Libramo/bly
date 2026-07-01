"use client";

import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";

// ───────────────────────────────────────────────────────────────────────────
// Types

export type AnimationVariant =
  | "circle"
  | "rectangle"
  | "gif"
  | "polygon"
  | "circle-blur";

export type AnimationStart =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "center"
  | "top-center"
  | "bottom-center"
  | "bottom-up"
  | "top-down"
  | "left-right"
  | "right-left";

// ───────────────────────────────────────────────────────────────────────────
// Animation helpers (adapted from Skiper UI — https://github.com/gurvinder-singh02)

const getPositionCoords = (position: AnimationStart) => {
  switch (position) {
    case "top-left":      return { cx: "0",  cy: "0"  };
    case "top-right":     return { cx: "40", cy: "0"  };
    case "bottom-left":   return { cx: "0",  cy: "40" };
    case "bottom-right":  return { cx: "40", cy: "40" };
    case "top-center":    return { cx: "20", cy: "0"  };
    case "bottom-center": return { cx: "20", cy: "40" };
    default:              return { cx: "20", cy: "20" };
  }
};

const getTransformOrigin = (start: AnimationStart) => {
  switch (start) {
    case "top-left":      return "top left";
    case "top-right":     return "top right";
    case "bottom-left":   return "bottom left";
    case "bottom-right":  return "bottom right";
    case "top-center":    return "top center";
    case "bottom-center": return "bottom center";
    default:              return "center";
  }
};

const generateSVG = (variant: AnimationVariant, start: AnimationStart) => {
  if (variant === "circle-blur") {
    if (start === "center") {
      return `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><defs><filter id="blur"><feGaussianBlur stdDeviation="2"/></filter></defs><circle cx="20" cy="20" r="18" fill="white" filter="url(%23blur)"/></svg>`;
    }
    const { cx, cy } = getPositionCoords(start);
    return `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><defs><filter id="blur"><feGaussianBlur stdDeviation="2"/></filter></defs><circle cx="${cx}" cy="${cy}" r="18" fill="white" filter="url(%23blur)"/></svg>`;
  }
  if (start === "center" || variant === "rectangle") return "";
  const { cx, cy } = getPositionCoords(start);
  if (variant === "circle") {
    return `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><circle cx="${cx}" cy="${cy}" r="20" fill="white"/></svg>`;
  }
  return "";
};

export const createAnimation = (
  variant: AnimationVariant,
  start: AnimationStart = "center",
  blur = false,
  url?: string,
): { name: string; css: string } => {
  const svg = generateSVG(variant, start);
  const transformOrigin = getTransformOrigin(start);
  const b = blur ? "-blur" : "";

  if (variant === "rectangle") {
    const clipMap: Record<string, { from: string; to: string }> = {
      "bottom-up":   { from: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)", to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" },
      "top-down":    { from: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",         to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" },
      "left-right":  { from: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",         to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" },
      "right-left":  { from: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)", to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" },
    };
    const cp = clipMap[start] ?? clipMap["bottom-up"];
    return {
      name: `${variant}-${start}${b}`,
      css: `
        ::view-transition-group(root) { animation-duration: 0.7s; animation-timing-function: var(--expo-out); }
        ::view-transition-new(root) { animation-name: reveal-light-${start}${b}; ${blur ? "filter:blur(2px);" : ""} }
        ::view-transition-old(root), .dark::view-transition-old(root) { animation: none; z-index: -1; }
        .dark::view-transition-new(root) { animation-name: reveal-dark-${start}${b}; ${blur ? "filter:blur(2px);" : ""} }
        @keyframes reveal-dark-${start}${b}  { from { clip-path: ${cp.from}; ${blur ? "filter:blur(8px);" : ""} } ${blur ? "50%{filter:blur(4px);}" : ""} to { clip-path: ${cp.to}; ${blur ? "filter:blur(0);" : ""} } }
        @keyframes reveal-light-${start}${b} { from { clip-path: ${cp.from}; ${blur ? "filter:blur(8px);" : ""} } ${blur ? "50%{filter:blur(4px);}" : ""} to { clip-path: ${cp.to}; ${blur ? "filter:blur(0);" : ""} } }
      `,
    };
  }

  if (variant === "circle" && start === "center") {
    return {
      name: `${variant}-${start}${b}`,
      css: `
        ::view-transition-group(root) { animation-duration: 0.7s; animation-timing-function: var(--expo-out); }
        ::view-transition-new(root) { animation-name: reveal-light${b}; ${blur ? "filter:blur(2px);" : ""} }
        ::view-transition-old(root), .dark::view-transition-old(root) { animation: none; z-index: -1; }
        .dark::view-transition-new(root) { animation-name: reveal-dark${b}; ${blur ? "filter:blur(2px);" : ""} }
        @keyframes reveal-dark${b}  { from { clip-path: circle(0% at 50% 50%); ${blur ? "filter:blur(8px);" : ""} } ${blur ? "50%{filter:blur(4px);}" : ""} to { clip-path: circle(100% at 50% 50%); ${blur ? "filter:blur(0);" : ""} } }
        @keyframes reveal-light${b} { from { clip-path: circle(0% at 50% 50%); ${blur ? "filter:blur(8px);" : ""} } ${blur ? "50%{filter:blur(4px);}" : ""} to { clip-path: circle(100% at 50% 50%); ${blur ? "filter:blur(0);" : ""} } }
      `,
    };
  }

  if (variant === "circle" && start !== "center") {
    const posMap: Record<string, string> = {
      "top-left": "0% 0%", "top-right": "100% 0%", "bottom-left": "0% 100%",
      "bottom-right": "100% 100%", "top-center": "50% 0%", "bottom-center": "50% 100%",
    };
    const pos = posMap[start] ?? "50% 50%";
    return {
      name: `${variant}-${start}${b}`,
      css: `
        ::view-transition-group(root) { animation-duration: 1s; animation-timing-function: var(--expo-out); }
        ::view-transition-new(root) { animation-name: reveal-light-${start}${b}; ${blur ? "filter:blur(2px);" : ""} }
        ::view-transition-old(root), .dark::view-transition-old(root) { animation: none; z-index: -1; }
        .dark::view-transition-new(root) { animation-name: reveal-dark-${start}${b}; ${blur ? "filter:blur(2px);" : ""} }
        @keyframes reveal-dark-${start}${b}  { from { clip-path: circle(0% at ${pos}); ${blur ? "filter:blur(8px);" : ""} } ${blur ? "50%{filter:blur(4px);}" : ""} to { clip-path: circle(150% at ${pos}); ${blur ? "filter:blur(0);" : ""} } }
        @keyframes reveal-light-${start}${b} { from { clip-path: circle(0% at ${pos}); ${blur ? "filter:blur(8px);" : ""} } ${blur ? "50%{filter:blur(4px);}" : ""} to { clip-path: circle(150% at ${pos}); ${blur ? "filter:blur(0);" : ""} } }
      `,
    };
  }

  if (variant === "gif") {
    return {
      name: `${variant}-${start}`,
      css: `
        ::view-transition-group(root) { animation-timing-function: var(--expo-in); }
        ::view-transition-new(root) { mask: url('${url}') center / 0 no-repeat; animation: scale 3s; }
        ::view-transition-old(root), .dark::view-transition-old(root) { animation: scale 3s; }
        @keyframes scale { 0%{mask-size:0} 10%{mask-size:50vmax} 90%{mask-size:50vmax} 100%{mask-size:2000vmax} }
      `,
    };
  }

  if (variant === "circle-blur") {
    const pos = start === "center" ? "center" : start.replace("-", " ");
    const size = start === "center" ? "center" : pos;
    return {
      name: `${variant}-${start}`,
      css: `
        ::view-transition-group(root) { animation-timing-function: var(--expo-out); }
        ::view-transition-new(root) { mask: url('${svg}') ${size} / 0 no-repeat; mask-origin: content-box; animation: scale 1s; transform-origin: ${transformOrigin}; }
        ::view-transition-old(root), .dark::view-transition-old(root) { animation: scale 1s; transform-origin: ${transformOrigin}; z-index: -1; }
        @keyframes scale { to { mask-size: 350vmax; } }
      `,
    };
  }

  return {
    name: `${variant}-${start}${b}`,
    css: `
      ::view-transition-group(root) { animation-timing-function: var(--expo-in); }
      ::view-transition-new(root) { mask: url('${svg}') ${start.replace("-", " ")} / 0 no-repeat; mask-origin: content-box; animation: scale-${start}${b} 1s; transform-origin: ${transformOrigin}; ${blur ? "filter:blur(2px);" : ""} }
      ::view-transition-old(root), .dark::view-transition-old(root) { animation: scale-${start}${b} 1s; transform-origin: ${transformOrigin}; z-index: -1; }
      @keyframes scale-${start}${b} { from { ${blur ? "filter:blur(8px);" : ""} } ${blur ? "50%{filter:blur(4px);}" : ""} to { mask-size: 2000vmax; ${blur ? "filter:blur(0);" : ""} } }
    `,
  };
};

// ───────────────────────────────────────────────────────────────────────────
// Hook

export const useThemeToggle = ({
  variant = "circle",
  start = "center",
  blur = false,
  gifUrl = "",
}: {
  variant?: AnimationVariant;
  start?: AnimationStart;
  blur?: boolean;
  gifUrl?: string;
} = {}) => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(resolvedTheme === "dark");
  }, [resolvedTheme]);

  const updateStyles = useCallback((css: string) => {
    if (typeof window === "undefined") return;
    const id = "theme-transition-styles";
    let el = document.getElementById(id) as HTMLStyleElement | null;
    if (!el) {
      el = document.createElement("style");
      el.id = id;
      document.head.appendChild(el);
    }
    el.textContent = css;
  }, []);

  const toggleTheme = useCallback(() => {
    const animation = createAnimation(variant, start, blur, gifUrl);
    updateStyles(animation.css);

    const switchTheme = () => setTheme(theme === "light" ? "dark" : "light");

    if (typeof window === "undefined" || !document.startViewTransition) {
      switchTheme();
      return;
    }
    document.startViewTransition(switchTheme);
  }, [theme, setTheme, variant, start, blur, gifUrl, updateStyles]);

  return { isDark, toggleTheme };
};
