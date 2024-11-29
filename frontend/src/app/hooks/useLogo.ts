import { useEffect, useState } from "react";

export const useLogo = () => {
  const [logo, setLogo] = useState<string>("/logoDarkMode.svg");

  useEffect(() => {
    const updateLogo = () => {
      const darkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setLogo(darkMode ? "/logoDarkMode.svg" : "/logoLightMode.svg");
    };

    updateLogo();

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", updateLogo);

    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", updateLogo);
    };
  }, []);

  return logo;
};
