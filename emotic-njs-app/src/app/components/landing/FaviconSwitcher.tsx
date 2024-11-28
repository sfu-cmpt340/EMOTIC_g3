"use client";

import { useEffect } from "react";

export default function FaviconSwitcher() {
  useEffect(() => {
    const updateFavicon = () => {
      const darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const faviconLink = document.querySelector("link[rel='icon']");
      
      if (faviconLink) {
        faviconLink.setAttribute("href", darkMode ? "/logoDarkMode.svg" : "/logoLightMode.svg");
      }
    };

    // Set favicon on initial load
    updateFavicon();

    // Update favicon on color scheme change
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", updateFavicon);

    // Cleanup event listener
    return () => {
      window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", updateFavicon);
    };
  }, []);

  return null;
}