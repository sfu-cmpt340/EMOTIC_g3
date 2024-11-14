import { useEffect, useState } from "react";
import emoticDarkModeLogo from "../../../../src/assets/logoDarkMode.svg";
import emoticLightModeLogo from "../../../../src/assets/logoLightMode.svg";

export default function LandingPage() {
  const [logo, setLogo] = useState(emoticLightModeLogo);

  useEffect(() => {
    // Function to set logo based on color scheme
    const updateLogo = () => {
      const darkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setLogo(darkMode ? emoticDarkModeLogo : emoticLightModeLogo);
    };

    // Set initial logo
    updateLogo();

    // Listen for changes in the color scheme
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", updateLogo);

    // Cleanup event listener on component unmount
    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", updateLogo);
    };
  }, []);

  return (
    <div className="min-h-screen flex justify-center bg-lightBackground-500 dark:bg-darkBackground-500">
      <div className="justify-center mt-[15%] font-montserrat font-extralight text-lightText-500 dark:text-darkText-500">
        <div className="flex items-center justify-center">
          <p className="text-[100px]">EMOTIC</p>
          <a href="" target="_blank">
            <img src={logo} className="logo h-20 w-20 ml-4" alt="EMOTIC logo" />
          </a>
        </div>
        <div className="text-[30px] -mt-4">
          EEG Monitoring of Thoughts and Individual Conditions
        </div>
      </div>
    </div>
  );
}
