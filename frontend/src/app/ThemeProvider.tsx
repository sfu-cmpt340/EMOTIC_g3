"use client";

import { LightThemeContext } from "./config/contexts";
import { useEffect, useState } from "react";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isLightTheme, setIsLightTheme] = useState(false);

  useEffect(() => {
    // This checks if the user prefers a light theme
    const prefersLightTheme = window.matchMedia("(prefers-color-scheme: light)").matches;
    setIsLightTheme(prefersLightTheme);

    const handleThemeChange = (event: MediaQueryListEvent) => {
      setIsLightTheme(event.matches);
    };

    // Listen for changes in the system theme
    window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", handleThemeChange);

    return () => {
      window.matchMedia("(prefers-color-scheme: light)").removeEventListener("change", handleThemeChange);
    };
  }, []);

  return (
    <LightThemeContext.Provider value={isLightTheme}>
      {children}
    </LightThemeContext.Provider>
  );
}