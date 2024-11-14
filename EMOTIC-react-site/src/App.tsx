import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/pages/landing/LandingPage";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    // Function to set `dark` class based on color scheme
    const updateTheme = () => {
      const darkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      if (darkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };

    // Initial theme setup
    updateTheme();

    // Listen for changes in the color scheme
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", updateTheme);

    // Cleanup event listener on component unmount
    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", updateTheme);
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}
