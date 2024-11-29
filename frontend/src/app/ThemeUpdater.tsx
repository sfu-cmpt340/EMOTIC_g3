"use client";

import { useEffect } from "react";

export default function ThemeUpdater() {
  useEffect(() => {
    const updateTheme = () => {
      const darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.classList.toggle("dark", darkMode);
    };

    updateTheme();

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", updateTheme);

    return () => {
      window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", updateTheme);
    };
  }, []);

  return null; // No UI to render, just theme logic
}
